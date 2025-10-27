import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

// Allow-list of authorized admin emails
const AUTHORIZED_EMAILS = ['lbagade6@gmail.com'];

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const isAuthorized = session?.user?.email && AUTHORIZED_EMAILS.includes(session.user.email.toLowerCase());
      setAuthenticated(!!session && !!isAuthorized);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    const isAuthorized = session?.user?.email && AUTHORIZED_EMAILS.includes(session.user.email.toLowerCase());
    setAuthenticated(!!session && !!isAuthorized);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
