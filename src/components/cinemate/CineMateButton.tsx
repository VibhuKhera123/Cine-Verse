
import React, { useState, useEffect } from "react";
import { MessageCircle, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import CineMateDialog from "./CineMateDialog";

const CineMateButton: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const { toast } = useToast();

  // Add pulsing effect to draw attention periodically
  useEffect(() => {
    // Pulse the button every 30 seconds if the dialog is not open
    const interval = setInterval(() => {
      if (!isDialogOpen) {
        setIsPulsing(true);
        setTimeout(() => setIsPulsing(false), 3000);
      }
    }, 30000);

    // Initial pulse after 5 seconds to attract first-time users
    const initialPulse = setTimeout(() => {
      if (!isDialogOpen) setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 3000);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialPulse);
    };
  }, [isDialogOpen]);

  const handleOpenChat = () => {
    setIsDialogOpen(true);
    setIsPulsing(false);
    toast({
      title: "CineMate activated",
      description: "Your AI movie companion is ready to help!",
      duration: 3000,
    });
  };

  return (
    <>
      <Button
        onClick={handleOpenChat}
        className={`fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg transition-all duration-300 ${
          isPulsing ? "animate-pulse ring-4 ring-primary ring-offset-2 ring-offset-background" : ""
        }`}
        size="icon"
      >
        <Bot className="h-6 w-6" />
        <span className="sr-only">Chat with CineMate</span>
      </Button>
      
      <CineMateDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
};

export default CineMateButton;
