import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Crown, Heart, Smile } from 'lucide-react';
import { whyChooseUs } from '../data/content';
import { salonImages } from '../data/images';

export default function WhyChooseUs() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#C9A24B]" />;
      case 'Crown':
        return <Crown className="w-6 h-6 text-[#E65D73]" />;
      case 'Heart':
        return <Heart className="w-6 h-6 text-[#E65D73] fill-[#E65D73]/20" />;
      case 'Smile':
        return <Smile className="w-6 h-6 text-[#B76E79]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#E65D73]" />;
    }
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-[#FFFDFB] via-[#FFF8FA] to-[#FFFDFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0F3] border border-[#F8E1E4] text-xs font-semibold text-[#E65D73] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>The Norwen Distinction</span>
          </div>

          <h2 className="text-fluid-h2 font-display font-medium text-[#3B2230] tracking-tight mb-3">
            Why Our Guests Return
          </h2>

          <p className="text-sm sm:text-base text-[#3B2230]/75 leading-relaxed font-normal">
            We reject the rushed, loud atmosphere of assembly-line salons. Here, your time is honored, your hair is protected, and your nail artistry is crafted with pure passion.
          </p>
        </div>

        {/* 4 Feature Tiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {whyChooseUs.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-6 sm:p-7 rounded-3xl glass-panel relative flex flex-col justify-between group hover:border-[#E65D73]/35 hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className="w-13 h-13 rounded-2xl bg-[#FFF0F3] border border-[#F8E1E4] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  {getIcon(feature.icon)}
                </div>

                <h3 className="font-display text-xl font-semibold text-[#3B2230] group-hover:text-[#E65D73] transition-colors mb-2.5">
                  {feature.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#3B2230]/75 leading-relaxed font-normal">
                  {feature.description}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-[#F8E1E4]/50 flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#B76E79]">
                  Feature 0{idx + 1}
                </span>
                <span className="font-script text-base text-[#E65D73]">Boutique Care</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visual Accent Banner (using Hair 3: emerald underlights) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 rounded-3xl overflow-hidden glass-panel border border-[#F8E1E4] p-6 sm:p-10 relative bg-gradient-to-r from-[#FFF5F7] via-[#FFFDFB] to-[#FBF5EE]"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 text-left">
              <span className="text-xs font-bold text-[#E65D73] tracking-widest uppercase block mb-1">
                Terrace End • Palmerston North
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#3B2230] mb-3">
                “Treat yourself, you deserve it.”
              </h3>
              <p className="text-sm text-[#3B2230]/80 max-w-xl leading-relaxed mb-6 font-normal">
                Book a peaceful hour away from your daily bustle. Enjoy unhurried, attentive hair styling and nail care customized solely to you.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-medium text-[#3B2230]">
                <span className="px-3 py-1 rounded-full bg-white border border-[#F8E1E4]">
                  ✦ Complimentary Tea & Refreshments
                </span>
                <span className="px-3 py-1 rounded-full bg-white border border-[#F8E1E4]">
                  ✦ Convenient Terrace End Street Parking
                </span>
              </div>
            </div>

            <div className="md:col-span-4 flex justify-center">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 bg-gradient-to-tr from-[#E65D73] via-[#F8A5B2] to-[#C9A24B] shadow-xl">
                <div className="w-full h-full rounded-full overflow-hidden bg-white">
                  <img
                    src={salonImages.hairEmeraldUnderlights.src}
                    alt={salonImages.hairEmeraldUnderlights.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-white text-[10px] font-bold text-[#E65D73] shadow-md border border-[#F8E1E4]">
                  Vivid Art
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
