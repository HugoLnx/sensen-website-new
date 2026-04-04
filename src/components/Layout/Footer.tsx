import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom'; // Importante para SEO e navegação interna
import { FaTwitter, FaFacebook, FaInstagram, FaSteam, FaYoutube, FaWhatsapp, FaArrowRight } from 'react-icons/fa';
import { Mail, CheckCircle } from 'lucide-react'; // Ícones consistentes com o seu projeto
import BlueskyIcon from '../ui/BlueskyIcon';
import { settingsMock } from '@/mocks/settingsMock';

// Interface simplificada apenas para Email
interface IFooterNewsletter {
  email: string;
}

const socialIconMap: { [key: string]: React.ElementType } = {
  FaTwitter, FaFacebook, FaInstagram, FaSteam, FaYoutube, FaWhatsapp, BlueskyIcon
};

const Footer = () => {
  // --- Lógica do MailingListForm adaptada (apenas email) ---
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<IFooterNewsletter>();

  const onSubmit: SubmitHandler<IFooterNewsletter> = (data) => {
    console.log('Newsletter Footer (Email only):', data);
    // Simula delay de API igual ao componente original
    setTimeout(() => setIsSubmitted(true), 500);
  };

  // Links sociais (mantendo sua lógica de fallback)
  const linksToRender = settingsMock.socialLinks;

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900 pt-12 pb-6">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* === 1. COLUNA: MARCA & LINKS DE NAVEGAÇÃO (SEO) === */}
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-violet-400 flex items-center gap-2">
                <span className="bg-violet-600/20 p-1 rounded">SG</span> Sensen Games
              </h3>
              <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
                Criando mundos imersivos e experiências inesquecíveis. Conecte-se com a gente.
              </p>
            </div>

            {/* Links de Navegação - Essencial para SEO */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Explorar</h4>
              <nav>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/" className="hover:text-violet-400 transition-colors">Início</Link></li>
                  <li><Link to="catalogo" className="hover:text-violet-400 transition-colors">Catálogo</Link></li>
                  <li><Link to="/contato" className="hover:text-violet-400 transition-colors">Contato</Link></li>
                </ul>
              </nav>
            </div>
          </div>

          {/* === 2. COLUNA: NEWSLETTER (DESTAQUE) === */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 md:p-8">
              {!isSubmitted ? (
                <>
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="w-5 h-5 text-violet-400" />
                    <h3 className="text-xl font-bold text-white">Fique atualizado</h3>
                  </div>
                  <p className="text-slate-400 mb-6 text-sm">
                    Novidades de Games toda semana. Sem spam, apenas conteúdo épico.
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <input
                        type="email"
                        placeholder="seu@email.com"
                        {...register('email', { 
                          required: true, 
                          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i 
                        })}
                        className={`w-full bg-slate-950 border ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-slate-800 focus:border-violet-500'} text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-all`}
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="bg-violet-600 hover:bg-violet-700 text-white font-medium px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 group whitespace-nowrap"
                    >
                      Inscrever <FaArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                  {errors.email && <span className="text-red-500 text-xs mt-2 block">Digite um e-mail válido.</span>}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-4 animate-in fade-in">
                  <CheckCircle className="w-12 h-12 text-green-500 mb-3" />
                  <h3 className="text-lg font-bold text-white">Inscrição Confirmada!</h3>
                  <p className="text-slate-400 text-sm">Obrigado por se juntar a nós.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* === 3. RODAPÉ INFERIOR === */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500 text-center md:text-left">
            &copy; {new Date().getFullYear()} Sensen Games. Todos os direitos reservados.
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
                  className="text-slate-500 hover:text-violet-400 hover:scale-110 transition-all"
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