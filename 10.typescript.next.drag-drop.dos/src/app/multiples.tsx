"use client";

import { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { Button } from "@/components/ui/button";

type Letter = {
  id: string;
  label: string;
};

type WordBlank = {
  id: string;
  suffix: string;
  correctLetter: string;
};

const letters: Letter[] = [
  { id: "a", label: "A" },
  { id: "b", label: "B" },
  { id: "c", label: "C" },
  { id: "d", label: "D" },
  { id: "m", label: "M" },
  { id: "s", label: "S" },
];

const blanks: WordBlank[] = [
  { id: "blank1", suffix: "at", correctLetter: "C" }, // Cat
  { id: "blank2", suffix: "og", correctLetter: "D" }, // Dog
  { id: "blank3", suffix: "ar", correctLetter: "C" }, // Car
  { id: "blank4", suffix: "an", correctLetter: "M" }, // Man
  { id: "blank5", suffix: "un", correctLetter: "S" }, // Sun
];

export default function MultiDragDrop() {
  const [droppedLetters, setDroppedLetters] = useState<Record<string, Letter | null>>(
    () => Object.fromEntries(blanks.map((b) => [b.id, null]))
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active) {
      const letter = letters.find((l) => l.id === active.id.toLowerCase());
      if (letter) {
        setDroppedLetters((prev) => ({
          ...prev,
          [over.id]: letter,
        }));
      }
    }
  };

  const checkAnswers = () => {
    const allCorrect = blanks.every((b) => {
      const dropped = droppedLetters[b.id];
      return dropped?.label.toUpperCase() === b.correctLetter;
    });
    alert(allCorrect ? "✅ Totes les respostes són correctes!" : "❌ Algunes respostes són incorrectes.");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Arrossega la lletra correcta</h1>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {blanks.map((blank) => (
            <DropZone
              key={blank.id}
              id={blank.id}
              dropped={droppedLetters[blank.id]}
              suffix={blank.suffix}
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-4 mt-6 justify-center">
          {letters.map((letter) => (
            <DraggableLetter key={letter.id} letter={letter} />
          ))}
        </div>
      </DndContext>

      <Button onClick={checkAnswers}>This blank has correct answers</Button>
    </div>
  );
}

function DropZone({
  id,
  dropped,
  suffix,
}: {
  id: string;
  dropped: Letter | null;
  suffix: string;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`w-32 h-20 flex items-center justify-center border-2 border-dashed rounded-xl transition ${
        isOver ? "border-green-500 bg-green-100 dark:bg-green-900" : "border-muted"
      }`}
    >
      <span className="text-xl font-medium">
        {dropped ? dropped.label : "_"}
        {suffix}
      </span>
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