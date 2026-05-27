import 'dotenv/config';
import prisma from './lib/prisma';

async function seedMissing() {
  const defaults = [
    { key: "story_ch1_desc2", type: "TEXT", section: "Our Story", textContent: "We spent years traveling to the high-altitude regions of Ethiopia, Colombia, and Indonesia. This obsession with the origin is what defines every bag of Hodl & Sip today." },
    { key: "story_stat1_val", type: "TEXT", section: "Our Story", textContent: "200+" },
    { key: "story_stat1_label", type: "TEXT", section: "Our Story", textContent: "Farms Visited" },
    { key: "story_stat2_val", type: "TEXT", section: "Our Story", textContent: "10k+" },
    { key: "story_stat2_label", type: "TEXT", section: "Our Story", textContent: "Roast Profiles" },
    { key: "story_ch2_tag", type: "TEXT", section: "Our Story", textContent: "Chapter 02" },
    { key: "story_ch2_pt1_title", type: "TEXT", section: "Our Story", textContent: "Ethical Sourcing" },
    { key: "story_ch2_pt1_desc", type: "TEXT", section: "Our Story", textContent: "We pay 30% above fair trade prices to ensure our farmers can invest in sustainable practices and their communities." },
    { key: "story_ch2_pt2_title", type: "TEXT", section: "Our Story", textContent: "Precision Roasting" },
    { key: "story_ch2_pt2_desc", type: "TEXT", section: "Our Story", textContent: "Our advanced Loring roasters use smart convection to ensure consistent, smoke-free flavor profiles that respect the bean." },
    { key: "story_ch2_pt3_title", type: "TEXT", section: "Our Story", textContent: "The Ritual" },
    { key: "story_ch2_pt3_desc", type: "TEXT", section: "Our Story", textContent: "Every pour, every pull, and every sip is an invitation to slow down, connect, and savor the present moment." },
    { key: "story_ch2_img1", type: "IMAGE", section: "Our Story", imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800" },
    { key: "story_ch2_img2", type: "IMAGE", section: "Our Story", imageUrl: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=80&w=800" },
    { key: "story_ch2_img3", type: "IMAGE", section: "Our Story", imageUrl: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=800" },
    { key: "story_ch2_quote", type: "TEXT", section: "Our Story", textContent: "Crafted with intent." },
    { key: "story_ch3_tag", type: "TEXT", section: "Our Story", textContent: "Chapter 03" },
    { key: "story_ch3_desc", type: "TEXT", section: "Our Story", textContent: "Beyond the bean, Hodl & Sip is a sanctuary. A place where the architecture of the space matches the complexity of the cup." },
    { key: "story_cta_desc", type: "TEXT", section: "Our Story", textContent: "Whether you're a seasoned connoisseur or just beginning your coffee journey, there's always a seat at our table." },
  ];

  let added = 0;
  for (const item of defaults) {
     const exists = await prisma.websiteContent.findUnique({ where: { key: item.key } });
     if (!exists) {
       await prisma.websiteContent.create({ data: item });
       added++;
     } else {
       await prisma.websiteContent.update({
         where: { key: item.key },
         data: { section: item.section }
       });
     }
  }
  console.log(`Seeded ${added} missing items into the database.`);
}

seedMissing().finally(() => prisma.$disconnect());
