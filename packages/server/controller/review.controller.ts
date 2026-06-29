import type { Request, Response } from 'express';
import { reviewRepository } from '../repositories/review.repository';
import { productService } from '../services/product.service';
import { reviewService } from '../services/review.service';
export const reviewController = {
   async getReviews(req: Request, res: Response) {
      const productId = Number(req.params.id);
      if (isNaN(productId)) {
         return res.status(400).json({ error: 'Invalid product ID' });
      }
      const product = await productService.getProduct(productId);
      if (!product) {
         return res.status(404).json({ error: 'Product does not exist.' });
      }
      const reviews = await reviewService.getReviews(productId);
      const summary = await reviewRepository.getReviewSummary(productId);
      res.json({
         summary,
         reviews,
      });
   },
   async summarizeReviews(req: Request, res: Response) {
      const productId = Number(req.params.id);
      if (isNaN(productId)) {
         return res.status(400).json({ error: 'Invalid product ID' });
      }
      const product = await productService.getProduct(productId);
      if (!product) {
         return res.status(400).json({ error: 'Invalid product ID' });
      }
      const hasReviews =
         await reviewService.checkIfProductHasReviews(productId);
      if (!hasReviews.length) {
         return res
            .status(400)
            .json({ error: 'There are no reviews to summarize' });
      }
      const summary = await reviewService.summarizeReviews(productId);
      res.json({ summary });
   },
};
