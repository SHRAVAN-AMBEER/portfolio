import { pipeline, env } from '@xenova/transformers';
import { Index } from '@upstash/vector';
import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';

// Force Transformers.js to download models from HuggingFace Hub since serverless doesn't have local cache
env.allowLocalModels = false;
env.useBrowserCache = false;

// CRITICAL FOR VERCEL: The filesystem is read-only except for /tmp.
// We must point the Transformers.js cache to /tmp or it will crash with a 500 error!
env.cacheDir = '/tmp/.transformers_cache';

// Initialize Upstash Vector client
const index = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content;

    // 1. Initialize the embedding model on the server
    const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

    // 2. Embed the user's query
    const output = await extractor(lastMessage, { pooling: 'mean', normalize: true });
    // @ts-ignore
    const rawEmbedding = output.tolist()[0];
    
    // 3. Zero-pad the embedding to 768 dimensions to match the Upstash database
    const queryVector = [...rawEmbedding, ...Array(384).fill(0)];

    // 4. Perform Vector Search against Upstash
    const results = await index.query({
      vector: queryVector,
      topK: 3,
      includeMetadata: true,
    });

    // Extract the most relevant context chunks
    const topContexts = results.filter(r => r.score > 0.3);
    const contextString = topContexts.map(r => `- ${r.metadata?.answer}`).join('\n');

    // 5. Generate response using Groq Llama 3 with the retrieved context
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
