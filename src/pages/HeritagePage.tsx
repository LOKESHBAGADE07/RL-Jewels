import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import useDocumentTitle from '../lib/useDocumentTitle';

interface YearData {
  year: number;
  goldPrice: number;
}

// Generate years from 2025 to 1854 (reversed) with gold prices
const generateYearData = (): YearData[] => {
  const years: YearData[] = [];
  const startYear = 1854;
  const endYear = 2025;
  const startPrice = 100; // Starting gold price in 1854
  
  // Generate in reverse order (2025 to 1854)
  for (let year = endYear; year >= startYear; year--) {
    const yearsSinceStart = year - startYear;
    const goldPrice = startPrice + (yearsSinceStart * 100);
    years.push({ year, goldPrice });
  }
  
  return years;
};

const HeritagePage = () => {
  useDocumentTitle('Our Heritage - 170+ Years of Excellence | RL Jewels');
  const [selectedYear, setSelectedYear] = useState<YearData | null>(null);
  const yearData = generateYearData();
  const navigate = useNavigate();

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBack = () => {
    navigate(-1); // Go back to previous page maintaining scroll position
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-background-cream to-white"
      onClick={() => setSelectedYear(null)}
    >
      {/* Header */}
      <div 
        className="bg-gradient-to-r from-brand-red to-brand-red-dark text-white py-16"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-content px-4">
          <button 
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors cursor-pointer bg-transparent border-none"
          >
            <FiArrowLeft /> Back to Home
          </button>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Heritage</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Discover 170+ years of excellence in jewelry craftsmanship from 1854 to 2025
          </p>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="max-content px-4 py-16">
        <div 
          className="mb-12 relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Main Heading Section */}
          <div className="text-center lg:text-left flex-1 max-w-2xl">
            <h2 className="text-3xl font-serif font-bold text-ink-900 mb-4">
              Interactive Gold Price Timeline
            </h2>
            <p className="text-ink-600">
              Click on any year to see the gold price. Our legacy spans across generations, 
              witnessing the evolution of gold prices through history.
            </p>
          </div>
          
          {/* Heritage Brand Box - Click to scroll to 1854 */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onClick={(e) => {
              e.stopPropagation();
              const beginningBox = document.getElementById('heritage-beginning');
              if (beginningBox) {
                beginningBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }}
            className="group relative flex-shrink-0"
          >
            {/* Heritage Box with background image */}
            <div className="w-56 h-64 rounded-lg shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-105 relative overflow-hidden border-2 border-accent-gold/30">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500&h=700&fit=crop&q=85)',
                  filter: 'brightness(0.4)',
                }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#8B1538]/90 via-[#6B0F2A]/85 to-[#4A0A1C]/90" />
              
              {/* Texture Overlay */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" /%3E%3C/filter%3E%3Crect width="100" height="100" filter="url(%23noise)" opacity="0.3"/%3E%3C/svg%3E")',
              }} />
              
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center">
                {/* RL Jewels Logo Text */}
                <div className="mb-3">
                  <div className="text-3xl font-bold text-white tracking-wider mb-1" style={{ letterSpacing: '0.15em' }}>
                    RL JEWELS
                  </div>
                  <div className="h-px w-24 bg-accent-gold mx-auto mb-1" />
                  <div className="text-[10px] text-white/90 tracking-widest">
                    JEWELLERS SINCE 1854
                  </div>
                  <div className="text-xs text-white/80 mt-1" style={{ fontFamily: 'serif' }}>
                    राजमल लखीचंद मनीष जैन ग्रुप
                  </div>
                </div>
                
                {/* Main Marathi Text */}
                <div className="mt-4 space-y-1">
                  <div className="text-xl font-bold text-accent-gold leading-tight" style={{ fontFamily: 'Georgia, serif', textShadow: '0 2px 8px rgba(212, 175, 55, 0.4)' }}>
                    दागिन्यांमधून<br/>जपलेली परंपरा
                  </div>
                  <div className="text-2xl font-bold text-accent-gold" style={{ fontFamily: 'Georgia, serif', textShadow: '0 2px 8px rgba(212, 175, 55, 0.4)' }}>
                    1854 पासून
                  </div>
                </div>
              </div>
            </div>
          </motion.button>
        </div>

        {/* Curly Steam Timeline */}
        <div 
          className="relative max-w-5xl mx-auto py-8 px-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* SVG Gradient Definitions */}
          <svg width="0" height="0" className="absolute">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#DC2626" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#DC2626" />
              </linearGradient>
            </defs>
          </svg>

          {/* Continuous Curly Line with Years */}
          <div className="relative">
            {/* Generate rows of years with curly connecting line */}
            {Array.from({ length: Math.ceil(yearData.length / 6) }, (_, rowIndex) => {
              const startIdx = rowIndex * 6;
              const rowYears = yearData.slice(startIdx, startIdx + 6);
              const isLastRow = rowIndex === Math.ceil(yearData.length / 6) - 1;
              const isEvenRow = rowIndex % 2 === 0;
              
              return (
                <div key={rowIndex} className="relative mb-20">
                  {/* Horizontal Line */}
                  <div className="absolute top-10 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-red via-accent-gold to-brand-red rounded-full shadow-md" style={{ zIndex: 1 }} />
                  
                  {/* Curly Connector to Next Row */}
                  {!isLastRow && (
                    <svg 
                      className={`absolute ${isEvenRow ? 'right-0' : 'left-0'} top-10`}
                      width="100" 
                      height="100" 
                      viewBox="0 0 100 100"
                      style={{ zIndex: 1 }}
                    >
                      <path
                        d={isEvenRow 
                          ? "M 0 5 Q 50 15, 80 30 Q 95 45, 95 65 Q 95 85, 80 95 L 100 95"
                          : "M 100 5 Q 50 15, 20 30 Q 5 45, 5 65 Q 5 85, 20 95 L 0 95"
                        }
                        stroke="url(#lineGradient)"
                        strokeWidth="6"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                  
                  {/* Year Circles */}
                  <div className="relative grid grid-cols-6 gap-1" style={{ zIndex: 10 }}>
                    {rowYears.map((item, idx) => {
                      const isSelected = selectedYear?.year === item.year;
                      const isAboveLine = idx % 2 === 0; // Alternate above/below
                      
                      return (
                        <motion.div
                          key={item.year}
                          initial={{ opacity: 0, scale: 0.3 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: idx * 0.05 }}
                          className={`flex flex-col items-center justify-center ${isAboveLine ? 'mb-12' : 'mt-12'}`}
                        >
                          {/* Vertical Stem */}
                          <div 
                            className={`w-1 ${isAboveLine ? 'order-2' : 'order-1'} ${isSelected ? 'bg-accent-gold' : 'bg-gray-400'} transition-colors`}
                            style={{ height: '2.5rem' }}
                          />
                          
                          {/* Year Circle */}
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedYear(isSelected ? null : item);
                            }}
                            className={`${isAboveLine ? 'order-1' : 'order-2'} w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-all duration-300 transform hover:scale-110 relative cursor-pointer ${
                              isSelected
                                ? 'bg-gradient-to-br from-brand-red to-brand-red-dark text-white shadow-2xl ring-4 ring-accent-gold scale-110'
                                : 'bg-white text-ink-900 shadow-lg hover:shadow-xl border-4 border-gray-300 hover:border-brand-red'
                            }`}
                          >
                            <span className="relative z-10">{item.year}</span>
                            
                            {/* Hanging Price Label */}
                            {isSelected && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.5, y: isAboveLine ? 10 : -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                onClick={(e) => e.stopPropagation()}
                                className={`absolute ${isAboveLine ? 'top-full mt-2' : 'bottom-full mb-2'} left-1/2 -translate-x-1/2 bg-accent-gold text-ink-900 px-4 py-2 rounded-xl shadow-2xl font-bold text-xs whitespace-nowrap z-50 border-2 border-brand-red pointer-events-none`}
                              >
                                <div className="text-center">
                                  <div className="text-[10px] opacity-75 font-semibold">Gold Price</div>
                                  <div className="text-base font-bold">₹{item.goldPrice.toLocaleString()}</div>
                                  <div className="text-[9px] opacity-60">per 10g</div>
                                </div>
                                {/* Arrow */}
                                <div 
                                  className={`absolute left-1/2 -translate-x-1/2 ${
                                    isAboveLine 
                                      ? 'top-0 -translate-y-full border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-accent-gold'
                                      : 'bottom-0 translate-y-full border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-accent-gold'
                                  }`}
                                />
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            
            {/* "The Beginning" Box at the End (1854) */}
            <motion.div
              id="heritage-beginning"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative mt-8 mb-8 scroll-mt-20"
            >
              <div className="flex justify-center">
                <div className="relative">
                  {/* Decorative Corner Accents */}
                  <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-accent-gold rounded-tl-lg" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-accent-gold rounded-tr-lg" />
                  <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-accent-gold rounded-bl-lg" />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-accent-gold rounded-br-lg" />
                  
                  {/* Main Box */}
                  <div className="bg-gradient-to-br from-brand-red via-brand-red-dark to-brand-red text-white px-12 py-8 rounded-2xl shadow-2xl border-4 border-accent-gold relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 left-0 w-full h-full" style={{ 
                        backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                      }} />
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10 text-center">
                      <div className="text-5xl font-serif font-bold mb-2">1854</div>
                      <div className="h-1 w-24 bg-accent-gold mx-auto mb-4 rounded-full" />
                      <div className="text-2xl font-serif font-semibold mb-2">The Beginning</div>
                      <div className="text-lg mb-1">of</div>
                      <div className="text-3xl font-serif font-bold text-accent-gold">RL Jewels</div>
                      <div className="text-sm mt-3 opacity-90">Where Legacy Begins</div>
                    </div>
                    
                    {/* Decorative Gems */}
                    <div className="absolute top-4 right-4 w-3 h-3 bg-accent-gold rounded-full animate-pulse" />
                    <div className="absolute bottom-4 left-4 w-2 h-2 bg-accent-gold rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-2xl p-8 border border-pink-200">
            <h3 className="text-2xl font-serif font-bold text-ink-900 mb-4">
              170+ Years of Trust & Excellence
            </h3>
            <p className="text-ink-600 max-w-3xl mx-auto leading-relaxed">
              From our humble beginnings in 1854 to becoming a trusted name across three generations, 
              RL Jewels has been a witness to India's golden journey. Click on any year above to explore 
              the historical gold prices and see how our legacy has grown alongside India's prosperity.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-red mb-2">1854</div>
                <div className="text-sm text-ink-600">Year Founded</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-red mb-2">170+</div>
                <div className="text-sm text-ink-600">Years of Service</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-red mb-2">3</div>
                <div className="text-sm text-ink-600">Store Locations</div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-red to-brand-red-dark text-white font-semibold rounded-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <FiArrowLeft /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeritagePage;
