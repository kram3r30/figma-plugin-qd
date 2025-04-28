// proxy.js
const express = require('express');
// Use node-fetch for manual proxying
const fetch = require('node-fetch'); 

const app = express();
const OLLAMA_URL = 'http://localhost:11434'; // Target Ollama server

// --- Moved CORS Middleware First ---
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    console.log('[CORS] Handled OPTIONS request for:', req.originalUrl);
    return res.sendStatus(200);
  }
  console.log('[CORS] Set headers for:', req.originalUrl);
  next();
});
// --- End CORS Middleware ---

// Middleware to parse JSON body from incoming requests
app.use(express.json());

// --- Manual proxy route for /api/generate ---
app.post('/api/generate', async (req, res) => {
  const targetUrl = `${OLLAMA_URL}/api/generate`;
  console.log(`[Manual Proxy] Forwarding POST ${req.originalUrl} to ${targetUrl}`);

  try {
    const ollamaResponse = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Forward other relevant headers if needed, excluding Host, etc.
      },
      // Forward the body received from the client plugin
      body: JSON.stringify(req.body) 
    });

    // Forward the status code from Ollama
    res.status(ollamaResponse.status);

    // Pipe the response body from Ollama directly back to the client plugin
    ollamaResponse.body.pipe(res);

  } catch (error) {
    console.error('[Manual Proxy] Error forwarding request:', error);
    // Send a specific error message back to the client plugin
    res.status(500).send('Proxy error: Could not connect to or forward request to the Ollama service.');
  }
});
// --- End Manual Proxy Route ---


// --- Added Catch-all 404 Handler ---
app.use((req, res, next) => {
  console.log(`[404] Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).send('Proxy: Route Not Found');
});
// --- End 404 Handler ---

const PORT = 3001; // Port for the proxy server
app.listen(PORT, () => {
  console.log(`Manual Ollama proxy server listening on http://localhost:${PORT}`);
  console.log(`Proxying POST /api/generate requests to ${OLLAMA_URL}/api/generate`);
}); 