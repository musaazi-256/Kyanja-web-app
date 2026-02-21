import { HomeContent } from "@/components/home/home-content";
import { getHomepageManagedContent } from "@/lib/managed-media";

export default async function HomePage() {
  const managed = await getHomepageManagedContent();
  return <HomeContent managed={managed} />;
}
