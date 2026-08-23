import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, dirname, resolve, normalize } from 'node:path';

const dist = resolve('dist');
const src = resolve('src');

const rawSlugs = [
  'ai-compute-emerging-technology',
  'nuclear-technology-strategic-autonomy',
  'technology-control-economic-statecraft',
];

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(path);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      yield path;
    }
  }
}

function getTextContent(html) {
  // Strip script and style content
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ');
}

const errors = [];
const checked = [];

for (const file of walk(dist)) {
  const html = readFileSync(file, 'utf-8');
  checked.push(file);

  // Exactly one H1
  const h1s = [...html.matchAll(/<h1\b[^>]*>(.*?)<\/h1>/gis)];
  if (h1s.length === 0) {
    errors.push(`${file}: missing H1`);
  } else if (h1s.length > 1) {
    errors.push(`${file}: multiple H1 elements (${h1s.length})`);
  }

  // Raw taxonomy slugs visible in text
  const text = getTextContent(html);
  for (const slug of rawSlugs) {
    if (text.includes(slug)) {
      errors.push(`${file}: raw taxonomy slug visible in text: ${slug}`);
    }
  }

  // Images missing alt
  const imgTags = [...html.matchAll(/<img\b[^>]*>/gi)];
  for (const img of imgTags) {
    const tag = img[0];
    if (!/\balt=/.test(tag) && !/\baria-hidden=/.test(tag)) {
      errors.push(`${file}: <img> missing alt text`);
    }
  }

  // Broken internal links
  const links = [...html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>/gi)];
  const baseDir = dirname(file);
  for (const link of links) {
    const rawHref = link[1].trim();
    if (!rawHref || rawHref.startsWith('http') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:') || rawHref.startsWith('#') || rawHref.startsWith('javascript:')) {
      continue;
    }

    const href = rawHref.split('#')[0].split('?')[0];
    if (!href) continue;

    let target;
    if (href.startsWith('/')) {
      const relative = href.replace(/^\//, '');
      const withIndex = relative.endsWith('/') ? `${relative}index.html` : (relative === '' ? 'index.html' : `${relative}/index.html`);
      target = join(dist, withIndex);
    } else {
      const joined = normalize(join(baseDir, href));
      const withIndex = joined.endsWith('/') ? `${joined}index.html` : `${joined}/index.html`;
      target = withIndex;
    }

    if (!existsSync(target) || statSync(target).isDirectory()) {
      errors.push(`${file}: broken internal link ${rawHref}`);
    }
  }
}

// Publication status assertions
const forthcomingFiles = [
  'src/content/publications/finally-a-functional-regime.md',
  'src/content/publications/export-controls-in-an-era-of-strategic-competition.md',
];

for (const file of forthcomingFiles) {
  const content = readFileSync(resolve(file), 'utf-8');
  if (/status:\s*"?Forthcoming"?/i.test(content)) {
    errors.push(`${file}: 2023/2025 article still marked Forthcoming`);
  }
}

// Draft content rendered check: any HTML paths that mention a draft? Not required for static build, but verify no index with 'draft' visible? Not needed.

if (errors.length) {
  console.error('Quality check failed:');
  for (const error of errors) {
    console.error(`  - ${error}`);
  }
  process.exit(1);
}

console.log(`Quality check passed: ${checked.length} HTML files checked.`);
