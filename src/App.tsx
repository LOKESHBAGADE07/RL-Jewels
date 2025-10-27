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
import FAQPage from '@/pages/FAQPage';
import SiteLayout from '@/components/SiteLayout';
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
import ProtectedRoute from '@/components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/collection/:id" element={<CollectionDetailPage />} />
          <Route path="/occasions" element={<OccasionsPage />} />
          <Route path="/occasion/:id" element={<OccasionDetailPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FAQPage />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/edit/:id" element={<ProductForm />} />
          <Route path="testimonials" element={<TestimonialsManager />} />
          <Route path="testimonials/new" element={<TestimonialForm />} />
          <Route path="testimonials/edit/:id" element={<TestimonialForm />} />
          <Route path="blog" element={<BlogManager />} />
          <Route path="blog/new" element={<BlogForm />} />
          <Route path="blog/edit/:id" element={<BlogForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
