import React, { useState } from 'react';
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

export default function App() {
  const [selectedService, setSelectedService] = useState('');

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
    setSelectedService(serviceTitle);
    const el = document.querySelector('#booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden bg-[#FFFDFB] text-[#3B2230]">
      {/* 1. Page Load Intro Preloader */}
      <Preloader />

      {/* 2. Custom Sparkle Trail Cursor (Desktop only) */}
      <SparkleCursor />

      {/* 3. Floating Cute Petals & Sparkles Background */}
      <FloatingParticles />

      {/* 4. Sticky Header & Navigation */}
      <Navbar onBookClick={handleBookClick} />

      {/* Main Page Landmark */}
      <main>
        {/* 5. Hero Section */}
        <Hero onBookClick={handleBookClick} onServicesClick={handleServicesClick} />

        {/* 6. Continuous Marquee Ticker */}
        <MarqueeStrip />

        {/* 7. About Wendyl Tagaan & Studio */}
        <About />

        {/* 8. Curated Services Menu with Booking Pre-fill */}
        <Services onSelectService={handleSelectService} />

        {/* 9. Why Choose Us / Salon Experience */}
        <WhyChooseUs />

        {/* 10. Living Gallery & Full Lightbox */}
        <Gallery onBookService={handleSelectService} />

        {/* 11. Guest Reviews Carousel */}
        <Testimonials />

        {/* 12. Interactive Booking Section (Front-End) */}
        <BookingSection preSelectedService={selectedService} />

        {/* 13. Contact Details, Hours & Google Map */}
        <ContactLocation />
      </main>

      {/* 14. Luxury Footer with Circular Scroll-Fill Back to Top */}
      <Footer onBookClick={handleBookClick} />

      {/* 15. Mobile Sticky Bottom Quick-Action Bar */}
      <MobileBottomBar onBookClick={handleBookClick} />
    </div>
  );
}
