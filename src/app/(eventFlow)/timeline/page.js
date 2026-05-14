"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Plus, Play, GripVertical, X } from "lucide-react";
import ProgressMap from "@/components/ProgressMap";
import { useEventStore } from "@/store/useEventStore";

import { getNextRoute } from "@/lib/eventFlow";
import { useRouter, usePathname } from "next/navigation";


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
  const pathname = usePathname();
  const lastEventTypeRef = useRef(null);
const eventDetails = useEventStore((s) => s.eventDetails);

const timeline = useEventStore((s) => s.timeline);
const setTimeline = useEventStore((s) => s.setTimeline); 
const reorderTimeline = useEventStore((s) => s.reorderTimeline);
const addTimelineEvent = useEventStore((s) => s.addTimelineEvent);
const removeTimelineEvent = useEventStore((s) => s.removeTimelineEvent);

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

  if (lastEventTypeRef.current !== eventType) {
    const generated = generateDefaultTimeline(eventType, eventTime);

    setTimeline(generated);
    lastEventTypeRef.current = eventType;
  }
}, [eventType, eventTime]);

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
          Craft your {eventType?.toLowerCase() || "event"} timeline
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
                      className="absolute top-28 left-0 w-32 max-h-60 overflow-y-auto z-50"
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

        {/* Continue */}
        <motion.button
          onClick={handleSubmit}
          className="w-full px-8 py-5 rounded-full flex justify-center items-center gap-3"
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