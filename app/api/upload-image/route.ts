import { imagekit } from "@/lib/imagekit";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const key = formData.get("key") as string;

    if (!file) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await imagekit.upload({
      file: buffer,
      fileName: file.name,
      folder: "/website-assets", // Optional: organize images in a folder
    });

    if (key && key !== 'NO_KEY') {
      await prisma.websiteContent.upsert({
        where: { key },
        update: { imageUrl: result.url },
        create: { key, imageUrl: result.url },
      });
      revalidatePath("/");
      revalidatePath("/admin/media");
    }

    return NextResponse.json({ success: true, url: result.url });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 });
  }
}
