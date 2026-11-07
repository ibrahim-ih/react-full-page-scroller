'use strict'
// Minimal static server for the production demo build (example/build).
const fs = require('fs')
const http = require('http')
const path = require('path')

const root = path.resolve(__dirname, '..', 'example', 'build')
const port = Number(process.env.E2E_PORT || 4173)
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
}

if (!fs.existsSync(path.join(root, 'index.html'))) {
  console.error('example/build is missing. Run "npm run e2e:build" first.')
  process.exit(1)
}

http
  .createServer((req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname)
    let file = path.join(root, pathname === '/' ? 'index.html' : pathname)
    if (!file.startsWith(root + path.sep) || !fs.existsSync(file)) {
      file = path.join(root, 'index.html')
    }
    if (fs.statSync(file).isDirectory()) file = path.join(file, 'index.html')
    res.writeHead(200, {
      'Content-Type': types[path.extname(file)] || 'application/octet-stream'
    })
    fs.createReadStream(file).pipe(res)
  })
  .listen(port, '127.0.0.1', () => console.log(`Serving ${root} on ${port}`))
