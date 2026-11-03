import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Award, CheckCircle2, MapPin } from 'lucide-react';
import { aboutStory } from '../data/content';
import { useSalon } from '../context/SalonContext';
import { salonImages } from '../data/images';

export default function About() {
  const { salonStats, businessDetails } = useSalon();
  return (
    <section id="about" className="py-20 md:py-28 relative overflow-hidden bg-white/40">
      {/* Decorative Background Blob */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-[#F8E1E4]/40 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Overlapping Arch Images (Owner + Storefront Sign) */}
          <div className="lg:col-span-6 relative flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-[360px] sm:max-w-[420px]">
              {/* Back ambient frame */}
              <div className="absolute -inset-3 sm:-inset-4 rounded-[48px] arch-mask bg-gradient-to-tr from-[#F8A5B2]/20 via-[#FDF4F5]/60 to-[#C9A24B]/15 -z-10 transform -rotate-2" />

              {/* Main Owner Arch Frame */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8 }}
                className="overflow-hidden rounded-[40px] arch-mask aspect-[0.84] shadow-2xl shadow-rose-950/10 border-2 border-white bg-[#F8E1E4]/30"
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
                className="absolute -bottom-8 -right-4 sm:-right-8 w-48 sm:w-56 p-2 rounded-2xl glass-panel shadow-2xl border border-white/90"
              >
                <div className="rounded-xl overflow-hidden aspect-[1.33] mb-2 bg-[#F6EBDD]">
                  <img
                    src={salonImages.storefront.src}
                    alt={salonImages.storefront.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="px-1 text-left">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-[#E65D73] uppercase tracking-wider">
                    <MapPin className="w-3 h-3 text-[#E65D73]" />
                    <span>Terrace End Studio</span>
                  </div>
                  <p className="text-[11px] font-medium text-[#3B2230] leading-tight">
                    98 Napier Road, Palmerston North
                  </p>
                </div>
              </motion.div>

              {/* Floating cute quote badge */}
              <div className="absolute -top-4 -left-3 sm:-left-6 px-3 py-1.5 rounded-full glass-panel shadow-md border border-white flex items-center gap-1.5 text-xs font-medium text-[#3B2230]">
                <Heart className="w-3.5 h-3.5 text-[#E65D73] fill-[#E65D73]" />
                <span>Meet Wendyl</span>
              </div>
            </div>
          </div>

          {/* Right Column: Founder Story */}
          <div className="lg:col-span-6 flex flex-col items-start text-left order-1 lg:order-2">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0F3] border border-[#F8E1E4] text-xs font-semibold text-[#E65D73] uppercase tracking-wider mb-4">
              <Sparkles className="w-3 h-3 text-[#C9A24B]" />
              <span>{aboutStory.eyebrow}</span>
            </div>

            {/* Heading */}
            <h2 className="text-fluid-h2 font-display font-medium text-[#3B2230] tracking-tight mb-2">
              {aboutStory.heading}
            </h2>

            <p className="text-sm font-semibold text-[#B76E79] uppercase tracking-widest mb-6">
              {aboutStory.role}
            </p>

            {/* Story Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-[#3B2230]/80 leading-relaxed font-normal mb-6">
              {aboutStory.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Founder Quote */}
            <blockquote className="p-4 rounded-2xl bg-gradient-to-r from-[#FFF5F7] to-[#FBF5EE] border-l-3 border-[#E65D73] mb-8 w-full">
              <p className="font-display italic text-base sm:text-lg text-[#3B2230]/90 leading-snug">
                {aboutStory.quote}
              </p>
            </blockquote>

            {/* Signature & Role */}
            <div className="flex items-center justify-between w-full pt-4 border-t border-[#F8E1E4]">
              <div>
                <p className="font-script text-3xl sm:text-4xl text-[#E65D73]">
                  {aboutStory.signature}
                </p>
                <p className="text-xs text-[#B76E79] tracking-wider uppercase font-medium mt-0.5">
                  Founder & Master Stylist
                </p>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F7] text-xs font-medium text-[#3B2230] border border-[#F8E1E4]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E65D73]" />
                  <span>Licensed & Certified</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row with Animated Numbers */}
        <div className="mt-20 pt-10 border-t border-[#F8E1E4]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {salonStats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-5 rounded-3xl glass-panel text-center relative overflow-hidden group hover:border-[#E65D73]/30 transition-all"
              >
                <div className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[#3B2230] mb-1 group-hover:text-[#E65D73] transition-colors">
                  {stat.value.toLocaleString()}
                  <span className="text-[#C9A24B] font-normal text-2xl sm:text-3xl ml-0.5">
                    {stat.suffix}
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#3B2230] tracking-wide">
                  {stat.label}
                </div>
                <div className="text-[11px] text-[#B76E79] font-normal mt-0.5">
                  {stat.helper}
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-[11px] text-[#B76E79]/80 italic mt-4">
            * Sample metrics representative of Wendyl’s years of professional salon artistry
          </p>
        </div>
      </div>
    </section>
  );
}
