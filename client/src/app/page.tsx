import HeroSection from "@/components/ui/home/herosection";
import Projects from "@/components/ui/home/Projects";
import Thought from "@/components/ui/home/thought";
import Writings from "@/components/ui/home/writings";
import Testimonials from "@/components/ui/home/testimonials";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <Projects />
      <Thought />
      <Writings />
      {/* <Expert /> - Hidden */}
      <Testimonials />
      <Footer />
    </main>
  );
}
