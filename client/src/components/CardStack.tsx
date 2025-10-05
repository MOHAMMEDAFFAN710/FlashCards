import { useState } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import FlashCard from "./FlashCard";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Flashcard } from "@shared/schema";

interface CardStackProps {
  cards: Flashcard[];
  onComplete?: () => void;
}

export default function CardStack({ cards, onComplete }: CardStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-10, 0, 10]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    setIsDragging(false);
    const swipeThreshold = 100;

    if (info.offset.x > swipeThreshold) {
      handleSwipe("right");
    } else if (info.offset.x < -swipeThreshold) {
      handleSwipe("left");
    } else {
      x.set(0);
    }
  };

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "right" && currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (direction === "left" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
    
    if (currentIndex === cards.length - 1 && direction === "right" && onComplete) {
      setTimeout(() => onComplete(), 300);
    }

    x.set(0);
  };

  const visibleCards = cards.slice(currentIndex, currentIndex + 3);
  const currentCard = cards[currentIndex];

  if (!currentCard) {
    return null;
  }

  return (
    <div className="relative h-[600px] max-w-2xl mx-auto">
      <motion.div
        className="absolute w-full"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        style={{ x, rotate }}
        data-testid="container-card-stack"
      >
        {visibleCards.map((card, idx) => (
          <FlashCard
            key={card.id}
            card={card}
            isTop={idx === 0}
            index={idx}
            totalCards={visibleCards.length}
            isDragging={isDragging}
          />
        ))}
      </motion.div>

      {isDragging && Math.abs(x.get()) > 50 && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {x.get() > 0 ? (
            <ChevronRight className="w-24 h-24 text-primary opacity-30" />
          ) : (
            <ChevronLeft className="w-24 h-24 text-primary opacity-30" />
          )}
        </motion.div>
      )}
    </div>
  );
}
