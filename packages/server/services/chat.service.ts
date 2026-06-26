import { GoogleGenerativeAI } from '@google/generative-ai';
import { conversationRepository } from '../repositories/conversation.repository';

const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
   throw new Error('GOOGLE_API_KEY is not set');
}

const ai = new GoogleGenerativeAI(apiKey);
type ChatResponse = {
   id: string;
   message: string;
};
export const chatService = {
   async generateAIResponse(
      userPrompt: string,
      conversationId: string
   ): Promise<ChatResponse> {
      try {
         const model = ai.getGenerativeModel({ model: 'gemini-2.5-flash' });

         let chat = conversationRepository.getLastResponseId(conversationId);
         if (!chat) {
            chat = model.startChat({
               history: [],
            });
            conversationRepository.setLastResponseId(conversationId, chat);
         }

         const result = await chat.sendMessage(userPrompt);
         const response = result.response;
         return {
            id: conversationId,
            message: response.text(),
         };
      } catch (error) {
         console.error('Error Gemini API:', error);
         throw new Error(
            'Sorry, I am having trouble connecting to the AI service.'
         );
      }
   },
};
