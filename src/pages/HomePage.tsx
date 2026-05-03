import { Sparkles, Users, Trophy, Link } from "lucide-react";
import { HeroCarousel } from "../components/HeroCarousel";
import { Reveal } from "../components/Reveal";
import { useLanguage } from "@/contexts/useLanguage";
import { gamesMock } from "@/mocks/gameMock";

const MOCK_GAMES = gamesMock

export const HomePage: React.FC = () => {

  const { t } = useLanguage();

  const aboutParagraphs = t('home.homepageAboutUsText');

  return (
    <>
      <main className="page-bg">

        <HeroCarousel games={MOCK_GAMES} />

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-3xl text-center mb-12 text-primary">
                {t('home.whyChoose')}
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Reveal>
                <div className="bg-general border border-general-dark rounded-lg p-6 hover:border-primary transition-colors">
                  <div className="w-12 h-12 bg-primary-soft rounded-lg flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
<h3 className="text-xl mb-3 text-general">{t('home.features.curation.title')}</h3>
                  <p className="text-general">{t('home.features.curation.description')}</p>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-general border border-general-dark rounded-lg p-6 hover:border-primary transition-colors">
                  <div className="w-12 h-12 bg-primary-soft rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl mb-3 text-general">{t('home.features.community.title')}</h3>
                  <p className="text-general">{t('home.features.community.description')}</p>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-general border border-general-dark rounded-lg p-6 hover:border-primary transition-colors">
                  <div className="w-12 h-12 bg-primary-soft rounded-lg flex items-center justify-center mb-4">
                    <Trophy className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl mb-3 text-general">{t('home.features.support.title')}</h3>
                  <p className="text-general">{t('home.features.support.description')}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="py-16 bg-general">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-3xl mb-8 text-primary">
                {t('home.about.title')}
              </h2>
            </Reveal>

            <div className="flex flex-col gap-4 text-general leading-relaxed">
              
                <Reveal >
                  <p>{aboutParagraphs}</p>
                </Reveal>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-3xl mb-8 text-primary">{t('home.about.ctaTitle')}</h2>
              <p className="text-xl mb-8 text-general">{t('home.about.ctaDescription')}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link className="btn-primary px-8 py-3 rounded-lg transition-colors" to="/jogos">
                  {t('home.about.games')}
                </Link>
                <Link className="bg-general-dark hover:bg-primary-dark text-general px-8 py-3 rounded-lg transition-colors border border-general-dark" to="/contato">
                  {t('home.about.contact')}
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
};

