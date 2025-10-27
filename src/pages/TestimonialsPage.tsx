import React, { useState, useEffect } from 'react';
import { getApprovedTestimonials } from '../lib/testimonials-database';
import { Testimonial } from '../types/testimonial';
import SectionTitle from '../components/SectionTitle';

const TestimonialsPage: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const data = await getApprovedTestimonials();
      setTestimonials(data);
    } catch (err) {
      console.error('Failed to load testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-gradient-to-br from-brand-red to-brand-red/80 text-white py-16">
        <div className="max-content">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Customer Reviews</h1>
          <p className="text-xl opacity-90">
            Hear what our valued customers say about their experience with RL Jewels
          </p>
        </div>
      </div>

      <div className="section-padding max-content">
        {testimonials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-600 text-lg">No testimonials available at the moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
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
                        className={`text-xl ${i < testimonial.rating ? 'text-accent-gold' : 'text-neutral-300'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-neutral-700 mb-4 leading-relaxed">{testimonial.testimonial_text}</p>
                  <div className="border-t border-neutral-200 pt-4">
                    <p className="font-semibold text-ink-900">{testimonial.customer_name}</p>
                    {testimonial.customer_location && (
                      <p className="text-sm text-neutral-600">{testimonial.customer_location}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialsPage;
