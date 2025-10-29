import { Link } from 'react-scroll';
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
  const ids = useMemo(() => linkIds, []);
  const active = useActiveSection(ids);
  
  const links = [
    { to: 'home', label: t.nav_home },
    { to: 'collections', label: t.nav_collections },
    { to: 'occasions', label: t.nav_occasions },
    { to: 'savings', label: t.nav_savings },
    { to: 'heritage', label: t.nav_heritage },
    { to: 'testimonials', label: t.nav_reviews },
    { to: 'faq', label: t.nav_faq },
    { to: 'blog', label: t.nav_blog },
    { to: 'contact', label: t.nav_contact }
  ];
  
  return (
    <ul className="hidden lg:flex gap-8 items-center" role="menubar" aria-label="Primary">
      {links.map(l => {
        const isActive = active === l.to;
        return (
          <li key={l.to} role="none">
            <Link
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
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default Navigation;
