// Smoke test: opens every screen in headless Chrome, presses the main keys and fails on any JS error.
// Run: node scripts/smoke.js   (set CHROME=/path/to/chrome if Chrome is not found)
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { pathToFileURL } = require('url');

const PAGE = pathToFileURL(path.join(__dirname, '..', 'English-Club-Oyunlar.html')).href;
const CHROME = process.env.CHROME || (process.platform === 'win32'
  ? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  : process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : 'google-chrome');
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const port = 9300 + Math.floor(Math.random() * 600);
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'smoke-'));
  const chrome = spawn(CHROME, ['--headless=new', '--no-sandbox', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
    '--autoplay-policy=no-user-gesture-required', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, '--window-size=1024,768', 'about:blank']);
  chrome.stdout.on('data', () => {}); chrome.stderr.on('data', () => {});
  try {
    let ws;
    for (let i = 0; i < 80 && !ws; i++) {
      try { const page = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find(t => t.type === 'page'); if (page) ws = new WebSocket(page.webSocketDebuggerUrl); } catch (e) { /* not up yet */ }
      if (!ws) await sleep(250);
    }
    if (!ws) throw new Error(`Chrome did not start (${CHROME})`);
    await new Promise((res, rej) => { ws.addEventListener('open', res); ws.addEventListener('error', rej); });

    let id = 0; const pending = new Map(); const errors = [];
    ws.addEventListener('message', ev => {
      const m = JSON.parse(ev.data);
      if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
      if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);
      if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') errors.push('console.error: ' + m.params.args.map(a => a.value ?? a.description).join(' '));
    });
    const send = (method, params = {}) => new Promise(r => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
    const evaluate = async expr => (await send('Runtime.evaluate', { expression: expr, returnByValue: true })).result?.result?.value;
    const press = async (key, times = 1) => { for (let i = 0; i < times; i++) { await evaluate(`window.dispatchEvent(new KeyboardEvent('keydown',{key:${JSON.stringify(key)}}))`); await sleep(250); } };
    let n = 0;
    const open = async route => { await send('Page.navigate', { url: `${PAGE}?r=${++n}#${route}` }); await sleep(700); };

    await send('Page.enable'); await send('Runtime.enable');
    await open('');
    await evaluate(`localStorage.setItem('tegv-ec-names', JSON.stringify(['Ali','Ayşe','Can','Elif']))`);
    await open('');
    const routes = await evaluate(`TOPICS.flatMap(t => t.modes.map(m => t.id + '/' + m.id))`);
    if (!Array.isArray(routes) || !routes.length) throw new Error('could not read the list of screens (TOPICS)');

    let failed = 0;
    const run = async (name, fn) => {
      const before = errors.length;
      await fn();
      const empty = await evaluate(`!document.querySelector('#stage').children.length`);
      const errs = errors.slice(before).concat(empty ? ['screen is empty'] : []);
      console.log(`${errs.length ? '✗' : '✓'} ${name}${errs.length ? '\n    ' + errs.join('\n    ') : ''}`);
      if (errs.length) failed++;
    };

    await run('home', async () => { await open(''); await press('1'); await press('Escape'); });
    for (const r of routes) await run(r, async () => { await open(r); await press(' ', 3); await press('ArrowRight'); await press('ArrowLeft'); await press('Escape'); });
    await run('picker', async () => { await open(''); await press('n'); await sleep(2800); await press('Escape'); });
    await run('help', async () => { await open(''); await press('?'); await press('Escape'); });

    ws.close();
    console.log(failed ? `\n${failed} screen(s) failed` : `\nall ${routes.length + 3} screens ok`);
    process.exitCode = failed ? 1 : 0;
  } finally {
    chrome.kill();
    setTimeout(() => { try { fs.rmSync(profile, { recursive: true, force: true }); } catch (e) {} }, 500);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
