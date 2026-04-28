"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Plus, Play, GripVertical } from "lucide-react";
import ProgressMap from "@/components/ProgressMap";
import { useRouter } from "next/navigation";
import { useEventStore } from "@/store/useEventStore";

const eventColors = [
  "#FF6B6B",
  "#4ECDC4",
  "#95E1D3",
  "#F38181",
  "#AA96DA",
  "#FFB84D",
];

export default function TimelineBuilder({ onNext }) {
  const router = useRouter();

  // Get store functions
  const timelineStore = useEventStore((state) => state.timeline);
  const addTimelineEvent = useEventStore((state) => state.addTimelineEvent);
  const removeTimelineEvent = useEventStore((state) => state.removeTimelineEvent);
  const reorderTimeline = useEventStore((state) => state.reorderTimeline);
  const currentStep = useEventStore((state) => state.currentStep);
  const completeStep = useEventStore((state) => state.completeStep);
  const setStep = useEventStore((state) => state.setStep);

  const handleStepClick = (stepId) => {
    if (stepId <= currentStep) {
      console.log(`Navigating to step ${stepId}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    completeStep(currentStep);
    setStep(currentStep + 1);
    router.push("/extras");
  };

  const [eventTitle, setEventTitle] = useState("");
  // Pre-fill from store
  const [timeline, setTimeline] = useState(timelineStore.length > 0 ? timelineStore : [
    { id: "1", title: "Guest Arrival", time: "6:00 PM", color: eventColors[0] },
    { id: "2", title: "Welcome Speech", time: "6:30 PM", color: eventColors[1] },
  ]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const addEvent = () => {
    if (!eventTitle.trim()) return;

    const newEvent = {
      id: Date.now().toString(),
      title: eventTitle,
      time: `${7 + timeline.length}:00 PM`,
      color: eventColors[timeline.length % eventColors.length],
    };

    setTimeline((prev) => [...prev, newEvent]);
    addTimelineEvent(newEvent);
    setEventTitle("");
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newTimeline = [...timeline];
    const draggedItem = newTimeline[draggedIndex];

    newTimeline.splice(draggedIndex, 1);
    newTimeline.splice(index, 0, draggedItem);

    setTimeline(newTimeline);
    reorderTimeline(newTimeline);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const playPreview = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 3000);
  };

  return (
    <div className="min-h-screen dark:bg-black">
            <ProgressMap currentStep={currentStep} onStepClick={handleStepClick}/>
    <div
      className="pt-32 pb-20 px-8 min-h-screen"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1
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
          Craft your event timeline
        </p>

        {/* Add Event */}
        <div
          className="p-6 rounded-3xl mb-8"
          style={{
            backgroundColor: "var(--glass-fill)",
            border: "1px solid var(--glass-border)",
          }}
        >
          <div className="flex gap-3">
            <input
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addEvent()}
              placeholder="Add event (e.g., Dance Performance, Dinner)"
              className="flex-1 px-4 py-3 rounded-xl border outline-none"
              style={{
                backgroundColor: "rgba(0,0,0,0.02)",
                borderColor: "var(--glass-border)",
                color: "var(--color-dark)",
              }}
            />

            <motion.button
              onClick={addEvent}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl flex items-center gap-2"
              style={{
                backgroundColor: "#62754c",
                color: "white",
              }}
            >
              <Plus size={18} />
              Add
            </motion.button>
          </div>
        </div>

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
                <div
                  className="w-24 h-24 rounded-2xl flex items-center justify-center"
                  style={{
                    backgroundColor: event.color,
                    color: "white",
                  }}
                >
                  {event.time}
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
                      <h4>{event.title}</h4>
                    </div>

                    <span>{index + 1}</span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Preview */}
        <motion.button
          onClick={playPreview}
          disabled={isPlaying}
          className="w-full mb-4 px-8 py-4 rounded-full flex justify-center gap-3"
          style={{
            backgroundColor: "var(--glass-fill)",
            border: "1px solid var(--glass-border)",
          }}
        >
          <Play size={20} />
          {isPlaying ? "Playing..." : "Preview Timeline"}
        </motion.button>

        {/* Continue */}
        <motion.button
          onClick={handleSubmit}
          className="w-full px-8 py-5 rounded-full flex justify-center gap-3"
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