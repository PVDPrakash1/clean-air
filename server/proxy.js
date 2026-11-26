/**
 * Optional lightweight Node.js / Express proxy so GEMINI_API_KEY never ships in client code.
 * Run: GEMINI_API_KEY=your_key node server/proxy.js
 */
import http from 'node:http';

const PORT = process.env.PORT || 8787;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || 'https://pvdprakash.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  if (req.method !== 'POST' || req.url !== '/api/chat') {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Not found' }));
  }

  if (!GEMINI_API_KEY) {
    res.writeHead(503, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Server API key not configured' }));
  }

  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
    if (body.length > 16_000) req.destroy();
  });

  req.on('end', async () => {
    try {
      const { systemInstruction, contents } = JSON.parse(body);
      const upstream = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ systemInstruction, contents }),
        }
      );
      const data = await upstream.json();
      res.writeHead(upstream.status, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    } catch {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid request payload' }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`ClearAir secure proxy listening on http://localhost:${PORT}`);
});
