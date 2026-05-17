import { useLanguage } from "@/contexts/useLanguage";
import { FaSteam, FaGoogleDrive, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';
import { ContactForm } from '@/components/Forms/ContactForm'; 
import BlueskyIcon from "@/components/ui/BlueskyIcon";
import ThreadsIcon from "@/components/ui/ThreadsIcon";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SocialLink } from "@/components/ui/SocialLink";

export default function Page() {
  const { t } = useLanguage();
  return (
    <PageContainer maxWidth="6xl">
      <SectionHeader 
        title={t('contact.title')}
        subtitle={t('contact.subtitle')}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col h-full space-y-6">
          <div className="glass-effect rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl mb-6 text-primary font-semibold">{t('contact.infoTitle')}</h2>
            <div className="space-y-5">
              <SocialLink 
                icon={FaSteam} 
                label={t('contact.socials.steam.label')} 
                url={t('contact.socials.steam.url')} 
              />
              <SocialLink 
                icon={FaInstagram} 
                label={t('contact.socials.instagram.label')} 
                url={t('contact.socials.instagram.url')} 
              />
              <SocialLink 
                icon={ThreadsIcon} 
                label={t('contact.socials.threads.label')} 
                url={t('contact.socials.threads.url')} 
              />
              <SocialLink 
                icon={BlueskyIcon} 
                label={t('contact.socials.bluesky.label')} 
                url={t('contact.socials.bluesky.url')} 
              />
              <SocialLink 
                icon={FaTwitter} 
                label={t('contact.socials.twitter.label')} 
                url={t('contact.socials.twitter.url')} 
              />
              <SocialLink 
                icon={FaFacebook} 
                label={t('contact.socials.facebook.label')} 
                url={t('contact.socials.facebook.url')} 
              />
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
    </PageContainer>
  );
}

