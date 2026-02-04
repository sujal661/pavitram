'use client';

import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

export default function PhilosophyPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F0] text-[#1a1a1a] selection:bg-[#C6A87C] selection:text-white">
      <Navbar />
      
      {/* Editorial Header */}
      <section className="pt-48 pb-32 px-4 md:px-24 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="text-xs font-bold tracking-[0.5em] uppercase opacity-40 block mb-12">Our Philosophy</span>
          <h1 className="text-[12vw] md:text-[8vw] font-serif leading-[0.85] tracking-tighter mb-24 italic">
            Beyond the <br /> 
            <span className="text-[#C6A87C] not-italic">Material Veil.</span>
          </h1>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-24 items-start">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="md:col-span-4"
          >
            <div className="sticky top-48">
              <div className="aspect-[3/4] rounded-sm overflow-hidden mb-8">
                <img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" />
              </div>
              <p className="text-sm uppercase tracking-widest opacity-40">Artifact 001: The Copper Still</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.2 }}
            className="md:col-span-7 md:col-start-6 space-y-24"
          >
            <p className="text-3xl md:text-5xl font-serif leading-tight">
              Pavitram was born from a singular question: <br/>  
              <span className="italic">How do we capture the silence of the Himalayas?</span>
            </p>
            
            <div className="space-y-12 text-xl md:text-2xl font-light opacity-80 leading-relaxed max-w-2xl">
              <p>
                We believe that modern extraction methods are too violent. They strip the plant of its spirit, leaving only a chemical signature. At Pavitram, we use ancient, gravity-fed copper stills and wait for the oil to surrender itself.
              </p>
              <p>
                Our process is measured in moon cycles, not minutes. We harvest Sandalwood from Mysore only when the sap is rising, and Jasmine from Madurai only when the air is thick with the scent of the coming dawn.
              </p>
              <p className="font-serif italic text-4xl mt-24 text-[#C6A87C]">
                "Nature does not hurry, yet everything is accomplished."
              </p>
              <p>
                This is our pledge. We do not sell fragrances. We sell moments of pause. We sell the ability to descend back into one's own center through the gateway of scent.
              </p>
            </div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="pt-24"
            >
              <div className="h-[1px] w-full bg-black/10 mb-12" />
              <div className="flex justify-between items-center group cursor-pointer">
                <span className="text-sm font-bold tracking-widest uppercase opacity-40 group-hover:opacity-100 transition-opacity">Discover Our Process</span>
                <span className="text-4xl group-hover:translate-x-4 transition-transform duration-500">&rarr;</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Full Width Quote */}
      <section className="bg-black py-64 relative overflow-hidden">
        <motion.div 
          style={{ opacity: 0.1 }}
          className="absolute inset-0 flex items-center justify-center select-none"
        >
          <span className="text-[40vw] font-serif italic text-white whitespace-nowrap">Silence.</span>
        </motion.div>
        
        <div className="relative z-10 text-center text-white px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-serif max-w-5xl mx-auto leading-tight"
          >
            We are curators of the invisible. <br/>
            An altar to the unseen world.
          </motion.h2>
        </div>
      </section>

    </main>
  );
}
