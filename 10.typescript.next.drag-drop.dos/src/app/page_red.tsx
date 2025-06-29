"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Word = {
  id: number;
  label: string;
};

const allWords: Word[] = [
  { id: 1, label: "pa" },
  { id: 2, label: "po" },
  { id: 3, label: "casa" },
  { id: 4, label: "red" },
];

const correctAnswers: Word[] = [
  { id: 2, label: "po" },
  { id: 3, label: "casa" },
];

export default function Page() {
  const [availableWords, setAvailableWords] = useState<Word[]>(allWords);
  const [droppedWords, setDroppedWords] = useState<(Word | null)[]>([null, null]);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleDrop = (index: number, word: Word) => {
    if (droppedWords.find(w => w?.id === word.id)) return;

    const newDropped = [...droppedWords];
    newDropped[index] = word;
    setDroppedWords(newDropped);
    setAvailableWords(prev => prev.filter(w => w.id !== word.id));
    setFeedback(null);
  };

  const handleCheck = () => {
    const correct = droppedWords.every(
      (word, index) => word?.id === correctAnswers[index].id
    );
    setFeedback(correct ? "✅ Correct!" : "❌ Try again.");
  };

  const handleReset = () => {
    setDroppedWords([null, null]);
    setAvailableWords(allWords);
    setFeedback(null);
  };

  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-semibold">
        Fill in the blank. Drag items from the box to the blanks below.
      </h1>

      <p className="text-lg font-medium">
        This blank has{" "}
        <DropZone index={0} word={droppedWords[0]} onDrop={handleDrop} /> correct{" "}
        <DropZone index={1} word={droppedWords[1]} onDrop={handleDrop} /> answers.
      </p>

      <div className="flex flex-wrap gap-4">
        {availableWords.map((word) => (
          <DraggableWord key={word.id} word={word} />
        ))}
      </div>

      <div className="flex gap-4">
        <Button onClick={handleCheck}>Check Answer</Button>
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>

      {feedback && <p className="text-lg font-bold">{feedback}</p>}
    </main>
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
      className="px-4 py-2 bg-blue-100 rounded shadow cursor-grab"
    >
      {word.label}
    </div>
  );
}

function DropZone({
  index,
  word,
  onDrop,
}: {
  index: number;
  word: Word | null;
  onDrop: (index: number, word: Word) => void;
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
      className="inline-block min-w-[60px] border-b-2 border-black text-center mx-1 px-2 text-lg"
    >
      {word ? word.label : "_____"}
    </span>
  );
}