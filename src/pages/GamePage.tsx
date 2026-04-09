import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Star, Calendar, Users, ArrowLeft } from 'lucide-react';
import { FaSteam } from 'react-icons/fa'; // Only for platform icon mapping
import type { Game } from '../types';
import { resolveMedia } from '../utils/media';
import apiClient from '@/api/axios';
import ImageWithFallback from '@/components/figma/ImageWithFallback';


const platformIcons: { [key: string]: React.ElementType } = {
  PC: FaSteam,
};

const GamePage = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate(); // Initialize useNavigate
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);


  useEffect(() => {
    const fetchGame = async () => {
      if (!slug) {
        setError('Nenhum slug de jogo fornecido.');
        setLoading(false);
        return;
      }
      try {
        const gameSlug: string = slug;
        const response = await apiClient.get<Game>(`/games/${gameSlug}`);
        setGame(response.data);
      } catch (err) {
        setError('Falha ao buscar detalhes do jogo.' + (err instanceof Error ? err.message : ''));
      } finally {
        setLoading(false);
      }
    };
    fetchGame();
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen page-bg text-general py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">Carregando jogo...</div>;
  }

  if (error) {
    return <div className="min-h-screen page-bg text-general py-12 px-4 sm:px-6 lg:px-8 text-red-500 flex items-center justify-center">Erro: {error}</div>;
  }

  if (!game) {
    return <div className="min-h-screen page-bg text-general py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">Jogo não encontrado</div>;
  }

  const videoSrc = resolveMedia(game.video);
  const imageSrc = resolveMedia(game.image);

  return (
    <div className="min-h-screen page-bg text-general py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto relative"> {/* Added relative to position back button */}
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="fixed mt-1 top-16 left-4 z-40 bg-violet-600 hover:bg-violet-700 text-white p-3 rounded-full shadow-lg transition-colors flex items-center justify-center"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <h1 className="text-4xl font-bold mb-6 text-primary">{game.title}</h1>

        <div className="space-y-8">
          {/* Media: Image / Video toggle */}
          <div className="space-y-4">
            <div className="flex gap-3">
              <button
                className={`px-4 py-2 rounded-lg transition-colors ${!showVideo ? 'bg-violet-600 text-white' : 'bg-general text-general'}`}
                onClick={() => setShowVideo(false)}
              >
                Ver Imagem
              </button>
              <button
                className={`px-4 py-2 rounded-lg transition-colors ${showVideo ? 'bg-violet-600 text-white' : 'bg-general text-general'}`}
                onClick={() => setShowVideo(true)}
              >
                Ver Vídeo
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

          {/* Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 bg-general p-4 rounded-lg shadow-md">
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
              <div>
                <p className="text-sm text-general">Avaliação</p>
                <p className="text-general text-lg font-semibold">{game.rating}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-general p-4 rounded-lg shadow-md">
              <Calendar className="w-6 h-6 text-violet-400" />
              <div>
                <p className="text-sm text-general">Lançamento</p>
                <p className="text-general text-lg font-semibold">{String(game.release_date ?? '2024').slice(0, 10)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-general p-4 rounded-lg shadow-md">
              <Users className="w-6 h-6 text-blue-400" />
              <div>
                <p className="text-sm text-general">Jogadores</p>
                <p className="text-general text-lg font-semibold">{game.players || '1'}</p>
              </div>
            </div>
          </div>

          {/* Developer */}
          <div className="bg-general p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-primary">Desenvolvedor</h3>
            <p className="text-general leading-relaxed">{game.developer}</p>
          </div>

          {/* Genres */}
          <div className="bg-general p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-primary">Gêneros</h3>
            <div className="flex flex-wrap gap-3">
              {game.genre.map((g) => (
                <span
                  key={g}
                  className="header-bg badge-primary-soft text-primary px-4 py-2 rounded-full text-md font-medium"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-general p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-primary">Sobre este Jogo</h3>
            <p className="text-general leading-relaxed">
              {game.description || game.short_description}
            </p>
          </div>

          {/* Features */}
          {game.features && game.features.length > 0 && (
            <div className="bg-general p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-primary">Características Principais</h3>
              <ul className="space-y-3">
                {game.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 text-general">
                    <span className="text-violet-400 mt-1 text-lg">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* System Requirements */}
          {game.systemRequirements && (
            <div className="bg-general p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-primary">Requisitos do Sistema</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-md font-semibold text-general mb-2">MÍNIMO</h4>
                  <ul className="space-y-2 text-sm text-general">
                    <li><span className="font-medium">OS:</span> {game.systemRequirements.minimum.OS}</li>
                    <li><span className="font-medium">CPU:</span> {game.systemRequirements.minimum.CPU}</li>
                    <li><span className="font-medium">RAM:</span> {game.systemRequirements.minimum.RAM}</li>
                    <li><span className="font-medium">GPU:</span> {game.systemRequirements.minimum.GPU}</li>
                    <li><span className="font-medium">Armazenamento:</span> {game.systemRequirements.minimum.Armazenamento}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-md font-semibold text-general mb-2">RECOMENDADO</h4>
                  <ul className="space-y-2 text-sm text-general">
                    <li><span className="font-medium">OS:</span> {game.systemRequirements.recommended.OS}</li>
                    <li><span className="font-medium">CPU:</span> {game.systemRequirements.recommended.CPU}</li>
                    <li><span className="font-medium">RAM:</span> {game.systemRequirements.recommended.RAM}</li>
                    <li><span className="font-medium">GPU:</span> {game.systemRequirements.recommended.GPU}</li>
                    <li><span className="font-medium">Armazenamento:</span> {game.systemRequirements.recommended.Armazenamento}</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Store Links (from original GamePage, slightly adapted) */}
          {game.storeLinks && Object.keys(game.storeLinks).length > 0 && (
            <div className="bg-general p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-primary">Onde Comprar</h3>
              <div className="flex flex-wrap gap-4">
                {Object.entries(game.storeLinks).map(([store, link]) => {
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
          )}
        </div>
      </div>
    </div>
  );
};

export default GamePage;