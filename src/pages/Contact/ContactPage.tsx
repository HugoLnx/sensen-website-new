import { Mail, Phone, MapPin } from 'lucide-react';
import {ContactForm} from '../../components/Forms/ContactForm';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4 text-violet-300 font-bold">Entre em Contato</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Tem dúvidas ou sugestões? Adoraríamos ouvir você!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
              <h2 className="text-2xl mb-6 text-violet-300 font-semibold">Informações de Contato</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-violet-600/20 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-slate-100 font-medium mb-1">Email</h3>
                    <p className="text-slate-400">contato@sensengames.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-violet-600/20 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-slate-100 font-medium mb-1">Telefone</h3>
                    <p className="text-slate-400">(11) 9999-9999</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-violet-600/20 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-slate-100 font-medium mb-1">Endereço</h3>
                    <p className="text-slate-400">Av. Paulista, 1000</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
              <h2 className="text-2xl mb-4 text-violet-300 font-semibold">Horário de Atendimento</h2>
              <div className="space-y-3 text-slate-300">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span>Segunda - Sexta</span>
                  <span className="text-slate-400">9h - 18h</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábado e Domingo</span>
                  <span className="text-slate-400">Fechado</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 h-fit">
            <h2 className="text-2xl mb-6 text-violet-300 font-semibold">Envie uma Mensagem</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;