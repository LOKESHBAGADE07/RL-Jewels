import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import SectionTitle from '../components/SectionTitle';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { bestSellers, newArrivals } from '../data/products';
import ProductCard from '../components/ProductCard';
export const WishlistSection = () => {
    const [wishlist, setWishlist] = useLocalStorage('wishlist', []);
    const allProducts = useMemo(() => [...newArrivals, ...bestSellers], []);
    const items = allProducts.filter(p => wishlist.includes(p.id));
    return (_jsx("section", { id: "wishlist", className: "section-padding bg-white", children: _jsxs("div", { className: "max-content", children: [_jsx(SectionTitle, { title: "Your Wishlist", subtitle: "Saved" }), items.length === 0 ? (_jsxs("div", { className: "p-10 text-center rounded-xl border border-dashed border-primary-gold/30 bg-white/60", children: [_jsx("p", { className: "mb-4 text-sm text-neutral-600", children: "You have not added any products yet." }), _jsx("button", { onClick: () => setWishlist([]), className: "text-xs font-semibold tracking-wide text-primary-gold hover:underline focus:outline-none focus-visible:ring focus-visible:ring-primary-gold/40", children: "Browse Collections" })] })) : (_jsx("div", { className: "grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6", children: items.map(p => _jsx(ProductCard, { product: p }, p.id)) }))] }) }));
};
export default WishlistSection;
