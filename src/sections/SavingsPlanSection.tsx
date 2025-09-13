import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { FaCheck } from 'react-icons/fa';
import placeholder from '../lib/placeholderImage';

export const SavingsPlanSection = () => (
  <section id="savings" className="section-padding">
    <div className="max-content grid md:grid-cols-2 gap-12 items-center">
      <div>
        <img src={placeholder('Gold Flexi Savings Plan', 'savings', 1200, 800)} alt="Savings Plan" className="rounded-lg shadow-glow object-cover w-full h-80" />
      </div>
      <div>
        <SectionTitle subtitle="Plan" title="Save Now, Shine Forever!" align="left" />
        <p className="text-text-secondary mb-6">Join our Gold Flexi Savings Plan and enjoy exclusive benefits.</p>
        <ul className="space-y-3 mb-8">
          {[
            'Deposit monthly & get 50% off making charges in 12th month (max 9%)',
            'Secure BIS-hallmarked gold savings',
            'Easy payment via UPI, cards, NEFT, cash'
          ].map(t => (
            <li key={t} className="flex gap-3">
              <FaCheck className="text-brand-red mt-1" /><span className="text-sm">{t}</span>
            </li>
          ))}
        </ul>
        <Button>Start Your Plan Today</Button>
      </div>
    </div>
  </section>
);
export default SavingsPlanSection;
