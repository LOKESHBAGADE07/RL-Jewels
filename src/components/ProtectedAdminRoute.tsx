import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase, isAdmin } from '@/lib/supabase';

const ProtectedAdminRoute = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Check if user is logged in
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setAuthenticated(false);
        setLoading(false);
        return;
      }

      setAuthenticated(true);

      // Check if user has admin role
      const adminStatus = await isAdmin();
      setAdminUser(adminStatus);
    } catch (error) {
      console.error('Auth check error:', error);
      setAuthenticated(false);
      setAdminUser(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red mx-auto mb-4"></div>
          <p className="text-ink-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!authenticated || !adminUser) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedAdminRoute;
