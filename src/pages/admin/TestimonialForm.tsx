import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createTestimonial, updateTestimonial, getTestimonialById } from '../../lib/testimonials-database';
import { Testimonial } from '../../types/testimonial';

const TestimonialForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_location: '',
    video_url: '',
    thumbnail_url: '',
    testimonial_text: '',
    rating: 5,
    is_approved: false,
    display_order: 0,
  });

  useEffect(() => {
    if (isEditing && id) {
      loadTestimonial(id);
    }
  }, [id, isEditing]);

  const loadTestimonial = async (testimonialId: string) => {
    try {
      const testimonial = await getTestimonialById(testimonialId);
      if (testimonial) {
        setFormData({
          customer_name: testimonial.customer_name,
          customer_location: testimonial.customer_location || '',
          video_url: testimonial.video_url,
          thumbnail_url: testimonial.thumbnail_url || '',
          testimonial_text: testimonial.testimonial_text,
          rating: testimonial.rating,
          is_approved: testimonial.is_approved,
          display_order: testimonial.display_order,
        });
      }
    } catch (err) {
      alert('Failed to load testimonial');
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing && id) {
        await updateTestimonial(id, formData);
        alert('Testimonial updated successfully!');
      } else {
        await createTestimonial(formData);
        alert('Testimonial added successfully!');
      }
      navigate('/admin/testimonials');
    } catch (err) {
      alert(`Failed to ${isEditing ? 'update' : 'add'} testimonial`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-ink-900 mb-6">
        {isEditing ? 'Edit Testimonial' : 'Add New Testimonial'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-ink-900 mb-2">
              Customer Name *
            </label>
            <input
              type="text"
              required
              value={formData.customer_name}
              onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
              placeholder="e.g., Priya Sharma"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-900 mb-2">
              Customer Location
            </label>
            <input
              type="text"
              value={formData.customer_location}
              onChange={(e) => setFormData({ ...formData, customer_location: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
              placeholder="e.g., Mumbai, Maharashtra"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-900 mb-2">
              Video URL * (YouTube/Vimeo embed link)
            </label>
            <input
              type="url"
              required
              value={formData.video_url}
              onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
              placeholder="https://www.youtube.com/embed/..."
            />
            <p className="text-xs text-neutral-600 mt-1">
              Use YouTube embed URL format: https://www.youtube.com/embed/VIDEO_ID
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-900 mb-2">
              Thumbnail URL (optional)
            </label>
            <input
              type="url"
              value={formData.thumbnail_url}
              onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-900 mb-2">
              Testimonial Text *
            </label>
            <textarea
              required
              rows={4}
              value={formData.testimonial_text}
              onChange={(e) => setFormData({ ...formData, testimonial_text: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
              placeholder="What did the customer say about your jewelry and service?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-900 mb-2">
              Rating *
            </label>
            <select
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
            >
              <option value={5}>5 Stars - Excellent</option>
              <option value={4}>4 Stars - Very Good</option>
              <option value={3}>3 Stars - Good</option>
              <option value={2}>2 Stars - Fair</option>
              <option value={1}>1 Star - Poor</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-900 mb-2">
              Display Order
            </label>
            <input
              type="number"
              min="0"
              value={formData.display_order}
              onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
              placeholder="0"
            />
            <p className="text-xs text-neutral-600 mt-1">
              Lower numbers appear first (0, 1, 2...)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="is_approved"
              checked={formData.is_approved}
              onChange={(e) => setFormData({ ...formData, is_approved: e.target.checked })}
              className="w-4 h-4 text-brand-red border-neutral-300 rounded focus:ring-brand-red"
            />
            <label htmlFor="is_approved" className="text-sm font-medium text-ink-900">
              Approve and show on website immediately
            </label>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-3 bg-brand-red text-white rounded-lg hover:bg-brand-red/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {loading ? 'Saving...' : isEditing ? 'Update Testimonial' : 'Add Testimonial'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/testimonials')}
            className="px-6 py-3 bg-neutral-200 text-ink-900 rounded-lg hover:bg-neutral-300 transition-colors font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TestimonialForm;
