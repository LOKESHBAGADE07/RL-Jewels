import React, { useState, useEffect } from 'react';
import { FiPlay, FiCheck, FiX, FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { getAllTestimonials, deleteTestimonial, approveTestimonial, unapproveTestimonial } from '../../lib/testimonials-database';
import { Testimonial } from '../../types/testimonial';

const TestimonialsManager: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const data = await getAllTestimonials();
      setTestimonials(data);
      setError(null);
    } catch (err) {
      setError('Failed to load testimonials');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await approveTestimonial(id);
      await loadTestimonials();
    } catch (err) {
      alert('Failed to approve testimonial');
      console.error(err);
    }
  };

  const handleUnapprove = async (id: string) => {
    try {
      await unapproveTestimonial(id);
      await loadTestimonials();
    } catch (err) {
      alert('Failed to unapprove testimonial');
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    
    try {
      await deleteTestimonial(id);
      await loadTestimonials();
    } catch (err) {
      alert('Failed to delete testimonial');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-ink-900">Testimonials Manager</h1>
        <a
          href="/admin/testimonials/new"
          className="flex items-center gap-2 px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-brand-red/90 transition-colors"
        >
          <FiPlus /> Add Testimonial
        </a>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {testimonials.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-neutral-200">
          <p className="text-neutral-600 mb-4">No testimonials yet</p>
          <a
            href="/admin/testimonials/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-brand-red/90 transition-colors"
          >
            <FiPlus /> Add First Testimonial
          </a>
        </div>
      ) : (
        <div className="grid gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-lg border border-neutral-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-48 h-32 bg-neutral-100 rounded-lg overflow-hidden relative group">
                    {testimonial.thumbnail_url ? (
                      <img
                        src={testimonial.thumbnail_url}
                        alt={testimonial.customer_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-red/20 to-brand-red/10">
                        <FiPlay className="text-4xl text-brand-red" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <FiPlay className="text-4xl text-white" />
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-ink-900">{testimonial.customer_name}</h3>
                      {testimonial.customer_location && (
                        <p className="text-sm text-neutral-600">{testimonial.customer_location}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {testimonial.is_approved ? (
                        <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                          <FiCheck /> Approved
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                          <FiX /> Pending
                        </span>
                      )}
                    </div>
                  </div>

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

                  <p className="text-neutral-700 mb-4 line-clamp-2">{testimonial.testimonial_text}</p>

                  <div className="flex items-center gap-3">
                    {testimonial.is_approved ? (
                      <button
                        onClick={() => handleUnapprove(testimonial.id)}
                        className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors text-sm"
                      >
                        Unapprove
                      </button>
                    ) : (
                      <button
                        onClick={() => handleApprove(testimonial.id)}
                        className="px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors text-sm"
                      >
                        Approve
                      </button>
                    )}
                    <a
                      href={`/admin/testimonials/edit/${testimonial.id}`}
                      className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors text-sm flex items-center gap-2"
                    >
                      <FiEdit2 /> Edit
                    </a>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      className="px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors text-sm flex items-center gap-2"
                    >
                      <FiTrash2 /> Delete
                    </button>
                    <a
                      href={testimonial.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-brand-red/90 transition-colors text-sm flex items-center gap-2"
                    >
                      <FiPlay /> Watch Video
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialsManager;
