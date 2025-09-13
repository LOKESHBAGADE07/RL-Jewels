export const newArrivals = [
    { id: 'na-1', title: 'Heritage Thushi Necklace', image: '/assets/products/thushi.jpg', price: 9670, originalPrice: 9829, badge: 'New', tags: ['necklace', 'gold'] },
    { id: 'na-2', title: 'Twinkling Star Studs', image: '/assets/products/star-stud.jpg', price: 15271, originalPrice: 15490, badge: 'New', tags: ['earrings', 'gold'] },
    { id: 'na-3', title: 'Alphabet R Pendant', image: '/assets/products/r-pendant.jpg', price: 14555, originalPrice: 14759, tags: ['pendant', 'gold'] },
    { id: 'na-4', title: 'Hearts Aligned Ring', image: '/assets/products/heart-ring.jpg', price: 18827, originalPrice: 19100, tags: ['ring', 'gold'] }
];
export const bestSellers = [
    { id: 'bs-1', title: 'Opulence Thushi Necklace', image: '/assets/products/opulence-thushi.jpg', price: 53999, originalPrice: 54938, badge: 'Sale', tags: ['necklace'] },
    { id: 'bs-2', title: 'Auric Drift Chain', image: '/assets/products/auric-drift.jpg', price: 142508, originalPrice: 148831, badge: 'Sale', tags: ['chain'] },
    { id: 'bs-3', title: 'Gokak Gem Thushi', image: '/assets/products/gokak-thushi.jpg', price: 19252, originalPrice: 20270, badge: 'Sale', tags: ['necklace'] },
    { id: 'bs-4', title: 'Auric Rhythm Chain', image: '/assets/products/auric-rhythm.jpg', price: 102286, originalPrice: 103756, tags: ['chain'] }
];
export function discountPercent(p) {
    if (!p.originalPrice)
        return 0;
    return Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
}
