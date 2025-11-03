import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createHeroBanner, updateHeroBanner, getHeroBanner, type HeroBannerFormData } from '../../lib/hero-banners-database';

export default function HeroBannerForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState<HeroBannerFormData>({
    id: '',
    title: '',
    subtitle: '',
    button_text: 'Learn More',
    button_link: '#collections',
    is_active: true,
    display_order: 1,
    duration_seconds: 5,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit && id) {
      loadBanner(id);
    } else {
      // Generate UUID for new banner (let database generate it)
      setFormData(prev => ({ ...prev, id: crypto.randomUUID() }));
    }
  }, [id, isEdit]);

  async function loadBanner(bannerId: string) {
    try {
      const banner = await getHeroBanner(bannerId);
      if (banner) {
        setFormData({
          id: banner.id,
          title: banner.title,
          subtitle: banner.subtitle || '',
          button_text: banner.button_text,
          button_link: banner.button_link || '',
          is_active: banner.is_active,
          display_order: banner.display_order,
          duration_seconds: banner.duration_seconds || 5,
        });
      }
    } catch (err: any) {
      setError('Failed to load banner: ' + err.message);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEdit && id) {
        await updateHeroBanner(id, formData);
      } else {
        await createHeroBanner(formData);
      }
      navigate('/admin/hero-banners');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {isEdit ? 'Edit Banner' : 'Add New Banner'}
        </h1>
        <p className="text-gray-600 mt-1">
          {isEdit ? 'Update banner details' : 'Create a new hero banner for the homepage'}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="e.g., Festive Offer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subtitle
          </label>
          <textarea
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="e.g., Flat 50% off on making charges this season"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Button Text
            </label>
            <input
              type="text"
              value={formData.button_text}
              onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="e.g., Shop Now"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Button Link
            </label>
            <input
              type="text"
              value={formData.button_link}
              onChange={(e) => setFormData({ ...formData, button_link: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="e.g., #collections or /collections"
            />
            <p className="text-xs text-gray-500 mt-1">
              Use #collections for scroll, /collections for page navigation
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Display Order *
            </label>
            <input
              type="number"
              required
              min="1"
              value={formData.display_order}
              onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              Lower number appears first
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration (seconds) *
            </label>
            <input
              type="number"
              required
              min="1"
              max="60"
              value={formData.duration_seconds}
              onChange={(e) => setFormData({ ...formData, duration_seconds: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              Display time (1-60 sec)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className="flex items-center h-[42px]">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="ml-2 text-sm text-gray-700">Active (visible on homepage)</span>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-900 mb-2">📝 Note:</h4>
          <p className="text-sm text-yellow-800">
            After creating the banner, you can upload an image from the Hero Banners Manager
            by hovering over the preview thumbnail and clicking "Upload".
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : isEdit ? 'Update Banner' : 'Create Banner'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/hero-banners')}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
