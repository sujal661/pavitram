'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer({ content }: { content?: Record<string, string> }) {
   const exploreLinks = [
      { name: content?.nav_story || 'Our Story', path: '/story' },
      { name: content?.nav_menu || 'The Roasts', path: '/roasts' },
      { name: 'Brewing Process', path: '/#process' },
      { name: content?.nav_gallery || 'Gallery', path: '/gallery' },
      { name: content?.nav_locations || 'Location', path: '/cafe' },
   ];

   const socialLinks = [
      { name: content?.footer_social_1 || 'Instagram', path: content?.footer_social_1_link || '#instagram' },
      { name: content?.footer_social_2 || 'Twitter', path: content?.footer_social_2_link || '#twitter' },
      { name: content?.footer_social_3 || 'Facebook', path: content?.footer_social_3_link || '#facebook' },
   ];

   return (
      <footer className="bg-[#080605] pt-32 pb-16 border-t border-white/[0.04] relative z-20 font-sans">
         <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-12 mb-24">
               
               {/* Brand & Socials */}
               <div className="md:col-span-5 space-y-10">
                  <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight leading-tight">
                     {content?.footer_brand || "Hodl & Sip Coffee Roasters"}
                  </h2>
                  <p className="text-white/40 max-w-sm font-light leading-relaxed text-sm md:text-base">
                     {content?.footer_desc || "An artisanal coffee experience curated for the connoisseur. Elevating the standard of your daily ritual."}
                  </p>
                  
                  {/* Social Links */}
                  <div className="flex gap-4 pt-2">
                     {socialLinks.map((social) => (
                        <motion.a 
                           key={social.name}
                           href={social.path}
                           whileHover={{ y: -3, borderColor: '#C6A87C', color: '#fff' }}
                           className="w-11 h-11 rounded-full border border-white/[0.08] flex items-center justify-center text-[#C6A87C]/70 hover:bg-white/[0.02] transition-colors text-xs font-semibold tracking-wider"
                        >
                           {social.name.charAt(0)}
                        </motion.a>
                     ))}
                  </div>
               </div>

               {/* Links */}
               <div className="md:col-span-3 space-y-8">
                  <h4 className="text-[#C6A87C] text-[10px] font-bold uppercase tracking-[0.3em]">{content?.footer_explore_title || "Explore"}</h4>
                  <ul className="space-y-4">
                     {exploreLinks.map(link => (
                        <li key={link.name}>
                           <Link href={link.path} className="text-white/50 hover:text-white transition-colors text-[11px] uppercase tracking-[0.18em] font-medium">
                              {link.name}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Newsletter / Contact */}
               <div className="md:col-span-4 space-y-8">
                  <h4 className="text-[#C6A87C] text-[10px] font-bold uppercase tracking-[0.3em]">{content?.footer_join_title || "Join The Club"}</h4>
                  <p className="text-white/45 font-light text-sm leading-relaxed">{content?.footer_join_desc || "Subscribe for early access to rare single-origin releases."}</p>
                  <form className="flex border-b border-white/[0.1] focus-within:border-[#C6A87C]/50 pb-2 transition-colors duration-300" onSubmit={(e) => e.preventDefault()}>
                     <input type="email" placeholder="YOUR EMAIL" className="bg-transparent flex-1 outline-none text-white placeholder:text-white/20 text-xs font-light tracking-[0.2em] uppercase" />
                     <button type="submit" className="text-[#C6A87C] text-[10px] uppercase font-bold tracking-[0.2em] hover:text-white transition-colors pl-4">Submit</button>
                  </form>
               </div>

            </div>

            {/* Copyright */}
            <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-white/[0.04] text-[9px] text-white/30 tracking-[0.2em] uppercase gap-4">
               <p>© {new Date().getFullYear()} {content?.footer_copyright || "Hodl & Sip. All Rights Reserved."}</p>
               <div className="flex gap-8">
                  <a href={content?.footer_privacy_link || "#"} className="hover:text-[#C6A87C] transition-colors">Privacy Policy</a>
                  <a href={content?.footer_terms_link || "#"} className="hover:text-[#C6A87C] transition-colors">Terms of Service</a>
               </div>
            </div>
         </div>
      </footer>
   );
}
