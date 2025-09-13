import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { Timeline } from '@/components/ui/timeline';

const milestones = [
  { year: '1998', title: 'Founding', desc: 'RL Jewels opened its first boutique with a vision to blend tradition and modernity.' },
  { year: '2005', title: 'Craftsmanship Lab', desc: 'Established in–house design & craftsmanship lab to accelerate innovation.' },
  { year: '2012', title: 'Hallmark Leadership', desc: 'Became early adopters of BIS hallmark standards in the region.' },
  { year: '2018', title: 'Digital Expansion', desc: 'Launched omnichannel experience integrating store & online journeys.' },
  { year: '2024', title: 'Sustainability Pledge', desc: 'Committed to responsible sourcing & recycled gold initiatives.' }
];

export const HeritageTimelineSection: React.FC = () => (
  <section id="heritage" className="section-padding bg-white">
    <div className="max-content">
      <SectionTitle title="Our Heritage" subtitle="Journey" align="left" />
    </div>
    {/* Full-bleed timeline panel */}
    <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
      <Timeline
        hideHeader
        data={milestones.map((m) => ({
          title: m.year,
          content: (
            <div>
              <h4 className="font-semibold text-accent-gold mb-1">{m.title}</h4>
              <p className="text-sm text-neutral-300 max-w-prose">{m.desc}</p>
            </div>
          ),
        }))}
      />
    </div>
  </section>
);
export default HeritageTimelineSection;
