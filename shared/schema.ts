import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const decks = pgTable("decks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  cardCount: integer("card_count").notNull().default(0),
});

export const flashcards = pgTable("flashcards", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  deckId: varchar("deck_id").notNull(),
  front: text("front").notNull(),
  back: text("back").notNull(),
  order: integer("order").notNull(),
});

export const insertDeckSchema = createInsertSchema(decks).omit({
  id: true,
  cardCount: true,
});

export const insertFlashcardSchema = createInsertSchema(flashcards).omit({
  id: true,
});

export type InsertDeck = z.infer<typeof insertDeckSchema>;
export type Deck = typeof decks.$inferSelect;
export type InsertFlashcard = z.infer<typeof insertFlashcardSchema>;
export type Flashcard = typeof flashcards.$inferSelect;
