import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebook, FaInstagram, FaSteam, FaYoutube, FaWhatsapp, FaArrowRight } from 'react-icons/fa';
import { Mail, CheckCircle } from 'lucide-react';
import BlueskyIcon from '../ui/BlueskyIcon';
import { settingsMock } from '@/mocks/settingsMock';
import { useLanguage } from '@/contexts/useLanguage';

interface IFooterNewsletter {
  email: string;
}

const socialIconMap: { [key: string]: React.ElementType } = {
  FaTwitter, FaFacebook, FaInstagram, FaSteam, FaYoutube, FaWhatsapp, BlueskyIcon
};

const Footer = () => {
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<IFooterNewsletter>();

  const onSubmit: SubmitHandler<IFooterNewsletter> = (data) => {
    console.log('Newsletter Footer (Email only):', data);
    setTimeout(() => setIsSubmitted(true), 500);
  };

  const linksToRender = settingsMock.socialLinks;

  return (
    <footer className="footer-bg text-general border-t border-general-dark pt-12 pb-6">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-primary flex items-center gap-2">
                <span className="bg-primary-soft p-1 rounded">SG</span> {t('footer.sensenGames')}
              </h3>
              <p className="text-sm text-general-dim max-w-xs leading-relaxed">
                {t('footer.tagline')}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-general font-semibold text-sm uppercase tracking-wider">{t('footer.explore')}</h4>
              <nav>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/" className="hover:text-primary transition-colors">{t('header.home')}</Link></li>
                  <li><Link to="catalogo" className="hover:text-primary transition-colors">{t('header.catalog')}</Link></li>
                  <li><Link to="/contato" className="hover:text-primary transition-colors">{t('header.contact')}</Link></li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-general border border-general-dark rounded-xl p-6 md:p-8">
              {!isSubmitted ? (
                <>
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-bold text-general">{t('footer.newsletter.title')}</h3>
                  </div>
                  <p className="text-general-dim mb-6 text-sm">
                    {t('footer.newsletter.description')}
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <input
                        type="email"
                        placeholder={t('footer.newsletter.placeholder')}
                        {...register('email', { 
                          required: true, 
                          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i 
                        })}
                        className={`w-full bg-general border ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-general-dark focus:border-primary'} text-general rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-all`}
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="bg-primary hover:bg-primary-dark text-primary-on-color font-medium px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 group whitespace-nowrap"
                    >
                      {t('footer.newsletter.button')} <FaArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                  {errors.email && <span className="text-red-500 text-xs mt-2 block">{t('common.emailError')}</span>}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-4 animate-in fade-in">
                  <CheckCircle className="w-12 h-12 text-green-500 mb-3" />
                  <h3 className="text-lg font-bold text-general">{t('footer.newsletter.successTitle')}</h3>
                  <p className="text-general-dim text-sm">{t('footer.newsletter.successMessage')}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-general-dark pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-general-dim text-center md:text-left">
            &copy; {new Date().getFullYear()} {t('footer.copyright')}
          </p>
          
          <div className="flex gap-6">
            {linksToRender.map((link, index) => {
              const Icon = socialIconMap[link.icon || ''] || FaFacebook;
              return (
                <a 
                  key={index} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-general-dim hover:text-primary hover:scale-110 transition-all"
                  aria-label={link.name}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
