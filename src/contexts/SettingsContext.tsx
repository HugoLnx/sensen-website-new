import React, { createContext, useState, useEffect, useContext, type ReactNode } from 'react';
import apiClient from '../api/axios';
import { useTheme } from './ThemeContext';

interface SiteSettings {
  siteName: string;
  logoUrl: string;
  iconUrl: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  generalTextColor: string;
  pageBackgroundColor: string;
  generalBackgroundColor: string;
  headerBackgroundColor: string;
  footerBackgroundColor: string;
  homepageTitle: string;
  gamesPageTitle: string;
  homepageFeaturedSectionTitle: string;
  homepageFeaturedSectionImageUrl: string;
  homepageAboutUsTitle: string;
  homepageAboutUsText: string;
  homepageHeroImageUrl: string;
  aboutUsImageUrl: string;
  featuredSectionImageUrl: string;
  homepageMailingListTitle: string;
  mailingListImageUrl: string;
  socialLinks: SocialLink[];
  _id?: string;
}

interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

interface SettingsContextType {
  settings: SiteSettings | null;
  loading: boolean;
  error: string | null;
  refetchSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchTrigger, setFetchTrigger] = useState<number>(0);
  const { theme } = useTheme();

  const refetchSettings = () => {
    setFetchTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get<SiteSettings>('/settings');
        setSettings(response.data);
      } catch (err) {
        setError('Failed to load site settings.');
        console.error('Error fetching site settings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, [fetchTrigger]);

  useEffect(() => {
    if (settings) {
      const root = document.documentElement;
      root.style.setProperty('--primary-color', settings.primaryColor);
      root.style.setProperty('--font-family', settings.fontFamily);

      if (theme === 'dark') {
        // Apply custom colors from settings only in dark mode
        root.style.setProperty('--secondary-color', settings.secondaryColor);
        root.style.setProperty('--general-text-color', settings.generalTextColor);
        root.style.setProperty('--page-background-color', settings.pageBackgroundColor);
        root.style.setProperty('--general-background-color', settings.generalBackgroundColor);
        root.style.setProperty('--header-background-color', settings.headerBackgroundColor);
        root.style.setProperty('--footer-background-color', settings.footerBackgroundColor);
      } else {
        // Clear style overrides in light mode to let CSS variables from .light take over
        root.style.removeProperty('--secondary-color');
        root.style.removeProperty('--general-text-color');
        root.style.removeProperty('--page-background-color');
        root.style.removeProperty('--general-background-color');
        root.style.removeProperty('--header-background-color');
        root.style.removeProperty('--footer-background-color');
      }
    }
  }, [settings, theme]);

  const value = {
    settings,
    loading,
    error,
    refetchSettings,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
