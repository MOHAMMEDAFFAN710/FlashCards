import EmptyState from "../EmptyState";

export default function EmptyStateExample() {
  return (
    <div className="min-h-screen bg-background p-8">
      <EmptyState
        type="decks"
        onAction={() => console.log("Create deck clicked")}
      />
    </div>
  );
}
