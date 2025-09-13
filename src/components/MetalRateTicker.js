import { jsxs as _jsxs, Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { FaSync } from 'react-icons/fa';
const mockFetchRates = async () => {
    // Placeholder: replace with real API call later
    await new Promise(r => setTimeout(r, 400));
    const now = new Date();
    return {
        gold24K: 7325, // per gram (mock)
        gold22K: 6710,
        updatedAt: now.toISOString()
    };
};
export const MetalRateTicker = () => {
    const [rates, setRates] = useState(null);
    const [loading, setLoading] = useState(false);
    const refresh = async () => {
        setLoading(true);
        const r = await mockFetchRates();
        setRates(r);
        setLoading(false);
    };
    useEffect(() => { refresh(); }, []);
    return (_jsxs("div", { className: "w-full bg-black/60 backdrop-blur text-[11px] md:text-xs text-text-secondary flex items-center gap-4 px-4 h-8 border-b border-white/10", children: [_jsx("div", { className: "flex items-center gap-3 whitespace-nowrap overflow-x-auto scrollbar-none", children: rates ? (_jsxs(_Fragment, { children: [_jsxs("span", { className: "text-accent-gold font-medium", children: ["24K \u20B9", rates.gold24K, "/g"] }), _jsxs("span", { children: ["22K \u20B9", rates.gold22K, "/g"] }), _jsxs("span", { className: "opacity-70", children: ["Updated ", new Date(rates.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })] })] })) : (_jsx("span", { children: "Loading metal rates\u2026" })) }), _jsxs("button", { onClick: refresh, "aria-label": "Refresh rates", className: "ml-auto flex items-center gap-1 text-accent-gold hover:text-white transition disabled:opacity-40", disabled: loading, children: [_jsx(FaSync, { className: loading ? 'animate-spin' : '' }), "Refresh"] })] }));
};
export default MetalRateTicker;
