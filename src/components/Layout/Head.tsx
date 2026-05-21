import { usePageContext } from 'vike-react/usePageContext';

export function Head() {
  const pageContext = usePageContext();
  
  const baseUrl = 'https://sensengames.com';
  const siteUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const currentUrl = `${siteUrl}${pageContext.urlPathname}`;

  // Título e descrição já são tratados pelo vike-react via +config.ts
  // Mas podemos injetar as tags que faltam (OG, Twitter, Fonts) aqui.
  
  const socialImage = `${siteUrl}/img/social_thumb.jpg`;

  return (
    <>
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
      <meta property="og:image" content={socialImage} />
      <meta property="og:site_name" content={`{Sensen Games: `} /> {/* TODO: Tornar esta tag mais flexível */}

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:image" content={socialImage} />
    </>
  );
}
