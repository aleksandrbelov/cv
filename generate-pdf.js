const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

/**
 * The print layout in styles.css is tuned to land on exactly this many pages.
 * If a content edit pushes it over, the build fails instead of silently
 * deploying a longer resume. Set EXPECTED_PDF_PAGES to re-baseline on purpose.
 */
const EXPECTED_PAGES = Number(process.env.EXPECTED_PDF_PAGES || 2);

/** Fonts the PDF must render with; a fallback would change every line break. */
const REQUIRED_FONTS = ['400 16px Inter', '800 16px Outfit'];

/**
 * Reads the page total from the PDF page tree, which records it in /Count.
 * Chrome writes an uncompressed tree, so this is exact rather than heuristic.
 */
function countPdfPages(data) {
  // page.pdf() resolves to a Uint8Array on Puppeteer 23+, which would stringify
  // to comma-joined digits rather than bytes. Normalise before scanning.
  const raw = Buffer.from(data).toString('latin1');

  const counts = [...raw.matchAll(/\/Type\s*\/Pages[\s\S]{0,200}?\/Count\s+(\d+)/g)].map((m) => Number(m[1]));
  if (counts.length) {
    return Math.max(...counts);
  }

  // Fallback for any writer that orders the dictionary differently.
  return (raw.match(/\/Type\s*\/Page[^s]/g) || []).length;
}

async function generatePdf() {
  let browser;

  try {
    const outputPath = path.resolve(__dirname, 'Oleksandr_Bielov_Resume.pdf');
    const filePath = path.resolve(__dirname, 'index.html');
    const fileUrl = `file:///${filePath.replace(/\\/g, '/')}`;

    console.log('Launching browser...');
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

    // Everything the PDF needs is on disk. A network request means an asset
    // slipped back in, which would make output depend on the build machine.
    const externalRequests = [];
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (/^https?:/i.test(request.url())) {
        externalRequests.push(request.url());
        request.abort();
        return;
      }
      request.continue();
    });

    console.log(`Loading: ${fileUrl}`);
    await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.emulateMediaType('print');

    await page.evaluate(async () => {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }
    });

    if (externalRequests.length) {
      throw new Error(
        `Blocked ${externalRequests.length} external request(s) — the PDF must build offline:\n  ` +
          [...new Set(externalRequests)].join('\n  ')
      );
    }

    const missingFonts = await page.evaluate(
      (fonts) => fonts.filter((font) => !document.fonts.check(font)),
      REQUIRED_FONTS
    );
    if (missingFonts.length) {
      throw new Error(
        `Self-hosted fonts did not load (${missingFonts.join(', ')}). ` +
          'The PDF would fall back to system fonts and re-flow.'
      );
    }

    await page.evaluate(() => {
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        el.classList.add('is-visible');
      });

      const pointerGlow = document.getElementById('pointer-glow');
      if (pointerGlow) {
        pointerGlow.style.display = 'none';
      }
    });

    const buffer = await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      scale: 0.96,
      margin: { top: '7mm', bottom: '7mm', left: '8mm', right: '8mm' },
      preferCSSPageSize: false,
    });

    const { size } = fs.statSync(outputPath);
    if (!size) {
      throw new Error('Generated PDF is empty.');
    }

    const pageCount = countPdfPages(buffer);
    if (pageCount !== EXPECTED_PAGES) {
      throw new Error(
        `PDF is ${pageCount} page(s), expected ${EXPECTED_PAGES}. ` +
          'Tighten the print styles in styles.css, or set EXPECTED_PDF_PAGES to re-baseline.'
      );
    }

    return { outputPath, size, pageCount };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

if (require.main === module) {
  generatePdf()
    .then(({ outputPath, size, pageCount }) => {
      console.log(`✅ PDF saved to: ${outputPath} (${Math.round(size / 1024)} KB, ${pageCount} pages)`);
    })
    .catch((error) => {
      console.error('❌ PDF generation failed.');
      console.error(error);
      process.exitCode = 1;
    });
}

module.exports = { generatePdf, countPdfPages };
