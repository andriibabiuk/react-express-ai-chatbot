import type { Request, Response } from 'express';
import express from 'express';
import { chatController } from './controller/chat.controller';
import { productController } from './controller/product.controller';
import { reviewController } from './controller/review.controller';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
   res.send('Hello World!');
});
router.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello World!' });
});

router.post('/api/chat', chatController.postChat);

router.get('/api/products', productController.getProducts);
router.get('/api/products/:id/reviews', reviewController.getReviews);
router.post(
   '/api/products/:id/reviews/summarize',
   reviewController.summarizeReviews
);
export default router;
