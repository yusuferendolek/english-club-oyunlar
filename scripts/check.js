// Static checks for the single-file site. Used by CI and by the Vercel build (scripts/build.js).
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const FILE = path.join(__dirname, '..', 'English-Club-Oyunlar.html');

function check() {
  const errors = [];
  const html = fs.readFileSync(FILE, 'utf8');

  const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
  if (scripts.length !== 1) errors.push(`expected 1 inline <script>, found ${scripts.length}`);
  for (const code of scripts) {
    try { new vm.Script(code, { filename: 'English-Club-Oyunlar.html <script>' }); }
    catch (e) { errors.push(`JS syntax error: ${e.message}`); }
  }

  // the class PC may be offline, so nothing may be loaded from the network
  const external = html.match(/(?:src|href)\s*=\s*["']?(?:https?:)?\/\/[^"'\s>]+|url\(\s*["']?(?:https?:)?\/\/[^)]+\)|@import/gi);
  if (external) errors.push('external resource found (site must work offline): ' + external.join(', '));

  if (!/<title>[^<]+<\/title>/.test(html)) errors.push('missing <title>');
  if (!/<meta charset="utf-8">/i.test(html)) errors.push('missing <meta charset="utf-8">');

  return { errors, html };
}

module.exports = { check, FILE };

if (require.main === module) {
  const { errors, html } = check();
  if (errors.length) { errors.forEach(e => console.error('✗ ' + e)); process.exit(1); }
  console.log(`✓ ${path.basename(FILE)}: ${(Buffer.byteLength(html) / 1024).toFixed(0)} KB, script parses, no external resources`);
}
