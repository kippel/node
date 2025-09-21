import DragDropPage from "@/components/DraggableList";

export default function Home() {
  return (
    <main style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
        Drag & Drop amb @dnd-kit/core
      </h1>
      <DragDropPage />
    </main>
  );
}
