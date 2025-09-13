import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import SectionTitle from '../components/SectionTitle';
import { Timeline } from '@/components/ui/timeline';
const milestones = [
    { year: '1998', title: 'Founding', desc: 'RL Jewels opened its first boutique with a vision to blend tradition and modernity.' },
    { year: '2005', title: 'Craftsmanship Lab', desc: 'Established in–house design & craftsmanship lab to accelerate innovation.' },
    { year: '2012', title: 'Hallmark Leadership', desc: 'Became early adopters of BIS hallmark standards in the region.' },
    { year: '2018', title: 'Digital Expansion', desc: 'Launched omnichannel experience integrating store & online journeys.' },
    { year: '2024', title: 'Sustainability Pledge', desc: 'Committed to responsible sourcing & recycled gold initiatives.' }
];
export const HeritageTimelineSection = () => (_jsxs("section", { id: "heritage", className: "section-padding bg-white", children: [_jsx("div", { className: "max-content", children: _jsx(SectionTitle, { title: "Our Heritage", subtitle: "Journey", align: "left" }) }), _jsx("div", { className: "relative left-1/2 right-1/2 -mx-[50vw] w-screen", children: _jsx(Timeline, { hideHeader: true, data: milestones.map((m) => ({
                    title: m.year,
                    content: (_jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-accent-gold mb-1", children: m.title }), _jsx("p", { className: "text-sm text-neutral-300 max-w-prose", children: m.desc })] })),
                })) }) })] }));
export default HeritageTimelineSection;
