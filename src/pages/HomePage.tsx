import { Sparkles, Users, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { HeroCarousel } from "../components/HeroCarousel";
import { Reveal } from "../components/Reveal";
import { useSettings } from "@/contexts/SettingsContext";
import { gamesMock } from "@/mocks/gameMock";

// Dados mockados para o carrossel
const MOCK_GAMES = gamesMock

export const HomePage: React.FC = () => {

  const { settings } = useSettings();

  const fallbackAboutUsText = [
    "Fundada por entusiastas de jogos indie, a Sensen Games nasceu da paixão por descobrir e compartilhar experiências de jogo únicas e inovadoras. Acreditamos que os melhores jogos nem sempre vêm dos grandes estúdios, mas sim de desenvolvedores independentes com visões criativas e ousadas.",
    "Nossa missão é criar uma ponte entre desenvolvedores talentosos e jogadores que buscam algo além do convencional. Cada jogo em nosso catálogo é escolhido com cuidado, garantindo que você encontre experiências memoráveis e envolventes.",
    "Junte-se a nós nessa jornada de descoberta e apoio à cena indie de jogos!",
  ];

  const aboutParagraphs = settings?.homepageAboutUsText
    ? settings.homepageAboutUsText.split("\n\n")
    : fallbackAboutUsText;

  return (
    <>
      <main className="bg-[#020617]">

        <HeroCarousel games={MOCK_GAMES} />

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-3xl text-center mb-12 text-violet-300">
                {settings?.homepageFeaturedSectionTitle || "Por que escolher a Sensen Games?"}
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Reveal>
                <div className="bg-general border border-slate-800 rounded-lg p-6 hover:border-violet-600 transition-colors">
                  <div className="w-12 h-12 bg-violet-600/20 rounded-lg flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-violet-400" />
                  </div>
                  <h3 className="text-xl mb-3 text-general">Curadoria Especializada</h3>
                  <p className="text-general">Selecionamos cada jogo para garantir qualidade e originalidade.</p>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-general border border-slate-800 rounded-lg p-6 hover:border-violet-600 transition-colors">
                  <div className="w-12 h-12 bg-violet-600/20 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-violet-400" />
                  </div>
                  <h3 className="text-xl mb-3 text-general">Comunidade Ativa</h3>
                  <p className="text-general">Faça parte de uma comunidade apaixonada por jogos indie.</p>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-general border border-slate-800 rounded-lg p-6 hover:border-violet-600 transition-colors">
                  <div className="w-12 h-12 bg-violet-600/20 rounded-lg flex items-center justify-center mb-4">
                    <Trophy className="w-6 h-6 text-violet-400" />
                  </div>
                  <h3 className="text-xl mb-3 text-general">Apoio aos Desenvolvedores</h3>
                  <p className="text-general">Comprando aqui, você apoia diretamente os criadores independentes.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="py-16 bg-general">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-3xl mb-8 text-violet-300">
                {settings?.homepageAboutUsTitle || "Sobre a Sensen Games"}
              </h2>
            </Reveal>

            <div className="flex flex-col gap-4 text-general leading-relaxed">
              {aboutParagraphs.map((text: string, index: number) => (
                <Reveal key={index}>
                  <p>{text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-3xl mb-8 text-violet-300">Pronto para Começar?</h2>
              <p className="text-xl mb-8 text-general">Explore nosso catálogo e encontre seu próximo jogo favorito.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link className="btn-primary btn-primary:hover px-8 py-3 rounded-lg transition-colors" to="/catalogo">
                  Ver Catálogo
                </Link>
                <Link className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-lg transition-colors border border-slate-700" to="/contato">
                  Fale Conosco
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
};