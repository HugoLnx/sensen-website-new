import { useLanguage } from "@/contexts/useLanguage";
import { Globe } from 'lucide-react';
import { FaSteam, FaGoogleDrive, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';
import {ContactForm} from '../../components/Forms/ContactForm'; 
import BlueskyIcon from "@/components/ui/BlueskyIcon";

const ContactPage = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4 text-primary font-bold">{t('contact.title')}</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
              <h2 className="text-2xl mb-6 text-primary font-semibold">{t('contact.infoTitle')}</h2>
              <div className="space-y-4.75">
                {/* Steam */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
                    <FaSteam className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <a href={t('contact.socials.steam.url')} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors underline decoration-slate-600 underline-offset-2">
                      <h3 className="text-slate-100 font-medium mb-1">{t('contact.socials.steam.label')}</h3>
                    </a>
                  </div>
                </div>
                {/* Press Kit */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
                    <FaGoogleDrive className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <a href={t('contact.socials.press.url')} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors underline decoration-slate-600 underline-offset-2">
                      <h3 className="text-slate-100 font-medium mb-1">{t('contact.socials.press.label')}</h3>
                    </a>
                  </div>
                </div>
                {/* Instagram */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
                    <FaInstagram className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <a href={t('contact.socials.instagram.url')} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors underline decoration-slate-600 underline-offset-2">
                      <h3 className="text-slate-100 font-medium mb-1">{t('contact.socials.instagram.label')}</h3>
                    </a>
                  </div>
                </div>
                {/* Threads */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <a href={t('contact.socials.threads.url')} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors underline decoration-slate-600 underline-offset-2">
                      <h3 className="text-slate-100 font-medium mb-1">{t('contact.socials.threads.label')}</h3>                      
                    </a>
                  </div>
                </div>
                {/* Bluesky */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
                    <BlueskyIcon size={20} className="text-primary" />
                  </div>
                  <div>
                    <a href={t('contact.socials.bluesky.url')} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors underline decoration-slate-600 underline-offset-2">
                      <h3 className="text-slate-100 font-medium mb-1">{t('contact.socials.bluesky.label')}</h3>
                    </a>
                  </div>
                </div>
                {/* Twitter */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
                    <FaTwitter className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <a href={t('contact.socials.twitter.url')} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors underline decoration-slate-600 underline-offset-2">
                      <h3 className="text-slate-100 font-medium mb-1">{t('contact.socials.twitter.label')}</h3>
                    </a>
                  </div>
                </div>
                {/* Facebook */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
                    <FaFacebook className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <a href={t('contact.socials.facebook.url')} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors underline decoration-slate-600 underline-offset-2">
                      <h3 className="text-slate-100 font-medium mb-1">{t('contact.socials.facebook.label')}</h3>
                    </a>
                  </div>
                </div>
              </div> 
            </div>
            
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
              <h2 className="text-2xl mb-4 text-primary font-semibold">{t('contact.schedule.title')}</h2>
              <div className="space-y-3 text-slate-300">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span>{t('contact.schedule.weekdays')}</span>
                  <span className="text-slate-400">{t('contact.schedule.hours')}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('contact.schedule.weekend')}</span>
                  <span className="text-slate-400">{t('contact.schedule.closed')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 h-fit">
            <h2 className="text-2xl mb-6 text-primary font-semibold">{t('contact.sendMessage')}</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;