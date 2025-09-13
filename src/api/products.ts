import { api } from './client';
import type { ProductDTO } from './contracts';

export const productsApi = {
  list: () => api.get<ProductDTO[]>('/products'),
  get: (id: string) => api.get<ProductDTO>(`/products/${id}`),
  create: (p: Omit<ProductDTO, 'id'>) => api.post<ProductDTO>('/products', p),
  update: (id: string, p: Partial<ProductDTO>) => api.put<ProductDTO>(`/products/${id}`, p),
  remove: (id: string) => api.del<void>(`/products/${id}`),
};
