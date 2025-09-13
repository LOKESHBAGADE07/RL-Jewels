import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Product, discountPercent } from '../data/products';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../stores/cart';

type Props = { product: Product };

export const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();
  const cart = useCart();
  const [wishlist, setWishlist] = useLocalStorage<string[]>('wishlist', []);
  const [wish, setWish] = useState(false);
  useEffect(() => {
    setWish(wishlist.includes(product.id));
  }, [wishlist, product.id]);
  const toggleWish = () => {
    setWishlist(prev => prev.includes(product.id) ? prev.filter(i => i !== product.id) : [...prev, product.id]);
  };
  const discount = discountPercent(product);
  const hasDiscount = discount > 0;
  return (
    <motion.div
      layout
      whileHover={{ y: -6 }}
      className="group relative bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm"
    >
      <Link to={`/product/${product.id}`} className="relative h-56 w-full overflow-hidden block cursor-pointer" aria-label={`${product.title} details`}>
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-2 top-2 bg-accent-gold text-ink-900 text-[10px] font-semibold px-2 py-1 rounded uppercase tracking-wide">
            {product.badge}
          </span>
        )}
        {hasDiscount && (
          <span className="absolute right-2 top-2 bg-black/70 text-accent-gold text-[11px] font-medium px-2 py-1 rounded">
            -{discount}%
          </span>
        )}
        <button
          aria-label="Toggle wishlist"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWish(); }}
          className="absolute right-2 bottom-2 text-lg text-accent-gold drop-shadow"
        >
          {wish ? <FaHeart /> : <FaRegHeart />}
        </button>
      </Link>
      <div className="p-4 space-y-2">
        <h3 className="text-sm font-medium line-clamp-2 min-h-[2.5rem]">{product.title}</h3>
        <div className="flex items-end gap-2 text-sm">
          <span className="text-brand-red font-semibold">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span className="text-xs line-through text-text-secondary/70">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          )}
        </div>
        {hasDiscount && (
          <p className="text-[11px] text-text-secondary">You save ₹{(product.originalPrice! - product.price).toLocaleString('en-IN')}</p>
        )}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <Link to={`/product/${product.id}`} className="w-full text-center text-[12px] font-medium tracking-wide border border-brand-red text-brand-red py-2 rounded hover:bg-brand-red hover:text-white transition">
            View Details
          </Link>
          <button onClick={() => { cart.add({ id: product.id, title: product.title, price: product.price, image: product.image }, 1); }} className="w-full text-center text-[12px] font-medium tracking-wide border border-accent-gold text-ink-900 py-2 rounded hover:bg-accent-gold/20 transition">
            Add to Cart
          </button>
        </div>
        <button onClick={() => { cart.add({ id: product.id, title: product.title, price: product.price, image: product.image }, 1); navigate('/checkout'); }} className="w-full text-center text-[12px] font-medium tracking-wide border border-surface-300 text-ink-900 py-2 rounded hover:bg-surface-200/60 transition">
          Buy Now
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;