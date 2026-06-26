import type { ChatSession } from '@google/generative-ai';

const chatSessions = new Map<string, ChatSession>();
export const conversationRepository = {
   getLastResponseId(conversationId: string) {
      return chatSessions.get(conversationId);
   },
   setLastResponseId(conversationId: string, chat: ChatSession) {
      chatSessions.set(conversationId, chat);
   },
};
