import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiSave, FiX, FiArrowLeft } from 'react-icons/fi';
import {
  getCollection,
  createCollection,
  updateCollection,
  deleteCollection,
  CollectionFormData,
} from '../../lib/collections-database';

const CollectionForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState<CollectionFormData>({
    id: '',
    title: '',
    description: '',
    featured: true,
    sort_order: 1,
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditMode && id) {
      loadCollection(id);
    }
  }, [id, isEditMode]);

  const loadCollection = async (collectionId: string) => {
    try {
      setLoading(true);
      const collection = await getCollection(collectionId);
      if (collection) {
        setFormData({
          id: collection.id,
          title: collection.title,
          description: collection.description,
          featured: collection.featured,
          sort_order: collection.sort_order,
        });
      } else {
        setError('Collection not found');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load collection');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      alert('Please enter a collection title');
      return;
    }

    if (!formData.description.trim()) {
      alert('Please enter a description');
      return;
    }

    if (!isEditMode && !formData.id.trim()) {
      alert('Please enter a collection ID');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      if (isEditMode && id) {
        await updateCollection(id, formData);
        alert('Collection updated successfully!');
      } else {
        await createCollection(formData);
        alert('Collection created successfully!');
      }

      navigate('/admin/collections');
    } catch (err: any) {
      setError(err.message || 'Failed to save collection');
      alert(`Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${formData.title}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setSaving(true);
      await deleteCollection(id);
      alert('Collection deleted successfully!');
      navigate('/admin/collections');
    } catch (err: any) {
      alert(`Failed to delete collection: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const generateId = () => {
    const id = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .trim();
    setFormData({ ...formData, id });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading collection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <button
          onClick={() => navigate('/admin/collections')}
          className="flex items-center gap-2 text-neutral-600 hover:text-ink-900 transition-colors mb-4"
        >
          <FiArrowLeft />
          Back to Collections
        </button>
        <h1 className="text-3xl font-bold text-ink-900">
          {isEditMode ? 'Edit Collection' : 'Create New Collection'}
        </h1>
        <p className="text-neutral-600 mt-1">
          {isEditMode ? 'Update collection details' : 'Add a new collection to your store'}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-neutral-200 p-6 space-y-6">
        {/* Collection ID */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Collection ID <span className="text-red-600">*</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              placeholder="gold-jewelry"
              required
              disabled={isEditMode}
              className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent disabled:bg-neutral-100 disabled:cursor-not-allowed"
            />
            {!isEditMode && (
              <button
                type="button"
                onClick={generateId}
                className="px-4 py-2 bg-neutral-100 text-ink-900 rounded-lg hover:bg-neutral-200 transition-colors text-sm font-medium"
              >
                Generate from Title
              </button>
            )}
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Lowercase, hyphen-separated (e.g., gold-jewelry). Cannot be changed after creation.
          </p>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Collection Title <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Gold Jewelry"
            required
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Description <span className="text-red-600">*</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Timeless elegance in pure gold. From delicate chains to statement necklaces."
            required
            rows={4}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent resize-none"
          />
          <p className="text-xs text-neutral-500 mt-1">
            Brief description shown on collection cards
          </p>
        </div>

        {/* Featured */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="w-5 h-5 text-brand-red border-neutral-300 rounded focus:ring-brand-red"
          />
          <label htmlFor="featured" className="text-sm font-medium text-neutral-700 cursor-pointer">
            Show on homepage (Featured)
          </label>
        </div>

        {/* Sort Order */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Sort Order
          </label>
          <input
            type="number"
            value={formData.sort_order}
            onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
            min="0"
            className="w-32 px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
          />
          <p className="text-xs text-neutral-500 mt-1">
            Lower numbers appear first
          </p>
        </div>

        {/* Note about image */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> To upload a collection thumbnail image, save this collection first, then go to the Collections Manager and hover over the collection card to upload an image.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
          <div>
            {isEditMode && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={saving}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium disabled:opacity-50"
              >
                Delete Collection
              </button>
            )}
          </div>
          
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate('/admin/collections')}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-neutral-100 text-ink-900 rounded-lg hover:bg-neutral-200 transition-colors font-medium disabled:opacity-50"
            >
              <FiX />
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-brand-red text-white rounded-lg hover:bg-brand-red-dark transition-colors font-medium disabled:opacity-50"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <FiSave />
                  {isEditMode ? 'Update Collection' : 'Create Collection'}
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CollectionForm;
