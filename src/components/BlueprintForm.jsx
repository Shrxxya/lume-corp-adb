// import { motion } from "framer-motion";
// import { useState, useEffect } from "react";
// import { ArrowRight } from "lucide-react";
// import { useRouter } from "next/navigation"; // Import useRouter
  

// const eventTypeColors = {
//   "Awards & Recognition": "#F5E6C8",
//   "Tech Launch": "#C8D4F0",
//   Workshop: "#D6DCE8",
//   Conference: "#E8D6E8",
//   Gala: "#F0D8C8",
//   Other: "#e7e7df",
// };

// export default function BlueprintForm({ onNext }) {
//   const [formData, setFormData] = useState({
//     eventName: "",
//     date: "",
//     time: "",
//     location: "",
//     guestCount: "",
//     eventType: "",
//     budget: "",
//   });

//   const [bgColor, setBgColor] = useState("#e7e7df");

//   useEffect(() => {
//     if (formData.eventName.toLowerCase().includes("award")) {
//       setBgColor(eventTypeColors.Award);
//     } else if (
//       formData.eventName.toLowerCase().includes("tech") ||
//       formData.eventName.toLowerCase().includes("launch")
//     ) {
//       setBgColor(eventTypeColors["Tech Launch"]);
//     } else if (formData.eventName.toLowerCase().includes("corporate")) {
//       setBgColor(eventTypeColors.Corporate);
//     } else if (
//       formData.eventType &&
//       eventTypeColors[formData.eventType]
//     ) {
//       setBgColor(eventTypeColors[formData.eventType]);
//     } else {
//       setBgColor("#e7e7df");
//     }
//   }, [formData.eventName, formData.eventType]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const isValid = Object.values(formData).every(
//       (v) => v.trim() !== ""
//     );

//     if (isValid) onNext(formData);
//   };

//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const isComplete =
//     formData.eventName &&
//     formData.date &&
//     formData.time &&
//     formData.location &&
//     formData.guestCount &&
//     formData.eventType &&
//     formData.budget;

//   return (
//     <motion.div
//       className="pt-32 pb-20 px-8 min-h-screen flex items-center justify-center"
//       animate={{ backgroundColor: bgColor }}
//       transition={{ duration: 0.8, ease: "easeInOut" }}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//         className="w-full max-w-2xl font-medium"
//       >
//         <h1
//           style={{
//             fontFamily: "var(--font-serif)",
//             fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
//             color: "var(--color-dark)",
//             marginBottom: "1rem",
//             fontStyle: "italic",
//             textAlign: "center",
//           }}
//         >
//           Blueprint
//         </h1>

//         <p
//           style={{
//             fontFamily: "var(--font-body)",
//             fontSize: "1.125rem",
//             color: "var(--color-dark)",
//             opacity: 0.7,
//             textAlign: "center",
//             marginBottom: "3rem",
//           }}
//         >
//           Let's start with the essentials
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-8">
//           <FloatingInput
//             label="Event Name"
//             value={formData.eventName}
//             onChange={(v) => handleChange("eventName", v)}
//             placeholder="Enter event name"
//           />

//           {/* DATE + TIME PICKER */}
//           <div className="space-y-6">
//             <h3
//               className="text-sm uppercase tracking-wider"
//               style={{
//                 fontFamily: "var(--font-body)",
//                 fontSize: "0.875rem",
//                 color: "var(--color-dark)",
//                 opacity: 0.7,
//                 letterSpacing: "0.05em",
//               }}
//             >
//               Select Date & Time
//             </h3>

//             {/* DATE SCROLLER */}
//             <div className="flex flex-wrap gap-3 overflow-x-auto hide-scrollbar">
//   {Array.from({ length: 30 }).map((_, i) => {
//     const date = new Date();
//     date.setDate(date.getDate() + i);

//     const isSelected = formData.date === date.toDateString();

//     return (
//       <motion.button
//         key={i}
//         type="button"
//         onClick={() => handleChange("date", date.toDateString())}
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         className="p-4 rounded-xl text-center flex-shrink-0"
//         style={{
//           width: "calc(50% - 0.75rem)", // Two buttons per row
//           backgroundColor: isSelected ? "#58644B" : "rgba(0,0,0,0.03)",
//           color: isSelected ? "white" : "var(--color-dark)",
//         }}
//       >
//         <div className="text-xs opacity-60">
//           {date.toLocaleDateString("en-US", {
//             weekday: "short",
//           })}
//         </div>
//         <div className="text-lg font-semibold">{date.getDate()}</div>
//       </motion.button>
//     );
//   })}
// </div>

//             {/* TIME SLOTS */}
//             {formData.date && (
//               <div className="grid grid-cols-4 gap-3">
//                 {[
//                   "09:00 AM",
//                   "10:00 AM",
//                   "11:00 AM",
//                   "12:00 PM",
//                   "01:00 PM",
//                   "02:00 PM",
//                   "03:00 PM",
//                   "04:00 PM",
//                   "05:00 PM",
//                   "06:00 PM",
//                   "07:00 PM",
//                   "08:00 PM",
//                 ].map((time) => {
//                   const isSelected = formData.time === time;

//                   return (
//                     <motion.button
//                       key={time}
//                       type="button"
//                       onClick={() => handleChange("time", time)}
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="p-3 rounded-xl"
//                       style={{
//                         backgroundColor: isSelected
//                           ? "#58644B"
//                           : "#D9DCD6",
//                         color: isSelected ? "white" : "var(--color-dark)",
//                       }}
//                     >
//                       {time}
//                     </motion.button>
//                   );
//                 })}
//               </div>
//             )}
//           </div>

//           <FloatingInput
//             label="Location"
//             value={formData.location}
//             onChange={(v) => handleChange("location", v)}
//             placeholder="Enter venue or city"
//           />

//           <FloatingInput
//             label="Expected Guests"
//             value={formData.guestCount}
//             onChange={(v) => handleChange("guestCount", v)}
//             type="number"
//             placeholder="Number of attendees"
//             onWheel={(e) => e.target.blur()} // Prevent scroll change
//           />

//           <FloatingInput
//             label="Budget (₹ Lakhs)"
//             value={formData.budget}
//             onChange={(v) => handleChange("budget", v)}
//             type="number"
//             placeholder="Total budget in lakhs"
//             onWheel={(e) => e.target.blur()} // Prevent scroll change
//           />

//           <div className="space-y-3">
//             <label
//               style={{
//                 fontFamily: "var(--font-body)",
//                 fontSize: "0.875rem",
//                 color: "var(--color-dark)",
//                 opacity: 0.7,
//                 letterSpacing: "0.05em",
//                 textTransform: "uppercase",
//               }}
//             >
//               Event Type
//             </label>

//             <div className="grid grid-cols-3 gap-3">
//               {Object.keys(eventTypeColors)
//                 .filter((t) => t !== "Other")
//                 .map((type) => (
//                   <motion.button
//                     key={type}
//                     type="button"
//                     onClick={() => handleChange("eventType", type)}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     className="px-4 py-3 rounded-2xl transition-all duration-300"
//                     style={{
//                       backgroundColor:
//                         formData.eventType === type ? "#58644B" : "var(--glass-fill)",
//                       color: formData.eventType === type ? "white" : "var(--color-dark)",
//                     }}
//                   >
//                     {type}
//                   </motion.button>
//                 ))}
//             </div>
//           </div>

//           <motion.button
//             type="submit"
//             disabled={!isComplete}
//             whileHover={isComplete ? { scale: 1.02 } : {}}
//             whileTap={isComplete ? { scale: 0.98 } : {}}
//             className="w-full mt-12 px-8 py-5 rounded-full flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
//             style={{
//               backgroundColor: "var(--color-dark)",
//               color: "var(--color-bg)",
//               fontFamily: "var(--font-body)",
//               fontSize: "1.125rem",
//               fontWeight: 600,
//               letterSpacing: "0.02em",
//             }}
//           >
//             Continue
//             <ArrowRight size={20} />
//           </motion.button>
//         </form>
//       </motion.div>
//     </motion.div>
//   );
// }

// /* Floating Input */
// function FloatingInput({
//   label,
//   value,
//   onChange,
//   type = "text",
//   placeholder,
//   onWheel,
// }) {
//   const [focused, setFocused] = useState(false);

//   return (
//     <div className="relative">
//       <motion.label
//         animate={{
//           y: focused || value ? -28 : 0,
//           scale: focused || value ? 0.85 : 1,
//           opacity: focused || value ? 0.7 : 0.5,
//         }}
//         transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
//         className="absolute left-0 pointer-events-none"
//         style={{
//           fontFamily: "var(--font-body)",
//           fontSize: "0.875rem",
//           color: "var(--color-dark)",
//           letterSpacing: "0.05em",
//           textTransform: "uppercase",
//           transformOrigin: "left center",
//         }}
//       >
//         {label}
//       </motion.label>

//       <input
//         type={type}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         onFocus={() => setFocused(true)}
//         onBlur={() => setFocused(false)}
//         placeholder={focused ? placeholder : ""}
//         onWheel={onWheel} // Prevent scroll change
//         className="w-full px-0 py-4 bg-transparent outline-none transition-all duration-300"
//         style={{
//           borderColor: focused
//             ? "var(--color-primary)"
//             : "var(--glass-border)",
//           fontFamily: "var(--font-body)",
//           fontSize: "1.25rem",
//           color: "var(--color-dark)",
//         }}
//       />
//     </div>
//   );
// }
"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, ArrowLeft, Check, Calendar, Clock } from "lucide-react";
import { useEventStore } from "@/store/useEventStore";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Map from "@/components/Map";
// import img1 from "/themes/CharcoalGraynCopper.png";
// import img2 from "/themes/ForestGreennBeige.png";
// import img3 from "/themes/GoldnBlack.png";
// import img4 from "/themes/NavyBluenSilver.png";
// import img5 from "/themes/RednWhite.png";
// import img6 from "/themes/YellownWhite.png";

import { getNextRoute } from "@/lib/eventFlow";
import { useRouter, usePathname } from "next/navigation";


const eventTypeColors = {
  "Awards & Recognition": "#e7e7df",
  "Tech Launch": "#e7e7df",
  Workshop: "#e7e7df",
  Conference: "#e7e7df",
  Gala: "#e7e7df",
  Convention: "#e7e7df",
};

  const themes = [
    { id: "royal-amber", label: "Royal Amber", image: "/themes/CharcoalGraynCopper.png" },
    { id: "emerald-glow", label: "Emerald Glow", image: "/themes/ForestGreennBeige.png" },
    { id: "gold-elegance", label: "Gold Elegance", image: "/themes/GoldnBlack.png" },
    { id: "midnight-luxe", label: "Midnight Luxe", image: "/themes/NavyBluenSilver.png" },
    { id: "festive-crimson", label: "Festive Crimson", image: "/themes/RednWhite.png" },
    { id: "sunrise-clarity", label: "Sunrise Clarity", image: "/themes/YellownWhite.png" },
  ];

export default function BlueprintForm() {
  const router = useRouter();
  const pathname = usePathname();

  const selectedTheme = useEventStore((s) => s.theme);
  const setTheme = useEventStore((s) => s.setTheme);

  const [showDateTime, setShowDateTime] = useState(false);
const [dtStep, setDtStep] = useState("date"); 
// "date" | "time"

  // Get store functions
  const eventDetails = useEventStore((state) => state.eventDetails);
  const setEventDetails = useEventStore((state) => state.setEventDetails);
  const selectedVenue = useEventStore((s) => s.selectedVenue);
  const setSelectedVenue = useEventStore((s) => s.setSelectedVenue);
  const currentStep = useEventStore((state) => state.currentStep);
  const completeStep = useEventStore((state) => state.completeStep);
  const setStep = useEventStore((state) => state.setStep);
  const setActiveStep = useEventStore((state) => state.setActiveStep);
  const setFormValid = useEventStore((state) => state.setFormValid);

  const hasHydrated = useEventStore((s) => s.hasHydrated);

  // Pre-fill form data from store on mount
  const [formData, setFormData] = useState({
    eventName: eventDetails.eventName || "",
    date: eventDetails.date || "",
    time: eventDetails.time || "",
    location: eventDetails.location || "",
    guestCount: eventDetails.guestCount || "",
    eventType: eventDetails.eventType || "",
    budget: eventDetails.budget || "",
    venueType: eventDetails.venueType || "",
  });

  const [bgColor, setBgColor] = useState("#e7e7df");

  useEffect(() => {
    // Dynamically update background color based on event type or name
    if (formData.eventName.toLowerCase().includes("award")) {
      setBgColor(eventTypeColors["Awards & Recognition"]);
    } else if (
      formData.eventName.toLowerCase().includes("tech") ||
      formData.eventName.toLowerCase().includes("launch")
    ) {
      setBgColor(eventTypeColors["Tech Launch"]);
    } else if (formData.eventName.toLowerCase().includes("corporate")) {
      setBgColor(eventTypeColors.Convention);
    } else if (
      formData.eventType &&
      eventTypeColors[formData.eventType]
    ) {
      setBgColor(eventTypeColors[formData.eventType]);
    } else {
      setBgColor("#e7e7df");
    }
  }, [formData.eventName, formData.eventType]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = Object.values(formData).every((v) => v.trim() !== "");

    if (isValid) {
      // Save all form data to store before navigating
      setEventDetails(formData);
      completeStep(currentStep);
      //setStep(currentStep + 1);
      setStep("budget"); // or nextStepName
      setActiveStep("budget");
      // Navigate to the Budget page
      const nextRoute = getNextRoute(eventDetails, pathname);
      router.push(nextRoute);
      //router.push("/budget");
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Also update store in real-time for pre-fill capability
    setEventDetails({ [field]: value });
  };

  const isComplete =
    formData.eventName &&
    formData.date &&
    formData.time &&
    formData.location &&
    formData.guestCount &&
    formData.eventType &&
    formData.budget &&
    formData.venueType;

  const firstInputRef = useRef(null);
  const locationRef = useRef(null);
  const guestCountRef = useRef(null);
  const popRef = useRef(null);

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  useEffect(() => {
  function handleClick(e) {
    if (!e.target.closest(".datetime-popover")) {
      setShowDateTime(false);
      setDtStep("date");
    }
  }

  if (showDateTime) {
    document.addEventListener("mousedown", handleClick);
  }

  return () => document.removeEventListener("mousedown", handleClick);
}, [showDateTime]);

  useEffect(() => {
  if (showDateTime) {
    popRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
}, [showDateTime]);

  useEffect(() => {
  const isValid =
    formData.eventName &&
    formData.date &&
    formData.time &&
    formData.location &&
    formData.guestCount &&
    formData.eventType &&
    formData.budget &&
    formData.venueType;

  setFormValid(Boolean(isValid));
}, [formData]);

  useEffect(() => {
  if (!hasHydrated) return;

  setFormData({
    eventName: eventDetails.eventName || "",
    date: eventDetails.date || "",
    time: eventDetails.time || "",
    location: eventDetails.location || "",
    guestCount: eventDetails.guestCount || "",
    eventType: eventDetails.eventType || "",
    budget: eventDetails.budget || "",
    venueType: eventDetails.venueType || "",
  });
}, [hasHydrated]);

  if (!hasHydrated) return null; // or loading skeleton

  return (
    <motion.div
      className="pt-20 pb-10 px-8 min-h-screen flex items-center justify-center"
      animate={{ backgroundColor: bgColor }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl font-medium"
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
          Blueprint
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
          Let's start with the essentials
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <FloatingInput
            inputRef={firstInputRef}
            label="Event Name"
            value={formData.eventName}
            onChange={(v) => handleChange("eventName", v)}
            placeholder="Enter event name"
          />

          <div className="space-y-4 relative">

  {/* HEADER */}
  <div className="flex items-center justify-between relative">
    <h3
      className="text-sm uppercase tracking-wider"
      style={{
        fontFamily: "var(--font-body)",
        fontSize: "0.875rem",
        color: "var(--color-dark)",
        opacity: 0.7,
        letterSpacing: "0.05em",
      }}
    >
      Select Date & Time
    </h3>

    {/* ICON WRAPPER (IMPORTANT FOR POSITIONING) */}
    <div className="relative">
      <button
        type="button"
        onClick={() => {
          setShowDateTime((p) => !p);
          setDtStep("date");
        }}
        className="p-2 rounded-full hover:bg-black/5 transition"
      >
        <Calendar size={18} />
      </button>

      {/* FLOATING POPUP */}
      {showDateTime && (
        <div
          ref={popRef}
          className="datetime-popover absolute right-0 top-full mt-2 z-50 w-[320px] bg-white shadow-xl rounded-2xl p-4 border border-black/5"
        >

          {/* DATE STEP */}
          {dtStep === "date" && (
            <>
              <DayPicker
                mode="single"
                selected={
                  formData.date ? new Date(formData.date) : undefined
                }
                onSelect={(date) => {
                  if (!date) return;

                  handleChange("date", date.toISOString());

                  // go to time step
                  setDtStep("time");
                }}
                disabled={{ before: new Date() }}
              />

              <div className="mt-3 text-xs opacity-60">
                Select a date to continue
              </div>
            </>
          )}

          {/* TIME STEP */}
          {dtStep === "time" && (
            <>
              <div className="grid grid-cols-3 gap-2">
                {[
                  "09:00 AM","10:00 AM","11:00 AM",
                  "12:00 PM","01:00 PM","02:00 PM",
                  "03:00 PM","04:00 PM","05:00 PM",
                  "06:00 PM","07:00 PM","08:00 PM",
                ].map((time) => {
                  const isSelected = formData.time === time;

                  return (
                    <motion.button
                      key={time}
                      type="button"
                      onClick={() => {
                        handleChange("time", time);

                        // CLOSE POPUP
                        setShowDateTime(false);
                        setDtStep("date");

                        // MOVE TO NEXT FIELD
                        setTimeout(() => {
                          locationRef.current?.focus();
                          locationRef.current?.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                          });
                        }, 0);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-lg text-sm cursor-pointer w-max"
                      style={{
                        backgroundColor: isSelected
                          ? "#58644B"
                          : "#D9DCD6",
                        color: isSelected
                          ? "white"
                          : "var(--color-dark)",
                      }}
                    >
                      {time}
                    </motion.button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setDtStep("date")}
                className="flex items-center gap-2 mt-3 text-xs opacity-60 hover:opacity-100"
              >
                <ArrowLeft size={16} /> Change date
              </button>
            </>
          )}

        </div>
      )}
    </div>
  </div>

  {/* SUMMARY CHIPS */}
  {(formData.date || formData.time) && (
    <div className="flex gap-2 flex-wrap text-sm mb-11">

      {formData.date && (
        <button
          type="button"
          onClick={() => {
            setShowDateTime(true);
            setDtStep("date");
          }}
          className="flex items-center gap-3 px-3 py-1 rounded-full bg-black/5 hover:bg-black/10 transition"
        >
          <Calendar size={18} />
          {new Date(formData.date).toDateString()}
        </button>
      )}

      {formData.time && (
        <button
          type="button"
          onClick={() => {
            setShowDateTime(true);
            setDtStep("time");
          }}
          className="flex items-center gap-3 px-3 py-1 rounded-full bg-black/5 hover:bg-black/10 transition"
        >
          <Clock size={18} />
          {formData.time}
        </button>
      )}

    </div>
  )}

</div>

          <FloatingInput
            label="City"
            value={formData.location}
            onChange={(v) => handleChange("location", v)}
            placeholder="Enter city"
            inputRef={locationRef}
          />

          {/* <FloatingInput
            label="City"
            value={formData.city}
            onChange={(v) => handleChange("city", v)}
            placeholder="Enter venue"
          /> */}

          <div className="space-y-3 flex flex-col">
            <label
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                color: "var(--color-dark)",
                opacity: 0.7,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Venue Type
            </label>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {["Open Air", "Indoor"].map((type) => (
                <motion.button
                  key={type}
                  type="button"
                  onClick={() => {
                    handleChange("venueType", type);

                    setTimeout(() => {
                      guestCountRef.current?.focus();
                      guestCountRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    }, 0);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-3 rounded-2xl transition-all duration-300"
                  style={{
                    backgroundColor:
                      formData.venueType === type
                        ? "#58644B"
                        : "#D9DCD6",
                    color:
                      formData.venueType === type
                        ? "white"
                        : "var(--color-dark)",
                  }}
                >
                  {type}
                </motion.button>
              ))}
            </div>
          </div>

          <FloatingInput
            inputRef={guestCountRef}
            label="Expected Guests Count"
            value={formData.guestCount}
            onChange={(v) => handleChange("guestCount", v)}
            type="number"
            placeholder="Number of attendees"
            onWheel={(e) => e.target.blur()}
          />

          <FloatingInput
            label="Budget (₹ Lakhs)"
            value={formData.budget}
            onChange={(v) => handleChange("budget", v)}
            type="number"
            placeholder="Total budget in lakhs"
            onWheel={(e) => e.target.blur()} // Prevent scroll change
          />

          <div className="space-y-3 flex flex-col">
            <label
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                color: "var(--color-dark)",
                opacity: 0.7,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Event Type
            </label>

            <div className="grid grid-cols-3 gap-3">
              {Object.keys(eventTypeColors)
                .filter((t) => t !== "Other")
                .map((type) => (
                  <motion.button
                    key={type}
                    type="button"
                    onClick={() => handleChange("eventType", type)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-3 rounded-2xl transition-all duration-300"
                    style={{
                      backgroundColor:
                        formData.eventType === type ? "#58644B" : "#D9DCD6",
                      color: formData.eventType === type ? "white" : "var(--color-dark)",
                    }}
                  >
                    {type}
                  </motion.button>
                ))}
            </div>
          </div>

          <Map
            summaryData={formData}
            onSelectVenue={setSelectedVenue}
          />

          <label
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                color: "var(--color-dark)",
                opacity: 0.7,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Event Theme
            </label>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-3">
            {themes.map((theme) => {
              const isSelected = selectedTheme?.id === theme.id;

              return (
                <motion.div
                  key={theme.id}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => setTheme(theme)}
                  className="relative cursor-pointer rounded-3xl overflow-hidden"
                  style={{
                    border: isSelected
                      ? "3px solid var(--color-primary)"
                      : "3px solid transparent",
                  }}
                >
                  {/* IMAGE */}
                  <img
                    src={theme.image}
                    alt={theme.label}
                    className="w-full h-56 object-cover"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0" />

                  {/* LABEL */}
                  <div className="absolute bottom-3 left-4 text-white font-medium">
                    {theme.label}
                  </div>

                  {/* CHECK */}
                  {isSelected && (
                    <div
                      className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#58644B" }}
                    >
                      <Check size={16} color="white" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          <motion.button
            type="submit"
            disabled={!isComplete}
            whileHover={isComplete ? { scale: 1.02 } : {}}
            whileTap={isComplete ? { scale: 0.98 } : {}}
            className="w-[52%] mx-auto mt-12 px-8 py-5 rounded-full flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              backgroundColor: "var(--color-dark)",
              color: "var(--color-bg)",
              fontFamily: "var(--font-body)",
              fontSize: "1.125rem",
              fontWeight: 600,
              letterSpacing: "0.02em",
            }}
          >
            Continue
            <ArrowRight size={20} />
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}

/* Floating Input Component */
function FloatingInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  onWheel,
  inputRef,
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative py-2">
      <motion.label
        animate={{
          y: focused || value ? -28 : 0,
          scale: focused || value ? 0.85 : 1,
          opacity: focused || value ? 0.7 : 0.5,
        }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-0 pointer-events-none"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.875rem",
          color: "var(--color-dark)",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          transformOrigin: "left center",
        }}
      >
        {label}
      </motion.label>

      <motion.div
        layout
        className="absolute left-0 bottom-0 h-[1px] w-full"
        animate={{
          scaleX: focused ? 1 : 0,
          opacity: focused ? 1 : 0.3,
        }}
        transition={{ duration: 0.25 }}
        style={{
          backgroundColor: "#58644B",
          transformOrigin: "left",
        }}
      />

      <input
        ref={inputRef}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={focused ? placeholder : ""}
        onWheel={onWheel}
        className="w-full px-0 bg-transparent outline-none transition-all duration-300 appearance-none"
        style={{
          borderColor: focused
            ? "var(--color-primary)"
            : "var(--glass-border)",
          fontFamily: "var(--font-body)",
          fontSize: "1.25rem",
          color: "var(--color-dark)",
        }}
      />
    </div>
  );
}