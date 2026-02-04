'use client';

import { motion } from 'framer-motion';

export default function Navbar() {
  const navItems = ['Essence', 'Philosophy', 'Rituals'];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
    >
      <div className="pointer-events-auto relative bg-[#050505]/80 backdrop-blur-3xl border border-[#C6A87C]/20 rounded-full px-12 py-3 flex items-center gap-16 shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-white/5">
        
        {/* Brand */}
        <a href="/" className="text-lg font-bold tracking-[0.2em] text-white uppercase font-serif hover:text-[#C6A87C] transition-colors">
          Pavitram
        </a>
        
        {/* Links */}
        <div className="hidden md:flex items-center gap-10 text-[10px] font-bold tracking-[0.25em] uppercase text-white/70">
          {navItems.map((item, i) => (
            <motion.a 
              key={item}
              href={`/${item.toLowerCase()}`} 
              className="hover:text-[#C6A87C] transition-colors relative group"
              whileHover={{ scale: 1.05 }}
            >
              <span className="relative z-10">{item}</span>
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 w-1 bg-[#C6A87C] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_15px_#C6A87C]" />
            </motion.a>
          ))}
        </div>

        {/* CTA - Shiny Button */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative overflow-hidden bg-[#C6A87C] text-black text-[10px] font-bold uppercase tracking-[0.2em] px-8 py-2.5 rounded-full hover:bg-[#d4b484] transition-colors group shadow-[0_0_30px_rgba(198,168,124,0.3)]"
        >
          <span className="relative z-10">Shop Now</span>
          <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-0" />
        </motion.button>
      </div>
    </motion.nav>
  );
}
