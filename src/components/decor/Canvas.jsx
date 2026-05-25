// "use client";

// import { useDroppable } from "@dnd-kit/core";
// import { useCanvasStore } from "@/store/useCanvasStore";
// import { CanvasItem } from "./CanvasItem";
// import { forwardRef, useEffect } from "react";
// import { useEventStore } from "@/store/useEventStore";

// const awardsLayout = [
//   { id: "entrance-red-carpet", type: "Red Carpet", x: 350, y: 185, width: 120, height: 350, rotation: 0 },
//   { id: "photo-wall", type: "Photo Wall", x: 40, y: 40, width: 200, height: 120, rotation: 0 },

//   { id: "stage-main", type: "Stage", x: 260, y: 40, width: 520, height: 120, rotation: 0 },

//   { id: "vip-table-1", type: "VIP Table", x: 200, y: 280, width: 110, height: 110, rotation: 0 },
//   { id: "vip-table-2", type: "VIP Table", x: 200, y: 410, width: 110, height: 110, rotation: 0 },
//   { id: "vip-table-3", type: "VIP Table", x: 65, y: 340, width: 110, height: 110, rotation: 0 },

//   { id: "guest-seating", type: "Seating Area", x: 520, y: 250, width: 260, height: 200, rotation: 0 },

//   { id: "award-desk", type: "Award Desk", x: 48, y: 175, width: 160, height: 60, rotation: 0 },
//   { id: "camera-zone", type: "Camera Zone", x: 675, y: 172, width: 105, height: 54, rotation: 0 },
// ];
// const techLaunchLayout = [
//   { id: "registration", type: "Registration Desk", x: 58, y: 432, width: 180, height: 80, rotation: 0 },

//   { id: "main-stage", type: "LED Stage", x: 250, y: 40, width: 560, height: 160, rotation: 0 },

//   { id: "demo-1", type: "Demo Pod", x: 90, y: 290, width: 140, height: 120, rotation: 0 },
//   { id: "demo-2", type: "Demo Pod", x: 242, y: 290, width: 140, height: 120, rotation: 0 },
//   { id: "demo-3", type: "Demo Pod", x: 395, y: 290, width: 140, height: 120, rotation: 0 },

//   { id: "media-zone", type: "Press Zone", x: 585, y: 220, width: 220, height: 200, rotation: 0 },

//   { id: "network-lounge", type: "Networking Lounge", x: 50, y: 130, width: 180, height: 120, rotation: 0 },

//   { id: "charging-bar", type: "Charging Station", x: 70, y: 50, width: 140, height: 60, rotation: 0 },
// ];
// const workshopLayout = [
//   { id: "instructor", type: "Instructor Stage", x: 260, y: 40, width: 420, height: 120, rotation: 0 },

//   { id: "screen", type: "Projector Screen", x: 260, y: 180, width: 420, height: 100, rotation: 0 },

//   { id: "table-1", type: "Workshop Table", x: 120, y: 360, width: 120, height: 80, rotation: 0 },
//   { id: "table-2", type: "Workshop Table", x: 280, y: 360, width: 120, height: 80, rotation: 0 },
//   { id: "table-3", type: "Workshop Table", x: 444, y: 360, width: 120, height: 80, rotation: 0 },

//   { id: "whiteboard", type: "Whiteboard", x: 640, y: 310, width: 120, height: 160, rotation: 0 },

//   { id: "coffee-corner", type: "Refreshments Corner", x: 68, y: 115, width: 148, height: 121, rotation: 0 },
// ];
// const conferenceLayout = [
//   { id: "conf-stage", type: "Main Stage", x: 215, y: 35, width: 480, height: 120, rotation: 0 },

//   { id: "podium", type: "Speaker Podium", x: 385, y: 180, width: 126, height: 82, rotation: 0 },

//   { id: "audience-left", type: "Audience Block", x: 78, y: 245, width: 220, height: 220, rotation: 0 },
//   { id: "audience-right", type: "Audience Block", x: 605, y: 245, width: 220, height: 220, rotation: 0 },

//   { id: "sponsor-booth-1", type: "Sponsor Booth", x: 320, y: 282, width: 120, height: 120, rotation: 0 },
//   { id: "sponsor-booth-2", type: "Sponsor Booth", x: 460, y: 282, width: 120, height: 120, rotation: 0 },

//   { id: "media-row", type: "Media Row", x: 280, y: 505, width: 341, height: 45, rotation: 0 },
// ];
// const galaLayout = [
//   { id: "dance-floor", type: "Dance Floor", x: 260, y: 180, width: 360, height: 220, rotation: 0 },

//   { id: "live-stage", type: "Live Band Stage", x: 310, y: 40, width: 260, height: 100, rotation: 0 },

//   { id: "bar", type: "Bar Counter", x: 648, y: 182, width: 140, height: 220, rotation: 0 },

//   { id: "lounge-1", type: "Lounge Sofa", x: 112, y: 195, width: 120, height: 80, rotation: 0 },
//   { id: "lounge-2", type: "Lounge Sofa", x: 112, y: 300, width: 120, height: 80, rotation: 0 },

//   { id: "candle-tables", type: "Candle Tables", x: 345, y: 442, width: 200, height: 120, rotation: 0 },
// ];
// const conventionLayout = [
//   { id: "main-stage", type: "Main Stage", x: 260, y: 40, width: 420, height: 100, rotation: 0 },

//   { id: "info-desk", type: "Info Desk", x: 108, y: 46, width: 140, height: 80, rotation: 0 },

//   { id: "booth-1", type: "Exhibit Booth", x: 60, y: 170, width: 140, height: 140, rotation: 0 },
//   { id: "booth-2", type: "Exhibit Booth", x: 240, y: 170, width: 140, height: 140, rotation: 0 },
//   { id: "booth-3", type: "Exhibit Booth", x: 410, y: 170, width: 140, height: 140, rotation: 0 },
//   { id: "booth-4", type: "Exhibit Booth", x: 590, y: 170, width: 140, height: 140, rotation: 0 },

//   { id: "food-court", type: "Food Court", x: 120, y: 340, width: 260, height: 140, rotation: 0 },

//   { id: "network-zone", type: "Networking Zone", x: 420, y: 340, width: 260, height: 140, rotation: 0 },
// ];
// const layouts = {
//   "Awards & Recognition": awardsLayout,
//   "Tech Launch": techLaunchLayout,
//   Workshop: workshopLayout,
//   Conference: conferenceLayout,
//   Gala: galaLayout,
//   Convention: conventionLayout,
// };

// export const Canvas = forwardRef(function Canvas(_, ref) {
//   const { setNodeRef } = useDroppable({ id: "canvas" });
//   const items = useCanvasStore((s) => s.items);

//   const loadLayout = useCanvasStore((s) => s.loadLayout);
//   const eventType = useEventStore((state) => state.eventDetails?.eventType);

//   const initializedEventType = useCanvasStore(
//     (s) => s.initializedEventType
//   );

//   useEffect(() => {
//     if (!eventType) return;

//     // Prevent resetting if same event type
//     if (initializedEventType === eventType) return;

//     const layout = layouts[eventType];
//     if (!layout) return;

//     const clonedLayout = layout.map((item) => ({
//       ...item,
//     }));

//     loadLayout(clonedLayout, eventType);
//   }, [eventType, initializedEventType]);

//   return (
//     <div
//       ref={(node) => {
//         setNodeRef(node);
//         if (ref) ref.current = node;
//       }}
//       className="w-full h-full relative bg-black/40 overflow-hidden"
//     >
//       <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:20px_20px]" />

//       {items.map((item) => (
//         <CanvasItem key={item.id} item={item} />
//       ))}
//     </div>
//   );
// });

"use client";

import { useDroppable } from "@dnd-kit/core";
import { useCanvasStore } from "@/store/useCanvasStore";
import { CanvasItem } from "./CanvasItem";
import { forwardRef, useEffect, useState } from "react";
import { useEventStore } from "@/store/useEventStore";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

// ── Layout presets (unchanged from original) ──────────────────────────────────
const awardsLayout = [
  { id: "entrance-red-carpet", type: "Red Carpet",    x: 350, y: 185, width: 120, height: 350, rotation: 0 },
  { id: "photo-wall",          type: "Photo Wall",    x:  40, y:  40, width: 200, height: 120, rotation: 0 },
  { id: "stage-main",          type: "Stage",         x: 260, y:  40, width: 520, height: 120, rotation: 0 },
  { id: "vip-table-1",         type: "VIP Table",     x: 200, y: 280, width: 110, height: 110, rotation: 0 },
  { id: "vip-table-2",         type: "VIP Table",     x: 200, y: 410, width: 110, height: 110, rotation: 0 },
  { id: "vip-table-3",         type: "VIP Table",     x:  65, y: 340, width: 110, height: 110, rotation: 0 },
  { id: "guest-seating",       type: "Seating Area",  x: 520, y: 250, width: 260, height: 200, rotation: 0 },
  { id: "award-desk",          type: "Award Desk",    x:  48, y: 175, width: 160, height:  60, rotation: 0 },
  { id: "camera-zone",         type: "Camera Zone",   x: 675, y: 172, width: 105, height:  54, rotation: 0 },
];
const techLaunchLayout = [
  { id: "registration",    type: "Registration Desk",  x:  58, y: 432, width: 180, height:  80, rotation: 0 },
  { id: "main-stage",      type: "LED Stage",          x: 250, y:  40, width: 560, height: 160, rotation: 0 },
  { id: "demo-1",          type: "Demo Pod",           x:  90, y: 290, width: 140, height: 120, rotation: 0 },
  { id: "demo-2",          type: "Demo Pod",           x: 242, y: 290, width: 140, height: 120, rotation: 0 },
  { id: "demo-3",          type: "Demo Pod",           x: 395, y: 290, width: 140, height: 120, rotation: 0 },
  { id: "media-zone",      type: "Press Zone",         x: 585, y: 220, width: 220, height: 200, rotation: 0 },
  { id: "network-lounge",  type: "Networking Lounge",  x:  50, y: 130, width: 180, height: 120, rotation: 0 },
  { id: "charging-bar",    type: "Charging Station",   x:  70, y:  50, width: 140, height:  60, rotation: 0 },
];
const workshopLayout = [
  { id: "instructor", type: "Instructor Stage",    x: 260, y:  40, width: 420, height: 120, rotation: 0 },
  { id: "screen",     type: "Projector Screen",    x: 260, y: 180, width: 420, height: 100, rotation: 0 },
  { id: "table-1",    type: "Workshop Table",      x: 120, y: 360, width: 120, height:  80, rotation: 0 },
  { id: "table-2",    type: "Workshop Table",      x: 280, y: 360, width: 120, height:  80, rotation: 0 },
  { id: "table-3",    type: "Workshop Table",      x: 444, y: 360, width: 120, height:  80, rotation: 0 },
  { id: "whiteboard", type: "Whiteboard",          x: 640, y: 310, width: 120, height: 160, rotation: 0 },
  { id: "coffee",     type: "Refreshments Corner", x:  68, y: 115, width: 148, height: 121, rotation: 0 },
];
const conferenceLayout = [
  { id: "conf-stage",      type: "Main Stage",      x: 215, y:  35, width: 480, height: 120, rotation: 0 },
  { id: "podium",          type: "Speaker Podium",  x: 385, y: 180, width: 126, height:  82, rotation: 0 },
  { id: "audience-left",   type: "Audience Block",  x:  78, y: 245, width: 220, height: 220, rotation: 0 },
  { id: "audience-right",  type: "Audience Block",  x: 605, y: 245, width: 220, height: 220, rotation: 0 },
  { id: "sponsor-booth-1", type: "Sponsor Booth",   x: 320, y: 282, width: 120, height: 120, rotation: 0 },
  { id: "sponsor-booth-2", type: "Sponsor Booth",   x: 460, y: 282, width: 120, height: 120, rotation: 0 },
  { id: "media-row",       type: "Media Row",       x: 280, y: 505, width: 341, height:  45, rotation: 0 },
];
const galaLayout = [
  { id: "dance-floor",  type: "Dance Floor",     x: 260, y: 180, width: 360, height: 220, rotation: 0 },
  { id: "live-stage",   type: "Live Band Stage", x: 310, y:  40, width: 260, height: 100, rotation: 0 },
  { id: "bar",          type: "Bar Counter",     x: 648, y: 182, width: 140, height: 220, rotation: 0 },
  { id: "lounge-1",     type: "Lounge Sofa",     x: 112, y: 195, width: 120, height:  80, rotation: 0 },
  { id: "lounge-2",     type: "Lounge Sofa",     x: 112, y: 300, width: 120, height:  80, rotation: 0 },
  { id: "candle-tables",type: "Candle Tables",   x: 345, y: 442, width: 200, height: 120, rotation: 0 },
];
const conventionLayout = [
  { id: "main-stage",  type: "Main Stage",       x: 260, y:  40, width: 420, height: 100, rotation: 0 },
  { id: "info-desk",   type: "Info Desk",        x: 108, y:  46, width: 140, height:  80, rotation: 0 },
  { id: "booth-1",     type: "Exhibit Booth",    x:  60, y: 170, width: 140, height: 140, rotation: 0 },
  { id: "booth-2",     type: "Exhibit Booth",    x: 240, y: 170, width: 140, height: 140, rotation: 0 },
  { id: "booth-3",     type: "Exhibit Booth",    x: 410, y: 170, width: 140, height: 140, rotation: 0 },
  { id: "booth-4",     type: "Exhibit Booth",    x: 590, y: 170, width: 140, height: 140, rotation: 0 },
  { id: "food-court",  type: "Food Court",       x: 120, y: 340, width: 260, height: 140, rotation: 0 },
  { id: "network-zone",type: "Networking Zone",  x: 420, y: 340, width: 260, height: 140, rotation: 0 },
];

const layouts = {
  "Awards & Recognition": awardsLayout,
  "Tech Launch":          techLaunchLayout,
  Workshop:               workshopLayout,
  Conference:             conferenceLayout,
  Gala:                   galaLayout,
  Convention:             conventionLayout,
};

// ── Venue floor plan SVG background ──────────────────────────────────────────
function VenueBackground({ night, width = 880, height = 580 }) {
  const W = width, H = height;

  if (night) {
    // ── NIGHT: polished dark ballroom ────────────────────────────────────────
    return (
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${W} ${H}`}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
        preserveAspectRatio="none"
      >
        <defs>
          {/* floor tile pattern */}
          <pattern id="night-tile" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="#0e1218" />
            <rect width="39" height="39" x="0.5" y="0.5" fill="none"
              stroke="rgba(98,117,76,0.07)" strokeWidth="0.5" />
            {/* subtle diagonal shine */}
            <line x1="0" y1="0" x2="40" y2="40"
              stroke="rgba(255,255,255,0.015)" strokeWidth="0.5" />
          </pattern>

          {/* ambient ceiling light cones */}
          <radialGradient id="light-cone-1" cx="25%" cy="0%" r="55%">
            <stop offset="0%" stopColor="rgba(201,168,76,0.10)" />
            <stop offset="100%" stopColor="rgba(201,168,76,0)" />
          </radialGradient>
          <radialGradient id="light-cone-2" cx="75%" cy="0%" r="55%">
            <stop offset="0%" stopColor="rgba(98,117,76,0.10)" />
            <stop offset="100%" stopColor="rgba(98,117,76,0)" />
          </radialGradient>
          <radialGradient id="light-center" cx="50%" cy="50%" r="40%">
            <stop offset="0%" stopColor="rgba(255,240,200,0.04)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>

          {/* vignette */}
          <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
            <stop offset="60%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.55)" />
          </radialGradient>
        </defs>

        {/* base floor */}
        <rect width={W} height={H} fill="url(#night-tile)" />

        {/* ceiling light washes */}
        <rect width={W} height={H} fill="url(#light-cone-1)" />
        <rect width={W} height={H} fill="url(#light-cone-2)" />
        <rect width={W} height={H} fill="url(#light-center)" />

        {/* outer wall — thick */}
        <rect x={0} y={0} width={W} height={H}
          fill="none"
          stroke="rgba(98,117,76,0.35)"
          strokeWidth={8} />

        {/* inner wall offset */}
        <rect x={12} y={12} width={W - 24} height={H - 24}
          fill="none"
          stroke="rgba(98,117,76,0.15)"
          strokeWidth={2} />

        {/* corner wall brackets — architectural detail */}
        {[
          [0, 0, 60, 0, 60, 12, 12, 12, 12, 60, 0, 60],
          [W, 0, W - 60, 0, W - 60, 12, W - 12, 12, W - 12, 60, W, 60],
          [0, H, 60, H, 60, H - 12, 12, H - 12, 12, H - 60, 0, H - 60],
          [W, H, W - 60, H, W - 60, H - 12, W - 12, H - 12, W - 12, H - 60, W, H - 60],
        ].map((pts, i) => (
          <polyline key={i}
            points={pts.join(",")}
            fill="none"
            stroke="rgba(201,168,76,0.5)"
            strokeWidth={2}
            strokeLinecap="square" />
        ))}

        {/* doorways — subtle cutouts on walls */}
        {/* bottom centre door */}
        <rect x={W / 2 - 28} y={H - 9} width={56} height={10}
          fill="#0e1218" />
        <line x1={W / 2 - 28} y1={H - 9} x2={W / 2 - 28} y2={H}
          stroke="rgba(201,168,76,0.4)" strokeWidth={1.5} />
        <line x1={W / 2 + 28} y1={H - 9} x2={W / 2 + 28} y2={H}
          stroke="rgba(201,168,76,0.4)" strokeWidth={1.5} />

        {/* left side door */}
        <rect x={0} y={H / 2 - 24} width={10} height={48}
          fill="#0e1218" />
        <line x1={0} y1={H / 2 - 24} x2={9} y2={H / 2 - 24}
          stroke="rgba(201,168,76,0.4)" strokeWidth={1.5} />
        <line x1={0} y1={H / 2 + 24} x2={9} y2={H / 2 + 24}
          stroke="rgba(201,168,76,0.4)" strokeWidth={1.5} />

        {/* ceiling spot lights row — top */}
        {[0.18, 0.36, 0.5, 0.64, 0.82].map((t, i) => (
          <g key={i}>
            <circle cx={t * W} cy={18} r={5}
              fill="rgba(255,220,120,0.7)"
              style={{ filter: "blur(1px)" }} />
            {/* light cone beam */}
            <polygon
              points={`${t * W - 4},20 ${t * W + 4},20 ${t * W + 60},${H * 0.6} ${t * W - 60},${H * 0.6}`}
              fill="rgba(255,220,100,0.025)" />
          </g>
        ))}

        {/* vignette overlay */}
        <rect width={W} height={H} fill="url(#vignette)" />

        {/* compass rose — bottom right corner */}
        <g transform={`translate(${W - 36}, ${H - 36})`} opacity={0.25}>
          <circle cx={0} cy={0} r={14} fill="none" stroke="rgba(201,168,76,0.5)" strokeWidth={1} />
          <text x={0} y={-6} textAnchor="middle" fontSize={6} fill="rgba(201,168,76,0.7)" fontWeight="600">N</text>
          <line x1={0} y1={-12} x2={0} y2={12} stroke="rgba(201,168,76,0.4)" strokeWidth={0.8} />
          <line x1={-12} y1={0} x2={12} y2={0} stroke="rgba(201,168,76,0.4)" strokeWidth={0.8} />
        </g>

        {/* scale bar — bottom left */}
        <g transform={`translate(20, ${H - 22})`} opacity={0.35}>
          <line x1={0} y1={0} x2={60} y2={0} stroke="rgba(201,168,76,0.7)" strokeWidth={1.5} />
          <line x1={0} y1={-4} x2={0} y2={4} stroke="rgba(201,168,76,0.7)" strokeWidth={1.5} />
          <line x1={60} y1={-4} x2={60} y2={4} stroke="rgba(201,168,76,0.7)" strokeWidth={1.5} />
          <text x={30} y={-6} textAnchor="middle" fontSize={7} fill="rgba(201,168,76,0.8)">10m</text>
        </g>
      </svg>
    );
  }

  // ── DAY: warm architectural blueprint on paper ──────────────────────────────
  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${W} ${H}`}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
      }}
      preserveAspectRatio="none"
    >
      <defs>
        {/* blueprint grid */}
        <pattern id="day-grid-minor" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="none" />
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(98,117,76,0.08)" strokeWidth="0.5" />
        </pattern>
        <pattern id="day-grid-major" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="url(#day-grid-minor)" />
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(98,117,76,0.18)" strokeWidth="1" />
        </pattern>

        {/* warm paper wash */}
        <radialGradient id="paper-wash" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="rgba(255,252,240,0.8)" />
          <stop offset="100%" stopColor="rgba(240,245,235,0)" />
        </radialGradient>

        {/* edge shadow */}
        <radialGradient id="day-vignette" cx="50%" cy="50%" r="70%">
          <stop offset="55%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(20,24,42,0.08)" />
        </radialGradient>
      </defs>

      {/* warm paper base */}
      <rect width={W} height={H} fill="#F5F0E8" />

      {/* grid */}
      <rect width={W} height={H} fill="url(#day-grid-major)" />

      {/* warm light center */}
      <rect width={W} height={H} fill="url(#paper-wash)" />

      {/* outer wall — flush to canvas edge */}
      <rect
        x={0}
        y={0}
        width={W}
        height={H}
        fill="none"
        stroke="rgba(20,24,42,0.5)"
        strokeWidth={6}
      />

      {/* inner wall */}
      <rect
        x={8}
        y={8}
        width={W - 16}
        height={H - 16}
        fill="none"
        stroke="rgba(20,24,42,0.15)"
        strokeWidth={1.5}
      />

      {/* corner reinforcements */}
      {[
        [0, 0, 0, 55, 10, 55, 10, 10, 55, 10, 55, 0],

        [W, 0, W - 55, 0, W - 55, 10, W - 10, 10, W - 10, 55, W, 55],

        [0, H, 0, H - 55, 10, H - 55, 10, H - 10, 55, H - 10, 55, H],

        [W, H, W - 55, H, W - 55, H - 10, W - 10, H - 10, W - 10, H - 55, W, H - 55],
      ].map((pts, i) => (
        <polyline key={i}
          points={pts.join(",")}
          fill="rgba(98,117,76,0.12)"
          stroke="rgba(20,24,42,0.35)"
          strokeWidth={1}
          strokeLinecap="square" />
      ))}

      {/* doorways */}
      <rect x={W / 2 - 28} y={H - 8} width={56} height={8} fill="#F5F0E8" />
      <line x1={W / 2 - 28} y1={H - 8} x2={W / 2 - 28} y2={H}
        stroke="rgba(20,24,42,0.4)" strokeWidth={1.5} />
      <line x1={W / 2 + 28} y1={H - 8} x2={W / 2 + 28} y2={H}
        stroke="rgba(20,24,42,0.4)" strokeWidth={1.5} />
      {/* swing arc */}
      <path d={`M ${W / 2 - 28} ${H - 8} Q ${W / 2 - 28} ${H - 36} ${W / 2} ${H - 36}`}
        fill="none" stroke="rgba(20,24,42,0.2)" strokeWidth={0.8} strokeDasharray="3 2" />

      <rect x={0} y={H / 2 - 24} width={8} height={48} fill="#F5F0E8" />
      <line x1={0} y1={H / 2 - 24} x2={8} y2={H / 2 - 24}
        stroke="rgba(20,24,42,0.4)" strokeWidth={1.5} />
      <line x1={0} y1={H / 2 + 24} x2={8} y2={H / 2 + 24}
        stroke="rgba(20,24,42,0.4)" strokeWidth={1.5} />

      {/* dimension lines */}
      {/* horizontal top */}
      <line x1={10} y1={-2} x2={W - 10} y2={-2}
        stroke="rgba(98,117,76,0.3)" strokeWidth={0.8} />
      <line x1={10} y1={-6} x2={10} y2={2}
        stroke="rgba(98,117,76,0.3)" strokeWidth={0.8} />
      <line x1={W - 10} y1={-6} x2={W - 10} y2={2}
        stroke="rgba(98,117,76,0.3)" strokeWidth={0.8} />

      {/* vignette */}
      <rect width={W} height={H} fill="url(#day-vignette)" />

      {/* compass rose */}
      <g transform={`translate(${W - 38}, ${H - 38})`} opacity={0.4}>
        <circle cx={0} cy={0} r={15} fill="rgba(98,117,76,0.06)"
          stroke="rgba(98,117,76,0.3)" strokeWidth={0.8} />
        <text x={0} y={-7} textAnchor="middle" fontSize={6.5}
          fill="rgba(20,24,42,0.6)" fontWeight="700">N</text>
        <polygon points="0,-12 2.5,0 -2.5,0"
          fill="rgba(20,24,42,0.4)" />
        <polygon points="0,12 2.5,0 -2.5,0"
          fill="rgba(98,117,76,0.35)" />
        <line x1={-12} y1={0} x2={12} y2={0}
          stroke="rgba(20,24,42,0.3)" strokeWidth={0.8} />
      </g>

      {/* scale bar */}
      <g transform={`translate(18, ${H - 20})`} opacity={0.45}>
        <line x1={0} y1={0} x2={60} y2={0}
          stroke="rgba(20,24,42,0.6)" strokeWidth={1.2} />
        <line x1={0} y1={-4} x2={0} y2={4}
          stroke="rgba(20,24,42,0.6)" strokeWidth={1.2} />
        <line x1={60} y1={-4} x2={60} y2={4}
          stroke="rgba(20,24,42,0.6)" strokeWidth={1.2} />
        <rect x={0} y={-2} width={30} height={4}
          fill="rgba(20,24,42,0.12)" />
        <text x={30} y={-6} textAnchor="middle" fontSize={7}
          fill="rgba(20,24,42,0.55)">10m</text>
      </g>

      {/* drawing title block — top-left */}
      <g transform="translate(18, 18)" opacity={0.35}>
        <text fontSize={7.5} fontWeight="700" letterSpacing="0.12em"
          fill="rgba(20,24,42,0.7)" fontFamily="'DM Sans', sans-serif">
          FLOOR PLAN
        </text>
        <text y={11} fontSize={6} fill="rgba(20,24,42,0.45)" fontFamily="'DM Sans', sans-serif">
          EVENT LAYOUT · 1:100
        </text>
      </g>
    </svg>
  );
}

// ── Day / Night toggle button ─────────────────────────────────────────────────
function NightToggle({ night, onToggle }) {
  return (
    <motion.button
      onClick={onToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="absolute top-3 right-3 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full"
      style={{
        background: night
          ? "rgba(201,168,76,0.15)"
          : "rgba(20,24,42,0.08)",
        border: night
          ? "1px solid rgba(201,168,76,0.35)"
          : "1px solid rgba(20,24,42,0.15)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        cursor: "pointer",
      }}
    >
      <AnimatePresence mode="wait">
        {night ? (
          <motion.div key="sun"
            initial={{ opacity: 0, rotate: -30 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 30 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5"
          >
            <Sun size={12} style={{ color: "rgba(201,168,76,0.9)" }} />
            <span style={{
              fontFamily: "var(--font-body,'DM Sans',sans-serif)",
              fontSize: 11, fontWeight: 600,
              color: "rgba(201,168,76,0.9)",
              letterSpacing: "0.04em",
            }}>Day</span>
          </motion.div>
        ) : (
          <motion.div key="moon"
            initial={{ opacity: 0, rotate: 30 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -30 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5"
          >
            <Moon size={12} style={{ color: "rgba(20,24,42,0.6)" }} />
            <span style={{
              fontFamily: "var(--font-body,'DM Sans',sans-serif)",
              fontSize: 11, fontWeight: 600,
              color: "rgba(20,24,42,0.6)",
              letterSpacing: "0.04em",
            }}>Night</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// ── Main Canvas ───────────────────────────────────────────────────────────────
export const Canvas = forwardRef(function Canvas(_, ref) {
  const { setNodeRef } = useDroppable({ id: "canvas" });
  const items = useCanvasStore((s) => s.items);
  const loadLayout = useCanvasStore((s) => s.loadLayout);
  const eventType = useEventStore((s) => s.eventDetails?.eventType);
  const initializedEventType = useCanvasStore((s) => s.initializedEventType);

  const [night, setNight] = useState(false);

  useEffect(() => {
    if (!eventType) return;
    if (initializedEventType === eventType) return;
    const layout = layouts[eventType];
    if (!layout) return;
    loadLayout(layout.map((item) => ({ ...item })), eventType);
  }, [eventType, initializedEventType]);

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        if (ref) ref.current = node;
      }}
      className="w-full h-full relative overflow-hidden"
      style={{
        // transition the whole canvas bg for day↔night
        transition: "background 0.7s ease",
        background: night ? "#0e1218" : "#F5F0E8",
      }}
    >
      {/* Animated venue background */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        style={{ zIndex: 0 }}
      >
        <VenueBackground night={night} />
      </motion.div>

      {/* Night ambient orbs */}
      <AnimatePresence>
        {night && (
          <>
            <motion.div
              key="orb1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              style={{
                position: "absolute",
                top: "5%", left: "20%",
                width: 200, height: 200,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(201,168,76,0.08), transparent 70%)",
                filter: "blur(30px)",
                zIndex: 1,
                pointerEvents: "none",
              }}
            />
            <motion.div
              key="orb2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{
                position: "absolute",
                top: "5%", right: "15%",
                width: 180, height: 180,
                borderRadius: "50%",
                background: "radial-gradient(circle, #D9DCD6, transparent 70%)",
                filter: "blur(28px)",
                zIndex: 1,
                pointerEvents: "none",
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Canvas items */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        {items.map((item) => (
          <CanvasItem key={item.id} item={item} night={night} />
        ))}
      </div>

      {/* Day / Night toggle */}
      <div style={{ position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none" }}>
        <div style={{ pointerEvents: "all", position: "absolute", top: 12, right: 12 }}>
          <NightToggle night={night} onToggle={() => setNight((n) => !n)} />
        </div>
      </div>
    </div>
  );
});
