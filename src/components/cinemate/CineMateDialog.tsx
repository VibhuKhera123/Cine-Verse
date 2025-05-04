
import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, X, Clock, Zap, Lightbulb, Brain } from "lucide-react";
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
  timestamp?: Date;
}

interface CineMateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Sample movie data
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

// Smart prompt templates to help users
const promptTemplates = [
  { 
    icon: <Lightbulb className="h-4 w-4" />, 
    text: "I'm feeling sad tonight, what should I watch?" 
  },
  { 
    icon: <Brain className="h-4 w-4" />, 
    text: "Recommend me mind-bending thrillers" 
  },
  { 
    icon: <Clock className="h-4 w-4" />, 
    text: "What are the best movies from the 90s?" 
  },
  { 
    icon: <Zap className="h-4 w-4" />, 
    text: "I love Black Mirror, what else would I enjoy?" 
  }
];

// Movie categories based on moods
const moodCategories = {
  happy: ["La La Land", "The Intouchables", "Sing Street"],
  sad: ["The Shawshank Redemption", "Eternal Sunshine of the Spotless Mind", "A Star Is Born"],
  excited: ["Mad Max: Fury Road", "Top Gun: Maverick", "Everything Everywhere All at Once"],
  relaxed: ["The Secret Life of Walter Mitty", "Soul", "Big Fish"],
  thoughtful: ["Arrival", "Her", "The Tree of Life"]
};

const CineMateDialog: React.FC<CineMateDialogProps> = ({ open, onOpenChange }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "bot",
      text: "Hi! I'm CineMate, your movie companion. Tell me your mood or the kind of movie you're looking for, and I'll recommend something for you!",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeMood, setActiveMood] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Detect user's mood from their message
  const detectMood = (text: string): string | null => {
    const text_lower = text.toLowerCase();
    if (text_lower.includes("happy") || text_lower.includes("joy") || text_lower.includes("uplifting")) return "happy";
    if (text_lower.includes("sad") || text_lower.includes("depress") || text_lower.includes("down")) return "sad";
    if (text_lower.includes("excited") || text_lower.includes("thrill") || text_lower.includes("adventure")) return "excited";
    if (text_lower.includes("relax") || text_lower.includes("calm") || text_lower.includes("peaceful")) return "relaxed";
    if (text_lower.includes("think") || text_lower.includes("contemplat") || text_lower.includes("deep")) return "thoughtful";
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      text: input,
      timestamp: new Date()
    };
    setMessages([...messages, userMessage]);
    setInput("");
    setIsTyping(true);

    // Detect mood for smarter recommendations
    const detectedMood = detectMood(input);
    setActiveMood(detectedMood);

    // Simulate AI response with typing indicator
    setTimeout(() => {
      let botResponse: Message;
      
      if (detectedMood && moodCategories[detectedMood as keyof typeof moodCategories]) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          text: `I can sense you're feeling ${detectedMood}. Based on your mood, here are some movies that might resonate with you right now:`,
          recommendations: mockRecommendations,
          timestamp: new Date()
        };
      } else {
        botResponse = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          text: `Based on your request for "${input}", here are some movies I think you might enjoy:`,
          recommendations: mockRecommendations,
          timestamp: new Date()
        };
      }
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      scrollToBottom();
    }, 1500);
  };

  const usePromptTemplate = (template: string) => {
    setInput(template);
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    if (open) {
      scrollToBottom();
    }
  }, [open, messages]);

  // Format timestamp
  const formatTime = (date?: Date) => {
    if (!date) return "";
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Avatar>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <Bot className="h-6 w-6 text-primary-foreground" />
              </div>
            </Avatar>
            <DialogTitle>CineMate</DialogTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            Your AI Movie Companion - Tell me how you're feeling!
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
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs opacity-70">
                    {message.type === "user" ? "You" : "CineMate"}
                  </span>
                  <span className="text-xs opacity-70">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                <p>{message.text}</p>
                {message.recommendations && (
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {message.recommendations.map((movie) => (
                      <div key={movie.id} className="overflow-hidden rounded hover-scale">
                        <MovieCard movie={movie} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="rounded-lg px-4 py-2 max-w-[80%] bg-muted">
                <div className="flex gap-1">
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>●</span>
                  <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>●</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Prompt templates */}
        <div className="px-4 py-2">
          <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {promptTemplates.map((template, index) => (
              <Button 
                key={index} 
                variant="outline" 
                size="sm" 
                className="text-xs flex items-center gap-1"
                onClick={() => usePromptTemplate(template.text)}
              >
                {template.icon}
                {template.text.length > 20 ? `${template.text.substring(0, 20)}...` : template.text}
              </Button>
            ))}
          </div>
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
            <Button type="submit" size="icon" disabled={!input.trim() || isTyping}>
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
