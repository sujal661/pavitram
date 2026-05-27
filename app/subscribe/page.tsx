import Navbar from "../components/Navbar";

export default function SubscribePage() {
  return (
    <main className="min-h-screen bg-[#080605] pt-32 pb-24 flex flex-col items-center justify-center relative overflow-hidden">
      <Navbar />
      
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-10 pointer-events-none mix-blend-overlay z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,168,124,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="w-full max-w-xl mx-auto px-6 relative z-10">
         <div className="text-center mb-16 space-y-6">
            <span className="text-[#C6A87C] tracking-[0.5em] text-[10px] font-bold uppercase">The Club</span>
            <h1 className="text-5xl md:text-7xl font-serif text-white tracking-tighter leading-none">Hodl & Sip <br/><span className="italic text-[#C6A87C]">Reserve.</span></h1>
            <p className="text-white/60 font-light leading-relaxed">Join our exclusive subscription tier to receive rare, limited-run single origin roasts delivered to your door every month.</p>
         </div>

         <div className="bg-[#0a0806] border border-[#C6A87C]/20 rounded-[2.5rem] p-8 md:p-12 shadow-2xl space-y-8">
            <div className="space-y-4">
               <label className="text-[10px] text-white/50 tracking-[0.2em] uppercase font-bold">Email Address</label>
               <input 
                  type="email" 
                  placeholder="Enter your email..." 
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[#C6A87C]/50 transition-colors placeholder:text-white/20"
               />
            </div>
            <button className="w-full bg-[#C6A87C] text-black font-bold uppercase tracking-widest text-xs py-5 rounded-xl hover:bg-white transition-colors">
               Apply for Membership
            </button>
            <p className="text-center text-white/30 text-xs italic">Spots are strictly limited to ensure quality.</p>
         </div>
      </div>
    </main>
  );
}
