import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import SectionTitle from '../components/SectionTitle';
import TestimonialCard from '../components/TestimonialCard';
const testimonials = [
    { name: 'Priya', text: 'Amazing collection and trustworthy service!', avatar: 'https://i.pravatar.cc/100?img=12' },
    { name: 'Rahul', text: 'Best jeweler in Jalgaon. Pure and elegant designs.', avatar: 'https://i.pravatar.cc/100?img=15' },
    { name: 'Sneha', text: 'Their savings plan is fantastic, highly recommend.', avatar: 'https://i.pravatar.cc/100?img=32' }
];
export const TestimonialsSection = () => (_jsx("section", { id: "testimonials", className: "section-padding", children: _jsxs("div", { className: "max-content", children: [_jsx(SectionTitle, { subtitle: "Voices", title: "What Our Customers Say" }), _jsx("div", { className: "grid md:grid-cols-3 gap-8", children: testimonials.map(t => _jsx(TestimonialCard, { ...t }, t.name)) })] }) }));
export default TestimonialsSection;
