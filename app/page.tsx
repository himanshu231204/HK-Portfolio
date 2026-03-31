import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import GitHubStats from '@/components/sections/GitHubStats';
import Education from '@/components/sections/Education';
import Certifications from '@/components/sections/Certifications';
import Articles from '@/components/sections/Articles';
import FeaturedPosts from '@/components/sections/FeaturedPosts';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <GitHubStats />
      <Education />
      <Certifications />
      <Articles />
      <FeaturedPosts />
      <Contact />
      <Footer />
    </main>
  );
}
