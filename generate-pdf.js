const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function generatePdf() {
  let browser;

  try {
    const outputPath = path.resolve(__dirname, 'Oleksandr_Bielov_Resume.pdf');
    const filePath = path.resolve(__dirname, 'index.html');
    const fileUrl = `file:///${filePath.replace(/\\/g, '/')}`;

    console.log('Launching browser...');
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

    console.log(`Loading: ${fileUrl}`);
    await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.emulateMediaType('print');

    await page.evaluate(async () => {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }
    });

    await page.evaluate(() => {
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        el.classList.add('is-visible');
      });

      const expandContent = document.getElementById('ai-content');
      if (expandContent) {
        expandContent.classList.add('is-open');
      }

      const expandTrigger = document.querySelector('.expand-trigger');
      if (expandTrigger) {
        expandTrigger.setAttribute('aria-expanded', 'true');
      }

      const pointerGlow = document.getElementById('pointer-glow');
      if (pointerGlow) {
        pointerGlow.style.display = 'none';
      }
    });

    await page.waitForFunction(() => {
      return Array.from(document.querySelectorAll('.reveal-on-scroll')).every((el) => {
        const styles = window.getComputedStyle(el);
        return styles.opacity !== '0';
      });
    }, { timeout: 5000 });

    await page.pdf({
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

    return { outputPath, size };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

if (require.main === module) {
  generatePdf()
    .then(({ outputPath, size }) => {
      console.log(`✅ PDF saved to: ${outputPath} (${Math.round(size / 1024)} KB)`);
    })
    .catch((error) => {
      console.error('❌ PDF generation failed.');
      console.error(error);
      process.exitCode = 1;
    });
}

module.exports = { generatePdf };
