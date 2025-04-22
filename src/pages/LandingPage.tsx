import Header from "../components/layout/Header.tsx";
import Hero from "../components/layout/Hero.tsx";
import About from "../components/layout/About.tsx";
import Testimonials from "../components/layout/Testimonials.tsx";

function LandingPage() {
  return (
    <div className="w-full h-screen ">
      <Header />
      <Hero />
      <About />
      <Testimonials />
    </div>
  );
}

export default LandingPage;
