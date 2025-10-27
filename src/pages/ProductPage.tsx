import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { newArrivals, bestSellers } from '../data/products';
import { useGoldRate, computePriceBreakdown } from '../stores/goldRate';
import { useLocalStorage } from '../hooks/useLocalStorage';
import useDocumentTitle from '../lib/useDocumentTitle';
import { FaWhatsapp } from 'react-icons/fa';

export default function ProductPage() {
  const { id } = useParams();
  const product = [...newArrivals, ...bestSellers].find(p => p.id === id);
  if (!product) return (
    <section className="section-padding">
      <div className="max-content text-center">
        <h1 className="font-serif text-2xl mb-4">Product Not Found</h1>
        <p className="text-ink-600 mb-6">The product you're looking for doesn't exist.</p>
        <Link to="/catalog" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red text-white rounded-lg hover:bg-brand-red-dark transition-colors">
          Browse Products
        </Link>
      </div>
    </section>
  );

  useDocumentTitle(product.title);
  const inStock = product.inStock ?? true;
  const rate = useGoldRate(s => s.ratePerGramINR);
  const netW = product.netWeightGrams ?? 4.0;
  const { goldValue, making, gst, total } = computePriceBreakdown({ rate, netWeight: netW, makingPct: 10 });
  const media = useMemo(() => product.images && product.images.length > 0 ? product.images : [product.image], [product]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [wishlist, setWishlist] = useLocalStorage<string[]>('wishlist', []);
  const wished = wishlist.includes(product.id);
  const toggleWish = () => setWishlist(prev => prev.includes(product.id) ? prev.filter(i => i !== product.id) : [...prev, product.id]);
  const [reviews, setReviews] = useState<{name:string; rating:number; text:string; date:string;}[]>([]);
  const [myRating, setMyRating] = useState(5);
  const [myName, setMyName] = useState('');
  const [myText, setMyText] = useState('');
  
  const handleEnquiry = () => {
    const message = `Hi, I'm interested in ${product.title}. Can you provide more details about this jewelry piece?`;
    window.open(`https://wa.me/919999999999?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Get related products
  const allProducts = [...newArrivals, ...bestSellers];
  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && Math.abs(p.price - product.price) < 50000)
    .slice(0, 4);

  useEffect(() => {
    try {
      const key = `reviews:${product.id}`;
      const saved = JSON.parse(localStorage.getItem(key) || '[]');
      setReviews(Array.isArray(saved) ? saved : []);
    } catch {}
  }, [product.id]);

  const submitReview = () => {
    if (!myName.trim() || !myText.trim()) return;
    const next = [{ name: myName.trim(), rating: myRating, text: myText.trim(), date: new Date().toISOString() }, ...reviews];
    setReviews(next);
    localStorage.setItem(`reviews:${product.id}`, JSON.stringify(next));
    setMyName(''); setMyText(''); setMyRating(5);
  };

  const avgRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((s, r) => s + r.rating, 0);
    return sum / reviews.length;
  }, [reviews]);

  return (
    <section className="section-padding">
      <div className="max-content">
        {/* Breadcrumb */}
        <nav className="text-sm text-ink-600 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-brand-red">Home</Link>
          <span>/</span>
          <Link to="/catalog" className="hover:text-brand-red">Catalog</Link>
          <span>/</span>
          <span className="text-ink-900">{product.title}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-10 items-start mb-12">
          <div className="bg-white rounded-xl overflow-hidden border border-accent-gold/30">
            <div className="relative">
              <div className="aspect-square w-full bg-white">
                {/* Active media */}
                <img src={media[activeIdx]} alt={product.title} className="w-full h-full object-cover" />
              </div>
              {product.badge && (
                <span className="absolute left-3 top-3 bg-accent-gold text-ink-900 text-[10px] font-semibold px-2 py-1 rounded uppercase tracking-wide">{product.badge}</span>
              )}
              <button aria-label="Toggle wishlist" onClick={toggleWish} className={`absolute right-3 top-3 text-sm px-2 py-1 rounded border ${wished ? 'bg-brand-red text-white border-brand-red' : 'bg-white/80 text-ink-900 border-accent-gold/50'}`}>
                {wished ? '♥ Saved' : '♡ Save'}
              </button>
              {!inStock && (
                <span className="absolute left-1/2 -translate-x-1/2 top-3 bg-black/70 text-white text-xs px-3 py-1 rounded">Out of Stock</span>
              )}
            </div>
            {/* Thumbnails */}
            <div className="p-3 grid grid-cols-5 sm:grid-cols-6 md:grid-cols-5 gap-2 bg-white">
              {media.map((m, i) => (
                <button key={i} className={`relative aspect-square rounded overflow-hidden border ${i===activeIdx ? 'border-brand-red' : 'border-accent-gold/30'}`} onClick={() => setActiveIdx(i)}>
                  <img src={m} alt={`${product.title} ${i+1}`} className="w-full h-full object-cover" />
                </button>
              ))}
              {product.videoUrl && (
                <a href={product.videoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center text-xs border border-accent-gold/40 rounded">Video ▶</a>
              )}
            </div>
          </div>
          <div>
            <h1 className="font-serif text-2xl md:text-3xl mb-2">{product.title}</h1>
            <div className="text-sm text-ink-500 mb-3">SKU: {product.id.toUpperCase()}</div>
            <div className="flex items-center gap-3 mb-3">
              <div className="text-yellow-500">{'★'.repeat(Math.round(avgRating))}{'☆'.repeat(5-Math.round(avgRating))}</div>
              <span className="text-xs text-ink-500">{avgRating.toFixed(1)} • {reviews.length} {reviews.length===1?'review':'reviews'}</span>
              <span className={`text-xs ${inStock ? 'text-green-600' : 'text-red-600'}`}>{inStock ? 'In Stock' : 'Out of Stock'}</span>
            </div>

            <p className="text-sm text-ink-700 mb-5">A timeless piece crafted with care. Detailed specs, purity, and certification available below.</p>

            <div className="flex items-center gap-3 flex-wrap">
              <button 
                disabled={!inStock}
                onClick={handleEnquiry}
                className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors"
              >
                <FaWhatsapp className="text-xl" />
                {inStock ? 'Enquire on WhatsApp' : 'Out of Stock'}
              </button>
              <button 
                className={`px-6 py-3 rounded-lg border text-sm font-semibold transition-colors ${wished ? 'border-brand-red bg-brand-red text-white' : 'border-accent-gold/40 hover:bg-accent-gold/10'}`} 
                onClick={toggleWish}
              >
                {wished ? '♥ Wishlisted' : '♡ Add to Wishlist'}
              </button>
            </div>
            
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-900">
                <strong>Visit Our Store:</strong> We don't sell online. Please contact us via WhatsApp or visit our showroom in Jalgaon to purchase this beautiful piece.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold mb-2">Specifications</h3>
              <ul className="text-sm grid grid-cols-2 gap-x-6 gap-y-2">
                <li>Purity: {product.purity ?? '22K'} (BIS Hallmarked)</li>
                <li>Gross Weight: {product.grossWeightGrams ?? 4.0} g</li>
                <li>Net Weight: {netW} g</li>
                <li>Dimensions: 20 x 15 x 3 mm</li>
                <li>Stones: Cubic zirconia</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="font-semibold mb-2">Ratings & Reviews</h3>
            <ul className="space-y-3">
              {reviews.length === 0 ? <li className="text-sm text-ink-600">No reviews yet.</li> : reviews.map((r, idx) => (
                <li key={idx} className="p-3 bg-white rounded border border-accent-gold/30">
                  <div className="flex items-center gap-2 text-yellow-500 text-sm">{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</div>
                  <p className="text-xs text-ink-500">by {r.name} • {new Date(r.date).toLocaleDateString()}</p>
                  <p className="text-sm mt-1">{r.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Write a review</h3>
            <div className="space-y-3 p-3 bg-white rounded border border-accent-gold/30">
              <div>
                <label className="block text-xs mb-1">Your Name</label>
                <input value={myName} onChange={e=>setMyName(e.target.value)} className="w-full border border-accent-gold/40 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-xs mb-1">Rating</label>
                <select value={myRating} onChange={e=>setMyRating(Number(e.target.value))} className="w-full border border-accent-gold/40 rounded px-3 py-2">
                  {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Star{n>1?'s':''}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs mb-1">Review</label>
                <textarea value={myText} onChange={e=>setMyText(e.target.value)} className="w-full border border-accent-gold/40 rounded px-3 py-2 min-h-[100px]" />
              </div>
              <button onClick={submitReview} className="rounded-md bg-brand-red hover:bg-brand-red-dark text-white font-semibold px-4 py-2 self-start">Submit Review</button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-surface-200 pt-12">
            <h2 className="font-serif text-2xl mb-6">You might also like</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <div key={relatedProduct.id} className="bg-white rounded-lg border border-accent-gold/30 p-4 group hover:border-accent-gold/60 transition-colors">
                  <Link to={`/product/${relatedProduct.id}`} className="block mb-3">
                    <img 
                      src={relatedProduct.image} 
                      className="w-full aspect-square rounded object-cover group-hover:scale-105 transition-transform" 
                    />
                  </Link>
                  <div className="space-y-2">
                    <Link 
                      to={`/product/${relatedProduct.id}`} 
                      className="font-medium text-sm hover:text-brand-red line-clamp-2"
                    >
                      {relatedProduct.title}
                    </Link>
                    <Link
                      to={`/product/${relatedProduct.id}`}
                      className="w-full bg-accent-gold text-ink-900 py-2 px-3 rounded text-sm hover:bg-accent-gold/80 transition-colors font-semibold text-center block"
                    >
                      View Product
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
