'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const benefits = [
  {
    number: "01",
    category: "Mind",
    title: "Neural Harmonization",
    description: "Within moments of inhalation, aromatic molecules cross the blood-brain barrier, inducing a synchronized alpha-wave state that elevates focus and creativity.",
    stat: "2.4x",
    statLabel: "Focus Increase",
    color: "#C6A87C"
  },
  {
    number: "02",
    category: "Body",
    title: "Systemic Restoration",
    description: "Our molecular architecture signals the parasympathetic nervous system, initiating a cascade of repair mechanisms that reduce inflammation and accelerate recovery.",
    stat: "-35%",
    statLabel: "Stress Markers",
    color: "#8B5E3C"
  },
  {
    number: "03",
    category: "Spirit",
    title: "Energetic Alignment",
    description: "Heat-activated molecules create a resonant field around the body, projecting an invisible aura of confidence that others perceive as magnetic presence.",
    stat: "12h+",
    statLabel: "Active Resonance",
    color: "#E2C59B"
  }
];

export default function BenefitScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = React.useState(false);
  
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative h-[600vh] bg-[#050505]">
      
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Cinematic Background Layers */}
        <motion.div 
          style={{ 
            backgroundColor: useTransform(scrollYProgress, 
              [0, 0.33, 0.66, 1], 
              ["#050505", "#15100a", "#0a1015", "#050505"]
            )
          }}
          className="absolute inset-0 transition-colors duration-1000"
        >
           {/* Texture Overlay */}
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-20 mix-blend-overlay" />
        </motion.div>

        {/* Ambient Atmospheric Glows */}
        <motion.div 
          style={{ 
            opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.6, 0.6, 0]),
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1.4, 0.7]),
            x: useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]),
            y: useTransform(scrollYProgress, [0, 1], ["10%", "-10%"])
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] bg-[#C6A87C]/5 rounded-full blur-[200px] pointer-events-none"
        />

        {/* Floating Aromatic Particles */}
        {isMounted && (
          <div className="absolute inset-0 pointer-events-none z-10">
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#C6A87C]/30 rounded-full"
                initial={{ 
                  x: `${Math.random() * 100}%`, 
                  y: `${Math.random() * 100}%`,
                  scale: Math.random() * 2
                }}
                animate={{ 
                  y: [`${Math.random() * 105}%`, `${-Math.random() * 20}%`],
                  opacity: [0, 0.4, 0],
                  x: [`${Math.random() * 100}%`, `${Math.random() * 100 + (Math.random() - 0.5) * 10}%`]
                }}
                transition={{ 
                  duration: Math.random() * 20 + 20,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 20
                }}
              />
            ))}
          </div>
        )}

        {/* Fixed Header */}
        <div className="absolute top-12 left-12 z-50 overflow-hidden">
           <motion.div
             initial={{ y: "100%" }}
             whileInView={{ y: 0 }}
             className="flex items-center gap-6"
           >
              <span className="text-[10px] font-bold tracking-[0.6em] text-[#C6A87C] uppercase">The Science of Soul</span>
              <div className="w-12 h-[1px] bg-[#C6A87C]/20" />
           </motion.div>
        </div>

        {/* Global Progress Indicators (Floating Corner) */}
        <div className="absolute bottom-12 right-12 z-50 text-right font-serif">
           <motion.div className="flex flex-col items-end gap-1">
              <div className="flex items-baseline gap-2">
                 <motion.span className="text-5xl text-white/10 leading-none">
                    {Math.round(scrollYProgress.get() * 100)}
                 </motion.span>
                 <span className="text-xs text-[#C6A87C]/40 tracking-widest">%</span>
              </div>
              <span className="text-[9px] uppercase tracking-[0.4em] text-[#C6A87C]/30">Extraction Intensity</span>
           </motion.div>
        </div>

        {/* Main Content */}
        <div className="absolute inset-0 flex items-center justify-center px-6 md:px-12">
          {benefits.map((benefit, i) => (
            <BenefitSlide 
              key={i} 
              benefit={benefit} 
              index={i} 
              progress={scrollYProgress} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}

function BenefitSlide({ benefit, index, progress }: any) {
  const start = index * 0.33;
  const end = (index + 1) * 0.33;
  
  const opacity = useTransform(progress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
  const scale = useTransform(progress, [start, start + 0.15, end - 0.15, end], [0.95, 1, 1, 0.95]);
  const yParallax = useTransform(progress, [start, end], [100, -100]);
  const xStat = useTransform(progress, [start, end], [-50, 50]);

  return (
    <motion.div 
      style={{ opacity, scale }}
      className="absolute inset-0 flex items-center justify-center p-6 md:p-12"
    >
      <div className="max-w-7xl w-full">
        
        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* Left: Enhanced Stat Display */}
          <motion.div 
            style={{ x: xStat }}
            className="lg:col-span-5 space-y-12 relative"
          >
            <div className="relative inline-block group">
              {/* Background Large Number */}
              <span 
                className="absolute -top-20 -left-10 text-[20rem] font-serif opacity-[0.03] select-none pointer-events-none"
                style={{ color: benefit.color }}
              >
                {benefit.number}
              </span>

              <div className="relative z-10 space-y-4">
                 <motion.div
                   initial={{ scaleX: 0 }}
                   whileInView={{ scaleX: 1 }}
                   transition={{ duration: 1 }}
                   className="w-24 h-[1px] bg-[#C6A87C]/40 origin-left"
                 />
                 <span className="text-sm font-bold tracking-[0.5em] uppercase text-[#C6A87C] block">
                    {benefit.category} Architecture
                 </span>
              </div>

              <div className="mt-12 relative inline-flex flex-col">
                <h4 
                  className="text-[10rem] md:text-[14rem] font-black tracking-tighter leading-none drop-shadow-2xl"
                  style={{ color: benefit.color }}
                >
                  {benefit.stat}
                </h4>
                <div className="flex items-center gap-4 mt-4">
                   <div className="w-2 h-2 rounded-full bg-[#C6A87C] animate-pulse" />
                   <p className="text-sm text-white/60 uppercase tracking-[0.4em] font-bold">
                    {benefit.statLabel}
                   </p>
                </div>
                {/* Intense Focal Glow */}
                <div 
                  className="absolute inset-0 blur-[100px] opacity-20 -z-10 group-hover:opacity-40 transition-opacity duration-1000"
                  style={{ backgroundColor: benefit.color }}
                />
              </div>
            </div>
          </motion.div>

          {/* Right: Narrative Content */}
          <motion.div 
            style={{ y: yParallax }}
            className="lg:col-span-7 flex flex-col justify-center space-y-12"
          >
            <div className="space-y-8">
              <h3 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white leading-[0.85] tracking-tighter mb-8 drop-shadow-2xl">
                {benefit.title.split(' ').map((word: string, i: number) => (
                  <span key={i} className="inline-block mr-4">
                    {word.split('').map((char: string, j: number) => (
                      <motion.span
                        key={j}
                        initial={{ opacity: 0, filter: 'blur(10px)' }}
                        whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                        transition={{ delay: (i * 0.1) + (j * 0.05) }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </h3>
              
              <div className="max-w-xl">
                 <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed tracking-wide italic border-l border-[#C6A87C]/40 pl-8">
                  "{benefit.description}"
                 </p>
              </div>
            </div>

            <div className="flex items-center gap-12">
               <motion.button 
                  whileHover={{ scale: 1.05 }}
                  className="relative px-12 py-5 bg-white/5 border border-white/10 rounded-full overflow-hidden group/btn backdrop-blur-sm"
               >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#C6A87C]/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-700" />
                  <span className="relative z-10 text-xs font-bold uppercase tracking-[0.4em] text-white group-hover/btn:text-[#C6A87C] transition-colors">
                    Explore Synthesis
                  </span>
               </motion.button>

               <div className="hidden md:flex flex-col gap-1">
                  <div className="w-24 h-[1px] bg-gradient-to-r from-[#C6A87C]/40 to-transparent" />
                  <span className="text-[8px] uppercase tracking-[0.4em] text-white/20">Protocol 00{index + 1}</span>
               </div>
            </div>
          </motion.div>

        </div>

      </div>
    </motion.div>
  );
}
