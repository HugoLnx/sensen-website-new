import { useLanguage } from "@/contexts/useLanguage";
import { FaSteam, FaGoogleDrive, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';
import { ContactForm } from '@/components/Forms/ContactForm'; 
import BlueskyIcon from "@/components/ui/BlueskyIcon";
import ThreadsIcon from "@/components/ui/ThreadsIcon";

export default function Page() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen page-bg text-general py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4 text-primary font-bold">{t('contact.title')}</h1>
          <p className="text-xl text-general-dim max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col h-full space-y-6">
            <div className="glass-effect rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl mb-6 text-primary font-semibold">{t('contact.infoTitle')}</h2>
              <div className="space-y-5">
                {/* Steam */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-soft rounded-lg flex items-center justify-center shrink-0">
                    <FaSteam className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <a href={t('contact.socials.steam.url')} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors underline decoration-slate-600 underline-offset-2">
                      <h3 className="text-general font-medium mb-1">{t('contact.socials.steam.label')}</h3>
                    </a>
                  </div>
                </div>
                {/* Instagram */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-soft rounded-lg flex items-center justify-center shrink-0">
                    <FaInstagram className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <a href={t('contact.socials.instagram.url')} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors underline decoration-slate-600 underline-offset-2">
                      <h3 className="text-general font-medium mb-1">{t('contact.socials.instagram.label')}</h3>
                    </a>
                  </div>
                </div>
                {/* Threads */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-soft rounded-lg flex items-center justify-center shrink-0">
                    <ThreadsIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <a href={t('contact.socials.threads.url')} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors underline decoration-slate-600 underline-offset-2">
                      <h3 className="text-general font-medium mb-1">{t('contact.socials.threads.label')}</h3>                      
                    </a>
                  </div>
                </div>
                {/* Bluesky */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-soft rounded-lg flex items-center justify-center shrink-0">
                    <BlueskyIcon size={20} className="text-primary" />
                  </div>
                  <div>
                    <a href={t('contact.socials.bluesky.url')} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors underline decoration-slate-600 underline-offset-2">
                      <h3 className="text-general font-medium mb-1">{t('contact.socials.bluesky.label')}</h3>
                    </a>
                  </div>
                </div>
                {/* Twitter */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-soft rounded-lg flex items-center justify-center shrink-0">
                    <FaTwitter className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <a href={t('contact.socials.twitter.url')} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors underline decoration-slate-600 underline-offset-2">
                      <h3 className="text-general font-medium mb-1">{t('contact.socials.twitter.label')}</h3>
                    </a>
                  </div>
                </div>
                {/* Facebook */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-soft rounded-lg flex items-center justify-center shrink-0">
                    <FaFacebook className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <a href={t('contact.socials.facebook.url')} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors underline decoration-slate-600 underline-offset-2">
                      <h3 className="text-general font-medium mb-1">{t('contact.socials.facebook.label')}</h3>
                    </a>
                  </div>
                </div>
              </div> 
            </div>
            
            <div className="glass-effect flex-1 flex flex-col rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl mb-4 text-primary font-semibold">{t('contact.socials.pressKit.title')}</h2>
              <p className="text-general-dim mb-6">{t('contact.socials.pressKit.description')}</p>
              <a href={t('contact.socials.press.url')} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center mt-1 bg-primary hover:brightness-110 text-white font-bold py-3 px-4 rounded transition-all shadow-md hover:shadow-lg cursor-pointer transform active:scale-95">
                <FaGoogleDrive className="mr-2 w-5 h-5" /> {t('contact.socials.pressKit.button')}
              </a>
            </div>              
          </div>

          <div className="glass-effect rounded-lg p-6 h-full shadow-lg">
            <h2 className="text-2xl mb-6 text-primary font-semibold">{t('contact.sendMessage')}</h2>
            <ContactForm />
          </div>
        </div>

      </div>
    </div>
  );
}
