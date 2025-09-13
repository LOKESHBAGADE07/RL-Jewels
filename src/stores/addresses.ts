import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Address } from './orders';

type AddressesState = {
  addresses: Address[];
  defaultId?: string;
  add: (addr: Address) => void;
  remove: (id: string) => void;
  setDefault: (id: string) => void;
};

export const useAddresses = create<AddressesState>()(persist((set) => ({
  addresses: [],
  defaultId: undefined,
  add: (addr) => set(s => ({ addresses: [addr, ...s.addresses] })),
  remove: (id) => set(s => ({ addresses: s.addresses.filter(a => a.id !== id), defaultId: s.defaultId === id ? undefined : s.defaultId })),
  setDefault: (id) => set({ defaultId: id })
}), {
  name: 'addresses',
  storage: createJSONStorage(() => localStorage)
}));
