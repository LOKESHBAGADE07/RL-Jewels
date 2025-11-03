import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit, FiTrash2, FiPlus, FiImage, FiEye, FiEyeOff, FiVideo } from 'react-icons/fi';
import { getAllHeroBanners, deleteHeroBanner, uploadHeroBannerMedia, updateHeroBanner, type HeroBanner } from '../../lib/hero-banners-database';

export default function HeroBannersManager() {
  const navigate = useNavigate();
  const [banners, setBanners] = useState<HeroBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  useEffect(() => {
    loadBanners();
  }, []);

  async function loadBanners() {
    try {
      setLoading(true);
      const data = await getAllHeroBanners();
      setBanners(data);
      setError('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this banner?')) return;
    try {
      await deleteHeroBanner(id);
      setBanners(prev => prev.filter(b => b.id !== id));
    } catch (err: any) {
      alert('Error deleting banner: ' + err.message);
    }
  }

  async function handleMediaUpload(bannerId: string, file: File) {
    // Validate file type
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (!isImage && !isVideo) {
      alert('Please select an image or video file');
      return;
    }

    // Validate file size
    const maxSize = isVideo ? 50 * 1024 * 1024 : 5 * 1024 * 1024; // 50MB for video, 5MB for image
    if (file.size > maxSize) {
      alert(`${isVideo ? 'Video' : 'Image'} size should be less than ${isVideo ? '50MB' : '5MB'}`);
      return;
    }

    try {
      setUploadingId(bannerId);
      const result = await uploadHeroBannerMedia(bannerId, file);
      
      // Update local state
      setBanners(prev =>
        prev.map(b => {
          if (b.id === bannerId) {
            return {
              ...b,
              image_url: result.type === 'image' ? result.url : null,
              video_url: result.type === 'video' ? result.url : null,
              media_type: result.type
            };
          }
          return b;
        })
      );
    } catch (err: any) {
      alert('Error uploading media: ' + err.message);
    } finally {
      setUploadingId(null);
    }
  }

  async function toggleActive(banner: HeroBanner) {
    try {
      await updateHeroBanner(banner.id, { is_active: !banner.is_active });
      setBanners(prev =>
        prev.map(b => (b.id === banner.id ? { ...b, is_active: !banner.is_active } : b))
      );
    } catch (err: any) {
      alert('Error updating banner: ' + err.message);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hero Banners</h1>
          <p className="text-gray-600 mt-1">Manage sliding banners on homepage</p>
        </div>
        <button
          onClick={() => navigate('/admin/hero-banners/new')}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          <FiPlus /> Add Banner
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Preview
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Banner Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {banners.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  No banners found. Click "Add Banner" to create one.
                </td>
              </tr>
            ) : (
              banners.map((banner) => (
                <tr key={banner.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="relative w-32 h-20 bg-gray-100 rounded overflow-hidden group">
                      {/* Display current media */}
                      {banner.video_url ? (
                        <div className="relative w-full h-full">
                          <video
                            src={banner.video_url}
                            className="w-full h-full object-cover"
                            muted
                          />
                          <div className="absolute top-1 right-1 bg-red-600 text-white px-1.5 py-0.5 rounded text-xs flex items-center gap-1">
                            <FiVideo size={10} />
                            <span>Video</span>
                          </div>
                        </div>
                      ) : banner.image_url ? (
                        <div className="relative w-full h-full">
                          <img
                            src={banner.image_url}
                            alt={banner.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-1 right-1 bg-blue-600 text-white px-1.5 py-0.5 rounded text-xs flex items-center gap-1">
                            <FiImage size={10} />
                            <span>Image</span>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                          <FiImage size={24} />
                          <span className="text-xs mt-1">No Media</span>
                        </div>
                      )}
                      
                      {/* Hover overlay for upload */}
                      <label className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <input
                          type="file"
                          accept="image/*,video/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleMediaUpload(banner.id, file);
                          }}
                          disabled={uploadingId === banner.id}
                        />
                        {uploadingId === banner.id ? (
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        ) : (
                          <>
                            <span className="text-white text-sm font-medium">Upload</span>
                            <span className="text-white text-xs mt-1">Image or Video</span>
                          </>
                        )}
                      </label>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{banner.title}</div>
                    {banner.subtitle && (
                      <div className="text-sm text-gray-500 line-clamp-2">{banner.subtitle}</div>
                    )}
                    {banner.button_text && (
                      <div className="text-xs text-red-600 mt-1">Button: {banner.button_text}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      #{banner.display_order}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {banner.duration_seconds || 5}s
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleActive(banner)}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition ${
                        banner.is_active
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {banner.is_active ? <FiEye size={12} /> : <FiEyeOff size={12} />}
                      {banner.is_active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button
                      onClick={() => navigate(`/admin/hero-banners/edit/${banner.id}`)}
                      className="text-red-600 hover:text-red-900 mr-4"
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(banner.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">💡 Tips:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Banners will auto-slide on the homepage hero section</li>
          <li>• Use "Sort Order" to control the sequence (lower number = first)</li>
          <li>• Toggle "Active/Inactive" to show/hide banners without deleting</li>
          <li>• <strong>Upload images OR videos</strong> - Hover over preview and select file</li>
          <li>• <strong>Image:</strong> Max 5MB, recommended 1920x1080px (16:9 ratio)</li>
          <li>• <strong>Video:</strong> Max 50MB, MP4 format recommended, keep under 30 seconds</li>
          <li>• Videos will auto-play on loop without sound on the homepage</li>
        </ul>
      </div>
    </div>
  );
}
