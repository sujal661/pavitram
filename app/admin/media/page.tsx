import prisma from "@/lib/prisma";
import MediaDashboard from "../components/MediaDashboard";

export const metadata = {
  title: "Media Library | Admin",
};

export const dynamic = 'force-dynamic';

export default async function MediaPage() {
  let contents: any[] = [];
  let contentMap: Record<string, string> = {};
  let menuItems: any[] = [];
  let galleryImages: any[] = [];
  
  try {
    contents = await prisma.websiteContent.findMany();
    contentMap = Object.fromEntries(contents.map((c: any) => [c.key, c.imageUrl || c.textContent || ""]));

    menuItems = await prisma.menuItem.findMany({ orderBy: { orderId: 'asc' } });
    galleryImages = await prisma.galleryImage.findMany({ orderBy: { orderId: 'asc' } });

    console.log("Admin media page fetched contents:", contents.length, "items.");
    console.log("Menu items in admin:", contents.filter(c => c.section === 'Menu').length);

    // Seed defaults if empty
    let seedPromises = [];

    const hasProcessData = contents.some((c: any) => c.key === "process_1_title");
    if (!hasProcessData) {
       seedPromises.push(
          prisma.websiteContent.createMany({
             data: [
               { key: "cafe_location_image", type: "IMAGE", section: "Locations", imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1000" },
               { key: "cafe_location_desc", type: "TEXT", section: "Locations", textContent: "Step into our world. A space meticulously designed for the pure appreciation of coffee, where every detail enhances the tasting experience." },
               { key: "cafe_location_coords", type: "TEXT", section: "Locations", textContent: "40.7128° N, 74.0060° W" },
               { key: "cafe_address", type: "TEXT", section: "Locations", textContent: "123 Artisan Way,\nThe Roasters District,\nNew York, NY 10001" },
               { key: "cafe_hours", type: "TEXT", section: "Locations", textContent: "Mon - Fri: 7am - 7pm\nSat - Sun: 8am - 8pm" },
               { key: "cafe_location_link", type: "TEXT", section: "Locations", textContent: "https://maps.google.com" },
               
               { key: "process_header_tag", type: "TEXT", textContent: "The Brewing Process" },
               { key: "process_header_title", type: "TEXT", textContent: "Craft &" },
               { key: "process_header_highlight", type: "TEXT", textContent: "Passion." },
               { key: "process_header_desc", type: "TEXT", textContent: "We believe that great coffee cannot be rushed. It must be crafted. Our methodology honors the journey from bean to cup." },
               
               { key: "process_1_image", type: "IMAGE", imageUrl: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=1200" },
               { key: "process_1_title", type: "TEXT", textContent: "The Source" },
               { key: "process_1_location", type: "TEXT", textContent: "High-Altitude Farms" },
               { key: "process_1_desc", type: "TEXT", textContent: "We source our beans from sustainable, high-altitude farms where the climate produces the most flavorful coffee cherries." },
               
               { key: "process_2_image", type: "IMAGE", imageUrl: "https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&q=80&w=1200" },
               { key: "process_2_title", type: "TEXT", textContent: "The Roast" },
               { key: "process_2_location", type: "TEXT", textContent: "Artisan Roastery" },
               { key: "process_2_desc", type: "TEXT", textContent: "Our master roasters carefully monitor time and temperature to bring out the unique characteristics of each bean." },
               
               { key: "process_3_image", type: "IMAGE", imageUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1200" },
               { key: "process_3_title", type: "TEXT", textContent: "The Brew" },
               { key: "process_3_location", type: "TEXT", textContent: "Your Cup" },
               { key: "process_3_desc", type: "TEXT", textContent: "Whether poured over or pulled as espresso, our coffee is designed to deliver a perfect, balanced cup every time." },
             ]
          })
       );
    }

    const hasStoryData = contents.some((c: any) => c.key === "story_tag");
    if (!hasStoryData) {
       seedPromises.push(
          prisma.websiteContent.createMany({
             data: [
               { key: "story_tag", type: "TEXT", textContent: "The Heritage" },
               { key: "story_title", type: "TEXT", textContent: "A Legacy in" },
               { key: "story_highlight", type: "TEXT", textContent: "Every Bean." },
               { key: "story_desc_1", type: "TEXT", textContent: "Founded on a relentless pursuit of perfection, Hodl & Sip began as a small roasting experiment in an old garage. We wanted to see what happens when you treat coffee not as a commodity, but as an artisanal craft." },
               { key: "story_desc_2", type: "TEXT", textContent: "Today, we travel the world seeking the rarest beans, bringing them back to our roastery to unlock their hidden potential. Every cup we serve is a testament to the farmers, the roasters, and the community that makes this possible." },
               { key: "story_image_1", type: "IMAGE", imageUrl: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=80&w=1200" },
               { key: "story_image_2", type: "IMAGE", imageUrl: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=1200" },
             ],
           })
       );
    }

    if (menuItems.length === 0) {
       seedPromises.push(
          prisma.menuItem.createMany({
             data: [
               { orderId: 0, name: "Ethiopian Yirgacheffe", tag: "Light Roast", price: "₹450", desc: "Bright and floral with notes of jasmine, bergamot, and blueberry. A delicate cup that dances on the palate.", origin: "Yirgacheffe", imageUrl: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=1200" },
               { orderId: 1, name: "Colombian Supremo", tag: "Medium Roast", price: "₹380", desc: "A perfectly balanced cup with notes of chocolate, caramel, and a hint of sweet orange.", origin: "Antioquia", imageUrl: "https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&q=80&w=1200" },
               { orderId: 2, name: "Sumatra Mandheling", tag: "Dark Roast", price: "₹520", desc: "Earthy and full-bodied with a syrupy sweet finish and bold notes of dark chocolate.", origin: "North Sumatra", imageUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1200" },
               { orderId: 3, name: "House Espresso", tag: "Signature Roast", price: "₹340", desc: "Our signature blend designed for the perfect crema and a rich, bold flavor profile.", origin: "Global Blend", imageUrl: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=1200" },
             ]
          })
       );
    }

    if (galleryImages.length === 0) {
       seedPromises.push(
          prisma.galleryImage.createMany({
             data: [
               { orderId: 0, imageUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1200", category: "The Craft", title: "Morning Extraction" },
               { orderId: 1, imageUrl: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=1200", category: "Origins", title: "Ethiopian Highlands" },
               { orderId: 2, imageUrl: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=1200", category: "Atmosphere", title: "The Reading Corner" },
               { orderId: 3, imageUrl: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=1200", category: "The Craft", title: "Pour Over Precision" },
               { orderId: 4, imageUrl: "https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&q=80&w=1200", category: "Origins", title: "Sun-Dried Beans" },
               { orderId: 5, imageUrl: "https://images.unsplash.com/photo-1511920170033-f8396924c648?auto=format&fit=crop&q=80&w=1200", category: "Atmosphere", title: "Evening Ambiance" },
             ]
          })
       );
    }

    if (seedPromises.length > 0) {
       await prisma.$transaction(seedPromises);
       
       // Refetch
       contents = await prisma.websiteContent.findMany();
       contentMap = Object.fromEntries(contents.map((c: any) => [c.key, c.imageUrl || c.textContent || ""]));
       menuItems = await prisma.menuItem.findMany({ orderBy: { orderId: 'asc' } });
       galleryImages = await prisma.galleryImage.findMany({ orderBy: { orderId: 'asc' } });
    }
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif text-white tracking-tight">Content Studio</h1>
        <p className="text-sm text-zinc-400 mt-2">Manage global text, hero images, menu items, and gallery photography.</p>
      </div>

      <MediaDashboard 
         contents={contents}
         contentMap={contentMap} 
         menuItems={menuItems} 
         galleryImages={galleryImages} 
      />
    </div>
  );
}
