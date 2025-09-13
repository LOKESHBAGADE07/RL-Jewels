import { useEffect, useMemo, useState } from 'react';
import { FiSearch, FiShoppingCart, FiMenu, FiX, FiUser } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import Navigation from './Navigation';
import { Link } from 'react-scroll';
import logo from '../assets/logo.png';
import { bestSellers, newArrivals, Product } from '../data/products';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../stores/cart';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const { user, signInWithGoogle, signOutUser } = useAuth();
  const cart = useCart();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setUserOpen(false);
        setCartOpen(false);
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
        <div className="hidden lg:flex items-center gap-5 text-xl text-ink-700">
          <button aria-label="Search" onClick={() => { setSearchOpen(true); setUserOpen(false); setCartOpen(false); }} className="hover:text-brand-red transition"><FiSearch /></button>
          <button aria-label="User" onClick={() => { setUserOpen(true); setSearchOpen(false); setCartOpen(false); }} className="hover:text-brand-red transition"><FiUser /></button>
          <button aria-label="Cart" onClick={() => { setCartOpen(true); setSearchOpen(false); setUserOpen(false); }} className="relative hover:text-brand-red transition">
            <FiShoppingCart />
            {cart.count() > 0 && (
              <span className="absolute -top-2 -right-2 text-[10px] bg-brand-red text-white rounded-full px-1.5 py-0.5">{cart.count()}</span>
            )}
          </button>
          <a aria-label="WhatsApp" href="https://wa.me/919999999999" target="_blank" className="hover:text-brand-red transition">
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
          <div className="flex gap-6 text-2xl pt-4">
            <FiSearch /><FiShoppingCart />
            <a href="https://wa.me/919999999999" target="_blank"><FaWhatsapp /></a>
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
                          <p className="text-sm text-brand-red font-semibold">₹{r.price.toLocaleString('en-IN')}</p>
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

      {/* User Drawer */}
      {userOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50" onClick={() => setUserOpen(false)}>
          <aside className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl border-l border-surface-300" onClick={e=>e.stopPropagation()} role="dialog" aria-label="User">
            <div className="flex items-center justify-between p-4 border-b border-surface-300">
              <h3 className="font-semibold">Account</h3>
              <button aria-label="Close" className="text-2xl text-ink-500 hover:text-brand-red" onClick={()=>setUserOpen(false)}><FiX /></button>
            </div>
            <div className="p-4 space-y-4">
              {!user ? (
                <div className="space-y-4">
                  <button onClick={signInWithGoogle} className="w-full rounded-md bg-white border border-surface-300 hover:border-ink-300 text-ink-900 font-semibold py-3 flex items-center justify-center gap-2">
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="h-5 w-5" />
                    Continue with Google
                  </button>
                  <div className="text-center">
                    <p className="text-xs text-ink-500 mb-3">Secure sign-in powered by Google</p>
                    <div className="border-t border-surface-200 pt-3">
                      <h4 className="font-medium text-sm mb-2">Why create an account?</h4>
                      <ul className="text-xs text-ink-600 space-y-1">
                        <li>• Track your orders</li>
                        <li>• Save your wishlist</li>
                        <li>• Faster checkout</li>
                        <li>• Exclusive offers</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-surface-100 rounded-lg">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="" className="h-12 w-12 rounded-full" />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-brand-red text-white flex items-center justify-center font-semibold">
                        {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-sm">{user.displayName || 'Your Account'}</p>
                      <p className="text-xs text-ink-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  
                  <nav className="space-y-2">
                    <button 
                      onClick={() => { setUserOpen(false); navigate('/account'); }} 
                      className="w-full text-left p-3 hover:bg-surface-100 rounded-lg flex items-center gap-3 text-sm"
                    >
                      <FiUser className="text-ink-500" />
                      My Profile & Orders
                    </button>
                    <button 
                      onClick={() => { setUserOpen(false); navigate('/account#wishlist'); }} 
                      className="w-full text-left p-3 hover:bg-surface-100 rounded-lg flex items-center gap-3 text-sm"
                    >
                      <div className="text-ink-500">♥</div>
                      Wishlist
                    </button>
                    <button 
                      onClick={() => { setUserOpen(false); navigate('/account#addresses'); }} 
                      className="w-full text-left p-3 hover:bg-surface-100 rounded-lg flex items-center gap-3 text-sm"
                    >
                      <div className="text-ink-500">📍</div>
                      Saved Addresses
                    </button>
                  </nav>
                  
                  <div className="border-t border-surface-200 pt-4">
                    <button onClick={signOutUser} className="w-full rounded-md bg-brand-red hover:bg-brand-red-dark text-white font-semibold py-2 text-sm">
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      )}

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50" onClick={() => setCartOpen(false)}>
          <aside className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl border-l border-surface-300" onClick={e=>e.stopPropagation()} role="dialog" aria-label="Cart">
            <div className="flex items-center justify-between p-4 border-b border-surface-300">
              <h3 className="font-semibold">Your Cart</h3>
              <button aria-label="Close" className="text-2xl text-ink-500 hover:text-brand-red" onClick={()=>setCartOpen(false)}><FiX /></button>
            </div>
            {cart.items.length === 0 ? (
              <div className="p-6 text-sm text-ink-500">Your cart is empty.</div>
            ) : (
              <div className="p-4 space-y-4">
                <ul className="divide-y divide-surface-300">
                  {cart.items.map(i => (
                    <li key={i.id} className="py-3 flex items-center gap-3">
                      <img src={i.image} className="w-14 h-14 rounded object-cover" />
                      <div className="flex-1">
                        <p className="text-sm font-medium line-clamp-2">{i.title}</p>
                        <p className="text-xs text-ink-600">Qty: {i.qty}</p>
                      </div>
                      <div className="text-sm font-semibold">₹ {(i.price * i.qty).toLocaleString('en-IN')}</div>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between font-semibold">
                  <span>Subtotal</span>
                  <span>₹ {cart.subtotal().toLocaleString('en-IN')}</span>
                </div>
              </div>
            )}
            <div className="p-4 border-t border-surface-300 grid grid-cols-2 gap-2">
              <button onClick={() => { setCartOpen(false); navigate('/cart'); }} className="rounded-md bg-white border border-surface-300 hover:border-ink-300 text-ink-900 font-semibold py-3">View Cart</button>
              <button onClick={() => { setCartOpen(false); navigate('/checkout'); }} className="rounded-md bg-brand-red hover:bg-brand-red-dark text-white font-semibold py-3">Checkout</button>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
};
export default Header;
