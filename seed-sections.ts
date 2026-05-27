import 'dotenv/config';
import prisma from './lib/prisma';

async function seed() {
  console.log("Seeding default content...");
  const defaults = [
    { key: "story_hero_title", type: "TEXT", section: "Our Story", textContent: "The" },
    { key: "story_hero_highlight", type: "TEXT", section: "Our Story", textContent: "Legacy." },
    { key: "story_hero_tag", type: "TEXT", section: "Our Story", textContent: "Established 2012" },
    { key: "story_hero_img", type: "IMAGE", section: "Our Story", imageUrl: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=2500" },
    { key: "story_ch1_tag", type: "TEXT", section: "Our Story", textContent: "Chapter 01" },
    { key: "story_ch1_title", type: "TEXT", section: "Our Story", textContent: "A Quest for" },
    { key: "story_ch1_highlight", type: "TEXT", section: "Our Story", textContent: "Perfection." },
    { key: "story_ch1_desc1", type: "TEXT", section: "Our Story", textContent: "Our journey began with a single question: why does the perfect cup of coffee feel so elusive?" },
    { key: "story_ch1_img", type: "IMAGE", section: "Our Story", imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1200" },
    { key: "story_ch2_title", type: "TEXT", section: "Our Story", textContent: "Science Meets" },
    { key: "story_ch2_highlight", type: "TEXT", section: "Our Story", textContent: "Soul." },
    { key: "story_ch3_title", type: "TEXT", section: "Our Story", textContent: "The" },
    { key: "story_ch3_highlight", type: "TEXT", section: "Our Story", textContent: "Experience." },
    { key: "story_ch3_img", type: "IMAGE", section: "Our Story", imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=2000" },
    { key: "story_cta_title", type: "TEXT", section: "Our Story", textContent: "Become Part of the" },
    { key: "story_cta_highlight", type: "TEXT", section: "Our Story", textContent: "Story." },
    { key: "story_cta_btn1", type: "BUTTON", section: "Our Story", textContent: "Visit Our Cafe", buttonLink: "/cafe" },
    { key: "story_cta_btn2", type: "BUTTON", section: "Our Story", textContent: "Shop Collection", buttonLink: "/roasts" },
    { key: "footer_brand", type: "TEXT", section: "Footer", textContent: "Hodl & Sip Coffee Roasters" },
    { key: "footer_link_1", type: "TEXT", section: "Footer", textContent: "Instagram" },
    { key: "footer_link_2", type: "TEXT", section: "Footer", textContent: "Journal" },
    { key: "footer_link_3", type: "TEXT", section: "Footer", textContent: "Wholesale" },
    { key: "nav_home", type: "BUTTON", section: "Menu", textContent: "Home", buttonLink: "/" },
    { key: "nav_menu", type: "BUTTON", section: "Menu", textContent: "Menu", buttonLink: "/roasts" },
    { key: "nav_story", type: "BUTTON", section: "Menu", textContent: "Our Story", buttonLink: "/story" },
    { key: "nav_gallery", type: "BUTTON", section: "Menu", textContent: "Gallery", buttonLink: "/gallery" },
    { key: "nav_locations", type: "BUTTON", section: "Menu", textContent: "Locations", buttonLink: "/cafe" },
    { key: "menu_tag", type: "TEXT", section: "Menu", textContent: "The Collection" },
    { key: "menu_title", type: "TEXT", section: "Menu", textContent: "Signature" },
    { key: "menu_highlight", type: "TEXT", section: "Menu", textContent: "Roasts." },
    { key: "menu_desc", type: "TEXT", section: "Menu", textContent: "A curated selection of our finest beans. Hover to explore the unique profile of each exquisite roast." },
    { key: "hero_tag", type: "TEXT", section: "Home", textContent: "Artisanal Roasted Coffee" },
    { key: "hero_desc", type: "TEXT", section: "Home", textContent: "A space designed for traders, builders, and thinkers who value clarity over chaos." },
    { key: "hero_est", type: "TEXT", section: "Home", textContent: "Est. 2026" },
    { key: "hero_sec1_title", type: "TEXT", section: "Home", textContent: "PERFECT" },
    { key: "hero_sec1_highlight", type: "TEXT", section: "Home", textContent: "ROAST." },
    { key: "hero_sec1_desc", type: "TEXT", section: "Home", textContent: "Sourced from high-altitude estates and perfectly roasted to bring out rich, complex flavor profiles." },
    { key: "hero_sec2_title", type: "TEXT", section: "Home", textContent: "RICH" },
    { key: "hero_sec2_highlight", type: "TEXT", section: "Home", textContent: "AROMA." },
    { key: "hero_sec2_desc", type: "TEXT", section: "Home", textContent: "Carefully brewed to energize your mind and provide the perfect start to your day." },
    { key: "hero_sec2_tag", type: "TEXT", section: "Home", textContent: "Energy Restoration" },
    { key: "hero_cta_title", type: "TEXT", section: "Home", textContent: "TASTE." },
    { key: "hero_cta_highlight", type: "TEXT", section: "Home", textContent: "Experience the art of brewing." },
    { key: "hero_cta_desc", type: "TEXT", section: "Home", textContent: "Free Shipping • Premium Quality" },
    { key: "gallery_tag", type: "TEXT", section: "Gallery", textContent: "The Aesthetic" },
    { key: "gallery_title", type: "TEXT", section: "Gallery", textContent: "Visual" },
    { key: "gallery_highlight", type: "TEXT", section: "Gallery", textContent: "Journey." },
    { key: "cafe_tag", type: "TEXT", section: "Locations", textContent: "Our Sanctuary" },
    { key: "cafe_title", type: "TEXT", section: "Locations", textContent: "Visit" },
    { key: "cafe_highlight", type: "TEXT", section: "Locations", textContent: "The Roastery." },
    { key: "cafe_location_image", type: "IMAGE", section: "Locations", imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1000" },
    { key: "cafe_location_desc", type: "TEXT", section: "Locations", textContent: "Step into our world. A space meticulously designed for the pure appreciation of coffee, where every detail enhances the tasting experience." },
    { key: "cafe_location_coords", type: "TEXT", section: "Locations", textContent: "40.7128° N, 74.0060° W" },
    { key: "cafe_address", type: "TEXT", section: "Locations", textContent: "123 Artisan Way,\nThe Roasters District,\nNew York, NY 10001" },
    { key: "cafe_hours", type: "TEXT", section: "Locations", textContent: "Mon - Fri: 7am - 7pm\nSat - Sun: 8am - 8pm" },
    { key: "cafe_location_link", type: "TEXT", section: "Locations", textContent: "https://maps.google.com" },
    // Missing items added below:
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
    { key: "nav_logo", type: "IMAGE", section: "Global", imageUrl: "/hodl_and_sip_print_logo.svg" },
    { key: "footer_desc", type: "TEXT", section: "Footer", textContent: "An artisanal coffee experience curated for the connoisseur. Elevating the standard of your daily ritual." },
    { key: "footer_social_1", type: "BUTTON", section: "Footer", textContent: "Instagram", buttonLink: "#instagram" },
    { key: "footer_social_2", type: "BUTTON", section: "Footer", textContent: "Twitter", buttonLink: "#twitter" },
    { key: "footer_social_3", type: "BUTTON", section: "Footer", textContent: "Facebook", buttonLink: "#facebook" },
    { key: "footer_explore_title", type: "TEXT", section: "Footer", textContent: "Explore" },
    { key: "footer_join_title", type: "TEXT", section: "Footer", textContent: "Join The Club" },
    { key: "footer_join_desc", type: "TEXT", section: "Footer", textContent: "Subscribe for early access to rare single-origin releases." },
    { key: "footer_copyright", type: "TEXT", section: "Footer", textContent: "Hodl & Sip. All Rights Reserved." },
    { key: "footer_privacy_link", type: "BUTTON", section: "Footer", textContent: "Privacy Policy", buttonLink: "#" },
    { key: "footer_terms_link", type: "BUTTON", section: "Footer", textContent: "Terms of Service", buttonLink: "#" },
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

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
