import { useState, useEffect, useCallback, useRef } from "react";
import type { Game } from "@/types";
import { useLanguage } from "@/contexts/useLanguage";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaSteam } from "react-icons/fa";
import { GameModal } from "./GameModal";
import { resolveMedia } from "@/utils/media";

interface HeroCarouselProps {
  games: Game[];
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ games }) => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % games.length);
  }, [games.length]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + games.length) % games.length);
  };

  const handleOpenModal = (game: Game) => {
    setSelectedGame(game);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedGame(null), 300);
  };

  useEffect(() => {
    if (games.length === 0) return;
    const timer = setInterval(goToNext, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, goToNext, games.length]);

  // Play current video, pause others
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [currentIndex, games]);

  if (games.length === 0) return null;
  const current = games[currentIndex];

  const translateValue = Math.min(currentIndex, games.length - 3);

  const getPreviewVideo = (gameId: string | number | undefined) =>
    resolveMedia(`/videos/game${gameId ?? 0}_preview.mp4`);

  return (
    <section className="relative w-full h-[calc(100vh-64px)] flex items-center justify-center transition-all duration-1000 ease-in-out">
      {/* Main Video Background */}
      <video
        src={getPreviewVideo(current.id)}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-general">{current.title}</h1>
        <p className="text-xl text-general-dim mb-8 max-w-2xl mx-auto line-clamp-2">
          {t(current.description ?? '')}
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button 
            onClick={() => handleOpenModal(current)}
            className="btn-steam hover:cursor-pointer text-primary-on-color font-bold py-4 px-10 rounded-lg transition-colors shadow-lg"
          >
            {t('hero.viewMore')}
          </button>
          {current.storeLinks?.steam && (
            <a
              href={current.storeLinks.steam}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary font-bold py-4 px-10 rounded-lg transition-colors shadow-lg flex items-center gap-2"
            >
              <FaSteam size={20} />
              {t('gamesPage.steam')}
            </a>
          )}
        </div>
      </div>

      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-general hover:bg-primary-dark p-3 rounded-full transition-all"
      >
        <ChevronLeft className="w-8 h-8 text-general" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-general hover:bg-primary-dark p-3 rounded-full transition-all"
      >
        <ChevronRight className="w-8 h-8 text-general" />
      </button>

      {/* Thumbnails with static images */}
      <div className="absolute bottom-8 w-full px-4 overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out md:transform-none md:justify-center md:space-x-4 md:items-center"
          style={{
            transform: window.innerWidth < 768 
              ? `translateX(-${translateValue * 33.33}%)` 
              : 'none'
          }}
        >
          {games.map((game, index) => (
            <div
              key={game.id}
              onClick={() => setCurrentIndex(index)}
              className={`relative cursor-pointer transition-all duration-300 overflow-hidden rounded-md shrink-0 
                w-1/3 px-1 md:px-0 h-16 md:h-24 md:w-24
                ${index === currentIndex
                  ? "border-2 border-primary scale-110"
                  : "border-2 border-transparent opacity-60 hover:opacity-100"
                }`}
            >
              <img
                src={resolveMedia(game.image)}
                alt={game.title}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      </div>

      <GameModal 
        game={selectedGame} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </section>
  );
};
