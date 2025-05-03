
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border mt-16">
      <div className="container px-4 py-10 md:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-lg font-bold font-display">CineVerse</h3>
            <p className="text-sm text-muted-foreground">
              Your ultimate destination for movie information, reviews, and personalized recommendations.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/movies" className="hover:text-primary transition-colors">Movies</Link>
              </li>
              <li>
                <Link to="/tv" className="hover:text-primary transition-colors">TV Shows</Link>
              </li>
              <li>
                <Link to="/actors" className="hover:text-primary transition-colors">Actors</Link>
              </li>
              <li>
                <Link to="/top-rated" className="hover:text-primary transition-colors">Top Rated</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">CineMate</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/cinemate" className="hover:text-primary transition-colors">Try CineMate AI</Link>
              </li>
              <li>
                <Link to="/watch-later" className="hover:text-primary transition-colors">Watch Later</Link>
              </li>
              <li>
                <Link to="/mood-match" className="hover:text-primary transition-colors">Mood Match</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} CineVerse. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <Link to="#" className="text-xs text-muted-foreground hover:text-primary">
              Terms
            </Link>
            <Link to="#" className="text-xs text-muted-foreground hover:text-primary">
              Privacy
            </Link>
            <Link to="#" className="text-xs text-muted-foreground hover:text-primary">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
