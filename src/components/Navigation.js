import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-scroll';
import { useMemo } from 'react';
import useActiveSection from '../hooks/useActiveSection';
const links = [
    { to: 'home', label: 'Home' },
    { to: 'collections', label: 'Collections' },
    { to: 'occasions', label: 'Occasions' },
    { to: 'savings', label: 'Savings Plan' },
    { to: 'heritage', label: 'Heritage' },
    { to: 'testimonials', label: 'Reviews' },
    { to: 'faq', label: 'FAQ' },
    { to: 'blog', label: 'Blog' },
    { to: 'contact', label: 'Contact' }
];
export const Navigation = ({ onClick }) => {
    const ids = useMemo(() => links.map(l => l.to), []);
    const active = useActiveSection(ids);
    return (_jsx("ul", { className: "hidden lg:flex gap-8 items-center", role: "menubar", "aria-label": "Primary", children: links.map(l => {
            const isActive = active === l.to;
            return (_jsx("li", { role: "none", children: _jsxs(Link, { to: l.to, spy: true, smooth: true, duration: 400, offset: -90, role: "menuitem", "aria-current": isActive ? 'page' : undefined, className: `group cursor-pointer relative font-medium text-sm tracking-wide transition-colors ${isActive ? 'text-text-light' : 'text-text-secondary hover:text-text-light'}`, onClick: onClick, children: [l.label, _jsx("span", { className: `absolute left-0 -bottom-1 h-0.5 bg-accent-gold transition-all ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}` })] }) }, l.to));
        }) }));
};
export default Navigation;
