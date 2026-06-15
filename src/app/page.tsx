import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden">
      <Navbar />
      
      <div className="w-full relative z-10">
        <HeroSection />
        
        {/* Subtle dividers between sections */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent max-w-5xl mx-auto"></div>
        
        <AboutSection />
        <SkillsSection />
        
        <div className="w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent max-w-5xl mx-auto my-12"></div>
        
        <ExperienceTimeline />
        <ProjectsSection />
        
        <div className="w-full h-px bg-gradient-to-r from-transparent via-glow/30 to-transparent max-w-5xl mx-auto my-12"></div>
        
        <ContactSection />
      </div>

      <Footer />
    </main>
  );
}
