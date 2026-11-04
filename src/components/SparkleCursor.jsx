import React, { useEffect, useState } from 'react';

export default function SparkleCursor() {
  const [trails, setTrails] = useState([]);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const mediaQuery = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
    setIsDesktop(mediaQuery.matches);

    const handler = (e) => setIsDesktop(e.matches);
    mediaQuery.addEventListener('change', handler);

    if (!mediaQuery.matches) return () => mediaQuery.removeEventListener('change', handler);

    let lastTime = 0;
    const handleMouseMove = (e) => {
      const now = performance.now();
      // Throttle sparkle creation for buttery 60fps performance
      if (now - lastTime < 45) return;
      lastTime = now;

      const colors = ['#D4AF37', '#C9A24B', '#E6C36E', '#B38728'];
      const newSparkle = {
        id: Math.random().toString(36).slice(2, 7),
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: Math.random() > 0.4 ? 'sparkle' : 'dot',
      };

      setTrails((prev) => [...prev.slice(-14), newSparkle]);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Clean up stale particles
    const cleanupInterval = setInterval(() => {
      setTrails((prev) => prev.slice(1));
    }, 120);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(cleanupInterval);
      mediaQuery.removeEventListener('change', handler);
    };
  }, []);

  if (!isDesktop || trails.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {trails.map((s, idx) => (
        <span
          key={s.id}
          style={{
            left: `${s.x}px`,
            top: `${s.y}px`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            backgroundColor: s.color,
            boxShadow: `0 0 6px ${s.color}`,
            opacity: (idx + 1) / trails.length * 0.8,
            transform: `translate(-50%, -50%) scale(${(idx + 1) / trails.length})`,
            transition: 'transform 0.4s ease-out, opacity 0.4s ease-out',
          }}
          className={`absolute rounded-full ${s.shape === 'sparkle' ? 'rotate-45' : ''}`}
        />
      ))}
    </div>
  );
}
