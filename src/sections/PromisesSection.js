import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import SectionTitle from '../components/SectionTitle';
import TrustBadge from '../components/TrustBadge';
import { FaShieldAlt, FaExchangeAlt, FaShippingFast, FaRedo, FaCertificate, FaGem, FaHandshake } from 'react-icons/fa';
import { motion } from 'framer-motion';
const promises = [
    { icon: _jsx(FaCertificate, {}), text: 'BIS Hallmarked' },
    { icon: _jsx(FaShieldAlt, {}), text: 'Secure Payments' },
    { icon: _jsx(FaShippingFast, {}), text: 'Insured Shipping' },
    { icon: _jsx(FaExchangeAlt, {}), text: 'Lifetime Exchange' },
    { icon: _jsx(FaRedo, {}), text: '14-Day Returns' },
    { icon: _jsx(FaGem, {}), text: 'Purity Guarantee' },
    { icon: _jsx(FaHandshake, {}), text: 'Transparent Billing' }
];
export const PromisesSection = () => (_jsx("section", { id: "promises", className: "section-padding bg-white", children: _jsxs("div", { className: "max-content", children: [_jsx(SectionTitle, { subtitle: "Our Promise", title: "The RL Jewels Assurance" }), _jsx("div", { className: "mt-12 overflow-x-auto", children: _jsx("div", { className: "flex flex-nowrap items-stretch justify-center gap-8 px-2", role: "list", children: promises.map((p, i) => (_jsx(motion.div, { role: "listitem", className: "shrink-0 min-w-[140px]", initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: i * 0.1 }, children: _jsx(TrustBadge, { icon: p.icon, text: p.text }) }, p.text))) }) })] }) }));
export default PromisesSection;
