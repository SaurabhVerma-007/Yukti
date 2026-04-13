import React from 'react';
import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/animated-counter';
import FallingPetals from '@/components/falling-petals';
import MusicPlayer from '@/components/music-player';
import { Sparkles, Stars, Heart } from 'lucide-react';

const reasons = [
  {
    title: "Your Kindness",
    text: "The way your warmth reaches through the screen and brightens every single conversation."
  },
  {
    title: "Your Dedication",
    text: "How hard you work for the things you care about. It inspires me endlessly."
  },
  {
    title: "Your Authenticity",
    text: "You are wonderfully, genuinely you. Never lose that beautiful sincerity."
  },
  {
    title: "Your Smile",
    text: "Even though I can't always see it, I can feel it in your words, and it's contagious."
  },
  {
    title: "The Little Things",
    text: "The random moments, the quiet pauses, the way ordinary things feel extraordinary with you."
  }
];

export default function Home() {
  return (
    <div className="min-h-[100dvh] w-full relative selection:bg-accent/30 selection:text-primary">
      <FallingPetals />
      
      {/* Floating interactive element */}
      <HeartExplosion />

      {/* Music player */}
      <MusicPlayer />

      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-sm sm:text-base text-primary/80 uppercase tracking-[0.3em] mb-6 block font-medium"
          >
            A Message to someone special
          </motion.span>
          
          <motion.div
            animate={{ 
              textShadow: ["0 0 20px rgba(232,62,140,0.2)", "0 0 40px rgba(232,62,140,0.5)", "0 0 20px rgba(232,62,140,0.2)"] 
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <h1 className="text-7xl sm:text-9xl md:text-[10rem] font-serif tracking-tight text-foreground mb-4 leading-none select-none">
              Yukti.
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1.5 }}
            className="text-xl sm:text-2xl text-muted-foreground font-light italic mt-8 max-w-lg mx-auto"
          >
            "A beautiful surprise from a random conversation."
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Scroll down</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-gradient-to-b from-primary/50 to-transparent"
          />
        </motion.div>
      </section>

      {/* Time Since Section */}
      <section className="relative py-32 px-6 z-10 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <Heart className="w-6 h-6 text-primary mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl sm:text-4xl font-serif mb-4">Since We Met</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            April 4, 2026 at 10:56 PM. The moment everything changed for the better.
          </p>
        </motion.div>

        <AnimatedCounter />
      </section>

      {/* Reasons Section */}
      <section className="relative py-32 px-6 z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-5xl font-serif mb-6">Reasons I'm Grateful</h2>
          <div className="w-12 h-[1px] bg-primary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-glass p-8 rounded-3xl relative overflow-hidden group h-full flex flex-col justify-center border border-white/[0.05] hover:border-primary/30 transition-colors"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Sparkles className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-serif mb-4 text-foreground/90">{reason.title}</h3>
              <p className="text-muted-foreground leading-relaxed font-light">
                {reason.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative py-32 px-6 z-10">
        <div className="max-w-2xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-serif text-center mb-20"
          >
            Our Story So Far
          </motion.h2>

          <div className="relative border-l border-white/10 ml-4 sm:mx-auto sm:ml-auto sm:border-l-0 sm:border-t sm:border-white/10 sm:flex sm:justify-between pt-10 sm:pt-0">
            {/* Event 1 */}
            <motion.div 
              initial={{ opacity: 0, x: -20, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative pl-8 sm:pl-0 sm:pr-8 pb-16 sm:pb-0 sm:w-1/2 sm:text-right"
            >
              <div className="absolute left-[-5px] sm:right-[-5px] sm:left-auto top-0 w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]" />
              <span className="text-primary font-medium tracking-wider uppercase text-xs sm:text-sm mb-2 block">April 4, 2026 — 10:56 PM</span>
              <h3 className="text-xl sm:text-2xl font-serif mb-3">The moment I found you</h3>
              <p className="text-muted-foreground font-light text-sm sm:text-base">A chance encounter at night that became the highlight of my year.</p>
            </motion.div>

            {/* Middle decorative line for desktop */}
            <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2" />

            {/* Event 2 */}
            <motion.div 
              initial={{ opacity: 0, x: 20, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative pl-8 sm:pl-8 sm:w-1/2 sm:ml-auto sm:pt-32"
            >
              <div className="absolute left-[-5px] top-0 sm:top-32 w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_10px_var(--color-accent)]" />
              <span className="text-accent font-medium tracking-wider uppercase text-xs sm:text-sm mb-2 block">Today</span>
              <h3 className="text-xl sm:text-2xl font-serif mb-3">Still smiling</h3>
              <p className="text-muted-foreground font-light text-sm sm:text-base">Because every day since has been a little brighter with you in it.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Message Section */}
      <section className="relative py-32 px-6 z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="max-w-3xl mx-auto bg-gradient-to-br from-white/[0.05] to-transparent p-8 sm:p-16 rounded-[2.5rem] border border-white/[0.05] backdrop-blur-xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          
          <p className="text-lg sm:text-2xl leading-relaxed sm:leading-loose font-serif text-foreground/90 italic">
            "I didn't expect to find someone like you in a random conversation. But here you are — sweet, genuine, hardworking, and beautiful in every way. Every time we talk, I find myself smiling. Thank you for being you, Yukti."
          </p>
        </motion.div>
      </section>

      {/* Closing Section */}
      <section className="relative min-h-[60dvh] flex items-center justify-center px-6 z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="text-center"
        >
          <Stars className="w-8 h-8 text-primary mx-auto mb-8 opacity-60" />
          <motion.div
            animate={{ 
              textShadow: ["0 0 30px rgba(244,208,111,0.3)", "0 0 60px rgba(244,208,111,0.6)", "0 0 30px rgba(244,208,111,0.3)"] 
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <h2 className="text-5xl sm:text-7xl font-serif text-gradient pb-2">
              Yukti.
            </h2>
          </motion.div>
          <p className="text-muted-foreground font-light mt-6 tracking-widest uppercase text-sm">
            You are wonderful.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
