import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Gamepad2, Globe } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/contexts/useLanguage';
// import { useStore } from '@/contexts/useStore';
import { useSettings } from '@/contexts/SettingsContext';
import { resolveMedia } from '@/utils/media';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, currentLang, setLanguage } = useLanguage();
  const location = useLocation();
  // const { getCartCount, wishlist } = useStore();
  const { settings } = useSettings();

  const navigation = [
    { name: t('header.home'), href: '/' },
    { name: t('header.games'), href: '/jogos' },
    { name: t('header.contact'), href: '/contato' },
  ];

  const isActive = (href: string) => location.pathname === href;

  const toggleLanguage = () => {
    setLanguage(currentLang === 'pt-BR' ? 'en-US' : 'pt-BR');
  };

  // const cartCount = getCartCount();
  // const wishlistCount = wishlist.length;


  return (
    <header className="header-bg border-b border-slate-800 sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors" >
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
                          ? 'text-primary'
                          : 'text-general hover:text-primary'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  {/* Language Toggle */}
                  <button
                    onClick={toggleLanguage}
                    className="hover:cursor-pointer p-1.5 rounded-lg hover:bg-general-dark transition-colors text-general hover:text-primary flex items-center gap-1 text-sm"
                    title={`Switch to ${currentLang === 'pt-BR' ? 'English' : 'Português'}`}
                  >
                    <Globe className="w-4 h-4" />
                    <span>{currentLang === 'pt-BR' ? 'EN' : 'PT'}</span>
                  </button>
                  
                   {/* Wishlist Icon */}
              {/* <Link
                to="/lista-desejos"
                className="relative text-general hover:text-violet-400 transition-colors"
                title="Lista de Desejos"
              >
                <Heart className={`w-6 h-6 ${isActive('/lista-desejos') ? 'text-violet-400 fill-current' : ''}`} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-violet-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {wishlistCount}
                    </span>
                  )}
                </Link> */}

                {/* Cart Icon */}
                {/* <Link
                  to="/carrinho"
                  className="relative text-general hover:text-violet-400 transition-colors"
                  title="Carrinho"
                >
                  <ShoppingCart className={`w-6 h-6 ${isActive('/carrinho') ? 'text-violet-400' : ''}`} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-violet-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link> */}
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
                  
                  {/* Language Toggle Mobile */}
                  <div className="hover:cursor-pointer py-2 border-t border-slate-700">
                    <button
                      onClick={() => {
                        toggleLanguage();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-general-dark transition-colors text-left"
                    >
                      <Globe className="w-5 h-5" />
                      <span>Switch to {currentLang === 'pt-BR' ? 'English' : 'Português'}</span>
                    </button>
                  </div>
                  
                  {/* Mobile Wishlist Link */}
                  {/* <Link
                    to="/lista-desejos"
                    className={`flex items-center gap-2 py-2 transition-colors ${
                      isActive('/lista-desejos')
                        ? 'text-violet-400'
                        : 'text-general hover:text-violet-400'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Heart className="w-5 h-5" />
                    Lista de Desejos
                    {wishlistCount > 0 && (
                      <span className="bg-violet-600 text-white text-xs px-2 py-0.5 rounded-full">
                        {wishlistCount}
                      </span>
                    )}
                  </Link> */}

                  {/* Mobile Cart Link */}
                  {/* <Link
                    to="/carrinho"
                    className={`flex items-center gap-2 py-2 transition-colors ${
                      isActive('/carrinho')
                        ? 'text-violet-400'
                        : 'text-general hover:text-violet-400'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Carrinho
                    {cartCount > 0 && (
                      <span className="bg-violet-600 text-white text-xs px-2 py-0.5 rounded-full">
                        {cartCount}
                      </span>
                    )}
                  </Link> */}
                </div>
              )}
            </nav>
          </header>
  );
};

export default Header;