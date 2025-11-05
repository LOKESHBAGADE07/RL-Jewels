import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import {
  FiImage,
  FiShoppingBag,
  FiLayers,
  FiFileText,
  FiStar,
  FiMapPin,
  FiMail,
  FiTrendingUp,
  FiCalendar,
  FiGrid
} from 'react-icons/fi';
import useDocumentTitle from '@/lib/useDocumentTitle';

interface StatsCard {
  title: string;
  count: number;
  icon: any;
  color: string;
  link: string;
}

const AdminDashboardPage = () => {
  useDocumentTitle('Dashboard | RL Jewels Admin');
  
  const [stats, setStats] = useState<StatsCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);

  useEffect(() => {
    fetchStats();
    fetchRecentInquiries();
  }, []);

  const fetchStats = async () => {
    try {
      const [
        { count: bannersCount },
        { count: collectionsCount },
        { count: productsCount },
        { count: blogCount },
        { count: testimonialsCount },
        { count: storesCount },
        { count: occasionsCount },
        { count: inquiriesCount },
      ] = await Promise.all([
        supabase.from('hero_banners').select('*', { count: 'exact', head: true }),
        supabase.from('collections').select('*', { count: 'exact', head: true }),
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
        supabase.from('testimonials').select('*', { count: 'exact', head: true }),
        supabase.from('stores').select('*', { count: 'exact', head: true }),
        supabase.from('occasions').select('*', { count: 'exact', head: true }),
        supabase.from('inquiries').select('*', { count: 'exact', head: true }),
      ]);

      setStats([
        {
          title: 'Hero Banners',
          count: bannersCount || 0,
          icon: FiImage,
          color: 'from-purple-500 to-purple-600',
          link: '/admin/banners'
        },
        {
          title: 'Collections',
          count: collectionsCount || 0,
          icon: FiLayers,
          color: 'from-blue-500 to-blue-600',
          link: '/admin/collections'
        },
        {
          title: 'Products',
          count: productsCount || 0,
          icon: FiShoppingBag,
          color: 'from-green-500 to-green-600',
          link: '/admin/products'
        },
        {
          title: 'Blog Posts',
          count: blogCount || 0,
          icon: FiFileText,
          color: 'from-yellow-500 to-yellow-600',
          link: '/admin/blog'
        },
        {
          title: 'Testimonials',
          count: testimonialsCount || 0,
          icon: FiStar,
          color: 'from-pink-500 to-pink-600',
          link: '/admin/testimonials'
        },
        {
          title: 'Stores',
          count: storesCount || 0,
          icon: FiMapPin,
          color: 'from-red-500 to-red-600',
          link: '/admin/stores'
        },
        {
          title: 'Occasions',
          count: occasionsCount || 0,
          icon: FiCalendar,
          color: 'from-indigo-500 to-indigo-600',
          link: '/admin/occasions'
        },
        {
          title: 'Inquiries',
          count: inquiriesCount || 0,
          icon: FiMail,
          color: 'from-orange-500 to-orange-600',
          link: '/admin/inquiries'
        },
      ]);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentInquiries = async () => {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setRecentInquiries(data || []);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-brand-red to-brand-red-dark rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-serif font-bold mb-2">Welcome to RL Jewels Admin</h1>
        <p className="text-white/90">Manage your jewelry store content and monitor performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={stat.link}
                className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} text-white`}>
                    <Icon className="text-2xl" />
                  </div>
                  <FiTrendingUp className="text-green-500" />
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold text-ink-900">{stat.count}</p>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-ink-900">Recent Inquiries</h2>
            <Link
              to="/admin/inquiries"
              className="text-sm text-brand-red hover:text-brand-red-dark font-medium"
            >
              View All →
            </Link>
          </div>
          
          <div className="space-y-3">
            {recentInquiries.length === 0 ? (
              <p className="text-gray-500 text-sm py-4 text-center">No inquiries yet</p>
            ) : (
              recentInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-ink-900">{inquiry.name}</p>
                      <p className="text-sm text-gray-600 mt-1">{inquiry.email}</p>
                      <p className="text-sm text-gray-500 mt-2 line-clamp-1">
                        {inquiry.message}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      inquiry.status === 'new' ? 'bg-green-100 text-green-700' :
                      inquiry.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {inquiry.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(inquiry.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h2 className="text-xl font-bold text-ink-900 mb-4">Quick Actions</h2>
          
          <div className="space-y-3">
            <Link
              to="/admin/products?action=new"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg hover:shadow-md transition-all"
            >
              <FiShoppingBag className="text-2xl text-green-600" />
              <div>
                <p className="font-semibold text-ink-900">Add New Product</p>
                <p className="text-sm text-gray-600">Create a new jewelry item</p>
              </div>
            </Link>

            <Link
              to="/admin/collections?action=new"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg hover:shadow-md transition-all"
            >
              <FiLayers className="text-2xl text-blue-600" />
              <div>
                <p className="font-semibold text-ink-900">Create Collection</p>
                <p className="text-sm text-gray-600">Group products together</p>
              </div>
            </Link>

            <Link
              to="/admin/banners?action=new"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hover:shadow-md transition-all"
            >
              <FiImage className="text-2xl text-purple-600" />
              <div>
                <p className="font-semibold text-ink-900">Add Hero Banner</p>
                <p className="text-sm text-gray-600">Update homepage carousel</p>
              </div>
            </Link>

            <Link
              to="/admin/blog?action=new"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg hover:shadow-md transition-all"
            >
              <FiFileText className="text-2xl text-yellow-600" />
              <div>
                <p className="font-semibold text-ink-900">Write Blog Post</p>
                <p className="text-sm text-gray-600">Share news and updates</p>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
