import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Heart, Calendar, Sparkles } from 'lucide-react';

export default function Lightbox({
  isOpen,
  currentItem,
  onClose,
  onPrev,
  onNext,
  onBookService,
}) {
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
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#271420]/90 backdrop-blur-xl"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Lightbox"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 w-11 h-11 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#3B2230] backdrop-blur-md flex items-center justify-center transition-all shadow-lg active:scale-90"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Previous Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous Image"
          className="absolute left-2 sm:left-6 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#3B2230] backdrop-blur-md flex items-center justify-center transition-all shadow-lg active:scale-90"
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
          aria-label="Next Image"
          className="absolute right-2 sm:right-6 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#3B2230] backdrop-blur-md flex items-center justify-center transition-all shadow-lg active:scale-90"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Lightbox Content Container */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 15 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-4xl w-full max-h-[92vh] flex flex-col md:flex-row bg-[#FFFDFB] rounded-[32px] overflow-hidden shadow-2xl border border-white/40"
        >
          {/* Main Large Image Container */}
          <div className="relative md:w-3/5 max-h-[55vh] md:max-h-[85vh] bg-[#F8E1E4]/30 flex items-center justify-center overflow-hidden">
            <img
              src={currentItem.src}
              alt={currentItem.alt}
              className="w-full h-full object-contain md:object-cover max-h-[55vh] md:max-h-[85vh]"
            />
            {/* Cute Badge */}
            {currentItem.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white bg-[#E65D73]/90 backdrop-blur-md shadow-sm">
                {currentItem.badge}
              </span>
            )}
          </div>

          {/* Details & Action Column */}
          <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-white text-left">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B76E79] mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
                <span>{currentItem.categoryName}</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#3B2230] leading-snug mb-3">
                {currentItem.title}
              </h3>

              <p className="text-sm text-[#3B2230]/75 leading-relaxed font-normal mb-6">
                {currentItem.subtitle || currentItem.alt}
              </p>

              <div className="p-3.5 rounded-2xl bg-[#FFF5F7] border border-[#F8E1E4] text-xs text-[#3B2230] space-y-1 mb-6">
                <p className="font-semibold text-[#E65D73]">✦ Client Transformation Note</p>
                <p className="text-[#3B2230]/80">
                  Customized for each client by Wendyl at Norwen Beauty Salon, Palmerston North.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F8E1E4] space-y-3">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBookService(currentItem.title);
                }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#E65D73] to-[#B76E79] text-white text-sm font-semibold shadow-md shadow-[#E65D73]/25 hover:shadow-lg hover:shadow-[#E65D73]/35 flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Look Like This</span>
              </button>

              <p className="text-[11px] text-center text-[#B76E79]">
                Press <kbd className="px-1.5 py-0.5 rounded bg-gray-100 text-[#3B2230] font-mono">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-gray-100 text-[#3B2230] font-mono">→</kbd> to browse • <kbd className="px-1.5 py-0.5 rounded bg-gray-100 text-[#3B2230] font-mono">Esc</kbd> to exit
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
