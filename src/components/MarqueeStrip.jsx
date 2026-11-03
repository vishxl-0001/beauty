import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { marqueeItems } from '../data/content';

export default function MarqueeStrip() {
  const repeatedItems = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <div className="relative py-4 md:py-5 overflow-hidden border-y border-[#F8E1E4]/80 bg-gradient-to-r from-[#FFF5F7] via-[#FFFDFB] to-[#FBF5EE] shadow-xs">
      {/* Edge Blur Mask */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#FFFDFB] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#FFFDFB] to-transparent z-10 pointer-events-none" />

      {/* Infinite scrolling ticker */}
      <div className="flex select-none whitespace-nowrap overflow-hidden">
        <div className="inline-flex animate-[marquee_28s_linear_infinite] items-center gap-6 md:gap-10">
          {repeatedItems.map((item, index) => (
            <div key={index} className="inline-flex items-center gap-6 md:gap-10">
              <span className="font-display text-sm md:text-base font-semibold tracking-wider text-[#3B2230]/90 uppercase">
                {item}
              </span>
              {index % 2 === 0 ? (
                <Sparkles className="w-3.5 h-3.5 text-[#C9A24B] shrink-0" />
              ) : (
                <Heart className="w-3 h-3 text-[#E65D73] fill-[#E65D73]/30 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
