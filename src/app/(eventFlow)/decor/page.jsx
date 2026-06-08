"use client";

// import { DecorScreen } from "@/components/decor/DecorScreen";
import ProgressMap from "@/components/ProgressMap";
import { useState, useEffect } from "react";
import { useEventStore } from "@/store/useEventStore";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

import { getNextRoute } from "@/lib/eventFlow";
import { useRouter, usePathname } from "next/navigation";


const DecorScreen = dynamic(
  () => import("@/components/decor/DecorScreen").then((mod) => mod.DecorScreen),
  { ssr: false }
);

export default function Page() {
    const router = useRouter(); 
    const pathname = usePathname();
    const [currentStep] = useState(7);
      const completeStep = useEventStore((state) => state.completeStep);
      const setStep = useEventStore((state) => state.setStep);
      const setActiveStep = useEventStore((state) => state.setActiveStep);

      const eventDetails = useEventStore((s) => s.eventDetails);
const [allowed, setAllowed] = useState(false);

      const handleSubmit = (e) => {
    e.preventDefault();
    completeStep(currentStep);
    //setStep(currentStep + 1);
    setStep("poster"); // or nextStepName
setActiveStep("poster");
    const nextRoute = getNextRoute(eventDetails, pathname);
  router.push(nextRoute);
    //router.push("/poster");
  };

  //const eventDetails = useEventStore((s) => s.eventDetails);

//   useEffect(() => {
//   if (!eventDetails) return;

//   if (eventDetails.venueType === "Open Air") {
//     setAllowed(true);
//   } else {
//     router.replace("/poster");
//   }
// }, [eventDetails]);

// if (!allowed) return null;

  return(
    <div className="min-h-screen dark:bg-black">
          {/* <ProgressMap currentStep={currentStep} /> */}
          <div
      className="pt-20 px-8 min-h-screen"
      style={{ backgroundColor: "var(--color-bg)" }}
    >

        <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl mx-auto"
      >
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
            color: "var(--color-dark)",
            marginBottom: "1rem",
            fontStyle: "italic",
            textAlign: "center"
          }}
        >
          Envisage
        </h1>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1.125rem",
            color: "var(--color-dark)",
            opacity: 0.7,
            textAlign: "center",
            marginBottom: "3rem"
          }}
        >
          Visualize your final day setup
        </p>
          <DecorScreen />
          </motion.div>
          {/* <motion.button
          onClick={handleSubmit}
          className="w-full py-5 rounded-full flex justify-center gap-2 disabled:opacity-40"
          style={{
            backgroundColor: "var(--color-dark)",
            color: "var(--color-bg)",
          }}
        >
          Continue <ArrowRight size={18} />
        </motion.button> */}
</div>
          </div>
    
  ) 
}