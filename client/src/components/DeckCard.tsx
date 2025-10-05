import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Play } from "lucide-react";
import type { Deck } from "@shared/schema";

interface DeckCardProps {
  deck: Deck;
  onStudy: (deckId: string) => void;
}

export default function DeckCard({ deck, onStudy }: DeckCardProps) {
  return (
    <Card className="hover-elevate transition-all" data-testid={`card-deck-${deck.id}`}>
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg truncate" data-testid={`text-deck-title-${deck.id}`}>
            {deck.title}
          </h3>
        </div>
        <BookOpen className="w-5 h-5 text-muted-foreground flex-shrink-0" />
      </CardHeader>

      <CardContent className="pb-4">
        {deck.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {deck.description}
          </p>
        )}
        <Badge variant="secondary" data-testid={`badge-card-count-${deck.id}`}>
          {deck.cardCount} {deck.cardCount === 1 ? "card" : "cards"}
        </Badge>
      </CardContent>

      <CardFooter>
        <Button
          onClick={() => onStudy(deck.id)}
          className="w-full"
          disabled={deck.cardCount === 0}
          data-testid={`button-study-${deck.id}`}
        >
          <Play className="w-4 h-4 mr-2" />
          Study Now
        </Button>
      </CardFooter>
    </Card>
  );
}
