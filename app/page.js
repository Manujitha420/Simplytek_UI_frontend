'use client';

import { useState, useEffect } from 'react';
import MarqueeBar from '../components/MarqueeBar';
import Navbar from '../components/Navbar';
import HeroSlider from '../components/HeroSlider';
import AuthView from '../components/AuthView';
import CartDrawer from '../components/CartDrawer';
import SearchModal from '../components/SearchModal';
import AuthModal from '../components/AuthModal';
import Toast from '../components/Toast';

export default function Home() {
  const [currentView, setCurrentView] = useState('store'); // 'store' or 'auth'
  const [authTab, setAuthTab] = useState('signin');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Cart state
  const [cartItems, setCartItems] = useState([
    {
      title: 'Sony WH-1000XM6 Wireless Headphones',
      price: 399,
      quantity: 1,
      image: '/Images/Crop/Gemini_Generated_Image_e5g5lee5g5lee5g5-nobg.png'
    },
    {
      title: 'DJI Avata 4K FPV Drone',
      price: 999,
      quantity: 1,
      image: '/Images/Crop/Gemini_Generated_Image_c1dnnkc1dnnkc1dn.png'
    }
  ]);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3200);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Automatic slide transition every 5 seconds (5000ms)
  useEffect(() => {
    if (currentView !== 'store') return;

    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 5);
    }, 5000);

    return () => clearInterval(slideTimer);
  }, [currentView, currentSlide]);

  const handleAddToCart = (item) => {
    setCartItems((prevItems) => {
      const existingIdx = prevItems.findIndex((i) => i.title === item.title);
      if (existingIdx > -1) {
        const updated = [...prevItems];
        updated[existingIdx].quantity += 1;
        return updated;
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (index, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCartItems((prevItems) => {
      const updated = [...prevItems];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveCartItem = (index) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems[index];
      if (itemToRemove) {
        triggerToast(`Removed ${itemToRemove.title} from cart.`);
      }
      return prevItems.filter((_, i) => i !== index);
    });
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleGoToAuthView = (tab = 'signin') => {
    setAuthTab(tab);
    setCurrentView('auth');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-root">
      {/* Toast Alert */}
      <Toast message={toastMessage} />

      {/* Main Store View */}
      {currentView === 'store' && (
        <div className="view-panel store-view active-view">
          <MarqueeBar />

          <Navbar
            scrolled={scrolled}
            currentSlide={currentSlide}
            onSelectSlide={(idx) => setCurrentSlide(idx)}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenCart={() => setIsCartOpen(true)}
            cartCount={totalCartCount}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            onGoToAuthView={handleGoToAuthView}
          />

          <main>
            <HeroSlider
              currentSlide={currentSlide}
              onSelectSlide={(idx) => setCurrentSlide(idx)}
              onShowToast={triggerToast}
              onAddToCart={handleAddToCart}
            />
          </main>
        </div>
      )}

      {/* Dedicated Auth View */}
      {currentView === 'auth' && (
        <AuthView
          initialTab={authTab}
          onBackToStore={() => setCurrentView('store')}
          onShowToast={triggerToast}
        />
      )}

      {/* Quick Auth Choice Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSelectTab={(tab) => handleGoToAuthView(tab)}
        onShowToast={triggerToast}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onShowToast={triggerToast}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onShowToast={triggerToast}
      />
    </div>
  );
}
