const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const {
  AlignmentType,
  BorderStyle,
  Document,
  ExternalHyperlink,
  HeadingLevel,
  LevelFormat,
  Packer,
  Paragraph,
  Tab,
  TabStopType,
  TextRun,
} = require('docx');

/**
 * Generates PDF and DOCX versions of the Backend-focused resume from
 * Oleksandr_Bielov_Resume_Backend_formatted.md.
 *
 * Re-uses the same DOCX builder logic as generate-docx.js (adapted to read
 * from a different source file) and renders a clean HTML page for the PDF.
 */

const SOURCE_FILE = 'Oleksandr_Bielov_Resume_Backend_formatted.md';
const OUTPUT_DOCX = 'Oleksandr_Bielov_Resume_Backend.docx';
const OUTPUT_PDF  = 'Oleksandr_Bielov_Resume_Backend.pdf';

// ── DOCX constants ──────────────────────────────────────────────────────────
const PAGE = { width: 11906, height: 16838, margin: 864 };
const TEXT_WIDTH = PAGE.width - 2 * PAGE.margin;
const FONT = 'Calibri';
const CODE_FONT = 'Consolas';
const COLOR = { text: '222222', muted: '555555', accent: '1F3A5F' };
const SIZE = { name: 44, headline: 24, body: 20, small: 19 };

// ── Markdown parser (same logic as generate-docx.js) ────────────────────────

const isFiller = (line) => !line.trim() || /^-{3,}$/.test(line.trim());
const isRepoLink = (line) => /^\W*\[[^\]]+\]\((?!https?:|mailto:)[^)]+\)$/u.test(line.trim());
const stripEmoji = (s) => s.replace(/\p{Extended_Pictographic}️?/gu, '');
const stripBold = (s) => s.replace(/\*\*/g, '').trim();
const DATE_RANGE = /^[A-Z][a-z]{2} \d{4}\s*[–—-]\s*(Present|[A-Z][a-z]{2} \d{4})$/;

const unrecognised = (section, line) =>
  new Error(`${SOURCE_FILE} ${section}: don't know how to lay out this line:\n    ${line.trim()}`);

function splitSections(md) {
  const sections = new Map([['HEADER', []]]);
  let current = sections.get('HEADER');
  for (const line of md.replace(/\r\n/g, '\n').split('\n').map((l) => l.trimEnd())) {
    const heading = line.match(/^##\s+(.+)$/);
    if (heading) {
      current = [];
      sections.set(heading[1].trim().toUpperCase(), current);
    } else {
      current.push(line);
    }
  }
  return sections;
}

function parseContacts(line) {
  return line
    .split('|')
    .map((part) => stripEmoji(part).trim())
    .filter(Boolean)
    .map((part) => {
      const link = part.match(/^\[(.+?)\]\((.+?)\)$/);
      if (link) {
        const url = /^[a-z]+:/i.test(link[2]) ? link[2] : `https://${link[2]}`;
        return { url, text: url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') };
      }
      if (/^\S+@\S+\.\S+$/.test(part)) return { url: `mailto:${part}`, text: part };
      return { text: part };
    });
}

function parseHeader(lines) {
  const content = lines.filter((line) => !isFiller(line));
  const name = content[0]?.match(/^#\s+(.+)$/)?.[1];
  const headline = content[1]?.match(/^\*\*(.+?)\*\*\s*(?:\|\s*(.*))?$/);
  if (!name || !headline || !content[2]) {
    throw new Error('Header must be "# Name", then "**Headline** | Location", then a contact line.');
  }
  if (content.length > 3) throw unrecognised('header', content[3]);
  return { name, headline: headline[1], location: headline[2] || '', contacts: parseContacts(content[2]) };
}

function parseSummary(lines) {
  const paragraphs = [[]];
  for (const line of lines) {
    if (/^\s*\*\s+/.test(line) || /^#/.test(line)) throw unrecognised('SUMMARY', line);
    if (isFiller(line)) {
      if (paragraphs.at(-1).length) paragraphs.push([]);
    } else {
      paragraphs.at(-1).push(line.trim());
    }
  }
  return paragraphs.filter((p) => p.length).map((p) => p.join(' '));
}

function parseSkills(lines) {
  return lines.filter((line) => !isFiller(line)).map((line) => {
    const match = line.match(/^\*\*(.+?):\*\*\s*(.+)$/);
    if (!match) throw unrecognised('SKILLS', line);
    return { label: match[1], terms: match[2].trim() };
  });
}

function parseExperience(lines) {
  const jobs = [];
  let job = null;
  let block = null;

  const currentJob = (line) => {
    if (!job) throw unrecognised('EXPERIENCE', line);
    return job;
  };
  const startBlock = (heading) => {
    block = { heading, techStack: null, bullets: [] };
    job.blocks.push(block);
    return block;
  };

  for (const line of lines) {
    if (isFiller(line) || isRepoLink(line)) continue;
    let m;
    if ((m = line.match(/^###\s+(.+)$/))) {
      const [company, ...title] = stripBold(m[1]).split(/\s+[—–]\s+/);
      job = { company, title: title.join(' — '), dates: null, blocks: [], notes: [] };
      block = null;
      jobs.push(job);
    } else if (job && !job.dates && DATE_RANGE.test(line.trim())) {
      job.dates = line.trim();
    } else if ((m = line.match(/^\*([^*\s].*?)\*$/))) {
      currentJob(line);
      startBlock(m[1].trim());
    } else if ((m = line.match(/^\*\*Tech Stack:\*\*\s*(.+?)\.?$/))) {
      currentJob(line);
      (block || startBlock(null)).techStack = m[1];
    } else if ((m = line.match(/^\s*\*\s+(.+)$/))) {
      currentJob(line);
      (block || startBlock(null)).bullets.push(m[1]);
    } else if ((m = line.match(/^\*\*(.+?):\*\*\s*(.+)$/))) {
      currentJob(line).notes.push({ label: m[1], text: m[2] });
    } else {
      throw unrecognised('EXPERIENCE', line);
    }
  }

  for (const { company, dates } of jobs) {
    if (!dates) throw new Error(`EXPERIENCE: "${company}" has no date range line.`);
  }
  return jobs;
}

const SECTION_PARSERS = {
  SUMMARY: parseSummary,
  SKILLS: parseSkills,
  EXPERIENCE: parseExperience,
  EDUCATION: (lines) => lines.filter((line) => !isFiller(line)).map((line) => line.trim()),
};

function parseResume(md) {
  const sections = splitSections(md);
  const resume = { header: parseHeader(sections.get('HEADER')), sections: [] };

  for (const [name, lines] of sections) {
    if (name === 'HEADER') continue;
    // Map "PROFESSIONAL EXPERIENCE" to "EXPERIENCE"
    const key = name === 'PROFESSIONAL EXPERIENCE' ? 'EXPERIENCE' : name;
    const parse = SECTION_PARSERS[key];
    if (!parse) {
      throw new Error(`Source has a "## ${name}" section the generator doesn't know how to lay out.`);
    }
    resume.sections.push({ name: key, content: parse(lines) });
  }

  const missing = Object.keys(SECTION_PARSERS).filter(
    (name) => !sections.has(name) && !(name === 'EXPERIENCE' && sections.has('PROFESSIONAL EXPERIENCE'))
  );
  if (missing.length) throw new Error(`Source is missing section(s): ${missing.join(', ')}`);

  return resume;
}

// ── DOCX builder ────────────────────────────────────────────────────────────

const INLINE = /(\*\*.+?\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\)|\*[^*\s][^*]*?\*)/g;

function inline(text, style = {}) {
  const runs = [];
  for (const part of text.split(INLINE)) {
    if (!part) continue;
    let m;
    if ((m = part.match(/^\*\*(.+)\*\*$/))) runs.push(...inline(m[1], { ...style, bold: true }));
    else if ((m = part.match(/^`(.+)`$/))) runs.push(new TextRun({ ...style, text: m[1], font: CODE_FONT }));
    else if ((m = part.match(/^\[(.+)\]\((.+)\)$/))) runs.push(hyperlink(m[1], m[2], style));
    else if ((m = part.match(/^\*(.+)\*$/))) runs.push(...inline(m[1], { ...style, italics: true }));
    else runs.push(new TextRun({ ...style, text: part }));
  }
  return runs;
}

const hyperlink = (text, url, style = {}) =>
  new ExternalHyperlink({ link: url, children: [new TextRun({ ...style, text, style: 'Hyperlink' })] });

function renderHeader({ name, headline, location, contacts }) {
  const contactRuns = contacts.flatMap((contact, i) => [
    ...(i ? [new TextRun({ text: '  ·  ', color: COLOR.muted })] : []),
    contact.url ? hyperlink(contact.text, contact.url) : new TextRun(contact.text),
  ]);

  return [
    new Paragraph({
      spacing: { after: 0 },
      children: [new TextRun({ text: name, bold: true, size: SIZE.name, color: COLOR.accent })],
    }),
    new Paragraph({
      spacing: { after: 20 },
      children: [new TextRun({ text: headline, bold: true, size: SIZE.headline })],
    }),
    ...(location ? [new Paragraph({ children: [new TextRun({ text: location, color: COLOR.muted })] })] : []),
    new Paragraph({ children: contactRuns }),
  ];
}

const sectionHeading = (name) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(name)] });
const bullet = (text) => new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: inline(text) });

function renderJob(job) {
  const paragraphs = [
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      tabStops: [{ type: TabStopType.RIGHT, position: TEXT_WIDTH }],
      children: [
        new TextRun(job.company),
        ...(job.title ? [new TextRun({ text: ` — ${job.title}`, bold: false })] : []),
        new TextRun({ children: [new Tab(), job.dates], bold: false, color: COLOR.muted, size: SIZE.small }),
      ],
    }),
  ];

  const isProjectList = job.blocks.length > 1;

  for (const block of job.blocks) {
    if (block.heading) {
      paragraphs.push(
        new Paragraph({
          keepNext: true,
          spacing: isProjectList ? { before: 100, after: 20 } : { after: 20 },
          children: inline(
            block.heading,
            isProjectList ? { bold: true } : { italics: true, color: COLOR.muted }
          ),
        })
      );
    }
    if (block.techStack) {
      paragraphs.push(
        new Paragraph({
          keepNext: true,
          children: [
            new TextRun({ text: 'Tech Stack: ', bold: true, size: SIZE.small, color: COLOR.muted }),
            new TextRun({ text: block.techStack, size: SIZE.small, color: COLOR.muted }),
          ],
        })
      );
    }
    paragraphs.push(...block.bullets.map(bullet));
  }

  for (const note of job.notes) {
    paragraphs.push(
      new Paragraph({
        spacing: { before: 60 },
        children: [new TextRun({ text: `${note.label}: `, bold: true }), ...inline(note.text)],
      })
    );
  }
  return paragraphs;
}

const RENDERERS = {
  SUMMARY: (paragraphs) => paragraphs.map((text) => new Paragraph({ children: inline(text) })),
  SKILLS: (groups) =>
    groups.map(
      ({ label, terms }) => new Paragraph({ children: [new TextRun({ text: `${label}: `, bold: true }), ...inline(terms)] })
    ),
  EXPERIENCE: (jobs) => jobs.flatMap(renderJob),
  EDUCATION: (lines) => lines.map((line) => new Paragraph({ spacing: { after: 0 }, children: inline(line) })),
};

function buildDocument(resume) {
  const children = [...renderHeader(resume.header)];
  for (const { name, content } of resume.sections) {
    children.push(sectionHeading(name), ...RENDERERS[name](content));
  }

  return new Document({
    creator: resume.header.name,
    title: `${resume.header.name} — Resume`,
    description: resume.header.headline,
    styles: {
      default: {
        document: {
          run: { font: FONT, size: SIZE.body, color: COLOR.text },
          paragraph: { spacing: { after: 40, line: 264 } },
        },
        heading1: {
          run: { font: FONT, size: 23, bold: true, color: COLOR.accent },
          paragraph: {
            spacing: { before: 220, after: 80 },
            keepNext: true,
            border: { bottom: { style: BorderStyle.SINGLE, size: 6, space: 1, color: COLOR.accent } },
          },
        },
        heading2: {
          run: { font: FONT, size: 21, bold: true, color: COLOR.text },
          paragraph: { spacing: { before: 160, after: 20 }, keepNext: true },
        },
      },
    },
    numbering: {
      config: [
        {
          reference: 'bullets',
          levels: [
            {
              level: 0,
              format: LevelFormat.BULLET,
              text: '•',
              alignment: AlignmentType.LEFT,
              style: { paragraph: { indent: { left: 360, hanging: 220 } } },
            },
          ],
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: PAGE.width, height: PAGE.height },
            margin: { top: PAGE.margin, right: PAGE.margin, bottom: PAGE.margin, left: PAGE.margin },
          },
        },
        children,
      },
    ],
  });
}

// ── PDF builder (renders a clean HTML version of the resume) ────────────────

function markdownToHtml(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  let html = '';
  let inList = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (inList) { html += '</ul>\n'; inList = false; }
      continue;
    }
    if (/^-{3,}$/.test(trimmed)) {
      if (inList) { html += '</ul>\n'; inList = false; }
      html += '<hr>\n';
      continue;
    }

    // Inline formatting
    const fmt = (s) => s
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*\s][^*]*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    if (/^#\s+/.test(trimmed)) {
      if (inList) { html += '</ul>\n'; inList = false; }
      html += `<h1>${fmt(trimmed.replace(/^#\s+/, ''))}</h1>\n`;
    } else if (/^##\s+/.test(trimmed)) {
      if (inList) { html += '</ul>\n'; inList = false; }
      html += `<h2>${fmt(trimmed.replace(/^##\s+/, ''))}</h2>\n`;
    } else if (/^###\s+/.test(trimmed)) {
      if (inList) { html += '</ul>\n'; inList = false; }
      html += `<h3>${fmt(trimmed.replace(/^###\s+/, ''))}</h3>\n`;
    } else if (/^\*\s+/.test(trimmed)) {
      if (!inList) { html += '<ul>\n'; inList = true; }
      html += `<li>${fmt(trimmed.replace(/^\*\s+/, ''))}</li>\n`;
    } else {
      if (inList) { html += '</ul>\n'; inList = false; }
      html += `<p>${fmt(trimmed)}</p>\n`;
    }
  }
  if (inList) html += '</ul>\n';
  return html;
}

function buildHtmlPage(md) {
  const body = markdownToHtml(md);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Oleksandr Bielov — Resume (Backend)</title>
<style>
  @page { size: A4; margin: 12mm 14mm; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: Calibri, 'Segoe UI', Arial, sans-serif;
    font-size: 10pt;
    line-height: 1.35;
    color: #222;
    max-width: 700px;
    margin: 0 auto;
    padding: 0;
  }
  h1 {
    font-size: 22pt;
    color: #1F3A5F;
    margin-bottom: 2px;
    letter-spacing: -0.5px;
  }
  h2 {
    font-size: 11.5pt;
    color: #1F3A5F;
    border-bottom: 1.5px solid #1F3A5F;
    padding-bottom: 2px;
    margin-top: 14px;
    margin-bottom: 6px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  h3 {
    font-size: 10.5pt;
    color: #222;
    margin-top: 10px;
    margin-bottom: 1px;
  }
  p {
    margin-bottom: 3px;
  }
  hr {
    border: none;
    margin: 0;
  }
  ul {
    margin: 2px 0 4px 18px;
    padding: 0;
  }
  li {
    margin-bottom: 2px;
  }
  li::marker {
    color: #1F3A5F;
  }
  a {
    color: #1F3A5F;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  strong {
    font-weight: 600;
  }
  em {
    color: #555;
  }
  code {
    font-family: Consolas, 'Courier New', monospace;
    font-size: 9pt;
    background: #f4f4f4;
    padding: 0 2px;
    border-radius: 2px;
  }
</style>
</head>
<body>
${body}
</body>
</html>`;
}

// ── Main ────────────────────────────────────────────────────────────────────

async function generateDocx(root) {
  const md = fs.readFileSync(path.join(root, SOURCE_FILE), 'utf8');
  const resume = parseResume(md);
  const outputPath = path.resolve(root, OUTPUT_DOCX);

  const buffer = await Packer.toBuffer(buildDocument(resume));
  try {
    fs.writeFileSync(outputPath, buffer);
  } catch (error) {
    if (error.code === 'EBUSY' || error.code === 'EPERM') {
      throw new Error(`${OUTPUT_DOCX} is locked — close it in Word and run again.`);
    }
    throw error;
  }

  const jobs = resume.sections.find((s) => s.name === 'EXPERIENCE').content;
  const bullets = jobs.reduce((n, job) => n + job.blocks.reduce((m, b) => m + b.bullets.length, 0), 0);
  return { outputPath, size: buffer.length, jobs: jobs.length, bullets };
}

async function generatePdf(root) {
  const md = fs.readFileSync(path.join(root, SOURCE_FILE), 'utf8');
  const htmlContent = buildHtmlPage(md);
  const outputPath = path.resolve(root, OUTPUT_PDF);

  // Write a temp HTML file for Puppeteer
  const tmpHtml = path.resolve(root, '_backend_resume_tmp.html');
  fs.writeFileSync(tmpHtml, htmlContent, 'utf8');

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(`file:///${tmpHtml.replace(/\\/g, '/')}`, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.emulateMediaType('print');

    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      scale: 0.96,
      margin: { top: '7mm', bottom: '7mm', left: '8mm', right: '8mm' },
      preferCSSPageSize: false,
    });

    const { size } = fs.statSync(outputPath);
    if (!size) throw new Error('Generated PDF is empty.');
    return { outputPath, size };
  } finally {
    if (browser) await browser.close();
    // Clean up temp file
    try { fs.unlinkSync(tmpHtml); } catch { /* ignore */ }
  }
}

async function main() {
  const root = __dirname;
  console.log(`Reading source: ${SOURCE_FILE}\n`);

  try {
    const docxResult = await generateDocx(root);
    console.log(`✅ DOCX saved to: ${docxResult.outputPath} (${Math.round(docxResult.size / 1024)} KB, ${docxResult.jobs} roles, ${docxResult.bullets} bullets)`);
  } catch (error) {
    console.error('❌ DOCX generation failed.');
    console.error(error);
    process.exitCode = 1;
  }

  try {
    const pdfResult = await generatePdf(root);
    console.log(`✅ PDF saved to: ${pdfResult.outputPath} (${Math.round(pdfResult.size / 1024)} KB)`);
  } catch (error) {
    console.error('❌ PDF generation failed.');
    console.error(error);
    process.exitCode = 1;
  }
}

main();
