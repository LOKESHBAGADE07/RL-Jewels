import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const TrustBadge = ({ icon, text, className = '' }) => (_jsxs("div", { className: `flex flex-col items-center text-center gap-2 ${className}`, children: [_jsx("div", { className: "text-accent-gold text-3xl", children: icon }), _jsx("p", { className: "text-sm font-medium", children: text })] }));
export default TrustBadge;
