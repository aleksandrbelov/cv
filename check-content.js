/**
 * Content drift check.
 *
 * README.md (plus AI_ML_PROJECTS.md for the deep-dive) is the source of truth
 * for resume content. index.html owns presentation only — every word it shows
 * must trace back to the Markdown. This fails the build when the two diverge,
 * so the PDF and the site can never quietly disagree with the README.
 *
 * Scope: prose bullets, summary, skills, tech-stack chips and date ranges.
 * Presentation-only text (availability badge, nav pills, footer) is not checked.
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

/** Strip Markdown/HTML formatting differences so only wording is compared. */
const norm = (s) =>
  s
    .replace(/\*\*/g, '')
    .replace(/`/g, '')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[—–]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\.$/, '')
    .toLowerCase();

const bulletsOf = (md) =>
  md
    .split('\n')
    .filter((line) => /^\s*\*\s+/.test(line))
    .map((line) => line.replace(/^\s*\*\s+/, '').trim());

/** Split a comma list without breaking entries like "Java (Spring Boot, Kafka Streams)". */
function splitTerms(list) {
  const terms = [];
  let depth = 0;
  let current = '';
  for (const char of list) {
    if (char === '(') depth += 1;
    else if (char === ')') depth = Math.max(0, depth - 1);
    if (char === ',' && depth === 0) {
      terms.push(current);
      current = '';
      continue;
    }
    current += char;
  }
  terms.push(current);
  return terms.map((term) => term.trim()).filter(Boolean);
}

/** Year ranges like "2020–2025", compared without spacing/dash variation. */
const yearRanges = (text) =>
  (text.match(/\d{4}\s*[–—-]\s*\d{4}/g) || []).map((r) => r.replace(/\s*[–—-]\s*/, '-'));

function readSection(md, heading) {
  const after = md.split(heading)[1];
  return after ? after.split('\n---')[0] : '';
}

function skillsFromMarkdown(md) {
  const section = readSection(md, '## SKILLS');
  const groups = new Map();
  for (const line of section.split('\n')) {
    const match = line.match(/^\*\*(.+?):\*\*\s*(.+?)\s*$/);
    if (!match) continue;
    groups.set(norm(match[1]), splitTerms(match[2]));
  }
  return groups;
}

function techStackTerms(md) {
  const terms = new Set();
  for (const line of md.split('\n')) {
    const match = line.match(/\*\*Tech Stack:\*\*\s*(.+)$/);
    if (!match) continue;
    for (const term of splitTerms(match[1])) terms.add(norm(term));
  }
  return terms;
}

async function readHtml(htmlPath) {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  try {
    const page = await browser.newPage();
    await page.goto(`file:///${htmlPath.replace(/\\/g, '/')}`, { waitUntil: 'domcontentloaded' });
    return await page.evaluate(() => {
      const text = (el) => (el ? el.innerText.replace(/\s+/g, ' ').trim() : '');
      const all = (sel, root = document) => [...root.querySelectorAll(sel)].map(text);
      const accordion = new Set(all('.expand-inner li'));
      return {
        summary: text(document.querySelector('.summary-text')),
        // Bullets outside the accordion mirror README; accordion mirrors AI_ML_PROJECTS.
        mainBullets: all('.timeline-item li').filter((t) => !accordion.has(t)),
        accordionBullets: [...accordion],
        chips: all('.tech-stack-mini span'),
        dates: all('.date-badge'),
        skills: [...document.querySelectorAll('.skills-grid > div')].map((group) => ({
          label: text(group.querySelector('h4')),
          tags: all('.skill-tag', group),
        })),
      };
    });
  } finally {
    await browser.close();
  }
}

function diffSets(sourceItems, htmlItems, label, problems) {
  const source = new Map(sourceItems.map((item) => [norm(item), item]));
  const html = new Map(htmlItems.map((item) => [norm(item), item]));

  for (const [key, value] of source) {
    if (!html.has(key)) problems.push(`${label}: in source of truth but MISSING from index.html\n    ${value}`);
  }
  for (const [key, value] of html) {
    if (!source.has(key)) problems.push(`${label}: in index.html but NOT in source of truth\n    ${value}`);
  }
}

async function checkContent(root = __dirname) {
  // Markdown here uses CRLF; normalise so line-anchored regexes don't trip on \r.
  const read = (file) => fs.readFileSync(path.join(root, file), 'utf8').replace(/\r\n/g, '\n');
  const readme = read('README.md');
  const projects = read('AI_ML_PROJECTS.md');
  const html = await readHtml(path.join(root, 'index.html'));
  const problems = [];

  diffSets(bulletsOf(readme), html.mainBullets, 'Experience bullet', problems);
  diffSets(bulletsOf(projects), html.accordionBullets, 'Technical detail bullet', problems);

  const summary = readSection(readme, '## SUMMARY').trim();
  if (norm(summary) !== norm(html.summary)) {
    problems.push(`Summary: differs from README\n    README: ${summary}\n    HTML:   ${html.summary}`);
  }

  const mdSkills = skillsFromMarkdown(readme);
  const htmlLabels = html.skills.map((g) => norm(g.label));
  for (const label of mdSkills.keys()) {
    if (!htmlLabels.includes(label)) problems.push(`Skill group "${label}" is in README but missing from index.html`);
  }
  for (const group of html.skills) {
    const expected = mdSkills.get(norm(group.label));
    if (!expected) {
      problems.push(`Skill group "${group.label}" is in index.html but not in README`);
      continue;
    }
    diffSets(expected, group.tags, `Skill (${group.label})`, problems);
  }

  // README omits some stacks entirely, so chips only need to be a subset.
  const stackTerms = techStackTerms(readme);
  for (const chip of html.chips) {
    if (!stackTerms.has(norm(chip))) {
      problems.push(`Tech chip "${chip}" does not appear in any README Tech Stack line`);
    }
  }

  const mdYears = new Set(yearRanges(readme));
  for (const badge of html.dates) {
    const [range] = yearRanges(badge);
    if (range && !mdYears.has(range)) problems.push(`Date badge "${badge}" has no matching range in README`);
  }

  return problems;
}

if (require.main === module) {
  checkContent()
    .then((problems) => {
      if (!problems.length) {
        console.log('✅ index.html matches README.md / AI_ML_PROJECTS.md');
        return;
      }
      console.error(`❌ ${problems.length} content drift issue(s). README.md is the source of truth:\n`);
      problems.forEach((p) => console.error(`  - ${p}\n`));
      process.exitCode = 1;
    })
    .catch((error) => {
      console.error('❌ Content check failed to run.');
      console.error(error);
      process.exitCode = 1;
    });
}

module.exports = { checkContent };
