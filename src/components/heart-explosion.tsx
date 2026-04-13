import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function HeartExplosion() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; scale: number; rotation: number; type: 'heart' | 'sparkle' | 'star' }[]>([]);
  const [isExploding, setIsExploding] = useState(false);

  const triggerExplosion = () => {
    if (isExploding) return;
    setIsExploding(true);

    const newParticles = [];
    const types: ('heart' | 'sparkle' | 'star')[] = ['heart', 'heart', 'sparkle', 'star'];
    
    for (let i = 0; i < 40; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 600, // spread
        y: (Math.random() - 0.5) * 600 - 100, // bias upwards
        scale: Math.random() * 1.5 + 0.5,
        rotation: Math.random() * 360,
        type: types[Math.floor(Math.random() * types.length)]
      });
    }

    setParticles(newParticles);

    setTimeout(() => {
      setParticles([]);
      setIsExploding(false);
    }, 3000);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, x: 0, y: 0, scale: 0, rotate: 0 }}
            animate={{ 
              opacity: 0, 
              x: p.x, 
              y: p.y, 
              scale: p.scale,
              rotate: p.rotation + (Math.random() > 0.5 ? 180 : -180)
            }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          >
            {p.type === 'heart' && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="hsl(340 80% 60%)" stroke="none">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            )}
            {p.type === 'sparkle' && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="hsl(43 85% 65%)" stroke="none">
                 <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"></path>
              </svg>
            )}
            {p.type === 'star' && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="hsl(330 20% 95%)" stroke="none">
                 <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
              </svg>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.button
        onClick={triggerExplosion}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-16 h-16 rounded-full bg-gradient-to-tr from-[hsl(340,80%,60%)] to-[hsl(43,85%,65%)] flex items-center justify-center shadow-[0_0_20px_rgba(232,62,140,0.5)] cursor-pointer border-none outline-none group"
      >
        <Heart className="w-8 h-8 text-white fill-white group-hover:scale-110 transition-transform duration-300" />
      </motion.button>
    </div>
  );
}
