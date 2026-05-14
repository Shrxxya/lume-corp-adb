"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { useCanvasStore } from "@/store/useCanvasStore";
import { cn } from "@/components/utils";

export function CanvasItem({ item }) {
  const updateItem = useCanvasStore((s) => s.updateItem);
  const removeItem = useCanvasStore((s) => s.removeItem);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
  });

  const [resizing, setResizing] = useState(false);
  const [rotating, setRotating] = useState(false);

  function handleResize(e) {
    e.stopPropagation();
    setResizing(true);

    const startX = e.clientX;
    const startY = e.clientY;

    const startWidth = item.width;
    const startHeight = item.height;

    function onMove(ev) {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;

      updateItem(item.id, {
        width: Math.max(40, startWidth + dx),
        height: Math.max(30, startHeight + dy),
      });
    }

    function onUp() {
      setResizing(false);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }

  function handleRotate(e) {
    e.stopPropagation();
    setRotating(true);

    const rect = e.target.parentElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    function onMove(ev) {
      const angle =
        Math.atan2(ev.clientY - centerY, ev.clientX - centerX) *
        (180 / Math.PI);

      updateItem(item.id, { rotation: angle });
    }

    function onUp() {
      setRotating(false);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        "group",
        "absolute cursor-move",
        "bg-white/20 backdrop-blur-md border border-white/30",
        "rounded-lg text-white text-sm",
        "flex items-center justify-center",
        "shadow-md"
      )}
      style={{
        left: item.x,
        top: item.y,
        width: item.width,
        height: item.height,
        transform: `
          translate(${transform?.x || 0}px, ${transform?.y || 0}px)
          rotate(${item.rotation}deg)
        `,
      }}
    >
      {item.type}

      {/* Resize handle */}
      <div
        onMouseDown={handleResize}
        className="absolute bottom-0 right-0 w-3 h-3 bg-white cursor-se-resize"
      />

      {/* Rotate handle */}
      <div
        onMouseDown={handleRotate}
        className="absolute -top-4 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-400 rounded-full cursor-pointer"
      />
      {/* Delete button */}
      <button
        onPointerDown={(e) => {
          e.stopPropagation();
          removeItem(item.id);
        }}
        className="
          absolute -top-2 -right-2
          w-5 h-5 rounded-full
          bg-red-500 text-white
          flex items-center justify-center
          opacity-0 hover:opacity-100
          group-hover:opacity-100
          transition
          z-50
        "
      >
        <X size={12} />
      </button>
    </div>
  );
}