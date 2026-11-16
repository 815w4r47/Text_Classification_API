const express = require('express');
const classificationRoutes = require('./routes/classificationRoutes');

const app = express();
app.use(express.json({ limit: '10kb' }));
app.use('/api/classify', classificationRoutes);

app.use((error, _req, res, _next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({ error: 'Request body must contain valid JSON.' });
  }
  const statusCode = error.statusCode || 500;
  if (statusCode >= 500) {
    console.error(JSON.stringify({ event: 'request_failed', status_code: statusCode }));
  }
  return res.status(statusCode).json({ error: error.message || 'Internal server error.' });
});

module.exports = app;
