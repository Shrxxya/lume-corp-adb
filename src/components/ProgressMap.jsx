// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import { useEventStore } from "@/store/useEventStore";

// import {
//   FileText, Palette, Users, Clock, Cloud, DollarSign,
//   Store, UtensilsCrossed, Calendar, Mail, Star, Sofa, CheckCircle2
// } from "lucide-react";

// const steps = [
//   { id: 1, name: "Form", icon: FileText, codename: "Blueprint" },
//   { id: 2, name: "Budget", icon: DollarSign, codename: "Balance" },
//   { id: 3, name: "Weather", icon: Cloud, codename: "Atmosphere" },
//   { id: 4, name: "Vendors", icon: Store, codename: "Curated" },
//   { id: 5, name: "Menu", icon: UtensilsCrossed, codename: "Taste" },
//   { id: 6, name: "Timeline", icon: Calendar, codename: "Rhythm" },
//   { id: 7, name: "Invites", icon: Mail, codename: "Echo" },
//   { id: 8, name: "Extras", icon: Star, codename: "The Act" },
//   { id: 9, name: "Decor", icon: Sofa, codename: "The Stage" },
//   { id: 10, name: "Poster", icon: Palette, codename: "Spark" },
//   { id: 11, name: "Summary", icon: CheckCircle2, codename: "North Star" }
// ];

// export default function ProgressMap({ currentStep, completedSteps = [], onStepClick }) {
//   return (
//     <div className="fixed top-0 left-1/2 w-[95%] -translate-x-1/2 z-50 scroll-smooth hide-scrollbar">
//       <div className="glassmorphic-container mx-auto px-4 py-3 flex items-center overflow-x-auto space-x-6 scroll-smooth hide-scrollbar">
//         {steps.map((step, index) => {
//           const isActive = step.id === currentStep;
//           const isCompleted = step.id < currentStep;
//           const isFuture = step.id > currentStep;
//           console.log("completed steps: ", completedSteps);

//           return (
//             <div key={step.id} className="relative flex items-center">
//               {/* Line connecting nodes */}
//               {index > 0 && (
//                 <div
//                   className={`h-1 w-12 ${
//                     isCompleted || isActive
//                       ? "bg-[#62754C]"
//                       : ""
//                   }`}
//                 />
//               )}

//               {/* Node */}
//               <motion.div
//                 className={`relative flex items-center justify-center w-12 h-12 rounded-full cursor-pointer transition-all ${
//                   isActive
//                     ? "bg-[#62754C] shadow-[0_0_10px_#62754C]"
//                     : isCompleted
//                     ? "bg-[#62754C]"
//                     : ""
//                 }`}
//                 whileHover={{
//                   scale: 1.1,
//                   boxShadow: isActive || isCompleted ? "0 0 15px #62754C" : "none",
//                 }}
//                 onClick={() => onStepClick(step.id)}
//               >
//                 {/* <Image
//                   src={
//                     isActive || isCompleted
//                       ? step.icon
//                       : step.iconGray
//                   }
//                   alt={step.name}
//                   width={24}
//                   height={24}
//                   className="object-contain"
//                 /> */}
//                 {/* <step.icon
//                     size={20}
//                     style={{
//                       color: completedSteps.includes(step.id) || currentStep === step.id
//                         ? 'var(--color-bg)'
//                         : 'var(--color-dark)',
//                       opacity: completedSteps.includes(step.id) || currentStep === step.id ? 1 : 0.4
//                     }}
//                   /> */}
//                   <step.icon
//   size={20}
//   style={{
//     color: completedSteps.includes(step.id)
//       ? "#ffffff"
//       : currentStep === step.id
//       ? "var(--color-bg)"
//       : "var(--color-dark)",
//     opacity: completedSteps.includes(step.id) || currentStep === step.id ? 1 : 0.4,
//   }}
// />
//               </motion.div>
//             </div>
//           );
//         })}
//       </div>

//       <style jsx>{`
//         .glassmorphic-container {
//           backdrop-filter: blur(10px);
//           background: rgba(255, 255, 255, 0.2);
//           border-radius: 50px;
//         }
//       `}</style>
//     </div>
//   );
// }

"use client";

import { motion } from "framer-motion";
import { useEventStore } from "@/store/useEventStore";
import { useEffect, useRef } from "react";

import {
  FileText, Palette, Cloud, DollarSign,
  Store, UtensilsCrossed, Calendar, Mail, Star, Sofa, CheckCircle2
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

  const stepRoutes = {
    form: "/blueprintform",
    budget: "/budget",
    weather: "/weather",
    vendors: "/vendors",
    menu: "/menu",
    timeline: "/timeline",
    extras: "/extras",
    decor: "/decor",
    poster: "/poster",
    invites: "/email_invites",
    summary: "/summary",
  };


// Reverse mapping: route -> step name
const routeToStep = Object.fromEntries(
  Object.entries(stepRoutes).map(([k, v]) => [v, k])
);

export default function ProgressMap() {
  const stepRefs = useRef({});
  const containerRef = useRef(null);
  //const currentStep = useEventStore((state) => state.currentStep);
  const completedSteps = useEventStore((state) => state.completedSteps);
  const activeStep = useEventStore((s) => s.activeStep);
  const setStep = useEventStore((state) => state.setStep);
  const setActiveStep = useEventStore((state) => state.setActiveStep);
  const router = useRouter();
  const pathname = usePathname();
  const eventDetails = useEventStore((s) => s.eventDetails);

  const eventDate = new Date(eventDetails?.date);
  const today = new Date();
  const daysUntilEvent = Math.ceil(
    (eventDate - today) / (1000 * 60 * 60 * 24)
  );

  const isWithinForecast = daysUntilEvent >= 0 && daysUntilEvent <= 16;
  const formValid = useEventStore((s) => s.formValid);

  // Sync activeStep with current route on mount
  useEffect(() => {
    const currentStepName = routeToStep[pathname];
    if (currentStepName && currentStepName !== activeStep) {
      setActiveStep(currentStepName);
    }
  }, [pathname]);

  const steps = [
    { id: 1, name: "form", icon: FileText },
    { id: 2, name: "budget", icon: DollarSign },
    ...(isWithinForecast
    ? [{ id: 3, name: "weather", icon: Cloud }]
    : []),
    // { id: 3, name: "weather", icon: Cloud },
    { id: 4, name: "vendors", icon: Store },
    { id: 5, name: "menu", icon: UtensilsCrossed },
    { id: 6, name: "timeline", icon: Calendar },
    { id: 7, name: "extras", icon: Star },
    ...(eventDetails?.venueType === "Open Air"
    ? [{ id: 8, name: "decor", icon: Sofa }]
    : []),
    { id: 9, name: "poster", icon: Palette },
    { id: 10, name: "invites", icon: Mail },
    { id: 11, name: "summary", icon: CheckCircle2 }
  ];
  useEffect(() => {
    const el = stepRefs.current[activeStep];
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeStep]);

  return (
    <div className="fixed top-0 left-1/2 w-[95%] -translate-x-1/2 z-50">
      <div
      ref={containerRef}
      className="glassmorphic-container mx-auto px-4 py-3 flex items-center overflow-x-auto space-x-6 hide-scrollbar">

        {steps.map((step, index) => {
          // const isActive = step.id === currentStep;
          // const isActive = step.name === eventDetails?.activeStep;
          // const isCompleted = completedSteps.includes(step.id);
          
          const isActive = step.name === activeStep;
          const isCompleted = completedSteps.includes(step.name);
          const isClickable =
            // always allow backward navigation
            step.id <= steps.find(s => s.name === activeStep)?.id ||
            // allow forward ONLY if current step is valid
            (activeStep === "form" ? formValid : completedSteps.includes(step.name));
          //const prevCompleted = completedSteps.includes(steps[index - 1]?.name);
          const prevStep = steps[index - 1];
          const prevIsGreen =
            prevStep &&
            (completedSteps.includes(prevStep.name) || prevStep.name === activeStep);

          const currentIsGreen =
            completedSteps.includes(step.name) || step.name === activeStep;

          const showConnector = prevIsGreen && currentIsGreen;

          return (
            <div key={step.id} className="relative flex gap-5 items-center">

              {/* Connector Line */}
              {/* {index > 0 && (
                <div
                  className={`h-1 w-12 ${
                    completedSteps.includes(step.id - 1)
                      ? "bg-[#62754C]"
                      : "bg-transparent"
                  }`}
                />
              )} */}
              {index > 0 && (
                <div className={`h-1 w-12 ${showConnector ? "bg-[#62754C]" : "bg-transparent"}`} />
                )}

              {/* Node */}
              <motion.div
                  ref={(el) => (stepRefs.current[step.name] = el)}
                  onClick={() => {
                    if (isClickable) {
                      // setStep(step.id);
                      setActiveStep(step.name);
                      router.push(stepRoutes[step.name]);
                    }
                  }}
                  className={`w-12 h-12 flex items-center justify-center rounded-full cursor-pointer transition-all ${
                    isActive
                      ? "bg-[#62754C]"
                      : isCompleted
                      ? "bg-[#62754C]"
                      : "bg-white/10"
                  } ${!isClickable ? "opacity-40 cursor-not-allowed" : ""}`}
                  
                  animate={
                    isActive
                      ? {
                          boxShadow: [
                            "0 0 6px #62754C",
                            "0 0 18px #62754C",
                            "0 0 6px #62754C",
                          ],
                        }
                      : { boxShadow: "none" }
                  }
                  transition={
                    isActive
                      ? {
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                      : {}
                  }

                  whileHover={{ scale: 1.1 }}
                >
                <step.icon
                  size={20}
                  style={{
                    color: isCompleted
                      ? "#ffffff"
                      : isActive
                      ? "#ffffff"
                      : "var(--color-dark)",
                    opacity: isCompleted || isActive ? 1 : 0.4,
                  }}
                />
              </motion.div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .glassmorphic-container {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50px;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}