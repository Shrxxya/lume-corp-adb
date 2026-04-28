"use client";

import { useDroppable } from "@dnd-kit/core";
import { useCanvasStore } from "@/store/useCanvasStore";
import { CanvasItem } from "./CanvasItem";
import { forwardRef } from "react";

export const Canvas = forwardRef(function Canvas(_, ref) {
  const { setNodeRef } = useDroppable({ id: "canvas" });
  const items = useCanvasStore((s) => s.items);

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        if (ref) ref.current = node;
      }}
      className="w-full h-full relative bg-black/40 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:20px_20px]" />

      {items.map((item) => (
        <CanvasItem key={item.id} item={item} />
      ))}
    </div>
  );
});