import { motion } from "framer-motion";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import type { Flashcard } from "@shared/schema";

interface FlashCardProps {
  card: Flashcard;
  isTop: boolean;
  index: number;
  totalCards: number;
  onSwipe?: (direction: "left" | "right") => void;
  isDragging?: boolean;
}

export default function FlashCard({
  card,
  isTop,
  index,
  totalCards,
  onSwipe,
  isDragging,
}: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleTap = () => {
    if (isTop && !isDragging) {
      setIsFlipped(!isFlipped);
    }
  };

  const scale = isTop ? 1 : 1 - (index * 0.05);
  const yOffset = isTop ? 0 : index * 8;
  const opacity = isTop ? 1 : Math.max(0.4, 1 - (index * 0.3));

  return (
    <motion.div
      className="absolute w-full"
      style={{
        zIndex: totalCards - index,
      }}
      initial={{ scale, y: yOffset, opacity }}
      animate={{ scale, y: yOffset, opacity }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      data-testid={`card-flashcard-${card.id}`}
    >
      <motion.div
        className="relative h-[500px] cursor-pointer perspective-1000"
        onClick={handleTap}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <Card className="absolute inset-0 flex items-center justify-center p-12 backface-hidden rounded-3xl shadow-2xl">
          <div className="text-center">
            <p className="text-3xl font-semibold leading-relaxed">
              {card.front}
            </p>
            {isTop && (
              <p className="mt-6 text-sm text-muted-foreground">
                Tap to flip
              </p>
            )}
          </div>
        </Card>

        <Card
          className="absolute inset-0 flex items-center justify-center p-12 backface-hidden rounded-3xl shadow-2xl"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="text-center">
            <p className="text-lg leading-relaxed">
              {card.back}
            </p>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
