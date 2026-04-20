const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Wide enough for bento grid layout
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  const filePath = path.resolve(__dirname, 'index.html');
  const fileUrl = `file:///${filePath.replace(/\\/g, '/')}`;

  console.log(`Loading: ${fileUrl}`);
  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });

  // Wait for fonts and initial render
  await new Promise(r => setTimeout(r, 2000));

  // Fix all the issues that break PDF rendering:
  await page.evaluate(() => {
    // 1. Force ALL scroll-reveal elements visible immediately
    //    (IntersectionObserver never fires in headless mode)
    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      el.classList.add('is-visible');
    });

    // 2. Open the accordion by adding the class the JS expects
    const expandContent = document.getElementById('ai-content');
    if (expandContent) {
      expandContent.classList.add('is-open');
    }
    const expandTrigger = document.querySelector('.expand-trigger');
    if (expandTrigger) {
      expandTrigger.setAttribute('aria-expanded', 'true');
    }

    // 3. Hide decorative elements not needed in print
    const pointerGlow = document.getElementById('pointer-glow');
    if (pointerGlow) pointerGlow.style.display = 'none';
  });

  // Wait for accordion transition to finish (CSS transition is 0.5s)
  await new Promise(r => setTimeout(r, 700));

  const outputPath = path.resolve(__dirname, 'Oleksandr_Bielov_Resume.pdf');

  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,   // needed for dark backgrounds in print
    margin: { top: '10mm', bottom: '10mm', left: '12mm', right: '12mm' },
    preferCSSPageSize: false,
  });

  await browser.close();
  console.log(`✅ PDF saved to: ${outputPath}`);
})();
