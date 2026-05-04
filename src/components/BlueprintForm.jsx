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
//   Other: "#FDFDF8",
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

//   const [bgColor, setBgColor] = useState("#FDFDF8");

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
//       setBgColor("#FDFDF8");
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
//           backgroundColor: isSelected ? "#62754c" : "rgba(0,0,0,0.03)",
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
//                           ? "#62754c"
//                           : "rgba(98,117,76,0.1)",
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
//                         formData.eventType === type ? "#62754c" : "var(--glass-fill)",
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
import { useState, useEffect } from "react";
import { ArrowRight, Check } from "lucide-react";
import { useEventStore } from "@/store/useEventStore";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
// import img1 from "/themes/CharcoalGraynCopper.png";
// import img2 from "/themes/ForestGreennBeige.png";
// import img3 from "/themes/GoldnBlack.png";
// import img4 from "/themes/NavyBluenSilver.png";
// import img5 from "/themes/RednWhite.png";
// import img6 from "/themes/YellownWhite.png";

import { getNextRoute } from "@/lib/eventFlow";
import { useRouter, usePathname } from "next/navigation";


const eventTypeColors = {
  "Awards & Recognition": "#F5E6C8",
  "Tech Launch": "#C8D4F0",
  Workshop: "#D6DCE8",
  Conference: "#E8D6E8",
  Gala: "#F0D8C8",
  Convention: "#FDFDF8",
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

  // Get store functions
  const eventDetails = useEventStore((state) => state.eventDetails);
  const setEventDetails = useEventStore((state) => state.setEventDetails);
  const currentStep = useEventStore((state) => state.currentStep);
  const completeStep = useEventStore((state) => state.completeStep);
  const setStep = useEventStore((state) => state.setStep);
  const setActiveStep = useEventStore((state) => state.setActiveStep);

  // Pre-fill form data from store on mount
  const [formData, setFormData] = useState({
    eventName: eventDetails.eventName || "",
    date: eventDetails.date || "",
    time: eventDetails.time || "",
    location: eventDetails.location || "",
    guestCount: eventDetails.guestCount || "",
    eventType: eventDetails.eventType || "",
    budget: eventDetails.budget || "",
    city: eventDetails.city || "",
    venueType: eventDetails.venueType || "",
  });

  const [bgColor, setBgColor] = useState("#FDFDF8");

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
      setBgColor("#FDFDF8");
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
    formData.city &&
    formData.venueType;

  return (
    <motion.div
      className="pt-32 pb-20 px-8 min-h-screen flex items-center justify-center"
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
            label="Event Name"
            value={formData.eventName}
            onChange={(v) => handleChange("eventName", v)}
            placeholder="Enter event name"
          />

          {/* DATE + TIME PICKER */}
          <div className="space-y-6">
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

            {/* DATE SCROLLER */}
            <div className="p-4 rounded-2xl bg-white/50 w-[50%]">
              <DayPicker
                className="rdp"
                mode="single"
                selected={formData.date ? new Date(formData.date) : undefined}
                onSelect={(date) => {
                  if (!date) return;
                  handleChange("date", date.toISOString());
                }}
                disabled={{ before: new Date() }}
              />
            </div>

            {/* TIME SLOTS */}
            {formData.date && (
              <div className="grid grid-cols-4 gap-3 mb-12">
                {[
                  "09:00 AM",
                  "10:00 AM",
                  "11:00 AM",
                  "12:00 PM",
                  "01:00 PM",
                  "02:00 PM",
                  "03:00 PM",
                  "04:00 PM",
                  "05:00 PM",
                  "06:00 PM",
                  "07:00 PM",
                  "08:00 PM",
                ].map((time) => {
                  const isSelected = formData.time === time;

                  return (
                    <motion.button
                      key={time}
                      type="button"
                      onClick={() => handleChange("time", time)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 rounded-xl"
                      style={{
                        backgroundColor: isSelected
                          ? "#62754c"
                          : "rgba(98,117,76,0.1)",
                        color: isSelected ? "white" : "var(--color-dark)",
                      }}
                    >
                      {time}
                    </motion.button>
                  );
                })}
              </div>
            )}
          </div>

          <FloatingInput
            label="Location"
            value={formData.location}
            onChange={(v) => handleChange("location", v)}
            placeholder="Enter venue"
          />

          <FloatingInput
            label="City"
            value={formData.city}
            onChange={(v) => handleChange("city", v)}
            placeholder="Enter city"
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
              Venue Type
            </label>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {["Open Air", "Indoor"].map((type) => (
                <motion.button
                  key={type}
                  type="button"
                  onClick={() => handleChange("venueType", type)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-3 rounded-2xl transition-all duration-300"
                  style={{
                    backgroundColor:
                      formData.venueType === type
                        ? "#62754c"
                        : "rgba(98,117,76,0.1)",
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
            label="Expected Guests"
            value={formData.guestCount}
            onChange={(v) => handleChange("guestCount", v)}
            type="number"
            placeholder="Number of attendees"
            onWheel={(e) => e.target.blur()} // Prevent scroll change
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
                        formData.eventType === type ? "#62754c" : "rgba(98,117,76,0.1)",
                      color: formData.eventType === type ? "white" : "var(--color-dark)",
                    }}
                  >
                    {type}
                  </motion.button>
                ))}
            </div>
          </div>

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

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
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
                      : "3px solid var(--glass-border)",
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
                      style={{ backgroundColor: "#62754c" }}
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
            className="w-full mt-12 px-8 py-5 rounded-full flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
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
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
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

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={focused ? placeholder : ""}
        onWheel={onWheel} // Prevent scroll change
        className="w-full px-0 py-4 bg-transparent outline-none transition-all duration-300"
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