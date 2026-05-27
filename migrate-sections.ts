import 'dotenv/config';
import prisma from './lib/prisma';

async function migrateSections() {
  console.log("Starting section migration...");
  const contents = await prisma.websiteContent.findMany();
  
  let updatedCount = 0;
  
  for (const c of contents) {
    let newSection = c.section || "Home";
    
    // Auto-categorize based on key names
    if (c.key.startsWith("story_hero") || c.key.startsWith("story_ch") || c.key.startsWith("story_cta") || c.key.startsWith("story_stat")) {
      newSection = "Our Story";
    } else if (c.key.startsWith("footer")) {
      newSection = "Footer";
    } else if (c.key.startsWith("menu_") || c.key.startsWith("roast_")) {
      newSection = "Menu";
    } else if (c.key.startsWith("gallery_")) {
      newSection = "Gallery";
    } else if (c.key.startsWith("location_") || c.key.startsWith("cafe_")) {
      newSection = "Locations";
    }
    
    // If it's the Our Story section on the home page, keep it in Home
    if (c.key === "story_title" || c.key === "story_highlight" || c.key === "story_desc_1" || c.key === "story_desc_2" || c.key === "story_image_1" || c.key === "story_image_2") {
       newSection = "Home";
    }

    if (newSection !== c.section) {
      await prisma.websiteContent.update({
        where: { id: c.id },
        data: { section: newSection }
      });
      console.log(`Moved '${c.key}' to section '${newSection}'`);
      updatedCount++;
    }
  }
  
  console.log(`Migration complete. Updated ${updatedCount} items.`);
}

migrateSections()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
