// proxy.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Change this to your Ollama server address if needed
const OLLAMA_URL = 'http://localhost:11434';

// Proxy endpoint for Ollama API requests
app.use('/api', createProxyMiddleware({
  target: OLLAMA_URL, // Target Ollama server
  changeOrigin: true, // Recommended for virtual hosted sites
  pathRewrite: {
    '^/api': '', // Remove /api prefix when forwarding
  },
  onProxyReq: (proxyReq, req, res) => {
    // Optional: Log requests passing through the proxy
    console.log(`[Proxy] Forwarding request: ${req.method} ${req.originalUrl} -> ${OLLAMA_URL}${proxyReq.path}`);
  },
  onError: (err, req, res) => {
    console.error('[Proxy] Proxy error:', err);
    res.writeHead(500, {
      'Content-Type': 'text/plain',
    });
    res.end('Proxy error: Could not connect to the Ollama service.');
  }
}));

// Basic CORS middleware (allow all for development)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

const PORT = 3001; // Port for the proxy server
app.listen(PORT, () => {
  console.log(`Ollama proxy server listening on http://localhost:${PORT}`);
  console.log(`Forwarding /api requests to ${OLLAMA_URL}`);
}); 