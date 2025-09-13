import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { FaCheck } from 'react-icons/fa';
export const LoyaltyProgramSection = () => (_jsx("section", { id: "loyalty", className: "section-padding bg-white/5", children: _jsxs("div", { className: "max-content grid md:grid-cols-2 gap-12 items-center", children: [_jsxs("div", { className: "order-2 md:order-1", children: [_jsx(SectionTitle, { subtitle: "Rewards", title: "Earn Rewards Every Time You Shop", align: "left" }), _jsx("ul", { className: "space-y-3 mb-8", children: [
                            'Earn up to 10% reward points on purchases',
                            'Redeem points for discounts (2 points = ₹1)',
                            'Use points across gold, silver, diamonds & more'
                        ].map(t => (_jsxs("li", { className: "flex gap-3", children: [_jsx(FaCheck, { className: "text-brand-red mt-1" }), _jsx("span", { className: "text-sm", children: t })] }, t))) }), _jsx(Button, { variant: "secondary", children: "Check Your Points" })] }), _jsx("div", { className: "order-1 md:order-2", children: _jsx("img", { src: "/assets/loyalty.jpg", alt: "Loyalty", className: "rounded-lg shadow-glow object-cover w-full h-80" }) })] }) }));
export default LoyaltyProgramSection;
