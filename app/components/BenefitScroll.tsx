'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const benefits = [
  {
    number: "01",
    category: "Mind",
    title: "Morning Clarity",
    description: "A perfect cup of coffee jumpstarts your morning, enhancing focus and preparing you for the day ahead with absolute clarity.",
    stat: "2.4x",
    statLabel: "Focus Increase",
    img: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=1000"
  },
  {
    number: "02",
    category: "Body",
    title: "Rich Tasting Notes",
    description: "Experience a symphony of flavors in every sip, from bright fruity notes to deep, dark chocolate undertones that awaken the senses.",
    stat: "+100%",
    statLabel: "Flavor Profile",
    img: "https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&q=80&w=1000"
  },
  {
    number: "03",
    category: "Spirit",
    title: "Shared Moments",
    description: "Coffee is more than a drink; it's a social ritual. An experience meant to be shared with friends, fostering deep connections.",
    stat: "Daily",
    statLabel: "Connection",
    img: "https://images.unsplash.com/photo-1511920170033-f8396924c648?auto=format&fit=crop&q=80&w=1000"
  }
];

export default function BenefitScroll() {
   const [active, setActive] = useState(0);

   return (
      <section className="bg-[#080605] text-white py-32 md:py-48 relative overflow-hidden">
         {/* Noise Texture */}
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay pointer-events-none" />

         <div className="max-w-[2000px] mx-auto px-6 md:px-12 lg:px-24">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10 items-start">
               
               {/* Left: Interactive Accordion List */}
               <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  
                  <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  >
                     <span className="text-[#C6A87C] tracking-[0.5em] text-[10px] md:text-xs font-bold uppercase mb-6 block">
                        The Philosophy
                     </span>
                     <h2 className="text-5xl md:text-7xl font-serif tracking-tighter leading-[0.9] mb-16 drop-shadow-lg">
                        The Hodl & Sip <br/>
                        <span className="italic text-[#C6A87C]">Difference.</span>
                     </h2>
                  </motion.div>

                  <div className="flex flex-col w-full border-t border-white/10">
                     {benefits.map((b, i) => (
                        <div 
                           key={i}
                           onMouseEnter={() => setActive(i)}
                           onClick={() => setActive(i)}
                           className={`py-8 md:py-12 border-b border-white/10 cursor-pointer transition-all duration-700 ease-[0.16,1,0.3,1] group relative ${active === i ? 'pl-8 md:pl-12' : 'pl-0'}`}
                        >
                           {/* Active Indicator Line */}
                           <div className={`absolute left-0 top-0 bottom-0 w-1 bg-[#C6A87C] transition-all duration-700 ease-[0.16,1,0.3,1] ${active === i ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`} />

                           <div className="flex items-center justify-between mb-2">
                              <h3 className={`text-4xl md:text-5xl font-serif tracking-tighter transition-colors duration-700 ${active === i ? 'text-white' : 'text-white/30 group-hover:text-white/60'}`}>
                                 {b.title}
                              </h3>
                              <span className={`text-sm font-mono tracking-widest transition-opacity duration-700 ${active === i ? 'text-[#C6A87C] opacity-100' : 'opacity-0'}`}>
                                 {b.number}
                              </span>
                           </div>

                           <div className={`grid transition-all duration-700 ease-[0.16,1,0.3,1] ${active === i ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                              <div className="overflow-hidden">
                                 <p className="text-white/70 font-light text-lg italic leading-relaxed border-l border-[#C6A87C]/30 pl-6 max-w-md">
                                    "{b.description}"
                                 </p>
                                 
                                 <div className="flex items-baseline gap-4 pt-8">
                                    <span className="text-5xl font-serif text-[#C6A87C]">{b.stat}</span>
                                    <span className="text-[10px] tracking-[0.3em] uppercase text-white/50">{b.statLabel}</span>
                                 </div>
                              </div>
                           </div>

                        </div>
                     ))}
                  </div>
               </div>

               {/* Right: Sticky Image Reveal */}
               <div className="w-full lg:w-1/2 h-[60vh] lg:h-[85vh] sticky top-32">
                  <div className="w-full h-full relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/5">
                     
                     <AnimatePresence mode="wait">
                        <motion.img 
                           key={active}
                           src={benefits[active].img} 
                           initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                           animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                           exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                           className="absolute inset-0 w-full h-full object-cover" 
                        />
                     </AnimatePresence>

                     {/* Image Gradients */}
                     <div className="absolute inset-0 bg-gradient-to-t from-[#080605]/80 via-transparent to-transparent pointer-events-none" />
                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />

                     {/* Overlay Details */}
                     <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-10">
                        <motion.div 
                           key={`cat-${active}`}
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.2, duration: 0.5 }}
                           className="flex items-center gap-4"
                        >
                           <div className="w-8 h-[1px] bg-[#C6A87C]" />
                           <span className="text-[#C6A87C] text-[10px] font-bold tracking-[0.4em] uppercase">{benefits[active].category} Phase</span>
                        </motion.div>
                     </div>

                  </div>
               </div>

            </div>
         </div>
      </section>
   );
}
