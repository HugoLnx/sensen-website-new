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
  const [prevUrl, setPrevUrl] = useState(url);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Reset state during render when URL changes
  if (url !== prevUrl) {
    setPrevUrl(url);
    setIsReady(false);
    setLoadError(false);
  }

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

  // Sync check for already loaded video (important for hydration)
  useEffect(() => {
    if (parsedVideo.type === 'direct' && videoRef.current) {
      const video = videoRef.current;
      if (video.readyState >= 2) {
        // Move to next tick to avoid synchronous setState warning in effect
        setTimeout(handleReady, 0);
      }
      // Explicitly try to play for hydration
      video.play().catch(() => {});
    }
  }, [url, parsedVideo.type, handleReady]);

  // Timeout fallback
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      // Only set error if not already ready
      setIsReady(prev => {
        if (!prev) {
          setLoadError(true);
        }
        return prev;
      });
    }, 10000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [url, parsedVideo.type]);

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
          <div className={`absolute inset-0 bg-black/80 flex items-center justify-center text-primary ${!loadError ? 'animate-pulse' : ''}`}>
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
          <div className={`absolute inset-0 bg-black/80 flex items-center justify-center text-primary ${!loadError ? 'animate-pulse' : ''}`}>
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
          ref={videoRef}
          src={url}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={handleReady}
          onError={handleError}
          className={`w-full h-full object-cover ${commonClasses}`}
        />
        {(!isReady || loadError) && (
          <div className={`absolute inset-0 bg-black/80 flex items-center justify-center text-primary ${!loadError ? 'animate-pulse' : ''}`}>
            {!loadError ? 'Carregando...' : renderErrorFallback()}
          </div>
        )}
      </div>
    );
  }

  return <div className="w-full h-full bg-slate-800 animate-pulse" />;
};

