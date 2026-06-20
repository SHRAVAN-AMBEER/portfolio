import { pipeline, env } from '@xenova/transformers';
import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';
import fs from 'fs';
import path from 'path';

// Force Transformers.js to download models from HuggingFace Hub since serverless doesn't have local cache
env.allowLocalModels = false;

function cosineSimilarity(vecA: number[], vecB: number[]) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content;

    // Load the pre-computed JSON vector store
    const vectorStorePath = path.join(process.cwd(), 'src/lib/vector_store.json');
    const vectorStore = JSON.parse(fs.readFileSync(vectorStorePath, 'utf8'));

    // 1. Initialize the embedding model on the server
    const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

    // 2. Embed the user's query
    const output = await extractor(lastMessage, { pooling: 'mean', normalize: true });
    // @ts-ignore
    const queryEmbedding = output.tolist()[0];

    // 3. Perform Vector Search (Cosine Similarity) against the JSON database
    const results = vectorStore.map((item: any) => ({
      ...item,
      similarity: cosineSimilarity(queryEmbedding, item.embedding)
    })).sort((a: any, b: any) => b.similarity - a.similarity);

    // Get the top 3 most relevant context chunks
    const topContexts = results.slice(0, 3).filter((r: any) => r.similarity > 0.3);
    const contextString = topContexts.map((r: any) => `- ${r.answer}`).join('\n');

    // 4. Generate response using Groq Llama 3 with the retrieved context
    const SYSTEM_PROMPT = `
You are the official AI Assistant for Ambeer Shravan Kumar's personal portfolio. 
Use the following retrieved facts about Shravan to answer the user's question perfectly.

RETRIEVED FACTS FROM DATABASE:
${contextString || "No specific facts retrieved. State that you don't know and offer to connect them with Shravan via email at shravanxd99@gmail.com."}

Guidelines:
1. Always be professional, concise, and enthusiastic.
2. Act as if you represent Shravan. Example: "Shravan built a Cloud Log Analyzer..."
3. Keep responses extremely concise. Maximum 3 sentences.
4. Do not mention that you retrieved facts from a database, just answer naturally.
`;

    const result = streamText({
      model: groq('llama3-8b-8192'),
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
