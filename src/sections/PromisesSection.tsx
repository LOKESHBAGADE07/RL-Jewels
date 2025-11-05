import SectionTitle from '../components/SectionTitle';
import TrustBadge from '../components/TrustBadge';
import { FaShieldAlt, FaExchangeAlt, FaShippingFast, FaRedo, FaCertificate, FaGem, FaHandshake } from 'react-icons/fa';
import { motion } from 'framer-motion';

const promises = [
  { icon: <FaCertificate />, text: 'BIS Hallmarked' },
  { icon: <FaShieldAlt />, text: 'Secure Payments' },
  { icon: <FaShippingFast />, text: 'Insured Shipping' },
  { icon: <FaExchangeAlt />, text: 'Lifetime Exchange' },
  { icon: <FaRedo />, text: '14-Day Returns' },
  { icon: <FaGem />, text: 'Purity Guarantee' },
  { icon: <FaHandshake />, text: 'Transparent Billing' }
];

export const PromisesSection = () => (
  <section id="promises" className="section-padding bg-white">
    <div className="max-content">
      <SectionTitle subtitle="Our Promise" title="The RL Jewels Assurance" />
      <div className="mt-12 overflow-x-auto scrollbar-hide">
        <div className="flex flex-nowrap items-stretch justify-start gap-8 px-4 pb-2" role="list">
          {promises.map((p, i) => (
            <motion.div
              role="listitem"
              key={p.text}
              className="shrink-0 w-[140px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <TrustBadge icon={p.icon} text={p.text} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default PromisesSection;