// import { useStore } from "@/contexts/useStore";
import type { Game } from "@/types";
import { resolveMedia } from "@/utils/media";
import { X } from "lucide-react";
import { useRef, useState } from "react";
import ImageWithFallback from "./figma/ImageWithFallback";
import { useLanguage } from "@/contexts/useLanguage";
import { FaSteam } from "react-icons/fa";

/* =======================
   TIPOS
======================= */
type GameModalProps = {
  game: Game | null;
  onClose: () => void;
  isOpen: boolean;
};

/* =======================
   HELPERS
======================= */

// const formatDateBR = (date: string) =>
//   new Date(date).toLocaleDateString("pt-BR");

/* =======================
   COMPONENTE
======================= */

export function GameModal({ game, onClose }: GameModalProps) {
  const { t } = useLanguage();
  // const { addToCart, addToWishlist, isInCart, isInWishlist } = useStore();
  const platformIcons: { [key: string]: React.ElementType } = {
    PC: FaSteam,
  };

  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // use shared resolveMedia util

  if (!game) return null;

  // const handleAddToCart = () => {
  //   addToCart(game);
  // };

  // const handleAddToWishlist = () => {
  //   addToWishlist(game);
  // };

  // const inCart = isInCart(game);
  // const inWishlist = isInWishlist(game);

  const videoSrc = resolveMedia(game.video);
  const imageSrc = resolveMedia(game.image);

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="header-bg shadow-2xl max-w-3xl w-full p-6 rounded-xl relative overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão fechar */}
        <button
          onClick={onClose}
          aria-label={t('common.closeModal')}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X />
        </button>

        {/* Título */}
        <h2 className="text-2xl font-bold mb-4">{game?.title}</h2>

        {/* Media: Image / Video toggle */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <button
                className={`px-3 py-1 rounded ${!showVideo ? 'bg-violet-600 text-white' : 'bg-general text-general'}`}
                onClick={() => setShowVideo(false)}
              >
                {t('gameModal.viewImage')}
              </button>
              <button
                className={`px-3 py-1 rounded ${showVideo ? 'bg-violet-600 text-white' : 'bg-general text-general'}`}
                onClick={() => setShowVideo(true)}
              >
                {t('gameModal.viewVideo')}
              </button>
            </div>

            <div className="aspect-video overflow-hidden rounded-lg bg-general">
              {!showVideo ? (
                <ImageWithFallback src={imageSrc} alt={game.title} className="w-full h-full object-cover" />
              ) : videoSrc ? (
                <video ref={videoRef} src={videoSrc} controls autoPlay loop className="w-full h-full object-cover" poster={imageSrc} />
              ) : (
                <ImageWithFallback src={imageSrc} alt={game.title} className="w-full h-full object-cover" />
              )}
            </div>
          </div>

        {/* =======================
            GÊNEROS
        ======================= */}
        <div className="flex flex-wrap gap-2 mt-2 mb-6">
          {game?.genre.map((genre) => (
            <span
              key={genre}
              className="px-3 py-1 rounded-full text-sm bg-general text-white"
            >
              {t(`genres.${genre}`)}
            </span>
          ))}
        </div>

        {/* =======================
            DESCRIÇÃO
        ======================= */}
        <div className="mb-6 max-w-prose">
          <h3 className="text-lg font-semibold mb-2">{t('gameModal.description')}</h3>
          <p className="text-gray-500 leading-relaxed">
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
  );
}