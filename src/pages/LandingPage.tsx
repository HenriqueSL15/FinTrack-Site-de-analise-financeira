import Header from "../components/layout/Header.tsx";
import Hero from "../components/layout/Hero.tsx";
import About from "../components/layout/About.tsx";
import Testimonials from "../components/layout/Testimonials.tsx";
import CTABanner from "../components/layout/CTABanner.tsx";
import Footer from "../components/layout/Footer.tsx";

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
