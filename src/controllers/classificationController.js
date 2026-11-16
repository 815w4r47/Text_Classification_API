const { classifyText } = require('../services/classificationService');

const MAX_TEXT_LENGTH = 5000;

async function classify(req, res, next) {
  const text = req.body?.text;
  if (typeof text !== 'string' || !text.trim()) {
    return res.status(400).json({ error: 'text is required and must be a non-empty string.' });
  }
  if (text.trim().length > MAX_TEXT_LENGTH) {
    return res.status(400).json({ error: `text must be ${MAX_TEXT_LENGTH} characters or fewer.` });
  }

  try {
    const result = await classifyText(text.trim());
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

module.exports = { classify };
