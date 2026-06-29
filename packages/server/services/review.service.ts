import type { Review } from '@prisma/client';
import { llmClient } from '../llm/client';
import template from '../prompts/summarize-reviews.txt';
import { reviewRepository } from '../repositories/review.repository';
export const reviewService = {
   async getReviews(productId: number): Promise<Review[]> {
      return reviewRepository.getReviews(productId);
   },
   async summarizeReviews(productId: number): Promise<string> {
      try {
         const existingSummary =
            await reviewRepository.getReviewSummary(productId);
         if (existingSummary) {
            return existingSummary;
         }
         const reviews = await reviewRepository.getReviews(productId, 10);
         if (reviews.length === 0) {
            return 'There are not enough reviews to generate a summary.';
         }
         const joinedReviews = reviews
            .map((r) => r.content)
            .join('\n\n---\n\n');
         const prompt = template.replace('{{reviews}}', joinedReviews);
         const summary = await llmClient.generateText(prompt);
         await reviewRepository.storeReviewSummary(productId, summary);
         return summary;
      } catch (error) {
         console.error('Error summarizing reviews with Gemini API:', error);
         throw new Error(
            'Sorry, I am having trouble generating the review summary.'
         );
      }
   },
   async checkIfProductHasReviews(productId: number) {
      return await reviewRepository.getReviews(productId, 1);
   },
};
