import prisma from "@/lib/prisma";
import StoryClient from "./StoryClient";

export const revalidate = 60;

export default async function StoryPage() {
  let contentMap: Record<string, string> = {};
  
  try {
    const contents = await prisma.websiteContent.findMany();
    // For TEXT/IMAGE types, we use imageUrl or textContent
    // For BUTTON types, we will map textContent to the button label, and buttonLink to a secondary key
    contents.forEach(c => {
      contentMap[c.key] = c.imageUrl || c.textContent || "";
      if (c.type === "BUTTON") {
         contentMap[`${c.key}_link`] = c.buttonLink || "";
      }
    });
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }

  return <StoryClient content={contentMap} />;
}
