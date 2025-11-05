import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Link as ScrollLink, scroller } from 'react-scroll';
import { useMemo, useEffect } from 'react';
import useActiveSection from '../hooks/useActiveSection';
import { useLanguageStore } from '../stores/languageStore';

const linkIds = [
  'home',
  'collections',
  'occasions',
  'savings',
  'heritage',
  'contact'
];

export const Navigation = ({ onClick }: { onClick?: () => void }) => {
  const { t } = useLanguageStore();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const ids = useMemo(() => linkIds, []);
  const active = useActiveSection(ids);
  
  // Handle hash navigation after page loads (only for forward navigation, not back button)
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && isHomePage) {
      // Small delay to ensure page is rendered
      setTimeout(() => {
        scroller.scrollTo(hash, {
          duration: 400,
          delay: 0,
          smooth: 'easeInOutQuart',
          offset: -90
        });
      }, 100);
    }
    // Removed auto-scroll to top - let browser handle scroll restoration
  }, [location.hash, isHomePage]);
  
  const links = [
    { to: 'home', label: t.nav_home, route: '/' },
    { to: 'about', label: t.nav_about, route: '/about' },
    { to: 'collections', label: t.nav_collections, route: '/collections' },
    { to: 'occasions', label: t.nav_occasions, route: '/#occasions' },
    { to: 'savings', label: t.nav_savings, route: '/#savings' },
    { to: 'heritage', label: t.nav_heritage, route: '/#heritage' },
    { to: 'faq', label: t.nav_faq, route: '/#faq' },
    { to: 'blog', label: t.nav_blog, route: '/blog' },
    { to: 'contact', label: t.nav_contact, route: '/#contact' }
  ];
  
  const handleClick = (l: typeof links[0]) => {
    if (onClick) onClick();
    
    // If it's a home section link and we're not on home page
    if (l.route.includes('#') && !isHomePage) {
      const section = l.route.split('#')[1];
      navigate(`/#${section}`);
    }
    // Let ScrollToTop component handle all scroll behavior
  };
  
  return (
    <ul className="hidden lg:flex gap-6 xl:gap-8 items-center" role="menubar" aria-label="Primary">
      {links.map(l => {
        // Only use active section detection on homepage
        const isActive = isHomePage && active === l.to;
        
        // Use RouterLink for separate pages (About, Collections, Blog)
        if (l.route.startsWith('/') && !l.route.includes('#')) {
          return (
            <li key={l.to} role="none">
              <RouterLink
                to={l.route}
                role="menuitem"
                className={`group cursor-pointer relative font-medium text-[15px] tracking-wide transition-colors whitespace-nowrap ${isActive ? 'text-ink-900' : 'text-ink-600 hover:text-brand-red'}`}
                onClick={() => handleClick(l)}
              >
                {l.label}
                <span className={`absolute left-0 -bottom-1 h-0.5 bg-brand-red transition-all ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </RouterLink>
            </li>
          );
        }
        
        // For home page sections
        if (isHomePage) {
          // Already on home page, use ScrollLink for smooth scrolling
          // Special case: Home link scrolls to top
          if (l.to === 'home') {
            return (
              <li key={l.to} role="none">
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    if (onClick) onClick();
                  }}
                  role="menuitem"
                  className={`group cursor-pointer relative font-medium text-[15px] tracking-wide transition-colors whitespace-nowrap ${isActive ? 'text-ink-900' : 'text-ink-600 hover:text-brand-red'}`}
                >
                  {l.label}
                  <span className={`absolute left-0 -bottom-1 h-0.5 bg-brand-red transition-all ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </button>
              </li>
            );
          }
          
          return (
            <li key={l.to} role="none">
              <ScrollLink
                to={l.to}
                spy
                smooth
                duration={400}
                offset={-90}
                role="menuitem"
                aria-current={isActive ? 'page' : undefined}
                className={`group cursor-pointer relative font-medium text-[15px] tracking-wide transition-colors whitespace-nowrap ${isActive ? 'text-ink-900' : 'text-ink-600 hover:text-brand-red'}`}
                onClick={onClick}
              >
                {l.label}
                <span className={`absolute left-0 -bottom-1 h-0.5 bg-brand-red transition-all ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </ScrollLink>
            </li>
          );
        } else {
          // On different page, navigate to home with hash
          return (
            <li key={l.to} role="none">
              <RouterLink
                to={l.route}
                role="menuitem"
                className={`group cursor-pointer relative font-medium text-[15px] tracking-wide transition-colors whitespace-nowrap ${isActive ? 'text-ink-900' : 'text-ink-600 hover:text-brand-red'}`}
                onClick={() => handleClick(l)}
              >
                {l.label}
                <span className={`absolute left-0 -bottom-1 h-0.5 bg-brand-red transition-all ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </RouterLink>
            </li>
          );
        }
      })}
    </ul>
  );
};
export default Navigation;
