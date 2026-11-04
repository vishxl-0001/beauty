import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar, Sparkles } from 'lucide-react';

export default function Lightbox({
  isOpen,
  currentItem,
  onClose,
  onPrev,
  onNext,
  onBookService,
}) {
  // Keyboard navigation & lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close lightbox"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-90"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Previous Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous photo"
          className="hidden sm:flex absolute left-4 md:left-8 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white items-center justify-center backdrop-blur-md transition-all active:scale-90"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next photo"
          className="hidden sm:flex absolute right-4 md:right-8 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white items-center justify-center backdrop-blur-md transition-all active:scale-90"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Lightbox Modal Content */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 15 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-4xl w-full max-h-[92vh] flex flex-col md:flex-row bg-[#FFFDF9] rounded-[32px] overflow-hidden shadow-2xl border border-white/40"
        >
          {/* Main Large Image Container */}
          <div className="relative md:w-3/5 max-h-[55vh] md:max-h-[85vh] bg-[#FAF3DF]/40 flex items-center justify-center overflow-hidden">
            <img
              src={currentItem.src}
              alt={currentItem.alt}
              style={{ objectPosition: currentItem.objectPosition || 'center center' }}
              className="w-full h-full object-contain md:object-cover max-h-[55vh] md:max-h-[85vh]"
            />
            {/* Cute Badge */}
            {currentItem.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white bg-[#C9A24B]/95 backdrop-blur-md shadow-sm">
                {currentItem.badge}
              </span>
            )}
          </div>

          {/* Details & Action Column */}
          <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-white text-left">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8C7355] mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
                <span>{currentItem.categoryName}</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#251B12] leading-snug mb-3">
                {currentItem.title}
              </h3>

              <p className="text-sm text-[#251B12]/75 leading-relaxed font-normal mb-6">
                {currentItem.subtitle || currentItem.alt}
              </p>

              <div className="p-3.5 rounded-2xl bg-[#FAF5EA] border border-[#EADBBA] text-xs text-[#251B12] space-y-1 mb-6">
                <p className="font-semibold text-[#A67C1E]">✦ Client Transformation Note</p>
                <p className="text-[#251B12]/80">
                  Customized for each client by Wendy at Norwen Beauty Salon, Terrace End, Palmerston North.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EADBBA] space-y-3">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBookService(currentItem.title);
                }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#DFB76C] to-[#B38728] text-white text-sm font-semibold shadow-md shadow-[#C9A24B]/25 hover:shadow-lg hover:shadow-[#C9A24B]/35 flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Look Like This</span>
              </button>

              <p className="text-[11px] text-center text-[#8C7355]">
                Press <kbd className="px-1.5 py-0.5 rounded bg-gray-100 text-[#251B12] font-mono">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-gray-100 text-[#251B12] font-mono">→</kbd> to browse • <kbd className="px-1.5 py-0.5 rounded bg-gray-100 text-[#251B12] font-mono">Esc</kbd> to exit
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
