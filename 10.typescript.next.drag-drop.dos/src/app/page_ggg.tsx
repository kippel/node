"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Word = {
  id: number;
  label: string;
};

const words: Word[] = [
  { id: 1, label: "pa" },
  { id: 2, label: "po" },
  { id: 3, label: "casa" },
  { id: 4, label: "red" },
];

const correctItems = [
  { id: 2, label: "po" },
  { id: 3, label: "casa" },
];

export default function DragAndDropFill() {
  const [availableWords, setAvailableWords] = useState<Word[]>(words);
  const [droppedWords, setDroppedWords] = useState<(Word | null)[]>([null, null]);

  const handleDrop = (index: number, word: Word) => {
    // Prevent duplicate drops
    if (droppedWords.some(w => w?.id === word.id)) return;

    const newDropped = [...droppedWords];
    newDropped[index] = word;

    setDroppedWords(newDropped);
    setAvailableWords(prev => prev.filter(w => w.id !== word.id));
  };

  const handleReset = () => {
    setDroppedWords([null, null]);
    setAvailableWords(words);
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <div className="text-xl font-medium">
        This blank has{" "}
        <DropZone
          index={0}
          onDrop={handleDrop}
          word={droppedWords[0]}
        />{" "}
        correct{" "}
        <DropZone
          index={1}
          onDrop={handleDrop}
          word={droppedWords[1]}
        />{" "}
        answers.
      </div>

      <div className="flex gap-4 flex-wrap">
        {availableWords.map(word => (
          <DraggableWord key={word.id} word={word} />
        ))}
      </div>

      <Button onClick={handleReset}>Reset</Button>
    </div>
  );
}

function DraggableWord({ word }: { word: Word }) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("application/json", JSON.stringify(word));
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="px-4 py-2 bg-blue-100 rounded cursor-grab shadow"
    >
      {word.label}
    </div>
  );
}

function DropZone({
  index,
  onDrop,
  word,
}: {
  index: number;
  onDrop: (index: number, word: Word) => void;
  word: Word | null;
}) {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("application/json");
    const droppedWord: Word = JSON.parse(data);
    onDrop(index, droppedWord);
  };

  return (
    <span
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="inline-block min-w-[60px] border-b-2 border-black px-2 mx-1 text-center"
    >
      {word ? word.label : <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>}
    </span>
  );
}