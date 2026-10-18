// Vercel build: run the checks, then publish the page as dist/index.html.
// If a check fails the build fails, and Vercel keeps the last good deployment live.
const fs = require('fs');
const path = require('path');
const { check, FILE } = require('./check');

const { errors } = check();
if (errors.length) {
  errors.forEach(e => console.error('✗ ' + e));
  process.exit(1);
}

const out = path.join(__dirname, '..', 'dist');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
fs.copyFileSync(FILE, path.join(out, 'index.html'));
console.log('✓ dist/index.html ready');
