import SectionTitle from '../components/SectionTitle';
import TrustBadge from '../components/TrustBadge';
import { FaCertificate, FaGem, FaBalanceScale, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
        
        {/* Short About Description */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-text-secondary leading-relaxed text-sm sm:text-base md:text-lg mb-6" style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
            Since 1854, Rajmal Lakhichand Jewellers (RL Jewels) has been a name synonymous with purity, trust, and craftsmanship. Born in Jalgaon and now proudly serving customers across Nashik and Thane, we have been pioneers of India's jewellery industry for over 170 years.
          </p>
          <p className="text-center text-text-secondary leading-relaxed text-sm sm:text-base md:text-lg mb-8" style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
            Long before hallmarking became an official standard, RL Jewels was already ensuring purity through its own hallmark practices, setting the foundation for the trust we continue to uphold today. Our visionary Gold Deposit Scheme was so impactful that it was appreciated by then Finance Minister, Dr. Manmohan Singh, who later introduced a similar initiative as a national gold savings scheme.
          </p>
          
          {/* Learn More Button */}
          <div className="text-center">
            <Link 
              to="/about"
              className="inline-flex items-center gap-2 px-8 py-3 bg-brand-red text-white rounded-lg hover:bg-brand-red/90 transition-all hover:gap-3 font-medium shadow-md hover:shadow-lg"
            >
              {t.about_more_btn}
              <FaArrowRight className="text-sm" />
            </Link>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap justify-center items-center max-w-3xl mx-auto gap-6 px-4">
          {badges.map((b,i) => (
            <motion.div
              key={b.text}
              initial={{ opacity:0, y:20 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ delay: i * 0.15 }}
              className="flex-shrink-0"
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
