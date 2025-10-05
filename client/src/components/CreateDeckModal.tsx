import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2 } from "lucide-react";
import type { InsertDeck, InsertFlashcard } from "@shared/schema";

interface CreateDeckModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateDeck: (deck: InsertDeck, cards: Omit<InsertFlashcard, "deckId">[]) => void;
}

export default function CreateDeckModal({
  open,
  onOpenChange,
  onCreateDeck,
}: CreateDeckModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cards, setCards] = useState<Array<{ front: string; back: string }>>([
    { front: "", back: "" },
  ]);
  const [pastedText, setPastedText] = useState("");

  const handleAddCard = () => {
    setCards([...cards, { front: "", back: "" }]);
  };

  const handleRemoveCard = (index: number) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  const handleCardChange = (
    index: number,
    field: "front" | "back",
    value: string
  ) => {
    const newCards = [...cards];
    newCards[index][field] = value;
    setCards(newCards);
  };

  const handleParseText = () => {
    const lines = pastedText.split("\n").filter((line) => line.trim());
    const parsedCards: Array<{ front: string; back: string }> = [];

    for (let i = 0; i < lines.length; i += 2) {
      if (lines[i] && lines[i + 1]) {
        parsedCards.push({
          front: lines[i].trim(),
          back: lines[i + 1].trim(),
        });
      }
    }

    if (parsedCards.length > 0) {
      setCards(parsedCards);
    }
  };

  const handleSubmit = () => {
    if (!title.trim() || cards.length === 0) return;

    const validCards = cards
      .filter((card) => card.front.trim() && card.back.trim())
      .map((card, index) => ({
        front: card.front.trim(),
        back: card.back.trim(),
        order: index,
      }));

    if (validCards.length === 0) return;

    onCreateDeck(
      { title: title.trim(), description: description.trim() || null },
      validCards
    );

    setTitle("");
    setDescription("");
    setCards([{ front: "", back: "" }]);
    setPastedText("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle data-testid="text-modal-title">Create New Deck</DialogTitle>
          <DialogDescription>
            Add flashcards manually or paste AI-generated content
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 flex-1 overflow-auto">
          <div className="space-y-2">
            <Label htmlFor="title">Deck Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Biology Final Exam"
              data-testid="input-deck-title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of this deck"
              rows={2}
              data-testid="input-deck-description"
            />
          </div>

          <Tabs defaultValue="manual" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manual" data-testid="tab-manual">
                Manual Entry
              </TabsTrigger>
              <TabsTrigger value="paste" data-testid="tab-paste">
                Paste from AI
              </TabsTrigger>
            </TabsList>

            <TabsContent value="manual" className="space-y-4 mt-4">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="space-y-3 p-4 rounded-lg border"
                  data-testid={`container-card-${index}`}
                >
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">
                      Card {index + 1}
                    </Label>
                    {cards.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveCard(index)}
                        data-testid={`button-remove-card-${index}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <Input
                    value={card.front}
                    onChange={(e) =>
                      handleCardChange(index, "front", e.target.value)
                    }
                    placeholder="Front (Question/Term)"
                    data-testid={`input-card-front-${index}`}
                  />
                  <Textarea
                    value={card.back}
                    onChange={(e) =>
                      handleCardChange(index, "back", e.target.value)
                    }
                    placeholder="Back (Answer/Definition)"
                    rows={2}
                    data-testid={`input-card-back-${index}`}
                  />
                </div>
              ))}
              <Button
                variant="outline"
                onClick={handleAddCard}
                className="w-full"
                data-testid="button-add-card"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Card
              </Button>
            </TabsContent>

            <TabsContent value="paste" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="paste-text">Paste AI-Generated Content</Label>
                <Textarea
                  id="paste-text"
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                  placeholder="Paste content here. Format: Question on one line, Answer on the next line, repeat..."
                  rows={12}
                  className="font-mono text-sm"
                  data-testid="input-paste-content"
                />
                <p className="text-xs text-muted-foreground">
                  Tip: Format should be alternating lines - question, answer,
                  question, answer...
                </p>
              </div>
              <Button
                variant="secondary"
                onClick={handleParseText}
                className="w-full"
                data-testid="button-parse-text"
              >
                Parse Content into Cards ({Math.floor(pastedText.split("\n").filter(l => l.trim()).length / 2)} detected)
              </Button>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            data-testid="button-cancel"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!title.trim() || cards.every(c => !c.front.trim() || !c.back.trim())}
            data-testid="button-create-deck"
          >
            Create Deck
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
