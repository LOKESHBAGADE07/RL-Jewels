import { motion } from 'framer-motion';
import Button from '../components/Button';
import { scroller } from 'react-scroll';
import { useLanguageStore } from '../stores/languageStore';

export const HeroSection = () => {
  const { t } = useLanguageStore();
  
  return (
    <section id="home" className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-red via-brand-red-dark to-ink-900" />
      <motion.div
        initial={{ opacity:0, y:40 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:0.8 }}
        className="relative z-10 text-center px-6 max-w-4xl"
      >
        <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">{t.hero_title}</h1>
        <p className="text-xl md:text-2xl mb-4 text-amber-100 tracking-wide">{t.hero_subtitle}</p>
        <p className="text-lg mb-10 text-white/90 max-w-2xl mx-auto">{t.hero_description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => scroller.scrollTo('collections', { smooth:true, offset:-80, duration:600 })}>{t.hero_browse_btn}</Button>
          <Button variant="secondary" onClick={() => scroller.scrollTo('contact', { smooth:true, offset:-80, duration:600 })}>{t.hero_contact_btn}</Button>
        </div>
      </motion.div>
    </section>
  );
};
export default HeroSection;
