
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import MovieCard, { Movie } from "./MovieCard";

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  seeAllLink?: string;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ 
  title, 
  movies,
  seeAllLink 
}) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { current } = carouselRef;
      const scrollAmount = direction === "left" ? -current.clientWidth * 0.75 : current.clientWidth * 0.75;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-6">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold font-display">{title}</h2>
          <div className="flex items-center gap-2">
            {seeAllLink && (
              <Button variant="link" asChild>
                <a href={seeAllLink}>See all</a>
              </Button>
            )}
            <div className="hidden md:flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => scroll("left")}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Scroll left</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => scroll("right")}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Scroll right</span>
              </Button>
            </div>
          </div>
        </div>
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-hide -mx-4 px-4"
        >
          {movies.map((movie) => (
            <div key={movie.id} className="min-w-[180px] md:min-w-[220px] snap-start">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieCarousel;
