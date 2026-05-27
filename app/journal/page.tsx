import Navbar from "../components/Navbar";

export default function JournalPage() {
  return (
    <main className="min-h-screen bg-[#080605] pt-32 pb-24 relative overflow-hidden">
      <Navbar />
      
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-10 pointer-events-none mix-blend-overlay z-0" />
      
      <div className="max-w-[2000px] mx-auto px-6 md:px-12 lg:px-24 relative z-10 mt-12">
         <div className="mb-24">
            <span className="text-[#C6A87C] tracking-[0.5em] text-[10px] font-bold uppercase mb-4 block">The Journal</span>
            <h1 className="text-6xl md:text-8xl font-serif text-white tracking-tighter">Coffee <span className="italic text-[#C6A87C]">Stories.</span></h1>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3].map((item) => (
               <div key={item} className="group cursor-pointer">
                  <div className="w-full aspect-[4/5] bg-white/5 rounded-[2rem] overflow-hidden border border-white/5 relative mb-8">
                     <img 
                        src={`https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800&sig=${item}`} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                     />
                     <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />
                  </div>
                  <span className="text-[#C6A87C] text-[10px] tracking-widest uppercase mb-4 block">Editorial</span>
                  <h3 className="text-3xl font-serif text-white mb-4 group-hover:text-[#C6A87C] transition-colors">The Art of the Perfect Pour Over</h3>
                  <div className="w-12 h-[1px] bg-white/20" />
               </div>
            ))}
         </div>
      </div>
    </main>
  );
}
