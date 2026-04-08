import React, { createContext, useState, type ReactNode } from 'react';
import { detectLanguage } from '@/utils/detectLanguage';
import ptBR from '../i18n/translations/pt-BR.json' with { type: 'json' };
import enUS from '../i18n/translations/en-US.json' with { type: 'json' };

interface LanguageContextType {
  currentLang: 'pt-BR' | 'en-US';
  setLanguage: (lang: 'pt-BR' | 'en-US') => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLang, setCurrentLang] = useState<'pt-BR' | 'en-US'>(() => {
    return detectLanguage();
  });

  const setLanguage = (lang: 'pt-BR' | 'en-US') => {
    setCurrentLang(lang);
    localStorage.setItem('preferredLanguage', lang);
  };

  const t = (key: string): string => {
    const translations = currentLang === 'pt-BR' ? ptBR : enUS as Record<string, any>;
    const keys = key.split('.');
    let value = translations;
    for (const k of keys) {
      value = (value as any)[k];
      if (value === undefined || value === null) return key;
    }
    return String(value);
  };

  return (
    <LanguageContext.Provider value={{ currentLang, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};


