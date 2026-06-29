import { llmClient } from '../llm/client';
import { conversationRepository } from '../repositories/conversation.repository';

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
         let chat = conversationRepository.getLastResponseId(conversationId);
         if (!chat) {
            chat = llmClient.startChat({
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
