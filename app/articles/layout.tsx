import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';

/**
 * The article routes previously rendered bare — no header, no footer, no way
 * back to the site except the browser's back button.
 */
export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
