
import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

export interface Movie {
  id: number;
  title: string;
  poster: string;
  year: number;
  rating: number;
  genres: string[];
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card block">
      <div className="aspect-[2/3] overflow-hidden rounded-lg">
        <img 
          src={movie.poster} 
          alt={movie.title} 
          className="h-full w-full object-cover" 
          loading="lazy"
        />
        <div className="movie-card-content">
          <h3 className="font-bold truncate text-white">{movie.title}</h3>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm text-gray-300">{movie.year}</span>
            <div className="flex items-center">
              <Star className="w-3 h-3 fill-primary stroke-primary mr-1" />
              <span className="text-sm font-medium">{movie.rating.toFixed(1)}</span>
            </div>
          </div>
          <div className="mt-1 flex flex-wrap gap-1">
            {movie.genres.slice(0, 2).map((genre) => (
              <span
                key={genre}
                className="inline-block px-2 py-0.5 text-[10px] font-medium bg-secondary text-gray-300 rounded"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
