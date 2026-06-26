import { ChatSession, GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import type { Request, Response } from 'express';
import express from 'express';
import z from 'zod';
dotenv.config();

const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
   throw new Error('GOOGLE_API_KEY is not set');
}

const ai = new GoogleGenerativeAI(apiKey);
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const chatSessions = new Map<string, ChatSession>();
const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt is required')
      .max(1000, 'Prompt is too long (max 1000 characters)'),
   conversationId: z.string().uuid(),
});

async function generateAIResponse(userPrompt: string, conversationId: string) {
   try {
      const model = ai.getGenerativeModel({ model: 'gemini-2.5-flash' });

      let chat = chatSessions.get(conversationId);
      if (!chat) {
         chat = model.startChat({
            history: [],
         });
         chatSessions.set(conversationId, chat);
      }

      const result = await chat.sendMessage(userPrompt);
      const response = result.response;
      return response.text();
   } catch (error) {
      console.error('Error Gemini API:', error);
      throw new Error(
         'Sorry, I am having trouble connecting to the AI service.'
      );
   }
}

app.get('/', (req: Request, res: Response) => {
   res.send('Hello World!');
});
app.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello World!' });
});

app.post('/api/chat', async (req: Request, res: Response) => {
   const parseResult = chatSchema.safeParse(req.body);
   if (!parseResult.success) {
      res.status(400).json(parseResult.error.format());
      return;
   }
   const { prompt, conversationId } = parseResult.data;
   try {
      const result = await generateAIResponse(prompt, conversationId);
      res.json({ message: result });
   } catch (error) {
      const message =
         error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(500).json({ error: message });
   }
});

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
