import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import SectionTitle from '../components/SectionTitle';
import CollectionCard from '../components/CollectionCard';
const data = [
    { title: 'Gold Jewelry', img: '/assets/collections/gold.jpg' },
    { title: 'Silver Jewelry', img: '/assets/collections/silver.jpg' },
    { title: 'Diamond Jewelry', img: '/assets/collections/diamond.jpg' },
    { title: 'Bridal Collection', img: '/assets/collections/bridal.jpg' },
    { title: 'Daily Wear & Gifting', img: '/assets/collections/daily.jpg' }
];
export const CollectionsSection = () => (_jsx("section", { id: "collections", className: "section-padding bg-white/5", children: _jsxs("div", { className: "max-content", children: [_jsx(SectionTitle, { subtitle: "Explore", title: "Our Collections" }), _jsx("div", { className: "grid gap-6 sm:grid-cols-2 md:grid-cols-3", children: data.map(c => _jsx(CollectionCard, { ...c }, c.title)) })] }) }));
export default CollectionsSection;
