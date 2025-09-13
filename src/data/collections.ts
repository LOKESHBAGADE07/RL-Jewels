export interface Collection {
  id: string;
  title: string;
  description: string;
  image: string;
  products: string[]; // product IDs
  featured: boolean;
}

export const collections: Collection[] = [
  {
    id: 'gold-jewelry',
    title: 'Gold Jewelry',
    description: 'Timeless elegance in pure gold. From delicate chains to statement necklaces.',
    image: '/assets/products/necklace.svg',
    products: ['na-1', 'bs-1', 'bs-3', 'na-4'],
    featured: true
  },
  {
    id: 'silver-jewelry', 
    title: 'Silver Jewelry',
    description: 'Contemporary designs in sterling silver. Perfect for modern lifestyles.',
    image: '/assets/products/earrings.svg',
    products: ['na-2'],
    featured: true
  },
  {
    id: 'diamond-jewelry',
    title: 'Diamond Jewelry',
    description: 'Sparkling diamonds set in precious metals. Luxury redefined.',
    image: '/assets/products/ring.svg',
    products: ['bs-2', 'bs-4'],
    featured: true
  },
  {
    id: 'bridal-collection',
    title: 'Bridal Collection',
    description: 'Exquisite pieces for your special day. Traditional meets contemporary.',
    image: '/assets/products/necklace.jpg',
    products: ['na-1', 'bs-1', 'na-3'],
    featured: true
  },
  {
    id: 'daily-wear',
    title: 'Daily Wear & Gifting',
    description: 'Subtle elegance for everyday. Perfect pieces for gifting too.',
    image: '/assets/products/pendant.svg',
    products: ['na-2', 'na-3', 'na-4'],
    featured: false
  }
];