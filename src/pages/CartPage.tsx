import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../stores/cart';
import { newArrivals } from '../data/products';
import { FiShoppingBag, FiPlus, FiMinus, FiTrash2, FiHeart, FiShoppingCart, FiStar, FiShield } from 'react-icons/fi';
import useDocumentTitle from '../lib/useDocumentTitle';

export default function CartPage() {
  useDocumentTitle('Shopping Cart');
  const { items, remove, updateQty, clear } = useCart();
  
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = subtotal >= 2000 ? 0 : 99;
  const tax = Math.round(subtotal * 0.03); // 3% GST
  const total = subtotal + shipping + tax;
  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);

  // Recommendations based on cart items
  const recommendations = newArrivals.filter(p => !items.find(item => item.id === p.id)).slice(0, 4);

  const addToWishlist = (productId: string) => {
    const existing = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (!existing.includes(productId)) {
      localStorage.setItem('wishlist', JSON.stringify([...existing, productId]));
    }
  };

  if (items.length === 0) {
    return (
      <section className="section-padding">
        <div className="max-content">
          <div className="text-center max-w-md mx-auto">
            <div className="bg-white rounded-xl border border-accent-gold/30 p-8">
              <FiShoppingBag className="mx-auto text-5xl text-ink-300 mb-4" />
              <h1 className="font-serif text-2xl mb-2">Your cart is empty</h1>
              <p className="text-ink-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
              
              <Link 
                to="/catalog" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red text-white rounded-lg hover:bg-brand-red-dark transition-colors font-semibold"
              >
                <FiShoppingCart />
                Start Shopping
              </Link>

              <div className="border-t border-surface-200 pt-6 mt-6">
                <h3 className="font-semibold text-sm mb-3">Why shop with us?</h3>
                <div className="space-y-2 text-sm text-ink-600">
                  <div className="flex items-center gap-2 justify-center">
                    <FiShield className="text-brand-red" />
                    Lifetime warranty on all jewelry
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <FiStar className="text-accent-gold" />
                    100% certified gold & diamonds
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <FiHeart className="text-brand-red" />
                    30-day easy returns
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding">
      <div className="max-content">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-2xl">Shopping Cart</h1>
          <div className="text-sm text-ink-600">
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Free Shipping Banner */}
            {subtotal < 2000 && (
              <div className="bg-gradient-to-r from-accent-gold/10 to-accent-gold/5 border border-accent-gold/30 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <FiShoppingCart className="text-accent-gold text-xl" />
                  <div>
                    <p className="font-semibold text-sm">Free shipping on orders above ₹2,000!</p>
                    <p className="text-xs text-ink-600 mt-1">
                      Add ₹{(2000 - subtotal).toLocaleString('en-IN')} more to qualify for free delivery
                    </p>
                  </div>
                </div>
                <div className="mt-3 bg-white rounded-full h-2">
                  <div 
                    className="bg-accent-gold h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((subtotal / 2000) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Cart Items List */}
            <div className="bg-white rounded-lg border border-accent-gold/30">
              {items.map((item, index) => (
                <div key={item.id} className={`p-6 ${index !== items.length - 1 ? 'border-b border-surface-200' : ''}`}>
                  <div className="flex gap-4">
                    <Link to={`/product/${item.id}`} className="flex-shrink-0">
                      <img src={item.image} className="w-24 h-24 rounded-lg object-cover hover:scale-105 transition-transform" />
                    </Link>
                    
                    <div className="flex-1 min-w-0">
                      <Link 
                        to={`/product/${item.id}`} 
                        className="font-medium hover:text-brand-red transition-colors line-clamp-2"
                      >
                        {item.title}
                      </Link>
                      
                      <div className="mt-2 flex items-center gap-4 text-sm text-ink-600">
                        <span>Price: ₹{item.price.toLocaleString('en-IN')}</span>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-surface-300 rounded-lg">
                            <button
                              onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}
                              className="p-2 hover:bg-surface-100 transition-colors rounded-l-lg"
                              disabled={item.qty <= 1}
                            >
                              <FiMinus className="text-sm" />
                            </button>
                            <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => updateQty(item.id, item.qty + 1)}
                              className="p-2 hover:bg-surface-100 transition-colors rounded-r-lg"
                            >
                              <FiPlus className="text-sm" />
                            </button>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => addToWishlist(item.id)}
                              className="p-2 text-ink-500 hover:text-brand-red transition-colors"
                              title="Move to wishlist"
                            >
                              <FiHeart className="text-sm" />
                            </button>
                            <button
                              onClick={() => remove(item.id)}
                              className="p-2 text-ink-500 hover:text-red-600 transition-colors"
                              title="Remove from cart"
                            >
                              <FiTrash2 className="text-sm" />
                            </button>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-semibold text-lg">
                            ₹{(item.price * item.qty).toLocaleString('en-IN')}
                          </div>
                          {item.qty > 1 && (
                            <div className="text-xs text-ink-500">
                              ₹{item.price.toLocaleString('en-IN')} each
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-accent-gold/30 p-6 sticky top-4">
              <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600' : ''}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span>Tax (GST)</span>
                  <span>₹{tax.toLocaleString('en-IN')}</span>
                </div>
                
                <div className="border-t border-surface-300 pt-3 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-brand-red">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full bg-brand-red text-white py-3 px-4 rounded-lg hover:bg-brand-red-dark transition-colors font-semibold text-center block mt-6"
              >
                Proceed to Checkout
              </Link>

              <button
                onClick={clear}
                className="w-full border border-surface-300 py-2 px-4 rounded-lg hover:border-ink-300 transition-colors text-sm text-ink-600 mt-3"
              >
                Clear Cart
              </button>

              <div className="mt-4 p-3 bg-surface-50 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-ink-600">
                  <FiShield className="text-brand-red" />
                  <span>Secure checkout with 256-bit SSL encryption</span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 bg-white rounded-lg border border-accent-gold/30 p-6">
              <h3 className="font-semibold mb-3">Why Choose RL Jewels?</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <FiShield className="text-brand-red flex-shrink-0" />
                  <span>Lifetime warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiStar className="text-accent-gold flex-shrink-0" />
                  <span>100% certified jewelry</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiHeart className="text-brand-red flex-shrink-0" />
                  <span>30-day easy returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="mt-12">
            <h2 className="font-serif text-xl mb-6">You might also like</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {recommendations.map(product => (
                <div key={product.id} className="bg-white rounded-lg border border-accent-gold/30 p-4 group hover:border-accent-gold/60 transition-colors">
                  <Link to={`/product/${product.id}`} className="block mb-3">
                    <img 
                      src={product.image} 
                      className="w-full aspect-square rounded object-cover group-hover:scale-105 transition-transform" 
                    />
                  </Link>
                  <div className="space-y-2">
                    <Link 
                      to={`/product/${product.id}`} 
                      className="font-medium text-sm hover:text-brand-red line-clamp-2"
                    >
                      {product.title}
                    </Link>
                    <div className="text-brand-red font-semibold">
                      ₹{product.price.toLocaleString('en-IN')}
                    </div>
                    <Link
                      to={`/product/${product.id}`}
                      className="w-full bg-accent-gold text-ink-900 py-2 px-3 rounded text-sm hover:bg-accent-gold/80 transition-colors font-semibold text-center block"
                    >
                      Quick View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
