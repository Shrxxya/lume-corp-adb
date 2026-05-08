"use client";

import { useDroppable } from "@dnd-kit/core";
import { useCanvasStore } from "@/store/useCanvasStore";
import { CanvasItem } from "./CanvasItem";
import { forwardRef, useEffect } from "react";
import { useEventStore } from "@/store/useEventStore";

const awardsLayout = [
  {
    id: "stage-center",
    type: "Stage",
    x: 210,
    y: 210,
    width: 500,
    height: 120,
    rotation: 0,
  },
  {
    id: "led-backdrop",
    type: "LED Screen",
    x: 180,
    y: 40,
    width: 540,
    height: 160,
    rotation: 0,
  },
  {
    id: "award-table",
    type: "Table",
    x: 80,
    y: 320,
    width: 120,
    height: 80,
    rotation: 0,
  },
  {
    id: "vip-seating",
    type: "Seating Zone",
    x: 275,
    y: 425,
    width: 324,
    height: 187,
    rotation: 0,
  },
];
const techLaunchLayout = [
  {
    id: "main-led",
    type: "LED Wall",
    x: 145,
    y: 50,
    width: 600,
    height: 200,
    rotation: 0,
  },
  {
    id: "podium",
    type: "Podium",
    x: 385,
    y: 270,
    width: 120,
    height: 80,
    rotation: 0,
  },
  {
    id: "demo-zone",
    type: "Demo Zone",
    x: 145,
    y: 375,
    width: 200,
    height: 150,
    rotation: 0,
  },
  {
    id: "media-area",
    type: "Media Area",
    x: 560,
    y: 375,
    width: 180,
    height: 120,
    rotation: 0,
  },
];
const workshopLayout = [
  {
    id: "instructor-zone",
    type: "Instructor Area",
    x: 450,
    y: 100,
    width: 180,
    height: 100,
    rotation: 0,
  },
  {
    id: "screen",
    type: "Projector",
    x: 420,
    y: 220,
    width: 220,
    height: 120,
    rotation: 0,
  },
  {
    id: "table-1",
    type: "Table",
    x: 200,
    y: 350,
    width: 120,
    height: 80,
    rotation: 0,
  },
  {
    id: "table-2",
    type: "Table",
    x: 380,
    y: 380,
    width: 120,
    height: 80,
    rotation: 0,
  },
  {
    id: "table-3",
    type: "Table",
    x: 560,
    y: 350,
    width: 120,
    height: 80,
    rotation: 0,
  },
];
const conferenceLayout = [
  {
    id: "stage",
    type: "Stage",
    x: 400,
    y: 100,
    width: 400,
    height: 120,
    rotation: 0,
  },
  {
    id: "screen",
    type: "LED Screen",
    x: 420,
    y: 230,
    width: 360,
    height: 140,
    rotation: 0,
  },
  {
    id: "seating-left",
    type: "Seating Block",
    x: 150,
    y: 350,
    width: 200,
    height: 160,
    rotation: 0,
  },
  {
    id: "seating-right",
    type: "Seating Block",
    x: 700,
    y: 350,
    width: 200,
    height: 160,
    rotation: 0,
  },
];
const galaLayout = [
  {
    id: "dance-floor",
    type: "Dance Floor",
    x: 350,
    y: 200,
    width: 400,
    height: 250,
    rotation: 0,
  },
  {
    id: "stage",
    type: "Mini Stage",
    x: 450,
    y: 100,
    width: 200,
    height: 80,
    rotation: 0,
  },
  {
    id: "table-1",
    type: "Dinner Table",
    x: 150,
    y: 400,
    width: 120,
    height: 120,
    rotation: 0,
  },
  {
    id: "table-2",
    type: "Dinner Table",
    x: 750,
    y: 400,
    width: 120,
    height: 120,
    rotation: 0,
  },
];
const conventionLayout = [
  {
    id: "stage",
    type: "Stage",
    x: 400,
    y: 80,
    width: 350,
    height: 100,
    rotation: 0,
  },
  {
    id: "booth-1",
    type: "Booth",
    x: 150,
    y: 250,
    width: 120,
    height: 120,
    rotation: 0,
  },
  {
    id: "booth-2",
    type: "Booth",
    x: 300,
    y: 250,
    width: 120,
    height: 120,
    rotation: 0,
  },
  {
    id: "booth-3",
    type: "Booth",
    x: 450,
    y: 250,
    width: 120,
    height: 120,
    rotation: 0,
  },
  {
    id: "booth-4",
    type: "Booth",
    x: 600,
    y: 250,
    width: 120,
    height: 120,
    rotation: 0,
  },
];
const layouts = {
  "Awards & Recognition": awardsLayout,
  "Tech Launch": techLaunchLayout,
  Workshop: workshopLayout,
  Conference: conferenceLayout,
  Gala: galaLayout,
  Convention: conventionLayout,
};

export const Canvas = forwardRef(function Canvas(_, ref) {
  const { setNodeRef } = useDroppable({ id: "canvas" });
  const items = useCanvasStore((s) => s.items);

  const loadLayout = useCanvasStore((s) => s.loadLayout);
  const eventType = useEventStore((state) => state.eventDetails?.eventType);

  useEffect(() => {
  if (!eventType) return;

  const layout = layouts[eventType];
  if (!layout) return;

  loadLayout(layout, eventType);
}, [eventType]);

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