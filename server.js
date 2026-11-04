// Static file server for the deck (reveal.js fetches the .md files, so file:// won't work).
// Hot reload: watches slides/apps/assets/index.html and tells open pages to reload via SSE.
const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 8000;
const types = {
  '.html': 'text/html; charset=utf-8', '.md': 'text/markdown; charset=utf-8',
  '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.woff': 'font/woff', '.woff2': 'font/woff2',
};

const clients = new Set();
const reloadScript = '<script>new EventSource("/__reload").onmessage=()=>location.reload()</script>';

let timer;
for (const p of ['slides', 'apps', 'assets', 'index.html']) {
  fs.watch(path.join(__dirname, p), { recursive: true }, () => {
    clearTimeout(timer); // editors fire several events per save
    timer = setTimeout(() => clients.forEach((res) => res.write('data: reload\n\n')), 100);
  });
}

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://x');
  if (url.pathname === '/__reload') {
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' });
    clients.add(res);
    return req.on('close', () => clients.delete(res));
  }
  let file = path.join(__dirname, decodeURIComponent(url.pathname));
  if (!file.startsWith(__dirname)) return res.writeHead(403).end();
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  fs.readFile(file, (err, data) => {
    if (err) return res.writeHead(404).end('Not found');
    const ext = path.extname(file);
    if (ext === '.html') data = data.toString().replace('</body>', reloadScript + '</body>');
    res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream', 'Cache-Control': 'no-cache' }).end(data);
  });
}).listen(port, 'localhost', () => console.log(`http://localhost:${port}`));
