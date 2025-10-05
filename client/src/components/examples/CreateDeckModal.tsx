import { useState } from "react";
import CreateDeckModal from "../CreateDeckModal";
import { Button } from "@/components/ui/button";

export default function CreateDeckModalExample() {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background p-8">
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <CreateDeckModal
        open={open}
        onOpenChange={setOpen}
        onCreateDeck={(deck, cards) => {
          console.log("Created deck:", deck);
          console.log("With cards:", cards);
        }}
      />
    </div>
  );
}
