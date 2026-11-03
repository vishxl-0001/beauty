import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, ArrowRight, Star, MapPin, Heart, ShieldCheck } from 'lucide-react';
import { businessDetails, trustChips } from '../data/content';
import { salonImages } from '../data/images';

export default function Hero({ onBookClick, onServicesClick }) {
  const headlineWords = ['Where', 'Beauty', 'Meets', 'Elegance'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-[92svh] md:min-h-[95vh] flex items-center justify-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden"
    >
      {/* Background Soft Blobs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-tr from-[#F8E1E4]/70 to-[#FDF4F5]/40 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-80 h-80 md:w-[450px] md:h-[450px] rounded-full bg-gradient-to-bl from-[#F6EBDD]/60 via-[#FDF2F4]/50 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Text & CTAs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start text-left z-10"
          >
            {/* Cute Eyebrow Tag */}
            <motion.div
              variants={wordVariants}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#F8E1E4] shadow-xs text-xs md:text-sm font-medium text-[#B76E79] mb-5 backdrop-blur-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C9A24B] animate-spin" style={{ animationDuration: '6s' }} />
              <span className="font-script text-base text-[#E65D73] font-normal mr-1">Boutique Sanctuary</span>
              <span>• Terrace End, Palmerston North</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-fluid-hero font-display font-medium text-[#3B2230] tracking-tight leading-[1.08] mb-6">
              {headlineWords.map((word, index) => (
                <span key={word} className="inline-block mr-2.5 sm:mr-3.5">
                  <motion.span
                    variants={wordVariants}
                    className={`inline-block ${
                      word === 'Elegance'
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#E65D73] via-[#B76E79] to-[#C9A24B] italic'
                        : ''
                    }`}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <motion.p
              variants={wordVariants}
              className="text-base sm:text-lg md:text-xl text-[#3B2230]/80 font-normal leading-relaxed max-w-2xl mb-8"
            >
              {businessDetails.subheadline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={wordVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-10"
            >
              {/* Primary: Book Appointment */}
              <button
                type="button"
                onClick={onBookClick}
                className="relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-sm md:text-base font-semibold text-white shadow-lg shadow-[#E65D73]/25 hover:shadow-xl hover:shadow-[#E65D73]/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all overflow-hidden group bg-gradient-to-r from-[#E65D73] via-[#D97D8D] to-[#C9A24B]"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              </button>

              {/* Secondary: View Services */}
              <button
                type="button"
                onClick={onServicesClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm md:text-base font-medium text-[#3B2230] bg-white/90 hover:bg-white border border-[#F8E1E4] hover:border-[#E65D73]/40 shadow-xs hover:shadow-md transition-all active:scale-95"
              >
                <span>Explore Services</span>
              </button>
            </motion.div>

            {/* Trust Chips Row */}
            <motion.div
              variants={wordVariants}
              className="pt-6 border-t border-[#F8E1E4]/70 w-full flex flex-wrap items-center gap-2.5 sm:gap-3"
            >
              {trustChips.map((chip, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 border border-[#F8E1E4]/60 text-xs text-[#3B2230]/85 font-medium shadow-xs"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E65D73]" />
                  <span>{chip}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Visual Composition */}
          <div className="lg:col-span-5 relative flex justify-center items-center mt-4 lg:mt-0">
            {/* Ambient Background Aura */}
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              <div className="w-[300px] h-[400px] md:w-[380px] md:h-[500px] rounded-full bg-gradient-to-b from-[#F8A5B2]/30 via-[#FDF4F5]/60 to-[#C9A24B]/20 blur-2xl transform rotate-6" />
            </div>

            {/* Main Arch Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px]"
            >
              {/* Outer Decorative Gold Hairline Border Frame */}
              <div className="p-3 sm:p-4 rounded-[42px] arch-mask bg-white/60 backdrop-blur-md border border-[#F8E1E4] shadow-2xl shadow-rose-950/10">
                <div className="relative overflow-hidden rounded-[32px] arch-mask aspect-[3/4] bg-[#F8E1E4]/40">
                  <img
                    src={salonImages.hairHoneyBlonde.src}
                    alt={salonImages.hairHoneyBlonde.alt}
                    style={{ objectPosition: salonImages.hairHoneyBlonde.objectPosition }}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    fetchPriority="high"
                  />
                  {/* Subtle Gradient Shade at Bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3B2230]/40 via-transparent to-transparent opacity-60" />

                  {/* Bottom Overlay Label */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-white/90 backdrop-blur-md border border-white/40 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-[#B76E79] font-semibold">
                        Salon Work
                      </p>
                      <p className="text-xs font-semibold text-[#3B2230]">
                        Signature Champagne Balayage
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#E65D73] bg-[#FFF0F3] px-2 py-0.5 rounded-full">
                      <Heart className="w-3 h-3 fill-[#E65D73]" />
                      <span>By Wendyl</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Top-Right Cute Emblem */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-5 -right-3 sm:-right-6 p-2.5 rounded-2xl glass-panel shadow-lg border border-white/80 flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#E65D73] to-[#C9A24B] p-0.5">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <img src="/images/logo.png" alt="Logo" className="w-5 h-5 object-contain" />
                  </div>
                </div>
                <div className="pr-1 text-left">
                  <div className="flex items-center text-[#C9A24B]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#C9A24B]" />
                    ))}
                  </div>
                  <p className="text-[10px] font-semibold text-[#3B2230]">5.0 Boutique Salon</p>
                </div>
              </motion.div>

              {/* Floating Bottom-Left Luxury Thumbnail: Pearl French Nails */}
              <motion.div
                animate={{ y: [0, 8, 0], rotate: [0, -2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-6 -left-3 sm:-left-8 p-2 rounded-2xl glass-panel shadow-xl border border-white/80 flex items-center gap-3 max-w-[210px]"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#F8E1E4]">
                  <img
                    src={salonImages.nailsPearlFrench.src}
                    alt={salonImages.nailsPearlFrench.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="text-left pr-2">
                  <span className="text-[10px] font-bold text-[#E65D73] uppercase tracking-wider block">
                    Couture Nails
                  </span>
                  <p className="text-xs font-semibold text-[#3B2230] leading-tight">
                    Pearl French Art
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
