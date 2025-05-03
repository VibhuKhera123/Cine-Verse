
import React, { useState } from "react";
import { Send, Bot, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import MovieCard, { Movie } from "../shared/MovieCard";

interface Message {
  id: string;
  type: "user" | "bot";
  text: string;
  recommendations?: Movie[];
}

interface CineMateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockRecommendations = [
  {
    id: 101,
    title: "Inception",
    poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
    year: 2010,
    rating: 8.8,
    genres: ["Sci-Fi", "Action"]
  },
  {
    id: 102,
    title: "Interstellar",
    poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    year: 2014,
    rating: 8.6,
    genres: ["Adventure", "Sci-Fi"]
  },
  {
    id: 103,
    title: "The Prestige",
    poster: "https://m.media-amazon.com/images/M/MV5BMjA4NDI0MTIxNF5BMl5BanBnXkFtZTYwNTM0MzY2._V1_.jpg",
    year: 2006,
    rating: 8.5,
    genres: ["Mystery", "Thriller"]
  }
];

const CineMateDialog: React.FC<CineMateDialogProps> = ({ open, onOpenChange }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "bot",
      text: "Hi! I'm CineMate, your movie companion. Tell me your mood or the kind of movie you're looking for, and I'll recommend something for you!"
    }
  ]);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      text: input
    };
    setMessages([...messages, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        text: `Based on your mood for "${input}", here are some movies I think you might enjoy:`,
        recommendations: mockRecommendations
      };
      setMessages(prev => [...prev, botMessage]);
      scrollToBottom();
    }, 1000);
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Avatar>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <span className="font-bold text-primary-foreground">CM</span>
              </div>
            </Avatar>
            <DialogTitle>CineMate</DialogTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            Your AI Movie Companion
          </p>
        </DialogHeader>
        
        {/* Messages container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  message.type === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p>{message.text}</p>
                {message.recommendations && (
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {message.recommendations.map((movie) => (
                      <div key={movie.id} className="overflow-hidden rounded">
                        <MovieCard movie={movie} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input form */}
        <form onSubmit={handleSubmit} className="border-t border-border p-4 mt-auto">
          <div className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tell me your mood or movie preference..."
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={!input.trim()}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CineMateDialog;
