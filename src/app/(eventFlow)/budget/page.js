// "use client";

// import ProgressMap from "@/components/ProgressMap";
// import { useState } from "react";

// export default function BudgetPage() {
//   const [currentStep, setCurrentStep] = useState(3); // Set to the "Budget" step

//   const handleStepClick = (stepId) => {
//     if (stepId <= currentStep) {
//       // Handle navigation between steps if needed
//       console.log(`Navigating to step ${stepId}`);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white dark:bg-black">
//       {/* Progress Map */}
//       <ProgressMap currentStep={currentStep} onStepClick={handleStepClick} />

//       {/* Budget Page Content */}
//       <div className="p-8">
//         <h1
//           className="text-3xl font-bold text-center"
//           style={{
//             fontFamily: "var(--font-serif)",
//             color: "var(--color-dark)",
//           }}
//         >
//           Budget Planning
//         </h1>
//         <p
//           className="text-center mt-4"
//           style={{
//             fontFamily: "var(--font-body)",
//             fontSize: "1.125rem",
//             color: "var(--color-dark)",
//             opacity: 0.7,
//           }}
//         >
//           Let's allocate your budget for the event.
//         </p>

//         {/* Add your budget form or content here */}
//         <div className="mt-8">
//           <p
//             className="text-center"
//             style={{
//               fontFamily: "var(--font-body)",
//               fontSize: "1rem",
//               color: "var(--color-dark)",
//             }}
//           >
//             Budget form or content goes here.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import ProgressMap from "@/components/ProgressMap";
import { useEventStore } from "@/store/useEventStore";

import { getNextRoute } from "@/lib/eventFlow";
import { useRouter, usePathname } from "next/navigation";


export default function BudgetOptimizer() {
  const router = useRouter();
  const pathname = usePathname();
  const eventDetails = useEventStore((s) => s.eventDetails);

  // Get store functions
  const budget = useEventStore((state) => state.budget);
  const setBudget = useEventStore((state) => state.setBudget);
  const setBudgetAllocation = useEventStore((state) => state.setBudgetAllocation);
  const currentStep = useEventStore((state) => state.currentStep);
  const completeStep = useEventStore((state) => state.completeStep);
  const setStep = useEventStore((state) => state.setStep);
  const setActiveStep = useEventStore((state) => state.setActiveStep);

  const handleStepClick = (stepId) => {
    if (stepId <= currentStep) {
      console.log(`Navigating to step ${stepId}`);
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (currentTotal > 100) {
  //     alert("Your allocation exceeds 100%. Please reduce it.");
  //     return;
  //   }

  //   if (currentTotal < 100) {
  //     const confirmContinue = window.confirm(
  //       `You've only allocated ${currentTotal}%. Continue anyway?`
  //     );

  //     if (!confirmContinue) return;
  //   }

  //   // Save budget allocations
  //   const allocations = {};
  //   sliders.forEach((s) => {
  //     allocations[s.id] = s.value;
  //   });

  //   setBudget({ allocations });
  //   completeStep(currentStep);
  //   setStep(currentStep + 1);
  //   router.push("/weather");
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentTotal > 100) {
      setShowBudgetModal(true);
      return;
    }

    if (currentTotal < 100 && !pendingSubmit) {
      setShowBudgetModal(true);
      return;
    }

    proceedSubmit();
  };

  const proceedSubmit = () => {
    const allocations = {};
    sliders.forEach((s) => {
      allocations[s.id] = s.value;
    });

    setBudget({ allocations });
    completeStep(currentStep);
    setStep("weather"); // or nextStepName
    setActiveStep("weather");
    const nextRoute = getNextRoute(eventDetails, pathname);
  router.push(nextRoute);
    //router.push("/weather");
  };

  const totalBudget = 100;
  const [showSuggestion, setShowSuggestion] = useState(false);

  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState(false);

  // Pre-fill from store
  const [sliders, setSliders] = useState([
    { id: "food", label: "Food & Beverage", value: budget.allocations?.food || 30, color: "#FF6B6B" },
    { id: "decor", label: "Decor & Design", value: budget.allocations?.decor || 25, color: "#4ECDC4" },
    { id: "tech", label: "Tech & AV", value: budget.allocations?.tech || 20, color: "#AA96DA" },
    { id: "performance", label: "Entertainment", value: budget.allocations?.performance || 15, color: "#F38181" },
    { id: "extras", label: "Miscellaneous", value: budget.allocations?.extras || 10, color: "#95E1D3" },
  ]);

  const currentTotal = sliders.reduce((sum, s) => sum + s.value, 0);
  const isOverBudget = currentTotal > totalBudget;

  const handleSliderChange = (id, newValue) => {
    setSliders((prev) =>
      prev.map((s) => (s.id === id ? { ...s, value: newValue } : s))
    );
    // Save to store in real-time
    setBudgetAllocation(id, newValue);

    if (!showSuggestion && Math.random() > 0.7) {
      setTimeout(() => setShowSuggestion(true), 500);
    }
  };

  const applySuggestion = () => {
    setSliders((prev) =>
      prev.map((s) => {
        if (s.id === "decor") return { ...s, value: s.value - 5 };
        return s;
      })
    );
    setShowSuggestion(false);
  };

  return (
    <div className="min-h-screen dark:bg-black">
       {/* Progress Map */}
      {/* <ProgressMap currentStep={currentStep} onStepClick={handleStepClick} /> */}
    <div
      className="pt-20 pb-20 px-8 min-h-screen"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
          Balance
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
          Distribute your budget wisely
        </p>

        {/* Budget Total */}
        <div
          className="mb-12 rounded-3xl"
          style={{
            //backgroundColor: "var(--glass-fill)",
            backdropFilter: "blur(var(--blur))",
            border: "1px solid var(--glass-border)",
          }}
        >
          <div className="flex justify-between font-dm items-center mb-4">
            <span className="text-sm opacity-70">Total Allocation</span>
            <span
              className="text-2xl font-semibold"
              style={{
                color: isOverBudget ? "#d4183d" : "#62754c",
              }}
            >
              {currentTotal}%
            </span>
          </div>

          <div className="h-3 rounded-full overflow-hidden bg-black/5">
            <motion.div
              className="h-full rounded-full"
              animate={{
                width: `${Math.min(currentTotal, 100)}%`,
                backgroundColor: isOverBudget
                  ? "#d4183d"
                  : "#62754c",
              }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {currentTotal < 100 && (
            <p className="mt-3 text-center text-sm text-yellow-600">
              You still have {100 - currentTotal}% unallocated
            </p>
          )}

          {isOverBudget && (
            <p className="mt-3 text-center text-sm text-red-600">
              Budget exceeded! Please reduce allocations.
            </p>
          )}
        </div>

        {/* Sliders */}
        <div className="space-y-8 mb-12">
          {sliders.map((slider, idx) => (
            <motion.div
              key={slider.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex justify-between mb-3">
                <span>{slider.label}</span>
                <span style={{ color: slider.color }}>
                  {slider.value}%
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="50"
                value={slider.value}
                onChange={(e) =>
                  handleSliderChange(slider.id, parseInt(e.target.value))
                }
                className="w-full h-3 rounded-full appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right,
                    ${slider.color} 0%,
                    ${slider.color} ${(slider.value / 50) * 100}%,
                    rgba(0,0,0,0.05) ${(slider.value / 50) * 100}%,
                    rgba(0,0,0,0.05) 100%)`,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Suggestion */}
        {showSuggestion && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-8 right-8 p-5 rounded-3xl max-w-sm shadow-xl"
            style={{
              backgroundColor: "var(--glass-fill)",
              backdropFilter: "blur(var(--blur))",
              border: "1px solid var(--glass-border)",
            }}
          >
            <div className="flex gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-primary)]">
                <Sparkles size={18} className="text-white" />
              </div>

              <div>
                <p className="text-sm mb-2">
                  Found cheaper decor vendor (20% less). Adjust?
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={applySuggestion}
                    className="px-3 py-1 rounded-full bg-[var(--color-primary)] text-white text-sm"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => setShowSuggestion(false)}
                    className="px-3 py-1 rounded-full border text-sm"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Continue */}
        <motion.button
          onClick={handleSubmit}
          disabled={isOverBudget}
          className="w-full py-5 rounded-full flex justify-center items-center gap-2 disabled:opacity-40"
          style={{
            backgroundColor: "var(--color-dark)",
            color: "var(--color-bg)",
          }}
        >
          Continue <ArrowRight size={18} />
        </motion.button>
      </motion.div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #62754c;
          border: 3px solid white;
        }
      `}</style>
    </div>
    {showBudgetModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    
    {/* overlay */}
    <div 
      className="absolute inset-0 bg-gray/40 backdrop-blur-sm"
      onClick={() => setShowBudgetModal(false)}
    />

    {/* modal */}
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative p-6 rounded-3xl max-w-md w-full"
      style={{
        backgroundColor: "var(--glass-fill)",
        border: "1px solid #62754c",
      }}
    >
      <h2 className="text-lg font-semibold mb-2">
        Budget Not Fully Balanced
      </h2>

      <p className="text-sm opacity-70 mb-4">
        {currentTotal > 100
          ? "Your budget exceeds 100%. Please adjust allocations."
          : `You've only allocated ${currentTotal}%. Continue anyway?`}
      </p>

      <div className="flex gap-3 justify-end">
        
        <button
          onClick={() => setShowBudgetModal(false)}
          className="px-4 py-2 rounded-full border"
        >
          Go Back
        </button>

        {currentTotal <= 100 && (
          <button
            onClick={() => {
              setShowBudgetModal(false);
              proceedSubmit();
            }}
            className="px-4 py-2 rounded-full"
            style={{
              backgroundColor: "var(--color-dark)",
              color: "var(--color-bg)",
            }}
          >
            Continue Anyway
          </button>
        )}

      </div>
    </motion.div>
  </div>
)}
    </div>
  );
}