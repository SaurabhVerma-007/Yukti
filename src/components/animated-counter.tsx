import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedCounter() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Met on April 4, 2026 at 10:56 PM
    const startDate = new Date('2026-04-04T22:56:00');

    const updateTimer = () => {
      const now = new Date();
      const difference = now.getTime() - startDate.getTime();

      // If we are before April 4, 2026 (just in case)
      if (difference < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <div className="flex gap-4 sm:gap-8 justify-center items-center">
      {timeBlocks.map((block, index) => (
        <motion.div 
          key={block.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 sm:w-24 sm:h-24 bg-glass rounded-2xl flex items-center justify-center backdrop-blur-md relative overflow-hidden group border border-[hsl(var(--primary)/0.2)]">
            <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--primary)/0.1)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <motion.span 
              key={block.value}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-3xl sm:text-5xl font-serif text-gradient font-medium"
            >
              {block.value.toString().padStart(2, '0')}
            </motion.span>
          </div>
          <span className="text-xs sm:text-sm text-muted-foreground uppercase tracking-[0.2em] mt-4 font-medium">
            {block.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
