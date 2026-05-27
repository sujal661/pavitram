import 'dotenv/config';
import prisma from './lib/prisma';

async function update() {
  console.log("Updating existing sections...");
  
  await prisma.websiteContent.updateMany({
    where: { key: { startsWith: 'story_' } },
    data: { section: 'Our Story' }
  });
  
  await prisma.websiteContent.updateMany({
    where: { key: { startsWith: 'process_' } },
    data: { section: 'Home' }
  });
  
  await prisma.websiteContent.updateMany({
    where: { key: { startsWith: 'cafe_' } },
    data: { section: 'Locations' }
  });
  
  await prisma.websiteContent.updateMany({
    where: { key: { startsWith: 'menu_' } },
    data: { section: 'Menu' }
  });
  
  await prisma.websiteContent.updateMany({
    where: { key: { startsWith: 'nav_' } },
    data: { section: 'Global' } // Put nav items in Global instead of Menu
  });
  
  console.log("Sections updated.");
}

update().finally(() => prisma.$disconnect());
