import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { FiHome, FiPackage, FiLogOut, FiPlus, FiStar, FiFileText, FiMail, FiBarChart2, FiImage, FiMonitor } from 'react-icons/fi';
import logo from '../assets/logo.png';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/admin/login');
  }

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/admin/banners', icon: FiMonitor, label: 'Hero Banners' },
    { path: '/admin/collections', icon: FiImage, label: 'Collections' },
    { path: '/admin/products', icon: FiPackage, label: 'Products' },
    { path: '/admin/blog', icon: FiFileText, label: 'Blog Posts' },
    { path: '/admin/testimonials', icon: FiStar, label: 'Testimonials' },
    { path: '/admin/stores', icon: FiPlus, label: 'Stores' },
    { path: '/admin/occasions', icon: FiPlus, label: 'Occasions' },
    { path: '/admin/inquiries', icon: FiMail, label: 'Inquiries' },
    { path: '/admin/analytics', icon: FiBarChart2, label: 'Analytics' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Vertical Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-screen">
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200 flex justify-center">
          <Link to="/admin/dashboard">
            <img src={logo} alt="RL Jewels Admin" className="h-12 w-auto" />
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                    active
                      ? 'bg-red-50 text-red-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`text-lg ${active ? 'text-red-600' : 'text-gray-500'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-gray-200 space-y-1">
          <Link
            to="/"
            target="_blank"
            className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors w-full"
          >
            <FiHome className="text-lg text-gray-500" />
            <span>View Website</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors w-full"
          >
            <FiLogOut className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="text-xl font-semibold text-gray-800">
            {menuItems.find(item => isActive(item.path))?.label || 'Dashboard'}
          </h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, Admin</span>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
