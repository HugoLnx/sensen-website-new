import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Gamepad2 } from 'lucide-react'; // Import ArrowUp
import { useState } from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import { resolveMedia } from '@/utils/media';


const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { settings } = useSettings();

  const navigation = [
    { name: 'Início', href: '/' },
    { name: 'Catálogo', href: '/catalogo' },
    { name: 'Contato', href: '/contato' },
  ];

  const isActive = (href: string) => location.pathname === href;
  return (
    <header className="header-bg border-b border-slate-800 sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors">
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
                </Link>
    
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`transition-colors ${
                        isActive(item.href)
                          ? 'text-violet-400'
                          : 'text-general hover:text-violet-400'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
    
                {/* Mobile Menu Button */}
                <button
                  className="md:hidden text-general hover:text-violet-400 transition-colors"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
    
              {/* Mobile Navigation */}
              {mobileMenuOpen && (
                <div className="md:hidden py-4 border-t border-slate-800">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`block py-2 transition-colors ${
                        isActive(item.href)
                          ? 'text-violet-400'
                          : 'text-general hover:text-violet-400'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </nav>
          </header>
  );
};

export default Header;