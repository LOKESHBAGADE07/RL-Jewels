import { Outlet } from 'react-router-dom';
import MetalRateTicker from './MetalRateTicker';
import Header from './Header';
import Footer from '../sections/Footer';

export default function SiteLayout() {
  return (
    <>
      <MetalRateTicker />
      <Header />
      <main className="pt-20">{/* offset for fixed header */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
