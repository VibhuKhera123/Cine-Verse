
import React from "react";
import { Link } from "react-router-dom";
import { Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  movie: {
    id: number;
    title: string;
    backdrop: string;
    description: string;
    year: number;
    rating: number;
    duration: string;
  };
}

const HeroSection: React.FC<HeroProps> = ({ movie }) => {
  return (
    <section className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${movie.backdrop})` }}
      ></div>
      <div className="hero-overlay"></div>
      <div className="container relative h-full px-4 md:px-6">
        <div className="flex h-full flex-col justify-end pb-16 pt-24">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="mb-3 text-4xl font-bold md:text-5xl lg:text-6xl font-display">
              {movie.title}
            </h1>
            <div className="mb-4 flex items-center gap-3 text-sm">
              <span className="flex items-center">
                <Star className="mr-1 h-4 w-4 fill-primary stroke-primary" />
                <span className="font-medium">{movie.rating.toFixed(1)}</span>
              </span>
              <span className="text-muted-foreground">{movie.year}</span>
              <span className="text-muted-foreground">{movie.duration}</span>
            </div>
            <p className="mb-6 text-lg text-muted-foreground md:text-xl">
              {movie.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="gap-2">
                <Link to={`/movie/${movie.id}`}>
                  <Play className="h-5 w-5" />
                  Watch Trailer
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg">
                <Link to={`/movie/${movie.id}`}>More Info</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
