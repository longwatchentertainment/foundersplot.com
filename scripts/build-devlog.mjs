#!/usr/bin/env node
// Builds the dev log pages from markdown. No installs needed: plain Node 18+.
//
//   node scripts/build-devlog.mjs
//
// Sources (the only files a person or the Friday routine edits):
//   devlog/posts/YYYY-MM-DD-some-slug.md   the weekly dev log, written for players
// The first line of each file is the title ("# Dev Log #16: ..."). The rest is
// plain markdown: paragraphs, **bold**, *italic*, `code`, [links](https://...),
// "## " headings, "- " or "1. " lists, "> " quotes.
//
// Writes (never edit these by hand, they are rebuilt every time):
//   devlog/<name>.html, devlog/index.html, devlog/feed.xml,
//   the "latest posts" block on index.html and the dev log lines in sitemap.xml.
//
// The file name is the page address, so rename a file only before it is published.

import { readFileSync, writeFileSync, readdirSync, existsSync, unlinkSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://www.foundersplot.com';
const NAME_RE = /^(\d{4})-(\d{2})-(\d{2})-[a-z0-9-]+\.md$/;
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// ---------------------------------------------------------------- markdown
function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function inline(text) {
  // Code spans first, so nothing inside them is formatted.
  const codes = [];
  let s = text.replace(/`([^`]+)`/g, (_, c) => {
    codes.push(c);
    return `\u0000${codes.length - 1}\u0000`;
  });
  s = esc(s);
  s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]*)\)/g, (_, t, u) => {
    const external = u.startsWith('http') && !u.startsWith(SITE);
    return `<a href="${u}"${external ? ' rel="noopener"' : ''}>${t}</a>`;
  });
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*\w])\*([^*\s][^*]*)\*(?!\w)/g, '$1<em>$2</em>');
  s = s.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${esc(codes[Number(i)])}</code>`);
  return s;
}

function markdownToHtml(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let para = [];
  let list = null; // { tag, items }
  let quote = [];

  const flushPara = () => {
    if (para.length) out.push(`<p>${inline(para.join(' '))}</p>`);
    para = [];
  };
  const flushList = () => {
    if (list) out.push(`<${list.tag}>${list.items.map((i) => `<li>${inline(i)}</li>`).join('')}</${list.tag}>`);
    list = null;
  };
  const flushQuote = () => {
    if (quote.length) out.push(`<blockquote><p>${inline(quote.join(' '))}</p></blockquote>`);
    quote = [];
  };
  const flushAll = () => {
    flushPara();
    flushList();
    flushQuote();
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      flushAll();
      continue;
    }
    let m;
    if ((m = line.match(/^(#{2,4})\s+(.*)$/))) {
      flushAll();
      const level = Math.min(4, m[1].length);
      out.push(`<h${level}>${inline(m[2])}</h${level}>`);
    } else if (/^(-{3,}|\*{3,})$/.test(line.trim())) {
      flushAll();
      out.push('<hr>');
    } else if ((m = line.match(/^\s*[-*]\s+(.*)$/))) {
      flushPara();
      flushQuote();
      if (!list || list.tag !== 'ul') {
        flushList();
        list = { tag: 'ul', items: [] };
      }
      list.items.push(m[1]);
    } else if ((m = line.match(/^\s*\d+\.\s+(.*)$/))) {
      flushPara();
      flushQuote();
      if (!list || list.tag !== 'ol') {
        flushList();
        list = { tag: 'ol', items: [] };
      }
      list.items.push(m[1]);
    } else if ((m = line.match(/^>\s?(.*)$/))) {
      flushPara();
      flushList();
      quote.push(m[1]);
    } else if (list && /^\s{2,}\S/.test(raw)) {
      list.items[list.items.length - 1] += ' ' + line.trim();
    } else {
      flushList();
      flushQuote();
      para.push(line.trim());
    }
  }
  flushAll();
  return out.join('\n');
}

function plainText(md) {
  return md
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*#>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function excerpt(md, max = 220) {
  const firstPara = md.replace(/\r\n/g, '\n').split(/\n\s*\n/).map((p) => p.trim()).find((p) => p && !p.startsWith('#')) ?? '';
  const t = plainText(firstPara);
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(' ')) + '...';
}

// ---------------------------------------------------------------- posts
function readPosts() {
  const folder = 'posts';
  const dir = join(ROOT, 'devlog', folder);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const m = file.match(NAME_RE);
      if (!m) throw new Error(`devlog/${folder}/${file}: name must look like 2026-11-14-short-title.md (lowercase, numbers and dashes)`);
      const text = readFileSync(join(dir, file), 'utf8').replace(/^﻿/, '');
      const nl = text.indexOf('\n');
      const first = (nl === -1 ? text : text.slice(0, nl)).trim();
      if (!first.startsWith('# ')) throw new Error(`devlog/${folder}/${file}: the first line must be the title, starting with "# "`);
      const body = nl === -1 ? '' : text.slice(nl + 1);
      const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
      const name = file.replace(/\.md$/, '');
      return {
        file,
        name,
        date: `${m[1]}-${m[2]}-${m[3]}`,
        dateLabel: `${MONTHS[mo - 1]} ${d}, ${y}`,
        title: first.slice(2).trim(),
        body,
        url: `/devlog/${name}.html`,
        out: join(ROOT, 'devlog', `${name}.html`),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.name < b.name ? 1 : -1));
}

// ---------------------------------------------------------------- page shell
const NAV = `<header>
  <a class="wordmark" href="/">Founder's Plot<span class="brand-leaf" aria-hidden="true">&#10087;</span></a>
  <nav aria-label="Main navigation">
    <a href="/#about">The game</a>
    <a href="/#journey">Your journey</a>
    <a href="/devlog/">Dev log</a>
    <a href="/support.html">Support</a>
    <a href="/press.html">Press</a>
  </nav>
  <a class="button small gold" href="/#download">Get the game</a>
</header>`;

const FOOTER = `<footer>
  <a class="wordmark" href="/">Founder's Plot</a>
  <p>&copy; 2026 Long Watch LLC &middot; Kansas</p>
  <div>
    <a href="/privacy.html">Privacy</a>
    <a href="/terms.html">Terms</a>
    <a href="/support.html">Support</a>
    <a href="/press.html">Press</a>
    <a href="/devlog/">Dev log</a>
  </div>
</footer>
<!-- Cloudflare Web Analytics --><script type='module' src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "995e2e1098e746f1bab699c5ea7b5f7f"}'></script><!-- End Cloudflare Web Analytics -->`;

const GENERATED = '<!-- Built by scripts/build-devlog.mjs from devlog/posts. Edit the .md file, not this page. -->';

function page({ title, description, canonical, head = '', eyebrow, h1, sub, content }) {
  return `<!DOCTYPE html>
${GENERATED}
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="${esc(description)}">
<title>${esc(title)}</title>
<link rel="canonical" href="${SITE}${canonical}">
<link rel="icon" href="/assets/img/icon.png">
<link rel="alternate" type="application/rss+xml" title="Founder's Plot dev log" href="/devlog/feed.xml">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${SITE}${canonical}">
<meta property="og:image" content="${SITE}/assets/img/share.png">
<link rel="stylesheet" href="/assets/css/refinements.css">
<link rel="stylesheet" href="/assets/css/content.css">
<link rel="stylesheet" href="/assets/css/devlog.css">
${head}</head>
<body>
<a class="skip" href="#main">Skip to content</a>

${NAV}

<main id="main">
<div class="page-header">
  <div class="page-header-inner">
    <p class="eyebrow">${eyebrow}</p>
    <h1>${h1}</h1>
    ${sub ? `<p class="updated">${sub}</p>` : ''}
  </div>
</div>

<div class="content">
  <div class="content-inner">
${content}
  </div>
</div>
</main>

${FOOTER}
</body>
</html>
`;
}

function postPage(p, newer, older) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    datePublished: p.date,
    author: { '@type': 'Person', name: 'Charles Johnson' },
    publisher: { '@type': 'Organization', name: 'Long Watch LLC' },
    mainEntityOfPage: `${SITE}${p.url}`,
    image: `${SITE}/assets/img/share.png`,
  };
  const navLinks = [
    newer ? `<a class="devlog-newer" href="${newer.url}">&larr; Newer: ${esc(newer.title)}</a>` : '',
    older ? `<a class="devlog-older" href="${older.url}">Older: ${esc(older.title)} &rarr;</a>` : '',
  ].join('');
  return page({
    title: `${p.title} | Founder's Plot dev log`,
    description: excerpt(p.body, 155),
    canonical: p.url,
    head: `<script type="application/ld+json">${JSON.stringify(ld)}</script>\n`,
    eyebrow: '<a href="/devlog/">Dev log</a>',
    h1: esc(p.title),
    sub: `<time datetime="${p.date}">${p.dateLabel}</time>`,
    content: `    <article class="card devlog-post">
${markdownToHtml(p.body)}
    </article>
    ${navLinks ? `<nav class="devlog-pager" aria-label="More posts">${navLinks}</nav>` : ''}
    <p class="devlog-back"><a href="/devlog/">All dev log posts</a></p>`,
  });
}

function listItem(p) {
  return `      <li class="devlog-item">
        <time datetime="${p.date}">${p.dateLabel}</time>
        <h3><a href="${p.url}">${esc(p.title)}</a></h3>
        <p>${esc(excerpt(p.body))}</p>
      </li>`;
}

function indexPage(posts) {
  return page({
    title: "Dev log | Founder's Plot",
    description: "Weekly notes from the solo developer of Founder's Plot: what changed in the game, why, and what is coming next.",
    canonical: '/devlog/',
    eyebrow: 'Dev log',
    h1: 'Follow the build',
    sub: 'Founder\'s Plot is made by one developer in Kansas. A new post goes up most Fridays. <a href="/devlog/feed.xml">RSS feed</a>',
    content: `    <section class="devlog-list" aria-label="Dev log posts">
      <ul>
${posts.map(listItem).join('\n')}
      </ul>
    </section>`,
  });
}

function feed(all) {
  const items = all
    .slice(0, 30)
    .map(
      (p) => `  <item>
    <title>${esc(p.title)}</title>
    <link>${SITE}${p.url}</link>
    <guid>${SITE}${p.url}</guid>
    <pubDate>${new Date(`${p.date}T16:00:00-06:00`).toUTCString()}</pubDate>
    <description>${esc(excerpt(p.body, 400))}</description>
  </item>`
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>Founder's Plot dev log</title>
  <link>${SITE}/devlog/</link>
  <description>Weekly notes from the solo developer of Founder's Plot.</description>
  <language>en-us</language>
${items}
</channel>
</rss>
`;
}

function replaceBetween(text, start, end, inner, label) {
  const a = text.indexOf(start);
  const b = text.indexOf(end);
  if (a === -1 || b === -1 || b < a) throw new Error(`${label}: markers ${start} ... ${end} not found`);
  return text.slice(0, a + start.length) + inner + text.slice(b);
}

// ---------------------------------------------------------------- build
const posts = readPosts();

// Remove pages whose source file is gone (a renamed or withdrawn post).
const keep = new Set(posts.map((p) => `${p.name}.html`));
for (const f of readdirSync(join(ROOT, 'devlog'))) {
  if (!f.endsWith('.html') || f === 'index.html' || keep.has(f)) continue;
  const full = join(ROOT, 'devlog', f);
  if (readFileSync(full, 'utf8').includes(GENERATED)) unlinkSync(full);
}

posts.forEach((p, i) => writeFileSync(p.out, postPage(p, posts[i - 1], posts[i + 1])));
writeFileSync(join(ROOT, 'devlog', 'index.html'), indexPage(posts));
writeFileSync(join(ROOT, 'devlog', 'feed.xml'), feed(posts));

// Latest three posts on the home page.
const homePath = join(ROOT, 'index.html');
const latest = posts
  .slice(0, 3)
  .map((p) => `\n      <li><a href="${p.url}"><time datetime="${p.date}">${p.dateLabel}</time><span>${esc(p.title)}</span></a></li>`)
  .join('');
writeFileSync(
  homePath,
  replaceBetween(readFileSync(homePath, 'utf8'), '<!-- DEVLOG:LATEST START -->', '<!-- DEVLOG:LATEST END -->', `\n    <ul class="devlog-latest">${latest}\n    </ul>\n    `, 'index.html')
);

// Sitemap lines for the dev log.
const smPath = join(ROOT, 'sitemap.xml');
const newest = posts[0]?.date ?? '';
const smLines = [
  `  <url><loc>${SITE}/devlog/</loc><lastmod>${newest}</lastmod><priority>0.7</priority></url>`,
  ...posts.map((p) => `  <url><loc>${SITE}${p.url}</loc><lastmod>${p.date}</lastmod><priority>0.6</priority></url>`),
].join('\n');
writeFileSync(smPath, replaceBetween(readFileSync(smPath, 'utf8'), '<!-- DEVLOG START -->', '<!-- DEVLOG END -->', `\n${smLines}\n  `, 'sitemap.xml'));

console.log(`Dev log built: ${posts.length} posts.`);
