'use client';

import { motion } from 'framer-motion';

export default function CafeLocation({ content }: { content?: Record<string, string> }) {
   return (
      <section className="bg-[#080605] text-white py-32 md:py-48 border-t border-white/[0.03] relative overflow-hidden font-sans">
         {/* Ambient Glow */}
         <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-[#C6A87C]/4 blur-[160px] rounded-full pointer-events-none" />
         <div className="absolute top-0 right-0 w-[30vw] h-[30vw] bg-[#C6A87C]/3 blur-[120px] rounded-full pointer-events-none" />

         <div className="max-w-[2000px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
            
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
               
               {/* Location Image — padded frame */}
               <motion.div 
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full lg:w-1/2 h-[60vh] md:h-[80vh] relative rounded-3xl overflow-hidden group border border-white/[0.05] bg-[#0c0a09] p-2 shadow-2xl"
               >
                  <div className="w-full h-full rounded-[1.3rem] overflow-hidden relative">
                     <img 
                        src={content?.cafe_location_image || "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1000"} 
                        className="absolute inset-0 w-full h-full object-cover scale-[1.04] group-hover:scale-100 transition-transform duration-[2.5s] ease-[0.16,1,0.3,1]" 
                        alt="Cafe location"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                     
                     {/* Coordinates & Map Button */}
                     <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-20">
                        <div className="flex flex-col gap-1">
                           <span className="text-white/30 font-sans text-[8px] tracking-[0.3em] uppercase">Coordinates</span>
                           <span className="text-white/60 font-sans text-[10px] tracking-[0.2em] font-medium">
                              {content?.cafe_location_coords || "40.7128° N, 74.0060° W"}
                           </span>
                        </div>
                        <a 
                           href={content?.cafe_location_link || "https://maps.google.com"}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="flex items-center gap-2 bg-[#C6A87C] hover:bg-white text-black transition-all duration-500 px-4 py-2.5 rounded-full shadow-[0_0_24px_rgba(198,168,124,0.35)] pointer-events-auto group/btn"
                        >
                           <span className="text-[9px] font-bold tracking-[0.2em] uppercase font-sans hidden sm:block">Open Map</span>
                           <span className="text-base font-bold transform -rotate-45 leading-none group-hover/btn:rotate-0 transition-transform duration-300">→</span>
                        </a>
                     </div>
                  </div>
               </motion.div>

               {/* Location Details */}
               <div className="w-full lg:w-1/2 space-y-16">
                  
                  <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                     <span className="text-[#C6A87C] text-[9px] md:text-[10px] font-bold tracking-[0.6em] uppercase mb-6 block font-sans">
                        {content?.cafe_tag || "Our Sanctuary"}
                     </span>
                     <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight leading-[1.05] mb-8 text-white">
                        {content?.cafe_title || "Visit"}{" "}
                        <span className="italic text-[#C6A87C] font-serif font-medium">{content?.cafe_highlight || "The Roastery."}</span>
                     </h2>
                     <p className="text-white/50 font-light leading-relaxed max-w-md text-sm md:text-base border-l border-[#C6A87C]/20 pl-5 whitespace-pre-line font-sans">
                        {content?.cafe_location_desc || "Step into our world. A space meticulously designed for the pure appreciation of coffee, where every detail enhances the tasting experience."}
                     </p>
                  </motion.div>

                  {/* Address & Hours — structured editorial table */}
                  <motion.div 
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                     className="border-t border-white/[0.06] pt-12"
                  >
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        
                        {/* Address */}
                        <div className="space-y-5">
                           <div className="flex items-center gap-3 mb-6">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#C6A87C] animate-pulse" />
                              <h4 className="text-[9px] tracking-[0.5em] uppercase text-white/30 font-bold font-sans">Location</h4>
                           </div>
                           <div className="space-y-0 font-serif text-xl md:text-2xl text-white/90 whitespace-pre-line leading-relaxed font-light">
                              {content?.cafe_address || "123 Artisan Way,\nThe Roasters District,\nNew York, NY 10001"}
                           </div>
                        </div>

                        {/* Hours */}
                        <div className="space-y-5">
                           <div className="flex items-center gap-3 mb-6">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#C6A87C]" />
                              <h4 className="text-[9px] tracking-[0.5em] uppercase text-white/30 font-bold font-sans">Hours</h4>
                           </div>
                           <div className="space-y-0 font-serif text-xl md:text-2xl text-[#C6A87C] whitespace-pre-line leading-relaxed font-light">
                              {content?.cafe_hours || "Mon – Fri: 7am – 7pm\nSat – Sun: 8am – 8pm"}
                           </div>
                        </div>

                     </div>
                  </motion.div>

               </div>

            </div>
         </div>
      </section>
   );
}
