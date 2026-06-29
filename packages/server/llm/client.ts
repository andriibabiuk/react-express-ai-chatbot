import type { ChatSession, StartChatParams } from '@google/generative-ai';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
   throw new Error('GOOGLE_API_KEY is not set');
}

const ai = new GoogleGenerativeAI(apiKey);
const model = ai.getGenerativeModel({ model: 'gemini-2.5-flash' });

export const llmClient = {
   async generateText(prompt: string): Promise<string> {
      const result = await model.generateContent(prompt);
      return result.response.text();
   },

   startChat(params?: StartChatParams): ChatSession {
      return model.startChat(params);
   },
};
