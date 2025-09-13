import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const SectionTitle = ({ subtitle, title, align = 'center', tone = 'default' }) => {
    const accent = tone === 'light' ? 'text-accent-gold' : 'text-brand-red';
    return (_jsxs("div", { className: `mb-10 ${align === 'center' ? 'text-center' : 'text-left'}`, children: [subtitle && _jsx("p", { className: `uppercase tracking-widest ${accent} text-[11px] font-medium mb-2`, children: subtitle }), _jsx("h2", { className: "font-serif text-3xl md:text-4xl font-bold tracking-tight", children: title }), _jsx("div", { className: `mt-4 h-0.5 w-24 bg-accent-gold ${align === 'center' ? 'mx-auto' : ''}` })] }));
};
export default SectionTitle;
