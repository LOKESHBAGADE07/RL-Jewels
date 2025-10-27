import SectionTitle from '../components/SectionTitle';
import Carousel from '../components/Carousel';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';

export const BestSellersSection = () => {
  const { products } = useProducts();
  const bestSellers = products
    .filter(p => p.badge === 'Sale' || p.originalPrice)
    .slice(0, 8);

  if (bestSellers.length === 0) return null;

  return (
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
};

export default BestSellersSection;