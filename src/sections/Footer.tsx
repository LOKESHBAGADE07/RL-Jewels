import { Link } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { useLanguageStore } from '../stores/languageStore';

const nav = ['home','collections','savings','loyalty','about','contact'];

export const Footer = () => {
  const { t } = useLanguageStore();
  return (
  <footer className="bg-background-dark border-t border-white/10 pt-8 md:pt-16" role="contentinfo">
    <div className="max-content px-4 pb-6 md:pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
        {/* Quick Links & Information - Compact on Mobile */}
        <div>
          <h4 className="font-serif text-lg md:text-xl leading-tight mb-3 md:mb-5 tracking-wide">{t.footer_quick_links}</h4>
          {/* Mobile: Horizontal scrollable list */}
          <div className="md:hidden flex gap-3 overflow-x-auto pb-2 scrollbar-hide mb-4">
            {nav.map(n => (
              <Link key={n} to={n} smooth offset={-80} className="cursor-pointer hover:text-brand-red transition whitespace-nowrap px-3 py-1.5 bg-ink-800/50 rounded-full text-xs">
                {n.replace(/\w/, c=>c.toUpperCase())}
              </Link>
            ))}
          </div>
          {/* Desktop: Vertical list */}
          <ul className="hidden md:block space-y-2 text-sm">
            {nav.map(n => (
              <li key={n}>
                <Link to={n} smooth offset={-80} className="cursor-pointer hover:text-brand-red transition">
                  {n.replace(/\w/, c=>c.toUpperCase())}
                </Link>
              </li>
            ))}
          </ul>
          <h4 className="font-serif text-lg md:text-xl leading-tight mb-3 md:mb-5 mt-4 md:mt-8 tracking-wide">{t.footer_information}</h4>
          {/* Mobile: Grid 2 columns */}
          <ul className="grid grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-1.5 md:space-y-2 text-xs md:text-sm">
            <li><RouterLink to="/about" className="hover:text-brand-red transition">{t.about_us}</RouterLink></li>
            <li><RouterLink to="/terms" className="hover:text-brand-red transition">{t.terms_conditions}</RouterLink></li>
            <li><RouterLink to="/privacy" className="hover:text-brand-red transition">{t.privacy_policy}</RouterLink></li>
            <li><RouterLink to="/faq" className="hover:text-brand-red transition">{t.faqs}</RouterLink></li>
            <li className="col-span-2 md:col-span-1"><a href="tel:+919403891854" className="hover:text-brand-red transition">Contact: +91 94038 91854</a></li>
          </ul>
        </div>

        {/* Certifications & Social - Compact on Mobile */}
        <div>
          <h4 className="font-serif text-lg md:text-xl leading-tight mb-3 md:mb-5 tracking-wide">{t.footer_certifications}</h4>
          <div className="grid grid-cols-2 gap-2 md:gap-3 text-center text-[10px] md:text-xs text-text-secondary mb-4 md:mb-8">
            <div className="rounded border border-white/10 p-2 md:p-3 font-semibold">{t.badge_bis_hallmark}</div>
            <div className="rounded border border-white/10 p-2 md:p-3 font-semibold">{t.badge_certified}</div>
          </div>
          <h4 className="font-serif text-lg md:text-xl leading-tight mb-2 md:mb-3 tracking-wide">{t.footer_connect}</h4>
          <div className="flex gap-4 md:gap-5 text-xl md:text-2xl" aria-label="Social Media Links">
            <a href="https://www.instagram.com/rljewels_official/?hl=en" target="_blank" aria-label="Instagram" className="hover:text-brand-red transition" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://facebook.com/rljewels" target="_blank" aria-label="Facebook" className="hover:text-brand-red transition" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://wa.me/919403891854?text=Hi, I'm interested in RL Jewels" target="_blank" aria-label="WhatsApp" className="hover:text-brand-red transition" rel="noopener noreferrer"><FaWhatsapp /></a>
          </div>
        </div>

        {/* Newsletter Subscription - Compact on Mobile */}
        <div>
          <h4 className="font-serif text-lg md:text-xl leading-tight mb-3 md:mb-5 tracking-wide">{t.footer_stay_updated}</h4>
          <p className="text-xs md:text-sm text-text-secondary mb-3 md:mb-4 leading-relaxed">{t.footer_newsletter_desc}</p>
          <form onSubmit={(e)=>{ e.preventDefault(); }} aria-label="Newsletter subscription">
            <div className="flex flex-col gap-2">
              <input
                type="email"
                required
                placeholder={t.enter_email}
                aria-label="Email address"
                className="w-full rounded-lg bg-ink-800/70 border border-ink-600 px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm text-text-light placeholder-ink-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-gold/70 focus:border-accent-gold/60 transition"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-brand-red hover:bg-brand-red-dark text-white text-xs md:text-sm font-semibold px-4 md:px-5 py-2 md:py-2.5 shadow-sm border border-brand-red/40 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-brand-red/60 transition"
              >
                {t.subscribe}
              </button>
            </div>
          </form>
        </div>

        {/* Visit Our Store - Compact on Mobile */}
        <div>
          <h4 className="font-serif text-lg md:text-xl leading-tight mb-3 md:mb-5 tracking-wide">{t.footer_visit_store}</h4>
          <p className="text-xs md:text-sm text-text-secondary leading-relaxed mb-3 md:mb-4">
            {t.footer_visit_store_desc}
          </p>
          <div className="space-y-1 md:space-y-2 text-xs md:text-sm">
            <p className="font-semibold text-text-light">{t.footer_store_name}</p>
            <p className="text-text-secondary">{t.footer_store_location}</p>
            <p className="text-text-secondary">{t.footer_store_since}</p>
          </div>
        </div>
      </div>
    </div>

    {/* Copyright - Compact on Mobile */}
    <div className="border-t border-white/10 text-center text-[10px] md:text-xs py-4 md:py-6 text-text-secondary">
      © {new Date().getFullYear()} RL Jewels. All rights reserved.
    </div>
  </footer>
  );
};
export default Footer;
