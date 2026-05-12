import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/useLanguage';
import { Tag } from 'lucide-react';
import { GameModal } from '@/components/GameModal';
import type { Game } from '@/types';
import { useSettings } from '@/contexts/SettingsContext';
import apiClient from '@/api/axios';
import { PageContainer } from '@/components/ui/PageContainer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GameCard } from '@/components/GameCard';

export default function Page() {
  const { t } = useLanguage();
  const [gamesData, setGamesData] = useState<Game[]>([]);
  const [gamesLoading, setGamesLoading] = useState(true);
  const [gamesError, setGamesError] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('Todos');

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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedGame(null);
    }, 300);
  };

  if (settingsLoading || gamesLoading) {
    return <PageContainer><div className="text-center">{t('gamesPage.loading')}</div></PageContainer>;
  }

  if (settingsError || gamesError) {
    return <PageContainer><div className="text-red-500 text-center">Erro: {settingsError || gamesError}</div></PageContainer>;
  }

  return (
    <PageContainer>
      <SectionHeader 
        title={t('gamesPage.title')}
        subtitle={t('gamesPage.subtitle')}
      />

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
              className={`px-4 py-2 rounded-lg transition-colors hover:cursor-pointer ${selectedGenre === genre
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
        {filteredGames.map((game) => (
          <GameCard
            key={game.id ?? game.title}
            game={game}
            variant="detailed"
            onClick={handleGameClick}
            onSteamClick={handleGameClick}
            onPressClick={handlePressClick}
            onTrailerClick={handleTraillerClick}
            showReveal={false}
          />
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="text-center py-12">
          <p className="text-general text-xl">
            {t('gamesPage.noGames')}
          </p>
        </div>
      )}

      <GameModal
        game={selectedGame}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </PageContainer>
  );
}

