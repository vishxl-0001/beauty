import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Clock, Check, Calendar, ArrowRight } from 'lucide-react';
import { useSalon } from '../context/SalonContext';

export default function Services({ onSelectService }) {
  const { services } = useSalon();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Hair & Color', 'Styling & Cuts', 'Nails & Art'];

  const filteredServices =
    activeCategory === 'All'
      ? services
      : services.filter((s) => s.category.toLowerCase().includes(activeCategory.toLowerCase().split(' ')[0]));

  return (
    <section id="services" className="py-20 md:py-28 relative overflow-hidden bg-[#FFFDFB]">
      {/* Decorative Aura */}
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-[#F6EBDD]/50 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[#F8E1E4]/40 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF0F3] border border-[#F8E1E4] text-xs font-semibold text-[#E65D73] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>Curated Treatments</span>
          </div>

          <h2 className="text-fluid-h2 font-display font-medium text-[#3B2230] tracking-tight mb-4">
            Bespoke Beauty Menu
          </h2>

          <p className="text-sm sm:text-base text-[#3B2230]/75 leading-relaxed font-normal">
            Every appointment begins with a one-on-one consultation with Wendyl to understand your individual hair and nail aspirations, using only luxury salon-grade formulations.
          </p>

          <p className="text-[11px] text-[#B76E79] font-medium tracking-wide uppercase mt-2">
            * All prices shown are indicative starting rates [Editable demo values]
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
                    ? 'text-white shadow-md shadow-[#E65D73]/25 bg-gradient-to-r from-[#E65D73] to-[#B76E79]'
                    : 'text-[#3B2230]/80 bg-white/80 hover:bg-white border border-[#F8E1E4]'
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
                className="group relative flex flex-col justify-between rounded-3xl glass-panel p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-rose-900/8 hover:border-[#E65D73]/40"
              >
                <div>
                  {/* Service Image with Arch & Badge */}
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 bg-[#F8E1E4]/30">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3B2230]/50 via-transparent to-transparent opacity-50" />

                    {/* Badge */}
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase text-white bg-[#3B2230]/80 backdrop-blur-md border border-white/20">
                      {service.badge}
                    </span>

                    {/* Duration chip */}
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium text-white bg-black/50 backdrop-blur-md">
                      <Clock className="w-3 h-3 text-[#F8A5B2]" />
                      <span>{service.duration}</span>
                    </span>
                  </div>

                  {/* Category & Title */}
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-semibold text-[#B76E79] uppercase tracking-wider">
                      {service.category}
                    </span>
                    <span className="font-display font-semibold text-lg text-[#E65D73]">
                      {service.price}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-semibold text-[#3B2230] group-hover:text-[#E65D73] transition-colors leading-snug mb-2.5">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#3B2230]/75 leading-relaxed font-normal mb-4">
                    {service.description}
                  </p>

                  {/* Perks list */}
                  <div className="space-y-1.5 pt-3 border-t border-[#F8E1E4]/60 mb-6">
                    {service.perks.map((perk, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#3B2230]/85">
                        <Check className="w-3.5 h-3.5 text-[#E65D73] shrink-0" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Book this button */}
                <button
                  type="button"
                  onClick={() => onSelectService(service.title)}
                  className="w-full py-2.5 sm:py-3 rounded-2xl bg-white hover:bg-gradient-to-r hover:from-[#E65D73] hover:to-[#B76E79] text-[#3B2230] hover:text-white border border-[#F8E1E4] hover:border-transparent text-xs sm:text-sm font-semibold transition-all duration-300 shadow-xs hover:shadow-md flex items-center justify-center gap-2 active:scale-95"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#E65D73] group-hover:text-white transition-colors" />
                  <span>Book This Service</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Custom Consultation Prompt */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#FFF5F7] via-[#FFFDFB] to-[#FBF5EE] border border-[#F8E1E4] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF0F3] border border-[#F8E1E4] flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-[#E65D73]" />
            </div>
            <div>
              <h4 className="font-display text-lg sm:text-xl font-semibold text-[#3B2230]">
                Have a specific look or custom nail art in mind?
              </h4>
              <p className="text-xs sm:text-sm text-[#3B2230]/75">
                Wendyl welcomes photo inspiration! Bring screenshots from Instagram or Pinterest to your session.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectService('Custom Consultation & Styling')}
            className="shrink-0 px-6 py-3 rounded-full bg-[#3B2230] text-white text-xs sm:text-sm font-medium hover:bg-[#E65D73] transition-colors shadow-sm"
          >
            Request Custom Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
