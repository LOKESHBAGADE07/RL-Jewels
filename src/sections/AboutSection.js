import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import SectionTitle from '../components/SectionTitle';
import TrustBadge from '../components/TrustBadge';
import { FaCertificate, FaGem, FaBalanceScale } from 'react-icons/fa';
import { motion } from 'framer-motion';
export const AboutSection = () => {
    const badges = [
        { icon: _jsx(FaCertificate, {}), text: 'BIS Hallmark' },
        { icon: _jsx(FaGem, {}), text: '100% Purity' },
        { icon: _jsx(FaBalanceScale, {}), text: 'Transparent Pricing' }
    ];
    return (_jsx("section", { id: "about", className: "section-padding section-accent-bg", children: _jsxs("div", { className: "max-content", children: [_jsx(SectionTitle, { subtitle: "Heritage & Trust", title: "About RL Jewels" }), _jsx("p", { className: "max-w-3xl mx-auto text-center text-text-secondary leading-relaxed", children: "Serving Jalgaon with purity, transparency and craftsmanship. Our legacy blends tradition and modern design to bring you jewelry that reflects trust and elegance." }), _jsx("div", { className: "mt-12 grid grid-cols-3 max-w-xl mx-auto gap-4", children: badges.map((b, i) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: i * 0.15 }, children: _jsx(TrustBadge, { icon: b.icon, text: b.text }) }, b.text))) })] }) }));
};
export default AboutSection;
