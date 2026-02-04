'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const processSteps = [
  {
    number: "01",
    title: "The Source",
    location: "Mysore / Madurai",
    desc: "We wait for the exact moment of peak botanical resonance. Harvesting only under the ascending moon when the plant's life force is at its zenith.",
    img: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=1200"
  },
  {
    number: "02",
    title: "The Extraction",
    location: "High Altitude Stills",
    desc: "A singular, gravity-fed copper distillation process. No pressure, no rush. The essence is allowed to reveal itself over 48 hours of gentle heat.",
    img: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=1200"
  },
  {
    number: "03",
    title: "The Curing",
    location: "Underground Cellars",
    desc: "Every batch is aged in violet glass for one full lunar cycle. This allows the volatile organic compounds to stabilize into a permanent symphony of scent.",
    img: "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&q=80&w=1200"
  }
];

export default function ProcessScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const yBgText = useTransform(scrollYProgress, [0, 1], [0, -400]);

  return (
    <section ref={containerRef} className="relative bg-[#050505] overflow-hidden">
      
      {/* Background Parallax Typography */}
      <motion.div 
        style={{ y: yBgText }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <span className="absolute top-1/4 -left-20 text-[30rem] font-serif opacity-[0.02] text-white whitespace-nowrap rotate-90">
          SYNTHESIS
        </span>
        <span className="absolute top-3/4 -right-20 text-[30rem] font-serif opacity-[0.02] text-white whitespace-nowrap -rotate-90">
          EVOLUTION
        </span>
      </motion.div>

      {/* Header Section - Editorial Style */}
      <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
        <div className="max-w-6xl w-full">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="flex flex-col items-center text-center space-y-12"
          >
            <div className="space-y-4">
              <motion.div
                 initial={{ width: 0 }}
                 whileInView={{ width: 80 }}
                 transition={{ duration: 1.5, ease: "circOut" }}
                 className="h-[1px] bg-[#C6A87C] mx-auto"
              />
              <span className="text-[10px] font-bold tracking-[0.8em] uppercase text-[#C6A87C] block">
                The Sacred Protocol
              </span>
            </div>

            <h2 className="text-[12vw] md:text-[10vw] font-serif text-white leading-none tracking-tighter mix-blend-difference italic">
              Alchemy & <br />
              <span className="text-[#C6A87C]">Patience.</span>
            </h2>

            <div className="max-w-2xl mx-auto space-y-8">
              <p className="text-xl md:text-2xl text-white/50 font-light leading-relaxed">
                We believe that true essence cannot be forced. It must be invited. 
                Our methodology honors the ancient laws of botanical vibration.
              </p>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-[1px] h-20 bg-gradient-to-b from-[#C6A87C] to-transparent" />
                <span className="text-[9px] uppercase tracking-[0.5em] text-[#C6A87C]/40">Begin Descent</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Process Steps */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-64 relative z-10">
        {processSteps.map((step, i) => (
          <ProcessStep key={i} step={step} index={i} />
        ))}
      </div>

    </section>
  );
}

function ProcessStep({ step, index }: { step: any, index: number }) {
  const isEven = index % 2 === 0;
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const yImg = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const yContent = useTransform(scrollYProgress, [0, 1], [50, -50]);
  
  return (
    <div ref={cardRef} className="mb-[30vh] md:mb-[50vh] last:mb-0">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
        
        {/* Cinematic Image Frame */}
        <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'} relative group`}>
           <motion.div 
             style={{ y: yImg }}
             className="relative aspect-[16/10] overflow-hidden rounded-[2rem] shadow-[0_50px_100px_rgba(0,0,0,0.4)] border border-white/5"
           >
              <img 
                src={step.img} 
                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[2s] ease-out"
                alt={step.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
              
              {/* Floating Metadata Overlays */}
              <div className="absolute top-8 left-8 flex flex-col gap-2">
                 <div className="bg-black/60 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full">
                    <span className="text-xs text-[#C6A87C] font-mono tracking-[0.3em] uppercase font-bold">Protocol 00{step.number}</span>
                 </div>
              </div>

              <div className="absolute bottom-8 right-8">
                 <motion.div 
                   whileHover={{ scale: 1.05 }}
                   className="flex items-center gap-6 bg-white/5 backdrop-blur-2xl border border-white/10 p-5 rounded-3xl"
                 >
                    <div className="w-12 h-12 rounded-full border border-[#C6A87C]/40 flex items-center justify-center animate-spin-slow">
                       <div className="w-2 h-2 rounded-full bg-[#C6A87C]" />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[10px] text-[#C6A87C] font-bold tracking-[0.4em] uppercase opacity-70">Status</span>
                       <span className="text-sm text-white font-serif italic tracking-wide">Optimizing Resonance...</span>
                    </div>
                 </motion.div>
              </div>
           </motion.div>

           {/* Perspective Decorative Frame */}
           <div className={`absolute -inset-4 border border-[#C6A87C]/10 rounded-[2.5rem] -z-10 group-hover:inset-0 transition-all duration-1000 ${isEven ? 'translate-x-4 translate-y-4' : '-translate-x-4 -translate-y-4'}`} />
        </div>

        {/* Narrative Content */}
        <motion.div 
          style={{ y: yContent }}
          className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'} space-y-10`}
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4">
               <span className="text-xs font-bold tracking-[0.5em] text-[#C6A87C] uppercase">Phase {step.number}</span>
               <div className="w-16 h-[1px] bg-[#C6A87C]/40" />
            </div>
            
            <h3 className="text-6xl md:text-8xl font-serif text-white tracking-tighter leading-none">
              {step.title}
            </h3>

            <div className="flex items-center gap-4">
               <div className="w-2 h-2 rounded-full bg-[#C6A87C] animate-pulse" />
               <span className="text-sm text-white/50 font-mono tracking-[0.3em] uppercase">Location: {step.location}</span>
            </div>
          </div>

          <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed max-w-lg">
            {step.desc}
          </p>

          <div className="pt-8">
            <motion.button
              whileHover={{ x: 15 }}
              className="group relative flex items-center gap-6 overflow-hidden pr-8"
            >
              <div className="w-12 h-12 rounded-full border border-[#C6A87C]/30 flex items-center justify-center group-hover:border-[#C6A87C]/80 transition-colors">
                 <span className="text-[#C6A87C] text-sm font-bold group-hover:translate-x-1 transition-transform">→</span>
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.5em] text-[#C6A87C]/70 group-hover:text-[#C6A87C] transition-colors">
                 View Archival Records
              </span>
            </motion.button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
