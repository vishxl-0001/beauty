import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { marqueeItems } from '../data/content';

export default function MarqueeStrip() {
  const repeatedItems = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <div className="relative py-4 md:py-5 overflow-hidden border-y border-[#EADBBA]/80 bg-gradient-to-r from-[#FAF4E8] via-[#FFFDF9] to-[#FAF1DA] shadow-xs">
      <div className="flex w-max">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 34,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="flex items-center gap-8 md:gap-12 whitespace-nowrap"
        >
          {repeatedItems.map((item, index) => (
            <div key={index} className="flex items-center gap-8 md:gap-12">
              <span className="font-display text-base md:text-lg tracking-wide uppercase font-semibold text-[#251B12]/90 flex items-center gap-3">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A24B] fill-[#C9A24B]/30 shrink-0" />
                <span>{item}</span>
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
