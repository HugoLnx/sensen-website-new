import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/useLanguage';
import { Star, Tag } from 'lucide-react';
import { GameModal } from '../components/GameModal';
import type { Game } from '../types';
import { useSettings } from '../contexts/SettingsContext';
import apiClient from '../api/axios';
import ImageWithFallback from '@/components/figma/ImageWithFallback';
import { resolveMedia } from '@/utils/media';

const CatalogPage = () => {
  const { t } = useLanguage();
  const [gamesData, setGamesData] = useState<Game[]>([]);
  const [gamesLoading, setGamesLoading] = useState(true);
  const [gamesError, setGamesError] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('Todos');
  const [hoveredGameId, setHoveredGameId] = useState<string | number | null>(null);

  const { loading: settingsLoading, error: settingsError } = useSettings();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await apiClient.get<Game[]>('/games');
        setGamesData(response.data);
      } catch (err) {
        setGamesError('Failed to fetch games from API.');
        console.error('Error fetching games:', err);
      } finally {
        setGamesLoading(false);
      }
    };
    fetchGames();
  }, []);

  const allGenres = ['Todos', ...new Set(gamesData.flatMap(game => game.genre))];

  const filteredGames = selectedGenre === 'Todos'
    ? gamesData
    : gamesData.filter(game => game.genre.includes(selectedGenre));

  const handleGameClick = (game: Game) => {
    if (game.storeLinks?.steam) {
      window.open(game.storeLinks.steam, '_blank');
    } else {
      setSelectedGame(game);
      setIsModalOpen(true);
    }
  };
  const handlePressClick = (game: Game) => {
    if (game.storeLinks?.press) {
      window.open(game.storeLinks.press, '_blank');
    } else {
      setSelectedGame(game);
      setIsModalOpen(true);
    }
  };

  const handleTraillerClick = (game: Game) => {
    setSelectedGame(game);
    setIsModalOpen(true);
  };

  const handleMouseEnter = (gameId: string | number) => {
    setHoveredGameId(gameId);
  };

  const handleMouseLeave = () => {
    setHoveredGameId(null);
  };

  const getPreviewVideo = (gameId: string | number) => `/videos/game${gameId}_preview.mp4`;

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedGame(null);
    }, 300);
  };

  if (settingsLoading || gamesLoading) {
    return <div className="min-h-screen page-bg text-general flex items-center justify-center"><div className="text-center">{t('gamesPage.loading')}</div></div>;
  }

  if (settingsError || gamesError) {
    return <div className="min-h-screen page-bg text-general text-red-500 flex items-center justify-center">Erro: {settingsError || gamesError}</div>;
  }

  return (
    <div className="min-h-screen page-bg text-general py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4 text-primary">{t('gamesPage.title')}</h1>
          <p className="text-xl text-general max-w-2xl mx-auto">
            {t('gamesPage.subtitle')}
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-5 h-5 text-primary" />
            <span className="text-general">{t('gamesPage.filterPrefix')}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {allGenres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-lg transition-colors ${selectedGenre === genre
                  ? 'bg-primary text-primary-on-color'
                  : 'bg-general text-general hover:bg-primary-soft'
                  }`}
              >
                {genre === 'Todos' ? t('gamesPage.all') : t(`genres.${genre}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => {
            const isHovered = hoveredGameId === game.id;
            const previewVideo = game.id != null ? resolveMedia(getPreviewVideo(game.id)) : undefined;
            return (
              <div
                key={game.id ?? game.title}
                className="bg-general border border-general-dark rounded-lg overflow-hidden hover:border-primary transition-all hover:scale-[1.02] cursor-pointer group relative"
                onClick={() => handleGameClick(game)}
                onMouseEnter={() => game.id != null && handleMouseEnter(game.id)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="aspect-video overflow-hidden bg-general relative">
                  <ImageWithFallback
                    src={resolveMedia(game.image)}
                    alt={game.title}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
                  />
                  {isHovered && previewVideo && (
                      <video
                      src={previewVideo}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    >
                      {t('common.browserNoVideoSupport') || 'Your browser does not support video.'}
                    </video>
                  )}
                  {/* {isHovered && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className="w-16 h-16 text-primary-on-color opacity-10" />
                    </div>
                  )} */}
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl text-general line-clamp-1">{game.title}</h3>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm">{game.rating}</span>
                    </div>
                  </div>

                  <p className="text-sm text-general-dim mb-3 line-clamp-2">{game.developer}</p>

                  <p className="text-general-dim text-sm mb-4 line-clamp-2">
                    {t(game.description || 'gameModal.noDescription')}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {game.genre.slice(0, 5).map((g) => (
                      <span
                        key={g}
                        className="text-xs bg-primary-soft text-primary px-2 py-1 rounded font-medium"
                      >
                        {t(`genres.${g}`)}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      className="btn-primary px-4 py-2 rounded text-sm transition-colors hover:cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGameClick(game);
                      }}
                    >
                      {t('gamesPage.steam')}
                    </button>
                    <button
                      className="btn-steam px-4 py-2 rounded text-sm transition-colors hover:cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePressClick(game);
                      }}
                    >
                      {t('gamesPage.press')}
                    </button>
                    <button
                      className="btn-steam px-4 py-2 rounded text-sm transition-colors hover:cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTraillerClick(game);
                      }}
                    >
                      {t('gamesPage.viewTrailler')}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <p className="text-general text-xl">
              {t('gamesPage.noGames')}
            </p>
          </div>
        )}
      </div>

      <GameModal
        game={selectedGame}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default CatalogPage;
