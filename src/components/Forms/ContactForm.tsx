import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  newsletter: boolean;
}

export function ContactForm() {
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
      <div className="flex flex-col items-center justify-center p-8 bg-slate-800 rounded-lg text-white text-center animate-in fade-in zoom-in duration-300">
        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Mensagem Enviada!</h2>
        <p className="text-gray-300 mb-4">
          Obrigado pelo contato, <span className="text-violet-400 font-semibold">{submittedData.name}</span>!
        </p>
        
        {/* Aqui mostramos o resultado da Newsletter VISUALMENTE */}
        <div className="bg-slate-900/50 p-3 rounded border border-slate-700 text-sm mt-2">
          {submittedData.newsletter ? (
            <span className="text-green-400 flex items-center gap-2 justify-center font-medium">
               ✅ Inscrito na Newsletter com sucesso!
            </span>
          ) : (
            <span className="text-gray-400 flex items-center gap-2 justify-center">
               ❌ Você optou por não receber a Newsletter.
            </span>
          )}
        </div>
        
        {/* Botão para testar novamente */}
        <button 
          onClick={() => setSubmittedData(null)}
          className="mt-6 text-xs text-gray-500 hover:text-white underline cursor-pointer"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="flex flex-col gap-4 p-6 bg-slate-900 rounded-lg max-w-md mx-auto shadow-lg"
    >
      <h2 className="text-2xl font-bold text-white mb-2">Entre em Contato</h2>

      {/* Nome */}
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium text-gray-300">Nome</label>
        <input
          id="name"
          type="text"
          className={`p-3 rounded bg-slate-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
          placeholder="Seu nome"
          {...register("name", { required: true })}
        />
        {errors.name && (
          <span className="text-red-500 text-sm flex items-center gap-1">
            <AlertCircle size={14} /> O nome é obrigatório.
          </span>
        )}
      </div>

      {/* E-mail */}
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium text-gray-300">E-mail</label>
        <input
          id="email"
          type="email"
          className={`p-3 rounded bg-slate-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
          placeholder="seu@email.com"
          {...register("email", { 
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
          })}
        />
        {errors.email && (
          <span className="text-red-500 text-sm flex items-center gap-1">
             <AlertCircle size={14} /> E-mail inválido ou obrigatório.
          </span>
        )}
      </div>

      {/* Mensagem */}
      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-sm font-medium text-gray-300">Mensagem</label>
        <textarea
          id="message"
          rows={4}
          className={`p-3 rounded bg-slate-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all ${errors.message ? 'border-red-500 focus:ring-red-500' : ''}`}
          placeholder="Sua mensagem..."
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className="text-red-500 text-sm flex items-center gap-1">
             <AlertCircle size={14} /> A mensagem é obrigatória.
          </span>
        )}
      </div>

      {/* Newsletter Checkbox */}
      <div className="flex items-start gap-3 mt-2 p-2 rounded hover:bg-slate-800/50 transition-colors">
        <div className="flex items-center h-5">
          <input
            id="newsletter"
            type="checkbox"
            className="w-4 h-4 rounded border-gray-600 bg-slate-700 text-violet-600 focus:ring-violet-500 focus:ring-offset-slate-900 accent-violet-600 cursor-pointer"
            {...register("newsletter")}
          />
        </div>
        <div className="text-sm">
          <label htmlFor="newsletter" className="font-medium text-gray-300 cursor-pointer select-none">
            Inscrever-se na Newsletter
          </label>
          <p className="text-gray-500 text-xs">Receba novidades sobre o projeto.</p>
        </div>
      </div>

      <button 
        type="submit" 
        className="mt-4 bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-4 rounded transition-colors shadow-md hover:shadow-lg cursor-pointer"
      >
        Enviar Mensagem
      </button>
    </form>
  );
}