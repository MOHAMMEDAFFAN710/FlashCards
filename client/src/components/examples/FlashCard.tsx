import FlashCard from "../FlashCard";

export default function FlashCardExample() {
  const sampleCard = {
    id: "1",
    deckId: "deck-1",
    front: "What is the capital of France?",
    back: "Paris - a major European city known for the Eiffel Tower, museums, and art.",
    order: 0,
  };

  return (
    <div className="relative h-[600px] max-w-2xl mx-auto">
      <FlashCard
        card={sampleCard}
        isTop={true}
        index={0}
        totalCards={3}
      />
    </div>
  );
}
