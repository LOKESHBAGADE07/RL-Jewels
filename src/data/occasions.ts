export interface Occasion {
  id: string;
  title: string;
  description: string;
  image: string;
  products: string[]; // product IDs
  tags: string[];
}

export const occasions: Occasion[] = [
  {
    id: 'wedding',
    title: 'Wedding',
    description: 'Regal jewelry sets for the most important day of your life. Traditional designs with modern craftsmanship.',
    image: '/assets/products/necklace.jpg',
    products: ['na-1', 'bs-1', 'bs-3'],
    tags: ['bridal', 'traditional', 'gold']
  },
  {
    id: 'festive',
    title: 'Festive',
    description: 'Sparkle during celebrations with our festive collection. Perfect for Diwali, Dussehra, and special occasions.',
    image: '/assets/products/earrings.svg',
    products: ['na-1', 'bs-1', 'na-3', 'bs-2'],
    tags: ['festive', 'celebration', 'gold']
  },
  {
    id: 'daily-wear',
    title: 'Daily Wear',
    description: 'Subtle elegance for everyday wear. Comfortable pieces that complement your daily style.',
    image: '/assets/products/pendant.svg',
    products: ['na-2', 'na-3', 'na-4'],
    tags: ['casual', 'daily', 'comfortable']
  },
  {
    id: 'office',
    title: 'Office',
    description: 'Minimal and professional designs perfect for the workplace. Understated elegance.',
    image: '/assets/products/chain.svg',
    products: ['na-2', 'na-4'],
    tags: ['professional', 'minimal', 'office']
  },
  {
    id: 'gifting',
    title: 'Gifting',
    description: 'Meaningful pieces that make perfect gifts for your loved ones. Express your love beautifully.',
    image: '/assets/products/ring.svg',
    products: ['na-3', 'bs-2', 'bs-4'],
    tags: ['gift', 'special', 'meaningful']
  }
];