import HeadphoneScroll from "./components/HeadphoneScroll";
import Navbar from "./components/Navbar";
import ProductShowcase from "./components/ProductShowcase";
import ProcessScroll from "./components/ProcessScroll";
import BenefitScroll from "./components/BenefitScroll";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505]">
      <Navbar />
      <HeadphoneScroll />
      <ProductShowcase />
      <ProcessScroll />
      <BenefitScroll />
    </main>
  );
}
