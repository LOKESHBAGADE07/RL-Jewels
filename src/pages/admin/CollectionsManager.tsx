import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiImage, FiPlus, FiStar, FiEyeOff } from 'react-icons/fi';
import { getCollections, uploadCollectionImage, Collection } from '../../lib/collections-database';

const CollectionsManager: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  useEffect(() => {
    loadCollections();
  }, []);

  const loadCollections = async () => {
    try {
      setLoading(true);
      const data = await getCollections();
      setCollections(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to load collections');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (collectionId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    try {
      setUploadingId(collectionId);
      const imageUrl = await uploadCollectionImage(collectionId, file);
      
      // Update local state
      setCollections(collections.map(c => 
        c.id === collectionId ? { ...c, image_url: imageUrl } : c
      ));

      alert('Image uploaded successfully!');
    } catch (err: any) {
      alert(`Failed to upload image: ${err.message}`);
      console.error(err);
    } finally {
      setUploadingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading collections...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-ink-900">Collections Manager</h1>
          <p className="text-neutral-600 mt-1">Manage collection thumbnails and settings</p>
        </div>
        <Link
          to="/admin/collections/new"
          className="flex items-center gap-2 px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-brand-red-dark transition-colors"
        >
          <FiPlus /> Add Collection
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-neutral-700">Preview</th>
                <th className="text-left py-4 px-6 font-semibold text-neutral-700">Collection</th>
                <th className="text-left py-4 px-6 font-semibold text-neutral-700">Description</th>
                <th className="text-center py-4 px-6 font-semibold text-neutral-700">Status</th>
                <th className="text-center py-4 px-6 font-semibold text-neutral-700">Order</th>
                <th className="text-right py-4 px-6 font-semibold text-neutral-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {collections.map((collection) => (
                <tr key={collection.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200">
                        {collection.image_url ? (
                          <img
                            src={collection.image_url}
                            alt={collection.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-neutral-400">
                            <FiImage size={32} />
                          </div>
                        )}
                      </div>
                      
                      {/* Upload button overlay */}
                      <label
                        htmlFor={`upload-${collection.id}`}
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-lg"
                      >
                        {uploadingId === collection.id ? (
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <div className="text-white text-center">
                            <FiImage size={20} className="mx-auto mb-1" />
                            <span className="text-xs">Upload</span>
                          </div>
                        )}
                      </label>
                      <input
                        id={`upload-${collection.id}`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(collection.id, e)}
                        className="hidden"
                        disabled={uploadingId === collection.id}
                      />
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <div>
                      <h3 className="font-semibold text-ink-900">{collection.title}</h3>
                      <p className="text-sm text-neutral-600">ID: {collection.id}</p>
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <p className="text-sm text-neutral-700 line-clamp-2 max-w-md">
                      {collection.description}
                    </p>
                  </td>

                  <td className="py-4 px-6 text-center">
                    {collection.featured ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        <FiStar size={12} />
                        Featured
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs font-semibold">
                        <FiEyeOff size={12} />
                        Hidden
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-neutral-100 text-neutral-700 rounded-full font-semibold text-sm">
                      {collection.sort_order}
                    </span>
                  </td>

                  <td className="py-4 px-6 text-right">
                    <Link
                      to={`/admin/collections/edit/${collection.id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 text-ink-900 rounded-lg hover:bg-neutral-200 transition-colors text-sm font-medium"
                    >
                      <FiEdit2 size={16} />
                      Edit Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {collections.length === 0 && !loading && (
        <div className="text-center py-12">
          <FiImage size={48} className="mx-auto text-neutral-300 mb-4" />
          <p className="text-neutral-600 mb-4">No collections found</p>
          <p className="text-sm text-neutral-500 mb-6">
            Run the COLLECTIONS_DATABASE_SETUP.sql file in Supabase first
          </p>
          <button
            onClick={loadCollections}
            className="px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-brand-red-dark transition-colors"
          >
            Refresh
          </button>
        </div>
      )}

      {/* Tips Section */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
          <FiImage />
          Image Upload Tips
        </h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• <strong>Recommended size:</strong> 800x600 pixels or 4:3 aspect ratio</li>
          <li>• <strong>Maximum file size:</strong> 5MB</li>
          <li>• <strong>Supported formats:</strong> JPG, PNG, WebP</li>
          <li>• <strong>Tip:</strong> Hover over any collection thumbnail and click to upload a new image</li>
          <li>• <strong>Note:</strong> Images are stored in Supabase Storage (public bucket "collections")</li>
        </ul>
      </div>
    </div>
  );
};

export default CollectionsManager;
