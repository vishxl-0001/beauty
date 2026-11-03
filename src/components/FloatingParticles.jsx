import React from 'react';
import { motion } from 'framer-motion';

export default function FloatingParticles() {
  // Pre-calculated static random positions to avoid hydration mismatches
  const particles = [
    { id: 1, left: '8%', delay: 0, duration: 18, size: 14, type: 'petal' },
    { id: 2, left: '22%', delay: 4, duration: 22, size: 8, type: 'sparkle' },
    { id: 3, left: '38%', delay: 1, duration: 16, size: 12, type: 'petal' },
    { id: 4, left: '55%', delay: 6, duration: 24, size: 9, type: 'sparkle' },
    { id: 5, left: '72%', delay: 2, duration: 20, size: 16, type: 'petal' },
    { id: 6, left: '86%', delay: 5, duration: 19, size: 10, type: 'sparkle' },
    { id: 7, left: '94%', delay: 3, duration: 25, size: 11, type: 'petal' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: '-10%', opacity: 0, rotate: 0 }}
          animate={{
            y: ['0vh', '105vh'],
            x: ['0px', p.id % 2 === 0 ? '30px' : '-30px', '0px'],
            rotate: [0, 180, 360],
            opacity: [0, 0.45, 0.45, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ left: p.left, width: p.size, height: p.size }}
          className="absolute"
        >
          {p.type === 'petal' ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-full h-full text-[#F8A5B2]/40"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(230,93,115,0.15))' }}
            >
              <path
                d="M12 2C7 6 5 11 6 15C7 19 10 21 12 21C14 21 17 19 18 15C19 11 17 6 12 2Z"
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-full h-full text-[#C9A24B]/35"
            >
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}
