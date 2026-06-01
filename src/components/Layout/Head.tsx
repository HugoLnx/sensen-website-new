import { usePageContext } from 'vike-react/usePageContext';
import ptBR from '../../i18n/translations/pt-BR.json' with { type: 'json' };
import enUS from '../../i18n/translations/en-US.json' with { type: 'json' };
import { detectLanguage } from '@/utils/detectLanguage';

export function Head() {
  const pageContext = usePageContext();
  
  const baseUrl = 'https://sensengames.com';
  const siteUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  
  // URL reativa baseada no pathname atual
  const currentUrl = `${siteUrl}${pageContext.urlPathname}`;

  const lang = detectLanguage();
  const translations = lang === 'pt-BR' ? ptBR : (enUS as Record<string, unknown>);

  // Função simples para buscar tradução aninhada (ex: "header.home")
  const getTranslation = (key: string) => {
    if (!key) return '';
    const keys = key.split('.');
    let value: unknown = translations;
    for (const k of keys) {
      if (value && typeof value === 'object' && k in (value as Record<string, unknown>)) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    return typeof value === 'string' ? value : key;
  };

  // Obtém a chave de tradução da configuração da página ATUAL ou usa o padrão
  const ogSiteNameKey = pageContext.config.ogSiteName || 'header.home';
  const pageName = getTranslation(ogSiteNameKey);
  const ogSiteName = pageName ? `Sensen Games: ${pageName}` : 'Sensen Games';
  
  const socialImage = `${siteUrl}/img/social_thumb.jpg`;

  // Título e Descrição avaliados pelo vike-react (usando as chaves customizadas se os nativos forem keys)
  const rawTitle = pageContext.config.titleKey || (typeof pageContext.config.title === 'string' ? pageContext.config.title : 'Sensen Games');
  const rawDescription = pageContext.config.descriptionKey || (typeof pageContext.config.description === 'string' ? pageContext.config.description : '');

  const translatedTitle = getTranslation(rawTitle);
  const title = (translatedTitle === 'Sensen Games' || translatedTitle.includes('| Sensen Games')) 
    ? translatedTitle 
    : `${translatedTitle} | Sensen Games`;

  const description = getTranslation(rawDescription);

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/images/icon.png" />
      
      {/* Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Space+Mono:wght@400;700&display=swap"
        rel="stylesheet"
      />

      {/* Cor da UI do Navegador */}
      <meta name="theme-color" content="#FF6700" />
      
      {/* SEO Base Adicional */}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook / LinkedIn / Bluesky */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={socialImage} />
      <meta property="og:site_name" content={ogSiteName} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={socialImage} />
    </>
  );
}
