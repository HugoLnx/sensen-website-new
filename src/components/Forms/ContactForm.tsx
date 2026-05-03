import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useLanguage } from '@/contexts/useLanguage';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  newsletter: boolean;
}

export function ContactForm() {
  const { t } = useLanguage();
  // MUDANÇA 1: Agora guardamos os DADOS do formulário (objeto ou nulo)
  const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<ContactFormData>();

  const onSubmit: SubmitHandler<ContactFormData> = (data) => {
    console.log('Dados enviados:', data);
    // MUDANÇA 2: Salvamos os dados preenchidos para poder mostrar na tela
    setSubmittedData(data);
  };

  // MUDANÇA 3: A tela de sucesso agora usa os dados salvos para te dar feedback
  if (submittedData) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-general-dark-i rounded-lg text-general text-center animate-in fade-in zoom-in duration-300">
        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
<h2 className="text-2xl font-bold mb-2">{t('contact.successTitle')}</h2>
        <p className="text-general mb-4">
          {t('contact.successMessage')} <span className="text-primary font-semibold">{submittedData.name}</span>!
        </p>
        
        {/* Aqui mostramos o resultado da Newsletter VISUALMENTE */}
        <div className="bg-general p-3 rounded border border-general-dark text-sm mt-2">
          {submittedData.newsletter ? (
          <span className="text-green-400 flex items-center gap-2 justify-center font-medium">
             {t('contact.newsletterSubscribed')}
           </span>
          ) : (
            <span className="text-general-dim flex items-center gap-2 justify-center">
               {t('contact.newsletterNotSubscribed')}
            </span>
          )}
        </div>
        
        {/* Botão para testar novamente */}
        <button 
          onClick={() => setSubmittedData(null)}
          className="mt-6 text-xs text-general-dim hover:text-general underline cursor-pointer"
        >
          {t('contact.sendAnother')}
        </button>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="flex flex-col gap-4 p-6 bg-general border border-general-dark rounded-lg max-w-md mx-auto shadow-lg"
    >

      {/* Nome */}
      <div className="flex flex-col gap-1">
<label htmlFor="name" className="text-sm font-medium text-general">{t('contact.name')}</label>
        <input
          id="name"
          type="text"
          className={`p-3 rounded bg-general-dark-i text-general border border-general-dark focus:outline-none focus:ring-2 focus:ring-primary transition-all ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
          placeholder={t('contact.name')}
          {...register("name", { required: true })}
        />
        {errors.name && (
        <span className="text-red-500 text-sm flex items-center gap-1">
            <AlertCircle size={14} /> {t('contact.nameRequired')}
          </span>
        )}
      </div>

      {/* E-mail */}
      <div className="flex flex-col gap-1">
<label htmlFor="email" className="text-sm font-medium text-general">{t('contact.email')}</label>
        <input
          id="email"
          type="email"
          className={`p-3 rounded bg-general-dark-i text-general border border-general-dark focus:outline-none focus:ring-2 focus:ring-primary transition-all ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
          placeholder={t('contact.email')}
          {...register("email", { 
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
          })}
        />
        {errors.email && (
          <span className="text-red-500 text-sm flex items-center gap-1">
             <AlertCircle size={14} /> {t('contact.emailRequired')}
          </span>
        )}
      </div>

      {/* Mensagem */}
      <div className="flex flex-col gap-1">
<label htmlFor="message" className="text-sm font-medium text-general">{t('contact.message')}</label>
        <textarea
          id="message"
          rows={4}
          className={`p-3 rounded bg-general-dark-i text-general border border-general-dark focus:outline-none focus:ring-2 focus:ring-primary transition-all ${errors.message ? 'border-red-500 focus:ring-red-500' : ''}`}
          placeholder={t('contact.message')}
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className="text-red-500 text-sm flex items-center gap-1">
             <AlertCircle size={14} /> {t('contact.messageRequired')}
          </span>
        )}
      </div>

      {/* Newsletter Checkbox */}
      <div className="flex items-start gap-3 mt-2 p-2 rounded hover:bg-general-dark-i/50 transition-colors">
        <div className="flex items-center h-5">
          <input
            id="newsletter"
            type="checkbox"
            className="w-4 h-4 rounded border-general-dark bg-general-dark-i text-primary focus:ring-primary focus:ring-offset-slate-900 accent-primary cursor-pointer"
            {...register("newsletter")}
          />
        </div>
        <div className="text-sm">
<label htmlFor="newsletter" className="font-medium text-general cursor-pointer select-none">
            {t('contact.newsletter')}
          </label>
<p className="text-general-dim text-xs">{t('contact.newsletterDesc')}</p>
        </div>
      </div>

<button 
        type="submit" 
        className="mt-4 bg-primary hover:bg-violet-700 text-white font-bold py-3 px-4 rounded transition-colors shadow-md hover:shadow-lg cursor-pointer"
      >
        {t('contact.submit')}
      </button>
    </form>
  );
}