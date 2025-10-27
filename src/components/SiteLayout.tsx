import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from '../sections/Footer';

export default function SiteLayout() {
  return (
    <>
      <Header />
      <main className="pt-20">{/* offset for fixed header */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
