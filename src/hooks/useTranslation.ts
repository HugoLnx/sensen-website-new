import { useLanguage } from '@/contexts/useLanguage';

export const useTranslation = () => {
  const { t } = useLanguage();
  return { t };
};

