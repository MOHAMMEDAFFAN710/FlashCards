import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDeckSchema, insertFlashcardSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all decks
  app.get("/api/decks", async (_req, res) => {
    try {
      const decks = await storage.getDecks();
      res.json(decks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch decks" });
    }
  });

  // Get a specific deck
  app.get("/api/decks/:id", async (req, res) => {
    try {
      const deck = await storage.getDeck(req.params.id);
      if (!deck) {
        return res.status(404).json({ error: "Deck not found" });
      }
      res.json(deck);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch deck" });
    }
  });

  // Create a new deck
  app.post("/api/decks", async (req, res) => {
    try {
      const validatedData = insertDeckSchema.parse(req.body);
      const deck = await storage.createDeck(validatedData);
      res.status(201).json(deck);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create deck" });
    }
  });

  // Delete a deck
  app.delete("/api/decks/:id", async (req, res) => {
    try {
      await storage.deleteDeck(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete deck" });
    }
  });

  // Get flashcards for a deck
  app.get("/api/decks/:deckId/flashcards", async (req, res) => {
    try {
      const flashcards = await storage.getFlashcards(req.params.deckId);
      res.json(flashcards);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch flashcards" });
    }
  });

  // Create a new flashcard
  app.post("/api/flashcards", async (req, res) => {
    try {
      const validatedData = insertFlashcardSchema.parse(req.body);
      const flashcard = await storage.createFlashcard(validatedData);
      res.status(201).json(flashcard);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create flashcard" });
    }
  });

  // Delete a flashcard
  app.delete("/api/flashcards/:id", async (req, res) => {
    try {
      await storage.deleteFlashcard(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete flashcard" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
