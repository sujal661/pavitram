'use client';

import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

const rituals = [
  {
    title: "Dawn Awakening",
    time: "06:00 AM",
    description: "Greet the sun with Jasmine essence. A single drop on the solar plexus to ignite creative fire.",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1000"
  },
  {
    title: "The Midday Stillness",
    time: "12:00 PM",
    description: "In the heat of the day, cool the spirit with Sandalwood. Apply to temples for laser-like focus.",
    img: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=1000"
  },
  {
    title: "Vesper Prayer",
    time: "06:00 PM",
    description: "As light fades, Rose oil opens the heart. A ritual of gratitude for the day's lessons.",
    img: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=1000"
  }
];

export default function RitualsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#C6A87C]">
      <Navbar />
      
      {/* Hero */}
      <section className="h-[70vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img src="https://images.unsplash.com/photo-1519414442781-fbd745c5b497?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative z-10"
        >
          <h1 className="text-7xl md:text-9xl font-serif mb-6 tracking-tighter">Daily Rituals</h1>
          <p className="text-xl md:text-2xl font-light opacity-60 max-w-2xl mx-auto italic">
            "Transform the ordinary into the sacred through the geometry of scent."
          </p>
        </motion.div>
      </section>

      {/* Ritual List */}
      <section className="py-32 px-4 md:px-24 max-w-7xl mx-auto">
        {rituals.map((ritual, i) => (
          <div key={i} className={`flex flex-col md:flex-row items-center gap-16 mb-48 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
            
            {/* Image Container with Reveal */}
            <motion.div 
              initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
              whileInView={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full md:w-1/2 aspect-[4/5] overflow-hidden rounded-2xl relative group"
            >
              <img src={ritual.img} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" />
              <div className="absolute inset-0 bg-[#C6A87C]/10 mix-blend-overlay" />
            </motion.div>

            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1 }}
              className="w-full md:w-1/2"
            >
              <span className="text-sm font-bold tracking-[0.3em] uppercase opacity-50 block mb-4">{ritual.time}</span>
              <h3 className="text-5xl md:text-6xl font-serif mb-8 text-white">{ritual.title}</h3>
              <div className="w-16 h-[1px] bg-[#C6A87C] mb-8" />
              <p className="text-xl md:text-2xl leading-relaxed opacity-70 font-light italic">
                {ritual.description}
              </p>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="mt-12 px-10 py-4 border border-[#C6A87C]/30 rounded-full uppercase text-xs tracking-widest hover:bg-[#C6A87C] hover:text-black transition-all"
              >
                Learn the Technique
              </motion.button>
            </motion.div>
          </div>
        ))}
      </section>

      {/* Philosophy Callout */}
      <section className="bg-[#050505] py-48 text-center px-4">
         <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="max-w-4xl mx-auto"
         >
           <h2 className="text-4xl md:text-5xl font-serif mb-12 leading-tight">
             Scent is the only sense that bypasses the logical mind and speaks directly to the soul.
           </h2>
           <div className="w-[1px] h-32 bg-gradient-to-b from-[#C6A87C] to-transparent mx-auto" />
         </motion.div>
      </section>

    </main>
  );
}
