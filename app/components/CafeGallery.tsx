'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function CafeGallery({ content }: { content?: Record<string, string> }) {
   const containerRef = useRef<HTMLDivElement>(null);
   const [isMounted, setIsMounted] = useState(false);
   const [selectedImg, setSelectedImg] = useState<{src: string, label: string} | null>(null);

   useEffect(() => {
      setIsMounted(true);
   }, []);

   const { scrollYProgress } = useScroll({ 
      target: containerRef, 
      offset: ["start end", "end start"] 
   });

   const y1 = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"]);
   const y2 = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
   const y3 = useTransform(scrollYProgress, [0, 1], ["15%", "-25%"]);

   const images = [
     { src: content?.home_gallery_img_1 || "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800", label: content?.home_gallery_img_1_label || "The Interior", aspect: "aspect-[3/4]" },
     { src: content?.home_gallery_img_2 || "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800", label: content?.home_gallery_img_2_label || "Our Beans", aspect: "aspect-square" },
     { src: content?.home_gallery_img_3 || "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800", label: content?.home_gallery_img_3_label || "The Extraction", aspect: "aspect-[3/5]", featured: true },
     { src: content?.home_gallery_img_4 || "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=80&w=800", label: content?.home_gallery_img_4_label || "The Roastery", aspect: "aspect-[4/3]" },
     { src: content?.home_gallery_img_5 || "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&q=80&w=800", label: content?.home_gallery_img_5_label || "The Seating", aspect: "aspect-square" },
     { src: content?.home_gallery_img_6 || "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=800", label: content?.home_gallery_img_6_label || "Latte Art", aspect: "aspect-[3/4]" },
   ];

   if (!isMounted) return <section ref={containerRef} className="min-h-screen bg-[#080605]" />;

   return (
      <section ref={containerRef} className="bg-[#080605] pt-32 md:pt-48 pb-32 md:pb-64 overflow-hidden relative border-t border-white/[0.03]">

         {/* Subtle ambient glows */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C6A87C]/4 rounded-full blur-[160px] pointer-events-none" />

         {/* Title */}
         <div className="max-w-[2000px] mx-auto px-6 md:px-24 mb-20 md:mb-36 relative z-20 text-center md:text-left">
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
               <span className="text-[#C6A87C] tracking-[0.5em] text-[9px] md:text-[10px] font-bold uppercase mb-6 block font-sans">
                  {content?.home_gallery_tag || "Atmosphere"}
               </span>
               <h2 className="text-5xl md:text-8xl lg:text-[9rem] font-serif text-white tracking-tighter leading-none">
                  {content?.home_gallery_title || "Cafe"}{" "}
                  <span className="italic text-[#C6A87C] font-serif font-medium">{content?.home_gallery_highlight || "View."}</span>
               </h2>
            </motion.div>
         </div>

         {/* Mobile View: Pinterest Style Masonry Grid */}
         <div className="md:hidden max-w-[2000px] mx-auto px-4 relative z-10">
            <div className="columns-2 gap-3">
               {images.map((img, i) => (
                  <motion.div 
                     key={i} 
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.8, delay: i * 0.08 }}
                     className="break-inside-avoid mb-3"
                  >
                     <GalleryCard img={img} aspectClass={img.aspect} featured={img.featured} onClick={() => setSelectedImg(img)} />
                  </motion.div>
               ))}
            </div>
         </div>

         {/* Desktop View: Parallax Grid */}
         <div className="hidden md:flex max-w-[2000px] mx-auto px-12 gap-8 relative z-10">
            
            {/* Column 1 */}
            <motion.div style={{ y: y1 }} className="flex-1 flex flex-col gap-8">
               <GalleryCard img={images[0]} aspectClass="aspect-[3/4]" onClick={() => setSelectedImg(images[0])} />
               <GalleryCard img={images[1]} aspectClass="aspect-square" onClick={() => setSelectedImg(images[1])} />
            </motion.div>

            {/* Column 2 - Hero center */}
            <motion.div style={{ y: y2 }} className="flex-[1.8] flex flex-col gap-8 -mt-64">
               <GalleryCard img={images[2]} aspectClass="aspect-[3/5]" featured onClick={() => setSelectedImg(images[2])} />
               <GalleryCard img={images[3]} aspectClass="aspect-[4/3]" onClick={() => setSelectedImg(images[3])} />
            </motion.div>

            {/* Column 3 */}
            <motion.div style={{ y: y3 }} className="flex-1 flex flex-col gap-8 mt-32">
               <GalleryCard img={images[4]} aspectClass="aspect-square" onClick={() => setSelectedImg(images[4])} />
               <GalleryCard img={images[5]} aspectClass="aspect-[3/4]" onClick={() => setSelectedImg(images[5])} />
            </motion.div>

         </div>

         <AnimatePresence>
            {selectedImg && (
               <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedImg(null)}
                  className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 cursor-zoom-out backdrop-blur-md"
               >
                  <button 
                     onClick={(e) => { e.stopPropagation(); setSelectedImg(null); }}
                     className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-white backdrop-blur-xl transition-all hover:scale-105 z-50 cursor-pointer shadow-2xl"
                     aria-label="Close"
                  >
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                  <motion.img 
                     initial={{ scale: 0.95, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     exit={{ scale: 0.95, opacity: 0 }}
                     transition={{ duration: 0.3 }}
                     src={selectedImg.src} 
                     alt={selectedImg.label}
                     className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
                  />
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 font-sans text-[10px] tracking-[0.3em] uppercase">
                     {selectedImg.label}
                  </div>
               </motion.div>
            )}
         </AnimatePresence>

      </section>
   );
}

function GalleryCard({ img, aspectClass, featured, onClick }: { img: { src: string; label: string }; aspectClass: string; featured?: boolean, onClick?: () => void }) {
   return (
      <div onClick={onClick} className={`w-full ${aspectClass} rounded-2xl md:rounded-[2rem] overflow-hidden relative group cursor-pointer border ${featured ? 'border-[#C6A87C]/15 shadow-[0_20px_50px_rgba(0,0,0,0.9)]' : 'border-white/[0.04] shadow-xl'} bg-[#0c0a09] p-1.5`}>
         <div className="w-full h-full rounded-[1.2rem] overflow-hidden relative">
            <img 
               src={img.src} 
               alt={img.label}
               className="absolute inset-0 w-full h-full object-cover grayscale-0 md:grayscale group-hover:grayscale-0 group-hover:scale-105 scale-100 transition-all duration-[2.5s] ease-[0.16,1,0.3,1]" 
            />
            {/* Always-visible label on mobile */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3 md:p-0 md:translate-y-full md:group-hover:translate-y-0 md:via-black/30 md:from-black/90 md:to-transparent md:transition-transform md:duration-700">
               <div className="font-sans md:translate-y-4 md:group-hover:translate-y-0 md:transition-transform md:duration-500 md:delay-100 md:p-8">
                  <span className="text-white text-[9px] md:text-[10px] font-semibold tracking-[0.35em] uppercase block">
                     {img.label}
                  </span>
               </div>
            </div>
         </div>
      </div>
   );
}
