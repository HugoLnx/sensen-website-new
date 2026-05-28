import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });

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

  const updateConstraints = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const contentWidth = containerRef.current.scrollWidth;
      setConstraints({
        left: -(contentWidth - containerWidth),
        right: 0
      });
    }
  }, []);

  useEffect(() => {
    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, [updateConstraints, filteredVideos.length, showAll]);

  // Center active thumbnail
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const thumbWidth = window.innerWidth < 768 ? 160 : 192; // Match w-40 and w-48
      const gap = 16; // gap-4
      
      const targetX = -(currentIndex * (thumbWidth + gap)) + (containerWidth / 2) - (thumbWidth / 2);
      
      // Bound the targetX within constraints
      const boundedX = Math.max(Math.min(targetX, constraints.right), constraints.left);
      x.set(boundedX);
    }
  }, [currentIndex, constraints, x]);

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
    const fileName = `${video.streamerName.toLowerCase().replace(/\s+/g, '-')}.jpg`;
    return `/images/streamers/${fileName}`;
  };

  const safeIndex = currentIndex % filteredVideos.length;
  const current = filteredVideos[safeIndex];

  return (
    <section className="relative w-full py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-primary">{t('streamerCarousel.title')}</h2>
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
          <div className="mt-8 max-w-5xl mx-auto relative px-0">
            <button 
              onClick={() => {
                setShowAll(!showAll);
                setCurrentIndex(0);
              }}
              className="text-sm text-general-dim hover:text-primary transition-colors mb-6 text-left cursor-pointer px-4 md:px-0"
            >
              {showAll 
                ? t('streamerCarousel.filterDisabled').replace('{lang}', currentLang.toUpperCase())
                : t('streamerCarousel.showingOnly').replace('{lang}', currentLang.toUpperCase())
              }
            </button>
            
            <div className="relative group/thumbs flex items-center px-12">
              {/* Left Scroll Button */}
              <button 
                onClick={goToPrev}
                className="absolute left-0 z-20 bg-black/60 hover:bg-primary p-2 rounded-full text-white transition-all hover:scale-110"
              >
                <ChevronLeft size={24} />
              </button>

              <div 
                ref={containerRef}
                className="w-full overflow-hidden py-4 px-2 cursor-grab active:cursor-grabbing"
              >
                <motion.div 
                  className="flex gap-4"
                  drag="x"
                  dragConstraints={constraints}
                  style={{ x: springX }}
                >
                  {filteredVideos.map((video, index) => (
                    <div
                      key={video.id}
                      onClick={() => setCurrentIndex(index)}
                      className={`relative transition-all duration-300 overflow-hidden rounded-lg shrink-0 
                        w-40 md:w-48 h-24 md:h-28
                        ${index === currentIndex
                          ? "border-2 border-primary ring-4 ring-primary/20 scale-110 z-10"
                          : "border-2 border-transparent opacity-50 hover:opacity-100"
                        }`}
                    >
                      <img
                        src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover rounded-md pointer-events-none"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Youtube className="text-white w-8 h-8" />
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right Scroll Button */}
              <button 
                onClick={goToNext}
                className="absolute right-0 z-20 bg-black/60 hover:bg-primary p-2 rounded-full text-white transition-all hover:scale-110"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
