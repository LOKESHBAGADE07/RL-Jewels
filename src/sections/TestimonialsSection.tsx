import SectionTitle from '../components/SectionTitle';
import TestimonialCard from '../components/TestimonialCard';

const testimonials = [
  { name: 'Priya', text: 'Amazing collection and trustworthy service!', avatar: 'https://i.pravatar.cc/100?img=12' },
  { name: 'Rahul', text: 'Best jeweler in Jalgaon. Pure and elegant designs.', avatar: 'https://i.pravatar.cc/100?img=15' },
  { name: 'Sneha', text: 'Their savings plan is fantastic, highly recommend.', avatar: 'https://i.pravatar.cc/100?img=32' }
];

export const TestimonialsSection = () => (
  <section id="testimonials" className="section-padding">
    <div className="max-content">
      <SectionTitle subtitle="Voices" title="What Our Customers Say" />
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map(t => <TestimonialCard key={t.name} {...t} />)}
      </div>
    </div>
  </section>
);
export default TestimonialsSection;
