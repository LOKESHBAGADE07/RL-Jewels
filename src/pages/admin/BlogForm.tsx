import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createBlogPost, updateBlogPost, getBlogPostById, generateSlug, uploadBlogImage } from '../../lib/blog-database';
import { BlogPost, BLOG_CATEGORIES } from '../../types/blog';
import { FiUpload } from 'react-icons/fi';

const BlogForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image_url: '',
    category: 'Jewelry Care',
    tags: [] as string[],
    author_name: 'RL Jewels Team',
    is_published: false,
    published_at: '',
  });

  useEffect(() => {
    if (isEditing && id) {
      loadPost(id);
    }
  }, [id, isEditing]);

  const loadPost = async (postId: string) => {
    try {
      const post = await getBlogPostById(postId);
      if (post) {
        setFormData({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          featured_image_url: post.featured_image_url || '',
          category: post.category,
          tags: post.tags || [],
          author_name: post.author_name,
          is_published: post.is_published,
          published_at: post.published_at || '',
        });
      }
    } catch (err) {
      alert('Failed to load blog post');
      console.error(err);
    }
  };

  const handleTitleChange = (title: string) => {
    setFormData({ 
      ...formData, 
      title,
      slug: generateSlug(title)
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    try {
      setUploadingImage(true);
      const timestamp = Date.now();
      const filename = `${timestamp}-${file.name}`;
      const imageUrl = await uploadBlogImage(file, filename);
      if (imageUrl) {
        setFormData({ ...formData, featured_image_url: imageUrl });
      }
    } catch (err) {
      alert('Failed to upload image');
      console.error(err);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleTagsChange = (tagsString: string) => {
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData({ ...formData, tags });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const postData = {
        ...formData,
        published_at: formData.is_published ? (formData.published_at || new Date().toISOString()) : undefined,
      };

      if (isEditing && id) {
        await updateBlogPost(id, postData);
        alert('Blog post updated successfully!');
      } else {
        await createBlogPost(postData);
        alert('Blog post created successfully!');
      }
      navigate('/admin/blog');
    } catch (err) {
      alert(`Failed to ${isEditing ? 'update' : 'create'} blog post`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-ink-900 mb-6">
        {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-ink-900 mb-2">
              Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
              placeholder="e.g., How to Clean Gold Jewelry"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-900 mb-2">
              URL Slug * (auto-generated)
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent bg-neutral-50"
              placeholder="how-to-clean-gold-jewelry"
            />
            <p className="text-xs text-neutral-600 mt-1">
              URL: /blog/{formData.slug || 'your-post-slug'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-900 mb-2">
              Excerpt * (Short summary)
            </label>
            <textarea
              required
              rows={2}
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
              placeholder="A brief summary of your blog post (150-200 characters)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-900 mb-2">
              Content * (Markdown supported)
            </label>
            <textarea
              required
              rows={15}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent font-mono text-sm"
              placeholder="Write your blog content here... You can use Markdown formatting."
            />
            <p className="text-xs text-neutral-600 mt-1">
              Tip: Use # for headings, ** for bold, * for italic, - for lists
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-900 mb-2">
              Featured Image
            </label>
            {formData.featured_image_url && (
              <img
                src={formData.featured_image_url}
                alt="Featured"
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
            )}
            <div className="flex gap-3">
              <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-neutral-300 rounded-lg hover:border-brand-red cursor-pointer transition-colors">
                <FiUpload />
                <span>{uploadingImage ? 'Uploading...' : 'Upload Image'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-ink-900 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
              >
                {BLOG_CATEGORIES.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-900 mb-2">
                Author Name
              </label>
              <input
                type="text"
                value={formData.author_name}
                onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
                placeholder="RL Jewels Team"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-900 mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={formData.tags.join(', ')}
              onChange={(e) => handleTagsChange(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
              placeholder="gold, jewelry care, cleaning"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="is_published"
              checked={formData.is_published}
              onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
              className="w-4 h-4 text-brand-red border-neutral-300 rounded focus:ring-brand-red"
            />
            <label htmlFor="is_published" className="text-sm font-medium text-ink-900">
              Publish immediately (make visible to public)
            </label>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-3 bg-brand-red text-white rounded-lg hover:bg-brand-red/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {loading ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/blog')}
            className="px-6 py-3 bg-neutral-200 text-ink-900 rounded-lg hover:bg-neutral-300 transition-colors font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
