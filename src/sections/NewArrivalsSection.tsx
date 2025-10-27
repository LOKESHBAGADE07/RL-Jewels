import SectionTitle from '../components/SectionTitle';
import Carousel from '../components/Carousel';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';

export const NewArrivalsSection = () => {
  const { products } = useProducts();
  const newArrivals = products
    .filter(p => p.badge === 'New')
    .slice(0, 8);

  if (newArrivals.length === 0) return null;

  return (
    <section id="new-arrivals" className="section-padding">
      <div className="max-content">
        <SectionTitle subtitle="Fresh" title="New Arrivals" />
        <Carousel className="mt-8">
          {newArrivals.map(p => (
            <div key={p.id} className="min-w-[240px] max-w-[240px]">
              <ProductCard product={p} />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default NewArrivalsSection;