import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import { Timeline } from '@/components/ui/timeline';
import { FiArrowRight } from 'react-icons/fi';

const milestones = [
  { year: '1854-1900', title: 'The Beginning', desc: 'Founded by Rajmal Lakhichand, establishing a legacy of trust and craftsmanship in traditional jewelry.' },
  { year: '1900-1950', title: 'Heritage Growth', desc: 'Expanded reputation across regions, becoming a trusted name for authentic gold and silver ornaments.' },
  { year: '1950-1980', title: 'Modern Era', desc: 'Embraced contemporary designs while preserving traditional craftsmanship techniques and values.' },
  { year: '1980-2000', title: 'Innovation Phase', desc: 'Introduced advanced jewelry-making techniques and established in-house design capabilities.' },
  { year: '2000-2015', title: 'Digital Transformation', desc: 'Adopted BIS hallmark standards, launched online presence, and modernized customer experience.' },
  { year: '2015-2025', title: 'Excellence Today', desc: 'Leading with omnichannel integration, sustainable practices, and cutting-edge jewelry innovations.' }
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
    
    {/* See Our History Button */}
    <div className="max-content mt-12 text-center">
      <Link
        to="/heritage"
        onClick={() => {
          // Ensure the page scrolls to top on navigation
          setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
        }}
        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-red to-brand-red-dark text-white font-semibold rounded-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        See Our History
        <FiArrowRight className="text-xl" />
      </Link>
      <p className="text-sm text-ink-500 mt-4">
        Explore 170+ years of excellence from 1854 to 2025
      </p>
    </div>
  </section>
);
export default HeritageTimelineSection;
