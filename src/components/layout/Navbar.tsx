
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Will implement search functionality later
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glassmorphic">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary font-display">CineVerse</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/movies" className="text-sm font-medium hover:text-primary transition-colors">
              Movies
            </Link>
            <Link to="/tv" className="text-sm font-medium hover:text-primary transition-colors">
              TV Shows
            </Link>
            <Link to="/actors" className="text-sm font-medium hover:text-primary transition-colors">
              Actors
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="hidden md:flex relative">
            <Input
              type="search"
              placeholder="Search movies, TV shows, actors..."
              className="w-[300px] pl-9 bg-muted text-foreground"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </form>
          <Link to="/login">
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="container py-4 px-6 space-y-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search movies, TV shows, actors..."
                className="w-full pl-9 bg-muted text-foreground"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            </form>
            <nav className="space-y-2">
              <Link
                to="/movies"
                className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Movies
              </Link>
              <Link
                to="/tv"
                className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                TV Shows
              </Link>
              <Link
                to="/actors"
                className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Actors
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
