import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    await prisma.websiteContent.deleteMany({});
    await prisma.menuItem.deleteMany({});
    await prisma.galleryImage.deleteMany({});
    
    return NextResponse.json({ success: true, message: "Wiped successfully. Go to /admin/media to auto-seed." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
