import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen } from "lucide-react";

interface EmptyStateProps {
  type: "decks" | "cards";
  onAction?: () => void;
}

export default function EmptyState({ type, onAction }: EmptyStateProps) {
  return (
    <Card className="p-12 text-center max-w-md mx-auto" data-testid="container-empty-state">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
        <BookOpen className="w-10 h-10 text-muted-foreground" />
      </div>
      
      <h3 className="text-xl font-semibold mb-2">
        {type === "decks" ? "No Decks Yet" : "No Cards in This Deck"}
      </h3>
      
      <p className="text-muted-foreground mb-6">
        {type === "decks"
          ? "Create your first flashcard deck to start studying"
          : "Add some flashcards to begin your study session"}
      </p>

      {onAction && (
        <Button onClick={onAction} data-testid="button-empty-action">
          <Plus className="w-4 h-4 mr-2" />
          {type === "decks" ? "Create Deck" : "Add Cards"}
        </Button>
      )}
    </Card>
  );
}
