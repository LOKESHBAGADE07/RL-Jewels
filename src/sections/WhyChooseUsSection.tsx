import SectionTitle from '../components/SectionTitle';
import TrustBadge from '../components/TrustBadge';
import { FaFileInvoice, FaCertificate, FaRing, FaPiggyBank, FaGift } from 'react-icons/fa';
import { motion } from 'framer-motion';

const points = [
  { icon: <FaFileInvoice />, text: 'Transparent Billing' },
  { icon: <FaCertificate />, text: 'BIS Certified Purity' },
  { icon: <FaRing />, text: 'Modern & Traditional' },
  { icon: <FaPiggyBank />, text: 'Secure Gold Savings' },
  { icon: <FaGift />, text: 'Loyalty Rewards' }
];

export const WhyChooseUsSection = () => (
  <section id="why" className="section-padding section-accent-bg">
    <div className="max-content">
      <SectionTitle subtitle="Why Choose" title="Why Choose RL Jewels?" />
      <div className="mt-12 overflow-x-auto scrollbar-hide">
        <div className="flex flex-nowrap items-stretch justify-start md:justify-center gap-8 px-4 pb-2" role="list">
          {points.map((p, i) => (
            <motion.div
              role="listitem"
              key={p.text}
              className="shrink-0 w-[140px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
            >
              <TrustBadge icon={p.icon} text={p.text} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
export default WhyChooseUsSection;
