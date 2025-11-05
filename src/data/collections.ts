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
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop&q=85',
    products: ['na-1', 'bs-1', 'bs-3', 'na-4'],
    featured: true
  },
  {
    id: 'silver-jewelry', 
    title: 'Silver Jewelry',
    description: 'Contemporary designs in sterling silver. Perfect for modern lifestyles.',
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=800&h=600&fit=crop&q=85',
    products: ['na-2'],
    featured: true
  },
  {
    id: 'diamond-jewelry',
    title: 'Diamond Jewelry',
    description: 'Sparkling diamonds set in precious metals. Luxury redefined.',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=600&fit=crop&q=85',
    products: ['bs-2', 'bs-4'],
    featured: true
  },
  {
    id: 'bridal-collection',
    title: 'Bridal Collection',
    description: 'Exquisite pieces for your special day. Traditional meets contemporary.',
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800&h=600&fit=crop&q=85',
    products: ['na-1', 'bs-1', 'na-3'],
    featured: true
  },
  {
    id: 'daily-wear',
    title: 'Daily Wear & Gifting',
    description: 'Subtle elegance for everyday. Perfect pieces for gifting too.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=600&fit=crop&q=85',
    products: ['na-2', 'na-3', 'na-4'],
    featured: false
  }
];