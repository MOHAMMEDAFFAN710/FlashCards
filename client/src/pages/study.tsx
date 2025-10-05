import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw } from "lucide-react";
import CardStack from "@/components/CardStack";
import ProgressBar from "@/components/ProgressBar";
import EmptyState from "@/components/EmptyState";
import type { Flashcard } from "@shared/schema";

export default function StudyPage() {
  const [, setLocation] = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // todo: remove mock functionality - replace with actual deck data from backend
  const mockCards: Flashcard[] = [
    {
      id: "1",
      deckId: "deck-1",
      front: "What is the capital of France?",
      back: "Paris - a major European city known for the Eiffel Tower, world-class museums like the Louvre, and its rich cultural heritage.",
      order: 0,
    },
    {
      id: "2",
      deckId: "deck-1",
      front: "What is photosynthesis?",
      back: "The process by which plants convert light energy into chemical energy (glucose) using carbon dioxide and water, releasing oxygen as a byproduct.",
      order: 1,
    },
    {
      id: "3",
      deckId: "deck-1",
      front: "Who wrote Romeo and Juliet?",
      back: "William Shakespeare, an English playwright and poet from the late 16th century, considered one of the greatest writers in the English language.",
      order: 2,
    },
    {
      id: "4",
      deckId: "deck-1",
      front: "What is the Pythagorean theorem?",
      back: "a² + b² = c² - In a right triangle, the square of the hypotenuse equals the sum of squares of the other two sides.",
      order: 3,
    },
    {
      id: "5",
      deckId: "deck-1",
      front: "What is the periodic table?",
      back: "A tabular arrangement of chemical elements organized by atomic number, electron configuration, and recurring chemical properties.",
      order: 4,
    },
  ];

  const deckTitle = "Biology Final Exam"; // todo: remove mock functionality

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsComplete(false);
  };

  if (mockCards.length === 0) {
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
            {deckTitle}
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
              You've reviewed all {mockCards.length} cards in this deck.
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
              <ProgressBar current={currentIndex} total={mockCards.length} />
            </div>

            <CardStack
              cards={mockCards}
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
