import { pipeline, env, FeatureExtractionPipeline } from '@xenova/transformers';
import { knowledgeBase } from './knowledge_base';

// Skip local model check since we are running in the browser and loading from HF Hub
env.allowLocalModels = false;

class PipelineSingleton {
  static task = 'feature-extraction';
  static model = 'Xenova/all-MiniLM-L6-v2';
  static instance: Promise<FeatureExtractionPipeline> | null = null;

  static async getInstance(progress_callback?: (x: any) => void) {
    if (this.instance === null) {
      // @ts-ignore
      this.instance = pipeline(this.task, this.model, { progress_callback });
    }
    return this.instance;
  }
}

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

let kbEmbeddings: number[][] | null = null;

self.addEventListener('message', async (event) => {
  const { text } = event.data;

  const extractor = await PipelineSingleton.getInstance((x) => {
    self.postMessage(x);
  });

  try {
    // 1. Embed Knowledge Base (Cached on first run)
    if (!kbEmbeddings) {
      const kbQuestions = knowledgeBase.map((item) => item.question);
      // @ts-ignore
      const kbOutput = await extractor(kbQuestions, { pooling: 'mean', normalize: true });
      kbEmbeddings = kbOutput.tolist();
    }

    // 2. Embed User Query
    // @ts-ignore
    const queryOutput = await extractor(text, { pooling: 'mean', normalize: true });
    const queryEmbedding = queryOutput.tolist()[0];

    // 3. Find Best Match
    let maxSimilarity = -1;
    let bestMatchIndex = -1;

    for (let i = 0; i < knowledgeBase.length; i++) {
      const sim = cosineSimilarity(queryEmbedding, kbEmbeddings![i]);
      if (sim > maxSimilarity) {
        maxSimilarity = sim;
        bestMatchIndex = i;
      }
    }

    // 4. Return Output
    if (maxSimilarity > 0.4) {
      self.postMessage({
        status: 'complete',
        result: knowledgeBase[bestMatchIndex].answer,
      });
    } else {
      self.postMessage({
        status: 'complete',
        result: "I'm sorry, I'm not sure about that. Please contact Shravan directly via email (shravanxd99@gmail.com) for more specific details!",
      });
    }

  } catch (error) {
    self.postMessage({ status: 'error', error: String(error) });
  }
});
