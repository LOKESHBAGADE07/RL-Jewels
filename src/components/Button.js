import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
export const Button = ({ children, variant = 'primary', onClick, className = '', type = 'button' }) => {
    const base = 'inline-flex items-center justify-center rounded-md px-6 py-3 font-semibold tracking-wide transition-colors text-sm md:text-base';
    const styles = variant === 'primary'
        ? 'bg-brand-red text-white shadow hover:bg-brand-red-dark'
        : 'border border-accent-gold text-brand-red relative overflow-hidden hover:bg-accent-gold/10';
    return (_jsxs(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.97 }, type: type, onClick: onClick, className: `${base} ${styles} ${className}`, children: [variant === 'secondary' && (_jsx("span", { className: "absolute inset-0 bg-accent-gold/10 opacity-0 hover:opacity-100 transition-opacity" })), _jsx("span", { className: "relative z-10", children: children })] }));
};
export default Button;
