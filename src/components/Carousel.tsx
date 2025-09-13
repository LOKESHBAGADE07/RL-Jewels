import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type CarouselProps = { children: React.ReactNode; className?: string };

export const Carousel = ({ children, className = '' }: CarouselProps) => {
  const [emblaRef, embla] = useEmblaCarousel({ dragFree: true, containScroll: 'trimSnaps' });
  const prev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const next = useCallback(() => embla && embla.scrollNext(), [embla]);
  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {children}
        </div>
      </div>
  <button aria-label="Previous" onClick={prev} className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-accent-gold p-3 rounded-full">
        <FaChevronLeft />
      </button>
  <button aria-label="Next" onClick={next} className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-accent-gold p-3 rounded-full">
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Carousel;