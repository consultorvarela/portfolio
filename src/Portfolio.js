import React from 'react';
import { useTheme } from './ThemeContext';
import CustomCursor from './CustomCursor';
import SEO from './components/common/SEO';
import Navbar from './components/navigation/Navbar';
import HeroSection from './sections/HeroSection';
import MarqueeSection from './sections/MarqueeSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
// import CertificationsSection from './sections/CertificationsSection'; // Commented out
import ExperienceSection from './sections/ExperienceSection';
// import ServicesSection from './sections/ServicesSection'; // Commented out
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';
import { useActiveSection } from './hooks/useActiveSection';
import { useSmoothScroll } from './hooks/useSmoothScroll';

const Portfolio = () => {
  const { isDark } = useTheme();
  const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
  const activeSection = useActiveSection(sections);
  const scrollToSection = useSmoothScroll();

  return (
    <>
      <SEO />
      <CustomCursor />
      <div className={`min-h-screen font-sans selection:bg-emerald-400 selection:text-white transition-colors duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-slate-900'}`}>
        <Navbar 
          activeSection={activeSection} 
          scrollToSection={scrollToSection} 
        />
        <HeroSection scrollToSection={scrollToSection} />
        <MarqueeSection />
        <AboutSection />
        <SkillsSection />
        {/* <CertificationsSection /> */}
        <ExperienceSection />
        {/* <ServicesSection /> */}
        <ProjectsSection />
        <ContactSection />
        <Footer />

        {/* Estilos CSS */}
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 20s linear infinite;
          }
          .animate-bounce-slow {
            animation: bounce 3s infinite;
          }
          .animate-spin-slow {
            animation: spin 12s linear infinite;
          }
        `}</style>
      </div>
    </>
  );
};

export default Portfolio;