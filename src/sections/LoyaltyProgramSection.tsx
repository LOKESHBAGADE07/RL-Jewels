import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { FaCheck } from 'react-icons/fa';

export const LoyaltyProgramSection = () => (
  <section id="loyalty" className="section-padding bg-white/5">
    <div className="max-content grid md:grid-cols-2 gap-12 items-center">
      <div className="order-2 md:order-1">
        <SectionTitle subtitle="Rewards" title="Earn Rewards Every Time You Shop" align="left" />
        <ul className="space-y-3 mb-8">
          {[
            'Earn up to 10% reward points on purchases',
            'Redeem points for discounts (2 points = ₹1)',
            'Use points across gold, silver, diamonds & more'
          ].map(t => (
            <li key={t} className="flex gap-3">
              <FaCheck className="text-brand-red mt-1" /><span className="text-sm">{t}</span>
            </li>
          ))}
        </ul>
        <Button variant="secondary">Check Your Points</Button>
      </div>
      <div className="order-1 md:order-2">
        <img src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1200&h=800&fit=crop&q=85" alt="Loyalty" className="rounded-lg shadow-glow object-cover w-full h-80" />
      </div>
    </div>
  </section>
);
export default LoyaltyProgramSection;
