import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Petal {
  id: number;
  x: number;
  delay: number;
  duration: number;
  scale: number;
  rotation: number;
}

export default function FallingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Generate static petals
    const newPetals = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // VW percentage
      delay: Math.random() * 20, // delay up to 20s
      duration: Math.random() * 15 + 15, // 15-30s duration
      scale: Math.random() * 0.6 + 0.4, // 0.4 - 1.0 scale
      rotation: Math.random() * 360
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{ 
            y: -100, 
            x: `${petal.x}vw`,
            rotate: petal.rotation,
            opacity: 0
          }}
          animate={{ 
            y: '110vh',
            x: `${petal.x + (Math.random() * 10 - 5)}vw`, // slight horizontal drift
            rotate: petal.rotation + 360,
            opacity: [0, 0.4, 0.4, 0] // fade in and out
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute"
          style={{ scale: petal.scale }}
        >
          {/* Simple petal shape */}
          <div className="w-4 h-4 bg-gradient-to-br from-[hsl(340,80%,60%,0.4)] to-[hsl(330,60%,30%,0.2)] rounded-tl-full rounded-br-full transform rotate-45 blur-[1px]" />
        </motion.div>
      ))}
      
      {/* Background ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-[hsl(340,80%,60%)] rounded-full mix-blend-screen filter blur-[100px] opacity-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-[hsl(43,85%,65%)] rounded-full mix-blend-screen filter blur-[120px] opacity-[0.07]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[hsl(330,60%,30%)] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.05]" />
    </div>
  );
}
