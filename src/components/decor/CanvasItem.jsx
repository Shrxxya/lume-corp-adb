// "use client";

// import { X } from "lucide-react";
// import { useState } from "react";
// import { useDraggable } from "@dnd-kit/core";
// import { useCanvasStore } from "@/store/useCanvasStore";
// import { cn } from "@/components/utils";

// export function CanvasItem({ item }) {
//   const updateItem = useCanvasStore((s) => s.updateItem);
//   const removeItem = useCanvasStore((s) => s.removeItem);

//   const { attributes, listeners, setNodeRef, transform } = useDraggable({
//     id: item.id,
//   });

//   const [resizing, setResizing] = useState(false);
//   const [rotating, setRotating] = useState(false);

//   function handleResize(e) {
//     e.stopPropagation();
//     setResizing(true);

//     const startX = e.clientX;
//     const startY = e.clientY;

//     const startWidth = item.width;
//     const startHeight = item.height;

//     function onMove(ev) {
//       const dx = ev.clientX - startX;
//       const dy = ev.clientY - startY;

//       updateItem(item.id, {
//         width: Math.max(40, startWidth + dx),
//         height: Math.max(30, startHeight + dy),
//       });
//     }

//     function onUp() {
//       setResizing(false);
//       window.removeEventListener("mousemove", onMove);
//       window.removeEventListener("mouseup", onUp);
//     }

//     window.addEventListener("mousemove", onMove);
//     window.addEventListener("mouseup", onUp);
//   }

//   function handleRotate(e) {
//     e.stopPropagation();
//     setRotating(true);

//     const rect = e.target.parentElement.getBoundingClientRect();
//     const centerX = rect.left + rect.width / 2;
//     const centerY = rect.top + rect.height / 2;

//     function onMove(ev) {
//       const angle =
//         Math.atan2(ev.clientY - centerY, ev.clientX - centerX) *
//         (180 / Math.PI);

//       updateItem(item.id, { rotation: angle });
//     }

//     function onUp() {
//       setRotating(false);
//       window.removeEventListener("mousemove", onMove);
//       window.removeEventListener("mouseup", onUp);
//     }

//     window.addEventListener("mousemove", onMove);
//     window.addEventListener("mouseup", onUp);
//   }

//   return (
//     <div
//       ref={setNodeRef}
//       {...listeners}
//       {...attributes}
//       className={cn(
//         "group",
//         "absolute cursor-move",
//         "bg-white/20 backdrop-blur-md border border-white/30",
//         "rounded-lg text-white text-sm",
//         "flex items-center justify-center",
//         "shadow-md"
//       )}
//       style={{
//         left: item.x,
//         top: item.y,
//         width: item.width,
//         height: item.height,
//         transform: `
//           translate(${transform?.x || 0}px, ${transform?.y || 0}px)
//           rotate(${item.rotation}deg)
//         `,
//       }}
//     >
//       {item.type}

//       {/* Resize handle */}
//       <div
//         onMouseDown={handleResize}
//         className="absolute bottom-0 right-0 w-3 h-3 bg-white cursor-se-resize"
//       />

//       {/* Rotate handle */}
//       <div
//         onMouseDown={handleRotate}
//         className="absolute -top-4 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-400 rounded-full cursor-pointer"
//       />
//       {/* Delete button */}
//       <button
//         onPointerDown={(e) => {
//           e.stopPropagation();
//           removeItem(item.id);
//         }}
//         className="
//           absolute -top-2 -right-2
//           w-5 h-5 rounded-full
//           bg-red-500 text-white
//           flex items-center justify-center
//           opacity-0 hover:opacity-100
//           group-hover:opacity-100
//           transition
//           z-50
//         "
//       >
//         <X size={12} />
//       </button>
//     </div>
//   );
// }

"use client";

import { X, RotateCw } from "lucide-react";
import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { useCanvasStore } from "@/store/useCanvasStore";
import { cn } from "@/components/utils";
import { motion, AnimatePresence } from "framer-motion";

// ─── NIGHT-MODE GLOW PER ELEMENT ─────────────────────────────────────────────
const elementGlow = {
  "Stage":               "0 0 32px rgba(201,168,76,0.55), 0 0 8px rgba(201,168,76,0.3)",
  "LED Stage":           "0 0 40px rgba(80,160,255,0.55), 0 0 12px rgba(80,160,255,0.3)",
  "Live Band Stage":     "0 0 32px rgba(98,117,76,0.7),  0 0 8px rgba(98,117,76,0.4)",
  "Instructor Stage":    "0 0 28px rgba(201,168,76,0.5), 0 0 8px rgba(201,168,76,0.25)",
  "Main Stage":          "0 0 32px rgba(201,168,76,0.55),0 0 8px rgba(201,168,76,0.3)",
  "Dance Floor":         "0 0 36px rgba(180,80,220,0.5), 0 0 10px rgba(180,80,220,0.25)",
  "Bar Counter":         "0 0 28px rgba(255,160,60,0.5), 0 0 8px rgba(255,160,60,0.25)",
  "Red Carpet":          "0 0 28px rgba(200,40,40,0.55), 0 0 8px rgba(200,40,40,0.3)",
  "LED Wall":            "0 0 40px rgba(60,180,255,0.6), 0 0 12px rgba(60,180,255,0.35)",
  "Projector Screen":    "0 0 32px rgba(200,220,255,0.45),0 0 8px rgba(200,220,255,0.2)",
  "Demo Pod":            "0 0 20px rgba(98,200,160,0.45),0 0 6px rgba(98,200,160,0.2)",
  "Press Zone":          "0 0 20px rgba(255,200,60,0.4), 0 0 6px rgba(255,200,60,0.2)",
  "Seating Area":        "0 0 16px rgba(98,117,76,0.3)",
  "Audience Block":      "0 0 16px rgba(98,117,76,0.3)",
  "Networking Lounge":   "0 0 20px rgba(140,180,140,0.35)",
  "Networking Zone":     "0 0 20px rgba(140,180,140,0.35)",
  "Registration Desk":   "0 0 16px rgba(255,255,255,0.2)",
  "Speaker Podium":      "0 0 24px rgba(201,168,76,0.45)",
  "Photo Wall":          "0 0 24px rgba(255,180,120,0.4)",
  "VIP Table":           "0 0 20px rgba(201,168,76,0.5)",
  "Lounge Sofa":         "0 0 16px rgba(160,120,80,0.35)",
  "Candle Tables":       "0 0 24px rgba(255,160,40,0.5)",
  "Sponsor Booth":       "0 0 18px rgba(98,117,76,0.35)",
  "Food Court":          "0 0 20px rgba(255,160,60,0.4)",
  "Exhibit Booth":       "0 0 18px rgba(98,200,180,0.35)",
  "Workshop Table":      "0 0 14px rgba(255,255,255,0.15)",
  "Whiteboard":          "0 0 20px rgba(200,220,255,0.35)",
  "Refreshments Corner": "0 0 20px rgba(255,180,80,0.4)",
  "Award Desk":          "0 0 28px rgba(201,168,76,0.5)",
  "Camera Zone":         "0 0 18px rgba(255,60,60,0.4)",
  "Charging Station":    "0 0 16px rgba(80,200,255,0.4)",
  "Info Desk":           "0 0 14px rgba(255,255,255,0.2)",
  "Media Row":           "0 0 18px rgba(255,200,60,0.4)",
};

const dayBg = {
  "Stage":               "#E8D9A0",
  "LED Stage":           "#B8D4F0",
  "Live Band Stage":     "#C8D5B9",
  "Instructor Stage":    "#E8D9A0",
  "Main Stage":          "#E8D9A0",
  "Dance Floor":         "#E0C8E8",
  "Bar Counter":         "#F0D8B8",
  "Red Carpet":          "#E8B8B8",
  "LED Wall":            "#B8D8F8",
  "Projector Screen":    "#D8E4F8",
  "Demo Pod":            "#B8E4D4",
  "Press Zone":          "#F8E8B8",
  "Seating Area":        "#D4E0CC",
  "Audience Block":      "#D4E0CC",
  "Networking Lounge":   "#C8DCC8",
  "Networking Zone":     "#C8DCC8",
  "Registration Desk":   "#E8E8E8",
  "Speaker Podium":      "#E8D9A0",
  "Photo Wall":          "#F0D8C0",
  "VIP Table":           "#F0E0A8",
  "Lounge Sofa":         "#E0D0B8",
  "Candle Tables":       "#F8E0A8",
  "Sponsor Booth":       "#C8DCC0",
  "Food Court":          "#F0D8B8",
  "Exhibit Booth":       "#C0DCD8",
  "Workshop Table":      "#E8E8E8",
  "Whiteboard":          "#EEEEFF",
  "Refreshments Corner": "#F0D8B0",
  "Award Desk":          "#F0E0A8",
  "Camera Zone":         "#F8C8C8",
  "Charging Station":    "#C0E0F8",
  "Info Desk":           "#E8E8F0",
  "Media Row":           "#F8E8B0",
};

// ─── SVG ILLUSTRATIONS (top-down architectural) ──────────────────────────────
function ElementArt({ type, width, height, night }) {
  const w = width;
  const h = height;
  const color = night ? "rgba(255,255,255,0.9)" : "rgba(20,24,42,0.7)";
  const dim = night ? "rgba(255,255,255,0.18)" : "rgba(20,24,42,0.08)";
  const accent = night ? "rgba(255,255,255,0.5)" : "rgba(20,24,42,0.25)";

  const imageMap = {
    "Award Desk": "/RnRAssets/awardsDesk.jpg",
    "Photo Wall": "/RnRAssets/photoWall.jpg",
    "VIP Table": "/RnRAssets/vip-table.png",
    "Stage": "/RnRAssets/stage.jpg",
    "Red Carpet": "/RnRAssets/redCarpet.jpg",
    "Seating Area": "/RnRAssets/seating.jpg",
    "Camera Zone": "/RnRAssets/cameraZone.jpg"
  };

  if (imageMap[type]) {
  return (
    <img
      src={imageMap[type]}
      alt={type}
      className="absolute inset-0 w-full h-full object-contain pointer-events-none"
      draggable={false}
    />
  );
}

  switch (type) {

    // ── STAGE / MAIN STAGE ───────────────────────────────────────────────────
    case "Stage":
    case "Main Stage":
    case "Instructor Stage":
    case "Live Band Stage": {
      const cx = w / 2, cy = h / 2;
      return (
        <svg width={w} height={h} style={{ position: "absolute", inset: 0 }}>
          {/* platform */}
          <rect x={8} y={8} width={w - 16} height={h - 16} rx={6} fill={dim} />
          {/* front edge */}
          <rect x={8} y={h - 20} width={w - 16} height={6} rx={2} fill={accent} />
          {/* spotlights */}
          {[0.25, 0.5, 0.75].map((t, i) => (
            <g key={i}>
              <circle cx={cx * 2 * t} cy={16} r={5} fill={night ? "rgba(255,220,100,0.8)" : "rgba(201,168,76,0.6)"} />
              <line x1={cx * 2 * t} y1={21} x2={cx * 2 * t} y2={h - 20}
                stroke={night ? "rgba(255,220,100,0.15)" : "rgba(201,168,76,0.1)"} strokeWidth={cx * 0.4} />
            </g>
          ))}
          {/* mic stand */}
          <circle cx={cx} cy={cy + 4} r={4} fill={color} opacity={0.6} />
          <line x1={cx} y1={cy + 8} x2={cx} y2={cy + 18} stroke={color} strokeWidth={1.5} opacity={0.5} />
          <line x1={cx - 6} y1={cy + 18} x2={cx + 6} y2={cy + 18} stroke={color} strokeWidth={1.5} opacity={0.5} />
        </svg>
      );
    }

    // ── LED STAGE ────────────────────────────────────────────────────────────
    case "LED Stage": {
      return (
        <svg width={w} height={h} style={{ position: "absolute", inset: 0 }}>
          <rect x={4} y={4} width={w - 8} height={h - 8} rx={4} fill={dim} />
          {/* LED pixel grid */}
          {Array.from({ length: Math.floor((w - 20) / 12) }).map((_, col) =>
            Array.from({ length: Math.floor((h - 20) / 12) }).map((_, row) => (
              <circle
                key={`${col}-${row}`}
                cx={14 + col * 12} cy={14 + row * 12} r={3}
                fill={night
                  ? `hsl(${(col * 30 + row * 20) % 360}, 80%, 70%)`
                  : `rgba(80,160,255,${0.2 + (col + row) % 3 * 0.15})`}
              />
            ))
          )}
          {/* scanline overlay */}
          {Array.from({ length: Math.floor(h / 8) }).map((_, i) => (
            <line key={i} x1={4} y1={4 + i * 8} x2={w - 4} y2={4 + i * 8}
              stroke={night ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.05)"} strokeWidth={1} />
          ))}
        </svg>
      );
    }

    // ── DANCE FLOOR ──────────────────────────────────────────────────────────
    case "Dance Floor": {
      const tileW = Math.max(16, Math.floor((w - 16) / 5));
      const tileH = Math.max(16, Math.floor((h - 16) / 4));
      const cols = Math.floor((w - 16) / tileW);
      const rows = Math.floor((h - 16) / tileH);
      return (
        <svg width={w} height={h} style={{ position: "absolute", inset: 0 }}>
          <rect x={6} y={6} width={w - 12} height={h - 12} rx={4} fill={dim} />
          {Array.from({ length: rows }).map((_, r) =>
            Array.from({ length: cols }).map((_, c) => {
              const hue = night ? (c * 47 + r * 73) % 360 : 0;
              const isLight = (r + c) % 2 === 0;
              return (
                <rect key={`${r}-${c}`}
                  x={8 + c * tileW} y={8 + r * tileH}
                  width={tileW - 1} height={tileH - 1} rx={1}
                  fill={night
                    ? `hsla(${hue}, 70%, 60%, ${isLight ? 0.5 : 0.2})`
                    : isLight ? "rgba(180,80,220,0.25)" : "rgba(180,80,220,0.1)"}
                />
              );
            })
          )}
          {/* center reflection */}
          <ellipse cx={w / 2} cy={h / 2} rx={w * 0.15} ry={h * 0.15}
            fill={night ? "rgba(255,255,255,0.12)" : "rgba(180,80,220,0.15)"} />
        </svg>
      );
    }

    // ── RED CARPET ───────────────────────────────────────────────────────────
    case "Red Carpet": {
      return (
        <svg width={w} height={h} style={{ position: "absolute", inset: 0 }}>
          {/* carpet body */}
          <rect x={8} y={4} width={w - 16} height={h - 8} rx={4}
            fill={night ? "rgba(180,30,30,0.7)" : "rgba(180,30,30,0.5)"} />
          {/* gold border lines */}
          <rect x={10} y={6} width={w - 20} height={h - 12} rx={3}
            fill="none" stroke={night ? "rgba(201,168,76,0.8)" : "rgba(201,168,76,0.6)"} strokeWidth={2} />
          <rect x={14} y={10} width={w - 28} height={h - 20} rx={2}
            fill="none" stroke={night ? "rgba(201,168,76,0.4)" : "rgba(201,168,76,0.25)"} strokeWidth={1} />
          {/* pattern lines */}
          {Array.from({ length: Math.floor(h / 20) }).map((_, i) => (
            <line key={i}
              x1={14} y1={20 + i * 20} x2={w - 14} y2={20 + i * 20}
              stroke={night ? "rgba(201,168,76,0.2)" : "rgba(201,168,76,0.15)"} strokeWidth={1} />
          ))}
          {/* star */}
          <text x={w / 2} y={h / 2 + 5} textAnchor="middle" fontSize={16}
            fill={night ? "rgba(255,220,100,0.8)" : "rgba(201,168,76,0.7)"}>★</text>
        </svg>
      );
    }

    // ── BAR COUNTER ──────────────────────────────────────────────────────────
    case "Bar Counter": {
      return (
        <svg width={w} height={h} style={{ position: "absolute", inset: 0 }}>
          {/* counter top */}
          <rect x={6} y={6} width={w - 12} height={h * 0.5} rx={6}
            fill={night ? "rgba(120,70,20,0.6)" : "rgba(160,100,40,0.4)"} />
          <rect x={8} y={8} width={w - 16} height={h * 0.5 - 4} rx={5}
            fill="none" stroke={night ? "rgba(201,168,76,0.6)" : "rgba(201,168,76,0.4)"} strokeWidth={1.5} />
          {/* glasses row */}
          {[0.2, 0.38, 0.56, 0.74].filter(t => t * w < w - 14).map((t, i) => (
            <g key={i} transform={`translate(${t * w}, ${h * 0.25})`}>
              <ellipse cx={0} cy={0} rx={5} ry={7}
                fill={night ? "rgba(150,220,255,0.5)" : "rgba(100,160,220,0.35)"} />
              <line x1={0} y1={7} x2={0} y2={12}
                stroke={night ? "rgba(150,220,255,0.6)" : "rgba(100,160,220,0.4)"} strokeWidth={1.5} />
              <line x1={-4} y1={12} x2={4} y2={12}
                stroke={night ? "rgba(150,220,255,0.6)" : "rgba(100,160,220,0.4)"} strokeWidth={1.5} />
            </g>
          ))}
          {/* shelves */}
          <rect x={8} y={h * 0.6} width={w - 16} height={4} rx={2}
            fill={night ? "rgba(120,70,20,0.5)" : "rgba(160,100,40,0.3)"} />
          <rect x={8} y={h * 0.75} width={w - 16} height={4} rx={2}
            fill={night ? "rgba(120,70,20,0.5)" : "rgba(160,100,40,0.3)"} />
          {/* bottles */}
          {[0.25, 0.5, 0.75].map((t, i) => (
            <g key={i} transform={`translate(${t * w}, ${h * 0.68})`}>
              <rect x={-3} y={-8} width={6} height={12} rx={3}
                fill={night
                  ? `hsla(${i * 60 + 100}, 70%, 50%, 0.6)`
                  : `hsla(${i * 60 + 100}, 60%, 45%, 0.4)`} />
            </g>
          ))}
        </svg>
      );
    }

    // ── SEATING AREA / AUDIENCE BLOCK ─────────────────────────────────────
    case "Seating Area":
    case "Audience Block": {
      const cols2 = Math.floor((w - 20) / 14);
      const rows2 = Math.floor((h - 20) / 14);
      return (
        <svg width={w} height={h} style={{ position: "absolute", inset: 0 }}>
          <rect x={4} y={4} width={w - 8} height={h - 8} rx={4} fill={dim} />
          {Array.from({ length: Math.min(rows2, 8) }).map((_, r) =>
            Array.from({ length: Math.min(cols2, 10) }).map((_, c) => (
              <g key={`${r}-${c}`} transform={`translate(${10 + c * 14}, ${10 + r * 14})`}>
                {/* seat back */}
                <rect x={0} y={0} width={10} height={7} rx={2}
                  fill={night ? "rgba(98,117,76,0.7)" : "rgba(98,117,76,0.5)"} />
                {/* seat base */}
                <rect x={1} y={7} width={8} height={5} rx={1}
                  fill={night ? "rgba(98,117,76,0.5)" : "rgba(98,117,76,0.35)"} />
              </g>
            ))
          )}
        </svg>
      );
    }

    // ── LED WALL / PROJECTOR SCREEN ─────────────────────────────────────────
    case "LED Wall":
    case "Projector Screen": {
      const isLED = type === "LED Wall";
      return (
        <svg width={w} height={h} style={{ position: "absolute", inset: 0 }}>
          <rect x={4} y={4} width={w - 8} height={h - 8} rx={3}
            fill={night
              ? isLED ? "rgba(20,60,120,0.7)" : "rgba(230,235,255,0.15)"
              : isLED ? "rgba(20,60,120,0.3)" : "rgba(200,210,255,0.3)"} />
          {/* screen bezel */}
          <rect x={4} y={4} width={w - 8} height={h - 8} rx={3}
            fill="none"
            stroke={night ? "rgba(255,255,255,0.3)" : "rgba(20,24,42,0.2)"}
            strokeWidth={3} />
          {isLED ? (
            <>
              {/* LED pixel clusters */}
              {Array.from({ length: Math.floor((w - 24) / 16) }).map((_, c) =>
                Array.from({ length: Math.floor((h - 24) / 16) }).map((_, r) => (
                  <rect key={`${c}-${r}`} x={12 + c * 16} y={12 + r * 16} width={12} height={12} rx={1}
                    fill={night ? `hsla(${(c * 40 + r * 60) % 360}, 90%, 65%, 0.7)` : `rgba(60,140,255,${0.15 + (c + r) % 3 * 0.1})`} />
                ))
              )}
            </>
          ) : (
            <>
              {/* projection lines */}
              <line x1={w / 2} y1={h / 2} x2={8} y2={8}
                stroke={night ? "rgba(200,220,255,0.1)" : "rgba(60,100,200,0.08)"} strokeWidth={2} />
              <line x1={w / 2} y1={h / 2} x2={w - 8} y2={8}
                stroke={night ? "rgba(200,220,255,0.1)" : "rgba(60,100,200,0.08)"} strokeWidth={2} />
              {/* screen content lines */}
              {[0.3, 0.5, 0.7].map((t, i) => (
                <line key={i} x1={16} y1={t * h} x2={w - 16} y2={t * h}
                  stroke={night ? "rgba(200,220,255,0.25)" : "rgba(60,100,200,0.15)"} strokeWidth={1.5} />
              ))}
            </>
          )}
        </svg>
      );
    }

    // ── DEMO POD ─────────────────────────────────────────────────────────────
    case "Demo Pod": {
      const cx3 = w / 2, cy3 = h / 2;
      const r3 = Math.min(w, h) / 2 - 8;
      const pts = 6;
      const hexPoints = Array.from({ length: pts }, (_, i) => {
        const a = (i * 60 - 30) * Math.PI / 180;
        return `${cx3 + r3 * Math.cos(a)},${cy3 + r3 * Math.sin(a)}`;
      }).join(" ");
      return (
        <svg width={w} height={h} style={{ position: "absolute", inset: 0 }}>
          <polygon points={hexPoints}
            fill={dim} stroke={accent} strokeWidth={1.5} />
          {/* inner screen */}
          <rect x={cx3 - w * 0.25} y={cy3 - h * 0.22} width={w * 0.5} height={h * 0.3} rx={3}
            fill={night ? "rgba(60,180,140,0.5)" : "rgba(60,180,140,0.3)"}
            stroke={night ? "rgba(60,220,160,0.6)" : "rgba(60,180,140,0.4)"} strokeWidth={1} />
          {/* screen lines */}
          <line x1={cx3 - w * 0.18} y1={cy3 - h * 0.08} x2={cx3 + w * 0.18} y2={cy3 - h * 0.08}
            stroke={night ? "rgba(60,220,160,0.5)" : "rgba(60,180,140,0.35)"} strokeWidth={1} />
          <line x1={cx3 - w * 0.18} y1={cy3 + h * 0.0} x2={cx3 + w * 0.18} y2={cy3 + h * 0.0}
            stroke={night ? "rgba(60,220,160,0.5)" : "rgba(60,180,140,0.35)"} strokeWidth={1} />
          {/* stand */}
          <line x1={cx3} y1={cy3 + h * 0.15} x2={cx3} y2={cy3 + h * 0.35}
            stroke={color} strokeWidth={2} opacity={0.4} />
        </svg>
      );
    }

    // ── VIP TABLE ────────────────────────────────────────────────────────────
    case "VIP Table": {
      const cx4 = w / 2, cy4 = h / 2;
      const tr = Math.min(w, h) * 0.28;
      return (
        <svg width={w} height={h} style={{ position: "absolute", inset: 0 }}>
          {/* table circle */}
          <circle cx={cx4} cy={cy4} r={tr}
            fill={night ? "rgba(120,80,20,0.5)" : "rgba(160,110,40,0.35)"}
            stroke={night ? "rgba(201,168,76,0.7)" : "rgba(201,168,76,0.5)"} strokeWidth={2} />
          {/* tablecloth pattern */}
          <circle cx={cx4} cy={cy4} r={tr - 4}
            fill="none" stroke={night ? "rgba(201,168,76,0.25)" : "rgba(201,168,76,0.15)"} strokeWidth={1}
            strokeDasharray="4 4" />
          {/* candle */}
          <circle cx={cx4} cy={cy4} r={3}
            fill={night ? "rgba(255,180,40,0.9)" : "rgba(255,160,40,0.6)"} />
          {night && <circle cx={cx4} cy={cy4} r={6}
            fill="rgba(255,180,40,0.2)" />}
          {/* chairs around */}
          {Array.from({ length: 6 }, (_, i) => {
            const a = (i * 60) * Math.PI / 180;
            const cr = tr + 10;
            return (
              <rect key={i}
                x={cx4 + cr * Math.cos(a) - 7} y={cy4 + cr * Math.sin(a) - 5}
                width={14} height={10} rx={3}
                fill={night ? "rgba(98,117,76,0.7)" : "rgba(98,117,76,0.5)"}
                transform={`rotate(${i * 60}, ${cx4 + cr * Math.cos(a)}, ${cy4 + cr * Math.sin(a)})`}
              />
            );
          })}
        </svg>
      );
    }

    // ── CANDLE TABLES ────────────────────────────────────────────────────────
    case "Candle Tables": {
      const tableCount = Math.floor(w / 55);
      return (
        <svg width={w} height={h} style={{ position: "absolute", inset: 0 }}>
          <rect x={4} y={4} width={w - 8} height={h - 8} rx={6} fill={dim} />
          {Array.from({ length: tableCount }).map((_, i) => {
            const tx = (i + 0.5) * (w / tableCount);
            const ty = h / 2;
            return (
              <g key={i}>
                <circle cx={tx} cy={ty} r={18}
                  fill={night ? "rgba(120,70,20,0.5)" : "rgba(160,100,40,0.3)"}
                  stroke={night ? "rgba(201,168,76,0.6)" : "rgba(201,168,76,0.4)"} strokeWidth={1.5} />
                <circle cx={tx} cy={ty} r={3}
                  fill={night ? "rgba(255,160,30,0.95)" : "rgba(255,140,30,0.6)"} />
                {night && <circle cx={tx} cy={ty} r={9} fill="rgba(255,140,30,0.15)" />}
              </g>
            );
          })}
        </svg>
      );
    }

    // ── LOUNGE SOFA ──────────────────────────────────────────────────────────
    case "Lounge Sofa": {
      return (
        <svg width={w} height={h} style={{ position: "absolute", inset: 0 }}>
          {/* sofa back */}
          <rect x={6} y={6} width={w - 12} height={h * 0.45} rx={8}
            fill={night ? "rgba(100,70,40,0.6)" : "rgba(140,100,60,0.4)"}
            stroke={accent} strokeWidth={1} />
          {/* seat cushions */}
          {Array.from({ length: Math.floor(w / 35) }).map((_, i) => (
            <rect key={i}
              x={8 + i * (w - 16) / Math.floor(w / 35)}
              y={h * 0.52}
              width={(w - 16) / Math.floor(w / 35) - 3}
              height={h * 0.36} rx={5}
              fill={night ? "rgba(120,80,40,0.5)" : "rgba(160,110,60,0.35)"}
              stroke={accent} strokeWidth={1} />
          ))}
          {/* armrests */}
          <rect x={4} y={h * 0.4} width={8} height={h * 0.5} rx={4}
            fill={night ? "rgba(80,55,30,0.7)" : "rgba(120,85,50,0.5)"} />
          <rect x={w - 12} y={h * 0.4} width={8} height={h * 0.5} rx={4}
            fill={night ? "rgba(80,55,30,0.7)" : "rgba(120,85,50,0.5)"} />
        </svg>
      );
    }

    // ── PHOTO WALL ───────────────────────────────────────────────────────────
    case "Photo Wall": {
      return (
        <svg width={w} height={h} style={{ position: "absolute", inset: 0 }}>
          <rect x={4} y={4} width={w - 8} height={h - 8} rx={4} fill={dim} />
          {/* grid of photo frames */}
          {Array.from({ length: 3 }).map((_, r) =>
            Array.from({ length: Math.floor((w - 20) / 28) }).map((_, c) => (
              <g key={`${r}-${c}`}>
                <rect x={10 + c * 28} y={8 + r * ((h - 20) / 3)} width={22} height={(h - 24) / 3 - 2} rx={2}
                  fill={night
                    ? `hsla(${(c * 40 + r * 80 + 20) % 360}, 60%, 55%, 0.5)`
                    : `hsla(${(c * 40 + r * 80 + 20) % 360}, 50%, 50%, 0.3)`}
                  stroke={night ? "rgba(255,255,255,0.3)" : "rgba(20,24,42,0.2)"} strokeWidth={1} />
              </g>
            ))
          )}
          {/* brand text */}
          <rect x={8} y={h - 14} width={w - 16} height={8} rx={2}
            fill={night ? "rgba(201,168,76,0.4)" : "rgba(201,168,76,0.25)"} />
        </svg>
      );
    }

    // ── WORKSHOP TABLE ───────────────────────────────────────────────────────
    case "Workshop Table": {
      return (
        <svg width={w} height={h} style={{ position: "absolute", inset: 0 }}>
          <rect x={6} y={6} width={w - 12} height={h - 12} rx={4}
            fill={night ? "rgba(200,180,140,0.2)" : "rgba(200,180,140,0.3)"}
            stroke={accent} strokeWidth={1.5} />
          {/* laptop icon */}
          <rect x={w * 0.25} y={h * 0.2} width={w * 0.5} height={h * 0.4} rx={2}
            fill={night ? "rgba(60,120,200,0.4)" : "rgba(60,120,200,0.25)"}
            stroke={night ? "rgba(80,160,255,0.4)" : "rgba(60,120,200,0.35)"} strokeWidth={1} />
          <rect x={w * 0.15} y={h * 0.62} width={w * 0.7} height={h * 0.12} rx={2}
            fill={night ? "rgba(200,180,140,0.25)" : "rgba(180,160,120,0.25)"} />
        </svg>
      );
    }

    // ── WHITEBOARD ───────────────────────────────────────────────────────────
    case "Whiteboard": {
      return (
        <svg width={w} height={h} style={{ position: "absolute", inset: 0 }}>
          <rect x={4} y={4} width={w - 8} height={h - 12} rx={3}
            fill={night ? "rgba(230,235,255,0.12)" : "rgba(230,235,255,0.5)"}
            stroke={night ? "rgba(200,220,255,0.4)" : "rgba(20,24,42,0.25)"} strokeWidth={2} />
          {/* marker lines */}
          {[0.3, 0.48, 0.65].map((t, i) => (
            <line key={i} x1={10} y1={t * h} x2={w - 10} y2={t * h}
              stroke={night ? "rgba(200,220,255,0.3)" : "rgba(60,80,180,0.25)"} strokeWidth={2} />
          ))}
          {/* tray */}
          <rect x={4} y={h - 10} width={w - 8} height={6} rx={2}
            fill={night ? "rgba(200,180,140,0.3)" : "rgba(180,160,120,0.3)"} />
        </svg>
      );
    }

    // ── PRESS / CAMERA ZONE ──────────────────────────────────────────────────
    case "Press Zone":
    case "Camera Zone": {
      return (
        <svg width={w} height={h} style={{ position: "absolute", inset: 0 }}>
          <rect x={4} y={4} width={w - 8} height={h - 8} rx={4} fill={dim} />
          {/* camera icons */}
          {Array.from({ length: Math.min(3, Math.floor(w / 28)) }).map((_, i) => {
            const x = (i + 0.5) * (w / Math.min(3, Math.floor(w / 28)));
            return (
              <g key={i} transform={`translate(${x}, ${h / 2})`}>
                <rect x={-10} y={-8} width={20} height={14} rx={3}
                  fill={night ? "rgba(255,60,60,0.5)" : "rgba(200,40,40,0.35)"}
                  stroke={night ? "rgba(255,100,100,0.6)" : "rgba(180,30,30,0.4)"} strokeWidth={1} />
                <circle cx={0} cy={-1} r={4}
                  fill={night ? "rgba(40,40,60,0.8)" : "rgba(40,40,60,0.5)"}
                  stroke={night ? "rgba(255,60,60,0.4)" : "rgba(180,30,30,0.3)"} strokeWidth={1} />
                {/* rec dot */}
                <circle cx={7} cy={-5} r={2}
                  fill={night ? "rgba(255,60,60,0.9)" : "rgba(200,40,40,0.7)"} />
              </g>
            );
          })}
        </svg>
      );
    }

    // ── REGISTRATION / INFO / AWARD DESK ────────────────────────────────────
    case "Registration Desk":
    case "Info Desk":
    case "Award Desk":
    case "Speaker Podium": {
      return (
        <svg width={w} height={h} style={{ position: "absolute", inset: 0 }}>
          {/* desk surface */}
          <rect x={6} y={6} width={w - 12} height={h - 12} rx={5}
            fill={night ? "rgba(180,150,80,0.25)" : "rgba(200,170,100,0.3)"}
            stroke={night ? "rgba(201,168,76,0.5)" : "rgba(201,168,76,0.4)"} strokeWidth={1.5} />
          {/* front panel */}
          <rect x={6} y={h * 0.55} width={w - 12} height={h * 0.3} rx={3}
            fill={night ? "rgba(100,80,30,0.5)" : "rgba(140,110,50,0.35)"} />
          {/* M² logo mark */}
          <text x={w / 2} y={h * 0.4} textAnchor="middle" fontSize={Math.min(w, h) * 0.25}
            fill={night ? "rgba(201,168,76,0.7)" : "rgba(201,168,76,0.6)"}
            fontWeight="bold">M²</text>
        </svg>
      );
    }

    // ── NETWORKING LOUNGE / ZONE ─────────────────────────────────────────────
    case "Networking Lounge":
    case "Networking Zone": {
      return (
        <svg width={w} height={h} style={{ position: "absolute", inset: 0 }}>
          <rect x={4} y={4} width={w - 8} height={h - 8} rx={8} fill={dim} />
          {/* node-link network graphic */}
          {[
            { cx: w * 0.25, cy: h * 0.35 },
            { cx: w * 0.55, cy: h * 0.25 },
            { cx: w * 0.72, cy: h * 0.55 },
            { cx: w * 0.38, cy: h * 0.65 },
            { cx: w * 0.58, cy: h * 0.7 },
          ].map((node, i, nodes) => (
            <g key={i}>
              {nodes.slice(i + 1).map((other, j) => (
                <line key={j} x1={node.cx} y1={node.cy} x2={other.cx} y2={other.cy}
                  stroke={night ? "rgba(140,200,140,0.25)" : "rgba(98,117,76,0.2)"}
                  strokeWidth={1} />
              ))}
              <circle cx={node.cx} cy={node.cy} r={6}
                fill={night ? "rgba(98,200,140,0.7)" : "rgba(98,117,76,0.5)"}
                stroke={night ? "rgba(140,255,180,0.5)" : "rgba(98,117,76,0.4)"} strokeWidth={1.5} />
            </g>
          ))}
        </svg>
      );
    }

    // ── FOOD COURT / REFRESHMENTS ────────────────────────────────────────────
    case "Food Court":
    case "Refreshments Corner": {
      return (
        <svg width={w} height={h} style={{ position: "absolute", inset: 0 }}>
          <rect x={4} y={4} width={w - 8} height={h - 8} rx={6} fill={dim} />
          {/* counter */}
          <rect x={8} y={h * 0.1} width={w - 16} height={h * 0.35} rx={4}
            fill={night ? "rgba(180,120,40,0.35)" : "rgba(200,150,60,0.3)"}
            stroke={accent} strokeWidth={1} />
          {/* food items */}
          {[0.2, 0.4, 0.6, 0.8].filter(t => t * (w - 16) + 16 < w - 10).map((t, i) => (
            <circle key={i} cx={8 + t * (w - 16)} cy={h * 0.28} r={7}
              fill={night
                ? `hsla(${i * 30 + 20}, 75%, 55%, 0.7)`
                : `hsla(${i * 30 + 20}, 65%, 50%, 0.5)`} />
          ))}
          {/* tables below */}
          {Array.from({ length: Math.floor((w - 20) / 36) }).map((_, i) => (
            <circle key={i} cx={18 + i * 36} cy={h * 0.72} r={12}
              fill={night ? "rgba(180,130,60,0.3)" : "rgba(200,160,80,0.25)"}
              stroke={accent} strokeWidth={1} />
          ))}
        </svg>
      );
    }

    // ── EXHIBIT BOOTH / SPONSOR BOOTH ────────────────────────────────────────
    case "Exhibit Booth":
    case "Sponsor Booth": {
      return (
        <svg width={w} height={h} style={{ position: "absolute", inset: 0 }}>
          <rect x={4} y={4} width={w - 8} height={h - 8} rx={4} fill={dim} />
          {/* back wall */}
          <rect x={8} y={8} width={w - 16} height={h * 0.4} rx={3}
            fill={night ? "rgba(98,117,76,0.35)" : "rgba(98,117,76,0.25)"}
            stroke={accent} strokeWidth={1} />
          {/* banner */}
          <rect x={12} y={12} width={w - 24} height={h * 0.25} rx={2}
            fill={night ? "rgba(201,168,76,0.3)" : "rgba(201,168,76,0.2)"} />
          {/* table */}
          <rect x={w * 0.2} y={h * 0.55} width={w * 0.6} height={h * 0.2} rx={3}
            fill={night ? "rgba(200,180,140,0.2)" : "rgba(200,180,140,0.25)"}
            stroke={accent} strokeWidth={1} />
        </svg>
      );
    }

    // ── CHARGING STATION ─────────────────────────────────────────────────────
    case "Charging Station": {
      return (
        <svg width={w} height={h} style={{ position: "absolute", inset: 0 }}>
          <rect x={4} y={4} width={w - 8} height={h - 8} rx={4} fill={dim} />
          {/* power icon */}
          <text x={w / 2} y={h * 0.55} textAnchor="middle" fontSize={Math.min(w, h) * 0.4}
            fill={night ? "rgba(80,200,255,0.8)" : "rgba(40,140,220,0.6)"}>⚡</text>
          {/* cable row */}
          {Array.from({ length: Math.min(4, Math.floor((w - 20) / 16)) }).map((_, i) => (
            <circle key={i} cx={12 + i * ((w - 24) / Math.min(4, Math.floor((w - 20) / 16)))} cy={h * 0.78} r={4}
              fill={night ? "rgba(80,200,255,0.5)" : "rgba(40,140,220,0.35)"} />
          ))}
        </svg>
      );
    }

    // ── MEDIA ROW ────────────────────────────────────────────────────────────
    case "Media Row": {
      return (
        <svg width={w} height={h} style={{ position: "absolute", inset: 0 }}>
          <rect x={4} y={4} width={w - 8} height={h - 8} rx={4} fill={dim} />
          {Array.from({ length: Math.floor((w - 20) / 28) }).map((_, i) => (
            <g key={i} transform={`translate(${14 + i * 28}, ${h / 2})`}>
              {/* camera */}
              <rect x={-8} y={-5} width={16} height={10} rx={2}
                fill={night ? "rgba(255,200,60,0.45)" : "rgba(220,170,40,0.35)"}
                stroke={night ? "rgba(255,220,80,0.5)" : "rgba(200,150,30,0.4)"} strokeWidth={1} />
              <circle cx={0} cy={0} r={3}
                fill={night ? "rgba(40,40,60,0.8)" : "rgba(40,40,60,0.5)"} />
            </g>
          ))}
        </svg>
      );
    }

    // ── DEFAULT FALLBACK ─────────────────────────────────────────────────────
    default:
      return (
        <svg width={w} height={h} style={{ position: "absolute", inset: 0 }}>
          <rect x={4} y={4} width={w - 8} height={h - 8} rx={6} fill={dim} stroke={accent} strokeWidth={1} />
        </svg>
      );
  }
}

// ─── ELEMENT TOOLTIPS ─────────────────────────────────────────────────────────
const elementTooltips = {
  "Stage": "Main performance area",
  "LED Stage": "High-res LED backdrop stage",
  "Live Band Stage": "Live music performance area",
  "Dance Floor": "Open dance area with lighting",
  "Bar Counter": "Full-service bar",
  "Red Carpet": "VIP arrival walkway",
  "LED Wall": "Large-format LED display",
  "Projector Screen": "Projection display surface",
  "Demo Pod": "Interactive product demo station",
  "VIP Table": "Reserved VIP dining table",
  "Seating Area": "General guest seating",
  "Audience Block": "Main audience seating block",
  "Networking Lounge": "Informal networking area",
  "Registration Desk": "Guest check-in counter",
  "Speaker Podium": "Presenter speaking position",
  "Photo Wall": "Branded photo backdrop",
  "Candle Tables": "Ambient candlelit dining",
  "Lounge Sofa": "Relaxed lounge seating",
  "Press Zone": "Media & photography area",
  "Camera Zone": "Broadcast camera positions",
  "Sponsor Booth": "Sponsor branding booth",
  "Exhibit Booth": "Exhibition display booth",
  "Food Court": "Food & beverage stations",
  "Refreshments Corner": "Light refreshment area",
  "Workshop Table": "Collaborative work surface",
  "Whiteboard": "Presentation & ideation board",
  "Charging Station": "Device charging hub",
  "Info Desk": "Guest information counter",
  "Award Desk": "Awards presentation table",
  "Media Row": "Press & media positions",
  "Networking Zone": "Structured networking area",
};

// ─── CANVAS ITEM ──────────────────────────────────────────────────────────────
export function CanvasItem({ item, night = false }) {
  const updateItem = useCanvasStore((s) => s.updateItem);
  const removeItem = useCanvasStore((s) => s.removeItem);
  const [hovered, setHovered] = useState(false);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: item.id });

  const [resizing, setResizing] = useState(false);
  const [rotating, setRotating] = useState(false);

  function handleResize(e) {
    e.stopPropagation();
    setResizing(true);
    const startX = e.clientX, startY = e.clientY;
    const startWidth = item.width, startHeight = item.height;
    function onMove(ev) {
      updateItem(item.id, {
        width: Math.max(40, startWidth + ev.clientX - startX),
        height: Math.max(30, startHeight + ev.clientY - startY),
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
      const angle = Math.atan2(ev.clientY - centerY, ev.clientX - centerX) * (180 / Math.PI);
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

  const glow = night ? (elementGlow[item.type] || "0 0 16px rgba(255,255,255,0.15)") : "none";
  const bg = night ? "rgba(255,255,255,0.04)" : (dayBg[item.type] ? `${dayBg[item.type]}55` : "rgba(255,255,255,0.35)");
  const border = night ? "rgba(255,255,255,0.12)" : "rgba(20,24,42,0.12)";
  const labelColor = night ? "rgba(255,255,255,0.9)" : "rgba(20,24,42,0.75)";

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group absolute cursor-move select-none"
      style={{
        left: item.x,
        top: item.y,
        width: item.width,
        height: item.height,
        transform: `translate(${transform?.x || 0}px, ${transform?.y || 0}px) rotate(${item.rotation}deg)`,
        transition: resizing || rotating ? "none" : "box-shadow 0.3s ease",
        boxShadow: hovered
          ? (night
              ? (elementGlow[item.type] || "0 0 20px rgba(255,255,255,0.2)") + ", 0 0 0 1.5px rgba(255,255,255,0.35)"
              : "0 8px 32px rgba(20,24,42,0.14), 0 0 0 1.5px rgba(98,117,76,0.4)")
          : glow,
        background: bg,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: `1px solid ${border}`,
        borderRadius: 10,
        overflow: "visible",
        zIndex: hovered ? 9999 : 1,
        overflow: "visible",
      }}
    >
      {/* SVG illustration fills entire element */}
      <ElementArt type={item.type} width={item.width} height={item.height} night={night} />

      {/* Label */}
      <div
        className="absolute inset-0 flex items-end justify-center pb-2 pointer-events-none"
        style={{ zIndex: 2 }}
      >
        <span
          style={{
            fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
            fontSize: Math.min(12, Math.max(9, item.width / 10)),
            fontWeight: 600,
            color: labelColor,
            textShadow: night
              ? "0 1px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)"
              : "0 1px 3px rgba(255,255,255,0.9)",
            letterSpacing: "0.02em",
            maxWidth: "90%",
            textAlign: "center",
            lineHeight: 1.2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.type}
        </span>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && elementTooltips[item.type] && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute pointer-events-none"
            style={{
              bottom: "calc(100% + 8px)",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(20,24,42,0.92)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(98,117,76,0.4)",
              borderRadius: 8,
              padding: "5px 10px",
              whiteSpace: "nowrap",
              zIndex: 100,
            }}
          >
            <span style={{
              fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
              zIndex: 1000,
              fontSize: 11,
              fontWeight: 500,
              color: "rgba(253,253,248,0.9)",
              letterSpacing: "0.01em",
            }}>
              {elementTooltips[item.type]}
            </span>
            <div style={{
              position: "absolute", bottom: -4, left: "50%", transform: "translateX(-50%)",
              width: 8, height: 8, background: "rgba(20,24,42,0.92)",
              borderRight: "1px solid rgba(98,117,76,0.4)",
              borderBottom: "1px solid rgba(98,117,76,0.4)",
              rotate: "45deg",
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resize handle */}
      <div
        onMouseDown={handleResize}
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-20 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ zIndex: 20 }}
      >
        <svg width={14} height={14} viewBox="0 0 14 14">
          <path d="M2 12 L12 2 M6 12 L12 6 M10 12 L12 10"
            stroke={night ? "rgba(255,255,255,0.7)" : "rgba(98,117,76,0.8)"}
            strokeWidth={1.5} strokeLinecap="round" />
        </svg>
      </div>

      {/* Rotate handle */}
      <div
        onMouseDown={handleRotate}
        className="absolute -top-5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full cursor-grab opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20"
        style={{
          background: night ? "rgba(98,117,76,0.9)" : "rgba(98,117,76,0.8)",
          border: "1px solid rgba(255,255,255,0.4)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
        }}
      >
        <RotateCw size={9} color="white" />
      </div>

      {/* Delete */}
      <button
        onPointerDown={(e) => { e.stopPropagation(); removeItem(item.id); }}
        className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-30"
        style={{
          background: "rgba(192,57,43,0.9)",
          border: "1px solid rgba(255,255,255,0.3)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
        }}
      >
        <X size={11} color="white" />
      </button>
    </div>
  );
}