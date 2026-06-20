import { Index } from '@upstash/vector';
import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';

// Initialize Upstash Vector client
const index = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN,
});

async function getGoogleEmbedding(text: string): Promise<number[]> {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) throw new Error("Missing GOOGLE_GENERATIVE_AI_API_KEY");

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-2:embedContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: "models/gemini-embedding-2",
      outputDimensionality: 768, // Force 768 dimensions for Upstash Vector matching
      content: { parts: [{ text: text }] }
    })
  });

  const data = await response.json();
  if (!data.embedding || !data.embedding.values) {
    throw new Error("Failed to generate embedding from Google REST API");
  }
  return data.embedding.values;
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content;

    // 1. Generate extremely fast 768-dim embedding using Google REST API via native fetch
    const queryVector = await getGoogleEmbedding(lastMessage);

    // 2. Perform Vector Search against Upstash
    const results = await index.query({
      vector: queryVector,
      topK: 3,
      includeMetadata: true,
    });

    // Extract the most relevant context chunks
    // Since we are using ultra-high-quality Google embeddings, similarity scores will be higher.
    // Let's use 0.5 as a conservative cutoff for relevance.
    const topContexts = results.filter(r => r.score > 0.5);
    const contextString = topContexts.map(r => `- ${r.metadata?.answer}`).join('\n');

    // 3. Generate response using Groq Llama 3 with the retrieved context
    const SYSTEM_PROMPT = `
You are the official AI Assistant for Ambeer Shravan Kumar's personal portfolio. 
Use the following retrieved facts about Shravan to answer the user's question perfectly.

RETRIEVED FACTS FROM UPSTASH VECTOR DATABASE:
${contextString || "No specific facts retrieved. State that you don't know and offer to connect them with Shravan via email at shravanxd99@gmail.com."}

Guidelines:
1. Always be professional, concise, and enthusiastic.
2. Act as if you represent Shravan. Example: "Shravan built a Cloud Log Analyzer..."
3. Keep responses extremely concise. Maximum 3 sentences.
4. CRITICAL: If the retrieved facts DO NOT explicitly mention the specific project, skill, or topic the user is asking about, DO NOT hallucinate or guess! Simply state that you don't have that specific information and tell them to contact Shravan.
5. Do not mention that you retrieved facts from a database, just answer naturally.
`;

    const result = streamText({
      model: groq('llama-3.3-70b-versatile'),
      system: SYSTEM_PROMPT,
      messages,
      maxOutputTokens: 300,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("API Route Error:", error);
    return new Response(JSON.stringify({ error: String(error) }), { status: 500 });
  }
}
