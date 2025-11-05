import { useEffect, useMemo, useState } from 'react';
import { FiSearch, FiMenu, FiX, FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import Navigation from './Navigation';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguageStore } from '../stores/languageStore';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import { bestSellers, newArrivals, Product } from '../data/products';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  const { t } = useLanguageStore();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const allProducts = useMemo<Product[]>(() => [...newArrivals, ...bestSellers], []);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [] as Product[];
    return allProducts.filter(p => p.title.toLowerCase().includes(q)).slice(0, 8);
  }, [allProducts, query]);
  return (
  <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-surface-300 shadow-sm" role="banner">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-4 lg:px-6">
        <RouterLink 
          to="/" 
          className="flex items-center gap-2 cursor-pointer flex-shrink-0" 
          aria-label="RL Jewels Home"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <img src={logo} alt="RL Jewels" className="h-11 w-auto" loading="lazy" />
        </RouterLink>
        
        <div className="flex-1 flex justify-center mx-4">
          <Navigation />
        </div>
        
        <div className="hidden lg:flex items-center gap-4 text-xl text-ink-700 flex-shrink-0">
          <LanguageSwitcher />
          <button aria-label="Search" onClick={() => setSearchOpen(true)} className="hover:text-brand-red transition-colors p-2"><FiSearch /></button>
          <a aria-label="WhatsApp" href="https://wa.me/919403891854?text=Hi, I'm interested in RL Jewels collection" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors p-2">
            <FaWhatsapp />
          </a>
        </div>
        
        <div className="lg:hidden flex items-center gap-3">
          <LanguageSwitcher />
          <button className="text-2xl text-brand-red p-2" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(o=>!o)} aria-label="Menu">
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
      {open && (
  <div id="mobile-nav" className="lg:hidden absolute inset-x-0 top-20 bg-white/95 backdrop-blur-md p-8 space-y-6 border-b border-surface-300 shadow-lg max-h-[calc(100vh-5rem)] overflow-y-auto" role="dialog" aria-modal="true" aria-label="Mobile navigation menu">
          <nav className="flex flex-col gap-4 text-lg" aria-label="Mobile Primary">
            {[
              { id: 'home', label: t.nav_home, route: '/' },
              { id: 'about', label: t.nav_about, route: '/about' },
              { id: 'collections', label: t.nav_collections, route: '/collections' },
              { id: 'occasions', label: t.nav_occasions, route: '/#occasions' },
              { id: 'savings', label: t.nav_savings, route: '/#savings' },
              { id: 'heritage', label: t.nav_heritage, route: '/#heritage' },
              { id: 'faq', label: t.nav_faq, route: '/#faq' },
              { id: 'blog', label: t.nav_blog, route: '/blog' },
              { id: 'contact', label: t.nav_contact, route: '/#contact' }
            ].map(item => (
              <RouterLink 
                key={item.id} 
                to={item.route} 
                onClick={()=>setOpen(false)} 
                className="py-2 border-b border-gray-100 hover:text-brand-red transition-colors font-medium"
              >
                {item.label}
              </RouterLink>
            ))}
          </nav>
          <div className="flex items-center gap-6 text-2xl pt-4">
            <button onClick={() => { setSearchOpen(true); setOpen(false); }} aria-label="Search"><FiSearch /></button>
            <a href="https://wa.me/919403891854?text=Hi, I'm interested in RL Jewels collection" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
          </div>
        </div>
      )}
      {/* Enhanced Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] bg-black/70 flex items-start justify-center p-4 pt-20" role="dialog" aria-modal="true" aria-label="Site search" onClick={() => setSearchOpen(false)}>
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-surface-300 relative animate-in fade-in slide-in-from-top-4 duration-300" onClick={e => e.stopPropagation()}>
            {/* Search Input - Compact */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-surface-200">
              <FiSearch className="text-ink-400 text-lg flex-shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={e=>setQuery(e.target.value)}
                placeholder="Search jewellery..."
                className="flex-1 bg-transparent text-ink-900 placeholder-ink-400 outline-none text-sm"
              />
              <button onClick={() => setSearchOpen(false)} aria-label="Close search" className="text-xl text-ink-400 hover:text-brand-red transition-colors"><FiX /></button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {/* Search Results */}
              {query && results.length > 0 ? (
                <div className="p-3">
                  <h3 className="text-[10px] font-semibold text-ink-500 uppercase tracking-wider mb-2">Search Results</h3>
                  <div className="space-y-1.5">
                    {results.map(r => (
                      <div 
                        key={r.id} 
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
                        onClick={() => { setSearchOpen(false); setQuery(''); window.scrollTo(0,0); navigate(`/product/${r.id}`); }}
                      >
                        <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                          <img src={r.image} alt={r.title} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-ink-900 truncate group-hover:text-brand-red transition-colors">{r.title}</p>
                          <p className="text-xs text-ink-500">₹{r.price.toLocaleString()}</p>
                        </div>
                        {r.badge && (
                          <span className={`px-1.5 py-0.5 text-[10px] font-semibold rounded ${r.badge === 'New' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {r.badge}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : query && results.length === 0 ? (
                <div className="p-6 text-center">
                  <p className="text-sm text-ink-500">No products found for "{query}"</p>
                  <p className="text-xs text-ink-400 mt-1">Try different keywords</p>
                </div>
              ) : (
                <>
                  {/* Popular Searches */}
                  <div className="p-3 border-b border-surface-200">
                    <h3 className="text-[10px] font-semibold text-ink-500 uppercase tracking-wider mb-2">Popular Searches</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {['Diwali Jewellery', 'Auspicious Jewellery', 'Special Coins', 'Pendants Under 30k'].map(term => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-xs text-ink-700 rounded-full border border-gray-200 transition-colors flex items-center gap-1.5 group"
                        >
                          <FiSearch className="text-[10px] opacity-50 group-hover:opacity-100" />
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Trending Products - Compact */}
                  <div className="p-3">
                    <h3 className="text-[10px] font-semibold text-ink-500 uppercase tracking-wider mb-2">Trending Products</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'na-1', title: 'Regal Diamond Encrusted Square...', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&q=85', price: '96,700' },
                        { id: 'bs-2', title: 'Modish Links Diamond Ring', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&q=85', price: '1,42,508' },
                        { id: 'na-3', title: 'Teardrop Shaped Yellow Gold And...', image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=400&h=400&fit=crop&q=85', price: '14,555' }
                      ].map(product => (
                        <div
                          key={product.id}
                          className="group cursor-pointer"
                          onClick={() => { setSearchOpen(false); window.scrollTo(0,0); navigate(`/product/${product.id}`); }}
                        >
                          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-1.5">
                            <img 
                              src={product.image} 
                              alt={product.title} 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                            />
                          </div>
                          <p className="text-xs font-medium text-ink-900 truncate group-hover:text-brand-red transition-colors">{product.title}</p>
                          <p className="text-[10px] text-ink-500 mt-0.5">₹{product.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Store Banner - Compact */}
                  <div className="mx-3 mb-3 bg-gradient-to-r from-pink-50 to-red-50 rounded-lg p-3 border border-pink-100">
                    <h3 className="text-sm font-serif font-bold text-ink-900 mb-0.5">
                      Loved It Online? Find It At A Store Near You!
                    </h3>
                    <p className="text-xs text-ink-600">
                      Click "Request Store Availability" on your favourite product.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Footer - Compact */}
            <div className="px-4 py-2 text-[10px] text-ink-400 border-t border-surface-200 bg-gray-50 rounded-b-xl flex items-center justify-between">
              <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-[9px] font-mono">Esc</kbd> to close</span>
              <span>3 Stores • Jalgaon, Nashik, Thane</span>
            </div>
          </div>
        </div>
      )}

    </header>
  );
};
export default Header;
