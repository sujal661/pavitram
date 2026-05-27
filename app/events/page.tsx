import Navbar from "../components/Navbar";

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-[#080605] pt-32 pb-24 relative overflow-hidden">
      <Navbar />
      <div className="max-w-[2000px] mx-auto px-6 md:px-12 lg:px-24">
         <span className="text-[#C6A87C] tracking-[0.5em] text-[10px] font-bold uppercase mb-4 block">Community</span>
         <h1 className="text-6xl md:text-8xl font-serif text-white tracking-tighter mb-12">Upcoming <span className="italic text-[#C6A87C]">Events.</span></h1>
         
         <div className="space-y-6 max-w-4xl">
            <div className="border border-white/10 rounded-3xl p-8 flex justify-between items-center bg-white/5 backdrop-blur-md hover:border-[#C6A87C]/50 transition-colors">
               <div>
                  <h3 className="text-2xl font-serif text-white mb-2">Latte Art Masterclass</h3>
                  <p className="text-[#C6A87C] text-sm tracking-widest uppercase">Next Saturday • 10:00 AM</p>
               </div>
               <button className="border border-[#C6A87C]/40 text-[#C6A87C] px-6 py-2 rounded-full text-xs uppercase tracking-widest hover:bg-[#C6A87C] hover:text-black transition-colors">RSVP</button>
            </div>
            
            <div className="border border-white/10 rounded-3xl p-8 flex justify-between items-center bg-white/5 backdrop-blur-md hover:border-[#C6A87C]/50 transition-colors">
               <div>
                  <h3 className="text-2xl font-serif text-white mb-2">Cupping & Tasting Session</h3>
                  <p className="text-[#C6A87C] text-sm tracking-widest uppercase">First Friday • 6:00 PM</p>
               </div>
               <button className="border border-[#C6A87C]/40 text-[#C6A87C] px-6 py-2 rounded-full text-xs uppercase tracking-widest hover:bg-[#C6A87C] hover:text-black transition-colors">RSVP</button>
            </div>
         </div>
      </div>
    </main>
  );
}
