"use server";

import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

import { revalidatePath } from "next/cache";

import { addManagedImage, deleteManagedImage, getManagedImageById, mediaSections, type MediaSection, updateManagedImage } from "@/lib/db";

function isValidSection(section: string): section is MediaSection {
  return mediaSections.includes(section as MediaSection);
}

export async function addManagedImageAction(formData: FormData) {
  const sectionRaw = String(formData.get("section") || "").trim();
  const title = String(formData.get("title") || "").trim();
  const subtitle = String(formData.get("subtitle") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const imageUrlInput = String(formData.get("imageUrl") || "").trim();
  const mobileImageUrlInput = String(formData.get("mobileImageUrl") || "").trim();
  const sortOrder = Number(formData.get("sortOrder") || 0);
  const isActive = formData.get("isActive") === "on";
  const imageFile = formData.get("imageFile");
  const mobileImageFile = formData.get("mobileImageFile");

  if (!isValidSection(sectionRaw) || !title) {
    return;
  }

  let imageUrl = imageUrlInput;
  let mobileImageUrl = mobileImageUrlInput || null;

  if (imageFile instanceof File && imageFile.size > 0) {
    if (!imageFile.type.startsWith("image/")) {
      return;
    }

    const maxSizeBytes = 6 * 1024 * 1024;
    if (imageFile.size > maxSizeBytes) {
      return;
    }

    const extension = imageFile.name.includes(".") ? imageFile.name.split(".").pop() : undefined;
    const safeExt = (extension || "jpg").replace(/[^a-zA-Z0-9]/g, "").toLowerCase() || "jpg";
    const fileName = `${randomUUID()}.${safeExt}`;
    const relativeDir = "/uploads/managed";
    const uploadDir = path.join(process.cwd(), "public", relativeDir);

    await mkdir(uploadDir, { recursive: true });
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    await writeFile(path.join(uploadDir, fileName), buffer);
    imageUrl = `${relativeDir}/${fileName}`;
  }

  if (mobileImageFile instanceof File && mobileImageFile.size > 0) {
    if (!mobileImageFile.type.startsWith("image/")) {
      return;
    }

    const maxSizeBytes = 6 * 1024 * 1024;
    if (mobileImageFile.size > maxSizeBytes) {
      return;
    }

    const extension = mobileImageFile.name.includes(".") ? mobileImageFile.name.split(".").pop() : undefined;
    const safeExt = (extension || "jpg").replace(/[^a-zA-Z0-9]/g, "").toLowerCase() || "jpg";
    const fileName = `${randomUUID()}.${safeExt}`;
    const relativeDir = "/uploads/managed";
    const uploadDir = path.join(process.cwd(), "public", relativeDir);

    await mkdir(uploadDir, { recursive: true });
    const buffer = Buffer.from(await mobileImageFile.arrayBuffer());
    await writeFile(path.join(uploadDir, fileName), buffer);
    mobileImageUrl = `${relativeDir}/${fileName}`;
  }

  if (!imageUrl && !mobileImageUrl) {
    return;
  }

  if (!imageUrl && mobileImageUrl) {
    imageUrl = mobileImageUrl;
  }

  await addManagedImage({
    section: sectionRaw,
    imageUrl: imageUrl || null,
    mobileImageUrl,
    title,
    subtitle: subtitle || null,
    description: description || null,
    sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
    isActive
  });

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/programs");
  revalidatePath("/admission");
  revalidatePath("/admin/photos");
}

export async function deleteManagedImageAction(formData: FormData) {
  const id = String(formData.get("id") || "").trim();
  if (!id) {
    return;
  }

  const existing = await getManagedImageById(id);

  await deleteManagedImage(id);

  if (existing?.imageUrl && existing.imageUrl.startsWith("/uploads/managed/")) {
    const relativePath = existing.imageUrl.replace(/^\/+/, "");
    const absolutePath = path.join(process.cwd(), "public", relativePath);
    const rootDir = path.join(process.cwd(), "public", "uploads", "managed");
    const normalizedFilePath = path.normalize(absolutePath);
    const normalizedRoot = path.normalize(rootDir + path.sep);

    if (normalizedFilePath.startsWith(normalizedRoot)) {
      try {
        await unlink(normalizedFilePath);
      } catch {
        // ignore missing file
      }
    }
  }

  if (existing?.mobileImageUrl?.startsWith("/uploads/managed/")) {
    const relativePath = existing.mobileImageUrl.replace(/^\/+/, "");
    const absolutePath = path.join(process.cwd(), "public", relativePath);
    const rootDir = path.join(process.cwd(), "public", "uploads", "managed");
    const normalizedFilePath = path.normalize(absolutePath);
    const normalizedRoot = path.normalize(rootDir + path.sep);

    if (normalizedFilePath.startsWith(normalizedRoot)) {
      try {
        await unlink(normalizedFilePath);
      } catch {
        // ignore missing file
      }
    }
  }

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/programs");
  revalidatePath("/admission");
  revalidatePath("/admin/photos");
}

export async function updateManagedImageAction(formData: FormData) {
  const id = String(formData.get("id") || "").trim();
  const sectionRaw = String(formData.get("section") || "").trim();
  const title = String(formData.get("title") || "").trim();
  const subtitle = String(formData.get("subtitle") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const imageUrlInput = String(formData.get("imageUrl") || "").trim();
  const mobileImageUrlInput = String(formData.get("mobileImageUrl") || "").trim();
  const sortOrder = Number(formData.get("sortOrder") || 0);
  const isActive = formData.get("isActive") === "on";
  const imageFile = formData.get("imageFile");
  const mobileImageFile = formData.get("mobileImageFile");

  if (!id || !isValidSection(sectionRaw) || !title) {
    return;
  }

  const existing = await getManagedImageById(id);

  if (!existing) {
    return;
  }

  let nextImageUrl = existing.imageUrl;
  let nextMobileImageUrl = existing.mobileImageUrl;

  if (imageUrlInput) {
    nextImageUrl = imageUrlInput;
  }
  if (mobileImageUrlInput) {
    nextMobileImageUrl = mobileImageUrlInput;
  }

  if (imageFile instanceof File && imageFile.size > 0) {
    if (!imageFile.type.startsWith("image/")) {
      return;
    }

    const maxSizeBytes = 6 * 1024 * 1024;
    if (imageFile.size > maxSizeBytes) {
      return;
    }

    const extension = imageFile.name.includes(".") ? imageFile.name.split(".").pop() : undefined;
    const safeExt = (extension || "jpg").replace(/[^a-zA-Z0-9]/g, "").toLowerCase() || "jpg";
    const fileName = `${randomUUID()}.${safeExt}`;
    const relativeDir = "/uploads/managed";
    const uploadDir = path.join(process.cwd(), "public", relativeDir);

    await mkdir(uploadDir, { recursive: true });
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    await writeFile(path.join(uploadDir, fileName), buffer);
    nextImageUrl = `${relativeDir}/${fileName}`;
  }

  if (mobileImageFile instanceof File && mobileImageFile.size > 0) {
    if (!mobileImageFile.type.startsWith("image/")) {
      return;
    }

    const maxSizeBytes = 6 * 1024 * 1024;
    if (mobileImageFile.size > maxSizeBytes) {
      return;
    }

    const extension = mobileImageFile.name.includes(".") ? mobileImageFile.name.split(".").pop() : undefined;
    const safeExt = (extension || "jpg").replace(/[^a-zA-Z0-9]/g, "").toLowerCase() || "jpg";
    const fileName = `${randomUUID()}.${safeExt}`;
    const relativeDir = "/uploads/managed";
    const uploadDir = path.join(process.cwd(), "public", relativeDir);

    await mkdir(uploadDir, { recursive: true });
    const buffer = Buffer.from(await mobileImageFile.arrayBuffer());
    await writeFile(path.join(uploadDir, fileName), buffer);
    nextMobileImageUrl = `${relativeDir}/${fileName}`;
  }

  if (!nextImageUrl && nextMobileImageUrl) {
    nextImageUrl = nextMobileImageUrl;
  }

  await updateManagedImage(id, {
    section: sectionRaw,
    imageUrl: nextImageUrl || null,
    mobileImageUrl: nextMobileImageUrl,
    title,
    subtitle: subtitle || null,
    description: description || null,
    sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
    isActive
  });

  if (existing.imageUrl && existing.imageUrl !== nextImageUrl && existing.imageUrl.startsWith("/uploads/managed/")) {
    const relativePath = existing.imageUrl.replace(/^\/+/, "");
    const absolutePath = path.join(process.cwd(), "public", relativePath);
    const rootDir = path.join(process.cwd(), "public", "uploads", "managed");
    const normalizedFilePath = path.normalize(absolutePath);
    const normalizedRoot = path.normalize(rootDir + path.sep);

    if (normalizedFilePath.startsWith(normalizedRoot)) {
      try {
        await unlink(normalizedFilePath);
      } catch {
        // ignore missing file
      }
    }
  }

  if (
    existing.mobileImageUrl &&
    existing.mobileImageUrl !== nextMobileImageUrl &&
    existing.mobileImageUrl.startsWith("/uploads/managed/")
  ) {
    const relativePath = existing.mobileImageUrl.replace(/^\/+/, "");
    const absolutePath = path.join(process.cwd(), "public", relativePath);
    const rootDir = path.join(process.cwd(), "public", "uploads", "managed");
    const normalizedFilePath = path.normalize(absolutePath);
    const normalizedRoot = path.normalize(rootDir + path.sep);

    if (normalizedFilePath.startsWith(normalizedRoot)) {
      try {
        await unlink(normalizedFilePath);
      } catch {
        // ignore missing file
      }
    }
  }

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/programs");
  revalidatePath("/admission");
  revalidatePath("/admin/photos");
}
