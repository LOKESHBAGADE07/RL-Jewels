import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type CartItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  add: (item: Omit<CartItem, 'qty'>, qty?: number) => void;
  remove: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
};

export const useCart = create<CartState>()(persist((set, get) => ({
  items: [],
  add: (item, qty = 1) => set((s) => {
    const existing = s.items.find(i => i.id === item.id);
    if (existing) {
      return {
        items: s.items.map(i => i.id === item.id ? { ...i, qty: i.qty + qty } : i)
      };
    }
    return { items: [...s.items, { ...item, qty }] };
  }),
  remove: (id) => set((s) => ({ items: s.items.filter(i => i.id !== id) })),
  updateQty: (id, qty) => set((s) => ({ items: s.items.map(i => i.id === id ? { ...i, qty } : i) })),
  clear: () => set({ items: [] }),
  count: () => get().items.reduce((n, i) => n + i.qty, 0),
  subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0)
}), {
  name: 'cart',
  storage: createJSONStorage(() => localStorage)
}));
