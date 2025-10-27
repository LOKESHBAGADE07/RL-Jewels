import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiEye, FiEyeOff } from 'react-icons/fi';
import { getAllBlogPosts, deleteBlogPost, publishBlogPost, unpublishBlogPost } from '../../lib/blog-database';
import { BlogPost } from '../../types/blog';

const BlogManager: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await getAllBlogPosts();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load blog posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async (id: string) => {
    try {
      await publishBlogPost(id);
      await loadPosts();
    } catch (err) {
      alert('Failed to publish post');
      console.error(err);
    }
  };

  const handleUnpublish = async (id: string) => {
    try {
      await unpublishBlogPost(id);
      await loadPosts();
    } catch (err) {
      alert('Failed to unpublish post');
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    
    try {
      await deleteBlogPost(id);
      await loadPosts();
    } catch (err) {
      alert('Failed to delete post');
      console.error(err);
    }
  };

  const filteredPosts = posts.filter(post => {
    if (filter === 'published') return post.is_published;
    if (filter === 'draft') return !post.is_published;
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-ink-900">Blog Manager</h1>
        <a
          href="/admin/blog/new"
          className="flex items-center gap-2 px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-brand-red/90 transition-colors"
        >
          <FiPlus /> New Post
        </a>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'all' 
              ? 'bg-brand-red text-white' 
              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
          }`}
        >
          All ({posts.length})
        </button>
        <button
          onClick={() => setFilter('published')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'published' 
              ? 'bg-brand-red text-white' 
              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
          }`}
        >
          Published ({posts.filter(p => p.is_published).length})
        </button>
        <button
          onClick={() => setFilter('draft')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'draft' 
              ? 'bg-brand-red text-white' 
              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
          }`}
        >
          Drafts ({posts.filter(p => !p.is_published).length})
        </button>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-neutral-200">
          <p className="text-neutral-600 mb-4">No blog posts yet</p>
          <a
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-brand-red/90 transition-colors"
          >
            <FiPlus /> Create First Post
          </a>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg border border-neutral-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-6">
                {post.featured_image_url && (
                  <div className="flex-shrink-0">
                    <img
                      src={post.featured_image_url}
                      alt={post.title}
                      className="w-48 h-32 object-cover rounded-lg"
                    />
                  </div>
                )}

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-ink-900 mb-1">{post.title}</h3>
                      <p className="text-sm text-neutral-600 mb-2">{post.excerpt}</p>
                      <div className="flex items-center gap-3 text-sm text-neutral-500">
                        <span className="px-2 py-1 bg-neutral-100 rounded">{post.category}</span>
                        <span>By {post.author_name}</span>
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {post.is_published ? (
                        <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                          <FiEye /> Published
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                          <FiEyeOff /> Draft
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-4">
                    {post.is_published ? (
                      <button
                        onClick={() => handleUnpublish(post.id)}
                        className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors text-sm"
                      >
                        Unpublish
                      </button>
                    ) : (
                      <button
                        onClick={() => handlePublish(post.id)}
                        className="px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors text-sm"
                      >
                        Publish
                      </button>
                    )}
                    <a
                      href={`/admin/blog/edit/${post.id}`}
                      className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors text-sm flex items-center gap-2"
                    >
                      <FiEdit2 /> Edit
                    </a>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors text-sm flex items-center gap-2"
                    >
                      <FiTrash2 /> Delete
                    </button>
                    {post.is_published && (
                      <a
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-brand-red/90 transition-colors text-sm"
                      >
                        View Post
                      </a>
                    )}
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

export default BlogManager;
