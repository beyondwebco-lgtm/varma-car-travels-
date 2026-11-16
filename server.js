/**
 * VARMA CAR TRAVELS - High-Performance Static Web Server
 * Built with native Node.js: Zero external dependencies, GZIP/Brotli compression,
 * security headers, and intelligent caching.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

// MIME types mapping
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=UTF-8',
  '.xml': 'application/xml; charset=UTF-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

// Compressible text/code mime types
const COMPRESSIBLE_TYPES = /text|javascript|json|xml|svg/i;

function startServer(port) {
  const server = http.createServer((req, res) => {
    // Basic HTTP method guard
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405, { 'Content-Type': 'text/plain' });
      return res.end('405 Method Not Allowed');
    }

    let reqUrl = req.url.split('?')[0];
    if (reqUrl === '/') reqUrl = '/index.html';

    const safeSuffix = path.normalize(reqUrl).replace(/^(\.\.[\/\\])+/, '');
    let filePath = path.join(PUBLIC_DIR, safeSuffix);

    // Fallback to index.html for unknown paths (SPA / static routing)
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(PUBLIC_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Caching Strategy
    let cacheControl = 'no-cache, must-revalidate';
    if (ext !== '.html') {
      // 7-day browser cache for images, CSS, JS, fonts with stale-while-revalidate
      cacheControl = 'public, max-age=604800, stale-while-revalidate=86400';
    }

    // Security Headers
    const headers = {
      'Content-Type': contentType,
      'Cache-Control': cacheControl,
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self)'
    };

    if (req.method === 'HEAD') {
      res.writeHead(200, headers);
      return res.end();
    }

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end('500 - Server Internal Error');
      }

      const acceptEncoding = req.headers['accept-encoding'] || '';

      // Apply Brotli or Gzip compression for compressible text assets
      if (COMPRESSIBLE_TYPES.test(contentType) && content.length > 512) {
        if (acceptEncoding.includes('br') && typeof zlib.brotliCompress === 'function') {
          headers['Content-Encoding'] = 'br';
          res.writeHead(200, headers);
          return zlib.brotliCompress(content, (brErr, compressed) => {
            if (brErr) return res.end(content);
            res.end(compressed);
          });
        } else if (acceptEncoding.includes('gzip')) {
          headers['Content-Encoding'] = 'gzip';
          res.writeHead(200, headers);
          return zlib.gzip(content, (gzErr, compressed) => {
            if (gzErr) return res.end(content);
            res.end(compressed);
          });
        }
      }

      res.writeHead(200, headers);
      res.end(content);
    });
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`⚠️ Port ${port} is in use, trying port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });

  server.listen(port, () => {
    console.log(`\n======================================================`);
    console.log(`🚗 VARMA CAR TRAVELS - High-Performance Server Running!`);
    console.log(`🌐 Local Website URL: http://localhost:${port}`);
    console.log(`⚡ Compression: GZIP / Brotli Active`);
    console.log(`🛡️ Security Headers & Static Caching Enabled`);
    console.log(`======================================================\n`);
  });
}

startServer(DEFAULT_PORT);
