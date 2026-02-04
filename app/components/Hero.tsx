'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, 100]);

  return (
    <section ref={containerRef} className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#050505]">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#C6A87C]/10 blur-[150px] rounded-full animate-pulse" />
      </div>

      <motion.div 
        style={{ opacity, scale, y }}
        className="relative z-10 text-center flex flex-col items-center"
      >
        <motion.div
           initial={{ opacity: 0, y: 20, letterSpacing: "0.5em" }}
           animate={{ opacity: 1, y: 0, letterSpacing: "0.2em" }}
           transition={{ duration: 1.5, ease: "easeOut" }}
           className="text-[#C6A87C] uppercase text-sm font-bold mb-6 tracking-[0.2em]"
        >
          Est. 2024
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 50, filter: 'blur(20px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="text-[12vw] leading-none font-serif text-white font-bold tracking-tighter mix-blend-overlay"
        >
          PAVITRAM
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="text-white/50 text-xl md:text-2xl mt-8 font-light tracking-wide max-w-lg"
        >
          The soul of nature, distilled into silence.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute -bottom-32 text-white/30 text-sm flex flex-col items-center gap-2"
        >
          <span className="uppercase tracking-widest text-[10px]">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
        </motion.div>
      </motion.div>
    </section>
  );
}
