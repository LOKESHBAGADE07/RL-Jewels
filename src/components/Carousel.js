import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
export const Carousel = ({ children, className = '' }) => {
    const [emblaRef, embla] = useEmblaCarousel({ dragFree: true, containScroll: 'trimSnaps' });
    const prev = useCallback(() => embla && embla.scrollPrev(), [embla]);
    const next = useCallback(() => embla && embla.scrollNext(), [embla]);
    return (_jsxs("div", { className: `relative ${className}`, children: [_jsx("div", { className: "overflow-hidden", ref: emblaRef, children: _jsx("div", { className: "flex gap-6", children: children }) }), _jsx("button", { "aria-label": "Previous", onClick: prev, className: "hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-accent-gold p-3 rounded-full", children: _jsx(FaChevronLeft, {}) }), _jsx("button", { "aria-label": "Next", onClick: next, className: "hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-accent-gold p-3 rounded-full", children: _jsx(FaChevronRight, {}) })] }));
};
export default Carousel;
