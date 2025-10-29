import SectionTitle from '../components/SectionTitle';
import TrustBadge from '../components/TrustBadge';
import { FaCertificate, FaGem, FaBalanceScale } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useLanguageStore } from '../stores/languageStore';

export const AboutSection = () => {
  const { t } = useLanguageStore();
  const badges = [
    { icon: <FaCertificate />, text: t.badge_bis_hallmark },
    { icon: <FaGem />, text: t.badge_purity },
    { icon: <FaBalanceScale />, text: t.badge_transparent_pricing }
  ];
  return (
  <section id="about" className="section-padding section-accent-bg">
      <div className="max-content">
        <SectionTitle subtitle={t.about_subtitle} title={t.about_title} />
        <p className="max-w-3xl mx-auto text-center text-text-secondary leading-relaxed">
          {t.about_description}
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
