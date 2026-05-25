"use client";

import { useState } from "react";
import { DraggableItem } from "./DraggableItem";
import { Monitor, Presentation, Projector, Plus } from "lucide-react";
import { cn } from "@/components/utils.js";
import { useEventStore } from "@/store/useEventStore";

const DEFAULT_ITEMS = [
  { id: "led", label: "LED Screen", icon: <Monitor size={18} /> },
  { id: "stage", label: "Stage", icon: <Presentation size={18} /> },
  { id: "projector", label: "Projector", icon: <Projector size={18} /> },
];

export function Palette() {
  //const [items, setItems] = useState(DEFAULT_ITEMS);
  const items = useEventStore((state) => state.paletteItems);
  const addPaletteItem = useEventStore((state) => state.addPaletteItem);

  const [input, setInput] = useState("");

  function addCustomItem() {
    if (!input.trim()) return;

    const newItem = {
      id: input.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now(),
      label: input,
      icon: <Plus size={18} />,
    };

    //setItems((prev) => [...prev, newItem]);
    addPaletteItem(newItem);
    setInput("");
  }

  return (
    <div className="p-4 space-y-4">

      {/* Input box */}
      <div className="flex gap-2 items-end">

        {/* INPUT WRAPPER */}
        <div className="relative flex-1 group">

          <input
            value={input}
            id="draggableItemInput"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addCustomItem();
              }
            }}
            placeholder="Add custom item..."
            className={cn(
              "w-full px-3 py-2 rounded-lg",
              //"bg-white/10 border border-white/20",
              "outline-none transition-colors duration-300",
              "focus:border-white/40",
              "text-black placeholder:text-black/40"
            )}
          />

          {/* Animated underline */}
          <div
            className={cn(
              "absolute left-0 bottom-0 h-[2px] w-full",
              "bg-[#58644B]",
              "origin-left scale-x-0",
              "transition-transform duration-300",
              "group-focus-within:scale-x-100"
            )}
          />

        </div>

        {/* ADD BUTTON */}
        <button
          onClick={addCustomItem}
          className="px-3 py-2 bg-[#e7e7df]/20 rounded-lg hover:bg-[#e7e7df]/30 cursor-pointer transition"
        >
          <Plus />
        </button>

      </div>

      {/* Items */}
      {items.map((item) => (
        <DraggableItem key={item.id} item={item} />
      ))}

    </div>
  );
}