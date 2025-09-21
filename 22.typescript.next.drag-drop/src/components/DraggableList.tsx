"use client";

import { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { Button } from "@/components/ui/button";

type Word = {
  id: number;
  label: string;
};

const words: Word[] = [
  { id: 1, label: "pa" },
  { id: 2, label: "po" },
  { id: 3, label: "red" },
];

const correctAnswer = { id: 1, label: "po" };

function DraggableWord({ word }: { word: Word }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: String(word.id),
      data: word,
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="px-4 py-2 bg-blue-500 text-white rounded-xl cursor-move"
    >
      {word.label}
    </div>
  );
}

function BlankDropArea({
  onDropWord,
  droppedWord,
}: {
  onDropWord: (word: Word) => void;
  droppedWord: Word | null;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: "blank",
  });

  return (
    <span
      ref={setNodeRef}
      className={`inline-block min-w-[40px] border-b-2 border-gray-400 px-2 text-center mx-1 ${
        isOver ? "bg-yellow-100" : ""
      }`}
    >
      {droppedWord ? (
        <span className="font-semibold">{droppedWord.label}</span>
      ) : (
        <span className="inline-block min-w-[40px]">&nbsp;</span>
      )}
    </span>
  );
}

export default function DragDropPage() {
  const [droppedWord, setDroppedWord] = useState<Word | null>(null);
  const [checked, setChecked] = useState(false);

  const handleDragEnd = (event: any) => {
    if (event.over && event.active.data.current) {
      setDroppedWord(event.active.data.current as Word);
      setChecked(false);
    }
  };

  const handleCheck = () => {
    setChecked(true);
  };

  const isCorrect = droppedWord?.id === correctAnswer.id;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="p-6 max-w-lg mx-auto space-y-6">
       
       

        <p className="text-lg">
          
          <BlankDropArea droppedWord={droppedWord} onDropWord={setDroppedWord} />
          
        </p>

        <div className="flex gap-4">
          {words.map((word) => (
            <DraggableWord key={word.id} word={word} />
          ))}
        </div>

        <Button onClick={handleCheck}>Check Answer</Button>

        {checked && (
          <p
            className={`text-sm font-medium ${
              isCorrect ? "text-green-600" : "text-red-600"
            }`}
          >
            {isCorrect ? "✅ Correct!" : "❌ Try again."}
          </p>
        )}
      </div>
    </DndContext>
  );
}
