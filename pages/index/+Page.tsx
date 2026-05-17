import { HeroCarousel } from "@/components/HeroCarousel";
import { StreamerCarousel } from "@/components/StreamerCarousel";
import { Reveal } from "@/components/Reveal";
import { VideoPlayer } from "@/components/VideoPlayer";
import { useLanguage } from "@/contexts/useLanguage";
import { gamesMock } from "@/mocks/gameMock";
import { streamerMock } from "@/mocks/streamerMock";
import { GameCard } from "@/components/GameCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

const MOCK_GAMES = gamesMock
const MOCK_STREAMERS = streamerMock

export default function Page() {
  const { t } = useLanguage();
  const aboutParagraphs = t('home.homepageAboutUsText');

  return (
    <>
      <main className="page-bg">
        {/* Hero Video Background Section */}
        <section className="relative w-full h-screen border-b-2 mb-2 border-primary overflow-hidden md:flex-row gap-6 items-center">
          <VideoPlayer 
            url="/videos/compiled_edit.mp4" //inserir-url-do-video-aqui 
            fallbackSrc="/videos/game1_preview.mp4"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          
          {/* Overlay Gradient Filter */}
          <div className="absolute inset-0 bg-linear-to-b from-black/40 to-black/80 z-10"></div>
          
          {/* Content Overlay */}
          <div className="absolute inset-0 w-full flex flex-col justify-center z-20 text-center mb-8">
            <Reveal>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary bg-black/60 px-6 py-3 rounded-2xl inline-block [text-shadow:2px_2px_4px_rgba(0,0,0,0.8)] backdrop-blur-sm mb-6 leading-tight shadow-2xl">
                {t('home.gamesVideo.title')}
              </h2>
            </Reveal>
            {/* Future CTA */}
            <Reveal>
              <p className="text-xl md:text-2xl text-primary bg-black/50 px-4 py-2 rounded-xl inline-block [text-shadow:1px_1px_3px_rgba(0,0,0,0.9)] backdrop-blur flex-1 shadow-xl">
                {t('home.about.ctaDescription')}
              </p>
            </Reveal>
          </div>
        </section>

        <HeroCarousel games={MOCK_GAMES} />

        <StreamerCarousel videos={MOCK_STREAMERS} />

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader title={t('home.featuredGames.title')} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {MOCK_GAMES.filter(game => Boolean(game.isFeatured)).map((game) => (
                <GameCard 
                  key={game.id} 
                  game={game} 
                  variant="simple" 
                  onSteamClick={(g) => g.storeLinks?.steam && window.open(g.storeLinks.steam, '_blank')}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-general">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <SectionHeader title={t('home.about.title')} />

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


