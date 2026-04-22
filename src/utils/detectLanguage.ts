export const detectLanguage = (): 'pt-BR' | 'en-US' => {
  // Check if we are running in the browser
  if (typeof window === 'undefined') {
    return 'pt-BR'; // Default for SSR
  }

  // Check localStorage first
  const savedLang = localStorage.getItem('preferredLanguage') as 'pt-BR' | 'en-US' | null;
  if (savedLang) return savedLang;

  // Browser preference
  const browserLang = navigator.language || (navigator.languages && navigator.languages[0]) || 'pt-BR';
  
  if (browserLang.toLowerCase().startsWith('pt')) {
    return 'pt-BR';
  }
  return 'en-US';
};

