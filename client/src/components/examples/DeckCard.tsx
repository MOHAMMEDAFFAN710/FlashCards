import DeckCard from "../DeckCard";

export default function DeckCardExample() {
  const sampleDeck = {
    id: "deck-1",
    title: "Biology Final Exam",
    description: "Key concepts for cellular biology, genetics, and evolution",
    cardCount: 45,
  };

  return (
    <div className="max-w-sm p-8 bg-background">
      <DeckCard
        deck={sampleDeck}
        onStudy={(id) => console.log("Study deck:", id)}
      />
    </div>
  );
}
