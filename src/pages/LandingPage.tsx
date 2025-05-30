import Header from "../components/layout/Landing Page/Header.tsx";
import Hero from "../components/layout/Landing Page/Hero.tsx";
import About from "../components/layout/Landing Page/About.tsx";
import Testimonials from "../components/layout/Landing Page/Testimonials.tsx";
import CTABanner from "../components/layout/Landing Page/CTABanner.tsx";
import Footer from "../components/layout/Landing Page/Footer.tsx";

function LandingPage() {
  return (
    <div className="w-full h-screen ">
      <Header />
      <Hero />
      <About />
      <Testimonials />
      <CTABanner />
      <Footer />
    </div>
  );
}

export default LandingPage;
