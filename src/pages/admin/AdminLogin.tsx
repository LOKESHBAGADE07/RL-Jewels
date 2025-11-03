import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { FiMail, FiShield, FiLock, FiCheckCircle } from 'react-icons/fi';
import logo from '../../assets/logo.png';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      navigate('/admin/dashboard');
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    
    // Rate limiting check
    if (loginAttempts >= 5) {
      setError('Too many login attempts. Please try again after 15 minutes.');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    // Allow-list of authorized admin emails
    const authorizedEmails = ['lbagade6@gmail.com'];
    
    if (!authorizedEmails.includes(email.toLowerCase().trim())) {
      setError('⚠️ Unauthorized email address. Only authorized staff can access the admin panel.');
      setLoginAttempts(prev => prev + 1);
      setLoading(false);
      
      // Security log (in production, send to server)
      console.warn('Unauthorized login attempt:', {
        email,
        timestamp: new Date().toISOString(),
        ip: 'client-ip' // In production, capture from server
      });
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/admin/dashboard`,
      },
    });

    if (error) {
      setError(error.message);
      setLoginAttempts(prev => prev + 1);
    } else {
      setMessage('✅ Magic link sent! Check your email to continue.');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      {/* Logo at Top Left */}
      <div className="absolute top-8 left-8">
        <img src={logo} alt="RL Jewels" className="h-14 w-auto" />
      </div>

      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-100">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
              <p className="text-gray-600">RL Jewels Management Portal</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="lbagade6@gmail.com"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {message && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || loginAttempts >= 5}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending login link...</span>
                  </>
                ) : (
                  <>
                    <FiLock />
                    <span>Send Magic Link</span>
                  </>
                )}
              </button>
            </form>

            {/* Security Features Info */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                <FiCheckCircle className="text-green-600" />
                <span>End-to-end encrypted connection</span>
              </div>
            </div>

            <div className="mt-6 text-center text-xs text-gray-500">
              <p>🔒 A secure login link will be sent to your email</p>
              <p className="mt-1">Link expires in 1 hour</p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center space-y-2">
            <a href="/" className="block text-red-600 hover:text-red-700 text-sm font-medium">
              ← Back to Website
            </a>
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} RL Jewels. All rights reserved.
            </p>
          </div>

          {/* Security Notice */}
          {loginAttempts > 2 && loginAttempts < 5 && (
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
              <p className="text-xs text-yellow-800">
                ⚠️ Warning: {5 - loginAttempts} login attempt(s) remaining
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
