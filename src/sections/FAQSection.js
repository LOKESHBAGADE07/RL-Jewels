import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
const faqs = [
    { q: 'Are your products hallmarked?', a: 'Yes, all gold jewellery is BIS hallmarked ensuring purity and authenticity.' },
    { q: 'Do you offer customised designs?', a: 'We provide bespoke design services; share your inspiration and our artisans craft it.' },
    { q: 'What payment methods are accepted?', a: 'UPI, major cards, net banking, and approved instalment options are accepted.' },
    { q: 'How does the savings plan work?', a: 'You deposit a fixed amount monthly. At maturity you receive a making charge benefit or bonus per plan terms.' }
];
export const FAQSection = () => {
    const [open, setOpen] = useState(0);
    return (_jsx("section", { id: "faq", className: "section-padding bg-white", children: _jsxs("div", { className: "max-content max-w-4xl", children: [_jsx(SectionTitle, { title: "Frequently Asked Questions", subtitle: "Support" }), _jsx("ul", { className: "divide-y divide-accent-gold/25 rounded-xl border border-accent-gold/30 bg-white/70 backdrop-blur overflow-hidden", children: faqs.map((item, idx) => {
                        const expanded = open === idx;
                        return (_jsxs("li", { children: [_jsxs("button", { className: "w-full text-left px-5 py-4 flex items-start gap-4 focus:outline-none focus-visible:ring focus-visible:ring-brand-red/40", "aria-expanded": expanded, "aria-controls": `faq-panel-${idx}`, onClick: () => setOpen(expanded ? null : idx), children: [_jsx("span", { className: "mt-1 w-5 h-5 inline-flex items-center justify-center rounded-full border border-brand-red text-[10px] font-semibold text-brand-red", children: expanded ? '-' : '+' }), _jsx("span", { className: "font-medium tracking-wide", children: item.q })] }), expanded && (_jsx("div", { id: `faq-panel-${idx}`, className: "px-14 pb-5 -mt-2 text-sm text-neutral-700 leading-relaxed", children: item.a }))] }, item.q));
                    }) })] }) }));
};
export default FAQSection;
