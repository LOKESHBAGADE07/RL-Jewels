import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

export const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Placeholder for integration with an email service
    console.log('Newsletter signup:', email);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setEmail('');
  };
  return (
    <motion.section
      id="newsletter"
      initial={{ opacity:0, y:30 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }}
      className="section-padding"
    >
      <div className="max-content text-center max-w-2xl">
        <h2 className="font-serif text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="text-text-secondary mb-6 text-sm">Be the first to know about new collections, savings plans & exclusive offers.</p>
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="email"
            required
            aria-label="Email address"
            placeholder="Enter your email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            className="flex-1 min-w-[220px] bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20"
          />
          <button 
            type="submit"
            className="px-8 py-3 bg-brand-red text-white rounded-lg hover:bg-brand-red/90 transition-colors font-semibold shadow-md hover:shadow-lg whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
        {submitted && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800 font-semibold">✓ Thank you! You are now subscribed to our newsletter.</p>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default NewsletterSignup;