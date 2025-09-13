import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useOrders, generateTrackingURL } from '../stores/orders';
import { useAddresses } from '../stores/addresses';
import { newArrivals, bestSellers } from '../data/products';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiPackage, FiHeart, FiMapPin, FiEdit2, FiTrash2 } from 'react-icons/fi';
import useDocumentTitle from '../lib/useDocumentTitle';

export default function AccountPage() {
  useDocumentTitle('My Account');
  const navigate = useNavigate();
  const { user, loading, signInWithGoogle, signOutUser } = useAuth();
  const { orders } = useOrders();
  const addrBook = useAddresses();
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    try {
      const w = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setWishlist(Array.isArray(w) ? w : []);
    } catch {}
  }, []);

  useEffect(() => {
    // Handle hash-based navigation
    const hash = window.location.hash.replace('#', '');
    if (hash && ['profile', 'orders', 'wishlist', 'addresses'].includes(hash)) {
      setActiveTab(hash);
    }
  }, []);

  const all = [...newArrivals, ...bestSellers];
  const wishProducts = all.filter(p => wishlist.includes(p.id));

  const removeFromWishlist = (productId: string) => {
    const updated = wishlist.filter(id => id !== productId);
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  if (loading) {
    return (
      <section className="section-padding">
        <div className="max-content">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-surface-300 rounded w-48"></div>
            <div className="h-32 bg-surface-200 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="section-padding">
        <div className="max-content max-w-md mx-auto text-center">
          <div className="bg-white rounded-xl border border-accent-gold/30 p-8">
            <div className="mb-6">
              <FiUser className="mx-auto text-4xl text-ink-400 mb-4" />
              <h1 className="font-serif text-2xl mb-2">Welcome to RL Jewels</h1>
              <p className="text-ink-600 mb-6">Sign in to access your account and enjoy personalized features.</p>
            </div>
            
            <button onClick={signInWithGoogle} className="w-full rounded-lg bg-white border border-surface-300 hover:border-ink-300 text-ink-900 font-semibold py-3 px-4 flex items-center justify-center gap-3 mb-4">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="h-5 w-5" />
              Continue with Google
            </button>
            
            <div className="border-t border-surface-200 pt-4">
              <h3 className="font-semibold text-sm mb-3">Benefits of signing in:</h3>
              <ul className="text-sm text-ink-600 space-y-2 text-left">
                <li className="flex items-center gap-2">
                  <FiPackage className="text-brand-red" />
                  Track your orders
                </li>
                <li className="flex items-center gap-2">
                  <FiHeart className="text-brand-red" />
                  Save your wishlist
                </li>
                <li className="flex items-center gap-2">
                  <FiMapPin className="text-brand-red" />
                  Faster checkout with saved addresses
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding">
      <div className="max-content">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            {user.photoURL ? (
              <img src={user.photoURL} className="h-16 w-16 rounded-full border-2 border-accent-gold/30" />
            ) : (
              <div className="h-16 w-16 rounded-full bg-brand-red text-white flex items-center justify-center text-xl font-bold">
                {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
              </div>
            )}
            <div>
              <h1 className="font-serif text-2xl">Welcome back, {user.displayName?.split(' ')[0] || 'User'}!</h1>
              <p className="text-ink-600">{user.email}</p>
            </div>
          </div>
          <button onClick={signOutUser} className="text-sm text-brand-red hover:underline">Sign Out</button>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-surface-300 mb-8">
          <nav className="flex gap-8">
            {[
              { id: 'profile', label: 'Profile', icon: FiUser },
              { id: 'orders', label: 'Orders', icon: FiPackage },
              { id: 'wishlist', label: 'Wishlist', icon: FiHeart },
              { id: 'addresses', label: 'Addresses', icon: FiMapPin }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 pb-4 border-b-2 transition-colors ${
                  activeTab === tab.id 
                    ? 'border-brand-red text-brand-red' 
                    : 'border-transparent text-ink-600 hover:text-ink-900'
                }`}
              >
                <tab.icon className="text-sm" />
                {tab.label}
                {tab.id === 'orders' && orders.length > 0 && (
                  <span className="bg-brand-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {orders.length}
                  </span>
                )}
                {tab.id === 'wishlist' && wishProducts.length > 0 && (
                  <span className="bg-accent-gold text-ink-900 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishProducts.length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'profile' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg border border-accent-gold/30 p-6">
                <h2 className="font-semibold mb-4 flex items-center gap-2">
                  <FiUser />
                  Profile Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-ink-700 mb-1">Name</label>
                    <p className="text-ink-900">{user.displayName || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink-700 mb-1">Email</label>
                    <p className="text-ink-900">{user.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink-700 mb-1">Account Since</label>
                    <p className="text-ink-900">{user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Recently'}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-accent-gold/30 p-6">
                <h2 className="font-semibold mb-4">Account Summary</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-surface-100 rounded-lg">
                    <div className="text-2xl font-bold text-brand-red">{orders.length}</div>
                    <div className="text-sm text-ink-600">Orders</div>
                  </div>
                  <div className="text-center p-4 bg-surface-100 rounded-lg">
                    <div className="text-2xl font-bold text-accent-gold">{wishProducts.length}</div>
                    <div className="text-sm text-ink-600">Wishlist Items</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white rounded-lg border border-accent-gold/30 p-6">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <FiPackage />
                Order History
              </h2>
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <FiPackage className="mx-auto text-4xl text-ink-300 mb-4" />
                  <p className="text-ink-600 mb-4">No orders yet</p>
                  <Link to="/catalog" className="inline-flex items-center gap-2 px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-brand-red-dark transition-colors">
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order.id} className="border border-surface-300 rounded-lg p-4 hover:border-accent-gold/40 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <Link to={`/order/${order.id}`} className="font-medium hover:text-brand-red">
                          Order #{order.id}
                        </Link>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="grid md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-ink-500">Date:</span> {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="text-ink-500">Items:</span> {order.items.length}
                        </div>
                        <div>
                          <span className="text-ink-500">Total:</span> ₹{order.total.toLocaleString('en-IN')}
                        </div>
                        <div>
                          <span className="text-ink-500">Payment:</span> {order.payment.status}
                        </div>
                      </div>
                      {order.tracking && (
                        <div className="mt-3 pt-3 border-t border-surface-200 text-sm">
                          <span className="text-ink-500">Tracking:</span> {order.tracking.courier} • AWB {order.tracking.awb}
                          {generateTrackingURL(order.tracking.courier, order.tracking.awb) && (
                            <a 
                              className="text-brand-red hover:underline ml-2" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              href={generateTrackingURL(order.tracking.courier, order.tracking.awb)}
                            >
                              Track Package →
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="bg-white rounded-lg border border-accent-gold/30 p-6">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <FiHeart />
                Your Wishlist
              </h2>
              {wishProducts.length === 0 ? (
                <div className="text-center py-12">
                  <FiHeart className="mx-auto text-4xl text-ink-300 mb-4" />
                  <p className="text-ink-600 mb-4">Your wishlist is empty</p>
                  <Link to="/catalog" className="inline-flex items-center gap-2 px-4 py-2 bg-accent-gold text-ink-900 rounded-lg hover:bg-accent-gold/80 transition-colors">
                    Discover Products
                  </Link>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {wishProducts.map(product => (
                    <div key={product.id} className="border border-surface-300 rounded-lg p-4 group hover:border-accent-gold/40 transition-colors">
                      <Link to={`/product/${product.id}`} className="block mb-3">
                        <img src={product.image} className="w-full aspect-square rounded object-cover group-hover:scale-105 transition-transform" />
                      </Link>
                      <div className="space-y-2">
                        <Link to={`/product/${product.id}`} className="font-medium text-sm hover:text-brand-red line-clamp-2">
                          {product.title}
                        </Link>
                        <div className="text-brand-red font-semibold">₹{product.price.toLocaleString('en-IN')}</div>
                        <div className="flex gap-2">
                          <Link 
                            to={`/product/${product.id}`}
                            className="flex-1 text-center px-3 py-2 bg-brand-red text-white rounded text-xs hover:bg-brand-red-dark transition-colors"
                          >
                            View
                          </Link>
                          <button 
                            onClick={() => removeFromWishlist(product.id)}
                            className="px-3 py-2 border border-surface-300 rounded text-xs hover:border-red-300 hover:text-red-600 transition-colors"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="bg-white rounded-lg border border-accent-gold/30 p-6">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <FiMapPin />
                Saved Addresses
              </h2>
              {addrBook.addresses.length === 0 ? (
                <div className="text-center py-12">
                  <FiMapPin className="mx-auto text-4xl text-ink-300 mb-4" />
                  <p className="text-ink-600 mb-4">No saved addresses yet</p>
                  <p className="text-sm text-ink-500 mb-4">Addresses will be saved during checkout when you select "Save this address"</p>
                  <Link to="/catalog" className="inline-flex items-center gap-2 px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-brand-red-dark transition-colors">
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {addrBook.addresses.map(address => (
                    <div key={address.id} className="border border-surface-300 rounded-lg p-4 hover:border-accent-gold/40 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">{address.fullName}</span>
                            <span className="text-sm text-ink-500">• {address.phone}</span>
                            {addrBook.defaultId === address.id && (
                              <span className="px-2 py-1 bg-brand-red text-white text-xs rounded-full">Default</span>
                            )}
                          </div>
                          <address className="text-sm text-ink-700 not-italic">
                            {address.address1}
                            {address.address2 && <br />}{address.address2}
                            <br />{address.city}, {address.state} - {address.pincode}
                          </address>
                        </div>
                        <div className="flex flex-col gap-2 ml-4">
                          {addrBook.defaultId !== address.id && (
                            <button 
                              onClick={() => addrBook.setDefault(address.id)}
                              className="text-xs px-3 py-1 border border-accent-gold/40 rounded hover:border-brand-red hover:text-brand-red transition-colors"
                            >
                              Set Default
                            </button>
                          )}
                          <button 
                            onClick={() => addrBook.remove(address.id)}
                            className="text-xs px-3 py-1 text-red-600 border border-red-300 rounded hover:bg-red-50 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
