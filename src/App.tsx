import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import CatalogPage from '@/pages/CatalogPage';
import ProductPage from '@/pages/ProductPage';
import CollectionsPage from '@/pages/CollectionsPage';
import CollectionDetailPage from '@/pages/CollectionDetailPage';
import OccasionsPage from '@/pages/OccasionsPage';
import OccasionDetailPage from '@/pages/OccasionDetailPage';
import TermsPage from '@/pages/TermsPage';
import PrivacyPage from '@/pages/PrivacyPage';
import AboutPage from '@/pages/AboutPage';
import HeritagePage from '@/pages/HeritagePage';
import FAQPage from '@/pages/FAQPage';
import SiteLayout from '@/components/SiteLayout';
import ScrollToTop from '@/components/ScrollToTop';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminLayout from '@/components/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import ProductForm from '@/pages/admin/ProductForm';
import TestimonialsManager from '@/pages/admin/TestimonialsManager';
import TestimonialForm from '@/pages/admin/TestimonialForm';
import TestimonialsPage from '@/pages/TestimonialsPage';
import BlogManager from '@/pages/admin/BlogManager';
import BlogForm from '@/pages/admin/BlogForm';
import BlogListPage from '@/pages/BlogListPage';
import BlogPostPage from '@/pages/BlogPostPage';
import InquiriesManager from '@/pages/admin/InquiriesManager';
import AnalyticsDashboard from '@/pages/admin/AnalyticsDashboard';
import CollectionsManager from '@/pages/admin/CollectionsManager';
import CollectionForm from '@/pages/admin/CollectionForm';
import HeroBannersManager from '@/pages/admin/HeroBannersManager';
import HeroBannerForm from '@/pages/admin/HeroBannerForm';
import ProtectedRoute from '@/components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* PUBLIC ROUTES - Customer Facing Website */}
        <Route element={<SiteLayout />}>
          {/* Homepage */}
          <Route path="/" element={<HomePage />} />
          
          {/* Shop - Product Discovery */}
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/collection/:id" element={<CollectionDetailPage />} />
          <Route path="/occasions" element={<OccasionsPage />} />
          <Route path="/occasion/:id" element={<OccasionDetailPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          
          {/* Company - About & Trust */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/heritage" element={<HeritagePage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          
          {/* Resources - Education & Support */}
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/faq" element={<FAQPage />} />
          
          {/* Legal - Policies */}
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Route>

        {/* ADMIN ROUTES - Backend Management */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          {/* Dashboard */}
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="analytics" element={<AnalyticsDashboard />} />
          
          {/* Content Management */}
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/edit/:id" element={<ProductForm />} />
          <Route path="collections" element={<CollectionsManager />} />
          <Route path="collections/new" element={<CollectionForm />} />
          <Route path="collections/edit/:id" element={<CollectionForm />} />
          <Route path="hero-banners" element={<HeroBannersManager />} />
          <Route path="hero-banners/new" element={<HeroBannerForm />} />
          <Route path="hero-banners/edit/:id" element={<HeroBannerForm />} />
          
          {/* Marketing */}
          <Route path="blog" element={<BlogManager />} />
          <Route path="blog/new" element={<BlogForm />} />
          <Route path="blog/edit/:id" element={<BlogForm />} />
          <Route path="testimonials" element={<TestimonialsManager />} />
          <Route path="testimonials/new" element={<TestimonialForm />} />
          <Route path="testimonials/edit/:id" element={<TestimonialForm />} />
          
          {/* Customer Service */}
          <Route path="inquiries" element={<InquiriesManager />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
