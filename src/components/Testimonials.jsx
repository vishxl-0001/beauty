import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles, CheckCircle2 } from 'lucide-react';
import { useSalon } from '../context/SalonContext';

export default function Testimonials() {
  const { testimonials } = useSalon();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play timer
  useEffect(() => {
    if (isPaused || !testimonials.length) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6500);

    return () => clearInterval(timer);
  }, [isPaused, testimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const activeTestimonial = testimonials[currentIndex];

  if (!activeTestimonial) return null;

  return (
    <section id="reviews" className="py-20 md:py-28 relative overflow-hidden bg-[#FFFDF9]">
      {/* Decorative Golden Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#FAF0D4]/30 via-[#FAF5EA]/50 to-[#F6EBD7]/30 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF5EA] border border-[#EADBBA] text-xs font-semibold text-[#A67C1E] uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
          <span>Client Testimonials</span>
        </div>

        <h2 className="text-fluid-h2 font-display font-medium text-[#251B12] tracking-tight mb-4">
          “We Take Care of Our Clients and Our People”
        </h2>

        <p className="text-sm sm:text-base text-[#251B12]/75 max-w-xl mx-auto leading-relaxed font-normal mb-12">
          Read genuine reviews from guests who trust Wendy for beautiful, affordable hair color, precision haircuts, relaxing foot spa treatments, and pedicures.
        </p>

        {/* Carousel Card Container */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="relative max-w-4xl mx-auto"
        >
          <div className="relative rounded-3xl glass-panel p-6 sm:p-10 md:p-12 border border-[#EADBBA] shadow-xl shadow-amber-950/5 overflow-hidden">
            {/* Background Quote Watermark */}
            <Quote className="absolute -top-4 -right-4 w-32 h-32 text-[#EADBBA]/25 rotate-12 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
                  {/* Left Column: Direct Authentic Review Screenshot Card */}
                  {activeTestimonial.proofImage ? (
                    <div className="md:col-span-5 flex justify-center">
                      <div className="relative w-full max-w-[340px] rounded-2xl overflow-hidden border border-[#EADBBA] shadow-md bg-[#FAF5EA] group">
                        <img
                          src={activeTestimonial.proofImage}
                          alt={`Verified review from ${activeTestimonial.name}`}
                          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-102"
                          loading="lazy"
                        />
                        <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md border border-[#EADBBA] text-[10px] font-bold text-[#A67C1E] flex items-center gap-1 shadow-2xs">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Verified Review</span>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {/* Right Column: Review Details & Quote */}
                  <div className={activeTestimonial.proofImage ? 'md:col-span-7 flex flex-col justify-center' : 'md:col-span-12 flex flex-col items-center text-center'}>
                    {/* 5-Star Rating */}
                    <div className="flex items-center gap-1.5 text-[#D4AF37] mb-4">
                      {[...Array(activeTestimonial.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#D4AF37]" />
                      ))}
                    </div>

                    {/* Quote Text */}
                    <p className="font-display italic text-lg sm:text-2xl text-[#251B12] leading-relaxed mb-6 font-normal">
                      “{activeTestimonial.quote}”
                    </p>

                    {/* Author Info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-display font-semibold text-xl text-[#251B12]">
                          {activeTestimonial.name}
                        </span>
                        <span className="text-xs text-[#8C7355]">• {activeTestimonial.location}</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="text-xs font-semibold text-[#A67C1E] bg-[#FAF5EA] px-3 py-1 rounded-full border border-[#EADBBA]">
                          {activeTestimonial.treatment}
                        </span>

                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>100% Legitimate</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous review"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 hover:bg-white border border-[#EADBBA] text-[#251B12] shadow-sm flex items-center justify-center transition-all active:scale-90 z-20"
            >
              <ChevronLeft className="w-5 h-5 text-[#251B12]" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next review"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 hover:bg-white border border-[#EADBBA] text-[#251B12] shadow-sm flex items-center justify-center transition-all active:scale-90 z-20"
            >
              <ChevronRight className="w-5 h-5 text-[#251B12]" />
            </button>
          </div>

          {/* Carousel Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx
                    ? 'w-8 bg-gradient-to-r from-[#D4AF37] to-[#B38728]'
                    : 'w-2 bg-[#EADBBA] hover:bg-[#C9A24B]/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
