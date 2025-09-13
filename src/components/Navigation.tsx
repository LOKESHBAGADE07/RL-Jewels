import { Link } from 'react-scroll';
import { useMemo } from 'react';
import useActiveSection from '../hooks/useActiveSection';

const links = [
  { to: 'home', label: 'Home' },
  { to: 'collections', label: 'Collections' },
  { to: 'occasions', label: 'Occasions' },
  { to: 'savings', label: 'Savings Plan' },
  { to: 'heritage', label: 'Heritage' },
  { to: 'testimonials', label: 'Reviews' },
  { to: 'faq', label: 'FAQ' },
  { to: 'blog', label: 'Blog' },
  { to: 'contact', label: 'Contact' }
];

export const Navigation = ({ onClick }: { onClick?: () => void }) => {
  const ids = useMemo(() => links.map(l => l.to), []);
  const active = useActiveSection(ids);
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
