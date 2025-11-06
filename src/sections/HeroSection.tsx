import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import { scroller } from 'react-scroll';
import { useLanguageStore } from '../stores/languageStore';
import { useState, useEffect } from 'react';
import { getActiveHeroBanners, type HeroBanner } from '../lib/hero-banners-database';
import { useNavigate } from 'react-router-dom';
import placeholder from '../lib/placeholderImage';

export const HeroSection = () => {
  const { t } = useLanguageStore();
  const navigate = useNavigate();
  const [banners, setBanners] = useState<HeroBanner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBanners();
  }, []);

  async function loadBanners() {
    try {
      const data = await getActiveHeroBanners();
      if (data.length > 0) {
        setBanners(data);
      } else {
        // Fallback to default content if no banners
        setBanners([{
          id: 'default',
          title: t.hero_title,
          subtitle: t.hero_subtitle + ' - ' + t.hero_description,
          button_text: t.hero_browse_btn,
          button_link: '#collections',
          image_url: null,
          video_url: null,
          media_type: null,
          is_active: true,
          display_order: 1,
          duration_seconds: 5
        }]);
      }
    } catch (error) {
      console.error('Failed to load hero banners:', error);
      // Fallback to default
      setBanners([{
        id: 'default',
        title: t.hero_title,
        subtitle: t.hero_subtitle + ' - ' + t.hero_description,
        button_text: t.hero_browse_btn,
        button_link: '#collections',
        image_url: null,
        video_url: null,
        media_type: null,
        is_active: true,
        display_order: 1,
        duration_seconds: 5
      }]);
    } finally {
      setLoading(false);
    }
  }

  // Auto-advance carousel with dynamic duration
  useEffect(() => {
    if (banners.length <= 1) return;
    
    const currentDuration = (banners[currentIndex]?.duration_seconds || 5) * 1000; // Convert to milliseconds
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, currentDuration);

    return () => clearInterval(timer);
  }, [banners.length, currentIndex, banners]);

  const handleButtonClick = (link: string | null) => {
    if (!link) return;
    
    if (link.startsWith('#')) {
      // Scroll to section
      scroller.scrollTo(link.substring(1), { smooth: true, offset: -80, duration: 600 });
    } else if (link.startsWith('/')) {
      // Navigate to route
      navigate(link);
    } else {
      // External link
      window.open(link, '_blank');
    }
  };

  if (loading) {
    return (
      <section id="home" className="relative min-h-[75vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand-red via-brand-red-dark to-ink-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </section>
    );
  }

  const currentBanner = banners[currentIndex];

  return (
    <section id="home" className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
      {/* Background Media Carousel - Images or Videos */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBanner.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {currentBanner.video_url ? (
            <video 
              src={currentBanner.video_url}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : currentBanner.image_url ? (
            <img 
              src={currentBanner.image_url} 
              alt={currentBanner.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <img 
              src={placeholder('Fine Jewelry', 'gold', 1920, 1080)} 
              alt={currentBanner.title}
              className="w-full h-full object-cover"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-red/80 via-brand-red-dark/80 to-ink-900/90 mix-blend-multiply" />

      {/* Content Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBanner.id}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-lg">
            {currentBanner.title}
          </h1>
          {currentBanner.subtitle && (
            <p className="text-lg md:text-xl lg:text-2xl mb-10 text-white/90 max-w-2xl mx-auto leading-relaxed">
              {currentBanner.subtitle}
            </p>
          )}
          {currentBanner.button_text && currentBanner.button_link && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => handleButtonClick(currentBanner.button_link)}>
                {currentBanner.button_text}
              </Button>
              <Button onClick={() => scroller.scrollTo('contact', { smooth: true, offset: -80, duration: 600 })}>
                {t.hero_contact_btn || 'Contact Us'}
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Carousel Indicators */}
      {banners.length > 1 && (
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                index === currentIndex 
                  ? 'w-8 bg-accent-gold' 
                  : 'w-2.5 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};
export default HeroSection;
