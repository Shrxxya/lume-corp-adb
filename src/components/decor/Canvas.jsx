"use client";

import { useDroppable } from "@dnd-kit/core";
import { useCanvasStore } from "@/store/useCanvasStore";
import { CanvasItem } from "./CanvasItem";
import { forwardRef, useEffect } from "react";
import { useEventStore } from "@/store/useEventStore";

const awardsLayout = [
  { id: "entrance-red-carpet", type: "Red Carpet", x: 350, y: 185, width: 120, height: 350, rotation: 0 },
  { id: "photo-wall", type: "Photo Wall", x: 40, y: 40, width: 200, height: 120, rotation: 0 },

  { id: "stage-main", type: "Stage", x: 260, y: 40, width: 520, height: 120, rotation: 0 },

  { id: "vip-table-1", type: "VIP Table", x: 200, y: 280, width: 110, height: 110, rotation: 0 },
  { id: "vip-table-2", type: "VIP Table", x: 200, y: 410, width: 110, height: 110, rotation: 0 },
  { id: "vip-table-3", type: "VIP Table", x: 65, y: 340, width: 110, height: 110, rotation: 0 },

  { id: "guest-seating", type: "Seating Area", x: 520, y: 250, width: 260, height: 200, rotation: 0 },

  { id: "award-desk", type: "Award Desk", x: 48, y: 175, width: 160, height: 60, rotation: 0 },
  { id: "camera-zone", type: "Camera Zone", x: 675, y: 172, width: 105, height: 54, rotation: 0 },
];
const techLaunchLayout = [
  { id: "registration", type: "Registration Desk", x: 58, y: 432, width: 180, height: 80, rotation: 0 },

  { id: "main-stage", type: "LED Stage", x: 250, y: 40, width: 560, height: 160, rotation: 0 },

  { id: "demo-1", type: "Demo Pod", x: 90, y: 290, width: 140, height: 120, rotation: 0 },
  { id: "demo-2", type: "Demo Pod", x: 242, y: 290, width: 140, height: 120, rotation: 0 },
  { id: "demo-3", type: "Demo Pod", x: 395, y: 290, width: 140, height: 120, rotation: 0 },

  { id: "media-zone", type: "Press Zone", x: 585, y: 220, width: 220, height: 200, rotation: 0 },

  { id: "network-lounge", type: "Networking Lounge", x: 50, y: 130, width: 180, height: 120, rotation: 0 },

  { id: "charging-bar", type: "Charging Station", x: 70, y: 50, width: 140, height: 60, rotation: 0 },
];
const workshopLayout = [
  { id: "instructor", type: "Instructor Stage", x: 260, y: 40, width: 420, height: 120, rotation: 0 },

  { id: "screen", type: "Projector Screen", x: 260, y: 180, width: 420, height: 100, rotation: 0 },

  { id: "table-1", type: "Workshop Table", x: 120, y: 360, width: 120, height: 80, rotation: 0 },
  { id: "table-2", type: "Workshop Table", x: 280, y: 360, width: 120, height: 80, rotation: 0 },
  { id: "table-3", type: "Workshop Table", x: 444, y: 360, width: 120, height: 80, rotation: 0 },

  { id: "whiteboard", type: "Whiteboard", x: 640, y: 310, width: 120, height: 160, rotation: 0 },

  { id: "coffee-corner", type: "Refreshments Corner", x: 68, y: 115, width: 148, height: 121, rotation: 0 },
];
const conferenceLayout = [
  { id: "conf-stage", type: "Main Stage", x: 215, y: 35, width: 480, height: 120, rotation: 0 },

  { id: "podium", type: "Speaker Podium", x: 385, y: 180, width: 126, height: 82, rotation: 0 },

  { id: "audience-left", type: "Audience Block", x: 78, y: 245, width: 220, height: 220, rotation: 0 },
  { id: "audience-right", type: "Audience Block", x: 605, y: 245, width: 220, height: 220, rotation: 0 },

  { id: "sponsor-booth-1", type: "Sponsor Booth", x: 320, y: 282, width: 120, height: 120, rotation: 0 },
  { id: "sponsor-booth-2", type: "Sponsor Booth", x: 460, y: 282, width: 120, height: 120, rotation: 0 },

  { id: "media-row", type: "Media Row", x: 280, y: 505, width: 341, height: 45, rotation: 0 },
];
const galaLayout = [
  { id: "dance-floor", type: "Dance Floor", x: 260, y: 180, width: 360, height: 220, rotation: 0 },

  { id: "live-stage", type: "Live Band Stage", x: 310, y: 40, width: 260, height: 100, rotation: 0 },

  { id: "bar", type: "Bar Counter", x: 648, y: 182, width: 140, height: 220, rotation: 0 },

  { id: "lounge-1", type: "Lounge Sofa", x: 112, y: 195, width: 120, height: 80, rotation: 0 },
  { id: "lounge-2", type: "Lounge Sofa", x: 112, y: 300, width: 120, height: 80, rotation: 0 },

  { id: "candle-tables", type: "Candle Tables", x: 345, y: 442, width: 200, height: 120, rotation: 0 },
];
const conventionLayout = [
  { id: "main-stage", type: "Main Stage", x: 260, y: 40, width: 420, height: 100, rotation: 0 },

  { id: "info-desk", type: "Info Desk", x: 108, y: 46, width: 140, height: 80, rotation: 0 },

  { id: "booth-1", type: "Exhibit Booth", x: 60, y: 170, width: 140, height: 140, rotation: 0 },
  { id: "booth-2", type: "Exhibit Booth", x: 240, y: 170, width: 140, height: 140, rotation: 0 },
  { id: "booth-3", type: "Exhibit Booth", x: 410, y: 170, width: 140, height: 140, rotation: 0 },
  { id: "booth-4", type: "Exhibit Booth", x: 590, y: 170, width: 140, height: 140, rotation: 0 },

  { id: "food-court", type: "Food Court", x: 120, y: 340, width: 260, height: 140, rotation: 0 },

  { id: "network-zone", type: "Networking Zone", x: 420, y: 340, width: 260, height: 140, rotation: 0 },
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

  const initializedEventType = useCanvasStore(
    (s) => s.initializedEventType
  );

  useEffect(() => {
    if (!eventType) return;

    // Prevent resetting if same event type
    if (initializedEventType === eventType) return;

    const layout = layouts[eventType];
    if (!layout) return;

    const clonedLayout = layout.map((item) => ({
      ...item,
    }));

    loadLayout(clonedLayout, eventType);
  }, [eventType, initializedEventType]);

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