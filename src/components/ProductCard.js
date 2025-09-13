import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { discountPercent } from '../data/products';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useLocalStorage } from '../hooks/useLocalStorage';
export const ProductCard = ({ product }) => {
    const [wishlist, setWishlist] = useLocalStorage('wishlist', []);
    const [wish, setWish] = useState(false);
    useEffect(() => {
        setWish(wishlist.includes(product.id));
    }, [wishlist, product.id]);
    const toggleWish = () => {
        setWishlist(prev => prev.includes(product.id) ? prev.filter(i => i !== product.id) : [...prev, product.id]);
    };
    const discount = discountPercent(product);
    const hasDiscount = discount > 0;
    return (_jsxs(motion.div, { layout: true, whileHover: { y: -6 }, className: "group relative bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm", children: [_jsxs("div", { className: "relative h-56 w-full overflow-hidden", children: [_jsx("img", { src: product.image, alt: product.title, loading: "lazy", className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" }), product.badge && (_jsx("span", { className: "absolute left-2 top-2 bg-accent-gold text-ink-900 text-[10px] font-semibold px-2 py-1 rounded uppercase tracking-wide", children: product.badge })), hasDiscount && (_jsxs("span", { className: "absolute right-2 top-2 bg-black/70 text-accent-gold text-[11px] font-medium px-2 py-1 rounded", children: ["-", discount, "%"] })), _jsx("button", { "aria-label": "Toggle wishlist", onClick: toggleWish, className: "absolute right-2 bottom-2 text-lg text-accent-gold drop-shadow", children: wish ? _jsx(FaHeart, {}) : _jsx(FaRegHeart, {}) })] }), _jsxs("div", { className: "p-4 space-y-2", children: [_jsx("h3", { className: "text-sm font-medium line-clamp-2 min-h-[2.5rem]", children: product.title }), _jsxs("div", { className: "flex items-end gap-2 text-sm", children: [_jsxs("span", { className: "text-brand-red font-semibold", children: ["\u20B9", product.price.toLocaleString('en-IN')] }), product.originalPrice && (_jsxs("span", { className: "text-xs line-through text-text-secondary/70", children: ["\u20B9", product.originalPrice.toLocaleString('en-IN')] }))] }), hasDiscount && (_jsxs("p", { className: "text-[11px] text-text-secondary", children: ["You save \u20B9", (product.originalPrice - product.price).toLocaleString('en-IN')] })), _jsx("button", { className: "mt-1 w-full text-center text-[12px] font-medium tracking-wide border border-brand-red text-brand-red py-2 rounded hover:bg-brand-red hover:text-white transition", children: "View Details" })] })] }));
};
export default ProductCard;
