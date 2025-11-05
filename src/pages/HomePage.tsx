import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import CollectionsSection from '../sections/CollectionsSection';
import NewArrivalsSection from '../sections/NewArrivalsSection';
import BestSellersSection from '../sections/BestSellersSection';
import PromisesSection from '../sections/PromisesSection';
import SavingsPlanSection from '../sections/SavingsPlanSection';
import ShopByOccasionSection from '../sections/ShopByOccasionSection';
import HeritageTimelineSection from '../sections/HeritageTimelineSection';
import FAQSection from '../sections/FAQSection';
import BlogTeasersSection from '../sections/BlogTeasersSection';
import LoyaltyProgramSection from '../sections/LoyaltyProgramSection';
import WhyChooseUsSection from '../sections/WhyChooseUsSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import StoresSection from '../sections/StoresSection';
import ContactSection from '../sections/ContactSection';
import useDocumentTitle from '../lib/useDocumentTitle';

// Professional Homepage Layout - Following Jewelry Industry Standards
export default function HomePage() {
  useDocumentTitle('RL Jewels - Premium Gold, Diamond & Bridal Jewelry | Jalgaon, Nashik, Thane');
  return (
    <>
      <div>
        {/* 1. HERO - First Impression */}
        <HeroSection />
        
        {/* 2. ABOUT - Company Information */}
        <AboutSection />
        
        {/* 3. WHY CHOOSE US - Trust Building */}
        <WhyChooseUsSection />
        
        {/* 4. COLLECTIONS - Main Categories */}
        <CollectionsSection />
        
        {/* 5. NEW ARRIVALS - Latest Products */}
        <NewArrivalsSection />
        
        {/* 6. SHOP BY OCCASION - Lifestyle Categorization */}
        <ShopByOccasionSection />
        
        {/* 7. BEST SELLERS - Social Proof */}
        <BestSellersSection />
        
        {/* 8. SAVINGS PLAN - Financial Solutions */}
        <SavingsPlanSection />
        
        {/* 9. LOYALTY PROGRAM - Customer Retention */}
        <LoyaltyProgramSection />
        
        {/* 10. HERITAGE - Brand Story */}
        <HeritageTimelineSection />
        
        {/* 11. PROMISES - Value Proposition */}
        <PromisesSection />
        
        {/* 12. TESTIMONIALS - Customer Reviews */}
        <TestimonialsSection />
        
        {/* 13. BLOG - Educational Content */}
        <BlogTeasersSection />
        
        {/* 14. FAQ - Quick Answers */}
        <FAQSection />
        
        {/* 15. STORES - Physical Locations */}
        <StoresSection />
        
        {/* 16. CONTACT - Lead Generation */}
        <ContactSection />
      </div>
    </>
  );
}
