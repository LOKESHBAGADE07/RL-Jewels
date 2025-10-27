import { useEffect, useMemo, useState } from 'react';
import { FiSearch, FiMenu, FiX, FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import Navigation from './Navigation';
import LanguageSwitcher from './LanguageSwitcher';
import { Link } from 'react-scroll';
import logo from '../assets/logo.png';
import { bestSellers, newArrivals, Product } from '../data/products';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, []);

  const allProducts = useMemo<Product[]>(() => [...newArrivals, ...bestSellers], []);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [] as Product[];
    return allProducts.filter(p => p.title.toLowerCase().includes(q)).slice(0, 8);
  }, [allProducts, query]);
  return (
  <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur border-b border-surface-300" role="banner">
      <div className="max-content flex items-center justify-between h-20 px-4">
        <Link to="home" smooth offset={-80} className="flex items-center gap-2 cursor-pointer" aria-label="RL Jewels Home">
          <img src={logo} alt="RL Jewels" className="h-12 w-auto" loading="lazy" />
        </Link>
        <Navigation />
        <div className="hidden lg:flex items-center gap-3 text-xl text-ink-700">
          <LanguageSwitcher />
          <button aria-label="Search" onClick={() => setSearchOpen(true)} className="hover:text-brand-red transition"><FiSearch /></button>
          <a aria-label="Call us" href="tel:+919999999999" className="hover:text-brand-red transition">
            <FiPhone />
          </a>
          <a aria-label="WhatsApp" href="https://wa.me/919999999999?text=Hi, I'm interested in RL Jewels collection" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition">
            <FaWhatsapp />
          </a>
        </div>
  <button className="lg:hidden text-2xl text-brand-red" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(o=>!o)} aria-label="Menu">
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>
      {open && (
  <div id="mobile-nav" className="lg:hidden absolute inset-x-0 top-20 bg-white/95 backdrop-blur-md p-8 space-y-6 border-b border-surface-300" role="dialog" aria-modal="true" aria-label="Mobile navigation menu">
          <nav className="flex flex-col gap-4 text-lg" aria-label="Mobile Primary">
            {['home','collections','occasions','savings','heritage','faq','blog','contact'].map(id => (
              <Link key={id} to={id} smooth offset={-80} duration={500} onClick={()=>setOpen(false)} className="py-2 border-b border-white/10">
                {id.replace(/\w/, c=>c.toUpperCase()).replace('-', ' ')}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-6 text-2xl pt-4">
            <LanguageSwitcher />
            <button onClick={() => { setSearchOpen(true); setOpen(false); }} aria-label="Search"><FiSearch /></button>
            <a href="tel:+919999999999" aria-label="Call us"><FiPhone /></a>
            <a href="https://wa.me/919999999999?text=Hi, I'm interested in RL Jewels collection" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
          </div>
        </div>
      )}
      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] bg-black/70 flex items-start justify-center p-4 pt-28" role="dialog" aria-modal="true" aria-label="Site search" onClick={() => setSearchOpen(false)}>
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-surface-300 relative" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 p-4 border-b border-surface-300">
              <FiSearch className="text-ink-500 text-xl" />
              <input
                autoFocus
                value={query}
                onChange={e=>setQuery(e.target.value)}
                placeholder="Search products (e.g., Ring, Necklace)"
                className="flex-1 bg-white text-ink-900 placeholder-ink-500 outline-none"
              />
              <button onClick={() => setSearchOpen(false)} aria-label="Close search" className="text-2xl text-ink-500 hover:text-brand-red"><FiX /></button>
            </div>
            <div className="max-h-80 overflow-auto">
              {results.length === 0 ? (
                <div className="p-6 text-sm text-ink-500">{query ? 'No products found.' : 'Start typing to search products.'}</div>
              ) : (
                <ul role="listbox" className="divide-y divide-surface-300">
                  {results.map(r => (
                    <li key={r.id} className="p-4 hover:bg-surface-200/60 cursor-pointer" onClick={() => { setSearchOpen(false); (window as any).scrollTo?.(0,0); navigate(`/product/${r.id}`); }}>
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-md overflow-hidden bg-surface-300 flex items-center justify-center text-xs text-ink-500">
                          <img src={r.image} alt="" className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{r.title}</p>
                        </div>
                        {r.badge && <span className="pill">{r.badge}</span>}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="p-3 text-[11px] text-ink-500 border-t border-surface-300">Press Esc to close</div>
          </div>
        </div>
      )}

    </header>
  );
};
export default Header;
