"use server";

import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

import { revalidatePath } from "next/cache";
import { addGalleryImage, deleteGalleryImage, getGalleryImageById } from "@/lib/db";

export async function addGalleryImageAction(formData: FormData) {
  const imageUrl = String(formData.get("imageUrl") || "").trim();
  const altText = String(formData.get("altText") || "").trim();
  const imageFile = formData.get("imageFile");

  if (!altText) {
    return;
  }

  let finalImageUrl = imageUrl;

  if (imageFile instanceof File && imageFile.size > 0) {
    if (!imageFile.type.startsWith("image/")) {
      return;
    }

    const maxSizeBytes = 5 * 1024 * 1024;
    if (imageFile.size > maxSizeBytes) {
      return;
    }

    const extension = imageFile.name.includes(".") ? imageFile.name.split(".").pop() : undefined;
    const safeExt = (extension || "jpg").replace(/[^a-zA-Z0-9]/g, "").toLowerCase() || "jpg";
    const fileName = `${randomUUID()}.${safeExt}`;
    const relativeDir = "/uploads/gallery";
    const uploadDir = path.join(process.cwd(), "public", relativeDir);

    await mkdir(uploadDir, { recursive: true });
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    await writeFile(path.join(uploadDir, fileName), buffer);
    finalImageUrl = `${relativeDir}/${fileName}`;
  }

  if (!finalImageUrl) {
    return;
  }

  await addGalleryImage({ imageUrl: finalImageUrl, altText });

  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
}

export async function deleteGalleryImageAction(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) {
    return;
  }

  const image = await getGalleryImageById(id);

  await deleteGalleryImage(id);

  if (image?.imageUrl.startsWith("/uploads/gallery/")) {
    const relativePath = image.imageUrl.replace(/^\/+/, "");
    const absolutePath = path.join(process.cwd(), "public", relativePath);
    const galleryRoot = path.join(process.cwd(), "public", "uploads", "gallery");
    const normalizedFilePath = path.normalize(absolutePath);
    const normalizedGalleryRoot = path.normalize(galleryRoot + path.sep);

    if (normalizedFilePath.startsWith(normalizedGalleryRoot)) {
      try {
        await unlink(normalizedFilePath);
      } catch {
        // If file does not exist, keep database deletion as source of truth.
      }
    }
  }

  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
}
