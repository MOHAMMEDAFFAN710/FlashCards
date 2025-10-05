import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import CardStack from "@/components/CardStack";
import ProgressBar from "@/components/ProgressBar";
import EmptyState from "@/components/EmptyState";
import type { Deck, Flashcard } from "@shared/schema";

export default function StudyPage() {
  const [, setLocation] = useLocation();
  const params = useParams<{ deckId: string }>();
  const deckId = params.deckId;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const { data: deck } = useQuery<Deck>({
    queryKey: ["/api/decks", deckId],
    queryFn: async () => {
      const res = await fetch(`/api/decks/${deckId}`);
      if (!res.ok) throw new Error("Failed to fetch deck");
      return res.json();
    },
    enabled: !!deckId,
  });

  const { data: flashcards = [], isLoading } = useQuery<Flashcard[]>({
    queryKey: ["/api/decks", deckId, "flashcards"],
    queryFn: async () => {
      const res = await fetch(`/api/decks/${deckId}/flashcards`);
      if (!res.ok) throw new Error("Failed to fetch flashcards");
      return res.json();
    },
    enabled: !!deckId,
  });

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsComplete(false);
  };

  if (!deckId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Deck not found</p>
          <Button onClick={() => setLocation("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Decks
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading flashcards...</p>
      </div>
    );
  }

  if (flashcards.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <header className="p-6 border-b">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Decks
          </Button>
        </header>
        <div className="flex-1 flex items-center justify-center p-8">
          <EmptyState type="cards" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="p-6 border-b">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-xl font-semibold flex-1 text-center truncate" data-testid="text-deck-title">
            {deck?.title || "Study Session"}
          </h1>
          <div className="w-24" />
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {isComplete ? (
          <div className="text-center max-w-md" data-testid="container-complete">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-chart-2/20 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-chart-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-2">Deck Complete!</h2>
            <p className="text-muted-foreground mb-6">
              You've reviewed all {flashcards.length} cards in this deck.
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                onClick={handleRestart}
                data-testid="button-restart"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Study Again
              </Button>
              <Button
                variant="outline"
                onClick={() => setLocation("/")}
                data-testid="button-back-to-decks"
              >
                Back to Decks
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-4xl space-y-8">
            <div className="max-w-2xl mx-auto">
              <ProgressBar current={currentIndex} total={flashcards.length} />
            </div>

            <CardStack
              cards={flashcards}
              onComplete={() => setIsComplete(true)}
            />

            <div className="max-w-2xl mx-auto text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                Swipe right to continue • Swipe left to go back
              </p>
              <p className="text-xs text-muted-foreground">
                Or use arrow keys: ← →
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
