import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
export const NewsletterSignup = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const submit = (e) => {
        e.preventDefault();
        if (!email)
            return;
        // Placeholder for integration with an email service
        console.log('Newsletter signup:', email);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
        setEmail('');
    };
    return (_jsx(motion.section, { id: "newsletter", initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "section-padding", children: _jsxs("div", { className: "max-content text-center max-w-2xl", children: [_jsx("h2", { className: "font-serif text-3xl font-bold mb-4", children: "Stay Updated" }), _jsx("p", { className: "text-text-secondary mb-6 text-sm", children: "Be the first to know about new collections, savings plans & exclusive offers." }), _jsxs("form", { onSubmit: submit, className: "flex flex-col sm:flex-row gap-4 justify-center", children: [_jsx("input", { type: "email", required: true, "aria-label": "Email address", placeholder: "Enter your email", value: email, onChange: e => setEmail(e.target.value), className: "flex-1 min-w-[220px] bg-white/5 border border-white/10 rounded-md px-4 py-3 focus:outline-none focus:border-primary-gold" }), _jsx(Button, { type: "submit", children: "Subscribe" })] }), submitted && _jsx("p", { className: "mt-4 text-xs text-primary-gold", children: "Thank you! You are subscribed." })] }) }));
};
export default NewsletterSignup;
