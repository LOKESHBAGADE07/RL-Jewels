import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import SectionTitle from '../components/SectionTitle';
import Carousel from '../components/Carousel';
import ProductCard from '../components/ProductCard';
import { bestSellers } from '../data/products';
export const BestSellersSection = () => (_jsx("section", { id: "best-sellers", className: "section-padding bg-white/5", children: _jsxs("div", { className: "max-content", children: [_jsx(SectionTitle, { subtitle: "Popular", title: "Best Sellers" }), _jsx(Carousel, { className: "mt-8", children: bestSellers.map(p => (_jsx("div", { className: "min-w-[240px] max-w-[240px]", children: _jsx(ProductCard, { product: p }) }, p.id))) })] }) }));
export default BestSellersSection;
