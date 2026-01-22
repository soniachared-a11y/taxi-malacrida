import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ServicesIntroSection from '@/components/ServicesIntroSection';
import ServicesCarouselSection from '@/components/ServicesCarouselSection';
import ProcessSection from '@/components/ProcessSection';
import VehicleCarousel from '@/components/VehicleCarousel';
import TrustTestimonialsSection from '@/components/TrustTestimonialsSection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import FloatingPhoneButton from '@/components/FloatingPhoneButton';

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ServicesIntroSection />
      <ServicesCarouselSection />
      <ProcessSection />
      <VehicleCarousel />
      <TrustTestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <FloatingPhoneButton />
    </main>
  );
};

export default Index;
