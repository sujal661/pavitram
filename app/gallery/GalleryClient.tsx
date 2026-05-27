'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const fallbackPhotos = [
   { id: 1, src: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1200", category: "The Craft", title: "Morning Extraction" },
   { id: 2, src: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=1200", category: "Origins", title: "Ethiopian Highlands" },
   { id: 3, src: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=1200", category: "Atmosphere", title: "The Reading Corner" },
   { id: 4, src: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=1200", category: "The Craft", title: "Pour Over Precision" },
   { id: 5, src: "https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&q=80&w=1200", category: "Origins", title: "Sun-Dried Beans" },
   { id: 6, src: "https://images.unsplash.com/photo-1511920170033-f8396924c648?auto=format&fit=crop&q=80&w=1200", category: "Atmosphere", title: "Evening Ambiance" },
   { id: 7, src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1200", category: "Origins", title: "Raw Harvest" },
   { id: 8, src: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=80&w=1200", category: "The Craft", title: "Roasting Process" },
   { id: 9, src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200", category: "Atmosphere", title: "The Long Bar" },
];

export default function GalleryClient({ dbImages, content }: { dbImages?: any[], content?: Record<string, string> }) {
   const [selectedImage, setSelectedImage] = useState<any | null>(null);
   
   const dataToUse = dbImages && dbImages.length > 0 ? dbImages.map(img => ({ ...img, src: img.imageUrl })) : fallbackPhotos;

   // Pre-calculate 3 columns for desktop view
   const desktopColumns = Array.from({ length: 3 }, () => [] as typeof dataToUse);
   dataToUse.forEach((photo, idx) => {
      desktopColumns[idx % 3].push(photo);
   });

   return (
      <>
         {/* Header */}
         <div className="text-center mb-16 md:mb-24 space-y-4 px-4 font-sans">
            <motion.span 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-[#C6A87C] tracking-[0.5em] text-[9px] font-bold uppercase block"
            >
               {content?.gallery_tag || "The Aesthetic"}
            </motion.span>
            <motion.h1 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
               className="text-5xl md:text-8xl lg:text-9xl font-serif text-white tracking-tighter leading-[1]"
            >
               {content?.gallery_title || "Visual"}{" "}
               <span className="italic text-[#C6A87C] font-serif font-medium">{content?.gallery_highlight || "Journey."}</span>
            </motion.h1>
         </div>

         {/* Mobile View: Pinterest CSS Columns */}
         <div className="md:hidden columns-2 gap-3 px-2">
            <AnimatePresence mode="popLayout">
               {dataToUse.map((photo) => (
                  <motion.div
                     layout
                     initial={{ opacity: 0, scale: 0.95, y: 20 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.95, y: -20 }}
                     transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                     key={photo.id}
                     onClick={() => setSelectedImage(photo)}
                     className="break-inside-avoid rounded-2xl overflow-hidden shadow-xl group cursor-pointer border border-white/[0.04] bg-[#0c0a09] relative mb-3 p-1.5"
                  >
                     <div className="rounded-xl overflow-hidden relative">
                        <img 
                           src={photo.src} 
                           alt={photo.title}
                           className="w-full h-auto object-cover scale-[1.02] group-hover:scale-100 transition-transform duration-[1.5s] ease-[0.16,1,0.3,1]" 
                           loading="lazy"
                        />
                        {/* Always-visible label on mobile */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3 pointer-events-none">
                           <div className="font-sans">
                              <span className="text-[#C6A87C] tracking-[0.2em] text-[7px] font-bold uppercase block mb-0.5">
                                 {photo.category}
                              </span>
                              <h3 className="text-sm font-serif text-white/90 leading-tight">
                                 {photo.title}
                              </h3>
                           </div>
                        </div>
                     </div>
                  </motion.div>
               ))}
            </AnimatePresence>
         </div>

         {/* Desktop View: JS Column Layout */}
         <div className="hidden md:flex gap-5 items-start">
            {desktopColumns.map((column, colIndex) => (
               <div key={colIndex} className="flex-1 space-y-5 flex flex-col">
                  <AnimatePresence mode="popLayout">
                     {column.map((photo) => (
                        <motion.div
                           layout
                           initial={{ opacity: 0, scale: 0.95, y: 20 }}
                           animate={{ opacity: 1, scale: 1, y: 0 }}
                           exit={{ opacity: 0, scale: 0.95, y: -20 }}
                           transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                           key={photo.id}
                           onClick={() => setSelectedImage(photo)}
                           className="rounded-2xl overflow-hidden shadow-xl group cursor-pointer border border-white/[0.04] bg-[#0c0a09] relative p-1.5"
                        >
                           <div className="rounded-[0.8rem] overflow-hidden relative">
                              <img 
                                 src={photo.src} 
                                 alt={photo.title}
                                 className="w-full h-auto object-cover scale-[1.03] group-hover:scale-100 transition-transform duration-[1.5s] ease-[0.16,1,0.3,1]" 
                                 loading="lazy"
                              />
                              {/* Bottom-up reveal */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1] flex flex-col justify-end p-6 pointer-events-none">
                                 <div className="translate-y-3 group-hover:translate-y-0 transition-transform duration-500 delay-100 font-sans">
                                    <span className="text-[#C6A87C] tracking-[0.3em] text-[9px] font-bold uppercase block mb-1.5">
                                       {photo.category}
                                    </span>
                                    <h3 className="text-xl font-serif text-white tracking-wide">
                                       {photo.title}
                                    </h3>
                                 </div>
                              </div>
                           </div>
                        </motion.div>
                     ))}
                  </AnimatePresence>
               </div>
            ))}
         </div>

         {/* Lightbox */}
         <AnimatePresence>
            {selectedImage && (
               <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-16 bg-black/97 backdrop-blur-2xl"
                  onClick={() => setSelectedImage(null)}
               >
                  {/* Close button - matches CafeGallery style */}
                  <button 
                     className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-white backdrop-blur-xl transition-all hover:scale-105 z-50 cursor-pointer shadow-2xl"
                     onClick={() => setSelectedImage(null)}
                     aria-label="Close"
                  >
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>

                  <motion.div 
                     initial={{ scale: 0.96, y: 16 }}
                     animate={{ scale: 1, y: 0 }}
                     exit={{ scale: 0.96, y: 16 }}
                     transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                     className="relative max-w-5xl w-full flex flex-col items-center gap-8"
                     onClick={(e) => e.stopPropagation()}
                  >
                     <div className="w-full rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0c0a09] p-2 shadow-2xl">
                        <img 
                           src={selectedImage.src} 
                           alt={selectedImage.title}
                           className="w-full max-h-[75vh] object-contain rounded-xl"
                        />
                     </div>
                     <div className="text-center font-sans">
                        <span className="text-[#C6A87C] tracking-[0.4em] text-[9px] font-bold uppercase block mb-2">
                           {selectedImage.category}
                        </span>
                        <h2 className="text-3xl font-serif text-white font-medium">
                           {selectedImage.title}
                        </h2>
                     </div>
                  </motion.div>
               </motion.div>
            )}
         </AnimatePresence>
      </>
   );
}
