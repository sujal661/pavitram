'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar({ content }: { content?: Record<string, string> }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const links = [
    { name: content?.nav_home || 'Home', path: content?.nav_home_link || '/' },
    { name: content?.nav_menu || 'Menu', path: content?.nav_menu_link || '/roasts' },
    { name: content?.nav_story || 'Our Story', path: content?.nav_story_link || '/story' },
    { name: content?.nav_gallery || 'Gallery', path: content?.nav_gallery_link || '/gallery' },
    { name: content?.nav_locations || 'Locations', path: content?.nav_locations_link || '/cafe' },
  ];

  return (
    <motion.nav 
       initial={{ y: -100, opacity: 0 }}
       animate={{ y: 0, opacity: 1 }}
       transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
       className="fixed top-6 left-0 right-0 z-50 flex flex-col items-center pointer-events-none px-4"
    >
       {/* Main Navbar Pill */}
       <div className="pointer-events-auto bg-black/70 backdrop-blur-xl border border-white/[0.08] p-2 md:p-2.5 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.9)] ring-1 ring-white/5 relative overflow-hidden group">
          {/* Subtle reflection overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
          
          <div className="flex items-center justify-between w-full relative z-10">
             {/* Logo */}
             <Link href="/" className="pl-3 pr-5 md:pr-6 md:border-r md:border-white/5 flex items-center shrink-0">
                <Image 
                   src={content?.nav_logo || "/hodl_and_sip_print_logo.svg"} 
                   width={32} 
                   height={32} 
                   alt="Hodl & Sip Logo" 
                   className="hover:scale-105 transition-transform duration-500 opacity-90 hover:opacity-100"
                />
             </Link>

             {/* Hamburger Button (Mobile Only) */}
             <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-[#C6A87C] hover:text-white transition-colors focus:outline-none pr-3"
             >
                <div className="w-5 flex flex-col gap-1.5 items-end">
                   <motion.div 
                      animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                      className="w-full h-[1.5px] bg-current origin-center transition-all duration-300"
                   />
                   <motion.div 
                      animate={isMobileMenuOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
                      className="w-4 h-[1.5px] bg-current transition-all duration-300"
                   />
                   <motion.div 
                      animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                      className="w-full h-[1.5px] bg-current origin-center transition-all duration-300"
                   />
                </div>
             </button>

             {/* Desktop Navigation Links */}
             <div className="hidden md:flex items-center justify-between md:gap-1.5 px-1 md:px-3 font-sans shrink-0">
                {links.map((link) => {
                   const isActive = pathname === link.path;
                   return (
                      <Link key={link.path} href={link.path} className="group relative">
                         <motion.div 
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            className={`px-3.5 md:px-5 py-2 md:py-2.5 rounded-full transition-all duration-300 flex items-center justify-center ${isActive ? 'bg-white/[0.06] text-[#C6A87C]' : 'hover:bg-white/[0.03] text-white/50 group-hover:text-white/90'}`}
                         >
                            <span className="text-[9px] md:text-[10px] font-semibold tracking-[0.22em] uppercase transition-colors whitespace-nowrap">
                               {link.name}
                            </span>
                            {isActive && (
                               <motion.div 
                                  layoutId="activeDotTop" 
                                  className="absolute bottom-1 w-6 h-[2px] rounded-full bg-gradient-to-r from-[#C6A87C] to-[#EAE3DB] shadow-[0_0_12px_rgba(198,168,124,0.8)]" 
                               />
                            )}
                         </motion.div>
                      </Link>
                   )
                })}
             </div>
          </div>
       </div>

       {/* Mobile Navigation Dropdown - Detached from pill for performance */}
       <AnimatePresence>
          {isMobileMenuOpen && (
             <motion.div 
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="md:hidden mt-3 pointer-events-auto w-full max-w-sm"
             >
                <div className="bg-black/90 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-4 shadow-2xl">
                   <div className="flex flex-col gap-1 font-sans">
                      {links.map((link, i) => {
                         const isActive = pathname === link.path;
                         return (
                            <motion.div
                               key={link.path}
                               initial={{ opacity: 0, x: -10 }}
                               animate={{ opacity: 1, x: 0 }}
                               transition={{ delay: i * 0.05 + 0.1, duration: 0.3 }}
                            >
                               <Link href={link.path} className="block w-full">
                                  <div className={`px-5 py-3.5 rounded-2xl transition-all duration-300 flex items-center ${isActive ? 'bg-white/[0.06] text-[#C6A87C]' : 'hover:bg-white/[0.03] text-white/50 hover:text-white/90'}`}>
                                     <span className="text-[11px] font-bold tracking-[0.2em] uppercase transition-colors">
                                        {link.name}
                                     </span>
                                     {isActive && (
                                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#C6A87C] shadow-[0_0_10px_rgba(198,168,124,0.8)]" />
                                     )}
                                  </div>
                               </Link>
                            </motion.div>
                         )
                      })}
                   </div>
                </div>
             </motion.div>
          )}
       </AnimatePresence>
    </motion.nav>
  );
}
