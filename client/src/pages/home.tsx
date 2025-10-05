import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Menu, Settings, User } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import DeckCard from "@/components/DeckCard";
import CreateDeckModal from "@/components/CreateDeckModal";
import EmptyState from "@/components/EmptyState";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState } from "react";
import type { Deck, InsertDeck, InsertFlashcard } from "@shared/schema";

export default function HomePage() {
  const [, setLocation] = useLocation();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { toast } = useToast();

  const { data: decks = [], isLoading } = useQuery<Deck[]>({
    queryKey: ["/api/decks"],
  });

  const createDeckMutation = useMutation({
    mutationFn: async (data: { deck: InsertDeck; cards: Omit<InsertFlashcard, "deckId">[] }) => {
      const deckRes = await apiRequest("POST", "/api/decks", data.deck);
      const deck = await deckRes.json() as Deck;

      for (const card of data.cards) {
        await apiRequest("POST", "/api/flashcards", {
          ...card,
          deckId: deck.id,
        });
      }

      return deck;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/decks"] });
      toast({
        title: "Success",
        description: "Deck created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create deck",
        variant: "destructive",
      });
    },
  });

  const handleCreateDeck = (
    deck: InsertDeck,
    cards: Omit<InsertFlashcard, "deckId">[]
  ) => {
    createDeckMutation.mutate({ deck, cards });
  };

  const handleStudy = (deckId: string) => {
    setLocation(`/study/${deckId}`);
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

          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="button-menu">
                  <Menu className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => setLocation("/profile")}
                  data-testid="menu-profile"
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLocation("/settings")}
                  data-testid="menu-settings"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setIsCreateModalOpen(true)}
                  data-testid="menu-create-deck"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Deck
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              onClick={() => setIsCreateModalOpen(true)}
              data-testid="button-create-deck"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Deck
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading decks...</p>
          </div>
        ) : decks.length === 0 ? (
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
