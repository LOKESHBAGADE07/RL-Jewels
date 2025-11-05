import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import { occasions } from '../data/occasions';
import { useLanguageStore } from '../stores/languageStore';

export const ShopByOccasionSection: React.FC = () => {
  const { t } = useLanguageStore();
  return (
    <section id="occasions" className="section-padding bg-white">
      <div className="max-content">
        <SectionTitle title={t.occasions_title} subtitle={t.occasions_subtitle} />
        
        {/* Mobile: Horizontal Scroll */}
        <div className="md:hidden -mx-4 px-4 mb-8">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 scroll-smooth">
            {occasions.map(occasion => (
              <Link 
                key={occasion.id} 
                to={`/occasion/${occasion.id}`}
                className="group flex-shrink-0 w-[75%] max-w-[280px] bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow border border-accent-gold/15 snap-start"
              >
                <div className="aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-brand-red/20 to-brand-red/10 flex items-center justify-center">
                  <img
                    src={occasion.image}
                    alt={occasion.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      const parent = (e.target as HTMLImageElement).parentElement;
                      if (parent && !parent.querySelector('.fallback-text')) {
                        const fallback = document.createElement('div');
                        fallback.className = 'fallback-text text-center p-4';
                        fallback.innerHTML = `<div class="text-3xl mb-2">✨</div><div class="font-semibold text-brand-red">${occasion.title}</div>`;
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium tracking-wide text-sm mb-1 group-hover:text-brand-red transition-colors">{occasion.title}</h3>
                  <p className="text-xs text-neutral-600 line-clamp-2 mb-2">{occasion.description}</p>
                  <span className="text-brand-red text-xs font-semibold tracking-wide group-hover:underline">{t.explore}</span>
                </div>
                <span className="absolute inset-0 ring-1 ring-inset ring-accent-gold/0 group-hover:ring-accent-gold/40 transition" />
              </Link>
            ))}
          </div>
          {/* Scroll Indicator */}
          <p className="text-center text-xs text-neutral-500 mt-2">
            ← Swipe to see more →
          </p>
        </div>

        {/* Desktop/Tablet: Grid */}
        <div className="hidden md:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          {occasions.map(occasion => (
            <Link 
              key={occasion.id} 
              to={`/occasion/${occasion.id}`}
              className="group block bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow border border-accent-gold/15"
            >
              <div className="aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-brand-red/20 to-brand-red/10 flex items-center justify-center">
                <img
                  src={occasion.image}
                  alt={occasion.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent && !parent.querySelector('.fallback-text')) {
                      const fallback = document.createElement('div');
                      fallback.className = 'fallback-text text-center p-4';
                      fallback.innerHTML = `<div class="text-3xl mb-2">✨</div><div class="font-semibold text-brand-red">${occasion.title}</div>`;
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium tracking-wide text-sm mb-1 group-hover:text-brand-red transition-colors">{occasion.title}</h3>
                <p className="text-xs text-neutral-600 line-clamp-2 mb-2">{occasion.description}</p>
                <span className="text-brand-red text-xs font-semibold tracking-wide group-hover:underline">{t.explore}</span>
              </div>
              <span className="absolute inset-0 ring-1 ring-inset ring-accent-gold/0 group-hover:ring-accent-gold/40 transition" />
            </Link>
          ))}
        </div>
        <div className="text-center">
          <Link 
            to="/occasions" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red text-white rounded-lg hover:bg-brand-red/90 transition-colors font-semibold"
          >
            {t.view_all_occasions}
          </Link>
        </div>
      </div>
    </section>
  );
};
export default ShopByOccasionSection;
