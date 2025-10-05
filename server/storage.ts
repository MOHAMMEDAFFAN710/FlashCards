import {
  decks,
  flashcards,
  type Deck,
  type InsertDeck,
  type Flashcard,
  type InsertFlashcard,
} from "@shared/schema";
import { db } from "./db";
import { eq, sql } from "drizzle-orm";

export interface IStorage {
  getDecks(): Promise<Deck[]>;
  getDeck(id: string): Promise<Deck | undefined>;
  createDeck(deck: InsertDeck): Promise<Deck>;
  deleteDeck(id: string): Promise<void>;
  getFlashcards(deckId: string): Promise<Flashcard[]>;
  createFlashcard(flashcard: InsertFlashcard): Promise<Flashcard>;
  deleteFlashcard(id: string): Promise<void>;
  updateDeckCardCount(deckId: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getDecks(): Promise<Deck[]> {
    return await db.select().from(decks);
  }

  async getDeck(id: string): Promise<Deck | undefined> {
    const [deck] = await db.select().from(decks).where(eq(decks.id, id));
    return deck || undefined;
  }

  async createDeck(insertDeck: InsertDeck): Promise<Deck> {
    const [deck] = await db
      .insert(decks)
      .values({ ...insertDeck, cardCount: 0 })
      .returning();
    return deck;
  }

  async deleteDeck(id: string): Promise<void> {
    await db.delete(flashcards).where(eq(flashcards.deckId, id));
    await db.delete(decks).where(eq(decks.id, id));
  }

  async getFlashcards(deckId: string): Promise<Flashcard[]> {
    return await db
      .select()
      .from(flashcards)
      .where(eq(flashcards.deckId, deckId))
      .orderBy(flashcards.order);
  }

  async createFlashcard(insertFlashcard: InsertFlashcard): Promise<Flashcard> {
    const [flashcard] = await db
      .insert(flashcards)
      .values(insertFlashcard)
      .returning();

    await this.updateDeckCardCount(insertFlashcard.deckId);
    return flashcard;
  }

  async deleteFlashcard(id: string): Promise<void> {
    const [flashcard] = await db
      .select()
      .from(flashcards)
      .where(eq(flashcards.id, id));

    if (flashcard) {
      await db.delete(flashcards).where(eq(flashcards.id, id));
      await this.updateDeckCardCount(flashcard.deckId);
    }
  }

  async updateDeckCardCount(deckId: string): Promise<void> {
    const cards = await this.getFlashcards(deckId);
    await db
      .update(decks)
      .set({ cardCount: cards.length })
      .where(eq(decks.id, deckId));
  }
}

export const storage = new DatabaseStorage();
