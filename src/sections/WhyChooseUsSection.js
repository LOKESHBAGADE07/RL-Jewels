import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import SectionTitle from '../components/SectionTitle';
import TrustBadge from '../components/TrustBadge';
import { FaFileInvoice, FaCertificate, FaRing, FaPiggyBank, FaGift } from 'react-icons/fa';
import { motion } from 'framer-motion';
const points = [
    { icon: _jsx(FaFileInvoice, {}), text: 'Transparent Billing' },
    { icon: _jsx(FaCertificate, {}), text: 'BIS Certified Purity' },
    { icon: _jsx(FaRing, {}), text: 'Modern & Traditional' },
    { icon: _jsx(FaPiggyBank, {}), text: 'Secure Gold Savings' },
    { icon: _jsx(FaGift, {}), text: 'Loyalty Rewards' }
];
export const WhyChooseUsSection = () => (_jsx("section", { id: "why", className: "section-padding section-accent-bg", children: _jsxs("div", { className: "max-content", children: [_jsx(SectionTitle, { subtitle: "Why Choose", title: "Why Choose RL Jewels?" }), _jsx("div", { className: "mt-12 overflow-x-auto", children: _jsx("div", { className: "flex flex-nowrap items-stretch justify-center gap-8 px-2", role: "list", children: points.map((p, i) => (_jsx(motion.div, { role: "listitem", className: "shrink-0 min-w-[140px]", initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: i * 0.12 }, children: _jsx(TrustBadge, { icon: p.icon, text: p.text }) }, p.text))) }) })] }) }));
export default WhyChooseUsSection;
