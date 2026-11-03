import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, Heart, Sparkles } from 'lucide-react';
import { useSalon } from '../context/SalonContext';

export default function Testimonials() {
  const { testimonials } = useSalon();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const activeTestimonial = testimonials[currentIndex];

  return (
    <section id="reviews" className="py-20 md:py-28 relative overflow-hidden bg-[#FFFDFB]">
      {/* Decorative Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#F8E1E4]/30 via-[#FFF0F3]/40 to-[#F6EBDD]/30 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF0F3] border border-[#F8E1E4] text-xs font-semibold text-[#E65D73] uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
          <span>Guest Love & Kind Words</span>
        </div>

        <h2 className="text-fluid-h2 font-display font-medium text-[#3B2230] tracking-tight mb-4">
          Client Experiences
        </h2>

        <p className="text-sm sm:text-base text-[#3B2230]/75 max-w-xl mx-auto leading-relaxed font-normal mb-12">
          Read what local guests from Terrace End, Palmerston North, and the wider Manawatū have to say about their pampering sessions.
        </p>

        {/* Carousel Card Container */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="relative max-w-3xl mx-auto"
        >
          <div className="relative rounded-3xl glass-panel p-8 sm:p-12 border border-[#F8E1E4] shadow-xl shadow-rose-950/5 overflow-hidden">
            {/* Cute Background Quote Watermark */}
            <Quote className="absolute -top-4 -right-4 w-32 h-32 text-[#F8E1E4]/30 rotate-12 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex flex-col items-center"
              >
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1.5 text-[#C9A24B] mb-6">
                  {[...Array(activeTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#C9A24B]" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="font-display italic text-lg sm:text-2xl text-[#3B2230] leading-relaxed mb-8 max-w-2xl font-normal">
                  “{activeTestimonial.quote}”
                </p>

                {/* Author Info */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-semibold text-lg text-[#3B2230]">
                      {activeTestimonial.name}
                    </span>
                    <span className="text-xs text-[#B76E79]">• {activeTestimonial.location}</span>
                  </div>
                  <span className="text-xs font-semibold text-[#E65D73] bg-[#FFF0F3] px-3 py-0.5 rounded-full mt-1.5 border border-[#F8E1E4]">
                    {activeTestimonial.treatment}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous review"
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white border border-[#F8E1E4] text-[#3B2230] shadow-sm flex items-center justify-center transition-all active:scale-90"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next review"
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white border border-[#F8E1E4] text-[#3B2230] shadow-sm flex items-center justify-center transition-all active:scale-90"
            >
              <ChevronRight className="w-5 h-5" />
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
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === idx
                    ? 'w-7 h-2 bg-[#E65D73]'
                    : 'w-2 h-2 bg-[#F8A5B2]/40 hover:bg-[#F8A5B2]'
                }`}
              />
            ))}
          </div>

          <p className="text-[11px] text-[#B76E79]/80 italic mt-3">
            * Generic demo testimonials representative of client feedback [Confirm with Wendyl]
          </p>
        </div>
      </div>
    </section>
  );
}
