// Post-build step: renders the page to static HTML so search engines and link
// previews get real content instead of an empty <div id="root">.
//
//   vite build                                 -> dist/ (client bundle)
//   vite build --ssr src/entry-server.jsx ...  -> dist-ssr/ (renderer)
//   node scripts/prerender.mjs                 -> dist/index.html, sitemap.xml
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const SITE_URL = 'https://ai.messerdigital.com';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

const indexPath = path.join(dist, 'index.html');
const template = await fs.readFile(indexPath, 'utf8');
const placeholder = '<div id="root"></div>';
if (!template.includes(placeholder)) throw new Error('prerender: index.html is missing <div id="root"></div>');

await fs.writeFile(indexPath, template.replace(placeholder, `<div id="root">${render()}</div>`));
console.log('prerendered / -> dist/index.html');

const today = new Date().toISOString().slice(0, 10);
await fs.writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
`
);
console.log('wrote dist/sitemap.xml');

await fs.rm(ssrDir, { recursive: true, force: true });
