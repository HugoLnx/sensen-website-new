import type { ReactNode } from 'react';
import { ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-general text-general font-site">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          type="button"
          className="fixed bottom-14 right-2 z-50 bg-primary hover:bg-violet-700 text-white p-3 rounded-full shadow-lg transition-colors flex items-center justify-center"
          aria-label="Voltar ao topo"
        >
          <ArrowUp className="w-6 h-6 hover:cursor-pointer" />
        </button>
      )}
    </div>
  );
}
