'use client';

import Navbar from "../components/Navbar";
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

export default function StoryClient({ content }: { content: Record<string, string> }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 70, damping: 20 });

  return (
    <main ref={containerRef} className="bg-[#080605] overflow-x-hidden relative selection:bg-[#C6A87C] selection:text-black font-sans">
      <Navbar />
      
      {/* Ambient Backgrounds */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-[10%] left-[10%] w-[700px] h-[700px] bg-[#C6A87C]/4 rounded-full blur-[200px]" />
         <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-[#C6A87C]/4 rounded-full blur-[150px]" />
      </div>

      <HeroSection scrollYProgress={scrollYProgress} content={content} />

      {/* Main Narrative Timeline */}
      <div className="relative max-w-[2000px] mx-auto px-6 md:px-12 lg:px-24 pb-64 z-10">
         
         {/* Vertical Golden Timeline Line (Desktop) */}
         <div className="absolute left-6 md:left-24 lg:left-32 top-0 bottom-0 w-[1px] bg-white/[0.04] hidden md:block">
            <motion.div 
               className="w-full bg-gradient-to-b from-[#C6A87C] via-[#C6A87C] to-transparent origin-top"
               style={{ scaleY: smoothProgress, height: "100%" }}
            />
         </div>

         {/* Chapters */}
         <div className="md:pl-20 lg:pl-32 pt-32 space-y-48 md:space-y-64">
            <ChapterOne content={content} />
            <ChapterTwo content={content} />
            <ChapterThree content={content} />
         </div>
      </div>

      <CTASection content={content} />
      
      {/* Minimal Footer */}
      <footer className="relative z-10 py-16 border-t border-white/[0.04] px-6 md:px-24 flex flex-col md:flex-row justify-between items-center gap-8 text-white/30 text-[9px] uppercase tracking-[0.35em] font-bold font-sans">
         <span>© {new Date().getFullYear()} {content?.footer_brand || "Hodl & Sip Coffee Roasters"}</span>
         <div className="flex gap-8 md:gap-12">
            <a href="#" className="hover:text-[#C6A87C] transition-colors">{content?.footer_link_1 || "Instagram"}</a>
            <a href="#" className="hover:text-[#C6A87C] transition-colors">{content?.footer_link_2 || "Journal"}</a>
            <a href="#" className="hover:text-[#C6A87C] transition-colors">{content?.footer_link_3 || "Wholesale"}</a>
         </div>
      </footer>
    </main>
  );
}

function HeroSection({ scrollYProgress, content }: { scrollYProgress: any, content: any }) {
   const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
   const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
   const scale = useTransform(scrollYProgress, [0, 0.15], [1, 1.08]);

   return (
      <section className="h-[100vh] relative flex items-center justify-center overflow-hidden">
         <motion.div 
            style={{ y, scale, opacity }}
            className="absolute inset-0 z-0 origin-center"
         >
            <img 
               src={content?.story_hero_img || "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=2500"} 
               className="w-full h-full object-cover opacity-45 grayscale-[0.2]"
               alt="Mist over coffee farms"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#080605]/30 via-[#080605]/55 to-[#080605]" />
         </motion.div>

         <div className="relative z-10 text-center px-6 mt-20">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
               className="overflow-hidden mb-8"
            >
               <span className="text-[#C6A87C] tracking-[0.6em] text-[10px] md:text-xs font-bold uppercase block font-sans">
                  {content?.story_hero_tag || "Established 2012"}
               </span>
            </motion.div>
            
            <motion.h1 
               initial={{ opacity: 0, scale: 0.97 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
               className="text-7xl md:text-[9rem] lg:text-[12rem] font-serif text-white tracking-tighter leading-[0.9] drop-shadow-2xl"
            >
               {content?.story_hero_title || "The"}{" "}
               <span className="italic text-[#C6A87C] font-serif font-medium">{content?.story_hero_highlight || "Legacy."}</span>
            </motion.h1 >
         </div>

         <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-5"
         >
            <span className="text-white/25 text-[9px] tracking-[0.4em] uppercase font-bold font-sans">Discover</span>
            <div className="w-[1px] h-14 bg-white/[0.08] relative overflow-hidden">
               <motion.div 
                  animate={{ y: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C6A87C] to-transparent"
               />
            </div>
         </motion.div>
      </section>
   );
}

function ChapterOne({ content }: { content: any }) {
   return (
      <div className="relative grid grid-cols-1 xl:grid-cols-[1fr_1.2fr] gap-16 xl:gap-32 items-center">
         {/* Timeline dot */}
         <div className="hidden md:flex absolute -left-20 lg:-left-32 top-12 w-7 h-7 items-center justify-center bg-[#080605] border border-[#C6A87C]/50 rounded-full z-20">
            <div className="w-2 h-2 bg-[#C6A87C] rounded-full" />
         </div>

         <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative group"
         >
            <div className="aspect-[4/5] overflow-hidden rounded-3xl border border-white/[0.05] shadow-2xl relative bg-[#0c0a09] p-2">
               <div className="w-full h-full rounded-[1.3rem] overflow-hidden">
                  <img 
                     src={content?.story_ch1_img || "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1200"} 
                     className="w-full h-full object-cover scale-[1.04] group-hover:scale-100 transition-all duration-[2s] ease-[0.16,1,0.3,1]" 
                     alt="Chapter 1"
                  />
               </div>
            </div>
         </motion.div>

         <div className="space-y-10 max-w-2xl">
            <div>
               <motion.span 
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-[#C6A87C] tracking-[0.5em] text-[9px] font-bold uppercase mb-4 block font-sans"
               >
                  {content?.story_ch1_tag || "Chapter 01"}
               </motion.span>
               <motion.h2 
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 1 }}
                  className="text-4xl md:text-6xl font-serif text-white tracking-tight leading-[1.1]"
               >
                  {content?.story_ch1_title || "A Quest for"}{" "}
                  <span className="italic text-[#C6A87C] font-medium">{content?.story_ch1_highlight || "Perfection."}</span>
               </motion.h2>
            </div>
            
            <motion.div 
               initial={{ opacity: 0, y: 16 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2, duration: 1 }}
               className="space-y-5 text-white/50 font-light text-base leading-relaxed"
            >
               <p>{content?.story_ch1_desc1 || 'Our journey began with a single question: why does the perfect cup of coffee feel so elusive?'}</p>
               <p>{content?.story_ch1_desc2 || 'We spent years traveling to the high-altitude regions of Ethiopia, Colombia, and Indonesia. This obsession with the origin is what defines every bag of Hodl & Sip today.'}</p>
            </motion.div>

            {/* Stats */}
            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.4, duration: 1 }}
               className="flex gap-12 pt-8 border-t border-white/[0.06]"
            >
               <div>
                  <span className="block text-[#C6A87C] text-3xl font-serif font-light mb-1">{content?.story_stat1_val || "200+"}</span>
                  <span className="text-white/30 text-[9px] uppercase tracking-[0.25em] font-bold font-sans">{content?.story_stat1_label || "Farms Visited"}</span>
               </div>
               <div>
                  <span className="block text-[#C6A87C] text-3xl font-serif font-light mb-1">{content?.story_stat2_val || "10k+"}</span>
                  <span className="text-white/30 text-[9px] uppercase tracking-[0.25em] font-bold font-sans">{content?.story_stat2_label || "Roast Profiles"}</span>
               </div>
            </motion.div>
         </div>
      </div>
   );
}

function ChapterTwo({ content }: { content: any }) {
   return (
      <div className="relative grid grid-cols-1 xl:grid-cols-[1fr_1fr] gap-16 xl:gap-24 items-center">
         {/* Timeline dot */}
         <div className="hidden md:flex absolute -left-20 lg:-left-32 top-12 w-7 h-7 items-center justify-center bg-[#080605] border border-[#C6A87C]/50 rounded-full z-20">
            <div className="w-2 h-2 bg-[#C6A87C] rounded-full" />
         </div>

         <div className="space-y-10 max-w-2xl order-2 xl:order-1">
            <div>
               <motion.span 
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-[#C6A87C] tracking-[0.5em] text-[9px] font-bold uppercase mb-4 block font-sans"
               >
                  {content?.story_ch2_tag || "Chapter 02"}
               </motion.span>
               <motion.h2 
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 1 }}
                  className="text-4xl md:text-6xl font-serif text-white tracking-tight leading-[1.15]"
               >
                  {content?.story_ch2_title || "Science Meets"}{" "}
                  <span className="italic text-[#C6A87C] font-medium">{content?.story_ch2_highlight || "Soul."}</span>
               </motion.h2>
            </div>
            
            <motion.div 
               initial={{ opacity: 0, y: 16 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2, duration: 1 }}
               className="space-y-7"
            >
               {[
                  { num: "01", title: content?.story_ch2_pt1_title || "Ethical Sourcing", desc: content?.story_ch2_pt1_desc || "We pay 30% above fair trade prices to ensure our farmers can invest in sustainable practices and their communities." },
                  { num: "02", title: content?.story_ch2_pt2_title || "Precision Roasting", desc: content?.story_ch2_pt2_desc || "Our advanced Loring roasters use smart convection to ensure consistent, smoke-free flavor profiles that respect the bean." },
                  { num: "03", title: content?.story_ch2_pt3_title || "The Ritual", desc: content?.story_ch2_pt3_desc || "Every pour, every pull, and every sip is an invitation to slow down, connect, and savor the present moment." },
               ].map(item => (
                  <div key={item.num} className="flex gap-5 items-start border-b border-white/[0.04] pb-6 last:border-0">
                     <span className="text-[#C6A87C] font-serif text-lg font-light mt-0.5 shrink-0">{item.num}</span>
                     <div>
                        <h4 className="text-lg font-serif text-white mb-1.5 font-medium">{item.title}</h4>
                        <p className="text-white/45 font-light leading-relaxed text-sm">{item.desc}</p>
                     </div>
                  </div>
               ))}
            </motion.div>
         </div>

         <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 xl:order-2 grid grid-cols-2 gap-3 h-[60vh] xl:h-[75vh]"
         >
            <div className="space-y-3 h-full flex flex-col">
               <div className="flex-[2] rounded-3xl overflow-hidden bg-[#0c0a09] border border-white/[0.04] p-1.5">
                  <div className="w-full h-full rounded-[1.2rem] overflow-hidden">
                     <img src={content?.story_ch2_img1 || "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800"} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[1.5s]" alt="" />
                  </div>
               </div>
               <div className="flex-1 rounded-3xl overflow-hidden bg-[#0c0a09] border border-white/[0.04] p-1.5">
                  <div className="w-full h-full rounded-[1.2rem] overflow-hidden">
                     <img src={content?.story_ch2_img2 || "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=80&w=800"} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[1.5s]" alt="" />
                  </div>
               </div>
            </div>
            <div className="space-y-3 h-full flex flex-col pt-10">
               <div className="flex-[1.5] rounded-3xl overflow-hidden bg-[#C6A87C]/8 border border-[#C6A87C]/10 p-1.5">
                  <div className="w-full h-full rounded-[1.2rem] overflow-hidden">
                     <img src={content?.story_ch2_img3 || "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=800"} className="w-full h-full object-cover scale-[1.05] hover:scale-100 transition-all duration-[1.5s]" alt="" />
                  </div>
               </div>
               <div className="flex-[1] rounded-3xl bg-[#0e0b09] border border-white/[0.04] flex items-center justify-center p-7 text-center">
                  <p className="text-white/35 font-serif italic text-lg leading-relaxed">
                     &ldquo;{content?.story_ch2_quote || 'Crafted with intent.'}&rdquo;
                  </p>
               </div>
            </div>
         </motion.div>
      </div>
   );
}

function ChapterThree({ content }: { content: any }) {
   return (
      <div className="relative grid grid-cols-1 items-center">
         {/* Terminal timeline dot */}
         <div className="hidden md:flex absolute -left-20 lg:-left-32 top-12 w-7 h-7 items-center justify-center bg-[#C6A87C] rounded-full z-20 shadow-[0_0_24px_rgba(198,168,124,0.4)]">
            <div className="w-2.5 h-2.5 bg-black rounded-full" />
         </div>

         <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full aspect-[21/9] md:aspect-[21/7] rounded-3xl overflow-hidden relative group bg-[#0c0a09] border border-white/[0.04] p-2 shadow-2xl"
         >
            <div className="w-full h-full rounded-[1.3rem] overflow-hidden relative">
               <img 
                  src={content?.story_ch3_img || "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=2000"} 
                  className="w-full h-full object-cover scale-[1.04] group-hover:scale-100 transition-transform duration-[2.5s]"
                  alt="Cafe interior"
               />
               <div className="absolute inset-0 bg-black/55 group-hover:bg-black/35 transition-colors duration-1000" />
               
               <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <span className="text-[#C6A87C] tracking-[0.5em] text-[9px] font-bold uppercase mb-4 block font-sans">
                     {content?.story_ch3_tag || "Chapter 03"}
                  </span>
                  <h2 className="text-4xl md:text-7xl font-serif text-white tracking-tight leading-none mb-5">
                     {content?.story_ch3_title || "The"}{" "}
                     <span className="italic text-[#C6A87C] font-medium">{content?.story_ch3_highlight || "Experience."}</span>
                  </h2>
                  <p className="text-white/70 max-w-xl text-base font-light drop-shadow-lg leading-relaxed font-sans">
                     {content?.story_ch3_desc || "Beyond the bean, Hodl & Sip is a sanctuary. A place where the architecture of the space matches the complexity of the cup."}
                  </p>
               </div>
            </div>
         </motion.div>
      </div>
   );
}

function CTASection({ content }: { content: any }) {
   return (
      <section className="py-48 relative overflow-hidden flex justify-center z-10 border-t border-white/[0.04]">
         
         <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="text-center space-y-12 max-w-4xl px-6 relative z-10"
         >
            <div className="space-y-3">
               <span className="text-[#C6A87C] tracking-[0.5em] text-[9px] font-bold uppercase block font-sans">Join Us</span>
               <h2 className="text-4xl md:text-7xl font-serif text-white tracking-tighter leading-none">
                  {content?.story_cta_title || "Become Part of the"}{" "}
                  <span className="italic text-[#C6A87C] font-medium">{content?.story_cta_highlight || "Story."}</span>
               </h2>
            </div>
            <p className="text-white/45 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed font-sans">
               {content?.story_cta_desc || "Whether you're a seasoned connoisseur or just beginning your coffee journey, there's always a seat at our table."}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6">
               <a 
                  href={content?.story_cta_btn1_link || "/cafe"} 
                  className="btn-premium-filled w-full sm:w-auto"
               >
                  {content?.story_cta_btn1 || "Visit Our Cafe"}
               </a>
               <a 
                  href={content?.story_cta_btn2_link || "/roasts"} 
                  className="btn-premium-outline w-full sm:w-auto"
               >
                  {content?.story_cta_btn2 || "Shop Collection"}
               </a>
            </div>
         </motion.div>
      </section>
   );
}
