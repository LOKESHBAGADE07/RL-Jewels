import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { FaCheck } from 'react-icons/fa';
export const SavingsPlanSection = () => (_jsx("section", { id: "savings", className: "section-padding", children: _jsxs("div", { className: "max-content grid md:grid-cols-2 gap-12 items-center", children: [_jsx("div", { children: _jsx("img", { src: "/assets/savings.jpg", alt: "Savings Plan", className: "rounded-lg shadow-glow object-cover w-full h-80" }) }), _jsxs("div", { children: [_jsx(SectionTitle, { subtitle: "Plan", title: "Save Now, Shine Forever!", align: "left" }), _jsx("p", { className: "text-text-secondary mb-6", children: "Join our Gold Flexi Savings Plan and enjoy exclusive benefits." }), _jsx("ul", { className: "space-y-3 mb-8", children: [
                            'Deposit monthly & get 50% off making charges in 12th month (max 9%)',
                            'Secure BIS-hallmarked gold savings',
                            'Easy payment via UPI, cards, NEFT, cash'
                        ].map(t => (_jsxs("li", { className: "flex gap-3", children: [_jsx(FaCheck, { className: "text-brand-red mt-1" }), _jsx("span", { className: "text-sm", children: t })] }, t))) }), _jsx(Button, { children: "Start Your Plan Today" })] })] }) }));
export default SavingsPlanSection;
