import type { ReactNode } from 'react';
import { ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { usePageContext } from 'vike-react/usePageContext';
import { useLanguage } from '@/contexts/useLanguage';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const pageContext = usePageContext();
  const { currentLang, t } = useLanguage();

  // Sync Metadata on Client-side Navigation
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Obtém a chave da página atual
    const ogSiteNameKey = pageContext.config.ogSiteName || 'header.home';
    const pageName = t(ogSiteNameKey);
    const ogSiteName = pageName ? `Sensen Games: ${pageName}` : 'Sensen Games';

    const rawTitle = pageContext.config.titleKey || (typeof pageContext.config.title === 'string' ? pageContext.config.title : 'Sensen Games');
    const rawDescription = pageContext.config.descriptionKey || (typeof pageContext.config.description === 'string' ? pageContext.config.description : '');

    const translatedTitle = t(rawTitle);
    const title = (translatedTitle === 'Sensen Games' || translatedTitle.includes('| Sensen Games')) 
      ? translatedTitle 
      : `${translatedTitle} | Sensen Games`;

    const description = t(rawDescription);
    const currentUrl = window.location.href;

    // Update Browser Title
    document.title = title;

    // Update Meta Tags manually
    const updateMeta = (property: string, content: string, isName = false) => {
      const attr = isName ? 'name' : 'property';
      let el = document.querySelector(`meta[${attr}="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content || '');
    };

    updateMeta('description', description, true);
    updateMeta('og:site_name', ogSiteName);
    updateMeta('og:title', title);
    updateMeta('og:description', description);
    updateMeta('og:url', currentUrl);
    updateMeta('twitter:title', title, true);
    updateMeta('twitter:description', description, true);
    updateMeta('twitter:url', currentUrl, true);

    // Update Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

  }, [pageContext.urlPathname, pageContext.title, pageContext.description, pageContext.config.ogSiteName, pageContext.config.title, pageContext.config.description, currentLang, t, pageContext.config.titleKey, pageContext.config.descriptionKey]);

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
