"use client";

import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "@/components/ui/button";

type Word = {
  id: number;
  label: string;
};

const words: Word[] = [
  { id: 1, label: "pa" },
  { id: 2, label: "po" },
  { id: 3, label: "red"}
];

const correctAnswer = { id: 2, label: "po" };

function DraggableWord({ word }: { word: Word }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "WORD",
    item: word,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`px-4 py-2 bg-blue-500 text-white rounded-xl cursor-move ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
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
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "WORD",
    drop: (item: Word) => onDropWord(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <span
      ref={drop}
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

  const handleDrop = (word: Word) => {
    setDroppedWord(word);
    setChecked(false);
  };

  const handleCheck = () => {
    setChecked(true);
  };

  const isCorrect = droppedWord?.id === correctAnswer.id;
  //const checkID = (answer) => answer.id === droppedWord?.id;
  //const isCorrect = correctAnswer.some(checkID)

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6 max-w-lg mx-auto space-y-6">
        <h1 className="text-xl font-semibold">
          Fill in the blank by dragging a word:
        </h1>

        <p className="text-lg">
          This blank has
          <BlankDropArea droppedWord={droppedWord} onDropWord={handleDrop} />
          correct answers.
         
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
    </DndProvider>
  );
}