
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/shared/HeroSection";
import MovieCarousel from "@/components/shared/MovieCarousel";
import CineMateChat from "@/components/cinemate/CineMateChat";
import { featuredMovie, trendingMovies, topRatedMovies, recentlyAddedMovies } from "@/data/mockMovies";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <HeroSection movie={featuredMovie} />
        <div className="space-y-6 py-6">
          <MovieCarousel 
            title="Trending Now" 
            movies={trendingMovies} 
            seeAllLink="/movies/trending"
          />
          <MovieCarousel 
            title="Top Rated" 
            movies={topRatedMovies} 
            seeAllLink="/movies/top-rated"
          />
          <MovieCarousel 
            title="Recently Added" 
            movies={recentlyAddedMovies} 
            seeAllLink="/movies/recent"
          />
        </div>
        <section className="py-16 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2 space-y-4">
                <h2 className="text-3xl font-bold font-display">Meet CineMate - Your AI Movie Companion</h2>
                <p className="text-muted-foreground text-lg">
                  CineMate is your personal movie recommendation AI. Tell it how you feel, what you're in the mood for, 
                  or the type of story you want to experience, and it will suggest perfect matches for your current state of mind.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-5 w-5 rounded-full bg-primary flex items-center justify-center text-xs font-bold">✓</div>
                    <p>Get personalized movie recommendations based on your mood</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-5 w-5 rounded-full bg-primary flex items-center justify-center text-xs font-bold">✓</div>
                    <p>Create a custom watch-later plan with curated films</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-5 w-5 rounded-full bg-primary flex items-center justify-center text-xs font-bold">✓</div>
                    <p>Discover hidden gems you might have missed</p>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 bg-card rounded-xl overflow-hidden shadow-xl border border-border">
                <img 
                  src="https://images.unsplash.com/photo-1586899028174-e7098604235b?q=80&w=1171&auto=format&fit=crop" 
                  alt="CineMate AI" 
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CineMateChat />
    </div>
  );
};

export default Index;
