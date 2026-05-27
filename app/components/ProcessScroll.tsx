'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const processSteps = [
  {
    number: "01",
    title: "The Source",
    location: "High-Altitude Farms",
    desc: "We source our beans from sustainable, high-altitude farms where the climate produces the most flavorful coffee cherries.",
    img: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=1200"
  },
  {
    number: "02",
    title: "The Roast",
    location: "Artisan Roastery",
    desc: "Our master roasters carefully monitor time and temperature to bring out the unique characteristics of each bean.",
    img: "https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&q=80&w=1200"
  },
  {
    number: "03",
    title: "The Brew",
    location: "Your Cup",
    desc: "Whether poured over or pulled as espresso, our coffee is designed to deliver a perfect, balanced cup every time.",
    img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1200"
  }
];

export default function ProcessScroll({ content }: { content?: Record<string, string> }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  const cmsStepCount = Object.keys(content || {}).filter(k => k.startsWith('process_') && k.endsWith('_title')).length;
  const stepCount = Math.max(cmsStepCount, 3);

  const dynamicSteps = Array.from({ length: stepCount }).map((_, idx) => {
    const defaultStep = processSteps[idx] || { 
      number: `0${idx + 1}`, 
      title: "New Process", 
      location: "Location", 
      desc: "Process description goes here.", 
      img: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=1200" 
    };
    return {
      ...defaultStep,
      number: `0${idx + 1}`,
      title: content?.[`process_${idx + 1}_title`] || defaultStep.title,
      location: content?.[`process_${idx + 1}_location`] || defaultStep.location,
      desc: content?.[`process_${idx + 1}_desc`] || defaultStep.desc,
      img: content?.[`process_${idx + 1}_image`] || content?.[`process_${idx + 1}`] || defaultStep.img
    };
  });

  const yBgText = useTransform(scrollYProgress, [0, 1], [0, -300]);

  return (
    <section className="relative bg-[#080605] overflow-hidden border-t border-white/[0.04] border-b border-white/[0.04]">
      
      {/* Background Parallax Typography */}
      <motion.div 
        style={{ y: yBgText }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <span className="absolute top-[10%] -left-[10%] text-[20rem] md:text-[30rem] font-serif opacity-[0.015] text-white whitespace-nowrap rotate-90 select-none">
          ROASTING
        </span>
        <span className="absolute top-[60%] -right-[10%] text-[20rem] md:text-[30rem] font-serif opacity-[0.015] text-white whitespace-nowrap -rotate-90 select-none">
          BREWING
        </span>
      </motion.div>

      {/* Header Section - Editorial Style */}
      <div className="min-h-[60vh] md:min-h-[80vh] flex items-center justify-center px-6 pt-24 relative z-10">
        <div className="max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center space-y-8"
          >
            <div className="space-y-4">
              <span className="text-[9px] md:text-[10px] font-bold tracking-[0.6em] uppercase text-[#C6A87C] block font-sans">
                {content?.process_header_tag || "The Brewing Process"}
              </span>
            </div>

            <h2 className="text-[12vw] md:text-[7vw] font-serif text-white leading-tight tracking-tight">
              {content?.process_header_title || "Craft &"} <br />
              <span className="text-[#C6A87C] italic font-serif font-medium">{content?.process_header_highlight || "Passion."}</span>
            </h2>

            <div className="max-w-xl mx-auto px-4 font-sans">
              <p className="text-base md:text-lg text-white/50 font-light leading-relaxed">
                {content?.process_header_desc || "We believe that great coffee cannot be rushed. It must be crafted. Our methodology honors the journey from bean to cup."}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Glowing Timeline Section */}
      <div ref={containerRef} className="max-w-7xl mx-auto px-6 md:px-8 pb-32 md:pb-64 relative z-10">
         
         {/* The Track Line */}
         <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/5 md:-translate-x-1/2" />
         
         {/* The Glowing Progress Line */}
         <motion.div 
            style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] md:w-[2px] bg-gradient-to-b from-[#C6A87C]/10 via-[#C6A87C] to-[#C6A87C] md:-translate-x-1/2 shadow-[0_0_15px_rgba(198,168,124,0.4)] z-20"
         />

        <div className="space-y-24 md:space-y-48 pt-12 md:pt-24 relative">
            {dynamicSteps.map((step, i) => (
              <TimelineStep key={i} step={step} index={i} />
            ))}
        </div>
      </div>

    </section>
  );
}

function TimelineStep({ step, index }: { step: any, index: number }) {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-24 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Node Indicator */}
      <div className="absolute left-8 md:left-1/2 top-0 md:top-1/2 w-3.5 h-3.5 rounded-full bg-[#080605] border-2 border-[#C6A87C] -translate-x-[6px] md:-translate-x-1/2 md:-translate-y-1/2 z-30 shadow-[0_0_12px_rgba(198,168,124,0.6)]" />
      
      {/* Content Side */}
      <div className="flex-1 w-full pl-16 md:pl-0 pt-2 md:pt-0">
         <div className={`flex flex-col ${isEven ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} space-y-4`}>
            <span className="text-[#C6A87C] font-sans tracking-[0.4em] text-[9px] font-bold uppercase block">
               Phase {step.number}
            </span>
            <h3 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
               {step.title}
            </h3>
            <p className="text-sm md:text-base text-white/50 leading-relaxed max-w-sm font-sans font-light">
               {step.desc}
            </p>
            <div className="pt-2 flex items-center gap-2.5 font-sans">
               <div className="w-1.5 h-1.5 rounded-full bg-[#C6A87C] animate-pulse" />
               <span className="text-[9px] text-white/40 tracking-[0.25em] uppercase">Location: {step.location}</span>
            </div>
         </div>
      </div>

      {/* Image Side */}
      <div className="flex-1 w-full pl-16 md:pl-0">
         <div className="relative group overflow-hidden rounded-3xl border border-white/[0.08] shadow-2xl aspect-[4/3] md:aspect-[16/10] bg-[#0c0a09] p-2">
            <div className="w-full h-full rounded-[1.3rem] overflow-hidden relative">
               <img 
                  src={step.img} 
                  alt={step.title}
                  className="w-full h-full object-cover scale-[1.03] group-hover:scale-100 transition-transform duration-1000 ease-out"
               />
               <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
            </div>
            
            {/* Status floating badge */}
            <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md border border-white/[0.08] px-4 py-1.5 rounded-full hidden md:block z-10">
               <span className="text-[#C6A87C] text-[8px] uppercase tracking-[0.2em] font-semibold font-sans">Active Protocol</span>
            </div>
         </div>
      </div>

    </motion.div>
  );
}
