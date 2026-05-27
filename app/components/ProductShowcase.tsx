'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const products = [
  { id: "01", name: "Ethiopian Yirgacheffe", tag: "Light Roast", price: "₹450", desc: "Bright and floral with notes of jasmine, bergamot, and blueberry. A delicate cup that dances on the palate.", origin: "Yirgacheffe", img: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=1200" },
  { id: "02", name: "Colombian Supremo", tag: "Medium Roast", price: "₹380", desc: "A perfectly balanced cup with notes of chocolate, caramel, and a hint of sweet orange.", origin: "Antioquia", img: "https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&q=80&w=1200" },
  { id: "03", name: "Sumatra Mandheling", tag: "Dark Roast", price: "₹520", desc: "Earthy and full-bodied with a syrupy sweet finish and bold notes of dark chocolate.", origin: "North Sumatra", img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1200" },
  { id: "04", name: "House Espresso", tag: "Signature Roast", price: "₹340", desc: "Our signature blend designed for the perfect crema and a rich, bold flavor profile.", origin: "Global Blend", img: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=1200" },
  { id: "05", name: "Guatemala Antigua", tag: "Medium-Dark", price: "₹420", desc: "Complex and spicy with a velvety body, featuring distinct notes of cocoa and subtle smoke.", origin: "Antigua", img: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&q=80&w=1200" },
  { id: "06", name: "Costa Rica Tarrazu", tag: "Light-Medium", price: "₹480", desc: "Vibrantly clean with a crisp acidity. Notes of honey, citrus, and a smooth, sweet finish.", origin: "Tarrazu", img: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=1200" },
];

export default function ProductShowcase({ content, dbMenuItems }: { content?: Record<string, string>, dbMenuItems?: any[] }) {
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0); 
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const dataToUse = dbMenuItems && dbMenuItems.length > 0 ? dbMenuItems : products;

  const dynamicProducts = dataToUse.map((p, idx) => ({
    ...p,
    id: p.id || String(idx + 1).padStart(2, '0'),
    img: p.imageUrl || p.img || content?.[`product_${idx + 1}`] 
  }));

  // Pagination logic
  const itemsPerPage = 4;
  const totalPages = Math.ceil(dynamicProducts.length / itemsPerPage);
  
  const currentProducts = dynamicProducts.slice(
    currentPage * itemsPerPage, 
    (currentPage + 1) * itemsPerPage
  );

  const handleNextPage = () => {
     setCurrentPage((prev) => (prev + 1) % totalPages);
     setHoveredIndex(0);
  };

  const handlePrevPage = () => {
     setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
     setHoveredIndex(0);
  };

  if (!isMounted) return <section className="min-h-screen bg-[#080605]" />;

  return (
    <section className="bg-[#080605] py-32 md:py-48 relative overflow-hidden">
       {/* Background decorative elements */}
       <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#C6A87C]/5 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
       
       <div className="max-w-[2000px] mx-auto px-4 md:px-8 relative z-10">
          
          {/* Header */}
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-8 px-4 md:px-12">
             <div className="max-w-3xl">
                 <motion.span 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-[#C6A87C] tracking-[0.5em] text-[10px] font-bold uppercase mb-6 block font-sans"
                 >
                    {content?.menu_tag || "The Collection"}
                 </motion.span>
                 <motion.h2 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl md:text-7xl lg:text-[8rem] font-serif text-white tracking-tighter leading-[1.05]"
                 >
                    {content?.menu_title || "Signature"} <br/><span className="italic text-[#C6A87C] font-serif font-medium">{content?.menu_highlight || "Roasts."}</span>
                 </motion.h2 >
             </div>
             <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-white/40 max-w-md text-base font-light pb-4 md:pb-6 font-sans leading-relaxed"
             >
                {content?.menu_desc || "A curated selection of our finest beans. Hover to explore the unique profile of each exquisite roast."}
             </motion.p>
          </div>

          {/* Accordion Container (Desktop) */}
          <div className="hidden md:flex h-[75vh] w-full gap-4 px-8">
             <AnimatePresence mode="wait">
                {currentProducts.map((p, i) => {
                   const isActive = hoveredIndex === i;
                   
                   return (
                      <motion.div 
                         key={p.id}
                         initial={{ opacity: 0, scale: 0.95, y: 30 }}
                         animate={{ opacity: 1, scale: 1, y: 0 }}
                         exit={{ opacity: 0, scale: 0.95, y: -30 }}
                         transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                         onMouseEnter={() => setHoveredIndex(i)}
                         onClick={() => setHoveredIndex(i)}
                         className={`relative overflow-hidden rounded-[2.5rem] cursor-pointer transition-all duration-[1.2s] ease-[0.16,1,0.3,1] border ${
                            isActive ? 'flex-[5] shadow-2xl border-white/[0.08] bg-[#0c0a09]' : 'flex-1 opacity-60 hover:opacity-90 border-white/[0.03] bg-[#0c0a09]/50'
                         }`}
                      >
                         {/* Background Image */}
                         <div className="absolute inset-0 bg-[#0c0a09]">
                            <img 
                               src={p.img} 
                               alt={p.name} 
                               className={`w-full h-full object-cover transition-all duration-[1.5s] ease-[0.16,1,0.3,1] origin-center opacity-100 ${
                                  isActive ? 'scale-100 grayscale-0 blur-0' : 'scale-125 grayscale blur-[2px]'
                               }`} 
                            />
                         </div>

                         {/* Gradient Overlay */}
                         <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-1000 pointer-events-none ${
                            isActive 
                               ? 'from-black via-black/85 to-black/10 opacity-100' 
                               : 'from-black/90 via-black/60 to-transparent opacity-90'
                         }`} />

                         {/* Content Container */}
                         <div className="absolute inset-0 p-10 flex flex-col justify-between pointer-events-none">
                            
                            {/* Top: Number & Tag */}
                            <div className="flex justify-between items-start">
                               <span className={`font-serif text-3xl italic transition-colors duration-700 drop-shadow-md ${isActive ? 'text-[#C6A87C]' : 'text-white/30'}`}>
                                  {String(i + 1 + (currentPage * itemsPerPage)).padStart(2, '0')}
                                </span>
                               <div className={`transition-all duration-700 block ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                                  <span className="px-4 py-1.5 rounded-full border border-white/[0.08] backdrop-blur-md text-white/80 text-[9px] uppercase tracking-[0.2em] font-semibold bg-black/40 font-sans">
                                     {p.tag}
                                  </span>
                               </div>
                            </div>

                            {/* Bottom: Details */}
                            <div className="flex flex-col justify-end w-full h-full relative">
                               
                               {/* Vertical Text when collapsed */}
                               <div className={`flex absolute inset-0 pb-12 items-end justify-center transition-all duration-[1s] ${
                                  isActive ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100 delay-300'
                               }`}>
                                  <h3 className="text-2xl lg:text-3xl font-serif text-white/60 tracking-[0.15em] whitespace-nowrap drop-shadow-xl uppercase" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                                     {p.name}
                                  </h3>
                               </div>

                               {/* Full Details when expanded */}
                               <div className={`transition-all duration-[1s] ease-[0.16,1,0.3,1] w-[450px] relative z-10 ${
                                  isActive ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-24 pointer-events-none absolute bottom-0'
                               }`}>
                                  <p className="text-[#C6A87C] text-[10px] font-sans tracking-[0.3em] uppercase mb-3 drop-shadow-sm font-semibold">{p.origin}</p>
                                  <h3 className="text-3xl md:text-5xl lg:text-5xl font-serif text-white leading-tight mb-5 drop-shadow-2xl font-medium">
                                     {p.name}
                                  </h3>
                                  <p className="text-white/50 font-sans font-light text-sm leading-relaxed mb-6">
                                     {p.desc}
                                  </p>
                                  <div className="flex flex-row items-center gap-10 font-sans">
                                     <span className="text-[#C6A87C] text-3xl font-light font-serif">{p.price}</span>
                                  </div>
                               </div>
                               
                            </div>
                         </div>
                      </motion.div>
                   );
                })}
             </AnimatePresence>
          </div>

          {/* Horizontal Snap Carousel (Mobile Only) */}
          <div className="flex md:hidden w-full overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-8 hide-scrollbar">
             {currentProducts.map((p, i) => (
                <div 
                   key={p.id}
                   className="min-w-[85vw] h-[65vh] snap-center relative overflow-hidden rounded-[2rem] border border-white/[0.08] shadow-2xl bg-[#0c0a09] flex-shrink-0"
                >
                   {/* Background Image */}
                   <div className="absolute inset-0">
                      <img 
                         src={p.img} 
                         alt={p.name} 
                         className="w-full h-full object-cover opacity-90"
                      />
                   </div>

                   {/* Gradient Overlay */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/10 pointer-events-none" />

                   {/* Content Container */}
                   <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
                      
                      {/* Top: Number & Tag */}
                      <div className="flex justify-between items-start">
                         <span className="font-serif text-2xl italic text-[#C6A87C] drop-shadow-md">
                            {String(i + 1 + (currentPage * itemsPerPage)).padStart(2, '0')}
                          </span>
                         <span className="px-3 py-1.5 rounded-full border border-white/[0.08] backdrop-blur-md text-white/90 text-[8px] uppercase tracking-[0.2em] font-semibold bg-black/50 font-sans">
                            {p.tag}
                         </span>
                      </div>

                      {/* Bottom: Details */}
                      <div className="flex flex-col justify-end w-full relative z-10">
                         <p className="text-[#C6A87C] text-[9px] font-sans tracking-[0.3em] uppercase mb-2 drop-shadow-sm font-semibold">{p.origin}</p>
                         <h3 className="text-3xl font-serif text-white leading-tight mb-4 drop-shadow-2xl font-medium">
                            {p.name}
                         </h3>
                         <p className="text-white/60 font-sans font-light text-xs leading-relaxed mb-5 line-clamp-3">
                            {p.desc}
                         </p>
                         <div className="flex items-center font-sans">
                            <span className="text-[#C6A87C] text-2xl font-light font-serif">{p.price}</span>
                         </div>
                      </div>
                   </div>
                </div>
             ))}
          </div>

          {/* Scalable Navigation Controls */}
          {totalPages > 1 && (
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center justify-between px-6 md:px-12 mt-12 md:mt-16 font-sans"
             >
                {/* Arrows */}
                <div className="flex items-center gap-4">
                   <button 
                      onClick={handlePrevPage} 
                      className="w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center text-white/60 hover:text-white hover:border-[#C6A87C] hover:bg-white/[0.02] transition-all group backdrop-blur-md"
                      aria-label="Previous Products"
                   >
                      <span className="text-xs group-hover:-translate-x-0.5 transition-transform">←</span>
                   </button>
                   <button 
                      onClick={handleNextPage} 
                      className="w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center text-white/60 hover:text-white hover:border-[#C6A87C] hover:bg-white/[0.02] transition-all group backdrop-blur-md"
                      aria-label="Next Products"
                   >
                      <span className="text-xs group-hover:translate-x-0.5 transition-transform">→</span>
                   </button>
                </div>

                {/* Dots Pagination */}
                <div className="flex gap-2">
                   {Array.from({length: totalPages}).map((_, idx) => (
                      <button 
                         key={idx} 
                         onClick={() => { setCurrentPage(idx); setHoveredIndex(0); }}
                         className={`h-[3px] rounded-full transition-all duration-500 ease-[0.16,1,0.3,1] ${
                            idx === currentPage ? 'w-8 bg-[#C6A87C]' : 'w-3 bg-white/10 hover:bg-white/20'
                         }`}
                         aria-label={`Go to page ${idx + 1}`}
                      />
                   ))}
                </div>
             </motion.div>
          )}

       </div>
    </section>
  );
}
