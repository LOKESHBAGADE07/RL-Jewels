import { create } from 'zustand';

type GoldRateState = {
  ratePerGramINR: number; // live or cached
  setRate: (r: number) => void;
};

export const useGoldRate = create<GoldRateState>((set) => ({
  ratePerGramINR: 6200,
  setRate: (r) => set({ ratePerGramINR: r })
}));

export function computePriceBreakdown({ rate, netWeight, makingPct = 10 }:{ rate: number; netWeight: number; makingPct?: number }) {
  const goldValue = Math.round(rate * netWeight);
  const making = Math.round((makingPct/100) * goldValue);
  const subtotal = goldValue + making;
  const gst = Math.round(0.03 * subtotal);
  const total = subtotal + gst;
  return { goldValue, making, gst, total };
}
