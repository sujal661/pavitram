const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Wipe all existing website content to remove product_1, product_2, about_image etc.
  await prisma.websiteContent.deleteMany({});
  
  // Wipe menus and gallery just in case
  await prisma.menuItem.deleteMany({});
  await prisma.galleryImage.deleteMany({});

  console.log("Wiped old DB data.");

  // Insert exactly what the user wants: Process Scroll, Cafe Location, Menu items, Gallery items
  const newContents = [
    { key: "cafe_location_image", type: "IMAGE", imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1000", textContent: "" },
    { key: "cafe_location_desc", type: "TEXT", textContent: "Step into our world. A space meticulously designed for the pure appreciation of coffee, where every detail enhances the tasting experience.", imageUrl: "" },
    { key: "process_1_image", type: "IMAGE", imageUrl: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=1200", textContent: "" },
    { key: "process_1_title", type: "TEXT", textContent: "The Source", imageUrl: "" },
    { key: "process_1_location", type: "TEXT", textContent: "High-Altitude Farms", imageUrl: "" },
    { key: "process_1_desc", type: "TEXT", textContent: "We source our beans from sustainable, high-altitude farms where the climate produces the most flavorful coffee cherries.", imageUrl: "" },
    { key: "process_2_image", type: "IMAGE", imageUrl: "https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&q=80&w=1200", textContent: "" },
    { key: "process_2_title", type: "TEXT", textContent: "The Roast", imageUrl: "" },
    { key: "process_2_location", type: "TEXT", textContent: "Artisan Roastery", imageUrl: "" },
    { key: "process_2_desc", type: "TEXT", textContent: "Our master roasters carefully monitor time and temperature to bring out the unique characteristics of each bean.", imageUrl: "" },
    { key: "process_3_image", type: "IMAGE", imageUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1200", textContent: "" },
    { key: "process_3_title", type: "TEXT", textContent: "The Brew", imageUrl: "" },
    { key: "process_3_location", type: "TEXT", textContent: "Your Cup", imageUrl: "" },
    { key: "process_3_desc", type: "TEXT", textContent: "Whether poured over or pulled as espresso, our coffee is designed to deliver a perfect, balanced cup every time.", imageUrl: "" },
  ];

  await prisma.websiteContent.createMany({ data: newContents });
  
  await prisma.menuItem.createMany({
     data: [
       { orderId: 0, name: "Ethiopian Yirgacheffe", tag: "Light Roast", price: "₹450", desc: "Bright and floral with notes of jasmine, bergamot, and blueberry. A delicate cup that dances on the palate.", origin: "Yirgacheffe", imageUrl: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=1200" },
       { orderId: 1, name: "Colombian Supremo", tag: "Medium Roast", price: "₹380", desc: "A perfectly balanced cup with notes of chocolate, caramel, and a hint of sweet orange.", origin: "Antioquia", imageUrl: "https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&q=80&w=1200" },
       { orderId: 2, name: "Sumatra Mandheling", tag: "Dark Roast", price: "₹520", desc: "Earthy and full-bodied with a syrupy sweet finish and bold notes of dark chocolate.", origin: "North Sumatra", imageUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1200" },
       { orderId: 3, name: "House Espresso", tag: "Signature Roast", price: "₹340", desc: "Our signature blend designed for the perfect crema and a rich, bold flavor profile.", origin: "Global Blend", imageUrl: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=1200" },
     ]
  });

  await prisma.galleryImage.createMany({
     data: [
       { orderId: 0, imageUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1200", category: "The Craft", title: "Morning Extraction" },
       { orderId: 1, imageUrl: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=1200", category: "Origins", title: "Ethiopian Highlands" },
       { orderId: 2, imageUrl: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=1200", category: "Atmosphere", title: "The Reading Corner" },
       { orderId: 3, imageUrl: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=1200", category: "The Craft", title: "Pour Over Precision" },
       { orderId: 4, imageUrl: "https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&q=80&w=1200", category: "Origins", title: "Sun-Dried Beans" },
       { orderId: 5, imageUrl: "https://images.unsplash.com/photo-1511920170033-f8396924c648?auto=format&fit=crop&q=80&w=1200", category: "Atmosphere", title: "Evening Ambiance" },
     ]
  });

  console.log("Seeded perfect data!");
}

main().catch(e => {
  console.error("Prisma error:", e);
}).finally(async () => {
  await prisma.$disconnect();
});
