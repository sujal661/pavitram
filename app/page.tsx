import dynamic from 'next/dynamic';
import HeadphoneScroll from "./components/HeadphoneScroll";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import prisma from "@/lib/prisma";

const OurStory = dynamic(() => import('./components/OurStory'));
const ProductShowcase = dynamic(() => import('./components/ProductShowcase'));
const ProcessScroll = dynamic(() => import('./components/ProcessScroll'));
const CafeGallery = dynamic(() => import('./components/CafeGallery'));
const CafeLocation = dynamic(() => import('./components/CafeLocation'));

export const revalidate = 60;

export default async function Home() {
  let contentMap: Record<string, string> = {};
  let menuItems: any[] = [];
  
  try {
    const contents = await prisma.websiteContent.findMany();
    contents.forEach(c => {
      contentMap[c.key] = c.imageUrl || c.textContent || "";
      if (c.type === "BUTTON") {
         contentMap[`${c.key}_link`] = c.buttonLink || "";
      }
    });

    menuItems = await prisma.menuItem.findMany({ orderBy: { orderId: 'asc' } });
  } catch (error) {
    console.error("Failed to fetch data:", error);
    // Fallback is handled in components
  }

  return (
    <main className="min-h-screen bg-[#080605]">
      <Navbar content={contentMap} />
      <HeadphoneScroll content={contentMap} />
      <div id="our"><OurStory content={contentMap} /></div>
      <div id="roasts"><ProductShowcase content={contentMap} dbMenuItems={menuItems} /></div>
      <div id="brewing"><ProcessScroll content={contentMap} /></div>
      <div id="gallery"><CafeGallery content={contentMap} /></div>
      <div id="cafe"><CafeLocation content={contentMap} /></div>
      <Footer content={contentMap} />
    </main>
  );
}
