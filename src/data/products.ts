import placeholder from '../lib/placeholderImage';
export type Product = {
  id: string;
  title: string;
  image: string;
  price: number; // current price
  originalPrice?: number; // if discounted
  tags?: string[];
  badge?: string; // 'New', 'Sale'
  purity?: '22K' | '24K' | '18K';
  grossWeightGrams?: number;
  netWeightGrams?: number;
  inStock?: boolean;
  images?: string[];
  videoUrl?: string;
};

// Use public assets for main images so they always load; placeholders for secondary images
const ph = {
  necklace: '/assets/products/necklace.svg',
  earrings: '/assets/products/earrings.svg',
  pendant: '/assets/products/pendant.svg',
  ring: '/assets/products/ring.svg',
  chain: '/assets/products/chain.svg',
};

export const newArrivals: Product[] = [
  { id: 'na-1', title: 'Heritage Thushi Necklace', image: ph.necklace, images: [ph.necklace, placeholder('Necklace - Side','gold'), placeholder('Necklace - Model','gold')], price: 96700, originalPrice: 98290, badge: 'New', tags: ['necklace','gold'], purity: '22K', grossWeightGrams: 15.2, netWeightGrams: 14.7, inStock: true },
  { id: 'na-2', title: 'Twinkling Star Studs', image: ph.earrings, images: [ph.earrings, placeholder('Studs - On Model','gold')], price: 15271, originalPrice: 15490, badge: 'New', tags: ['earrings','gold'], purity: '22K', grossWeightGrams: 3.2, netWeightGrams: 3.0, inStock: true },
  { id: 'na-3', title: 'Alphabet R Pendant', image: ph.pendant, images: [ph.pendant, placeholder('Pendant - Close-up','gold')], price: 14555, originalPrice: 14759, tags: ['pendant','gold'], purity: '22K', grossWeightGrams: 2.9, netWeightGrams: 2.8, inStock: true },
  { id: 'na-4', title: 'Hearts Aligned Ring', image: ph.ring, images: [ph.ring, placeholder('Ring - Close-up','gold')], price: 18827, originalPrice: 19100, tags: ['ring','gold'], purity: '22K', grossWeightGrams: 4.1, netWeightGrams: 3.8, inStock: true }
];

export const bestSellers: Product[] = [
  { id: 'bs-1', title: 'Opulence Thushi Necklace', image: ph.necklace, images: [ph.necklace, placeholder('Opulence - Side','gold')], price: 53999, originalPrice: 54938, badge: 'Sale', tags: ['necklace','gold'], purity: '22K', grossWeightGrams: 18.4, netWeightGrams: 17.9, inStock: true },
  { id: 'bs-2', title: 'Auric Drift Chain', image: ph.chain, images: [ph.chain], price: 142508, originalPrice: 148831, badge: 'Sale', tags: ['chain','gold'], purity: '22K', grossWeightGrams: 24.0, netWeightGrams: 23.5, inStock: true },
  { id: 'bs-3', title: 'Gokak Gem Thushi', image: ph.necklace, images: [ph.necklace], price: 19252, originalPrice: 20270, badge: 'Sale', tags: ['necklace','gold'], purity: '22K', grossWeightGrams: 7.2, netWeightGrams: 6.9, inStock: false },
  { id: 'bs-4', title: 'Auric Rhythm Chain', image: ph.chain, images: [ph.chain], price: 102286, originalPrice: 103756, tags: ['chain','gold'], purity: '22K', grossWeightGrams: 16.8, netWeightGrams: 16.5, inStock: true }
];

export function discountPercent(p: Product) {
  if (!p.originalPrice) return 0;
  return Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
}