import SectionTitle from '../components/SectionTitle';
import TrustBadge from '../components/TrustBadge';
import { FaCertificate, FaGem, FaBalanceScale } from 'react-icons/fa';
import { motion } from 'framer-motion';

export const AboutSection = () => {
  const badges = [
    { icon: <FaCertificate />, text: 'BIS Hallmark' },
    { icon: <FaGem />, text: '100% Purity' },
    { icon: <FaBalanceScale />, text: 'Transparent Pricing' }
  ];
  return (
  <section id="about" className="section-padding section-accent-bg">
      <div className="max-content">
        <SectionTitle subtitle="Heritage & Trust" title="About RL Jewels" />
        <p className="max-w-3xl mx-auto text-center text-text-secondary leading-relaxed">
          Serving Jalgaon with purity, transparency and craftsmanship. Our legacy blends tradition and modern design to bring you jewelry that reflects trust and elegance.
        </p>
        <div className="mt-12 grid grid-cols-3 max-w-xl mx-auto gap-4">
          {badges.map((b,i) => (
            <motion.div
              key={b.text}
              initial={{ opacity:0, y:20 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ delay: i * 0.15 }}
            >
              <TrustBadge icon={b.icon} text={b.text} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default AboutSection;
