import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { FaPhone, FaWhatsapp, FaEnvelope, FaLocationArrow, FaClock } from 'react-icons/fa';
import { useState } from 'react';
export const ContactSection = () => {
    const [form, setForm] = useState({ name: '', phone: '', message: '' });
    const update = (k, v) => setForm(f => ({ ...f, [k]: v }));
    const submit = (e) => {
        e.preventDefault();
        console.log('Form Data', form);
    };
    return (_jsx("section", { id: "contact", className: "section-padding", children: _jsxs("div", { className: "max-content", children: [_jsx(SectionTitle, { subtitle: "Reach Us", title: "Contact Us" }), _jsxs("div", { className: "grid md:grid-cols-2 gap-12", children: [_jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "aspect-video w-full rounded-lg overflow-hidden", children: _jsx("iframe", { title: "Map", className: "w-full h-full", src: "https://www.google.com/maps?q=RL+Jewels+Jalgaon&output=embed", loading: "lazy" }) }), _jsxs("ul", { className: "space-y-3 text-sm", children: [_jsxs("li", { className: "flex gap-3 items-start", children: [_jsx(FaLocationArrow, { className: "text-brand-red mt-0.5" }), " RL Jewels, Near XYZ Landmark, Jalgaon, Maharashtra"] }), _jsxs("li", { className: "flex gap-3 items-start", children: [_jsx(FaPhone, { className: "text-brand-red mt-0.5" }), " +91 99999 99999"] }), _jsxs("li", { className: "flex gap-3 items-start", children: [_jsx(FaWhatsapp, { className: "text-brand-red mt-0.5" }), " WhatsApp Same Number"] }), _jsxs("li", { className: "flex gap-3 items-start", children: [_jsx(FaEnvelope, { className: "text-brand-red mt-0.5" }), " info@rljewels.com"] }), _jsxs("li", { className: "flex gap-3 items-start", children: [_jsx(FaClock, { className: "text-brand-red mt-0.5" }), " Mon\u2013Sat: 10am\u20138pm"] })] })] }), _jsxs("form", { onSubmit: submit, className: "space-y-5", children: [_jsx("input", { required: true, placeholder: "Name", value: form.name, onChange: e => update('name', e.target.value), className: "w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 focus:outline-none focus:border-primary-gold" }), _jsx("input", { required: true, placeholder: "Phone", value: form.phone, onChange: e => update('phone', e.target.value), className: "w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 focus:outline-none focus:border-primary-gold" }), _jsx("textarea", { rows: 5, placeholder: "Message", value: form.message, onChange: e => update('message', e.target.value), className: "w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 focus:outline-none focus:border-primary-gold" }), _jsx(Button, { type: "submit", children: "Send Inquiry" })] })] })] }) }));
};
export default ContactSection;
