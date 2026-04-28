"use client";

import { useState } from "react";
import { DraggableItem } from "./DraggableItem";
import { Monitor, Presentation, Projector, Plus } from "lucide-react";
import { cn } from "@/components/utils.js";

const DEFAULT_ITEMS = [
  { id: "led", label: "LED Screen", icon: <Monitor size={18} /> },
  { id: "stage", label: "Stage", icon: <Presentation size={18} /> },
  { id: "projector", label: "Projector", icon: <Projector size={18} /> },
];

export function Palette() {
  const [items, setItems] = useState(DEFAULT_ITEMS);
  const [input, setInput] = useState("");

  function addCustomItem() {
    if (!input.trim()) return;

    const newItem = {
      id: input.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now(),
      label: input,
      icon: <Plus size={18} />, // generic icon
    };

    setItems((prev) => [...prev, newItem]);
    setInput("");
  }

  return (
    <div className="p-4 space-y-4">
      
      {/* Input box */}
      <div className="flex gap-2">
        <input
          value={input}
          id="draggableItemInput"
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add custom item..."
          className={cn(
            "flex-1 px-3 py-2 rounded-lg ",
            "bg-white/10 border border-white/20",
            "outline-none focus:border-white/40"
          )}
        />
        <button
          onClick={addCustomItem}
          className="px-3 py-2 bg-white/20 rounded-lg hover:bg-white/30 cursor-pointer"
        >
          <Plus/>
        </button>
      </div>

      {/* Items */}
      {items.map((item) => (
        <DraggableItem key={item.id} item={item} />
      ))}
    </div>
  );
}