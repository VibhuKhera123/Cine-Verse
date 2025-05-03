
import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import CineMateDialog from "./CineMateDialog";

const CineMateButton: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleOpenChat = () => {
    setIsDialogOpen(true);
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
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Chat with CineMate</span>
      </Button>
      
      <CineMateDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
};

export default CineMateButton;
