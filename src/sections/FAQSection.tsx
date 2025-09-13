import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';

interface QA { q: string; a: string; }
const faqs: QA[] = [
  { q: 'Are your products hallmarked?', a: 'Yes, all gold jewellery is BIS hallmarked ensuring purity and authenticity.' },
  { q: 'Do you offer customised designs?', a: 'We provide bespoke design services; share your inspiration and our artisans craft it.' },
  { q: 'What payment methods are accepted?', a: 'UPI, major cards, net banking, and approved instalment options are accepted.' },
  { q: 'How does the savings plan work?', a: 'You deposit a fixed amount monthly. At maturity you receive a making charge benefit or bonus per plan terms.' }
];

export const FAQSection: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section-padding bg-white">
      <div className="max-content max-w-4xl">
        <SectionTitle title="Frequently Asked Questions" subtitle="Support" />
  <ul className="divide-y divide-accent-gold/25 rounded-xl border border-accent-gold/30 bg-white/70 backdrop-blur overflow-hidden">
          {faqs.map((item, idx) => {
            const expanded = open === idx;
            return (
              <li key={item.q}>
                <button
                  className="w-full text-left px-5 py-4 flex items-start gap-4 focus:outline-none focus-visible:ring focus-visible:ring-brand-red/40"
                  aria-expanded={expanded}
                  aria-controls={`faq-panel-${idx}`}
                  onClick={() => setOpen(expanded ? null : idx)}
                >
                  <span className="mt-1 w-5 h-5 inline-flex items-center justify-center rounded-full border border-brand-red text-[10px] font-semibold text-brand-red">
                    {expanded ? '-' : '+'}
                  </span>
                  <span className="font-medium tracking-wide">{item.q}</span>
                </button>
                {expanded && (
                  <div id={`faq-panel-${idx}`} className="px-14 pb-5 -mt-2 text-sm text-neutral-700 leading-relaxed">
                    {item.a}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
export default FAQSection;
