import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DeckCard from "@/components/DeckCard";
import CreateDeckModal from "@/components/CreateDeckModal";
import EmptyState from "@/components/EmptyState";
import type { Deck, InsertDeck, InsertFlashcard } from "@shared/schema";

export default function HomePage() {
  const [, setLocation] = useLocation();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // todo: remove mock functionality - replace with actual data from backend
  const [decks, setDecks] = useState<Deck[]>([
    {
      id: "1",
      title: "Biology Final Exam",
      description: "Key concepts for cellular biology, genetics, and evolution",
      cardCount: 45,
    },
    {
      id: "2",
      title: "Spanish Vocabulary",
      description: "Common phrases and words for everyday conversation",
      cardCount: 120,
    },
    {
      id: "3",
      title: "World History",
      description: "Important dates and events from ancient civilizations to modern times",
      cardCount: 78,
    },
  ]);

  const handleCreateDeck = (
    deck: InsertDeck,
    cards: Omit<InsertFlashcard, "deckId">[]
  ) => {
    // todo: remove mock functionality - implement actual backend call
    const newDeck: Deck = {
      id: `deck-${Date.now()}`,
      title: deck.title,
      description: deck.description || null,
      cardCount: cards.length,
    };
    setDecks([newDeck, ...decks]);
    console.log("Created deck:", deck, "with cards:", cards);
  };

  const handleStudy = (deckId: string) => {
    // todo: remove mock functionality - navigate to actual deck
    console.log("Study deck:", deckId);
    setLocation("/study");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-7xl mx-auto p-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              SwipeStudy
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Study smarter with swipeable flashcards
            </p>
          </div>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            data-testid="button-create-deck"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Deck
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {decks.length === 0 ? (
          <div className="mt-16">
            <EmptyState
              type="decks"
              onAction={() => setIsCreateModalOpen(true)}
            />
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">My Decks</h2>
              <p className="text-muted-foreground mt-1">
                {decks.length} {decks.length === 1 ? "deck" : "decks"} ready to study
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {decks.map((deck) => (
                <DeckCard
                  key={deck.id}
                  deck={deck}
                  onStudy={handleStudy}
                />
              ))}
            </div>
          </>
        )}
      </main>

      <CreateDeckModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onCreateDeck={handleCreateDeck}
      />
    </div>
  );
}
