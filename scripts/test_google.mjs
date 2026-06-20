import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env.local') });

async function testGoogleEmbedding() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    console.error("No API key found in .env.local");
    return;
  }

  console.log("Testing Google REST API for text-embedding-004...");
  
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-2:embedContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: "models/gemini-embedding-2",
        outputDimensionality: 768,
        content: { parts: [{ text: "What is Tactical IQ?" }] }
      })
    });
    const data = await response.json();
    console.log("Success! Dimension:", data.embedding.values.length);
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}

testGoogleEmbedding();
