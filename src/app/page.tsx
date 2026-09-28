import Nav from "@/components/site/Nav";
import Grain from "@/components/site/Grain";
import Hero from "@/components/site/Hero";
import Marquee from "@/components/site/Marquee";
import Stats from "@/components/site/Stats";
import TextGallery from "@/components/site/TextGallery";
import MotionGallery from "@/components/site/MotionGallery";
import SurfaceGallery from "@/components/site/SurfaceGallery";
import Backdrops from "@/components/site/Backdrops";
import Footer from "@/components/site/Footer";

export default function Page() {
  return (
    <main className="relative">
      <Grain />
      <Nav />
      <Hero />
      <Marquee />
      <Stats />
      <TextGallery />
      <MotionGallery />
      <SurfaceGallery />
      <Backdrops />
      <Footer />
    </main>
  );
}
