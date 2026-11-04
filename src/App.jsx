import React, { useState, useEffect } from 'react';
import { SalonProvider, useSalon } from './context/SalonContext';
import Preloader from './components/Preloader';
import SparkleCursor from './components/SparkleCursor';
import FloatingParticles from './components/FloatingParticles';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarqueeStrip from './components/MarqueeStrip';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import BookingSection from './components/BookingSection';
import ContactLocation from './components/ContactLocation';
import Footer from './components/Footer';
import MobileBottomBar from './components/MobileBottomBar';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';

function SalonApp() {
  const [selectedService, setSelectedService] = useState(null);
  const [currentView, setCurrentView] = useState('website'); // 'website' | 'admin'
  const [adminUser, setAdminUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const { refreshData } = useSalon();

  // Listen to hash / url changes (e.g. #admin or /admin)
  useEffect(() => {
    const checkRoute = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      if (hash === '#admin' || path === '/admin') {
        setCurrentView('admin');
      }
    };

    checkRoute();
    window.addEventListener('hashchange', checkRoute);
    return () => window.removeEventListener('hashchange', checkRoute);
  }, []);

  // Verify stored session token
  useEffect(() => {
    const verifyStoredSession = async () => {
      const token = localStorage.getItem('norwen_admin_token');
      if (!token) {
        setIsCheckingAuth(false);
        return;
      }

      try {
        const res = await fetch('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setAdminUser(data.user);
          }
        } else {
          localStorage.removeItem('norwen_admin_token');
        }
      } catch (err) {
        // Backend might be offline during initial client boot
      } finally {
        setIsCheckingAuth(false);
      }
    };

    verifyStoredSession();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {}
    localStorage.removeItem('norwen_admin_token');
    setAdminUser(null);
    refreshData(); // refresh any changes in public view
  };

  const handleBookClick = () => {
    const el = document.querySelector('#booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleServicesClick = () => {
    const el = document.querySelector('#services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceTitle) => {
    setSelectedService({ title: serviceTitle, key: Date.now() });
    const el = document.querySelector('#booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If Admin View is active
  if (currentView === 'admin') {
    if (!adminUser) {
      return (
        <AdminLogin
          onLoginSuccess={(user) => {
            setAdminUser(user);
          }}
          onBackToSite={() => {
            window.location.hash = '';
            setCurrentView('website');
            refreshData();
          }}
        />
      );
    }

    return (
      <AdminDashboard
        user={adminUser}
        onLogout={handleLogout}
        onBackToSite={() => {
          window.location.hash = '';
          setCurrentView('website');
          refreshData();
        }}
      />
    );
  }

  // Public Salon Website
  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden bg-[#FFFDF9] text-[#251B12]">
      {/* 1. Page Load Intro Preloader */}
      <Preloader />

      {/* 2. Custom Sparkle Trail Cursor (Desktop only) */}
      <SparkleCursor />

      {/* 3. Floating Cute Petals & Sparkles Background */}
      <FloatingParticles />

      {/* 4. Sticky Header & Navigation with Admin Access */}
      <Navbar
        onBookClick={handleBookClick}
        onOpenAdmin={() => {
          window.location.hash = 'admin';
          setCurrentView('admin');
        }}
      />

      {/* Main Page Landmark */}
      <main>
        {/* 5. Hero Section */}
        <Hero onBookClick={handleBookClick} onServicesClick={handleServicesClick} />

        {/* 6. Continuous Marquee Ticker */}
        <MarqueeStrip />

        {/* 7. About Wendyl Tagaan & Studio */}
        <About />

        {/* 8. Curated Services Menu with Live Prices & Booking Pre-fill */}
        <Services onSelectService={handleSelectService} />

        {/* 9. Why Choose Us / Salon Experience */}
        <WhyChooseUs />

        {/* 10. Living Gallery with Live Uploaded Photos & Lightbox */}
        <Gallery onBookService={handleSelectService} />

        {/* 11. Guest Reviews Carousel */}
        <Testimonials />

        {/* 12. Interactive Booking Section (Connected to Backend API) */}
        <BookingSection preSelectedService={selectedService} />

        {/* 13. Contact Details, Live Hours & Google Map */}
        <ContactLocation />
      </main>

      {/* 14. Luxury Footer with Circular Scroll-Fill Back to Top & Staff Login */}
      <Footer
        onBookClick={handleBookClick}
        onOpenAdmin={() => {
          window.location.hash = 'admin';
          setCurrentView('admin');
        }}
      />

      {/* 15. Mobile Sticky Bottom Quick-Action Bar */}
      <MobileBottomBar onBookClick={handleBookClick} />
    </div>
  );
}

export default function App() {
  return (
    <SalonProvider>
      <SalonApp />
    </SalonProvider>
  );
}
