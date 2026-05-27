import Navbar from "../components/Navbar";

export default function BookPage() {
  return (
    <main className="min-h-screen bg-[#080605] pt-32 pb-24 relative overflow-hidden flex flex-col items-center">
      <Navbar />
      
      {/* Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-10 pointer-events-none mix-blend-overlay z-0" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8 mt-24 font-sans">
         <span className="text-[#C6A87C] tracking-[0.5em] text-[10px] font-bold uppercase">Reservations</span>
         <h1 className="text-6xl md:text-8xl font-serif text-white tracking-tighter">Book a <span className="italic text-[#C6A87C]">Table.</span></h1>
         <p className="text-white/60 font-light max-w-lg mx-auto">Our online reservation system is currently being updated. Please call us directly to book a table for your next visit.</p>
         
         <button className="border border-[#C6A87C]/40 text-[#C6A87C] uppercase tracking-widest text-xs px-8 py-4 rounded-full mt-8 hover:bg-[#C6A87C] hover:text-black transition-colors font-bold">
            Contact Us
         </button>
      </div>
    </main>
  );
}
