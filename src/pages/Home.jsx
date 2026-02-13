import Hero from "../components/home/Hero";
import Identity from "../components/home/Identity";
import EducationPhilosophy from "../components/home/EducationPhilosophy";
import StrategicAnchors from "../components/home/AdvertismentBanner";
import HolisticActivities from "../components/home/HolisticActivities";
import AdminTeam from "../components/home/AdminTeam";
import CoreValues from "../components/home/CoreValues";
import SchoolClubs from "../components/home/SchoolClubs";
import Resources from "../components/home/Resources";
import AdvertismentBanner from "../components/home/AdvertismentBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <Identity />
      <EducationPhilosophy />
      <AdvertismentBanner />

      <HolisticActivities />
      <SchoolClubs />
      <AdminTeam />
      <CoreValues />

      <Resources />
    </>
  );
}
