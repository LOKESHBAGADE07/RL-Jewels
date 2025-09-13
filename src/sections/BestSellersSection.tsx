import SectionTitle from '../components/SectionTitle';
import Carousel from '../components/Carousel';
import ProductCard from '../components/ProductCard';
import { bestSellers } from '../data/products';

export const BestSellersSection = () => (
  <section id="best-sellers" className="section-padding bg-white/5">
    <div className="max-content">
      <SectionTitle subtitle="Popular" title="Best Sellers" />
      <Carousel className="mt-8">
        {bestSellers.map(p => (
          <div key={p.id} className="min-w-[240px] max-w-[240px]">
            <ProductCard product={p} />
          </div>
        ))}
      </Carousel>
    </div>
  </section>
);

export default BestSellersSection;