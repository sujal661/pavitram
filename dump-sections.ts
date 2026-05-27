import 'dotenv/config';
import prisma from './lib/prisma';
async function main() {
  const contents = await prisma.websiteContent.findMany({ where: { key: { startsWith: 'cafe_' } } });
  contents.forEach(c => {
     console.log(`${c.key} -> mapping: ${JSON.stringify(c.imageUrl || c.textContent || "")}`);
  });
}
main().finally(() => prisma.$disconnect());
