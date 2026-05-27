'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- Menu Items ---
export async function createMenuItem(data: any) {
  try {
    const item = await prisma.menuItem.create({ data });
    revalidatePath('/', 'layout');
    revalidatePath('/admin/media');
    return { success: true, item };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function updateMenuItem(id: string, data: any) {
  try {
    const item = await prisma.menuItem.update({ where: { id }, data });
    revalidatePath('/', 'layout');
    revalidatePath('/admin/media');
    return { success: true, item };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function deleteMenuItem(id: string) {
  try {
    await prisma.menuItem.delete({ where: { id } });
    revalidatePath('/', 'layout');
    revalidatePath('/admin/media');
    return { success: true };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

// --- Gallery Images ---
export async function createGalleryImage(data: any) {
  try {
    const img = await prisma.galleryImage.create({ data });
    revalidatePath('/', 'layout');
    revalidatePath('/admin/media');
    return { success: true, img };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function updateGalleryImage(id: string, data: any) {
  try {
    const img = await prisma.galleryImage.update({ where: { id }, data });
    revalidatePath('/', 'layout');
    revalidatePath('/admin/media');
    return { success: true, img };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function deleteGalleryImage(id: string) {
  try {
    await prisma.galleryImage.delete({ where: { id } });
    revalidatePath('/', 'layout');
    revalidatePath('/admin/media');
    return { success: true };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

// --- Website Content ---
export async function createWebsiteContent(data: any) {
  try {
    const content = await prisma.websiteContent.create({ data });
    revalidatePath('/', 'layout');
    revalidatePath('/admin/media');
    return { success: true, content };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function updateWebsiteContent(id: string, data: any) {
  try {
    const content = await prisma.websiteContent.update({ where: { id }, data });
    revalidatePath('/', 'layout');
    revalidatePath('/admin/media');
    return { success: true, content };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function deleteWebsiteContent(id: string) {
  try {
    await prisma.websiteContent.delete({ where: { id } });
    revalidatePath('/', 'layout');
    revalidatePath('/admin/media');
    return { success: true };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}
