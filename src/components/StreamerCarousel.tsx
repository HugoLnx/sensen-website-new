import { useState, useEffect, useCallback } from "react";
import type { StreamerVideo } from "@/types";
import { useLanguage } from "@/contexts/useLanguage";
import { ChevronLeft, ChevronRight, Youtube } from "lucide-react";
import { Reveal } from "./Reveal";

interface StreamerCarouselProps {
  videos: StreamerVideo[];
}

export const StreamerCarousel: React.FC<StreamerCarouselProps> = ({ videos }) => {
  const { t, currentLang } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const filteredVideos = videos.filter(video => 
    showAll || video.languages[currentLang]
  );

  const goToNext = useCallback(() => {
    if (filteredVideos.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % filteredVideos.length);
  }, [filteredVideos.length]);

  const goToPrev = () => {
    if (filteredVideos.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + filteredVideos.length) % filteredVideos.length);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (filteredVideos.length === 0) {
    return (
      <section className="py-16 bg-black/20 text-center">
        <p className="text-general-dim">
          {t('streamerCarousel.noVideos')}
        </p>
        <button 
          onClick={() => setShowAll(true)}
          className="text-primary hover:underline mt-2"
        >
          {t('streamerCarousel.filterDisabled').replace('{lang}', currentLang.toUpperCase())}
        </button>
      </section>
    );
  }

  const getAvatarUrl = (video: StreamerVideo) => {
    if (video.streamerImage) return video.streamerImage;
    
    // Extrair o handle do canal (ex: @Aluxa) do link ou nome
    const handle = video.channelLink?.split('@')[1] || video.streamerName.replace(/\s+/g, '');
    
    // Usando unavatar.io como proxy automático para YouTube
    return `https://unavatar.io/youtube/${handle.startsWith('@') ? handle : `@${handle}`}`;
  };

  const safeIndex = currentIndex % filteredVideos.length;
  const current = filteredVideos[safeIndex];
  const translateValue = Math.min(safeIndex, filteredVideos.length - 3);

  return (
    <section className="relative w-full py-16 bg-black/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-primary">{t('streamerCarousel.title')}</h2>
              <button 
                onClick={() => {
                  setShowAll(!showAll);
                  setCurrentIndex(0);
                }}
                className="text-sm text-general-dim hover:text-primary transition-colors mt-2 text-left cursor-pointer"
              >
                {showAll 
                  ? t('streamerCarousel.filterDisabled').replace('{lang}', currentLang.toUpperCase())
                  : t('streamerCarousel.showingOnly').replace('{lang}', currentLang.toUpperCase())
                }
              </button>
            </div>
          </div>
        </Reveal>

        <div className="relative aspect-video w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
          {/* YouTube Embed */}
          <iframe
            src={`https://www.youtube.com/embed/${current.youtubeId}?autoplay=0&rel=0`}
            title={current.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          {/* Streamer Info Overlay (Top Left) - Split Links */}
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
            {/* Channel Link: Avatar + Name */}
            <a 
              href={current.channelLink || `https://www.youtube.com/@${current.streamerName}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-black/70 backdrop-blur-md p-1.5 pr-4 rounded-full border border-white/20 transition-all hover:bg-primary/80 hover:scale-105 group/channel"
              title={current.streamerName}
            >
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center overflow-hidden border-2 border-white/20 shrink-0">
                <img 
                  src={getAvatarUrl(current)} 
                  alt={current.streamerName} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback para inicial se o proxy falhar
                    (e.target as HTMLImageElement).style.display = 'none';
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent && !parent.querySelector('.fallback-initial')) {
                      const span = document.createElement('span');
                      span.className = "fallback-initial text-white font-bold text-lg uppercase";
                      span.innerText = current.streamerName[0];
                      parent.appendChild(span);
                    }
                  }}
                />
              </div>
              <p className="text-white font-bold text-sm leading-none truncate max-w-40 group-hover/channel:text-white">
                {current.streamerName}
              </p>
            </a>

            {/* Video Link: "Watch on Youtube" */}
            <a 
              href={`https://www.youtube.com/watch?v=${current.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-red-600/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-red-500/30 transition-all hover:bg-red-600 hover:scale-105 self-start group/video"
            >
              <Youtube size={14} className="text-white" />
              <p className="text-white text-[10px] uppercase tracking-wider font-bold">
                {t('streamerCarousel.watchOnYoutube')}
              </p>
            </a>
          </div>

          {/* Navigation Controls */}
          {filteredVideos.length > 1 && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-primary p-2 rounded-full text-white transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-primary p-2 rounded-full text-white transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {filteredVideos.length > 1 && (
          <div className="mt-8 px-4 overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out md:transform-none md:justify-center md:space-x-4 md:items-center"
              style={{
                transform: isMobile 
                  ? `translateX(-${translateValue * 33.33}%)` 
                  : 'none'
              }}
            >
              {filteredVideos.map((video, index) => (
                <div
                  key={video.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative cursor-pointer transition-all duration-300 overflow-hidden rounded-lg shrink-0 
                    w-1/3 px-1 md:px-0 h-20 md:h-28 md:w-48
                    ${index === currentIndex
                      ? "border-2 border-primary ring-4 ring-primary/20 scale-105"
                      : "border-2 border-transparent opacity-50 hover:opacity-100"
                    }`}
                >
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Youtube className="text-white w-8 h-8" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
