import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Eye, ZoomIn } from 'lucide-react';
import { useSalon } from '../context/SalonContext';
import Lightbox from './Lightbox';

export default function Gallery({ onBookService }) {
  const { gallery } = useSalon();
  const galleryItems = gallery;
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [poppedHearts, setPoppedHearts] = useState({});

  const filterTabs = [
    { id: 'all', label: 'All Creations' },
    { id: 'hair', label: 'Hair & Color' },
    { id: 'styling', label: 'Styling & Cuts' },
    { id: 'nails', label: 'Natural Nail Care' },
    { id: 'studio', label: 'Studio & Team' },
  ];

  const filteredItems =
    selectedFilter === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.filter === selectedFilter);

  const handleImageTap = (id) => {
    setPoppedHearts((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setPoppedHearts((prev) => ({ ...prev, [id]: false }));
    }, 1200);
  };

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
  };

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
  };

  const handleNext = () => {
    setLightboxIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="gallery" className="py-20 md:py-28 relative overflow-hidden bg-white/70">
      {/* Decorative Golden Aura */}
      <div className="absolute top-1/3 left-0 w-80 h-80 rounded-full bg-[#FAF0D4]/40 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-80 h-80 rounded-full bg-[#F6EBD7]/40 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF5EA] border border-[#EADBBA] text-xs font-semibold text-[#A67C1E] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>Lookbook & Portfolio</span>
          </div>

          <h2 className="text-fluid-h2 font-display font-medium text-[#251B12] tracking-tight mb-4">
            Our Living Gallery
          </h2>

          <p className="text-sm sm:text-base text-[#251B12]/75 leading-relaxed font-normal">
            Real guest results and salon moments from our Terrace End studio. Tap any creation to explore in high resolution or reserve the exact same look with Wendy.
          </p>

          {/* Filter Tabs with animated pill */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {filterTabs.map((tab) => {
              const isActive = selectedFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? 'text-white shadow-md shadow-[#C9A24B]/30 bg-gradient-to-r from-[#D4AF37] to-[#B38728]'
                      : 'text-[#251B12]/80 bg-white/80 hover:bg-white border border-[#EADBBA]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento / Masonry Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredItems.map((item, index) => {
              const isPopped = poppedHearts[item.id];

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => {
                    handleImageTap(item.id);
                    handleOpenLightbox(index);
                  }}
                  className="group relative cursor-pointer overflow-hidden rounded-[28px] glass-panel p-2.5 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-950/10 hover:-translate-y-1 hover:border-[#C9A24B]/50"
                >
                  {/* Image Container with Dynamic Aspect */}
                  <div className="relative w-full rounded-[20px] overflow-hidden aspect-[4/5] bg-[#FAF3DF]/40">
                    <img
                      src={item.src}
                      alt={item.alt}
                      style={{ objectPosition: item.objectPosition || 'center center' }}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      loading="lazy"
                      decoding="async"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#251B12]/80 via-[#251B12]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase text-white bg-[#251B12]/75 backdrop-blur-md border border-white/20">
                        {item.categoryName}
                      </span>

                      {/* Heart Button */}
                      <button
                        type="button"
                        aria-label="Favorite look"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleImageTap(item.id);
                        }}
                        className="w-8 h-8 rounded-full bg-white/90 hover:bg-white backdrop-blur-md flex items-center justify-center text-[#C9A24B] shadow-sm transition-transform active:scale-75"
                      >
                        <Heart
                          className={`w-4 h-4 transition-all ${
                            isPopped ? 'scale-125 fill-[#C9A24B]' : 'text-[#C9A24B]'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Cute Animated Heart Pop on Tap */}
                    <AnimatePresence>
                      {isPopped && (
                        <motion.div
                          initial={{ scale: 0, opacity: 1, y: 0 }}
                          animate={{ scale: 2.2, opacity: 0, y: -40 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                        >
                          <Sparkles className="w-14 h-14 text-[#D4AF37] fill-[#D4AF37] drop-shadow-lg" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Bottom Details (Visible on hover/mobile) */}
                    <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/50 shadow-md transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="font-display font-semibold text-sm sm:text-base text-[#251B12] leading-snug">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-[#8C7355] line-clamp-1 mt-0.5">
                        {item.subtitle}
                      </p>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#EADBBA]/50">
                        <span className="text-[10px] font-semibold text-[#A67C1E] flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>Tap to view full details</span>
                        </span>
                        <ZoomIn className="w-3.5 h-3.5 text-[#8C7355]" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={lightboxIndex !== null}
        currentItem={lightboxIndex !== null ? filteredItems[lightboxIndex] : null}
        onClose={() => setLightboxIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
        onBookService={onBookService}
      />
    </section>
  );
}
