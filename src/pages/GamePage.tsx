import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/useLanguage';
import { FaSteam } from 'react-icons/fa';
import type { Game } from '../types';
import { resolveMedia } from '../utils/media';
import apiClient from '@/api/axios';
import ImageWithFallback from '@/components/figma/ImageWithFallback';

const platformIcons: { [key: string]: React.ElementType } = {
  PC: FaSteam,
};

const GamePage = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchGame = async () => {
      if (!slug) {
        setError(t('gamePage.error.noSlug'));
        setLoading(false);
        return;
      }
      try {
        const response = await apiClient.get<Game>(`/games/${slug}`);
        setGame(response.data);
      } catch (err) {
        setError(t('gamePage.error.fetch') + (err instanceof Error ? err.message : ''));
      } finally {
        setLoading(false);
      }
    };
    fetchGame();
  }, [slug, t]);

  if (loading) {
    return <div className="min-h-screen page-bg text-general py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">{t('gamePage.loading')}</div>;
  }

  if (error) {
    return <div className="min-h-screen page-bg text-general py-12 px-4 sm:px-6 lg:px-8 text-red-500 flex items-center justify-center">Erro: {error}</div>;
  }

  if (!game) {
    return <div className="min-h-screen page-bg text-general py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">{t('gamePage.notFound')}</div>;
  }

  const videoSrc = resolveMedia(game.video);
  const imageSrc = resolveMedia(game.image);

  return (
    <div className="min-h-screen page-bg text-general py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto relative">
        <button
          onClick={() => navigate(-1)}
          className="fixed mt-1 top-16 left-4 z-40 bg-primary hover:bg-primary-dark text-primary-on-color p-3 rounded-full shadow-lg transition-colors flex items-center justify-center"
          aria-label={t('gamePage.back')}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <h1 className="text-4xl font-bold mb-6 text-primary">{game.title}</h1>

        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex gap-3">
              <button
                className={`px-4 py-2 rounded-lg transition-colors ${!showVideo ? 'bg-primary text-primary-on-color' : 'bg-general text-general'}`}
                onClick={() => setShowVideo(false)}
              >
                {t('gamePage.image')}
              </button>
              <button
                className={`px-4 py-2 rounded-lg transition-colors ${showVideo ? 'bg-primary text-primary-on-color' : 'bg-general text-general'}`}
                onClick={() => setShowVideo(true)}
              >
                {t('gamePage.video')}
              </button>
            </div>

            <div className="aspect-video overflow-hidden rounded-lg bg-general shadow-lg">
              {!showVideo ? (
                <ImageWithFallback src={imageSrc} alt={game.title} className="w-full h-full object-cover" />
              ) : videoSrc ? (
                <video ref={videoRef} src={videoSrc} controls autoPlay loop className="w-full h-full object-cover" poster={imageSrc} />
              ) : (
                <ImageWithFallback src={imageSrc} alt={game.title} className="w-full h-full object-cover" />
              )}
            </div>
          </div>

          <div className="bg-general p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-primary">{t('gamePage.developer')}</h3>
            <p className="text-general leading-relaxed">{game.developer}</p>
          </div>

          <div className="bg-general p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-primary">{t('gamePage.genres')}</h3>
            <div className="flex flex-wrap gap-3">
              {game.genre.map((g) => (
                <span
                  key={g}
                  className="header-bg badge-primary-soft text-primary px-4 py-2 rounded-full text-md font-medium"
                >
                  {t(`genres.${g}`) || g}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-general p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-primary">{t('gamePage.aboutGame')}</h3>
            <p className="text-general leading-relaxed">
              {t(game.description || 'gameModal.noDescription')}
            </p>
          </div>

          {game.storeLinks && Object.keys(game.storeLinks).length > 0 && (
            <div className="bg-general p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-primary">{t('gamePage.buy')}</h3>
              <div className="flex flex-wrap gap-4">
                {Object.entries(game.storeLinks).map(([store, link]) => {
                  const Icon = platformIcons[store === 'steam' ? 'PC' : store];
                  return (
                    <a
                      key={store}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary flex items-center gap-2 bg-general-dark px-4 py-2 rounded-lg transition-colors"
                    >
                      {Icon ? <Icon size={24} className="text-general" /> : <span className="text-general font-medium">{store}</span>}
                      <span className="text-general font-medium">{store === 'steam' ? 'Steam' : store}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GamePage;
