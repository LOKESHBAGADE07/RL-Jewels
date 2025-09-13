import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import SectionTitle from '../components/SectionTitle';
import Carousel from '../components/Carousel';
import ProductCard from '../components/ProductCard';
import { newArrivals } from '../data/products';
export const NewArrivalsSection = () => (_jsx("section", { id: "new-arrivals", className: "section-padding", children: _jsxs("div", { className: "max-content", children: [_jsx(SectionTitle, { subtitle: "Fresh", title: "New Arrivals" }), _jsx(Carousel, { className: "mt-8", children: newArrivals.map(p => (_jsx("div", { className: "min-w-[240px] max-w-[240px]", children: _jsx(ProductCard, { product: p }) }, p.id))) })] }) }));
export default NewArrivalsSection;
