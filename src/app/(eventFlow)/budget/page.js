// "use client";

// import { motion } from "framer-motion";
// import { useState, useRef, useEffect } from "react";
// import { ArrowRight, Sparkles } from "lucide-react";
// import ProgressMap from "@/components/ProgressMap";
// import { useEventStore } from "@/store/useEventStore";

// import { getNextRoute } from "@/lib/eventFlow";
// import { useRouter, usePathname } from "next/navigation";


// export default function BudgetOptimizer() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const eventDetails = useEventStore((s) => s.eventDetails);
  

//   // Get store functions
//   const budget = useEventStore((state) => state.budget);
//   const setBudget = useEventStore((state) => state.setBudget);
//   const setBudgetAllocation = useEventStore((state) => state.setBudgetAllocation);
//   const currentStep = useEventStore((state) => state.currentStep);
//   const completeStep = useEventStore((state) => state.completeStep);
//   const setStep = useEventStore((state) => state.setStep);
//   const setActiveStep = useEventStore((state) => state.setActiveStep);

//   const handleStepClick = (stepId) => {
//     if (stepId <= currentStep) {
//       console.log(`Navigating to step ${stepId}`);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (currentTotal > 100) {
//       setShowBudgetModal(true);
//       return;
//     }

//     if (currentTotal < 100 && !pendingSubmit) {
//       setShowBudgetModal(true);
//       return;
//     }

//     proceedSubmit();
//   };

//   const proceedSubmit = () => {
//     const allocations = {};
//     sliders.forEach((s) => {
//       allocations[s.id] = s.value;
//     });

//     setBudget({ allocations });
//     completeStep(currentStep);
//     setStep("weather"); // or nextStepName
//     setActiveStep("weather");
//     const nextRoute = getNextRoute(eventDetails, pathname);
//   router.push(nextRoute);
//     //router.push("/weather");
//   };

//   const totalBudget = 100;
//   const [showSuggestion, setShowSuggestion] = useState(false);

//   const hasShownSuggestion = useRef(false);
//   const getSummaryData = useEventStore((s) => s.getSummaryData);
//   const summaryData = getSummaryData();
//   const totalEventBudget = Number(summaryData?.budget || 0);
//   const formatLakhs = (value) => {
//     if (!value || isNaN(value)) return "₹0L";

//     return `₹${Math.round(value)}L`;
//   };
//   const [suggestion, setSuggestion] = useState(null);
//   const hasRequested = useRef(false);

//   const [showBudgetModal, setShowBudgetModal] = useState(false);
//   const [pendingSubmit, setPendingSubmit] = useState(false);

//   // Pre-fill from store
//   const [sliders, setSliders] = useState([
//     { id: "food", label: "Food & Beverage", value: budget.allocations?.food || 30, color: "#FF6B6B" },
//     { id: "decor", label: "Decor & Design", value: budget.allocations?.decor || 25, color: "#4ECDC4" },
//     { id: "tech", label: "Tech & AV", value: budget.allocations?.tech || 20, color: "#AA96DA" },
//     { id: "performance", label: "Entertainment", value: budget.allocations?.performance || 15, color: "#F38181" },
//     { id: "extras", label: "Miscellaneous", value: budget.allocations?.extras || 10, color: "#95E1D3" },
//   ]);

//   const currentTotal = sliders.reduce((sum, s) => sum + s.value, 0);
//   const isOverBudget = currentTotal > totalBudget;

//   const handleSliderChange = (id, newValue) => {
//     setSliders((prev) =>
//       prev.map((s) => (s.id === id ? { ...s, value: newValue } : s))
//     );
//     // Save to store in real-time
//     setBudgetAllocation(id, newValue);

//   };

//   const applySuggestion = () => {
//     if (!suggestion) return;

//     setSliders((prev) =>
//       prev.map((s) => {
//         if (s.id === suggestion.reduce.category) {
//           return { ...s, value: s.value - suggestion.reduce.percent };
//         }
//         if (s.id === suggestion.increase.category) {
//           return { ...s, value: s.value + suggestion.increase.percent };
//         }
//         return s;
//       })
//     );

//     setShowSuggestion(false);
//   };

//   useEffect(() => {
//     const fetchSuggestion = async () => {
//       if (!summaryData || hasRequested.current) return;

//       hasRequested.current = true;

//       try {
//         const res = await fetch("/api/budget-suggestion", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ summaryData }),
//         });

//         if (!res.ok) throw new Error("AI request failed");

//         const data = await res.json();
//         console.log(data.suggestion)

//         setSuggestion(data.suggestion); // store AI output
//         setShowSuggestion(true);        // show popup ONLY after success
//       } catch (err) {
//         console.error("AI suggestion failed:", err);
//       }
//     };

//     fetchSuggestion();
//   }, [summaryData]);

//   return (
//     <div className="min-h-screen dark:bg-black">
//        {/* Progress Map */}
//       {/* <ProgressMap currentStep={currentStep} onStepClick={handleStepClick} /> */}
//     <div
//       className="pt-20 pb-20 px-8 min-h-screen"
//       style={{ backgroundColor: "var(--color-bg)" }}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//         className="max-w-4xl mx-auto"
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
//           Balance
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
//           Distribute your budget wisely
//         </p>

//         {/* Budget Total */}
//         <div
//           className="mb-12 rounded-3xl"
//           style={{
//             //backgroundColor: "var(--glass-fill)",
//             backdropFilter: "blur(var(--blur))",
//             border: "1px solid var(--glass-border)",
//           }}
//         >
//           <div className="flex justify-between font-dm items-center mb-4">
//             <span className="text-sm opacity-70">Total Allocation</span>
//             <span
//               className="text-2xl font-semibold flex flex-col"
//               style={{
//                 color: isOverBudget ? "#d4183d" : "#62754c",
//               }}
//             >
//               {currentTotal}%
//               <span
//                 className="text-sm font-normal items-end"
//                 style={{
//                   color: isOverBudget ? "#d4183d" : "black",
//                 }}
//               >
//                 ₹{totalEventBudget}L
//               </span>
//             </span>
//           </div>

//           <div className="h-3 rounded-full overflow-hidden bg-black/5">
//             <motion.div
//               className="h-full rounded-full"
//               animate={{
//                 width: `${Math.min(currentTotal, 100)}%`,
//                 backgroundColor: isOverBudget
//                   ? "#d4183d"
//                   : "#62754c",
//               }}
//               transition={{ duration: 0.3 }}
//             />
//           </div>

//           {currentTotal < 100 && (
//             <p className="mt-3 text-center text-sm text-yellow-600">
//               You still have {100 - currentTotal}% unallocated
//             </p>
//           )}

//           {isOverBudget && (
//             <p className="mt-3 text-center text-sm text-red-600">
//               Budget exceeded! Please reduce allocations.
//             </p>
//           )}
//         </div>

//         {/* Sliders */}
//         <div className="space-y-8 mb-12">
//           {sliders.map((slider, idx) => (
//             <motion.div
//               key={slider.id}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: idx * 0.1 }}
//             >
//               <div className="flex justify-between mb-3">
//                 <span>{slider.label}</span>
//                 <div className="text-right">
//                   <div style={{ color: slider.color }}>
//                     {slider.value}%
//                   </div>

//                   <motion.div
//                     key={`${slider.id}-${slider.value}-${totalEventBudget}`}
//                     initial={{ opacity: 0, y: 4 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="text-sm opacity-70"
//                   >
//                     {formatLakhs(
//                       (slider.value / 100) * totalEventBudget
//                     )}
//                   </motion.div>
//                 </div>
//               </div>

//               <input
//                 type="range"
//                 min="0"
//                 max="50"
//                 value={slider.value}
//                 onChange={(e) =>
//                   handleSliderChange(slider.id, parseInt(e.target.value))
//                 }
//                 className="w-full h-3 rounded-full appearance-none cursor-pointer slider"
//                 style={{
//                   background: `linear-gradient(to right,
//                     ${slider.color} 0%,
//                     ${slider.color} ${(slider.value / 50) * 100}%,
//                     rgba(0,0,0,0.05) ${(slider.value / 50) * 100}%,
//                     rgba(0,0,0,0.05) 100%)`,
//                 }}
//               />
//             </motion.div>
//           ))}
//         </div>

//         {/* Suggestion */}
//         {showSuggestion && (
//           <motion.div
//             initial={{ opacity: 0, y: 20, scale: 0.98 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             transition={{ duration: 0.25 }}
//             className="fixed bottom-8 right-8 p-6 rounded-3xl max-w-sm shadow-2xl z-50"
//             style={{
//               backgroundColor: "transparent",
//               backdropFilter: "blur(50px)",
//               border: "1px solid rgba(255, 255, 255, 0.12)",
//               boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
//             }}
//           >
//             <div className="flex gap-3">
//               <div className="w-40 h-10 flex items-center justify-center rounded-full bg-[var(--color-primary)]">
//                 <Sparkles size={18} className="text-white" />
//               </div>

//               <div>
//   {/* TITLE */}
//   <h2 className="text-lg font-semibold mb-3">
//     {suggestion?.title}
//   </h2>

//   {/* MESSAGE */}
//   <p className="text-sm opacity-80 mb-4 leading-relaxed">
//     Impact:
//   </p>

//   {/* IMPACT */}
//   {suggestion?.impact && (
//     <div className="text-sm text-green-600 mb-4">
//       {suggestion.impact}
//     </div>
//   )}

//   {/* ACTION BLOCK (VERY IMPORTANT) */}
//   <div className="p-3 rounded-2xl bg-white/10 border border-white/10 mb-4">
    
//     <p className="text-xs opacity-60 mb-2">
//       AI Suggested Adjustment
//     </p>

//     <div className="flex items-center justify-between text-sm">
//       <span>
//         Reduce{" "}
//         <span className="font-semibold capitalize">
//           {suggestion?.reduce?.category}
//         </span>
//       </span>

//       <span className="text-red-500 font-semibold">
//         -{suggestion?.reduce?.percent}%
//       </span>
//     </div>

//     <div className="flex items-center justify-between text-sm mt-2">
//       <span>
//         Increase{" "}
//         <span className="font-semibold capitalize">
//           {suggestion?.increase?.category}
//         </span>
//       </span>

//       <span className="text-green-500 font-semibold">
//         +{suggestion?.increase?.percent}%
//       </span>
//     </div>
//   </div>

//   {/* BUTTONS */}
//   <div className="flex gap-2">
//     <button
//       onClick={applySuggestion}
//       className="px-3 py-1 rounded-full bg-[var(--color-primary)] text-white text-sm"
//     >
//       Apply
//     </button>

//     <button
//       onClick={() => setShowSuggestion(false)}
//       className="px-3 py-1 rounded-full border border-[var(--color-dark)] text-[var(--color-dark)] text-sm"
//     >
//       Dismiss
//     </button>
//   </div>
// </div>
//             </div>
//           </motion.div>
//         )} 

//         {/* Continue */}
//         <motion.button
//           onClick={handleSubmit}
//           disabled={isOverBudget}
//           className="w-full py-5 rounded-full flex justify-center items-center gap-2 disabled:opacity-40"
//           style={{
//             backgroundColor: "var(--color-dark)",
//             color: "var(--color-bg)",
//           }}
//         >
//           Continue <ArrowRight size={18} />
//         </motion.button>
//       </motion.div>

//       <style>{`
//         .slider::-webkit-slider-thumb {
//           appearance: none;
//           width: 20px;
//           height: 20px;
//           border-radius: 50%;
//           background: #62754c;
//           border: 3px solid white;
//         }
//       `}</style>
//     </div>
//     {showBudgetModal && (
//   <div className="fixed inset-0 z-50 flex items-center justify-center">
    
//     {/* overlay */}
//     <div 
//       className="absolute inset-0 bg-gray/40 backdrop-blur-sm"
//       onClick={() => setShowBudgetModal(false)}
//     />

//     {/* modal */}
//     <motion.div
//       initial={{ scale: 0.9, opacity: 0 }}
//       animate={{ scale: 1, opacity: 1 }}
//       className="relative p-6 rounded-3xl max-w-md w-full"
//       style={{
//         backgroundColor: "var(--glass-fill)",
//         border: "1px solid #62754c",
//       }}
//     >
//       <h2 className="text-lg font-semibold mb-2">
//         Budget Not Fully Balanced
//       </h2>

//       <p className="text-sm opacity-70 mb-4">
//         {currentTotal > 100
//           ? "Your budget exceeds 100%. Please adjust allocations."
//           : `You've only allocated ${currentTotal}%. Continue anyway?`}
//       </p>

//       <div className="flex gap-3 justify-end">
        
//         <button
//           onClick={() => setShowBudgetModal(false)}
//           className="px-4 py-2 rounded-full border"
//         >
//           Go Back
//         </button>

//         {currentTotal <= 100 && (
//           <button
//             onClick={() => {
//               setShowBudgetModal(false);
//               proceedSubmit();
//             }}
//             className="px-4 py-2 rounded-full"
//             style={{
//               backgroundColor: "var(--color-dark)",
//               color: "var(--color-bg)",
//             }}
//           >
//             Continue Anyway
//           </button>
//         )}

//       </div>
//     </motion.div>
//   </div>
// )}
//     </div>
//   );
// }
"use client";

import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ArrowRight, Sparkles, X, TrendingDown, TrendingUp } from "lucide-react";
import { useEventStore } from "@/store/useEventStore";
import { getNextRoute } from "@/lib/eventFlow";
import { useRouter, usePathname } from "next/navigation";

// ── Slider categories with sophisticated monochrome palette ───────────────────
const SLIDER_META = {
  food:        { label: "Food & Beverage", sub: "Catering, drinks, service" },
  decor:       { label: "Decor & Design",  sub: "Florals, lighting, ambience" },
  tech:        { label: "Tech & AV",       sub: "Sound, screens, streaming" },
  performance: { label: "Entertainment",   sub: "Artists, performers, hosts" },
  extras:      { label: "Miscellaneous",   sub: "Logistics, contingency" },
};

// ── Format helpers ────────────────────────────────────────────────────────────
const fmtL   = (v) => (v && !isNaN(v) ? `₹${Math.round(v)}L` : "₹0L");
const fmtPct = (v) => `${v}%`;

// ── Animated number ───────────────────────────────────────────────────────────
function AnimNum({ value, suffix = "", prefix = "", style }) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);
  useEffect(() => {
    if (prev.current === value) return;
    const start = prev.current, end = value;
    const dur = 400, startTime = performance.now();
    const tick = (now) => {
      const t = Math.min((now - startTime) / dur, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(start + (end - start) * ease));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    prev.current = value;
  }, [value]);
  return <span style={style}>{prefix}{display}{suffix}</span>;
}

// ── Single slider row ─────────────────────────────────────────────────────────
function SliderRow({ slider, index, totalBudget, isOver, onChange }) {
  const meta       = SLIDER_META[slider.id] || { label: slider.label, sub: "" };
  const lakhs      = (slider.value / 100) * totalBudget;
  const fillPct    = (slider.value / 50) * 100; // max 50

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      {/* Label row */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <p style={{
            fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
            fontSize: 16, fontWeight: 600,
            color: "var(--color-dark, #14182A)",
          }}>{meta.label}</p>
          <p style={{
            fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
            fontSize: 11, fontWeight: 400,
            color: "rgba(20,24,42,0.35)",
            marginTop: 1,
          }}>{meta.sub}</p>
        </div>

        <div className="text-right flex-shrink-0">
          <AnimNum
            value={slider.value}
            suffix="%"
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 18, fontWeight: 700,
              color: isOver ? "#C0392B" : "var(--color-dark, #14182A)",
              display: "block", lineHeight: 1,
            }}
          />
          <AnimNum
            value={Math.round(lakhs * 10) / 10}
            suffix="L"
            prefix="₹"
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 11, fontWeight: 500,
              color: "var(--color-primary, #62754C)",
              display: "block", marginTop: 2,
            }}
          />
        </div>
      </div>

      {/* Track + thumb */}
      <div className="relative" style={{ height: 36, display: "flex", alignItems: "center" }}>
        {/* Track background */}
        <div style={{
          position: "absolute", left: 0, right: 0, height: 3,
          background: "rgba(20,24,42,0.08)",
          borderRadius: 99,
        }} />

        {/* Fill */}
        <motion.div
          style={{
            position: "absolute", left: 0, height: 3,
            borderRadius: 99,
            background: isOver
              ? "linear-gradient(90deg, #C0392B, #E74C3C)"
              : "linear-gradient(90deg, var(--color-primary, #62754C), #8BA672)",
            width: `${fillPct}%`,
          }}
          animate={{ width: `${fillPct}%` }}
          transition={{ duration: 0.25 }}
        />

        {/* Native range input — invisible but functional */}
        <input
          type="range"
          min={0}
          max={50}
          value={slider.value}
          onChange={(e) => onChange(slider.id, parseInt(e.target.value))}
          style={{
            position: "absolute", left: 0, right: 0,
            width: "100%", height: "100%",
            opacity: 0, cursor: "pointer", zIndex: 2,
            margin: 0,
          }}
        />

        {/* Custom thumb — purely decorative, synced via JS */}
        <motion.div
          animate={{ left: `calc(${fillPct}% - 10px)` }}
          transition={{ duration: 0.2 }}
          style={{
            position: "absolute",
            width: 20, height: 20,
            borderRadius: "50%",
            background: "var(--color-bg, #FDFDF8)",
            border: `2px solid ${isOver ? "#C0392B" : "var(--color-primary, #62754C)"}`,
            boxShadow: isOver
              ? "0 0 0 4px rgba(192,57,43,0.12), 0 2px 8px rgba(0,0,0,0.15)"
              : "0 0 0 4px rgba(98,117,76,0.12), 0 2px 8px rgba(0,0,0,0.12)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "rgba(20,24,42,0.05)", marginTop: 6 }} />
    </motion.div>
  );
}

// ── AI Suggestion bubble ───────────────────────────────────────────────────────
function SuggestionBubble({ suggestion, onApply, onDismiss }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        bottom: 32, right: 32,
        width: 300,
        background: "var(--color-dark, #14182A)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 20,
        boxShadow: "0 24px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03) inset",
        overflow: "hidden",
        zIndex: 100,
      }}
    >
      {/* top accent bar */}
      <div style={{
        height: 2,
        background: "linear-gradient(90deg, var(--color-primary, #62754C), #C9A84C)",
      }} />

      <div style={{ padding: "16px 18px 18px" }}>
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div style={{
              width: 28, height: 28,
              borderRadius: 8,
              background: "rgba(98,117,76,0.2)",
              border: "1px solid rgba(98,117,76,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Sparkles size={13} style={{ color: "#8BA672" }} />
            </div>
            <div>
              <p style={{
                fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
                fontSize: 11, fontWeight: 700,
                color: "rgba(253,253,248,0.9)",
                letterSpacing: "0.02em",
              }}>AI Suggestion</p>
            </div>
          </div>

          <button
            onClick={onDismiss}
            style={{
              width: 22, height: 22,
              borderRadius: 6,
              background: "rgba(255,255,255,0.06)",
              border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <X size={11} style={{ color: "rgba(253,253,248,0.4)" }} />
          </button>
        </div>

        {/* Title */}
        {suggestion?.title && (
          <p style={{
            fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
            fontSize: 13, fontWeight: 600,
            color: "rgba(253,253,248,0.85)",
            marginBottom: 8, lineHeight: 1.4,
          }}>{suggestion.title}</p>
        )}

        {/* Impact */}
        {suggestion?.impact && (
          <p style={{
            fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
            fontSize: 11.5, fontWeight: 400,
            color: "rgba(253,253,248,0.4)",
            marginBottom: 14, lineHeight: 1.5,
          }}>{suggestion.impact}</p>
        )}

        {/* Adjustment rows */}
        <div style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 12,
          overflow: "hidden",
          marginBottom: 14,
        }}>
          {suggestion?.reduce && (
            <div className="flex items-center justify-between" style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="flex items-center gap-2">
                <TrendingDown size={12} style={{ color: "#E74C3C", flexShrink: 0 }} />
                <span style={{
                  fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
                  fontSize: 12, fontWeight: 500,
                  color: "rgba(253,253,248,0.6)",
                  textTransform: "capitalize",
                }}>{suggestion.reduce.category}</span>
              </div>
              <span style={{
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: 12, fontWeight: 700, color: "#E74C3C",
              }}>−{suggestion.reduce.percent}%</span>
            </div>
          )}
          {suggestion?.increase && (
            <div className="flex items-center justify-between" style={{ padding: "10px 14px" }}>
              <div className="flex items-center gap-2">
                <TrendingUp size={12} style={{ color: "#8BA672", flexShrink: 0 }} />
                <span style={{
                  fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
                  fontSize: 12, fontWeight: 500,
                  color: "rgba(253,253,248,0.6)",
                  textTransform: "capitalize",
                }}>{suggestion.increase.category}</span>
              </div>
              <span style={{
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: 12, fontWeight: 700, color: "#8BA672",
              }}>+{suggestion.increase.percent}%</span>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={onApply}
            style={{
              flex: 1,
              padding: "9px 0",
              fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
              fontSize: 12, fontWeight: 700,
              background: "var(--color-primary, #62754C)",
              color: "white",
              border: "none",
              borderRadius: 10,
              cursor: "pointer",
            }}
          >
            Apply
          </button>
          <button
            onClick={onDismiss}
            style={{
              flex: 1,
              padding: "9px 0",
              fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
              fontSize: 12, fontWeight: 600,
              background: "transparent",
              color: "rgba(253,253,248,0.4)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 10,
              cursor: "pointer",
            }}
          >
            Dismiss
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Budget modal ──────────────────────────────────────────────────────────────
function BudgetModal({ currentTotal, onBack, onContinue }) {
  const isOver = currentTotal > 100;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0"
        style={{ background: "rgba(20,24,42,0.5)", backdropFilter: "blur(8px)" }}
        onClick={onBack}
      />
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "relative",
          width: "90%", maxWidth: 400,
          background: "var(--color-bg, #FDFDF8)",
          border: "1px solid rgba(20,24,42,0.1)",
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.2)",
        }}
      >
        {/* accent top */}
        <div style={{
          height: 3,
          background: isOver
            ? "linear-gradient(90deg, #C0392B, #E74C3C)"
            : "linear-gradient(90deg, #C9A84C, #62754C)",
        }} />

        <div style={{ padding: "24px 28px 28px" }}>
          <h2 style={{
            fontFamily: "var(--font-display, Georgia, serif)",
            fontSize: "1.5rem", fontWeight: 700, fontStyle: "italic",
            color: "var(--color-dark, #14182A)",
            marginBottom: 10,
          }}>
            {isOver ? "Over Budget" : "Unallocated Funds"}
          </h2>
          <p style={{
            fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
            fontSize: 13, lineHeight: 1.6,
            color: "rgba(20,24,42,0.55)",
            marginBottom: 24,
          }}>
            {isOver
              ? `Your allocation totals ${currentTotal}%. Please reduce to exactly 100% before continuing.`
              : `You've allocated ${currentTotal}% — ${100 - currentTotal}% remains unassigned. Continue with this allocation?`}
          </p>

          <div className="flex gap-3 justify-end">
            <button
              onClick={onBack}
              style={{
                padding: "10px 20px",
                fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
                fontSize: 13, fontWeight: 600,
                background: "transparent",
                color: "rgba(20,24,42,0.6)",
                border: "1px solid rgba(20,24,42,0.15)",
                borderRadius: 12,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            {!isOver && (
              <button
                onClick={onContinue}
                style={{
                  padding: "10px 24px",
                  fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
                  fontSize: 13, fontWeight: 700,
                  background: "var(--color-dark, #14182A)",
                  color: "var(--color-bg, #FDFDF8)",
                  border: "none",
                  borderRadius: 12,
                  cursor: "pointer",
                }}
              >
                Continue anyway
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function BudgetOptimizer() {
  const router   = useRouter();
  const pathname = usePathname();

  const eventDetails        = useEventStore((s) => s.eventDetails);
  const budget              = useEventStore((s) => s.budget);
  const setBudget           = useEventStore((s) => s.setBudget);
  const setBudgetAllocation = useEventStore((s) => s.setBudgetAllocation);
  const currentStep         = useEventStore((s) => s.currentStep);
  const completeStep        = useEventStore((s) => s.completeStep);
  const setStep             = useEventStore((s) => s.setStep);
  const setActiveStep       = useEventStore((s) => s.setActiveStep);
  const getSummaryData      = useEventStore((s) => s.getSummaryData);

  const summaryData      = getSummaryData();
  const totalEventBudget = Number(summaryData?.budget || 0);
  const hasHydrated = useEventStore((s) => s.hasHydrated);

  // const [sliders, setSliders] = useState([
  //   { id: "food",        label: "Food & Beverage", value: budget.allocations?.food        || 30 },
  //   { id: "decor",       label: "Decor & Design",  value: budget.allocations?.decor       || 25 },
  //   { id: "tech",        label: "Tech & AV",       value: budget.allocations?.tech        || 20 },
  //   { id: "performance", label: "Entertainment",   value: budget.allocations?.performance || 15 },
  //   { id: "extras",      label: "Miscellaneous",   value: budget.allocations?.extras      || 10 },
  // ]);

  const [sliders, setSliders] = useState(() => ([
  { id: "food", value: 30 },
  { id: "decor", value: 25 },
  { id: "tech", value: 20 },
  { id: "performance", value: 15 },
  { id: "extras", value: 10 },
]));

  // const budget = useEventStore((s) => s.budget);

  useEffect(() => {
    if (!budget?.allocations) return;

    setSliders([
      { id: "food", value: budget.allocations.food ?? 30 },
      { id: "decor", value: budget.allocations.decor ?? 25 },
      { id: "tech", value: budget.allocations.tech ?? 20 },
      { id: "performance", value: budget.allocations.performance ?? 15 },
      { id: "extras", value: budget.allocations.extras ?? 10 },
    ]);
  }, [budget]);

  const [showSuggestion, setShowSuggestion] = useState(false);
  const [suggestion, setSuggestion]         = useState(null);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const hasRequested = useRef(false);

  const currentTotal = sliders.reduce((sum, s) => sum + s.value, 0);
  const isOver       = currentTotal > 100;
  // How far from 100 — used for progress arc
  const fillRatio    = Math.min(currentTotal, 100) / 100;

  const handleSliderChange = (id, val) => {
    setSliders((prev) => prev.map((s) => s.id === id ? { ...s, value: val } : s));
    setBudgetAllocation(id, val);
  };

  const applySuggestion = () => {
    if (!suggestion) return;
    setSliders((prev) => prev.map((s) => {
      if (s.id === suggestion.reduce?.category)   return { ...s, value: Math.max(0, s.value - suggestion.reduce.percent) };
      if (s.id === suggestion.increase?.category) return { ...s, value: Math.min(50, s.value + suggestion.increase.percent) };
      return s;
    }));
    setShowSuggestion(false);
  };

  const proceedSubmit = () => {
    const allocations = {};
    sliders.forEach((s) => { allocations[s.id] = s.value; });
    setBudget({ allocations });
    completeStep(currentStep);
    setStep("weather");
    setActiveStep("weather");
    router.push(getNextRoute(eventDetails, pathname));
  };

  const handleSubmit = () => {
    if (isOver || currentTotal < 100) { setShowBudgetModal(true); return; }
    proceedSubmit();
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;
    if (!summaryData || hasRequested.current) return;
    hasRequested.current = true;
    (async () => {
      try {
        const res = await fetch("/api/budget-suggestion", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ summaryData }),
        });
        if (!res.ok) return;
        const data = await res.json();
        setSuggestion(data.suggestion);
        setShowSuggestion(true);
      } catch (e) { console.error(e); }
    })();
  }, [hasHydrated]);

  if (!mounted) return null;

  // ── SVG ring dimensions ─────────────────────────────────────────────────
  const R = 64, stroke = 5;
  const circ = 2 * Math.PI * R;
  const dash  = circ * fillRatio;

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: "var(--color-bg, #FDFDF8)" }}>

      {/* Subtle dot grid */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0, opacity: 0.45 }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(rgba(20,24,42,0.04) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }} />
      </div>

      {/* Ambient orb — top right */}
      <div className="fixed pointer-events-none" style={{
        zIndex: 0, top: "-15%", right: "-8%",
        width: 520, height: 520, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(98,117,76,0.07), transparent 70%)",
        filter: "blur(60px)",
      }} />
      {/* Ambient orb — bottom left */}
      <div className="fixed pointer-events-none" style={{
        zIndex: 0, bottom: "-10%", left: "-5%",
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,168,76,0.05), transparent 70%)",
        filter: "blur(50px)",
      }} />

      <div className="relative pt-28 pb-28 px-6" style={{ zIndex: 1 }}>
        <div className="max-w-4xl mx-auto">

          {/* ── Header ────────────────────────────────────────────────── */}
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >

            {/* Title + ring side by side */}
            <div className="flex items-end justify-between gap-8">
              <div>
                <h1 style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.5rem, 5vw, 5.5rem)",
                  color: "var(--color-dark)",
                  marginBottom: "1rem",
                  fontStyle: "italic",
                  textAlign: "center",
                }}>
                  Balance
                </h1>
                {mounted && (
                <p style={{
                  fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
                  fontSize: "0.9rem",
                  color: "rgba(20,24,42,0.4)",
                }}>Distribute your ₹{totalEventBudget}L</p>)}
              </div>

              {/* SVG allocation ring */}
              <div style={{ position: "relative", width: 148, height: 148, flexShrink: 0 }}>
                <svg width={148} height={148} style={{ transform: "rotate(-90deg)" }}>
                  {/* track */}
                  <circle
                    cx={74} cy={74} r={R}
                    fill="none"
                    stroke="rgba(20,24,42,0.07)"
                    strokeWidth={stroke}
                  />
                  {/* fill */}
                  <motion.circle
                    cx={74} cy={74} r={R}
                    fill="none"
                    stroke={isOver ? "#C0392B" : "var(--color-primary, #62754C)"}
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={`${circ}`}
                    animate={{ strokeDashoffset: circ - dash }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    style={{ strokeDashoffset: circ - dash }}
                  />
                  {/* second ring — remaining */}
                  {!isOver && currentTotal < 100 && (
                    <circle
                      cx={74} cy={74} r={R}
                      fill="none"
                      stroke="rgba(201,168,76,0.2)"
                      strokeWidth={stroke}
                      strokeLinecap="round"
                      strokeDasharray={`${circ * (1 - fillRatio)} ${circ}`}
                      strokeDashoffset={-(circ * fillRatio)}
                    />
                  )}
                </svg>
                {/* Center text */}
                <div style={{
                  position: "absolute", inset: 0,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                }}>
                  <AnimNum
                    value={currentTotal}
                    suffix="%"
                    style={{
                      fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                      fontSize: 22, fontWeight: 700,
                      color: isOver ? "#C0392B" : "var(--color-dark, #14182A)",
                      lineHeight: 1,
                    }}
                  />
                  <span style={{
                    fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
                    fontSize: 10, fontWeight: 500,
                    color: "rgba(20,24,42,0.35)",
                    letterSpacing: "0.06em", textTransform: "uppercase",
                    marginTop: 3,
                  }}>
                    {isOver ? "overbudget" : currentTotal === 100 ? "perfect" : "allocated"}
                  </span>
                </div>
              </div>
            </div>

            {/* Status strip */}
            <AnimatePresence mode="wait">
              {isOver ? (
                <motion.div
                  key="over"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex items-center gap-2 mt-5"
                >
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#C0392B" }} />
                  <span style={{
                    fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
                    fontSize: 12, color: "#C0392B", fontWeight: 500,
                  }}>Over by {currentTotal - 100}% — please reduce allocations</span>
                </motion.div>
              ) : currentTotal < 100 ? (
                <motion.div
                  key="under"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex items-center gap-2 mt-5"
                >
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#C9A84C" }} />
                  <span style={{
                    fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
                    fontSize: 12, color: "#7A5E1A", fontWeight: 500,
                  }}>{100 - currentTotal}% unallocated</span>
                </motion.div>
              ) : (
                <motion.div
                  key="perfect"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex items-center gap-2 mt-5"
                >
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-primary, #62754C)" }} />
                  <span style={{
                    fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
                    fontSize: 12, color: "var(--color-primary, #62754C)", fontWeight: 600,
                  }}>Perfectly balanced</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Sliders ──────────────────────────────────────────────────── */}
          <div className="space-y-7 mb-14">
            {sliders.map((slider, idx) => (
              <SliderRow
                key={slider.id}
                slider={slider}
                index={idx}
                totalBudget={totalEventBudget}
                isOver={isOver}
                onChange={handleSliderChange}
              />
            ))}
          </div>

          {/* ── Total row ────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center justify-between mb-10 py-4"
            style={{ borderTop: "1px solid rgba(20,24,42,0.1)", borderBottom: "1px solid rgba(20,24,42,0.1)" }}
          >
            <span style={{
              fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
              fontSize: 13, fontWeight: 600,
              color: "rgba(20,24,42,0.5)",
              letterSpacing: "0.04em", textTransform: "uppercase",
            }}>Total Budget</span>
            <div className="text-right">
              <AnimNum
                value={currentTotal}
                suffix="%"
                style={{
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: 22, fontWeight: 700,
                  color: isOver ? "#C0392B" : "var(--color-dark, #14182A)",
                  display: "block",
                }}
              />
              <span style={{
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: 12, fontWeight: 500,
                color: "var(--color-primary, #62754C)",
              }}>
                ₹{Math.round((currentTotal / 100) * totalEventBudget * 10) / 10}L
              </span>
            </div>
          </motion.div>

          {/* ── Continue button ───────────────────────────────────────────── */}
          <motion.button
            onClick={handleSubmit}
            disabled={isOver}
            whileHover={!isOver ? { scale: 1.02 } : undefined}
            whileTap={!isOver ? { scale: 0.98 } : undefined}
            className="w-full px-8 py-5 rounded-full flex items-center justify-center gap-3"
            style={{
              backgroundColor: isOver
                ? "rgba(20,24,42,0.2)"
                : "var(--color-dark)",
              color: isOver
                ? "rgba(253,253,248,0.4)"
                : "var(--color-bg)",
              fontSize: "1.125rem",
              fontWeight: 600,
              cursor: isOver ? "not-allowed" : "pointer",
              opacity: isOver ? 0.7 : 1,
            }}
          >
            Continue
            <motion.span>
              <ArrowRight size={17} />
            </motion.span>
          </motion.button>

        </div>
      </div>

      {/* ── AI Suggestion ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showSuggestion && suggestion && (
          <SuggestionBubble
            suggestion={suggestion}
            onApply={applySuggestion}
            onDismiss={() => setShowSuggestion(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Budget modal ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showBudgetModal && (
          <BudgetModal
            currentTotal={currentTotal}
            onBack={() => setShowBudgetModal(false)}
            onContinue={() => { setShowBudgetModal(false); proceedSubmit(); }}
          />
        )}
      </AnimatePresence>

      {/* Native range thumb reset */}
      <style>{`
        input[type=range]::-webkit-slider-thumb { appearance: none; width: 0; height: 0; }
        input[type=range]::-moz-range-thumb { width: 0; height: 0; border: none; }
      `}</style>
    </div>
  );
}
