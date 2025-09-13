import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import CatalogPage from '@/pages/CatalogPage';
import ProductPage from '@/pages/ProductPage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';
import AccountPage from '@/pages/AccountPage';
import CollectionsPage from '@/pages/CollectionsPage';
import CollectionDetailPage from '@/pages/CollectionDetailPage';
import OccasionsPage from '@/pages/OccasionsPage';
import OccasionDetailPage from '@/pages/OccasionDetailPage';
import TermsPage from '@/pages/TermsPage';
import PrivacyPage from '@/pages/PrivacyPage';
import ShippingPolicyPage from '@/pages/ShippingPolicyPage';
import ReturnsPolicyPage from '@/pages/ReturnsPolicyPage';
import AboutPage from '@/pages/AboutPage';
import FAQPage from '@/pages/FAQPage';
import AdminPage from '@/pages/AdminPage';
import SiteLayout from '@/components/SiteLayout';
import OrderConfirmationPage from '@/pages/OrderConfirmationPage';
import OrderDetailPage from '@/pages/OrderDetailPage';

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
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
          <Route path="/returns-policy" element={<ReturnsPolicyPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="/order/:id" element={<OrderDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
