"use client";

import { DndContext } from "@dnd-kit/core";
import { Palette } from "./Palette";
import { Canvas } from "./Canvas";
import { useCanvasStore } from "@/store/useCanvasStore";
import { useRef } from "react";
import * as htmlToImage from "html-to-image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useEventStore } from "@/store/useEventStore";
import { LayoutReviewModal } from "../LayoutReviewModal";
import { getNextRoute } from "@/lib/eventFlow";
import { useRouter, usePathname } from "next/navigation";

export function DecorScreen() {

    const router = useRouter();
const pathname = usePathname();
const eventDetails = useEventStore((s) => s.eventDetails);

    
    // Get store functions
    const decor = useEventStore((state) => state.decor);
    const setDecor = useEventStore((state) => state.setDecor);
    const currentStep = useEventStore((state) => state.currentStep);
    const completeStep = useEventStore((state) => state.completeStep);
    const setStep = useEventStore((state) => state.setStep);
    const setActiveStep = useEventStore((state) => state.setActiveStep);

  const addItem = useCanvasStore((s) => s.addItem);
  const updateItem = useCanvasStore((s) => s.updateItem);
  const canvasItems = useCanvasStore((s) => s.items);
  const canvasRef = useRef(null);

  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [review, setReview] = useState(null);
  const [reviewData, setReviewData] = useState({ issues: [], score: 0 });

  const getSummaryData      = useEventStore((s) => s.getSummaryData);
  const summaryData      = getSummaryData();
  const eventType = summaryData.eventType;
  const hasHydrated = useEventStore((s) => s.hasHydrated);

  const setGeneratedCanvasImage = useEventStore((s) => s.setGeneratedCanvasImage);

  if (!hasHydrated) return;

  // Save decor data to store
  const handleSaveDecor = () => {
    setDecor({
      items: canvasItems,
      selectedTheme: decor.selectedTheme || "Custom",
      colorPalette: decor.colorPalette || [],
    });
  };

  function handleDragEnd(event) {
    const { active, over, delta } = event;

    // 1. FIRST: guard against null
    if (!over) return;

    // CASE 1: Palette → Canvas
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

    // CASE 2: Move existing item
    updateItem(active.id, (prev) => ({
        x: prev.x + delta.x,
        y: prev.y + delta.y,
    }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Save decor data to store before navigating
        handleSaveDecor();
        const canvasImage = await captureCanvas();
        setGeneratedCanvasImage(canvasImage);
        completeStep(currentStep);
        //setStep(currentStep + 1);
        setStep("poster"); // or nextStepName
setActiveStep("poster");
        const nextRoute = getNextRoute(eventDetails, pathname);
        router.push(nextRoute);
        //router.push("/poster");
    };

    async function captureCanvas() {
        if (!canvasRef.current) return;

        const dataUrl = await htmlToImage.toPng(canvasRef.current, {
            quality: 1,
            pixelRatio: 2, 
            backgroundColor: "#000000", // avoid transparency issues
        });

        return dataUrl;
        }
    async function handleContinue() {
      setReviewOpen(true);
      setReviewLoading(true);

      const payload = {
        eventType,
        venueSize: {
          width: 880,
          height: 668,
        },
        canvasItems,
      };

      const res = await fetch("/api/layout-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      setReviewData(data);
      setReviewLoading(false);
    }


  return (
  <DndContext onDragEnd={handleDragEnd}>
    <div className="flex h-screen w-full overflow-hidden">
      
      {/* LEFT PANEL */}
      <div className="w-[23.5%] shrink-0 border-r border-white/10 relative z-10">
        <Palette />
      </div>

      {/* RIGHT CANVAS */}
      <div className="flex-1 relative z-0">
        <Canvas ref={canvasRef} />
      </div>

    </div>
    <motion.button
          onClick={handleContinue}
          className="w-[25vw] mx-auto my-10 py-5 rounded-full flex justify-center items-center gap-2 disabled:opacity-40"
          style={{
            backgroundColor: "var(--color-dark)",
            color: "var(--color-bg)",
          }}
        >
          Continue <ArrowRight size={18} />
        </motion.button>
        <LayoutReviewModal
          open={reviewOpen}
          loading={reviewLoading}
          review={review}
          issues={reviewData.issues}
          score={reviewData.score}
          onClose={() => setReviewOpen(false)}
          onContinue={handleSubmit}
        />
  </DndContext>
  
);
}