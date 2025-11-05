import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';

const posts = [
  { id: 'post-1', title: 'Caring For Your Gold Jewellery', date: 'Aug 2024', excerpt: 'Simple at–home steps to keep your gold looking radiant and lustrous.', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=600&fit=crop&q=85' },
  { id: 'post-2', title: 'Hallmarking – What It Really Means', date: 'Jul 2024', excerpt: 'Understanding BIS hallmark and why it protects your purchase.', image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=600&fit=crop&q=85' },
  { id: 'post-3', title: 'Styling Layered Chains', date: 'Jun 2024', excerpt: 'Balance proportions, textures & pendants for a curated layered look.', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=600&fit=crop&q=85' }
];

export const BlogTeasersSection: React.FC = () => (
  <section id="blog" className="section-padding bg-gradient-to-b from-primary-cream/50 to-white">
    <div className="max-content">
      <SectionTitle title="From Our Journal" subtitle="Insights" />
      
      {/* Mobile: Horizontal Scroll */}
      <div className="md:hidden -mx-4 px-4">
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 scroll-smooth">
          {posts.map(p => (
            <Link key={p.id} to={`/blog/${p.id}`} className="group flex-shrink-0 w-[85%] max-w-[340px] rounded-xl overflow-hidden border border-accent-gold/30 bg-white/70 backdrop-blur shadow-sm hover:shadow-lg transition snap-start cursor-pointer">
              <div className="aspect-video w-full overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              </div>
              <div className="p-5 flex flex-col">
                <p className="text-[11px] uppercase tracking-widest text-brand-red mb-2">{p.date}</p>
                <h3 className="font-semibold font-serif text-lg mb-2 group-hover:text-accent-gold transition-colors">{p.title}</h3>
                <p className="text-sm text-neutral-600 line-clamp-3">{p.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
        {/* Scroll Indicator */}
        <p className="text-center text-xs text-neutral-500 mt-2">
          ← Swipe to see more →
        </p>
      </div>

      {/* Desktop/Tablet: Grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-8">
        {posts.map(p => (
          <Link key={p.id} to={`/blog/${p.id}`} className="group rounded-xl overflow-hidden border border-accent-gold/30 bg-white/70 backdrop-blur shadow-sm hover:shadow-lg transition cursor-pointer">
            <div className="aspect-video w-full overflow-hidden">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
            </div>
            <div className="p-5 flex flex-col h-full">
              <p className="text-[11px] uppercase tracking-widest text-brand-red mb-2">{p.date}</p>
              <h3 className="font-semibold font-serif text-lg mb-2 group-hover:text-accent-gold transition-colors">{p.title}</h3>
              <p className="text-sm text-neutral-600 mb-4 line-clamp-3">{p.excerpt}</p>
              <span className="mt-auto text-xs font-semibold tracking-wide text-brand-red hover:underline self-start">Read More</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);
export default BlogTeasersSection;
