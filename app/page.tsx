import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyLoveIt from "@/components/WhyLoveIt";
import FeaturedPerfumes from "@/components/FeaturedPerfumes";
import SocialProof from "@/components/SocialProof";
import LuxuryExperience from "@/components/LuxuryExperience";
import Scarcity from "@/components/Scarcity";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import StickyMobileCTA from "@/components/StickyMobileCTA";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <WhyLoveIt />
      <FeaturedPerfumes />
      <SocialProof />
      <LuxuryExperience />
      <Scarcity />
      <FAQ />
      <FinalCTA />
      <FloatingWhatsApp />
      <StickyMobileCTA />
    </main>
  );
}
