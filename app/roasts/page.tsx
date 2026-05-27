import Navbar from "../components/Navbar";
import ProductShowcase from "../components/ProductShowcase";
import Footer from "../components/Footer";
import prisma from "@/lib/prisma";

export const revalidate = 60;

export default async function RoastsPage() {
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
    console.error("Failed to fetch website content:", error);
  }

  return (
    <main className="min-h-screen bg-[#080605] pt-24">
      <Navbar content={contentMap} />
      <ProductShowcase content={contentMap} dbMenuItems={menuItems} />
      <Footer content={contentMap} />
    </main>
  );
}
