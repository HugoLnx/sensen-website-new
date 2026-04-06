import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/useLanguage';

interface IFormInput {
  name: string;
  email: string;
}

const MailingListForm = () => {
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log('Inscrição Newsletter:', data);
    setTimeout(() => setIsSubmitted(true), 500);
  };

  if (isSubmitted) {
    return (
      <div className="bg-primary-soft border border-primary-soft rounded-lg p-6 text-center animate-in fade-in zoom-in duration-300">
        <div className="flex items-center justify-center gap-2 text-primary mb-2">
          <CheckCircle className="w-6 h-6" />
          <h3 className="text-lg font-bold">{t('footer.newsletter.successTitle')}</h3>
        </div>
        <p className="text-general-dim text-sm">
          {t('footer.newsletter.successMessage')}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-general border border-general-dark rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary-soft rounded-lg">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-general font-bold">{t('footer.newsletter.title')}</h3>
            <p className="text-general-dim text-xs">{t('footer.newsletter.description')}</p>
          </div>
        </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <input
            type="text"
            placeholder={t('footer.newsletter.placeholder')}
            {...register('name', { required: true })}
            className={`w-full bg-general border rounded-md px-3 py-2 text-sm text-general placeholder-general-dim focus:outline-none focus:ring-1 transition-all ${
              errors.name
                ? 'border-red-500/50 focus:border-red-500'
                : 'border-general-dark focus:border-primary'
            }`}
          />
        </div>

        <div>
          <input
            type="email"
            placeholder={t('footer.newsletter.placeholder')}
            {...register('email', {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
            className={`w-full bg-general border rounded-md px-3 py-2 text-sm text-general placeholder-general-dim focus:outline-none focus:ring-1 transition-all ${
              errors.email
                ? 'border-red-500/50 focus:border-red-500'
                : 'border-general-dark focus:border-primary'
            }`}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary-dark text-primary-on-color font-medium text-sm py-2.5 rounded-md transition-colors flex items-center justify-center gap-2 group"
        >
          {t('footer.newsletter.button')}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </div>
  );
};

export default MailingListForm;
