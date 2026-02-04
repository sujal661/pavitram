'use client';

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const products = [
  { 
    id: "01", 
    name: "Sandalwood", 
    subtitle: "Sacred Mysore Santalum", 
    desc: "A timeless masterpiece extracted from mature heartwood. Its creamy, balsamic resonance creates a foundation of profound stillness.", 
    meta: { family: "Woody", origin: "Mysore, India", rarity: "Premium" },
    color: "#2c1810", 
    bg: "#C68252",
    accent: "#FFD700",
    img: "/framers/ezgif-frame-001.jpg" 
  },
  { 
    id: "02", 
    name: "Jasmine", 
    subtitle: "Absolute Sambac", 
    desc: "Hand-harvested at the stroke of midnight. This euphoric absolute captures the intoxicating floral soul of the night.", 
    meta: { family: "Floral", origin: "Madurai, India", rarity: "Exotic" },
    color: "#1a1a1a", 
    bg: "#D4B484",
    accent: "#ffffff",
    img: "/framers/ezgif-frame-010.jpg" 
  },
  { 
    id: "03", 
    name: "Lavender", 
    subtitle: "Kashmiri High Altitude", 
    desc: "Distilled from blooms grown 7,000ft above sea level. Crisp, medicinal, and ethereal—the pure scent of Himalayan air.", 
    meta: { family: "Herbal", origin: "Kashmir, India", rarity: "Ultra-Rare" },
    color: "#1a1b2c", 
    bg: "#A8B6CC",
    accent: "#667eea",
    img: "/framers/ezgif-frame-020.jpg" 
  },
  { 
    id: "04", 
    name: "Rose", 
    subtitle: "Damascena Heart", 
    desc: "The queen of oils. Five tons of petals condensed into a single litre of pure frequency, opening the vibration of love.", 
    meta: { family: "Floral", origin: "Kannauj, India", rarity: "Supreme" },
    color: "#2c1014", 
    bg: "#E8C2B8",
    accent: "#ff3e3e",
    img: "/framers/ezgif-frame-030.jpg" 
  },
];

export default function ProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <section ref={containerRef} className="relative bg-[#050505] text-[#C6A87C]">
      
      {/* Introduction Section - High-Fidelity Atmosphere */}
      <div className="h-screen flex items-center justify-center sticky top-0 z-0 overflow-hidden bg-[#050505]">
          
          {/* Dynamic Liquid Atmosphere */}
          <div className="absolute inset-0">
             <motion.div 
               style={{ 
                 opacity: useTransform(scrollYProgress, [0, 0.2, 0.5], [0.4, 0.2, 0]),
                 scale: useTransform(scrollYProgress, [0, 1], [1, 1.5])
               }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] bg-gradient-to-tr from-[#C6A87C]/10 via-transparent to-[#8B5E3C]/10 blur-[120px] rounded-full animate-spin-slow" 
             />
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-20 pointer-events-none" />
             
             {/* Floating Dust Particles */}
             {isMounted && (
                <div className="absolute inset-0 opacity-30">
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-[2px] h-[2px] bg-[#C6A87C]/40 rounded-full"
                      animate={{ 
                        y: ['-10vh', '110vh'],
                        x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`],
                        opacity: [0, 1, 0]
                      }}
                      transition={{ 
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 5
                      }}
                    />
                  ))}
                </div>
             )}
          </div>
          
          <div className="text-center relative z-10 space-y-12">
             <div className="overflow-hidden">
               <motion.span
                 initial={{ y: "100%" }}
                 whileInView={{ y: 0 }}
                 transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                 className="block text-[#C6A87C] text-xs font-bold tracking-[1.2em] uppercase opacity-80"
               >
                 Archival Selection
               </motion.span>
             </div>

             <motion.h2 
               initial={{ opacity: 0, scale: 0.9, filter: 'blur(30px)' }}
               whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
               transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
               className="text-[14vw] font-serif leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#f3e3ad] via-[#C6A87C] to-[#8B5E3C] drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] select-none italic"
             >
               ARCHIVE
             </motion.h2>
             
             <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               transition={{ delay: 1.2, duration: 1.5 }}
               className="flex flex-col items-center gap-8"
             >
               <div className="flex items-center gap-12">
                 <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#C6A87C]/60" />
                 <p className="text-sm md:text-base font-serif italic text-white/50 tracking-[0.6em] uppercase">
                    The Sacred Library
                 </p>
                 <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#C6A87C]/60" />
               </div>
               
               {/* Vertical Progress Scroll Indicator */}
               <motion.div 
                 className="relative flex flex-col items-center gap-4"
               >
                  <motion.div 
                    style={{ height: useTransform(scrollYProgress, [0, 0.2], [0, 120]) }}
                    className="w-[1px] bg-gradient-to-b from-[#C6A87C] to-transparent" 
                  />
                  <span className="text-[8px] tracking-[0.5em] text-[#C6A87C]/40 uppercase rotate-90 origin-left mt-10">Descent</span>
               </motion.div>
             </motion.div>
          </div>
      </div>

      <div className="relative z-10 pb-[20vh] px-4 md:px-0">
         {products.map((product, i) => {
           // Calculate range for each card based on index
           const targetScale = 1 - ( (products.length - 1 - i) * 0.05 );
           return (
             <Card 
               key={i} 
               i={i} 
               {...product} 
               progress={scrollYProgress} 
               targetScale={targetScale} 
             />
           );
         })}
      </div>
    </section>
  );
}

const Card = ({ i, name, subtitle, desc, meta, color, bg, img, progress, targetScale }: any) => {
  const container = useRef(null);
  
  // Refined Scroll Perspective
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  // Entry Animations
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.4], [100, 0]);
  
  // Stacking Animations (using the parent progress)
  const stackStart = i * 0.15; // Adjusted start points for tighter stacking
  const cardScale = useTransform(progress, [stackStart, 1], [1, targetScale]);
  const cardBlur = useTransform(progress, [stackStart + 0.1, 1], [0, 2]);

  return (
    <div ref={container} className="h-[120vh] flex items-center justify-center sticky top-0">
      <motion.div 
        style={{ 
          scale: cardScale, 
          opacity,
          y,
          filter: `blur(${cardBlur}px)`,
          top: `calc(10vh + ${i * 20}px)` 
        }} 
        className="relative flex flex-col md:flex-row w-[90vw] h-[70vh] rounded-[3rem] overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.5)] origin-top border border-white/10 group"
      >
        {/* Left Side: Text Details */}
        <motion.div 
          className="w-full md:w-1/2 p-12 md:p-20 flex flex-col justify-between relative z-10 transition-all duration-700" 
          style={{ 
            backgroundColor: bg, 
            color: color
          }}
        >
           <div className="space-y-8">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold tracking-[0.5em] uppercase opacity-50">
                  Origin 00{i + 1}
                </span>
                <div className="flex-1 h-[0.5px] bg-current opacity-10" />
              </div>

              <div className="space-y-3">
                <h3 className="text-7xl md:text-9xl font-serif leading-none tracking-tighter">
                  {name}
                </h3>
                <p className="text-sm md:text-base font-serif italic opacity-60 tracking-[0.3em] uppercase">
                  {subtitle}
                </p>
              </div>

              {/* Product Metadata Grid */}
              <div className="grid grid-cols-3 gap-6 py-10 border-y border-current/10">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.3em] opacity-40">Family</p>
                  <p className="text-xs font-bold tracking-widest uppercase">{meta.family}</p>
                </div>
                <div className="space-y-1 border-x border-current/10 px-6">
                  <p className="text-[10px] uppercase tracking-[0.3em] opacity-40">Origin</p>
                  <p className="text-xs font-bold tracking-widest uppercase">{meta.origin}</p>
                </div>
                <div className="space-y-1 pl-6">
                  <p className="text-[10px] uppercase tracking-[0.3em] opacity-40">Rarity</p>
                  <p className="text-xs font-bold tracking-widest uppercase">{meta.rarity}</p>
                </div>
              </div>
           </div>

           <div className="space-y-12">
             <p className="text-xl md:text-2xl font-light opacity-100 leading-relaxed max-w-sm italic">
               "{desc}"
             </p>
             
                <div className="relative inline-block group/btn">
                  <div className="absolute -inset-4 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-1000 blur-2xl" style={{ backgroundColor: color, opacity: 0.15 }} />
                  
                  <button className="relative px-12 py-5 border-[1.5px] border-current rounded-full uppercase text-xs font-bold tracking-[0.4em] overflow-hidden transition-all duration-500 group-hover/btn:scale-105 group-hover/btn:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                    <div className="absolute inset-0 bg-current transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700 ease-[0.16, 1, 0.3, 1]" />
                    
                    {/* Shimmer Effect */}
                    <motion.div 
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                      className="absolute top-0 bottom-0 w-12 bg-white/30 -skew-x-12 blur-xl pointer-events-none"
                    />

                    <span className="relative z-10 flex items-center gap-6 transition-colors duration-500" style={{ color: bg }}>
                      <span className="group-hover/btn:text-white transition-colors duration-500">Discover Essence</span>
                      <span className="text-xl group-hover/btn:translate-x-3 transition-transform duration-500 group-hover/btn:text-white">→</span>
                    </span>
                  </button>
              </div>
           </div>
            
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        </motion.div>

        {/* Right Side: Enhanced Image Parallax */}
        <div className="w-full md:w-1/2 relative overflow-hidden bg-[#050505]">
           <motion.div 
             className="w-full h-full"
             style={{ 
               scale: useTransform(scrollYProgress, [0, 1], [1.3, 1]),
               x: useTransform(scrollYProgress, [0, 1], ["2%", "-2%"])
             }}
           >
             <img src={img} className="w-full h-full object-cover" />
           </motion.div>
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
           <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
        </div>

      </motion.div>
    </div>
  );
};
