import Navbar from "../components/Navbar";

export default function CateringPage() {
  return (
    <main className="min-h-screen bg-[#080605] pt-32 pb-24 relative overflow-hidden flex flex-col items-center">
      <Navbar />
      <div className="max-w-4xl mx-auto text-center space-y-8 mt-24 px-6">
         <span className="text-[#C6A87C] tracking-[0.5em] text-[10px] font-bold uppercase">Services</span>
         <h1 className="text-6xl md:text-8xl font-serif text-white tracking-tighter">Event <span className="italic text-[#C6A87C]">Catering.</span></h1>
         <p className="text-white/60 font-light max-w-lg mx-auto text-lg">
            Bring the Hodl & Sip experience to your next event. We offer mobile espresso bars, batch brew stations, and curated pastry selections for weddings, corporate events, and private parties.
         </p>
         <button className="border border-[#C6A87C]/40 text-[#C6A87C] uppercase tracking-widest text-xs px-8 py-4 rounded-full mt-8 hover:bg-[#C6A87C] hover:text-black transition-colors">
            Request Quote
         </button>
      </div>
    </main>
  );
}
