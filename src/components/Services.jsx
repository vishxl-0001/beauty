import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Clock, Check, Calendar, ArrowRight } from 'lucide-react';
import { useSalon } from '../context/SalonContext';

export default function Services({ onSelectService }) {
  const { services } = useSalon();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'HairCare', 'Treatments', 'Nail Care', 'Face & Body'];

  const filteredServices =
    activeCategory === 'All'
      ? services
      : services.filter((s) => {
          if (activeCategory === 'Face & Body') {
            return s.category === 'Face Care' || s.category === 'Body Care';
          }
          if (activeCategory === 'Nail Care') {
            return s.category === 'Nail Care' || s.category.includes('Nail');
          }
          return s.category.toLowerCase().includes(activeCategory.toLowerCase());
        });

  return (
    <section id="services" className="py-20 md:py-28 relative overflow-hidden bg-[#FFFDF9]">
      {/* Decorative Aura */}
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-[#FAF0D4]/40 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[#F6EBD7]/50 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF5EA] border border-[#EADBBA] text-xs font-semibold text-[#A67C1E] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>Curated Treatments</span>
          </div>

          <h2 className="text-fluid-h2 font-display font-medium text-[#251B12] tracking-tight mb-4">
            Bespoke Beauty Menu
          </h2>

          <p className="text-sm sm:text-base text-[#251B12]/75 leading-relaxed font-normal">
            Every appointment begins with a personal consultation with Wendy to understand your hair texture, face shape, and beauty goals, using only premium salon-grade formulations.
          </p>

          <p className="text-[11px] text-[#8C7355] font-semibold tracking-wide uppercase mt-2">
            ✦ Affordable, high-quality salon care with Wendy in Palmerston North
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'text-white shadow-md shadow-[#C9A24B]/30 bg-gradient-to-r from-[#D4AF37] to-[#B38728]'
                    : 'text-[#251B12]/80 bg-white/80 hover:bg-white border border-[#EADBBA]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
              <motion.article
                key={service.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group relative flex flex-col justify-between rounded-3xl glass-panel p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-amber-950/10 hover:border-[#C9A24B]/50"
              >
                <div>
                  {/* Service Image with Arch & Badge */}
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 bg-[#FAF3DF]/40">
                    <img
                      src={service.image}
                      alt={service.title}
                      style={{ objectPosition: service.objectPosition || 'center center' }}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#251B12]/50 via-transparent to-transparent opacity-50" />

                    {/* Badge */}
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase text-white bg-[#251B12]/80 backdrop-blur-md border border-white/20">
                      {service.badge}
                    </span>

                    {/* Duration chip */}
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium text-white bg-black/60 backdrop-blur-md">
                      <Clock className="w-3 h-3 text-[#E6C36E]" />
                      <span>{service.duration}</span>
                    </span>
                  </div>

                  {/* Category & Title */}
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-semibold text-[#8C7355] uppercase tracking-wider">
                      {service.category}
                    </span>
                    <span className="font-display font-semibold text-lg text-[#A67C1E]">
                      {service.price}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-semibold text-[#251B12] group-hover:text-[#A67C1E] transition-colors leading-snug mb-2.5">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#251B12]/75 leading-relaxed font-normal mb-4">
                    {service.description}
                  </p>

                  {/* Service Perks */}
                  <div className="space-y-1.5 pt-3 border-t border-[#EADBBA]/50 mb-6">
                    {service.perks &&
                      service.perks.map((perk, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#251B12]/85">
                          <Check className="w-3.5 h-3.5 text-[#C9A24B] shrink-0" />
                          <span>{perk}</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Book Action Button */}
                <button
                  type="button"
                  onClick={() => onSelectService(service.title)}
                  className="w-full py-3 px-4 rounded-2xl bg-[#FAF5EA] hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#B38728] hover:text-white border border-[#EADBBA] hover:border-transparent text-[#251B12] text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 group/btn shadow-xs hover:shadow-md hover:shadow-[#C9A24B]/30 active:scale-98"
                >
                  <Calendar className="w-4 h-4 text-[#C9A24B] group-hover/btn:text-white transition-colors" />
                  <span>Reserve This Service</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
                </button>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
