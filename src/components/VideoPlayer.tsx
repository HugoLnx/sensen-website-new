import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";

interface VideoPlayerProps {
  url: string;
  className?: string;
  poster?: string;
  fallbackSrc?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  url, 
  className = "", 
  poster,
  fallbackSrc 
}) => {
  const [isReady, setIsReady] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const parsedVideo = useMemo(() => {
    if (!url) return { type: 'none', id: null };

    // YouTube
    const ytRegex = /youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|youtu\.be\/)([^"&?/\s]{11})/;
    const ytMatch = url.match(ytRegex);

    // Google Drive
    const driveRegex = /drive\.google\.com\/file\/d\/([^/?]+)/;
    const driveMatch = url.match(driveRegex);

    if (ytMatch) {
      return { type: 'youtube', id: ytMatch[1] };
    } 
    if (driveMatch) {
      return { type: 'drive', id: driveMatch[1] };
    } 
    return { type: 'direct', id: null };
  }, [url]);

  // Timeout fallback - no sync setState issue as initial false
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setLoadError(true);
    }, 10000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [parsedVideo.type]);

  const handleReady = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsReady(true);
    setLoadError(false);
  }, []);

  const handleError = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setLoadError(true);
  }, []);

  const renderErrorFallback = useCallback(() => (
    <div className="absolute inset-0 bg-black flex flex-col items-center justify-center text-primary gap-4 p-8 z-10">
      <div className="text-4xl">🎥</div>
      <p className="text-lg text-center max-w-md">
        Vídeo não pôde ser carregado (adblocker?)
      </p>
      {fallbackSrc && (
        <video
          src={fallbackSrc}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          className="w-full max-h-48 object-cover rounded-lg"
        />
      )}
      <button
        onClick={() => window.location.reload()}
        className="bg-primary text-black px-6 py-2 rounded-lg hover:bg-primary-dark transition-all"
      >
        Recarregar
      </button>
    </div>
  ), [fallbackSrc, poster]);

  const videoKey = parsedVideo.id || url;

  const commonClasses = `transition-opacity duration-1000 ${isReady && !loadError ? 'opacity-100' : 'opacity-0'}`;

  // YouTube
  if (parsedVideo.type === 'youtube') {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-black ${className}`}>
        <iframe
          key={videoKey}
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${parsedVideo.id}?autoplay=1&mute=1&loop=1&playlist=${parsedVideo.id}&controls=0&modestbranding=1&rel=0&iv_load_policy=3`}
          title="YouTube"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className={`w-full h-[150%] object-cover pointer-events-none absolute inset-0 ${commonClasses}`}
          style={{ top: '-25%' }}
          onLoad={handleReady}
          onError={handleError}
        />
        {(!isReady || loadError) && (
          <div className="absolute inset-0 bg-black/80 animate-pulse flex items-center justify-center text-primary">
            {!loadError ? 'Carregando...' : renderErrorFallback()}
          </div>
        )}
      </div>
    );
  }

  // Drive
  if (parsedVideo.type === 'drive') {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-black ${className}`}>
        <iframe
          key={videoKey}
          ref={iframeRef}
          src={`https://drive.google.com/file/d/${parsedVideo.id}/preview`}
          className={`w-full h-full relative ${commonClasses}`}
          allow="loop; autoplay; encrypted-media"
          onLoad={handleReady}
          onError={handleError}
        />
        {(!isReady || loadError) && (
          <div className="absolute inset-0 bg-black/80 animate-pulse flex items-center justify-center text-primary">
            {!loadError ? 'Carregando...' : renderErrorFallback()}
          </div>
        )}
      </div>
    );
  }

  // Direct
  if (parsedVideo.type === 'direct') {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-black ${className}`}>
        <video
          key={videoKey}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={handleReady}
          onError={handleError}
          className={`w-full h-full object-cover ${commonClasses}`}
        >
          <source src={url} type="video/mp4" />
        </video>
        {(!isReady || loadError) && (
          <div className="absolute inset-0 bg-black/80 animate-pulse flex items-center justify-center text-primary">
            {!loadError ? 'Carregando...' : renderErrorFallback()}
          </div>
        )}
      </div>
    );
  }

  return <div className="w-full h-full bg-slate-800 animate-pulse" />;
};

