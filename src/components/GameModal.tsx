import type { Game } from "@/types";
import { resolveMedia } from "@/utils/media";
import { Star, Calendar, Users, ShoppingCart, X } from "lucide-react";
import { useRef, useState } from "react";
import ImageWithFallback from "./figma/ImageWithFallback";
import { FaSteam } from "react-icons/fa";

const platformIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  PC: FaSteam,
};

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

  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // use shared resolveMedia util

  if (!game) return null;

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
          aria-label="Fechar modal"
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
                Ver Imagem
              </button>
              <button
                className={`px-3 py-1 rounded ${showVideo ? 'bg-violet-600 text-white' : 'bg-general text-general'}`}
                onClick={() => setShowVideo(true)}
              >
                Ver Vídeo
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
            GRID DE ESTATÍSTICAS
        ======================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center gap-3 bg-general p-3 rounded-lg">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <div>
              <p className="text-xs text-gray-500">Avaliação</p>
              <p className="font-medium">{game?.rating}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-general p-3 rounded-lg">
            <Calendar className="w-5 h-5 text-violet-500" />
            <div>
              <p className="text-xs text-gray-500">Lançamento</p>
              <p className="font-medium">
                {String(game?.release_date ?? '2024').slice(0, 10)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-general p-3 rounded-lg">
            <Users className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-xs text-gray-500">Jogadores</p>
              <p className="font-medium">{game?.players}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-general p-3 rounded-lg">
            <ShoppingCart className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-xs text-gray-500">Preço</p>
              <p className="font-medium">
                0
              </p>
            </div>
          </div>
        </div>

        {/* =======================
            GÊNEROS
        ======================= */}
        <div className="flex flex-wrap gap-2 mb-6">
          {game?.genre.map((genre) => (
            <span
              key={genre}
              className="px-3 py-1 rounded-full text-sm bg-general text-white"
            >
              {genre}
            </span>
          ))}
        </div>

        {/* =======================
            DESCRIÇÃO
        ======================= */}
        <div className="mb-6 max-w-prose">
          <h3 className="text-lg font-semibold mb-2">Descrição</h3>
          <p className="text-gray-500 leading-relaxed">
            {game?.description ||
              game?.short_description ||
              "Descrição não disponível."}
          </p>
        </div>

        {/* =======================
            CARACTERÍSTICAS
        ======================= */}
        {game.features && game.features.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Características</h3>
            <ul className="space-y-2">
              {game.features.map((feature, index) => (
                <li key={index} className="flex gap-2 text-gray-500">
                  <span className="text-violet-500">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* =======================
            REQUISITOS DE SISTEMA
        ======================= */}
        {game.systemRequirements && (
          <div className="bg-general p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">
              Requisitos de Sistema
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Mínimo</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>SO: {game.systemRequirements.minimum.OS}</li>
                  <li>CPU: {game.systemRequirements.minimum.CPU}</li>
                  <li>RAM: {game.systemRequirements.minimum.RAM}</li>
                  <li>GPU: {game.systemRequirements.minimum.GPU}</li>
                  <li>Armazenamento: {game.systemRequirements.minimum.Armazenamento}</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Recomendado</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>SO: {game.systemRequirements.recommended.OS}</li>
                  <li>CPU: {game.systemRequirements.recommended.CPU}</li>
                  <li>RAM: {game.systemRequirements.recommended.RAM}</li>
                  <li>GPU: {game.systemRequirements.recommended.GPU}</li>
                  <li>Armazenamento: {game.systemRequirements.recommended.Armazenamento}</li>
                </ul>
              </div>
            </div>
          </div>
        )}
        {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            {Object.entries(game.storeLinks ?? {}).map(([store, link]) => {
                  const Icon = platformIcons[store === 'steam' ? 'PC' : store]; // Re-using platformIcons for store links
                  return (
                    <a
                      key={store}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-violet-400 flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-lg transition-colors"
                    >
                      {Icon ? <Icon size={24} className="text-general" /> : <span className="text-general font-medium">{store}</span>}
                      <span className="text-general font-medium">{store === 'steam' ? 'Steam' : store}</span>
                    </a>
                  );
                })}
          </div>
      </div>
    </div>
  );
}