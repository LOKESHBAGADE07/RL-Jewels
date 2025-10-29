import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getApprovedTestimonials } from '../lib/testimonials-database';
import { Testimonial } from '../types/testimonial';
import SectionTitle from '../components/SectionTitle';
import { useLanguageStore } from '../stores/languageStore';

export const TestimonialsSection: React.FC = () => {
  const { t } = useLanguageStore();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const data = await getApprovedTestimonials();
      setTestimonials(data.slice(0, 3));
    } catch (err) {
      console.error('Failed to load testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-neutral-50">
      <div className="max-content">
        <SectionTitle 
          title={t.testimonials_title} 
          subtitle={t.testimonials_subtitle} 
        />
        
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="aspect-video w-full bg-neutral-100">
                <iframe
                  src={testimonial.video_url}
                  title={`Testimonial by ${testimonial.customer_name}`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${i < testimonial.rating ? 'text-accent-gold' : 'text-neutral-300'}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-neutral-700 mb-4 line-clamp-3 text-sm">{testimonial.testimonial_text}</p>
                <div>
                  <p className="font-semibold text-ink-900">{testimonial.customer_name}</p>
                  {testimonial.customer_location && (
                    <p className="text-xs text-neutral-600">{testimonial.customer_location}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/testimonials"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red text-white rounded-lg hover:bg-brand-red/90 transition-colors font-semibold"
          >
            {t.view_all_reviews}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
