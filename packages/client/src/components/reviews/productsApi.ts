import axios from 'axios';
type Product = {
   id: number;
   name: string;
   description?: string;
   price: number;
};

export const productsApi = {
   async fetchProducts(): Promise<Product[]> {
      const { data } = await axios.get<Product[]>('/api/products');
      return data;
   },
};
