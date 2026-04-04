import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Game } from "@/types";

interface HeroCarouselProps {
  games: Game[];
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ games }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % games.length);
  }, [games.length]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + games.length) % games.length);
  };

  useEffect(() => {
    if (games.length === 0) return;
    const timer = setInterval(goToNext, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, goToNext, games.length]);

  if (games.length === 0) return null;
  const current = games[currentIndex];

  // Lógica para manter 3 itens visíveis no mobile e travar o scroll no final
  const translateValue = Math.min(currentIndex, games.length - 3);

  return (
    <section
      className="relative w-full h-[calc(100vh-64px)] bg-cover bg-center flex items-center justify-center transition-all duration-1000 ease-in-out"
      style={{ backgroundImage: `url(${current.image})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Conteúdo */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">{current.title}</h1>
        <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto line-clamp-2">
          {current.description}
        </p>
        <Link to={`/games/${current.slug}`}>
          <button className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 px-10 rounded-lg transition-colors shadow-lg">
            JOGUE AGORA
          </button>
        </Link>
      </div>

      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-gray-900/40 hover:bg-gray-900/80 p-3 rounded-full transition-all"
      >
        <ChevronLeft className="w-8 h-8 text-white" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-gray-900/40 hover:bg-gray-900/80 p-3 rounded-full transition-all"
      >
        <ChevronRight className="w-8 h-8 text-white" />
      </button>

      {/* Container das Miniaturas Responsivo */}
      <div className="absolute bottom-8 w-full px-4 overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out md:transform-none md:justify-center md:items-center md:space-x-4"
          style={{
            // Aplica o translate apenas em telas menores (mobile)
            transform: window.innerWidth < 768 
              ? `translateX(-${translateValue * 33.33}%)` 
              : 'none'
          }}
        >
          {games.map((game, index) => (
            <div
              key={game.id}
              onClick={() => setCurrentIndex(index)}
              className={`relative cursor-pointer transition-all duration-300 overflow-hidden rounded-md shrink-0 
                w-1/3 px-1 md:w-auto md:px-0 
                ${index === currentIndex
                  ? "border-2 border-violet-600 scale-110"
                  : "border-2 border-transparent opacity-40 hover:opacity-70"
                }`}
            >
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-16 object-cover md:w-24"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};