import { Link } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';

const nav = ['home','collections','savings','loyalty','about','contact'];

export const Footer = () => (
  <footer className="bg-background-dark border-t border-white/10 pt-16" role="contentinfo">
    <div className="max-content grid md:grid-cols-4 gap-x-10 gap-y-12 px-4 pb-10 items-start">
      <div>
        <h4 className="font-serif text-xl leading-tight mb-5 tracking-wide">Quick Links</h4>
        <ul className="space-y-2 text-sm">
          {nav.map(n => (
            <li key={n}>
              <Link to={n} smooth offset={-80} className="cursor-pointer hover:text-brand-red transition">
                {n.replace(/\w/, c=>c.toUpperCase())}
              </Link>
            </li>
          ))}
        </ul>
        <h4 className="font-serif text-xl leading-tight mb-5 mt-8 tracking-wide">Policies</h4>
        <ul className="space-y-2 text-sm">
          <li><RouterLink to="/terms" className="hover:text-brand-red transition">Terms & Conditions</RouterLink></li>
          <li><RouterLink to="/privacy" className="hover:text-brand-red transition">Privacy Policy</RouterLink></li>
          <li><RouterLink to="/shipping-policy" className="hover:text-brand-red transition">Shipping Policy</RouterLink></li>
          <li><RouterLink to="/returns-policy" className="hover:text-brand-red transition">Return, Refund & Buy-Back</RouterLink></li>
          <li><RouterLink to="/faq" className="hover:text-brand-red transition">FAQs</RouterLink></li>
        </ul>
      </div>
      <div>
        <h4 className="font-serif text-xl leading-tight mb-5 tracking-wide">Trusted Partners</h4>
        <div className="grid grid-cols-3 gap-3 text-center text-xs text-text-secondary">
          <div className="rounded border border-white/10 p-2">Razorpay</div>
          <div className="rounded border border-white/10 p-2">Shiprocket</div>
          <div className="rounded border border-white/10 p-2">BIS</div>
        </div>
        <div className="flex gap-5 text-2xl" aria-label="Social Media Links">
          <a href="#" aria-label="Instagram" className="hover:text-brand-red" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="#" aria-label="Facebook" className="hover:text-brand-red" rel="noopener noreferrer"><FaFacebook /></a>
          <a href="https://wa.me/919999999999" aria-label="WhatsApp" className="hover:text-brand-red" rel="noopener noreferrer"><FaWhatsapp /></a>
        </div>
      </div>
      <div>
        <h4 className="font-serif text-xl leading-tight mb-5 tracking-wide">Stay Updated</h4>
        <p className="text-xs text-text-secondary mb-3">Get updates on new collections and offers.</p>
        <form onSubmit={(e)=>{ e.preventDefault(); }} aria-label="Newsletter subscription" className="space-y-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              placeholder="Enter your email"
              aria-label="Email address"
              className="flex-1 rounded-lg bg-ink-800/70 border border-ink-600 px-3 py-2.5 text-sm text-text-light placeholder-ink-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-gold/70 focus:border-accent-gold/60 transition"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-brand-red hover:bg-brand-red-dark text-white text-sm font-semibold px-5 py-2.5 w-full sm:w-auto shadow-sm border border-brand-red/40 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-brand-red/60 transition"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
      <div className="pt-6 mt-2 border-t border-white/10 md:border-t-0 md:pt-0 md:mt-0 md:border-l md:border-white/10 md:pl-8">
        <h4 className="font-serif text-xl leading-tight mb-5 tracking-wide">Disclaimer</h4>
        <p className="text-xs text-text-secondary leading-relaxed">
          Prices vary with daily gold rate. T&C apply. Jalgaon jurisdiction only.
        </p>
      </div>
    </div>
    <div className="mt-4 md:mt-8 border-t border-white/10 text-center text-xs py-6 text-text-secondary">
      © {new Date().getFullYear()} RL Jewels. All rights reserved.
    </div>
  </footer>
);
export default Footer;
