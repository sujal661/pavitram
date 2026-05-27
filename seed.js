const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const data = [
    { key: "process_1_title", type: "TEXT", textContent: "The Source" },
    { key: "process_1_location", type: "TEXT", textContent: "High-Altitude Farms" },
    { key: "process_1_desc", type: "TEXT", textContent: "We source our beans from sustainable, high-altitude farms where the climate produces the most flavorful coffee cherries." },
    { key: "process_2_title", type: "TEXT", textContent: "The Roast" },
    { key: "process_2_location", type: "TEXT", textContent: "Artisan Roastery" },
    { key: "process_2_desc", type: "TEXT", textContent: "Our master roasters carefully monitor time and temperature to bring out the unique characteristics of each bean." },
    { key: "process_3_title", type: "TEXT", textContent: "The Brew" },
    { key: "process_3_location", type: "TEXT", textContent: "Your Cup" },
    { key: "process_3_desc", type: "TEXT", textContent: "Whether poured over or pulled as espresso, our coffee is designed to deliver a perfect, balanced cup every time." },
  ];

  for (const item of data) {
    try {
      await prisma.websiteContent.upsert({
        where: { key: item.key },
        update: {},
        create: item
      });
      console.log('Seeded', item.key);
    } catch (e) {
      console.log('Skipped', item.key);
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
