import React, { useState, useEffect } from 'react';
import { ArrowUp, Heart, Phone, Mail, MapPin, Sparkles, Shield } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { useSalon } from '../context/SalonContext';

export default function Footer({ onBookClick, onOpenAdmin }) {
  const { businessDetails } = useSalon();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Wendyl', href: '#about' },
    { name: 'Service Menu', href: '#services' },
    { name: 'Photo Gallery', href: '#gallery' },
    { name: 'Client Reviews', href: '#reviews' },
    { name: 'Find Studio', href: '#contact' },
  ];

  return (
    <footer className="relative bg-[#271420] text-white pt-16 pb-28 md:pb-16 overflow-hidden">
      {/* Decorative Top Wave / Hairline */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A24B]/50 to-transparent" />

      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#E65D73]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand Info (col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white p-1 flex items-center justify-center shrink-0 shadow-md">
                <img src="/images/logo.png" alt="Norwen Beauty Salon" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-wide">
                  {businessDetails.name}
                </h3>
                <p className="text-xs uppercase tracking-widest text-[#F8A5B2]">
                  Palmerston North • New Zealand
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-white/75 leading-relaxed max-w-sm font-normal">
              A private boutique salon in Terrace End dedicated to exquisite balayage, custom haircutting, and artistic nail design by founder Wendyl Tagaan.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={businessDetails.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#E65D73] flex items-center justify-center transition-all"
              >
                <InstagramIcon className="w-4 h-4 text-white" />
              </a>
              <a
                href={`tel:${businessDetails.phoneRaw}`}
                aria-label="Phone"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#E65D73] flex items-center justify-center transition-all"
              >
                <Phone className="w-4 h-4 text-white" />
              </a>
              <a
                href={`mailto:${businessDetails.email}`}
                aria-label="Email"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#E65D73] flex items-center justify-center transition-all"
              >
                <Mail className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Navigation (col-span-3) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#C9A24B] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/80">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-[#F8A5B2] transition-colors inline-block py-0.5"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details (col-span-4) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#C9A24B] mb-4">
              Studio Location
            </h4>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#E65D73] shrink-0 mt-0.5" />
              <span>{businessDetails.address}</span>
            </p>
            <p className="text-xs sm:text-sm text-white/80 flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#E65D73] shrink-0" />
              <a href={`tel:${businessDetails.phoneRaw}`} className="hover:text-[#F8A5B2]">
                {businessDetails.phone}
              </a>
            </p>
            <p className="text-xs sm:text-sm text-white/80 flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#E65D73] shrink-0" />
              <a href={`mailto:${businessDetails.email}`} className="hover:text-[#F8A5B2] truncate">
                {businessDetails.email}
              </a>
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={onBookClick}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#E65D73] to-[#B76E79] text-white text-xs font-semibold shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Back to top button */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div className="flex items-center gap-4">
            <p>© {businessDetails.copyrightYear} Norwen Beauty Salon. All rights reserved.</p>
            <button
              type="button"
              onClick={onOpenAdmin}
              className="text-white/40 hover:text-[#F8A5B2] transition-colors flex items-center gap-1"
            >
              <Shield className="w-3 h-3" />
              <span>Staff Login</span>
            </button>
          </div>

          <p className="flex items-center gap-1 text-[#F8A5B2]">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 fill-[#E65D73] text-[#E65D73]" />
            <span>for Wendyl Tagaan</span>
          </p>

          {/* Back to top with Circular Scroll Fill */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group relative flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white"
          >
            {/* SVG Circle Progress */}
            <svg className="w-11 h-11 absolute inset-0 -rotate-90">
              <circle
                cx="22"
                cy="22"
                r="18"
                className="stroke-white/10 fill-none"
                strokeWidth="2"
              />
              <circle
                cx="22"
                cy="22"
                r="18"
                className="stroke-[#E65D73] fill-none transition-all duration-150"
                strokeWidth="2.5"
                strokeDasharray="113.1"
                strokeDashoffset={113.1 - (113.1 * scrollProgress) / 100}
                strokeLinecap="round"
              />
            </svg>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
