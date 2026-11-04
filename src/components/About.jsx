import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Award, CheckCircle2, MapPin } from 'lucide-react';
import { aboutStory } from '../data/content';
import { useSalon } from '../context/SalonContext';
import { salonImages } from '../data/images';

export default function About() {
  const { salonStats, businessDetails } = useSalon();
  return (
    <section id="about" className="py-20 md:py-28 relative overflow-hidden bg-white/50">
      {/* Decorative Background Blob */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-[#FAF0D4]/50 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Overlapping Arch Images (Owner + Storefront Sign) */}
          <div className="lg:col-span-6 relative flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-[360px] sm:max-w-[420px]">
              {/* Back ambient frame */}
              <div className="absolute -inset-3 sm:-inset-4 rounded-[48px] arch-mask bg-gradient-to-tr from-[#F8EFD8]/40 via-[#FAF5E6]/60 to-[#C9A24B]/20 -z-10 transform -rotate-2" />

              {/* Main Owner Arch Frame */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8 }}
                className="overflow-hidden rounded-[40px] arch-mask aspect-[0.84] shadow-2xl shadow-amber-950/10 border-2 border-white bg-[#FAF3DF]/40"
              >
                <img
                  src={salonImages.owner.src}
                  alt={salonImages.owner.alt}
                  style={{ objectPosition: salonImages.owner.objectPosition }}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>

              {/* Overlapping Secondary Card: Physical Storefront Sign at 98 Napier Road */}
              <motion.div
                initial={{ opacity: 0, x: 25, y: 25 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="absolute -bottom-8 -right-4 sm:-right-8 w-48 sm:w-56 p-2 rounded-2xl glass-panel shadow-2xl border border-white/95"
              >
                <div className="rounded-xl overflow-hidden aspect-[1.33] mb-2 bg-[#F6EBD7]">
                  <img
                    src={salonImages.storefront.src}
                    alt={salonImages.storefront.alt}
                    style={{ objectPosition: salonImages.storefront.objectPosition }}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="px-1 text-left">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-[#A67C1E] uppercase tracking-wider">
                    <MapPin className="w-3 h-3 text-[#C9A24B]" />
                    <span>Terrace End Studio</span>
                  </div>
                  <p className="text-[11px] font-medium text-[#251B12] leading-tight">
                    98 Napier Road, Palmerston North
                  </p>
                </div>
              </motion.div>

              {/* Floating cute quote badge */}
              <div className="absolute -top-4 -left-3 sm:-left-6 px-3 py-1.5 rounded-full glass-panel shadow-md border border-white flex items-center gap-1.5 text-xs font-medium text-[#251B12]">
                <Heart className="w-3.5 h-3.5 text-[#C9A24B] fill-[#C9A24B]" />
                <span>Meet Wendyl</span>
              </div>
            </div>
          </div>

          {/* Right Column: Founder Story */}
          <div className="lg:col-span-6 flex flex-col items-start text-left order-1 lg:order-2">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EA] border border-[#EADBBA] text-xs font-semibold text-[#A67C1E] uppercase tracking-wider mb-4">
              <Sparkles className="w-3 h-3 text-[#C9A24B]" />
              <span>{aboutStory.eyebrow}</span>
            </div>

            {/* Heading */}
            <h2 className="text-fluid-h2 font-display font-medium text-[#251B12] tracking-tight mb-2">
              {aboutStory.heading}
            </h2>

            <p className="text-sm font-semibold text-[#8C7355] uppercase tracking-widest mb-6">
              {aboutStory.role}
            </p>

            {/* Story Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-[#251B12]/80 leading-relaxed font-normal mb-6">
              {aboutStory.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Client Motto Quote Box */}
            <div className="p-4 rounded-2xl bg-[#FAF5EA] border border-[#EADBBA] mb-8 w-full text-left">
              <p className="font-display italic text-[#251B12] text-sm sm:text-base font-normal">
                {aboutStory.quote}
              </p>
            </div>

            {/* Salon Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-6 border-t border-[#EADBBA]/70">
              {salonStats.map((stat, index) => (
                <div key={index} className="flex flex-col text-left">
                  <div className="font-display text-2xl sm:text-3xl font-semibold text-[#A67C1E] leading-none mb-1">
                    {stat.value}
                    {stat.suffix}
                  </div>
                  <span className="text-xs font-semibold text-[#251B12] leading-tight mb-0.5">
                    {stat.label}
                  </span>
                  <span className="text-[10px] text-[#8C7355] leading-tight">
                    {stat.helper}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
