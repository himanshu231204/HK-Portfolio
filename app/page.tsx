import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Contributions from '@/components/sections/Contributions';
import Skills from '@/components/sections/Skills';
import GitHubStats from '@/components/sections/GitHubStats';
import About from '@/components/sections/About';
import Articles from '@/components/sections/Articles';
import FeaturedPosts from '@/components/sections/FeaturedPosts';
import Education from '@/components/sections/Education';
import Certifications from '@/components/sections/Certifications';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import AIChat from '@/components/AIChat';

/**
 * Section order leads with evidence — what was built and merged — before the
 * biographical material. The numbering in each section header follows this
 * order and is the page's spine.
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen">
        <Hero />
        <Projects />
        <Contributions />
        <Skills />
        <GitHubStats />
        <About />
        <Articles />
        <FeaturedPosts />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <AIChat />
    </>
  );
}
