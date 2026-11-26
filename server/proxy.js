/**
 * Optional lightweight Node.js proxy so GEMINI_API_KEY never ships in client code.
 * Run: GEMINI_API_KEY=your_key node server/proxy.js
 */
import http from 'node:http';

const PORT = Number(process.env.PORT) || 8787;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://pvdprakash.com';
const MAX_BODY_BYTES = 16_000;
const RATE_WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 20;

const ipBuckets = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const entry = ipBuckets.get(ip);
  if (!entry || now > entry.resetAt) {
    ipBuckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_REQUESTS_PER_WINDOW;
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'X-Content-Type-Options': 'nosniff',
  });
  res.end(JSON.stringify(payload));
}

function readRequestBody(req, maxBytes) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > maxBytes) {
        req.destroy();
        reject(new Error('PAYLOAD_TOO_LARGE'));
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  if (req.method !== 'POST' || req.url !== '/api/chat') {
    return sendJson(res, 404, { error: 'Not found' });
  }

  const clientIp = req.socket?.remoteAddress || 'unknown';
  if (isRateLimited(clientIp)) {
    return sendJson(res, 429, { error: 'Too many requests. Please wait a minute.' });
  }

  if (!GEMINI_API_KEY) {
    return sendJson(res, 503, { error: 'Server API key not configured' });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

  try {
    const rawBody = await readRequestBody(req, MAX_BODY_BYTES);
    const { systemInstruction, contents } = JSON.parse(rawBody);

    if (!Array.isArray(contents) || contents.length === 0 || contents.length > 12) {
      return sendJson(res, 400, { error: 'Invalid conversation payload' });
    }

    const upstream = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(
        GEMINI_API_KEY
      )}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ systemInstruction, contents }),
        signal: controller.signal,
      }
    );

    const data = await upstream.json();
    return sendJson(res, upstream.status, data);
  } catch (err) {
    if (err.message === 'PAYLOAD_TOO_LARGE') {
      return sendJson(res, 413, { error: 'Request payload exceeds limit' });
    }
    if (err.name === 'AbortError') {
      return sendJson(res, 504, { error: 'Upstream AI request timed out' });
    }
    return sendJson(res, 400, { error: 'Invalid request payload' });
  } finally {
    clearTimeout(timeout);
  }
});

server.listen(PORT, () => {
  console.log(`ClearAir secure proxy listening on http://localhost:${PORT}`);
});
