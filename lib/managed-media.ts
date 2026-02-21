import { type ManagedImage, type MediaSection } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { clubHighlights, schoolMeta, team } from "@/lib/content";

export type ManagedImageItem = {
  id: string;
  section: MediaSection;
  imageUrl: string;
  desktopImageUrl: string | null;
  mobileImageUrl: string | null;
  title: string;
  subtitle: string | null;
  description: string | null;
  sortOrder: number;
};

function toItem(item: ManagedImage): ManagedImageItem {
  return {
    id: item.id,
    section: item.section,
    imageUrl: item.imageUrl || item.mobileImageUrl || "/legacy-assets/kyanja-hero-image.webp",
    desktopImageUrl: item.imageUrl,
    mobileImageUrl: item.mobileImageUrl,
    title: item.title,
    subtitle: item.subtitle,
    description: item.description,
    sortOrder: item.sortOrder
  };
}

export async function getManagedSection(section: MediaSection): Promise<ManagedImageItem[]> {
  try {
    const rows = await prisma.managedImage.findMany({
      where: { section, isActive: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }]
    });

    return rows.map(toItem);
  } catch {
    // If migration hasn't been run yet, fallback to static content.
    return [];
  }
}

export async function getHomepageManagedContent() {
  const [hero, philosophy, teamItems, clubs, banners] = await Promise.all([
    getManagedSection("HERO"),
    getManagedSection("PHILOSOPHY"),
    getManagedSection("TEAM"),
    getManagedSection("SCHOOL_CLUBS"),
    getManagedSection("ADS_BANNER")
  ]);

  const heroPrimary = hero[0];
  const philosophyPrimary = philosophy[0];
  const bannerPrimary = banners[0];

  return {
    hero: {
      title: heroPrimary?.title || schoolMeta.heroHeadline,
      subtitle: heroPrimary?.description || schoolMeta.heroSubHeadline,
      imageUrl: heroPrimary?.desktopImageUrl || heroPrimary?.mobileImageUrl || "/legacy-assets/kyanja-hero-image.webp",
      mobileImageUrl: heroPrimary?.mobileImageUrl || heroPrimary?.desktopImageUrl || "/legacy-assets/kyanja-hero-image.webp",
      badge: heroPrimary?.subtitle || schoolMeta.name
    },
    philosophyImage: philosophyPrimary?.imageUrl || "/legacy-assets/kyanja-hero-image.webp",
    team:
      teamItems.length > 0
        ? teamItems.map((item) => ({
            name: item.title,
            role: item.subtitle || "Team",
            image: item.imageUrl,
            description: item.description || ""
          }))
        : team.map((member) => ({
            name: member.name,
            role: member.role,
            image: member.image,
            description: ""
          })),
    clubs:
      clubs.length > 0
        ? clubs.map((item) => ({
            title: item.title,
            description: item.description || item.subtitle || "School club activity",
            image: item.imageUrl
          }))
        : clubHighlights,
    bannerImage: bannerPrimary?.imageUrl || "/legacy-assets/admissions-banner.webp"
  };
}
