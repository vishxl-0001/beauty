import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, Menu, X, Phone, Heart } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { businessDetails } from '../data/content';

export default function Navbar({ onBookClick, onOpenAdmin }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Smooth scroll & smart hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > 120) {
        if (currentScrollY > lastScrollY && !mobileMenuOpen) {
          setIsVisible(false); // scrolling down
        } else {
          setIsVisible(true); // scrolling up
        }
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services & Pricing', href: '#services' },
    { name: 'Wendy', href: '#about' },
    { name: 'Lookbook', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Visit Us', href: '#contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled
            ? 'glass-panel shadow-sm py-2.5 bg-white/90 backdrop-blur-md border-b border-[#EADBBA]/70'
            : 'bg-transparent py-4 md:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Monogram */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24B] rounded-xl p-1"
          >
            <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-full p-0.5 bg-gradient-to-tr from-[#D4AF37] via-[#E6C36E] to-[#B38728] shadow-sm transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                <img
                  src="/images/logo.png"
                  alt="Norwen Beauty Salon"
                  className="w-full h-full object-contain p-1"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl md:text-2xl font-semibold tracking-tight text-[#251B12] leading-none group-hover:text-[#A67C1E] transition-colors">
                Norwen
              </span>
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#8C7355] font-medium mt-0.5">
                Beauty Salon
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="relative text-sm font-medium text-[#251B12]/85 hover:text-[#A67C1E] transition-colors py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#D4AF37] to-[#B88E2E] transition-all duration-300 group-hover:w-full rounded-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Quick Instagram Link (Desktop) */}
            <a
              href={businessDetails.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Norwen Beauty Salon on Instagram"
              className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full bg-[#FAF5EA] border border-[#EADBBA] text-[#8C7355] hover:text-[#A67C1E] hover:border-[#C9A24B]/60 hover:scale-105 transition-all shadow-xs"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>

            {/* Quick Call Link (Desktop) */}
            <a
              href={`tel:${businessDetails.phoneRaw}`}
              aria-label={`Call Norwen Beauty Salon at ${businessDetails.phone}`}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF5EA] border border-[#EADBBA] text-xs font-medium text-[#251B12] hover:text-[#A67C1E] hover:border-[#C9A24B]/50 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span className="hidden xl:inline">{businessDetails.phone}</span>
              <span className="xl:hidden">Call</span>
            </a>

            {/* Book Now Shimmer Button */}
            <button
              onClick={() => {
                if (onBookClick) onBookClick();
                else {
                  const el = document.querySelector('#booking');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="relative inline-flex items-center justify-center gap-2 px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-semibold text-white shadow-md shadow-[#C9A24B]/25 hover:shadow-lg hover:shadow-[#C9A24B]/35 active:scale-95 transition-all overflow-hidden group bg-gradient-to-r from-[#D4AF37] via-[#DFB76C] to-[#B38728]"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-100" />
                <span>Book Appointment</span>
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#251B12] hover:bg-[#FAF4E8] focus:outline-none focus:ring-2 focus:ring-[#C9A24B]"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#A67C1E]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 z-30 lg:hidden bg-[#FFFDF9]/98 backdrop-blur-xl flex flex-col justify-between pt-24 pb-8 px-6 overflow-y-auto"
          >
            {/* Ambient gold glow behind menu */}
            <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-[#FAF1DA]/70 blur-3xl -z-10" />

            <div className="flex flex-col space-y-4">
              <span className="text-xs uppercase tracking-[0.25em] text-[#8C7355] font-medium border-b border-[#EADBBA] pb-2">
                Explore Norwen Salon
              </span>
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 + 0.1 }}
                  className="font-display text-2xl font-medium text-[#251B12] hover:text-[#A67C1E] py-2 flex items-center justify-between border-b border-[#EADBBA]/40"
                >
                  <span>{link.name}</span>
                  <Sparkles className="w-4 h-4 text-[#C9A24B] opacity-75" />
                </motion.a>
              ))}
            </div>

            {/* Bottom Actions & Contacts */}
            <div className="pt-6 space-y-4 border-t border-[#EADBBA]">
              <div className="flex items-center justify-between text-sm text-[#251B12]">
                <span>Palmerston North</span>
                <span className="font-script text-lg text-[#A67C1E]">Elegance & Radiance</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${businessDetails.phoneRaw}`}
                  className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-white border border-[#EADBBA] text-[#251B12] text-sm font-medium shadow-xs"
                >
                  <Phone className="w-4 h-4 text-[#C9A24B]" />
                  <span>Call Studio</span>
                </a>
                <a
                  href={businessDetails.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-white border border-[#EADBBA] text-[#251B12] text-sm font-medium shadow-xs"
                >
                  <InstagramIcon className="w-4 h-4 text-[#C9A24B]" />
                  <span>Instagram</span>
                </a>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  const el = document.querySelector('#booking');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#DFB76C] to-[#B38728] text-white font-semibold text-sm shadow-md shadow-[#C9A24B]/25 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment Online</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
