import Navbar from "../components/Navbar";
import CafeLocation from "../components/CafeLocation";
import Footer from "../components/Footer";
import prisma from "@/lib/prisma";
export default async function CafePage() {
  let contentMap: Record<string, string> = {};
  try {
    const contents = await prisma.websiteContent.findMany();
    contentMap = Object.fromEntries(contents.map((c) => [c.key, c.imageUrl || c.textContent || ""]));
  } catch (error) {
    console.error("Failed to fetch cafe content:", error);
  }

  return (
    <main className="min-h-screen bg-[#080605] pt-24">
      <Navbar content={contentMap} />
      <CafeLocation content={contentMap} />
      <Footer content={contentMap} />
    </main>
  );
}
