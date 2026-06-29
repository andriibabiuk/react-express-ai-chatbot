import { productRepository } from '../repositories/product.repository';

export const productService = {
   async getProduct(productId: number) {
      return await productRepository.getProduct(productId);
   },
};
