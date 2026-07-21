import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatWidget from './ChatWidget';
import QuickContactButtons from './QuickContactButtons';
import CompareBar from './CompareBar';
import OfferBanner from './OfferBanner';

const PublicLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="bg-stone min-h-screen flex flex-col">
      <OfferBanner />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <QuickContactButtons />
      <ChatWidget />
      <CompareBar />
    </div>
  );
};

export default PublicLayout;
