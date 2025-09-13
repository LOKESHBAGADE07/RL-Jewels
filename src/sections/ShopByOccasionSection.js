import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import SectionTitle from '../components/SectionTitle';
const occasions = [
    { id: 'wedding', title: 'Wedding', image: '/assets/occasions/wedding.jpg', blurb: 'Regal sets for the big day.' },
    { id: 'festive', title: 'Festive', image: '/assets/occasions/festive.jpg', blurb: 'Sparkle during celebrations.' },
    { id: 'daily', title: 'Daily Wear', image: '/assets/occasions/daily.jpg', blurb: 'Subtle elegance for every day.' },
    { id: 'office', title: 'Office', image: '/assets/occasions/office.jpg', blurb: 'Minimal designs for professionals.' },
    { id: 'gifting', title: 'Gifting', image: '/assets/occasions/gifting.jpg', blurb: 'Meaningful pieces they will cherish.' }
];
export const ShopByOccasionSection = () => {
    return (_jsx("section", { id: "occasions", className: "section-padding bg-white", children: _jsxs("div", { className: "max-content", children: [_jsx(SectionTitle, { title: "Shop By Occasion", subtitle: "Curated picks" }), _jsx("div", { className: "grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6", children: occasions.map(o => (_jsxs("div", { className: "group relative rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow bg-neutral-50 border border-accent-gold/15", children: [_jsx("div", { className: "aspect-[4/5] w-full bg-gradient-to-br from-primary-cream to-white flex items-center justify-center text-xs text-neutral-500", children: _jsx("span", { className: "opacity-70", children: "Image Placeholder" }) }), _jsxs("div", { className: "p-4", children: [_jsx("h3", { className: "font-medium tracking-wide text-sm mb-1", children: o.title }), _jsx("p", { className: "text-xs text-neutral-600 line-clamp-2", children: o.blurb }), _jsx("button", { className: "mt-3 text-brand-red text-xs font-semibold tracking-wide hover:underline focus:outline-none focus-visible:ring focus-visible:ring-brand-red/40", children: "Explore" })] }), _jsx("span", { className: "absolute inset-0 ring-1 ring-inset ring-accent-gold/0 group-hover:ring-accent-gold/40 transition" })] }, o.id))) })] }) }));
};
export default ShopByOccasionSection;
