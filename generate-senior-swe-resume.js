const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { Packer } = require('docx');
const { parseResume, buildDocument } = require('./generate-docx');
const { countPdfPages } = require('./generate-pdf');

/**
 * Generates PDF and DOCX versions of the long, senior-targeted resume from
 * Oleksandr_Bielov_Resume_Senior_Extended.md.
 *
 * The DOCX re-uses the README builder in generate-docx.js, so every Word file
 * shares one layout (its parse errors still say "README"). index.html only
 * mirrors README, so the PDF is a clean single-column print of the Markdown.
 */

const SOURCE_FILE = 'Oleksandr_Bielov_Resume_Senior_Extended.md';
const OUTPUT_DOCX = 'Oleksandr_Bielov_Resume_Senior_SWE.docx';
const OUTPUT_PDF = 'Oleksandr_Bielov_Resume_Senior_SWE.pdf';

function save(outputPath, buffer) {
  try {
    fs.writeFileSync(outputPath, buffer);
  } catch (error) {
    if (error.code === 'EBUSY' || error.code === 'EPERM') {
      throw new Error(`${path.basename(outputPath)} is locked — close it and run again.`);
    }
    throw error;
  }
}

// ── PDF builder (renders a clean HTML version of the resume) ────────────────

const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const stripEmoji = (s) => s.replace(/\p{Extended_Pictographic}️?/gu, '');

/** Links to other repo files (e.g. AI_ML_PROJECTS.md) only make sense on GitHub. */
const isRepoLink = (line) => /^\W*\[[^\]]+\]\((?!https?:|mailto:)[^)]+\)$/u.test(line.trim());

const inline = (s) =>
  escapeHtml(stripEmoji(s).trim())
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*\s][^*]*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

function markdownToHtml(md) {
  const html = [];
  let inList = false;
  const closeList = () => {
    if (inList) html.push('</ul>');
    inList = false;
  };

  for (const line of md.replace(/\r\n/g, '\n').split('\n')) {
    const trimmed = line.trim();
    let m;
    if (!trimmed || /^-{3,}$/.test(trimmed) || isRepoLink(trimmed)) {
      closeList();
    } else if ((m = trimmed.match(/^(#{1,3})\s+(.+)$/))) {
      closeList();
      html.push(`<h${m[1].length}>${inline(m[2])}</h${m[1].length}>`);
    } else if ((m = trimmed.match(/^\*\s+(.+)$/))) {
      if (!inList) html.push('<ul>');
      inList = true;
      html.push(`<li>${inline(m[1])}</li>`);
    } else {
      closeList();
      const cls = /^\*\*Tech Stack:\*\*/.test(trimmed) ? ' class="tech"' : '';
      html.push(`<p${cls}>${inline(trimmed)}</p>`);
    }
  }
  closeList();
  return html.join('\n');
}

function buildHtmlPage(md) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Oleksandr Bielov — Resume (Senior Software Engineer)</title>
<style>
  @page { size: A4; margin: 12mm 14mm; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { background: #fff; }
  body {
    font-family: Calibri, 'Segoe UI', Arial, sans-serif;
    font-size: 10pt;
    line-height: 1.35;
    color: #222;
    max-width: 700px;
    margin: 0 auto;
  }
  h1 { font-size: 22pt; color: #1F3A5F; margin-bottom: 2px; letter-spacing: -0.5px; }
  h2 {
    font-size: 11.5pt;
    color: #1F3A5F;
    border-bottom: 1.5px solid #1F3A5F;
    padding-bottom: 2px;
    margin: 14px 0 6px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  h3 { font-size: 10.5pt; color: #222; margin: 10px 0 1px; break-after: avoid; }
  p { margin-bottom: 3px; }
  p.tech { font-size: 9pt; color: #555; margin-bottom: 4px; }
  ul { margin: 2px 0 4px 18px; }
  li { margin-bottom: 2px; break-inside: avoid; }
  li::marker { color: #1F3A5F; }
  a { color: #1F3A5F; text-decoration: none; }
  strong { font-weight: 600; }
  em { color: #555; }
  code { font-family: Consolas, 'Courier New', monospace; font-size: 9pt; }
</style>
</head>
<body>
${markdownToHtml(md)}
</body>
</html>`;
}

// ── Main ────────────────────────────────────────────────────────────────────

async function generateDocx(root = __dirname) {
  const resume = parseResume(fs.readFileSync(path.join(root, SOURCE_FILE), 'utf8'));
  const outputPath = path.resolve(root, OUTPUT_DOCX);

  const buffer = await Packer.toBuffer(buildDocument(resume));
  save(outputPath, buffer);

  const jobs = resume.sections.find((s) => s.name === 'EXPERIENCE').content;
  const bullets = jobs.reduce((n, job) => n + job.blocks.reduce((m, b) => m + b.bullets.length, 0), 0);
  return { outputPath, size: buffer.length, jobs: jobs.length, bullets };
}

async function generatePdf(root = __dirname) {
  const md = fs.readFileSync(path.join(root, SOURCE_FILE), 'utf8');
  const outputPath = path.resolve(root, OUTPUT_PDF);

  let browser;
  try {
    browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setContent(buildHtmlPage(md), { waitUntil: 'load' });
    await page.emulateMediaType('print');

    const buffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      scale: 0.96,
      margin: { top: '7mm', bottom: '7mm', left: '8mm', right: '8mm' },
      preferCSSPageSize: false,
    });
    if (!buffer.length) throw new Error('Generated PDF is empty.');
    save(outputPath, buffer);

    return { outputPath, size: buffer.length, pageCount: countPdfPages(buffer) };
  } finally {
    if (browser) await browser.close();
  }
}

async function main() {
  console.log(`Reading source: ${SOURCE_FILE}\n`);

  try {
    const { outputPath, size, jobs, bullets } = await generateDocx();
    console.log(`✅ DOCX saved to: ${outputPath} (${Math.round(size / 1024)} KB, ${jobs} roles, ${bullets} bullets)`);
  } catch (error) {
    console.error('❌ DOCX generation failed.');
    console.error(error);
    process.exitCode = 1;
  }

  try {
    const { outputPath, size, pageCount } = await generatePdf();
    console.log(`✅ PDF saved to: ${outputPath} (${Math.round(size / 1024)} KB, ${pageCount} pages)`);
  } catch (error) {
    console.error('❌ PDF generation failed.');
    console.error(error);
    process.exitCode = 1;
  }
}

if (require.main === module) main();

module.exports = { generateDocx, generatePdf, buildHtmlPage };
