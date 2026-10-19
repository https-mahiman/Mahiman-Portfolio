import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollAnimations from "@/components/ScrollAnimations";
import { Analytics } from "@vercel/analytics/next";

export default function HomePage() {
  return (
    <>
      <ScrollAnimations />
      <Analytics />

      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Mahiman Bhatt",
              alternateName: "Mahiman",
              url: "https://mahiman-portfolio.vercel.app/",
            }),
          }}
        />
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
