import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import CollectionsSection from '../sections/CollectionsSection';
import NewArrivalsSection from '../sections/NewArrivalsSection';
import BestSellersSection from '../sections/BestSellersSection';
import PromisesSection from '../sections/PromisesSection';
import SavingsPlanSection from '../sections/SavingsPlanSection';
import SavingsCalculator from '../components/SavingsCalculator';
import ShopByOccasionSection from '../sections/ShopByOccasionSection';
import HeritageTimelineSection from '../sections/HeritageTimelineSection';
import FAQSection from '../sections/FAQSection';
import BlogTeasersSection from '../sections/BlogTeasersSection';
import LoyaltyProgramSection from '../sections/LoyaltyProgramSection';
import WhyChooseUsSection from '../sections/WhyChooseUsSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import ContactSection from '../sections/ContactSection';
import useDocumentTitle from '../lib/useDocumentTitle';

// Enhanced HomePage with all new features
export default function HomePage() {
  useDocumentTitle('Home');
  return (
    <>
      <div>
        <HeroSection />
        <WhyChooseUsSection />
        <CollectionsSection />
        <NewArrivalsSection />
        <BestSellersSection />
        <AboutSection />
        <ShopByOccasionSection />
        <SavingsPlanSection />
        <SavingsCalculator />
        <LoyaltyProgramSection />
        <HeritageTimelineSection />
        <PromisesSection />
        <TestimonialsSection />
        <FAQSection />
        <BlogTeasersSection />
        <ContactSection />
      </div>
    </>
  );
}
