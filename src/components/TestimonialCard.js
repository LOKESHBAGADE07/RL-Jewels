import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
export const TestimonialCard = ({ name, text, avatar }) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 }, className: "bg-white border border-surface-300 p-6 rounded-xl shadow-sm flex flex-col gap-4", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("img", { src: avatar, alt: name, className: "h-14 w-14 rounded-full object-cover border border-accent-gold/40" }), _jsx("h4", { className: "font-semibold", children: name })] }), _jsxs("p", { className: "text-sm text-ink-700 italic", children: ["\u201C", text, "\u201D"] })] }));
export default TestimonialCard;
