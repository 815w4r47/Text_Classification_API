require('dotenv').config();

module.exports = {
  port: Number.parseInt(process.env.PORT || '3000', 10),
  openAiApiKey: process.env.OPENAI_API_KEY,
  openAiModel: process.env.OPENAI_MODEL || 'gpt-6-luna',
  openAiTimeoutMs: Number.parseInt(process.env.OPENAI_TIMEOUT_MS || '30000', 10),
};
