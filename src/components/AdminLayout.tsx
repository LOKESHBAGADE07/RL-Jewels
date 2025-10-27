import { Link, useNavigate, Outlet } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { FiHome, FiPackage, FiLogOut, FiPlus, FiStar, FiFileText, FiMail } from 'react-icons/fi';

export default function AdminLayout() {
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/admin/dashboard" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">RL</span>
                </div>
                <span className="font-bold text-gray-900">RL Jewels Admin</span>
              </Link>
              
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/admin/dashboard"
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <FiPackage />
                  <span>Products</span>
                </Link>
                <Link
                  to="/admin/testimonials"
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <FiStar />
                  <span>Testimonials</span>
                </Link>
                <Link
                  to="/admin/blog"
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <FiFileText />
                  <span>Blog</span>
                </Link>
                <Link
                  to="/admin/inquiries"
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <FiMail />
                  <span>Inquiries</span>
                </Link>
                <Link
                  to="/admin/products/new"
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white transition-colors"
                >
                  <FiPlus />
                  <span>Add Product</span>
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/"
                target="_blank"
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <FiHome />
                <span className="hidden md:inline">View Website</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors"
              >
                <FiLogOut />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
