import React, { useState } from 'react';
import { useLanguage } from '@/contexts/useLanguage';
import type { Game } from '@/types';
import ImageWithFallback from '@/components/figma/ImageWithFallback';
import { resolveMedia } from '@/utils/media';
import { Reveal } from '@/components/Reveal';

interface GameCardProps {
  game: Game;
  variant?: 'simple' | 'detailed';
  onClick?: (game: Game) => void;
  onSteamClick?: (game: Game) => void;
  onPressClick?: (game: Game) => void;
  onTrailerClick?: (game: Game) => void;
  showReveal?: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  variant = 'detailed',
  onClick,
  onSteamClick,
  onPressClick,
  onTrailerClick,
  showReveal = true,
}) => {
  const { t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  const getPreviewVideo = (gameId: string | number) => `/videos/game${gameId}_preview.mp4`;
  const previewVideo = game.id != null ? resolveMedia(getPreviewVideo(game.id)) : undefined;

  const handleContainerClick = () => {
    if (onClick) onClick(game);
  };

  const CardContent = (
    <div
      className={`
        transition-all cursor-pointer group overflow-hidden
        ${variant === 'simple' 
          ? 'glass-effect rounded-xl p-6 hover:border-primary shadow-lg hover:shadow-xl' 
          : 'bg-general border border-general-dark rounded-lg hover:border-primary hover:scale-[1.02] relative'
        }
      `}
      onClick={handleContainerClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`
        overflow-hidden bg-general relative
        ${variant === 'simple' ? 'w-full h-32 md:h-40 bg-primary-soft rounded-lg mb-4' : 'aspect-video'}
      `}>
        <ImageWithFallback
          src={resolveMedia(game.image)}
          alt={game.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${variant === 'detailed' && isHovered ? 'opacity-0' : 'opacity-100'} ${variant === 'simple' ? 'group-hover:scale-105' : ''}`}
        />
        {variant === 'detailed' && isHovered && previewVideo && (
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
      </div>

      <div className={variant === 'detailed' ? 'p-5' : ''}>
        <div className="flex justify-between items-start mb-2">
          <h3 className={`text-xl text-general ${variant === 'detailed' ? 'line-clamp-1' : 'font-bold mb-3'}`}>
            {game.title}
          </h3>
        </div>

        <p className={`text-general-dim mb-4 line-clamp-2 ${variant === 'detailed' ? 'text-sm' : ''}`}>
          {t(game.description || (variant === 'detailed' ? 'gameModal.noDescription' : ''))}
        </p>

        {variant === 'detailed' && (
          <>
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

            <div className="flex justify-between gap-2 items-center">
              <button
                className="btn-primary px-4 py-2 rounded text-sm transition-colors hover:cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onSteamClick) onSteamClick(game);
                }}
              >
                {t('gamesPage.steam')}
              </button>
              <button
                className="btn-steam px-4 py-2 rounded text-sm transition-colors hover:cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onPressClick) onPressClick(game);
                }}
              >
                {t('gamesPage.press')}
              </button>
              <button
                className="btn-steam px-4 py-2 rounded text-sm transition-colors hover:cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onTrailerClick) onTrailerClick(game);
                }}
              >
                {t('gamesPage.viewTrailler')}
              </button>
            </div>
          </>
        )}

        {variant === 'simple' && game.storeLinks?.steam && (
          <button
            className="btn-primary w-full text-center py-2 px-4 text-sm block rounded hover:cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              if (onSteamClick) onSteamClick(game);
            }}
          >
            {t('gamesPage.steam')}
          </button>
        )}
      </div>
    </div>
  );

  if (showReveal) {
    return <Reveal key={game.id || game.title}>{CardContent}</Reveal>;
  }

  return CardContent;
};
