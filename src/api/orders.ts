import { api } from './client';
import type { OrderDTO } from './contracts';

export const ordersApi = {
  create: (o: Omit<OrderDTO, 'id' | 'status'>) => api.post<OrderDTO>('/orders', o),
  get: (id: string) => api.get<OrderDTO>(`/orders/${id}`),
  listMine: () => api.get<OrderDTO[]>('/orders/me'),
};
