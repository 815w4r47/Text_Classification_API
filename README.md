# AI-Assisted Text Classification API

A small Express microservice that classifies one input message into `Complaint`, `Query`, `Feedback`, or `Other` using the OpenAI Responses API.

## Requirements

- Node.js 18.17 or newer
- An OpenAI API key with API usage enabled

## Setup

```bash
npm install
cp .env.example .env
```

Set `OPENAI_API_KEY` in `.env`. The default model is `gpt-6-luna`; you can change it with `OPENAI_MODEL`. `PORT` defaults to `3000`. The `.env` file is ignored by Git; do not commit or share your API key.

Start the API:

```bash
npm start
```

For development with automatic restart:

```bash
npm run dev
```

## API

### `POST /api/classify`

Content type: `application/json`

Request:

```json
{
  "text": "I have contacted support twice and my refund still has not arrived. Can someone resolve this?"
}
```

Example response (classification and confidence vary by input):

```json
{
  "category": "Complaint",
  "confidence": 0.96,
  "response_time_ms": 842
}
```

`confidence` is the model's estimated certainty from `0` to `1`, not a statistically calibrated probability. Invalid or missing text returns `400`. Provider failures return `502`, `503`, or `504`. AI calls are logged to stdout with a request ID and duration.

## Prompt and confidence design

The instructions give the model a definition for each category and a tie-break rule: when a message combines a complaint with a question, classify it as a complaint. The message is treated only as text to classify, so instructions embedded in the submitted text do not override the classifier prompt.

The Responses API is asked for a strict JSON schema containing the category and a `0`–`1` confidence value. The API validates the returned label and confidence before responding. The confidence is an approximate model estimate, rather than a calibrated probability.

## Postman

Import `postman/Text-Classification-API.postman_collection.json` into Postman. Start the server, open the **Classify text** request, and select **Send**. The collection sends a sample complaint to `http://localhost:3000/api/classify`.

## Project structure

```text
src/
  app.js
  server.js
  config/config.js
  controllers/classificationController.js
  routes/classificationRoutes.js
  services/classificationService.js
postman/
  Text-Classification-API.postman_collection.json
```