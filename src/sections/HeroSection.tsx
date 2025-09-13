import { motion } from 'framer-motion';
import Button from '../components/Button';
import { scroller } from 'react-scroll';
import { useState } from 'react';
import placeholder from '../lib/placeholderImage';

const announcements = [
  'Festive Offer: Flat 50% off on making charges (T&C)',
  'Exchange Bonus: Extra 5% on old gold exchange this week',
  'New Collection: Bridal Heritage Series launched',
  'Savings Plan: Join now & get bonus benefits at maturity'
];

export const HeroSection = () => {
  const [idx, setIdx] = useState(0);
  // simple auto-advance
  // eslint-disable-next-line
  setTimeout(() => setIdx(i => (i + 1) % announcements.length), 4000);
  return (
    <section id="home" className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={placeholder('Fine Jewelry You Can Trust', 'gold', 1600, 900)} alt="RL Jewels" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-brand-red/90 via-brand-red-dark/90 to-ink-900/95 mix-blend-multiply" />
      <motion.div
        initial={{ opacity:0, y:40 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:0.8 }}
        className="relative z-10 text-center px-6 max-w-4xl"
      >
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg,#fff,#ffe8b3)' }}>RL Jewels</h1>
        <p className="mb-8 text-ink-300 tracking-wide">Purity • Transparency • Craftsmanship</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => scroller.scrollTo('collections', { smooth:true, offset:-80, duration:600 })}>Browse Collections</Button>
          <Button variant="secondary" onClick={() => scroller.scrollTo('savings', { smooth:true, offset:-80, duration:600 })}>Join Savings Plan</Button>
        </div>
        <div className="mt-10 relative mx-auto max-w-xl">
          <div className="overflow-hidden rounded-full border border-accent-gold/30 bg-white/10 backdrop-blur">
            <div className="h-11 flex items-center">
              {announcements.map((a,i) => (
                <div key={a} className="w-full flex-shrink-0 px-6 text-sm font-medium text-white transition-transform duration-700" style={{ transform:`translateX(-${idx*100}%)` }}>
                  {a}
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2 justify-center mt-4">
            {announcements.map((_,i)=>(
              <button key={i} onClick={()=>setIdx(i)} aria-label={`Go to slide ${i+1}`} className={`h-2.5 w-2.5 rounded-full ${i===idx?'bg-accent-gold':'bg-white/40'}`} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
export default HeroSection;
