import { Menu, X, Gamepad2, Globe, Sun, Moon } from 'lucide-react';
import { FaSteam, FaInstagram, FaGoogleDrive } from 'react-icons/fa';
import { useState } from 'react';
import { useLanguage } from '@/contexts/useLanguage';
import { useSettings } from '@/contexts/SettingsContext';
import { useTheme } from '@/contexts/ThemeContext';
import { resolveMedia } from '@/utils/media'; 
import { usePageContext } from 'vike-react/usePageContext';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, currentLang, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const pageContext = usePageContext();
  const { settings } = useSettings();

  const navigation = [
    { name: t('header.home'), href: '/' },
    { name: t('header.games'), href: '/jogos' },
    { name: t('header.contact'), href: '/contato' },
  ];

  const isActive = (href: string) => pageContext.urlPathname === href;

  const toggleLanguage = () => {
    setLanguage(currentLang === 'pt-BR' ? 'en-US' : 'pt-BR');
  };

  return (
    <header className="header-bg border-b border-slate-800 sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                {/* Logo */}
                <a href="/" className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors" >
                  {settings?.logoUrl ? (
                    <img
                      src={resolveMedia(settings.logoUrl)}
                      alt={settings?.siteName ?? 'IndieVerse'}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <Gamepad2 className="w-8 h-8" />
                  )}
                  <span className="text-xl">{settings?.siteName ?? 'IndieVerse'}</span>
                </a>
    
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`transition-colors ${
                        isActive(item.href)
                          ? 'text-primary'
                          : 'text-general hover:text-primary'
                      }`}
                    >
                      {item.name}
                    </a>
                  ))}

                  {/* Social Icons Desktop */}
                  <a href="https://store.steampowered.com/developer/sensengames" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg hover:bg-general-dark transition-colors text-general hover:text-primary flex items-center" title="Steam" aria-label="Steam">
                    <FaSteam className="w-5 h-5" />
                  </a>
                  <a href="https://drive.google.com/drive/folders/1L_eGgQdwwhAiC6X7qb9LjyxprvuhX3Ma" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg hover:bg-general-dark transition-colors text-general hover:text-primary flex items-center" title="Press Kit" aria-label="Press Kit">
                    <FaGoogleDrive className="w-5 h-5" />
                  </a>
                  <a href="https://instagram.com/sensengames" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg hover:bg-general-dark transition-colors text-general hover:text-primary flex items-center" title="Instagram" aria-label="Instagram">
                    <FaInstagram className="w-5 h-5" />
                  </a>                  
                  
                  {/* Language Toggle */}
                  <button
                    onClick={toggleLanguage}
                    className="hover:cursor-pointer p-1.5 rounded-lg hover:bg-general-dark transition-colors text-general hover:text-primary flex items-center gap-1 text-sm"
                    title={`Switch to ${currentLang === 'pt-BR' ? 'English' : 'Português'}`}
                  >
                    <Globe className="w-4 h-4" />
                    <span>{currentLang === 'pt-BR' ? 'EN' : 'PT'}</span>
                  </button>

                  {/* Theme Toggle */}
                  <button
                    onClick={toggleTheme}
                    className="hover:cursor-pointer p-1.5 rounded-lg hover:bg-general-dark transition-colors text-general hover:text-primary flex items-center"
                    title={theme === 'light' ? t('theme.dark') : t('theme.light')}
                  >
                    {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  </button>
                </div> 
    
                {/* Mobile Menu Button */}
                <button
                  className="md:hidden text-general hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
    
              {/* Mobile Navigation */}
              {mobileMenuOpen && (
                <div className="md:hidden py-4 border-t border-general-dark">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`block py-2 transition-colors ${
                        isActive(item.href)
                          ? 'text-primary'
                          : 'text-general hover:text-primary'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}

                  <hr className="h-1 w-full bg-general border-t border-general-dark" />

                  {/* Social Icons Mobile */}
                  <div className="py-2 border-t border-general-dark">
                    <a href="https://store.steampowered.com/developer/sensengames" target="_blank" rel="noopener noreferrer" className="w-fit flex items-center gap-3 py-1 px-1 rounded-lg hover:bg-general-dark transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      <FaSteam className="w-5 h-5 shrink-0" />
                      <span>Steam</span>
                    </a>
                    <a href="https://drive.google.com/drive/folders/1L_eGgQdwwhAiC6X7qb9LjyxprvuhX3Ma" target="_blank" rel="noopener noreferrer" className="w-fit flex items-center gap-3 py-1 px-1 rounded-lg hover:bg-general-dark transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      <FaGoogleDrive className="w-5 h-5 shrink-0" />
                      <span>Press Kit</span>
                    </a>
                    <a href="https://instagram.com/sensengames" target="_blank" rel="noopener noreferrer" className="w-fit flex items-center gap-3 py-1 px-1 rounded-lg hover:bg-general-dark transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      <FaInstagram className="w-5 h-5 shrink-0" />
                      <span>Instagram</span>
                    </a>
                  </div>
                  
                  <hr className="h-1 w-full bg-general border-t border-general-dark" />
                  
                  {/* Language Toggle Mobile */}
                  <div className="hover:cursor-pointer py-2 border-t border-general-dark">
                    <button
                      onClick={() => {
                        toggleLanguage();
                        setMobileMenuOpen(false);
                      }}
                      className="w-fit p-1 flex items-center gap-2 rounded-lg hover:bg-general-dark transition-colors text-left"
                    >
                      <Globe className="w-5 h-5 text-general" />
                      <span className="text-general">Switch to {currentLang === 'pt-BR' ? 'English' : 'Português'}</span>
                    </button>
                  </div>

                  <hr className="h-1 w-full bg-general border-t border-general-dark" />

                  {/* Theme Toggle Mobile */}
                  <div className="hover:cursor-pointer py-2 border-t border-general-dark">
                    <button
                      onClick={() => {
                        toggleTheme();
                        setMobileMenuOpen(false);
                      }}
                      className="w-fit p-1 flex items-center gap-0.5 rounded-lg hover:bg-general-dark transition-colors text-left"
                    >
                      {theme === 'light' ? <Moon className="w-5 h-5 text-general" /> : <Sun className="w-5 h-5 text-general" />}  
                      <span className="text-general ml-2">{theme === 'light' ? t('theme.dark') : t('theme.light')}</span>
                    </button>
                  </div>
                </div> 
              )}
            </nav>
          </header>
  );
};

export default Header;
