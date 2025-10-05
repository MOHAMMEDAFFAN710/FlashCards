import {
  type Deck,
  type InsertDeck,
  type Flashcard,
  type InsertFlashcard,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getDecks(): Promise<Deck[]>;
  getDeck(id: string): Promise<Deck | undefined>;
  createDeck(deck: InsertDeck): Promise<Deck>;
  deleteDeck(id: string): Promise<void>;
  getFlashcards(deckId: string): Promise<Flashcard[]>;
  createFlashcard(flashcard: InsertFlashcard): Promise<Flashcard>;
  deleteFlashcard(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private decks: Map<string, Deck>;
  private flashcards: Map<string, Flashcard>;

  constructor() {
    this.decks = new Map();
    this.flashcards = new Map();
  }

  async getDecks(): Promise<Deck[]> {
    return Array.from(this.decks.values());
  }

  async getDeck(id: string): Promise<Deck | undefined> {
    return this.decks.get(id);
  }

  async createDeck(insertDeck: InsertDeck): Promise<Deck> {
    const id = randomUUID();
    const deck: Deck = {
      id,
      title: insertDeck.title,
      description: insertDeck.description ?? null,
      cardCount: 0,
    };
    this.decks.set(id, deck);
    return deck;
  }

  async deleteDeck(id: string): Promise<void> {
    this.decks.delete(id);
    const flashcards = Array.from(this.flashcards.values()).filter(
      (f) => f.deckId === id
    );
    flashcards.forEach((f) => this.flashcards.delete(f.id));
  }

  async getFlashcards(deckId: string): Promise<Flashcard[]> {
    return Array.from(this.flashcards.values())
      .filter((f) => f.deckId === deckId)
      .sort((a, b) => a.order - b.order);
  }

  async createFlashcard(insertFlashcard: InsertFlashcard): Promise<Flashcard> {
    const id = randomUUID();
    const flashcard: Flashcard = { ...insertFlashcard, id };
    this.flashcards.set(id, flashcard);

    const deck = this.decks.get(insertFlashcard.deckId);
    if (deck) {
      deck.cardCount += 1;
      this.decks.set(deck.id, deck);
    }

    return flashcard;
  }

  async deleteFlashcard(id: string): Promise<void> {
    const flashcard = this.flashcards.get(id);
    if (flashcard) {
      this.flashcards.delete(id);
      const deck = this.decks.get(flashcard.deckId);
      if (deck) {
        deck.cardCount = Math.max(0, deck.cardCount - 1);
        this.decks.set(deck.id, deck);
      }
    }
  }
}

export const storage = new MemStorage();
