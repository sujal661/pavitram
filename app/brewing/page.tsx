import Navbar from "../components/Navbar";
import ProcessScroll from "../components/ProcessScroll";
import prisma from "@/lib/prisma";

export default async function BrewingPage() {
  let contentMap: Record<string, string> = {};
  
  try {
    const contents = await prisma.websiteContent.findMany();
    contentMap = Object.fromEntries(contents.map((c) => [c.key, c.imageUrl || c.textContent || ""]));
  } catch (error) {
    console.error("Failed to fetch website content:", error);
  }

  return (
    <main className="min-h-screen bg-[#0a0806] pt-24">
      <Navbar />
      <ProcessScroll content={contentMap} />
    </main>
  );
}
