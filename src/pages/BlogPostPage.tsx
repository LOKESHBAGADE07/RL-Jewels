import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogPostBySlug } from '../lib/blog-database';
import { BlogPost } from '../types/blog';
import { FiArrowLeft, FiCalendar, FiUser, FiTag } from 'react-icons/fi';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadPost(slug);
    }
  }, [slug]);

  const loadPost = async (postSlug: string) => {
    try {
      const data = await getBlogPostBySlug(postSlug);
      setPost(data);
    } catch (err) {
      console.error('Failed to load blog post:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-ink-900 mb-4">Post Not Found</h1>
          <p className="text-neutral-600 mb-6">The blog post you're looking for doesn't exist.</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red text-white rounded-lg hover:bg-brand-red/90 transition-colors"
          >
            <FiArrowLeft /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const formatContent = (content: string) => {
    return content
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-ink-900 mb-4 mt-8">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-ink-900 mb-3 mt-6">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-ink-900 mb-2 mt-4">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^- (.*$)/gim, '<li class="ml-6 mb-2">$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-6 mb-2">$1</li>')
      .replace(/\n\n/g, '</p><p class="mb-4">');
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white">
          <div className="p-6">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-brand-red hover:underline mb-6"
            >
              <FiArrowLeft /> Back to Blog
            </Link>

            <div className="mb-6">
              <span className="px-3 py-1 bg-brand-red/10 text-brand-red text-sm rounded-full font-semibold">
                {post.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif font-bold text-ink-900 mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-neutral-600 mb-8 pb-6 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <FiUser />
                <span>{post.author_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCalendar />
                <span>{new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              {post.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  <FiTag />
                  <span>{post.tags.join(', ')}</span>
                </div>
              )}
            </div>
          </div>

          {post.featured_image_url && (
            <img
              src={post.featured_image_url}
              alt={post.title}
              className="w-full h-96 object-cover"
            />
          )}

          <div className="p-6 md:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-neutral-700 mb-8 leading-relaxed font-medium">
                {post.excerpt}
              </p>
              <div
                className="text-neutral-800 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: `<p class="mb-4">${formatContent(post.content)}</p>` }}
              />
            </div>

            <div className="mt-12 pt-8 border-t border-neutral-200">
              <div className="bg-brand-red/5 rounded-xl p-6 text-center">
                <h3 className="text-xl font-bold text-ink-900 mb-3">
                  Visit RL Jewels in Jalgaon
                </h3>
                <p className="text-neutral-700 mb-4">
                  For expert jewelry advice and beautiful collections
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="tel:+919999999999"
                    className="px-6 py-3 bg-brand-red text-white rounded-lg hover:bg-brand-red/90 transition-colors font-semibold"
                  >
                    Call Us
                  </a>
                  <a
                    href="https://wa.me/919999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    WhatsApp
                  </a>
                  <Link
                    to="/catalog"
                    className="px-6 py-3 bg-neutral-200 text-ink-900 rounded-lg hover:bg-neutral-300 transition-colors font-semibold"
                  >
                    View Catalog
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
