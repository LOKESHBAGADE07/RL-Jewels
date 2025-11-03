import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useMemo } from 'react';
import useActiveSection from '../hooks/useActiveSection';
import { useLanguageStore } from '../stores/languageStore';

const linkIds = [
  'home',
  'collections',
  'occasions',
  'savings',
  'heritage',
  'testimonials',
  'faq',
  'blog',
  'contact'
];

export const Navigation = ({ onClick }: { onClick?: () => void }) => {
  const { t } = useLanguageStore();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const ids = useMemo(() => linkIds, []);
  const active = useActiveSection(ids);
  
  const links = [
    { to: 'home', label: t.nav_home, route: '/' },
    { to: 'collections', label: t.nav_collections, route: '/collections' },
    { to: 'occasions', label: t.nav_occasions, route: '/#occasions' },
    { to: 'savings', label: t.nav_savings, route: '/#savings' },
    { to: 'heritage', label: t.nav_heritage, route: '/#heritage' },
    { to: 'testimonials', label: t.nav_reviews, route: '/#testimonials' },
    { to: 'faq', label: t.nav_faq, route: '/#faq' },
    { to: 'blog', label: t.nav_blog, route: '/blog' },
    { to: 'contact', label: t.nav_contact, route: '/#contact' }
  ];
  
  return (
    <ul className="hidden lg:flex gap-8 items-center" role="menubar" aria-label="Primary">
      {links.map(l => {
        const isActive = active === l.to;
        
        // Use RouterLink for pages, ScrollLink for home page sections
        if (l.route.startsWith('/') && !l.route.includes('#')) {
          return (
            <li key={l.to} role="none">
              <RouterLink
                to={l.route}
                role="menuitem"
                className={`group cursor-pointer relative font-medium text-sm tracking-wide transition-colors ${isActive ? 'text-text-light' : 'text-text-secondary hover:text-text-light'}`}
                onClick={onClick}
              >
                {l.label}
                <span className={`absolute left-0 -bottom-1 h-0.5 bg-accent-gold transition-all ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </RouterLink>
            </li>
          );
        }
        
        // For home page sections, use different behavior based on current page
        if (isHomePage) {
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
                className={`group cursor-pointer relative font-medium text-sm tracking-wide transition-colors ${isActive ? 'text-text-light' : 'text-text-secondary hover:text-text-light'}`}
                onClick={onClick}
              >
                {l.label}
                <span className={`absolute left-0 -bottom-1 h-0.5 bg-accent-gold transition-all ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </ScrollLink>
            </li>
          );
        } else {
          return (
            <li key={l.to} role="none">
              <RouterLink
                to={l.route}
                role="menuitem"
                className={`group cursor-pointer relative font-medium text-sm tracking-wide transition-colors ${isActive ? 'text-text-light' : 'text-text-secondary hover:text-text-light'}`}
                onClick={onClick}
              >
                {l.label}
                <span className={`absolute left-0 -bottom-1 h-0.5 bg-accent-gold transition-all ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </RouterLink>
            </li>
          );
        }
      })}
    </ul>
  );
};
export default Navigation;
