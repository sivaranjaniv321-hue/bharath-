import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FoodDetailModal } from './components/FoodDetailModal';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { AboutPage } from './pages/AboutPage';
import { MyOrdersPage } from './pages/MyOrdersPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';

function AppShell() {
  const { route, toastMessage } = useStore();

  const renderPage = () => {
    switch (route) {
      case 'menu':
        return <MenuPage />;
      case 'about':
        return <AboutPage />;
      case 'orders':
        return <MyOrdersPage />;
      case 'reviews':
        return <ReviewsPage />;
      case 'contact':
        return <ContactPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-success':
        return <OrderSuccessPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF8F1] text-[#2C1A15]">
      <Navbar />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
      <FoodDetailModal />

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl bg-[#2C1A15] text-[#FCF8F1] text-sm font-medium shadow-lg border border-[#D49B1A]/40"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppShell />
    </StoreProvider>
  );
}
