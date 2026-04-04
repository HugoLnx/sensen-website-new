import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';

interface IFormInput {
  name: string;
  email: string;
}

const MailingListForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log('Inscrição Newsletter:', data);
    // Simula delay de API
    setTimeout(() => setIsSubmitted(true), 500);
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-900/20 border border-green-800 rounded-lg p-6 text-center animate-in fade-in zoom-in duration-300">
        <div className="flex items-center justify-center gap-2 text-green-400 mb-2">
          <CheckCircle className="w-6 h-6" />
          <h3 className="text-lg font-bold">Inscrito!</h3>
        </div>
        <p className="text-slate-400 text-sm">
          Obrigado. Você receberá novidades em breve.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-violet-600/20 rounded-lg">
          <Mail className="w-5 h-5 text-violet-400" />
        </div>
        <div>
          <h3 className="text-slate-100 font-bold">Newsletter</h3>
          <p className="text-xs text-slate-400">Receba novidades e promoções.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Input Nome */}
        <div>
          <input
            type="text"
            placeholder="Seu nome"
            {...register('name', { required: true })}
            className={`w-full bg-slate-950 border rounded-md px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 transition-all ${
              errors.name
                ? 'border-red-500/50 focus:border-red-500'
                : 'border-slate-800 focus:border-violet-500'
            }`}
          />
        </div>

        {/* Input Email */}
        <div>
          <input
            type="email"
            placeholder="seu@email.com"
            {...register('email', {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
            className={`w-full bg-slate-950 border rounded-md px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 transition-all ${
              errors.email
                ? 'border-red-500/50 focus:border-red-500'
                : 'border-slate-800 focus:border-violet-500'
            }`}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium text-sm py-2.5 rounded-md transition-colors flex items-center justify-center gap-2 group"
        >
          Inscrever-se
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </div>
  );
};

export default MailingListForm;