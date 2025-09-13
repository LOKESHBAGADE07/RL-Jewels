import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { scroller } from 'react-scroll';
import { useState } from 'react';
const announcements = [
    'Festive Offer: Flat 50% off on making charges (T&C)',
    'Exchange Bonus: Extra 5% on old gold exchange this week',
    'New Collection: Bridal Heritage Series launched',
    'Savings Plan: Join now & get bonus benefits at maturity'
];
export const HeroSection = () => {
    const [idx, setIdx] = useState(0);
    // simple auto-advance
    // eslint-disable-next-line
    setTimeout(() => setIdx(i => (i + 1) % announcements.length), 4000);
    return (_jsxs("section", { id: "home", className: "relative min-h-[75vh] flex items-center justify-center overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1400&q=60')] bg-cover bg-center" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-brand-red/90 via-brand-red-dark/90 to-ink-900/95 mix-blend-multiply" }), _jsxs(motion.div, { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, className: "relative z-10 text-center px-6 max-w-4xl", children: [_jsx("h1", { className: "font-serif text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent", style: { backgroundImage: 'linear-gradient(90deg,#fff,#ffe8b3)' }, children: "RL Jewels" }), _jsx("p", { className: "mb-8 text-ink-300 tracking-wide", children: "Purity \u2022 Transparency \u2022 Craftsmanship" }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [_jsx(Button, { onClick: () => scroller.scrollTo('collections', { smooth: true, offset: -80, duration: 600 }), children: "Browse Collections" }), _jsx(Button, { variant: "secondary", onClick: () => scroller.scrollTo('savings', { smooth: true, offset: -80, duration: 600 }), children: "Join Savings Plan" })] }), _jsxs("div", { className: "mt-10 relative mx-auto max-w-xl", children: [_jsx("div", { className: "overflow-hidden rounded-full border border-accent-gold/30 bg-white/10 backdrop-blur", children: _jsx("div", { className: "h-11 flex items-center", children: announcements.map((a, i) => (_jsx("div", { className: "w-full flex-shrink-0 px-6 text-sm font-medium text-white transition-transform duration-700", style: { transform: `translateX(-${idx * 100}%)` }, children: a }, a))) }) }), _jsx("div", { className: "flex gap-2 justify-center mt-4", children: announcements.map((_, i) => (_jsx("button", { onClick: () => setIdx(i), "aria-label": `Go to slide ${i + 1}`, className: `h-2.5 w-2.5 rounded-full ${i === idx ? 'bg-accent-gold' : 'bg-white/40'}` }, i))) })] })] })] }));
};
export default HeroSection;
