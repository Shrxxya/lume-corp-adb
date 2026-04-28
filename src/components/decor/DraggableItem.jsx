"use client";

import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/components/utils.js";;

export function DraggableItem({ item }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
    data: item,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
      }}
      className={cn(
        "relative cursor-grab active:cursor-grabbing",
        "p-4 rounded-xl",
        "bg-white/10 backdrop-blur-lg border border-white/20",
        "shadow-lg shadow-black/20",
        "transition-all duration-300",
        "hover:bg-white/20 hover:scale-[1.03] hover:shadow-xl"
      )}
    >
      <div className="flex items-center gap-2">
        {item.icon}
        <span>{item.label}</span>
      </div>
    </div>
  );
}