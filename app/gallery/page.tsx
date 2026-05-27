import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import prisma from "@/lib/prisma";
import GalleryClient from "./GalleryClient";

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
   let galleryImages: any[] = [];
   let contentMap: Record<string, string> = {};
   try {
      galleryImages = await prisma.galleryImage.findMany({ orderBy: { orderId: 'asc' } });
      const contents = await prisma.websiteContent.findMany();
      contentMap = Object.fromEntries(contents.map((c) => [c.key, c.imageUrl || c.textContent || ""]));
   } catch (error) {
      console.error("Failed to fetch gallery data:", error);
   }

   return (
      <main className="min-h-screen bg-[#080605] pt-32 pb-48 relative overflow-x-hidden selection:bg-[#C6A87C] selection:text-black">
         <Navbar content={contentMap} />
         
         <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-[#C6A87C]/5 rounded-full blur-[150px]" />
            <div className="absolute bottom-[20%] right-[20%] w-[600px] h-[600px] bg-[#C6A87C]/5 rounded-full blur-[180px]" />
         </div>
         
         <div className="max-w-[2000px] mx-auto px-6 md:px-12 lg:px-24 relative z-10 mt-12 mb-24">
            <GalleryClient dbImages={galleryImages} content={contentMap} />
         </div>
         <Footer content={contentMap} />
      </main>
   );
}
