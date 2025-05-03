
import React from "react";
import { useParams } from "react-router-dom";
import { Star, Clock, Calendar, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CineMateChat from "@/components/cinemate/CineMateChat";
import { trendingMovies, topRatedMovies, recentlyAddedMovies } from "@/data/mockMovies";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = parseInt(id || "0");
  
  // Find the movie from our mock data
  const allMovies = [...trendingMovies, ...topRatedMovies, ...recentlyAddedMovies];
  const movie = allMovies.find(m => m.id === movieId);
  
  if (!movie) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24">
          <div className="container px-4 md:px-6 py-16">
            <h1 className="text-3xl font-bold">Movie not found</h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Mock additional movie details
  const movieDetails = {
    ...movie,
    backdrop: `https://image.tmdb.org/t/p/original/${Math.floor(Math.random() * 1000)}.jpg`,
    description: "This is a placeholder description for the movie. In a real application, this would be fetched from an API or database with the actual plot summary and details about the film.",
    duration: "2h 15m",
    director: "Jane Smith",
    cast: [
      "Actor One",
      "Actor Two",
      "Actor Three",
      "Actor Four",
      "Actor Five"
    ]
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="relative">
          {/* Backdrop image */}
          <div 
            className="aspect-[21/9] w-full bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${movie.poster})`,
              backgroundPosition: 'center 20%'
            }}
          >
            <div className="hero-overlay"></div>
          </div>
          
          {/* Movie details overlay */}
          <div className="container px-4 md:px-6">
            <div className="relative -mt-32 md:-mt-64 flex flex-col md:flex-row gap-6 pb-8">
              {/* Movie poster */}
              <div className="w-48 md:w-72 mx-auto md:mx-0 rounded-lg overflow-hidden shadow-xl">
                <img src={movie.poster} alt={movie.title} className="w-full" />
              </div>
              
              {/* Movie info */}
              <div className="flex-1 md:pt-36">
                <h1 className="text-3xl md:text-4xl font-bold font-display mb-2">{movie.title}</h1>
                <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-primary stroke-primary mr-1" />
                    <span className="font-medium">{movie.rating.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{movie.year}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{movieDetails.duration}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map(genre => (
                      <span key={genre} className="px-3 py-1 bg-secondary rounded-full text-xs">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">
                  {movieDetails.description}
                </p>
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Director</h3>
                  <p>{movieDetails.director}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Cast</h3>
                  <div className="flex flex-wrap gap-2">
                    {movieDetails.cast.map((actor, index) => (
                      <span key={index} className="px-3 py-1 bg-muted rounded-full text-xs">
                        {actor}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-8 flex gap-4">
                  <Button className="gap-2">
                    <Play className="h-4 w-4" />
                    Watch Trailer
                  </Button>
                  <Button variant="outline">Add to Watchlist</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CineMate recommendations section */}
        <section className="py-12 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="font-bold text-primary-foreground">AI</span>
              </div>
              <h2 className="text-2xl font-bold font-display">CineMate Suggests</h2>
            </div>
            <p className="text-muted-foreground mb-8">
              Based on your interest in {movie.title}, CineMate thinks you might also enjoy these movies:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {topRatedMovies.slice(0, 5).map(recommendation => (
                <div key={recommendation.id} className="movie-card">
                  <img 
                    src={recommendation.poster} 
                    alt={recommendation.title}
                    className="w-full aspect-[2/3] rounded-lg object-cover"
                  />
                  <div className="movie-card-content">
                    <h3 className="font-bold truncate">{recommendation.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">{recommendation.year}</span>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 fill-primary stroke-primary mr-1" />
                        <span className="text-sm font-medium">{recommendation.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CineMateChat />
    </div>
  );
};

export default MovieDetail;
