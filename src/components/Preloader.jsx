import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

export default function Preloader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 1800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFFDFB] overflow-hidden"
        >
          {/* Soft ambient background glow */}
          <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-tr from-[#F8E1E4]/70 via-[#FDF4F5]/90 to-[#F6EBDD]/70 blur-3xl -z-10 animate-pulse pointer-events-none" />

          {/* Central Logo & Monogram container */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center px-6 relative"
          >
            {/* Logo Emblem */}
            <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4">
              <motion.img
                src="/images/logo.png"
                alt="Norwen Beauty Salon Logo"
                className="w-full h-full object-contain filter drop-shadow-md"
                initial={{ rotate: -5, scale: 0.9 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
              />
              {/* Floating cute sparkles around logo */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 pointer-events-none"
              >
                <Sparkles className="w-4 h-4 text-[#C9A24B] absolute -top-1 right-2 animate-bounce" />
                <Heart className="w-3.5 h-3.5 text-[#E65D73] absolute bottom-0 -left-1 fill-[#E65D73]" />
              </motion.div>
            </div>

            {/* Wordmark */}
            <motion.h1
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-display text-2xl md:text-3xl font-semibold tracking-wide text-[#3B2230]"
            >
              Norwen
            </motion.h1>

            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="text-xs uppercase tracking-[0.3em] text-[#B76E79] font-medium mt-1"
            >
              Beauty Salon • Palmerston North
            </motion.p>

            {/* Delicate Loading Bar */}
            <div className="w-36 h-[2px] bg-[#F8E1E4] rounded-full mt-6 overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#B76E79] via-[#E65D73] to-[#C9A24B] rounded-full"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
              />
            </div>

            {/* Sweet welcome microcopy */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="font-script text-lg text-[#E65D73] mt-3"
            >
              Glow up with us...
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
