import { HeroCarousel } from "@/components/HeroCarousel";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/contexts/useLanguage";
import { gamesMock } from "@/mocks/gameMock";

const MOCK_GAMES = gamesMock

export default function Page() {
  const { t } = useLanguage();
  const aboutParagraphs = t('home.homepageAboutUsText');

  return (
    <>
      <main className="page-bg">
        <section className="w-full">
          <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6 py-6">
            <Reveal>
              <h2 className="text-3xl md:text-4xl text-center mb-8 text-primary">
                {t('home.gamesVideo.title')}
              </h2>
            </Reveal>
            <div className="relative w-full h-[50vh] md:h-[70vh] border-2 border-primary rounded-xl overflow-hidden shadow-2xl">
              <video 
                src="/videos/game1_preview.mp4" 
                autoPlay 
                muted 
                loop 
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
          </div>
        </section>

        <HeroCarousel games={MOCK_GAMES} />

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-3xl text-center mb-12 text-primary">
                {t('home.featuredGames.title')}
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {MOCK_GAMES.filter(game => Boolean(game.isFeatured)).map((game) => (
                <Reveal key={game.id}>
                  <div className="bg-general border border-general-dark rounded-xl p-6 hover:border-primary hover:shadow-xl transition-all group cursor-pointer overflow-hidden">
                    <div className="w-full h-32 md:h-40 bg-primary-soft rounded-lg mb-4 overflow-hidden group-hover:scale-105 transition-transform">
                      <img 
                        src={game.image || ''} 
                        alt={game.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl mb-3 text-general font-bold">{game.title}</h3>
                    <p className="text-general-dim mb-4 line-clamp-2">{t(game.description || '')}</p>   
                    {game.storeLinks?.steam && (
                      <a 
                        href={game.storeLinks.steam} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-primary w-full text-center py-2 px-4 text-sm block rounded"
                      >
                        {t('gamesPage.steam')}
                      </a>
                    )}
                  </div>
                </Reveal>
              ))}
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
                <a className="btn-primary px-8 py-3 rounded-lg transition-colors text-center" href="/jogos">
                  {t('home.about.games')}
                </a>
                <a className="bg-general-dark hover:bg-primary-dark text-general px-8 py-3 rounded-lg transition-colors border border-general-dark text-center" href="/contato">
                  {t('home.about.contact')}
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
