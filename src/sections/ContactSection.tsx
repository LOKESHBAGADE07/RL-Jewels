import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { FaPhone, FaWhatsapp, FaEnvelope, FaLocationArrow, FaClock } from 'react-icons/fa';
import { useState } from 'react';

export const ContactSection = () => {
  const [form, setForm] = useState({ name:'', phone:'', message:'' });
  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data', form);
  };
  return (
    <section id="contact" className="py-12 md:py-20 px-4 md:px-10 lg:px-20">
      <div className="max-content">
        <SectionTitle subtitle="Reach Us" title="Contact Us" />
        <div className="grid md:grid-cols-2 gap-6 md:gap-12">
          <div className="space-y-4 md:space-y-6">
            <div className="aspect-video w-full rounded-lg overflow-hidden h-48 md:h-auto">
              <iframe
                title="Map"
                className="w-full h-full"
                src="https://www.google.com/maps?q=RL+Jewels+Jalgaon&output=embed"
                loading="lazy"
              />
            </div>
            <ul className="space-y-2 md:space-y-3 text-xs md:text-sm">
              <li className="flex gap-2 md:gap-3 items-start">
                <FaLocationArrow className="text-brand-red mt-0.5 flex-shrink-0 text-xs md:text-sm" />
                <span className="leading-tight">RL Jewels, Rajnimal Lakhichand Manish Jain Group<br />Gandhi Chowk, Jalgaon - The Gold City<br />Maharashtra, India</span>
              </li>
              <li className="flex gap-2 md:gap-3 items-start">
                <FaPhone className="text-brand-red mt-0.5 flex-shrink-0 text-xs md:text-sm" />
                <a href="tel:+919403891854" className="hover:text-brand-red transition">+91 87672 04972</a>
              </li>
              <li className="flex gap-2 md:gap-3 items-start">
                <FaWhatsapp className="text-brand-red mt-0.5 flex-shrink-0 text-xs md:text-sm" />
                <a href="https://wa.me/919403891854?text=Hi, I want to know more about RL Jewels" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition">Chat on WhatsApp</a>
              </li>
              <li className="flex gap-2 md:gap-3 items-start">
                <FaEnvelope className="text-brand-red mt-0.5 flex-shrink-0 text-xs md:text-sm" />
                <a href="mailto:info@rljewels.com" className="hover:text-brand-red transition">info@rljewels.com</a>
              </li>
              <li className="flex gap-2 md:gap-3 items-start">
                <FaClock className="text-brand-red mt-0.5 flex-shrink-0 text-xs md:text-sm" />
                <span className="leading-tight">Mon – Sat: 10 AM – 8 PM<br />Sunday: Closed</span>
              </li>
            </ul>
            
            <div className="mt-4 md:mt-6 p-3 md:p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs md:text-sm text-amber-900 font-semibold mb-1 md:mb-2">Note: We Don't Sell Online</p>
              <p className="text-[10px] md:text-xs text-amber-800 leading-tight">
                This website is for showcasing our collection only. To purchase, please visit our showroom in Jalgaon or contact us via phone/WhatsApp.
              </p>
            </div>
          </div>
          <form onSubmit={submit} className="space-y-3 md:space-y-5">
            <input
              required
              placeholder="Name"
              value={form.name}
              onChange={e=>update('name', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-md px-3 md:px-4 py-2 md:py-3 text-sm md:text-base focus:outline-none focus:border-primary-gold"
            />
            <input
              required
              placeholder="Phone"
              value={form.phone}
              onChange={e=>update('phone', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-md px-3 md:px-4 py-2 md:py-3 text-sm md:text-base focus:outline-none focus:border-primary-gold"
            />
            <textarea
              rows={4}
              placeholder="Message"
              value={form.message}
              onChange={e=>update('message', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-md px-3 md:px-4 py-2 md:py-3 text-sm md:text-base focus:outline-none focus:border-primary-gold resize-none"
            />
            <Button type="submit">Send Inquiry</Button>
          </form>
        </div>
      </div>
    </section>
  );
};
export default ContactSection;
