"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Plus, Play, GripVertical, X } from "lucide-react";
import ProgressMap from "@/components/ProgressMap";
import { useEventStore } from "@/store/useEventStore";
import { cn } from "@/components/utils.js";
import { getNextRoute } from "@/lib/eventFlow";
import { useRouter, usePathname } from "next/navigation";


// const eventColors = [
//   "#e1c16b",
//   "#58644B",
//   "#8BA672",
//   "#A8BC92",
// ];
const eventColors = [
  "#c0a55b",
  "#92a482",
  "#607d44",
  "#A8BC92",
];

export default function TimelineBuilder({ onNext }) {
  const router = useRouter();
  const pathname = usePathname();
  const lastEventTypeRef = useRef(null);
const eventDetails = useEventStore((s) => s.eventDetails);

const timeline = useEventStore((s) => s.timeline);
const setTimeline = useEventStore((s) => s.setTimeline); 
const reorderTimeline = useEventStore((s) => s.reorderTimeline);
const addTimelineEvent = useEventStore((s) => s.addTimelineEvent);
const removeTimelineEvent = useEventStore((s) => s.removeTimelineEvent);

const timelineEventType = useEventStore((s) => s.timelineEventType);
const setTimelineEventType = useEventStore((s) => s.setTimelineEventType);

  // Get store functions
  //const timelineStore = useEventStore((state) => state.timeline);
  // const addTimelineEvent = useEventStore((state) => state.addTimelineEvent);
  // const removeTimelineEvent = useEventStore((state) => state.removeTimelineEvent);
  // const reorderTimeline = useEventStore((state) => state.reorderTimeline);
  const currentStep = useEventStore((state) => state.currentStep);
  const completeStep = useEventStore((state) => state.completeStep);
  const setStep = useEventStore((state) => state.setStep);
  const setActiveStep = useEventStore((state) => state.setActiveStep);

  const handleStepClick = (stepId) => {
    if (stepId <= currentStep) {
      console.log(`Navigating to step ${stepId}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    completeStep(currentStep);
    //setStep(currentStep + 1);
    setStep("extras"); // or nextStepName
setActiveStep("extras");
    const nextRoute = getNextRoute(eventDetails, pathname);
  router.push(nextRoute);
    //router.push("/extras");
  };

  const deleteEvent = (id) => {
  const updated = timeline.filter((e) => e.id !== id);
  //setTimeline(updated);
  removeTimelineEvent(id);
};

  const [eventTitle, setEventTitle] = useState("");
  // Pre-fill from store

  const defaultTimelinesByType = {
    "Awards & Recognition": [
      "Guest Arrival",
      "Welcome Speech",
      "Awards Ceremony",
      "Winner Speeches",
      "Entertainment Performance",
      "Dinner & Networking",
    ],
    "Tech Launch": [
      "Guest Arrival & Registration",
      "Opening Keynote",
      "Product Reveal",
      "Live Demo",
      "Media Interaction",
      "Networking & Cocktails",
    ],
    Workshop: [
      "Registration",
      "Introduction",
      "Session 1",
      "Break",
      "Session 2",
      "Q&A",
      "Wrap-up",
    ],
    Conference: [
      "Registration",
      "Opening Keynote",
      "Panel Discussion",
      "Break",
      "Breakout Sessions",
      "Closing Remarks",
      "Networking",
    ],
    Gala: [
      "Guest Arrival",
      "Cocktails",
      "Welcome Address",
      "Dinner",
      "Entertainment",
      "Closing Toast",
    ],
    Convention: [
      "Registration",
      "Opening Address",
      "Exhibition",
      "Panel Talks",
      "Break",
      "Networking",
    ],
  };
  const eventType = useEventStore((state) => state.eventDetails?.eventType);

  const eventTime = useEventStore((state) => state.eventDetails?.time);
  const parseTime = (timeStr) => {
    if (!timeStr) return new Date();

    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);

    return date;
  };
  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };
  const generateDefaultTimeline = (type, startTimeStr) => {
    const base = defaultTimelinesByType[type] || [
      "Guest Arrival",
      "Welcome Speech",
    ];

    const startDate = parseTime(startTimeStr);

    const durations = [0, 30, 30, 45, 60, 60];
    return base.map((title, index) => {
      const eventTime = new Date(startDate);

      const offset = durations
        .slice(0, index + 1)
        .reduce((a, b) => a + b, 0);

      eventTime.setMinutes(eventTime.getMinutes() + offset);

      return {
        id: crypto.randomUUID(),
        title,
        time: formatTime(eventTime),
        color: eventColors[index % eventColors.length],
      };
    });
  };
  //const [timeline, setTimeline] = useState([]);
  //const timelineStore = useEventStore((state) => state.timeline);
//const setTimelineStore = useEventStore((state) => state.reorderTimeline);

  //const [timeline, setTimeline] = useState(timelineStore);
  const [isPlaying, setIsPlaying] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const addEvent = () => {
  if (!eventTitle.trim()) return;

  const baseTime = timeline[timeline.length - 1]?.time;
  const nextTime = new Date(parseTime(baseTime || eventTime));
  nextTime.setMinutes(nextTime.getMinutes() + 30);

  const newEvent = {
    id: crypto.randomUUID(),
    title: eventTitle,
    time: formatTime(nextTime),
    color: eventColors[timeline.length % eventColors.length],
  };

  addTimelineEvent(newEvent); // ONLY THIS
  setEventTitle("");
};

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
  e.preventDefault();

  if (draggedIndex === null || draggedIndex === index) return;

  const newTimeline = [...timeline];

  // remove dragged item
  const draggedItem = newTimeline[draggedIndex];
  newTimeline.splice(draggedIndex, 1);

  // insert into new position
  newTimeline.splice(index, 0, draggedItem);

  const baseStart = parseTime(eventTime);

  const updatedTimeline = newTimeline.map((event, i) => {
    const newTime = new Date(baseStart);

    // every event = +30 mins from previous
    newTime.setMinutes(baseStart.getMinutes() + i * 30);

    return {
      ...event,
      time: formatTime(newTime),
    };
  });

  reorderTimeline(updatedTimeline);

  setDraggedIndex(index);
};

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const playPreview = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 3000);
  };

  const generateTimes = () => {
    const times = [];
    for (let h = 6; h <= 23; h++) {
      for (let m of [0, 30]) {
        const hour = h % 12 === 0 ? 12 : h % 12;
        const ampm = h < 12 ? "AM" : "PM";
        const minute = m === 0 ? "00" : "30";
        times.push(`${hour}:${minute} ${ampm}`);
      }
    }
    return times;
  };

  const totalDuration = (() => {
    if (timeline.length < 2) return null;
    const first = parseTime(timeline[0].time);
    const last  = parseTime(timeline[timeline.length - 1].time);
    const diff  = Math.round((last - first) / 60000);
    const h = Math.floor(diff / 60), m = diff % 60;
    return h > 0 ? `${h}h ${m > 0 ? m + "m" : ""}`.trim() : `${m}m`;
  })();

  const timeOptions = generateTimes();
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const handleClick = () => setOpenIndex(null);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

//   useEffect(() => {
//   if (!eventType || !eventTime) return;

//   // only generate if empty (VERY IMPORTANT)
//   if (timelineStore.length === 0) {
//     const generated = generateDefaultTimeline(eventType, eventTime);

//     setTimeline(generated);
//     setTimelineStore(generated); // persist into zustand
//   }
// }, [eventType, eventTime]);

//   useEffect(() => {
//   if (!eventType || !eventTime) return;

//   // CASE 1: first load OR eventType changed
//   const eventTypeChanged = lastEventTypeRef.current !== eventType;

//   if (timeline.length === 0 || eventTypeChanged) {
//     const generated = generateDefaultTimeline(eventType, eventTime);
//     setTimeline(generated);

//     lastEventTypeRef.current = eventType;
//   }
// }, [eventType, eventTime]);

  useEffect(() => {
    if (!eventType || !eventTime) return;

    // First load OR event type changed
    if (
      timeline.length === 0 ||
      timelineEventType !== eventType
    ) {
      const generated = generateDefaultTimeline(eventType, eventTime);

      setTimeline(generated);
      setTimelineEventType(eventType);
    }
  }, [eventType, eventTime, timeline.length, timelineEventType]);

useEffect(() => {
  const ids = timeline.map(e => e.id);
  const unique = new Set(ids).size;

  console.log("timeline size:", timeline.length, "unique:", unique);
}, [timeline]);

  return (
    <div className="min-h-screen dark:bg-black">
            {/* <ProgressMap currentStep={currentStep} onStepClick={handleStepClick}/> */}
    <div
      className="pt-20 pb-20 px-8 min-h-screen"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* ── Hero header ────────────────────────────────────────────── */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >

            <h1 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
              color: "var(--color-dark)",
              marginBottom: "1rem",
              fontStyle: "italic",
              textAlign: "center",
            }}>
              Rhythm
            </h1>

            <p style={{
              fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
              fontSize: "1rem", color: "var(--color-dark-mid, #2A3050)", opacity: 0.55,
            }}>
              Craft the flow of your {eventType?.toLowerCase() || "event"}
            </p>

            {/* stats row */}
            {timeline.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-center gap-6 mt-6"
              >
                <div className="text-center">
                  <div style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "1.6rem", fontWeight: 700,
                    color: "var(--color-primary, #58644B)", lineHeight: 1,
                  }}>{timeline.length}</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", opacity: 0.5, letterSpacing: "0.08em", textTransform: "uppercase" }}>Segments</div>
                </div>
                <div style={{ width: 1, height: 32, background: "rgba(20,24,42,0.12)" }} />
                {totalDuration && (
                  <div className="text-center">
                    <div style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "1.6rem", fontWeight: 700,
                      color: "var(--color-primary, #58644B)", lineHeight: 1,
                    }}>{totalDuration}</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", opacity: 0.5, letterSpacing: "0.08em", textTransform: "uppercase" }}>Duration</div>
                  </div>
                )}
                <div style={{ width: 1, height: 32, background: "rgba(20,24,42,0.12)" }} />
                <div className="text-center">
                  <div style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "1.6rem", fontWeight: 700,
                    color: "var(--color-primary, #58644B)", lineHeight: 1,
                  }}>{timeline[0]?.time.split(" ")[0]}<span style={{ fontSize: "0.9rem" }}>{timeline[0]?.time.split(" ")[1]}</span></div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", opacity: 0.5, letterSpacing: "0.08em", textTransform: "uppercase" }}>Start</div>
                </div>
              </motion.div>
            )}
          </motion.div>
        {/* <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
            color: "var(--color-dark)",
            marginBottom: "1rem",
            fontStyle: "italic",
            textAlign: "center",
          }}
        >
          Rhythm
        </h1>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1.125rem",
            color: "var(--color-dark)",
            opacity: 0.7,
            textAlign: "center",
            marginBottom: "3rem",
          }}
        >
          Craft your {eventType?.toLowerCase() || "event"} timeline
        </p> */}

        {/* ── Add event input ─────────────────────────────────────────── */}
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mb-10 flex gap-3 items-center"
          >
            <div className="flex-1 relative">
              {/* INPUT WRAPPER */}
                      <div className="relative flex-1 group">
              
                        <input
                type="text"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addEvent()}
                placeholder="Add a segment — e.g. Dinner, Performance…"
                          className={cn(
                            "w-full px-3 py-2 rounded-lg",
                            // "bg-white/10 border border-white/20",
                            "outline-none transition-colors duration-300",
                            // "focus:border-white/40",
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
            </div>
            <motion.button
              onClick={addEvent}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-4 rounded-2xl flex items-center gap-2 flex-shrink-0"
              style={{
                fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
                fontWeight: 700, fontSize: 15,
                background: "#E7E7DF",
                color: "#58644B",
                border: "none",
              }}
            >
              <Plus size={16} strokeWidth={2.5} />
              Add
            </motion.button>
          </motion.div>


        {/* Timeline */}
        <div className="relative mb-8">
          <div
            className="absolute left-12 top-0 bottom-0 w-1 rounded-full"
            style={{ backgroundColor: "var(--glass-border)" }}
          />

          <div className="space-y-4">
            {timeline.map((event, index) => (
              <motion.div
                key={event.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                animate={{
                  x: draggedIndex === index ? 8 : 0,
                  y: isPlaying ? [0, -10, 0] : 0,
                }}
                className="relative flex items-center gap-4 cursor-move group"
              >
                {/* Time */}
                {/* <input
  type="text"
  value={event.time}
  onChange={(e) => {
    const value = e.target.value;

    const newTimeline = [...timeline];
    newTimeline[index].time = value;
    setTimeline(newTimeline);
    reorderTimeline(newTimeline);
  }}
  placeholder="6:30 PM"
  className="w-24 h-24 text-center rounded-2xl outline-none"
  style={{
    backgroundColor: event.color,
    color: "white",
    fontWeight: 600,
  }}
/> */}

              <div className="relative">
                  {/* Time Display */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation(); 
                      setOpenIndex(openIndex === index ? null : index);
                    }}
                    className="w-24 h-24 rounded-2xl flex items-center justify-center cursor-pointer"
                    style={{
                      backgroundColor: event.color,
                      color: "white",
                      fontWeight: 600,
                    }}
                  >
                    {event.time}
                  </div>

                  {/* Dropdown */}
                  {openIndex === index && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-28 left-0 w-32 max-h-60 overflow-y-auto z-50 custom-scrollbar"
                      style={{
                        backgroundColor: "var(--glass-fill)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid var(--glass-border)",
                      }}
                    >
                      {timeOptions.map((time) => (
                        <div
                          key={time}
                          onClick={() => {
                            const newTimeline = [...timeline];
                            newTimeline[index].time = time;
                            //setTimeline(newTimeline);
                            reorderTimeline(newTimeline);
                            setOpenIndex(null);
                          }}
                          className="px-3 py-2 cursor-pointer hover:bg-black/5 text-sm"
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card */}
                <motion.div
                  className="flex-1 p-6 rounded-2xl"
                  style={{
                    backgroundColor: "var(--glass-fill)",
                    border: `2px solid ${event.color}40`,
                  }}
                >
                  <div className="flex items-center gap-3">
  <GripVertical size={20} className="opacity-40" />

  <div className="flex-1">
    <input
      value={event.title}
      onChange={(e) => {
        const newTimeline = [...timeline];
        newTimeline[index].title = e.target.value;
        //setTimeline(newTimeline);
        reorderTimeline(newTimeline);
      }}
      className="w-full bg-transparent outline-none"
      style={{ fontWeight: 500 }}
    />
  </div>

  {/* Delete Button */}
  <button
    onClick={() => deleteEvent(event.id)}
    className="opacity-0 group-hover:opacity-100 transition"
  >
    <X size={16} />
  </button>

  <span>{index + 1}</span>
</div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

         {/* Drag hint */}
          {timeline.length > 1 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center mb-5"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.72rem",
                color: "var(--color-dark-mid)",
                opacity: 0.4,
                letterSpacing: "0.04em",
              }}
            >
              ⠿  Drag segments to reorder · Click time to edit · Hover to delete
            </motion.p>
          )}  

        {/* Continue */}
        <motion.button
          onClick={handleSubmit}
          className="w-[25vw] mx-auto px-8 py-5 rounded-full flex justify-center items-center gap-3"
          style={{
            backgroundColor: "var(--color-dark)",
            color: "var(--color-bg)",
          }}
        >
          Continue <ArrowRight size={20} />
        </motion.button>
      </motion.div>
    </div>
    </div>
  );
}


// "use client";

// import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
// import React, {
//   useState,
//   useEffect,
//   useRef,
//   useCallback,
//   useMemo,
// } from "react";
// import { cn } from "@/components/utils.js";
// import { createPortal } from "react-dom";
// import { ArrowRight, Plus, GripVertical, X, Play, Pause } from "lucide-react";
// import { useEventStore } from "@/store/useEventStore";
// import { getNextRoute } from "@/lib/eventFlow";
// import { useRouter, usePathname } from "next/navigation";

// // ── Color palette per event slot ─────────────────────────────────────────────
// const SLOT_COLORS = [
//   { bg: "#e1c16b", light: "rgba(201,168,76,0.15)",  text: "#7A5E1A", glow: "rgba(201,168,76,0.4)"  },
//   { bg: "#7b6a58", light: "rgba(98,117,76,0.15)",   text: "#2E3D1A", glow: "rgba(98,117,76,0.4)"   },
//   { bg: "#8BA672", light: "rgba(139,166,114,0.15)", text: "#2E3D1A", glow: "rgba(139,166,114,0.4)" },
//   { bg: "#A8BC92", light: "rgba(168,188,146,0.15)", text: "#2E3D1A", glow: "rgba(168,188,146,0.4)" },
 
// ];

// const defaultTimelinesByType = {
//   "Awards & Recognition": ["Guest Arrival", "Welcome Speech", "Awards Ceremony", "Winner Speeches", "Entertainment", "Dinner & Networking"],
//   "Tech Launch":          ["Registration", "Opening Keynote", "Product Reveal", "Live Demo", "Media Interaction", "Networking"],
//   Workshop:               ["Registration", "Introduction", "Session 1", "Break", "Session 2", "Q&A", "Wrap-up"],
//   Conference:             ["Registration", "Opening Keynote", "Panel Discussion", "Break", "Breakout Sessions", "Closing Remarks", "Networking"],
//   Gala:                   ["Guest Arrival", "Cocktails", "Welcome Address", "Dinner", "Entertainment", "Closing Toast"],
//   Convention:             ["Registration", "Opening Address", "Exhibition", "Panel Talks", "Break", "Networking"],
// };

// function parseTime(timeStr) {
//   if (!timeStr) return new Date();
//   const [time, modifier] = timeStr.split(" ");
//   let [hours, minutes] = time.split(":").map(Number);
//   if (modifier === "PM" && hours !== 12) hours += 12;
//   if (modifier === "AM" && hours === 12) hours = 0;
//   const date = new Date();
//   date.setHours(hours, minutes, 0, 0);
//   return date;
// }
// function formatTime(date) {
//   return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
// }
// function generateTimes() {
//   const times = [];
//   for (let h = 6; h <= 23; h++) {
//     for (let m of [0, 30]) {
//       const hour = h % 12 === 0 ? 12 : h % 12;
//       const ampm = h < 12 ? "AM" : "PM";
//       times.push(`${hour}:${m === 0 ? "00" : "30"} ${ampm}`);
//     }
//   }
//   return times;
// }
// const TIME_OPTIONS = generateTimes();

// // ── Play preview — animates a light sweeping down the timeline ────────────────
// function PlaySweep({ itemCount, onDone }) {
//   return (
//     <motion.div
//       className="absolute left-0 right-0 pointer-events-none"
//       style={{ top: 0, zIndex: 50 }}
//       initial={{ y: -20, opacity: 0 }}
//       animate={{ y: itemCount * 108, opacity: [0, 1, 1, 0] }}
//       transition={{ duration: 2.4, ease: "easeInOut" }}
//       onAnimationComplete={onDone}
//     >
//       <div style={{
//         height: 2,
//         background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.9), transparent)",
//         boxShadow: "0 0 20px rgba(201,168,76,0.6), 0 0 60px rgba(201,168,76,0.2)",
//       }} />
//       <div style={{
//         height: 80,
//         background: "linear-gradient(to bottom, rgba(201,168,76,0.06), transparent)",
//         marginTop: -2,
//       }} />
//     </motion.div>
//   );
// }

// // ── Single timeline row ───────────────────────────────────────────────────────
// function TimelineRow({ event, index, total, isDragging, isPlaying, openDropdown, onOpenDropdown, onTimeChange, onTitleChange, onDelete, onDragStart, onDragOver, onDragEnd }) {
//   const color = SLOT_COLORS[index % SLOT_COLORS.length];
//   const isOpen = openDropdown === index;
//   const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
//   const btnRef = useRef(null);

//   return (
//     <motion.div
//       layout
//       draggable
//       onDragStart={() => onDragStart(index)}
//       onDragOver={(e) => { e.preventDefault(); onDragOver(index); }}
//       onDragEnd={onDragEnd}
//       initial={{ opacity: 0, x: -40 }}
//       animate={{
//         opacity: 1, x: isDragging ? 6 : 0,
//         scale: isDragging ? 1.01 : 1,
//       }}
//       transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
//       className="relative flex items-stretch gap-0 group hover:z-20"
//       style={{ zIndex: isDragging ? 10 : 1 }}
//     >
//       {/* ── Left: time pill ── */}
//       <div className="relative flex-shrink-0 flex flex-col items-center" style={{ width: 88 }}>
//         {/* connector line above */}
//         {index > 0 && (
//           <div style={{
//             position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)",
//             width: 1, height: 16,
//             background: `linear-gradient(to bottom, transparent, ${color.bg}60)`,
//           }} />
//         )}

//         {/* time button */}
//         <motion.button
//           ref={btnRef}
//           whileHover={{ scale: 1.04 }}
//           whileTap={{ scale: 0.97 }}
//           onClick={(e) => {
//   e.stopPropagation();

//   const rect = btnRef.current?.getBoundingClientRect();

//   if (rect) {
//     setDropdownPos({
//   top: rect.bottom + 8,
//   left: rect.left,
// });
//   }

//   onOpenDropdown(isOpen ? null : index);
// }}
//           className="relative w-full flex flex-col items-center justify-center rounded-2xl"
//           style={{
//             height: 76,
//             background: color.bg,
//             boxShadow: `0 4px 20px ${color.glow}, 0 1px 0 rgba(255,255,255,0.2) inset`,
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           <span style={{
//             fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
//             fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.65)",
//             letterSpacing: "0.06em", lineHeight: 1,
//           }}>
//             {event.time.split(" ")[1]}
//           </span>
//           <span style={{
//             fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
//             fontSize: 16, fontWeight: 700, color: "white",
//             letterSpacing: "0.02em", lineHeight: 1.2,
//           }}>
//             {event.time.split(" ")[0]}
//           </span>
//         </motion.button>

//         {/* connector line below */}
//         {index < total - 1 && (
//           <div style={{
//             width: 1, flex: 1, minHeight: 28,
//             background: `linear-gradient(to bottom, ${color.bg}60, ${SLOT_COLORS[(index + 1) % SLOT_COLORS.length].bg}40)`,
//             marginTop: 4,
//           }} />
//         )}

//         {/* time dropdown */}
//         {/* time dropdown (PORTAL FIXED) */}
// <AnimatePresence>
//   {isOpen &&
//   typeof window !== "undefined" &&
//   createPortal(
//     <motion.div
//       initial={{ opacity: 0, y: 4, scale: 0.97 }}
//       animate={{ opacity: 1, y: 0, scale: 1 }}
//       exit={{ opacity: 0, y: 4, scale: 0.97 }}
//       transition={{ duration: 0.15 }}
//       onClick={(e) => e.stopPropagation()}
//       className="w-32 max-h-52 overflow-y-auto z-[9999] hide-scrollbar"
//       style={{
//         position: "fixed",
//         top: dropdownPos.top,
//         left: dropdownPos.left,
//         background: "rgba(20,24,42,0.95)",
//         backdropFilter: "blur(20px)",
//         border: "1px solid rgba(98,117,76,0.35)",
//         boxShadow: "0 16px 48px rgba(0,0,0,0.35)",
//       }}
//     >
//         {TIME_OPTIONS.map((t) => (
//           <button
//             key={t}
//             onClick={() => {
//               onTimeChange(index, t);
//               onOpenDropdown(null);
//             }}
//             className="w-full text-left px-3 py-1.5 text-xs transition-colors"
//             style={{
//               fontFamily: "var(--font-mono, monospace)",
//               color: event.time === t ? color.bg : "rgba(253,253,248,0.7)",
//               background: event.time === t ? `${color.bg}22` : "transparent",
//               fontSize: 11,
//             }}
//           >
//             {t}
//           </button>
//         ))}
//       </motion.div>,
//       document.body
//     )}
// </AnimatePresence>
//       </div>

//       {/* ── Right: event card ── */}
//       <motion.div
//         whileHover={{ x: 3 }}
//         transition={{ duration: 0.15 }}
//         className="flex-1 ml-4 rounded-2xl flex items-center group"
//         style={{
//           background: color.light,
//           border: `1px solid ${color.bg}30`,
//           minHeight: 76,
//           boxShadow: isPlaying
//             ? `0 0 0 1.5px ${color.bg}60, 0 4px 20px ${color.glow}`
//             : "none",
//           transition: "box-shadow 0.3s ease",
//           paddingLeft: 16, paddingRight: 12,
//         }}
//       >
//         {/* drag grip */}
//         <GripVertical size={15} style={{ color: `${color.bg}70`, flexShrink: 0, cursor: "grab", marginRight: 10 }} />

//         {/* index badge */}
//         <div className="flex-shrink-0 flex items-center justify-center rounded-lg mr-3"
//           style={{
//             width: 26, height: 26,
//             background: `${color.bg}25`,
//             border: `1px solid ${color.bg}40`,
//           }}>
//           <span style={{
//             fontFamily: "var(--font-mono, monospace)",
//             fontSize: 10, fontWeight: 700,
//             color: color.bg,
//           }}>{String(index + 1).padStart(2, "0")}</span>
//         </div>

//         {/* title input */}
//         <input
//           value={event.title}
//           onChange={(e) => onTitleChange(index, e.target.value)}
//           className="flex-1 bg-transparent outline-none"
//           style={{
//             fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
//             fontSize: 15, fontWeight: 600,
//             color: "var(--color-dark, #18181b)",
//             caretColor: color.bg,
//           }}
//         />

//         {/* color dot */}
//         <div className="w-2 h-2 rounded-full mx-3 flex-shrink-0"
//           style={{ background: color.bg, opacity: 0.6 }}
//           />

//         {/* delete */}
//         <motion.button
//   initial={{ opacity: 0, scale: 0.8 }}
//   whileHover={{ opacity: 1, scale: 1.1 }}
//   onClick={() => onDelete(event.id)}
//   className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center relative z-10"

// >
//   <X size={18} style={{ color: "#C0392B" }} />
// </motion.button>
//       </motion.div>
//     </motion.div>
//   );
// }

// // ── Main component ────────────────────────────────────────────────────────────
// export default function TimelineBuilder({ onNext }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const lastEventTypeRef = useRef(null);

//   const eventDetails  = useEventStore((s) => s.eventDetails);
//   const timeline      = useEventStore((s) => s.timeline);
//   const [localTimeline, setLocalTimeline] = useState([]);
//   const setTimeline   = useEventStore((s) => s.setTimeline);
//   const reorderTimeline     = useEventStore((s) => s.reorderTimeline);
//   const removeTimelineEvent = useEventStore((s) => s.removeTimelineEvent);
//   const currentStep   = useEventStore((s) => s.currentStep);
//   const completeStep  = useEventStore((s) => s.completeStep);
//   const setStep       = useEventStore((s) => s.setStep);
//   const setActiveStep = useEventStore((s) => s.setActiveStep);
//   const eventType     = useEventStore((s) => s.eventDetails?.eventType);
//   const eventTime     = useEventStore((s) => s.eventDetails?.time);

//   const [eventTitle, setEventTitle] = useState("");
//   const [isPlaying, setIsPlaying]   = useState(false);
//   const [draggedIndex, setDraggedIndex] = useState(null);
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const inputRef = useRef(null);

//   // Generate default timeline once per event type
//   useEffect(() => {
//   if (!eventType || !eventTime) return;

//   if (lastEventTypeRef.current === eventType) return;

//   const base =
//     defaultTimelinesByType[eventType] || [
//       "Guest Arrival",
//       "Welcome Speech",
//     ];

//   const startDate = parseTime(eventTime);

//   const durations = [0, 30, 30, 45, 60, 60, 30, 30];

//   const generated = base.map((title, i) => {
//     const t = new Date(startDate);

//     t.setMinutes(
//       t.getMinutes() +
//         durations.slice(0, i + 1).reduce((a, b) => a + b, 0)
//     );

//     return {
//       id: crypto.randomUUID(),
//       title,
//       time: formatTime(t),
//       color: SLOT_COLORS[i % SLOT_COLORS.length].bg,
//     };
//   });

//   setTimeline(generated);

//   // IMPORTANT
//   setLocalTimeline(generated);

//   lastEventTypeRef.current = eventType;
// }, [eventType, eventTime]);

//   useEffect(() => {
//   setLocalTimeline(timeline);
// }, [timeline]);

//   // Close dropdown on outside click
//   useEffect(() => {
//     const fn = () => setOpenDropdown(null);
//     window.addEventListener("click", fn);
//     return () => window.removeEventListener("click", fn);
//   }, []);

//   const addEvent = () => {
//     if (!eventTitle.trim()) return;

//     const baseTime = localTimeline[localTimeline.length - 1]?.time;

//     const next = new Date(parseTime(baseTime || eventTime));

//     next.setMinutes(next.getMinutes() + 30);

//     const newEvent = {
//       id: crypto.randomUUID(),
//       title: eventTitle,
//       time: formatTime(next),
//       color: SLOT_COLORS[localTimeline.length % SLOT_COLORS.length].bg,
//     };

//     // instant UI update
//     setLocalTimeline((prev) => [...prev, newEvent]);

//     // persist to zustand
//     addTimelineEvent(newEvent);

//     setEventTitle("");

//     inputRef.current?.focus();
//   };

//   const handleTimeChange = (index, time) => {
//   const updated = [...localTimeline];

//   updated[index] = {
//     ...updated[index],
//     time,
//   };

//   setLocalTimeline(updated);

//   reorderTimeline(updated);
// };

//   const handleTitleChange = (index, title) => {
//   const updated = [...localTimeline];

//   updated[index] = {
//     ...updated[index],
//     title,
//   };

//   setLocalTimeline(updated);

//   reorderTimeline(updated);
// };

//   const handleDragStart = (index) => {
//   setDraggedIndex(index);
// };

// const handleDragOver = (index) => {
//   if (draggedIndex === null || draggedIndex === index) return;

//   setLocalTimeline((prev) => {
//     const next = [...prev];

//     const [item] = next.splice(draggedIndex, 1);

//     next.splice(index, 0, item);

//     return next;
//   });

//   setDraggedIndex(index);
// };

// const handleDragEnd = () => {
//   setDraggedIndex(null);

//   const baseStart = parseTime(eventTime);

//   const updated = localTimeline.map((event, i) => {
//     const newTime = new Date(baseStart);

//     newTime.setMinutes(baseStart.getMinutes() + i * 30);

//     return {
//       ...event,
//       time: formatTime(newTime),
//     };
//   });

//   // update local instantly
//   setLocalTimeline(updated);

//   // persist once
//   reorderTimeline(updated);
// };

//   const playPreview = () => {
//     if (isPlaying) return;
//     setIsPlaying(true);
//   };

//   const handleSubmit = () => {
//     completeStep(currentStep);
//     setStep("extras");
//     setActiveStep("extras");
//     router.push(getNextRoute(eventDetails, pathname));
//   };

//   const totalDuration = (() => {
//     if (timeline.length < 2) return null;
//     const first = parseTime(timeline[0].time);
//     const last  = parseTime(timeline[timeline.length - 1].time);
//     const diff  = Math.round((last - first) / 60000);
//     const h = Math.floor(diff / 60), m = diff % 60;
//     return h > 0 ? `${h}h ${m > 0 ? m + "m" : ""}`.trim() : `${m}m`;
//   })();

//   return (
//     <div className="min-h-screen relative" style={{ backgroundColor: "var(--color-bg, #f6f2eb)" }}>

//       {/* ── Ambient background ───────────────────────────────────────────── */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
//         <div style={{
//           position: "absolute", top: "-20%", right: "-10%",
//           width: 500, height: 500, borderRadius: "50%",
//           background: "radial-gradient(circle, rgba(201,168,76,0.07), transparent 70%)",
//           filter: "blur(60px)",
//         }} />
//         <div style={{
//           position: "absolute", bottom: "10%", left: "-5%",
//           width: 400, height: 400, borderRadius: "50%",
//           background: "radial-gradient(circle, rgba(98,117,76,0.07), transparent 70%)",
//           filter: "blur(50px)",
//         }} />
//       </div>

//       <div className="relative pt-28 pb-24 px-6" style={{ zIndex: 1 }}>
//         <div className="max-w-[80%] mx-auto">

//           {/* ── Hero header ────────────────────────────────────────────── */}
//           <motion.div
//             className="text-center mb-12"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
//           >

//             <h1 style={{
//               fontFamily: "var(--font-serif)",
//               fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
//               color: "var(--color-dark)",
//               marginBottom: "1rem",
//               fontStyle: "italic",
//               textAlign: "center",
//             }}>
//               Rhythm
//             </h1>

//             <p style={{
//               fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
//               fontSize: "1rem", color: "var(--color-dark-mid, #2A3050)", opacity: 0.55,
//             }}>
//               Craft the flow of your {eventType?.toLowerCase() || "event"}
//             </p>

//             {/* stats row */}
//             {timeline.length > 0 && (
//               <motion.div
//                 initial={{ opacity: 0, y: 8 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4 }}
//                 className="flex items-center justify-center gap-6 mt-6"
//               >
//                 <div className="text-center">
//                   <div style={{
//                     fontFamily: "var(--font-mono, monospace)",
//                     fontSize: "1.6rem", fontWeight: 700,
//                     color: "var(--color-primary, #7b6a58)", lineHeight: 1,
//                   }}>{timeline.length}</div>
//                   <div style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", opacity: 0.5, letterSpacing: "0.08em", textTransform: "uppercase" }}>Events</div>
//                 </div>
//                 <div style={{ width: 1, height: 32, background: "rgba(20,24,42,0.12)" }} />
//                 {totalDuration && (
//                   <div className="text-center">
//                     <div style={{
//                       fontFamily: "var(--font-mono, monospace)",
//                       fontSize: "1.6rem", fontWeight: 700,
//                       color: "var(--color-primary, #7b6a58)", lineHeight: 1,
//                     }}>{totalDuration}</div>
//                     <div style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", opacity: 0.5, letterSpacing: "0.08em", textTransform: "uppercase" }}>Duration</div>
//                   </div>
//                 )}
//                 <div style={{ width: 1, height: 32, background: "rgba(20,24,42,0.12)" }} />
//                 <div className="text-center">
//                   <div style={{
//                     fontFamily: "var(--font-mono, monospace)",
//                     fontSize: "1.6rem", fontWeight: 700,
//                     color: "var(--color-primary, #7b6a58)", lineHeight: 1,
//                   }}>{timeline[0]?.time.split(" ")[0]}<span style={{ fontSize: "0.9rem" }}>{timeline[0]?.time.split(" ")[1]}</span></div>
//                   <div style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", opacity: 0.5, letterSpacing: "0.08em", textTransform: "uppercase" }}>Start</div>
//                 </div>
//               </motion.div>
//             )}
//           </motion.div>

//           {/* ── Add event input ─────────────────────────────────────────── */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.25, duration: 0.6 }}
//             className="mb-10 flex gap-3"
//           >
//             <div className="flex-1 relative">
//               {/* INPUT WRAPPER */}
//                       <div className="relative flex-1 group">
              
//                         <input
//                           ref={inputRef}
//                 type="text"
//                 value={eventTitle}
//                 onChange={(e) => setEventTitle(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && addEvent()}
//                 placeholder="Add an event — e.g. Dinner, Performance…"
//                           className={cn(
//                             "w-full px-3 py-2 rounded-lg",
//                             "bg-white/10 border border-white/20",
//                             "outline-none transition-colors duration-300",
//                             "focus:border-white/40",
//                             "text-black placeholder:text-black/40"
//                           )}
//                         />
              
//                         {/* Animated underline */}
//                         <div
//                           className={cn(
//                             "absolute left-0 bottom-0 h-[2px] w-full",
//                             "bg-[#7b6a58]",
//                             "origin-left scale-x-0",
//                             "transition-transform duration-300",
//                             "group-focus-within:scale-x-100"
//                           )}
//                         />
              
//                       </div>
//             </div>
//             <motion.button
//               onClick={addEvent}
//               whileHover={{ scale: 1.03, boxShadow: "0 0 24px rgba(98,117,76,0.35)" }}
//               whileTap={{ scale: 0.97 }}
//               className="px-6 py-4 rounded-2xl flex items-center gap-2 flex-shrink-0"
//               style={{
//                 fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
//                 fontWeight: 700, fontSize: 14,
//                 background: "var(--color-primary, #7b6a58)",
//                 color: "white",
//                 border: "none",
//                 boxShadow: "0 4px 16px rgba(98,117,76,0.3)",
//               }}
//             >
//               <Plus size={16} strokeWidth={2.5} />
//               Add
//             </motion.button>
//           </motion.div>

//           {/* ── Timeline list ───────────────────────────────────────────── */}
//           <div className="relative mb-10">
//             {/* Play sweep overlay */}
//             <AnimatePresence>
//               {isPlaying && (
//                 <PlaySweep
//                   itemCount={timeline.length}
//                   onDone={() => setIsPlaying(false)}
//                 />
//               )}
//             </AnimatePresence>

//             <div className="space-y-4">
//               <AnimatePresence>
//                 {localTimeline.map((event, index) => (
//                   <TimelineRow
//                     key={event.id}
//                     event={event}
//                     index={index}
//                     total={timeline.length}
//                     isDragging={draggedIndex === index}
//                     isPlaying={isPlaying}
//                     openDropdown={openDropdown}
//                     onOpenDropdown={setOpenDropdown}
//                     onTimeChange={handleTimeChange}
//                     onTitleChange={handleTitleChange}
//                     onDelete={(id) => {
//   setLocalTimeline((prev) => prev.filter((e) => e.id !== id));
//   removeTimelineEvent(id);
// }}
//                     onDragStart={handleDragStart}
//                     onDragOver={handleDragOver}
//                     onDragEnd={handleDragEnd}
//                   />
//                 ))}
//               </AnimatePresence>
//             </div>

//             {/* Empty state */}
//             {timeline.length === 0 && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="text-center py-20"
//               >
//                 <div style={{
//                   fontFamily: "var(--font-display, Georgia, serif)",
//                   fontSize: "3rem", opacity: 0.08,
//                   color: "var(--color-dark)",
//                   fontStyle: "italic",
//                 }}>
//                   Empty stage
//                 </div>
//                 <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", opacity: 0.4, marginTop: 8 }}>
//                   Add events above to build your timeline
//                 </p>
//               </motion.div>
//             )}
//           </div>

//           {/* ── Play + Continue row ─────────────────────────────────────── */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5, duration: 0.6 }}
//             className="flex gap-3"
//           >

//             {/* Continue */}
//             <motion.button
//               onClick={handleSubmit}
//               whileHover={{ scale: 1.02, boxShadow: "0 0 32px rgba(20,24,42,0.2)" }}
//               whileTap={{ scale: 0.98 }}
//               className="flex-1 py-4 rounded-2xl flex items-center justify-center gap-3"
//               style={{
//                 fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
//                 fontWeight: 700, fontSize: 15,
//                 background: "var(--color-dark, #18181b)",
//                 color: "var(--color-bg, #f6f2eb)",
//                 border: "none",
//                 boxShadow: "0 8px 32px rgba(20,24,42,0.18)",
//               }}
//             >
//               Continue
//               <motion.div
//               >
//                 <ArrowRight size={18} />
//               </motion.div>
//             </motion.button>
//           </motion.div>

//           {/* Drag hint */}
//           {timeline.length > 1 && (
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 1 }}
//               className="text-center mt-5"
//               style={{
//                 fontFamily: "var(--font-body)",
//                 fontSize: "0.72rem",
//                 color: "var(--color-dark-mid)",
//                 opacity: 0.4,
//                 letterSpacing: "0.04em",
//               }}
//             >
//               ⠿  Drag events to reorder · Click time to edit · Hover to delete
//             </motion.p>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// }

