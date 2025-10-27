import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPublishedBlogPosts } from '../lib/blog-database';
import { BlogPost, BLOG_CATEGORIES } from '../types/blog';

const BlogListPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await getPublishedBlogPosts();
      setPosts(data);
    } catch (err) {
      console.error('Failed to load blog posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-gradient-to-br from-brand-red to-brand-red/80 text-white py-16">
        <div className="max-content">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Jewelry Blog</h1>
          <p className="text-xl opacity-90">
            Expert tips, guides, and insights about jewelry care and trends
          </p>
        </div>
      </div>

      <div className="section-padding max-content">
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-brand-red text-white'
                : 'bg-white text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            All Posts
          </button>
          {BLOG_CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-brand-red text-white'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-600 text-lg">No blog posts available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
              >
                {post.featured_image_url ? (
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={post.featured_image_url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="aspect-video w-full bg-gradient-to-br from-brand-red/20 to-brand-red/10 flex items-center justify-center">
                    <span className="text-4xl">📝</span>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-brand-red/10 text-brand-red text-xs rounded-full font-semibold">
                      {post.category}
                    </span>
                    <span className="text-xs text-neutral-500">
                      {new Date(post.published_at || post.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-ink-900 mb-2 group-hover:text-brand-red transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-neutral-700 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-600">By {post.author_name}</span>
                    <span className="text-brand-red text-sm font-semibold group-hover:underline">
                      Read More →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogListPage;
