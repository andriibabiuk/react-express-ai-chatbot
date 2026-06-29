import type { Request, Response } from 'express';
import { productService } from '../services/product.service';

export const productController = {
   async getProducts(req: Request, res: Response) {
      try {
         const products = await productService.getProducts();
         res.json(products);
      } catch (error) {
         res.status(500).json({ error: 'Failed to fetch products' });
      }
   },
};
