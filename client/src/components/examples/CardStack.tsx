import CardStack from "../CardStack";

export default function CardStackExample() {
  const sampleCards = [
    {
      id: "1",
      deckId: "deck-1",
      front: "What is the capital of France?",
      back: "Paris - a major European city known for the Eiffel Tower, museums, and art.",
      order: 0,
    },
    {
      id: "2",
      deckId: "deck-1",
      front: "What is photosynthesis?",
      back: "The process by which plants convert light energy into chemical energy (glucose) using carbon dioxide and water.",
      order: 1,
    },
    {
      id: "3",
      deckId: "deck-1",
      front: "Who wrote Romeo and Juliet?",
      back: "William Shakespeare, an English playwright and poet from the late 16th century.",
      order: 2,
    },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <CardStack cards={sampleCards} />
    </div>
  );
}
