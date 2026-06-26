import type { Request, Response } from 'express';
import z from 'zod';
import { chatService } from '../services/chat.service';

const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt is required')
      .max(1000, 'Prompt is too long (max 1000 characters)'),
   conversationId: z.string().uuid(),
});

export const chatController = {
   async postChat(req: Request, res: Response) {
      try {
         const parseResult = chatSchema.safeParse(req.body);
         if (!parseResult.success) {
            res.status(400).json(parseResult.error.format());
            return;
         }
         const { prompt, conversationId } = parseResult.data;
         const result = await chatService.generateAIResponse(
            prompt,
            conversationId
         );
         res.json({ message: result.message });
      } catch (error) {
         const message =
            error instanceof Error
               ? error.message
               : 'An unknown error occurred';
         res.status(500).json({ error: message });
      }
   },
};
