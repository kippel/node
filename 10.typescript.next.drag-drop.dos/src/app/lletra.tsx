"use client";

import { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { Button } from "@/components/ui/button";

type Letter = {
  id: string;
  label: string;
};

const letters: Letter[] = [
  { id: "a", label: "A" },
  { id: "b", label: "B" },
  { id: "c", label: "C" },
];

export default function AbcDragDrop() {
  const [droppedLetter, setDroppedLetter] = useState<Letter | null>(null);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active) {
      const letter = letters.find((l) => l.id === active.id);
      if (letter) setDroppedLetter(letter);
    }
  };

  const checkAnswer = () => {
    if (droppedLetter?.id.toLowerCase() === "c") {
      alert("✅ Correcte! Has format la paraula 'cat'");
    } else {
      alert("❌ Incorrecte. Torna-ho a provar.");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 space-y-6">
      <h1 className="text-xl font-semibold">Completa la paraula: _at</h1>

      <DndContext onDragEnd={handleDragEnd}>
        <DropZone>
          {droppedLetter ? (
            <span className="text-2xl font-bold text-primary">
              {droppedLetter.label}
            </span>
          ) : (
            <span className="text-muted-foreground">Arrossega aquí una lletra</span>
          )}
        </DropZone>

        <div className="flex gap-4 mt-4">
          {letters.map((letter) => (
            <DraggableLetter key={letter.id} letter={letter} />
          ))}
        </div>
      </DndContext>

      <Button onClick={checkAnswer}>This blank has correct answers</Button>
    </div>
  );
}

function DropZone({ children }: { children?: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id: "dropzone" });

  return (
    <div
      ref={setNodeRef}
      className={`w-32 h-20 flex items-center justify-center border-2 border-dashed rounded-lg transition ${
        isOver ? "border-green-500 bg-green-100 dark:bg-green-900" : "border-muted"
      }`}
    >
      {children}
    </div>
  );
}

function DraggableLetter({ letter }: { letter: Letter }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: letter.id,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`cursor-grab px-4 py-2 text-lg font-semibold bg-muted rounded-md shadow ${
        isDragging ? "opacity-50" : ""
      }`}
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
      }}
    >
      {letter.label}
    </div>
  );
}