import useDocumentTitle from '../lib/useDocumentTitle';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCertificate, FaGem, FaBalanceScale, FaStore, FaAward, FaHistory, FaHandshake, FaShieldAlt } from 'react-icons/fa';
import { useLanguageStore } from '../stores/languageStore';

export default function AboutPage() {
  useDocumentTitle('About Us - RL Jewels');
  const { t } = useLanguageStore();

  const values = [
    { icon: <FaShieldAlt />, title: 'Purity', description: '100% BIS Hallmark certified gold and silver' },
    { icon: <FaHandshake />, title: 'Trust', description: 'Over 170 years of customer trust and satisfaction' },
    { icon: <FaBalanceScale />, title: 'Transparency', description: 'Clear, honest pricing with no hidden charges' },
    { icon: <FaAward />, title: 'Excellence', description: 'Five generations of expert craftsmanship' }
  ];

  const features = [
    { icon: <FaCertificate />, title: 'BIS Hallmark', description: 'All products certified by Bureau of Indian Standards' },
    { icon: <FaGem />, title: '100% Purity', description: 'Guaranteed purity in every piece of jewellery' },
    { icon: <FaStore />, title: 'Multiple Locations', description: 'Showrooms in Jalgaon, Nashik, and Thane' },
    { icon: <FaHistory />, title: '170+ Years', description: 'Heritage of trust since 1854' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-gold/10 via-white to-brand-red/5 py-20 overflow-hidden">
        {/* Background Banner Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&h=600&fit=crop&q=85"
            alt="RL Jewels Heritage"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/20 via-white/90 to-brand-red/20"></div>
        </div>

        <div className="max-content relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-red mb-6">
              About RL Jewels
            </h1>
            <div className="w-24 h-1 bg-brand-gold mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl text-text-secondary font-light">
              A Legacy of Purity. A Future of Trust.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-white">
        <div className="max-content">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12 text-brand-red">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none text-justify leading-relaxed space-y-6 text-text-secondary">
              <p>
                Since 1854, Rajmal Lakhichand Jewellers (RL Jewels) has been a name synonymous with purity, trust, and craftsmanship. Born in Jalgaon and now proudly serving customers across Nashik and Thane, we have been pioneers of India's jewellery industry for over 170 years.
              </p>
              <p>
                Long before hallmarking became an official standard, RL Jewels was already ensuring purity through its own hallmark practices, setting the foundation for the trust we continue to uphold today. Our visionary Gold Deposit Scheme was so impactful that it was appreciated by then Finance Minister, Dr. Manmohan Singh, who later introduced a similar initiative as a national gold savings scheme.
              </p>
              <p>
                With the same spirit of innovation, we now bring you RL Jewels Digital Gold – a modern way to buy, sell, and save real 22K gold and silver online, safely and conveniently. Every purchase is 100% pure, insured, and stored securely, with the option to redeem your holdings for physical jewellery or coins at any time.
              </p>
              <p>
                At our stores in Jalgaon, Nashik, and Thane, we continue to offer a curated selection of gold, silver, diamond jewellery, and certified gemstones, crafted with the heritage of five generations and the artistry of today's finest designers.
              </p>
              <p className="font-semibold text-brand-red">
                At RL Jewels, we blend tradition with technology – preserving our legacy of purity while embracing the digital future of gold.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-white">
        <div className="max-content">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-4 text-brand-red">
            Our Values
          </h2>
          <p className="text-center text-text-secondary mb-12 max-w-2xl mx-auto">
            The principles that have guided us for over 170 years
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-accent-bg rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="text-5xl text-brand-gold mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-brand-red mb-2">{value.title}</h3>
                <p className="text-text-secondary">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding section-accent-bg">
        <div className="max-content">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-4 text-brand-red">
            Why Choose RL Jewels
          </h2>
          <p className="text-center text-text-secondary mb-12 max-w-2xl mx-auto">
            What sets us apart in the jewellery industry
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all hover:-translate-y-2"
              >
                <div className="text-5xl text-brand-gold mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-brand-red mb-3">{feature.title}</h3>
                <p className="text-text-secondary">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-brand-red to-brand-gold text-white">
        <div className="max-content text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Experience 170 Years of Trust
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Visit our showrooms in Jalgaon, Nashik, or Thane to discover our exquisite collection
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                onClick={() => {
                  setTimeout(() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }, 100);
                }}
                className="btn btn-secondary bg-white text-brand-red hover:bg-gray-100"
              >
                Contact Us
              </Link>
              <Link
                to="/catalog"
                className="btn btn-secondary border-2 border-white text-white hover:bg-white hover:text-brand-red"
              >
                View Collection
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
