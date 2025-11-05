import React from 'react';
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
      <div className="grid md:grid-cols-3 gap-8">
        {posts.map(p => (
          <article key={p.id} className="group rounded-xl overflow-hidden border border-accent-gold/30 bg-white/70 backdrop-blur shadow-sm hover:shadow-lg transition">
            <div className="aspect-video w-full">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
            </div>
            <div className="p-5 flex flex-col h-full">
              <p className="text-[11px] uppercase tracking-widest text-brand-red mb-2">{p.date}</p>
              <h3 className="font-semibold font-serif text-lg mb-2 group-hover:text-accent-gold transition-colors">{p.title}</h3>
              <p className="text-sm text-neutral-600 mb-4 line-clamp-3">{p.excerpt}</p>
              <button className="mt-auto text-xs font-semibold tracking-wide text-brand-red hover:underline focus:outline-none focus-visible:ring focus-visible:ring-brand-red/40 self-start">Read More</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
export default BlogTeasersSection;
