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

// High-quality AI-generated jewelry images from Unsplash
const ph = {
  necklace: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop&q=85',
  earrings: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop&q=85',
  pendant: 'https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=800&h=800&fit=crop&q=85',
  ring: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&q=85',
  chain: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop&q=85',
  bracelet: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&h=800&fit=crop&q=85',
};

export const newArrivals: Product[] = [
  { id: 'na-1', title: 'Heritage Thushi Necklace', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&q=85', images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&q=85', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop&q=85', 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&h=800&fit=crop&q=85'], price: 96700, originalPrice: 98290, badge: 'New', tags: ['necklace','gold'], purity: '22K', grossWeightGrams: 15.2, netWeightGrams: 14.7, inStock: true },
  { id: 'na-2', title: 'Twinkling Star Studs', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop&q=85', images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop&q=85', 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=800&h=800&fit=crop&q=85'], price: 15271, originalPrice: 15490, badge: 'New', tags: ['earrings','gold'], purity: '22K', grossWeightGrams: 3.2, netWeightGrams: 3.0, inStock: true },
  { id: 'na-3', title: 'Alphabet R Pendant', image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=800&h=800&fit=crop&q=85', images: ['https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=800&h=800&fit=crop&q=85', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop&q=85'], price: 14555, originalPrice: 14759, tags: ['pendant','gold'], purity: '22K', grossWeightGrams: 2.9, netWeightGrams: 2.8, inStock: true },
  { id: 'na-4', title: 'Hearts Aligned Ring', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&q=85', images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&q=85', 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=800&fit=crop&q=85'], price: 18827, originalPrice: 19100, tags: ['ring','gold'], purity: '22K', grossWeightGrams: 4.1, netWeightGrams: 3.8, inStock: true }
];

export const bestSellers: Product[] = [
  { id: 'bs-1', title: 'Opulence Thushi Necklace', image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800&h=800&fit=crop&q=85', images: ['https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800&h=800&fit=crop&q=85', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&q=85'], price: 53999, originalPrice: 54938, badge: 'Sale', tags: ['necklace','gold'], purity: '22K', grossWeightGrams: 18.4, netWeightGrams: 17.9, inStock: true },
  { id: 'bs-2', title: 'Auric Drift Chain', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop&q=85', images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop&q=85', 'https://images.unsplash.com/photo-1630019329498-8e04192ef6f0?w=800&h=800&fit=crop&q=85'], price: 142508, originalPrice: 148831, badge: 'Sale', tags: ['chain','gold'], purity: '22K', grossWeightGrams: 24.0, netWeightGrams: 23.5, inStock: true },
  { id: 'bs-3', title: 'Gokak Gem Thushi', image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&h=800&fit=crop&q=85', images: ['https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&h=800&fit=crop&q=85', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop&q=85'], price: 19252, originalPrice: 20270, badge: 'Sale', tags: ['necklace','gold'], purity: '22K', grossWeightGrams: 7.2, netWeightGrams: 6.9, inStock: false },
  { id: 'bs-4', title: 'Auric Rhythm Chain', image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&h=800&fit=crop&q=85', images: ['https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&h=800&fit=crop&q=85', 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop&q=85'], price: 102286, originalPrice: 103756, tags: ['chain','gold'], purity: '22K', grossWeightGrams: 16.8, netWeightGrams: 16.5, inStock: true }
];

export function discountPercent(p: Product) {
  if (!p.originalPrice) return 0;
  return Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
}