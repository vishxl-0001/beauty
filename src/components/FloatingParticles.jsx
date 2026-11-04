import React from 'react';
import { motion } from 'framer-motion';

export default function FloatingParticles() {
  // Rich set of pre-calculated floating particles with varied sizes, timings, and positions
  const particles = [
    { id: 1, left: '4%', delay: 0, duration: 16, size: 18, type: 'petal', color: '#996515' },
    { id: 2, left: '11%', delay: 3, duration: 21, size: 12, type: 'sparkle', color: '#B8860B' },
    { id: 3, left: '19%', delay: 7, duration: 18, size: 22, type: 'petal', color: '#8B6508' },
    { id: 4, left: '27%', delay: 1, duration: 24, size: 14, type: 'starburst', color: '#A06800' },
    { id: 5, left: '34%', delay: 5, duration: 17, size: 20, type: 'petal', color: '#B8860B' },
    { id: 6, left: '42%', delay: 9, duration: 22, size: 13, type: 'sparkle', color: '#996515' },
    { id: 7, left: '50%', delay: 2, duration: 19, size: 16, type: 'ring', color: '#B8860B' },
    { id: 8, left: '58%', delay: 6, duration: 23, size: 24, type: 'petal', color: '#8B6508' },
    { id: 9, left: '66%', delay: 4, duration: 18, size: 14, type: 'starburst', color: '#A06800' },
    { id: 10, left: '73%', delay: 8, duration: 20, size: 21, type: 'petal', color: '#996515' },
    { id: 11, left: '81%', delay: 1, duration: 25, size: 15, type: 'sparkle', color: '#B8860B' },
    { id: 12, left: '88%', delay: 5, duration: 17, size: 19, type: 'petal', color: '#8B6508' },
    { id: 13, left: '95%', delay: 3, duration: 22, size: 13, type: 'ring', color: '#A06800' },
    { id: 14, left: '15%', delay: 11, duration: 23, size: 16, type: 'petal', color: '#996515' },
    { id: 15, left: '62%', delay: 10, duration: 21, size: 12, type: 'sparkle', color: '#B8860B' },
  ];

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: '-10%', opacity: 0, rotate: 0 }}
          animate={{
            y: ['0vh', '108vh'],
            x: ['0px', p.id % 2 === 0 ? '38px' : '-38px', '0px'],
            rotate: [0, p.id % 2 === 0 ? 360 : -360],
            opacity: [0, 0.85, 0.85, 0],
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
          {p.type === 'petal' && (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-full h-full"
              style={{
                color: p.color,
                filter: 'drop-shadow(0 2px 4px rgba(139, 101, 8, 0.35))',
              }}
            >
              <path
                d="M12 2C7 6 5 11 6 15C7 19 10 21 12 21C14 21 17 19 18 15C19 11 17 6 12 2Z"
                fill="currentColor"
              />
            </svg>
          )}

          {p.type === 'sparkle' && (
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-full h-full"
              style={{
                color: p.color,
                filter: 'drop-shadow(0 2px 4px rgba(184, 134, 11, 0.4))',
              }}
            >
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
            </svg>
          )}

          {p.type === 'starburst' && (
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-full h-full"
              style={{
                color: p.color,
                filter: 'drop-shadow(0 2px 4px rgba(160, 104, 0, 0.4))',
              }}
            >
              <path d="M12 0L13.8 8.2L22 10L13.8 11.8L12 20L10.2 11.8L2 10L10.2 8.2L12 0Z" />
              <circle cx="12" cy="10" r="1.5" fill="#FFFDF9" />
            </svg>
          )}

          {p.type === 'ring' && (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              className="w-full h-full"
              style={{
                color: p.color,
                filter: 'drop-shadow(0 2px 4px rgba(184, 134, 11, 0.35))',
              }}
            >
              <circle cx="12" cy="12" r="8" />
              <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.6" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}
