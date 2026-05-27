'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function OurStory({ content }: { content: Record<string, string> }) {
   const containerRef = useRef<HTMLDivElement>(null);
   const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
   
   const y1 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
   const y2 = useTransform(scrollYProgress, [0, 1], [80, -80]);

   return (
      <section ref={containerRef} className="relative bg-[#080605] py-32 md:py-48 px-6 overflow-hidden border-t border-white/[0.04]">
         {/* Subtle background detail */}
         <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#C6A87C]/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
         
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-16 items-center">
               
               {/* Left Narrative */}
               <motion.div 
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true, margin: "-10%" }}
                 transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                 className="space-y-12 order-2 lg:order-1"
               >
                  <div className="space-y-6">
                     <span className="text-[9px] md:text-[10px] font-bold tracking-[0.6em] uppercase text-[#C6A87C] block font-sans">
                        {content?.story_tag || "The Heritage"}
                     </span>
                     <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tight leading-[1.05]">
                        {content?.story_title || "A Legacy in"} <br />
                        <span className="text-[#C6A87C] italic font-medium font-serif">{content?.story_highlight || "Every Bean."}</span>
                     </h2>
                  </div>

                  <div className="space-y-8 max-w-lg font-sans">
                     <p className="text-base md:text-lg text-white/50 font-light leading-relaxed">
                        {content?.story_desc_1 || "Founded on a relentless pursuit of perfection, Hodl & Sip began as a small roasting experiment in an old garage. We wanted to see what happens when you treat coffee not as a commodity, but as an artisanal craft."}
                     </p>
                     <p className="text-base md:text-lg text-white/50 font-light leading-relaxed">
                        {content?.story_desc_2 || "Today, we travel the world seeking the rarest beans, bringing them back to our roastery to unlock their hidden potential. Every cup we serve is a testament to the farmers, the roasters, and the community that makes this possible."}
                     </p>
                  </div>
               </motion.div>

               {/* Right Images (Dual Parallax with double outline frames) */}
               <div className="relative h-[65vh] md:h-[80vh] w-full order-1 lg:order-2 mb-16 lg:mb-0">
                  
                  {/* Image 1 Frame */}
                  <motion.div 
                     style={{ y: y1 }}
                     className="absolute top-0 right-0 md:right-8 w-[65%] md:w-[60%] aspect-[3/4] rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl z-10 bg-[#080605] p-2"
                  >
                     <div className="w-full h-full rounded-[1.3rem] overflow-hidden relative group">
                        <img src={content?.story_image_1 || "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1200"} className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" alt="Roasting Process" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                     </div>
                  </motion.div>

                  {/* Image 2 Frame */}
                  <motion.div 
                     style={{ y: y2 }}
                     className="absolute bottom-0 left-0 md:left-8 w-[60%] md:w-[55%] aspect-square rounded-3xl overflow-hidden border border-[#C6A87C]/15 shadow-[0_25px_50px_rgba(0,0,0,0.9)] z-20 bg-[#080605] p-2"
                  >
                     <div className="w-full h-full rounded-[1.3rem] overflow-hidden relative group">
                        <img src={content?.story_image_2 || "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=1200"} className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" alt="Coffee Cherries" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 font-sans">
                           <span className="text-[#C6A87C] text-[9px] tracking-[0.3em] uppercase font-bold">Est. 2024</span>
                        </div>
                     </div>
                  </motion.div>
               </div>

            </div>
         </div>
      </section>
   );
}
