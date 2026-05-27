import Navbar from "../components/Navbar";

export default function WholesalePage() {
  return (
    <main className="min-h-screen bg-[#080605] pt-32 pb-24 relative overflow-hidden">
      <Navbar />
      <div className="max-w-[2000px] mx-auto px-6 md:px-12 lg:px-24">
         <span className="text-[#C6A87C] tracking-[0.5em] text-[10px] font-bold uppercase mb-4 block">Wholesale</span>
         <h1 className="text-6xl md:text-8xl font-serif text-white tracking-tighter mb-12">Partner <span className="italic text-[#C6A87C]">With Us.</span></h1>
         <p className="text-white/60 font-light max-w-2xl text-lg leading-relaxed mb-12">
            Elevate your cafe, restaurant, or office with our premium roasted coffee. We provide comprehensive training, equipment consultation, and dedicated support to our wholesale partners.
         </p>
         <button className="bg-[#C6A87C] text-black font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-full hover:bg-white transition-colors">
            Inquire Now
         </button>
      </div>
    </main>
  );
}
