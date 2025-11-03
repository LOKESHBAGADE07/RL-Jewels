import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, updateProduct, getProductById, uploadProductImage } from '../../lib/database';
import { Product } from '../../lib/supabase';
import { FiUpload, FiX, FiSave, FiArrowLeft } from 'react-icons/fi';

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    purity: '22K',
    in_stock: true,
    badge: '',
    tags: '',
  });
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState('');
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  useEffect(() => {
    if (isEdit && id) {
      loadProduct(id);
    }
  }, [id, isEdit]);

  async function loadProduct(productId: string) {
    setLoading(true);
    const product = await getProductById(productId);
    if (product) {
      setFormData({
        title: product.title,
        purity: product.purity || '22K',
        in_stock: product.inStock ?? true,
        badge: product.badge || '',
        tags: (product.tags || []).join(', '),
      });
      setMainImagePreview(product.image);
      setExistingImages(product.images || []);
    }
    setLoading(false);
  }

  function handleMainImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setMainImage(file);
      setMainImagePreview(URL.createObjectURL(file));
    }
  }

  function handleAdditionalImagesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    setAdditionalImages([...additionalImages, ...files]);
  }

  function removeAdditionalImage(index: number) {
    setAdditionalImages(additionalImages.filter((_, i) => i !== index));
  }

  function removeExistingImage(index: number) {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setUploading(true);

    try {
      let imageUrl = mainImagePreview;

      if (mainImage) {
        const timestamp = Date.now();
        const fileName = `${timestamp}-${mainImage.name}`;
        const uploadedUrl = await uploadProductImage(mainImage, fileName);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      const uploadedAdditionalImages = await Promise.all(
        additionalImages.map(async (file) => {
          const timestamp = Date.now();
          const fileName = `${timestamp}-${file.name}`;
          return await uploadProductImage(file, fileName);
        })
      );

      const allImages = [
        ...existingImages,
        ...uploadedAdditionalImages.filter((url): url is string => url !== null),
      ];

      const productData = {
        title: formData.title,
        image: imageUrl,
        images: allImages,
        purity: formData.purity,
        in_stock: formData.in_stock,
        badge: formData.badge || undefined,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      };

      if (isEdit && id) {
        await updateProduct(id, productData);
      } else {
        await createProduct(productData);
      }

      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product');
    } finally {
      setLoading(false);
      setUploading(false);
    }
  }

  if (loading && isEdit) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading product...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <FiArrowLeft />
          <span>Back to Products</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {isEdit ? 'Edit Product' : 'Add New Product'}
        </h1>
        <p className="text-gray-600">
          {isEdit ? 'Update product details and images' : 'Fill in the product details below'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="e.g., Heritage Thushi Necklace"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Purity
              </label>
              <select
                value={formData.purity}
                onChange={(e) => setFormData({ ...formData, purity: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="22K">22K</option>
                <option value="24K">24K</option>
                <option value="18K">18K</option>
                <option value="Silver">Silver</option>
                <option value="Platinum">Platinum</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="necklace, gold, bridal"
              />
              <p className="mt-1 text-sm text-gray-500">Separate tags with commas</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Badge (optional)
              </label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="New, Sale, Limited"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="in_stock"
                checked={formData.in_stock}
                onChange={(e) => setFormData({ ...formData, in_stock: e.target.checked })}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label htmlFor="in_stock" className="ml-2 block text-sm text-gray-700">
                Product is in stock
              </label>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Main Product Image *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-red-500 transition-colors">
                {mainImagePreview ? (
                  <div className="relative">
                    <img
                      src={mainImagePreview}
                      alt="Preview"
                      className="max-h-48 mx-auto rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setMainImage(null);
                        setMainImagePreview('');
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                    >
                      <FiX />
                    </button>
                  </div>
                ) : (
                  <div className="py-8">
                    <FiUpload className="text-4xl text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload main image</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMainImageChange}
                  className="hidden"
                  id="main-image-upload"
                />
                <label
                  htmlFor="main-image-upload"
                  className="mt-4 inline-block px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg cursor-pointer transition-colors"
                >
                  Choose Image
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Images
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-red-500 transition-colors">
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {existingImages.map((img, index) => (
                    <div key={index} className="relative">
                      <img src={img} alt="" className="w-full h-24 object-cover rounded-lg" />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <FiX size={12} />
                      </button>
                    </div>
                  ))}
                  {additionalImages.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt=""
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeAdditionalImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <FiX size={12} />
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleAdditionalImagesChange}
                  className="hidden"
                  id="additional-images-upload"
                />
                <label
                  htmlFor="additional-images-upload"
                  className="block w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer transition-colors text-center"
                >
                  <FiUpload className="inline mr-2" />
                  Add More Images
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/dashboard')}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || uploading}
            className="flex items-center space-x-2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiSave />
            <span>{loading ? (uploading ? 'Uploading...' : 'Saving...') : (isEdit ? 'Update Product' : 'Add Product')}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
