"use client";

import { DndContext } from "@dnd-kit/core";
import { Palette } from "./Palette";
import { Canvas } from "./Canvas";
import { useCanvasStore } from "@/store/useCanvasStore";
import { useRef } from "react";
import * as htmlToImage from "html-to-image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEventStore } from "@/store/useEventStore";

export function DecorScreen() {
    const router = useRouter(); 
    const [currentStep] = useState(8);
      const completeStep = useEventStore((state) => state.completeStep);
      const setStep = useEventStore((state) => state.setStep);


  const addItem = useCanvasStore((s) => s.addItem);
  const updateItem = useCanvasStore((s) => s.updateItem);
  const canvasRef = useRef(null);

  function handleDragEnd(event) {
    const { active, over, delta } = event;

    // ✅ 1. FIRST: guard against null
    if (!over) return;

    // 🟢 CASE 1: Palette → Canvas
    if (active.data.current && over.id === "canvas") {
        const item = active.data.current;

        const rect = over.rect;
        const { activatorEvent } = event;

        const x = Math.min(
        rect.width - 120,
        Math.max(0, activatorEvent.clientX - rect.left)
        );

        const y = Math.min(
        rect.height - 60,
        Math.max(0, activatorEvent.clientY - rect.top)
        );

        addItem({
        id: `${item.id}-${Date.now()}`,
        type: item.label,
        x,
        y,
        width: 120,
        height: 60,
        rotation: 0,
        });

        return;
    }

    // 🔵 CASE 2: Move existing item
    updateItem(active.id, (prev) => ({
        x: prev.x + delta.x,
        y: prev.y + delta.y,
    }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const image = await captureCanvas();
        console.log(image); // base64 image
        completeStep(currentStep);
        setStep(currentStep + 1);
        router.push("/poster");
    };

    async function captureCanvas() {
        if (!canvasRef.current) return;

        const dataUrl = await htmlToImage.toPng(canvasRef.current, {
            quality: 1,
            pixelRatio: 2, // 🔥 higher quality
            backgroundColor: "#000000", // avoid transparency issues
        });

        return dataUrl;
        }


  return (
  <DndContext onDragEnd={handleDragEnd}>
    <div className="flex h-screen w-full overflow-hidden">
      
      {/* LEFT PANEL */}
      <div className="w-1/4 shrink-0 border-r border-white/10 relative z-10">
        <Palette />
      </div>

      {/* RIGHT CANVAS */}
      <div className="flex-1 relative z-0">
        <Canvas ref={canvasRef} />
      </div>

    </div>
    <motion.button
          onClick={handleSubmit}
          className="w-full py-5 rounded-full flex justify-center gap-2 disabled:opacity-40"
          style={{
            backgroundColor: "var(--color-dark)",
            color: "var(--color-bg)",
          }}
        >
          Continue <ArrowRight size={18} />
        </motion.button>
  </DndContext>
  
);
}