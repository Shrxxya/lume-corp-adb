// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import { useState, useEffect } from "react";
// import { ArrowRight, Sparkles, X, Download } from "lucide-react";
// import { useEventStore } from "@/store/useEventStore";
// import ProgressMap from "@/components/ProgressMap";

// import { getNextRoute } from "@/lib/eventFlow";
// import { useRouter, usePathname } from "next/navigation";

// export default function PosterGenerator({ onNext }) {
//   const router = useRouter();
//   const pathname = usePathname();
// const eventDetails = useEventStore((s) => s.eventDetails);
//   // Get store functions
//   const poster = useEventStore((state) => state.poster);
//   const setPosterStatus = useEventStore((state) => state.setPosterStatus);
//   const setPosterData = useEventStore((state) => state.setPosterData);
//   const currentStep = useEventStore((state) => state.currentStep);
//   const completeStep = useEventStore((state) => state.completeStep);
//   const setStep = useEventStore((state) => state.setStep);
//   const setActiveStep = useEventStore((state) => state.setActiveStep);

//   // Pre-fill from store
//   const [status, setStatus] = useState(poster.status || "idle");
//   const [posterData, setLocalPosterData] = useState(poster.generatedData);

//   const handleGenerate = () => {
//     setStatus("generating");
//     setPosterStatus("generating");
//     setTimeout(() => {
//       setStatus("complete");
//       setLocalPosterData("generated");
//       setPosterData("generated");
//     }, 2500);
//   };

//   const handleSkip = () => {
//     onNext(false);
//   };

//   const handleContinue = () => {
//     onNext(true);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     completeStep(currentStep);
//     //setStep(currentStep + 1);
//     setStep("invites"); // or nextStepName
// setActiveStep("invites");
//     const nextRoute = getNextRoute(eventDetails, pathname);
//   router.push(nextRoute);
//     //router.push("/email_invites");
//   };

//   const blobToBase64 = (blob) =>
//   new Promise((resolve) => {
//     const reader = new FileReader();
//     reader.onloadend = () => resolve(reader.result);
//     reader.readAsDataURL(blob);
//   });

//   const buildPrompt = (data, custom) => `
//     minimal luxury corporate event poster, ultra realistic, cinematic lighting, 4k

//     ONLY 1 poster, ONLY include the following text, no extra words:

//     EVENT NAME:
//     ${data.eventName}

//     VENUE:
//     ${data.location}

//     TIME:
//     ${data.time || data.date || "TBD"}

//     rules:
//     - do NOT add any other text
//     - no extra headings
//     - no paragraphs
//     - no lorem ipsum
//     - no branding text

//     design:
//     - premium, minimal, elegant layout
//     - strong typography hierarchy
//     - centered or well-balanced composition

//     theme:
//     - color palette based on ${data.theme || data.decor}
//     - lighting and mood matching the theme

//     graphics:
//     - subtle visual elements based on ${data.eventType}
//       (e.g. corporate stage, gala lighting, abstract luxury patterns)

//     style:
//     - clean background
//     - high contrast text readability
//     - realistic lighting, soft shadows

//     ${custom || ""}

//     negative prompt:
//     extra text, clutter, watermark, blurry, distorted typography, bad layout
//     `;


//     // const summaryData = useEventStore((s) => s.getSummaryData());
//     const getSummaryData = useEventStore((s) => s.getSummaryData);
// const summaryData = getSummaryData();
//   // const setPosterStatus = useEventStore((s) => s.setPosterStatus);
//   // const setPosterData = useEventStore((s) => s.setPosterData);

//   const [customPrompt, setCustomPrompt] = useState("");
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const generatePoster = async () => {
//     setLoading(true);
//     setPosterStatus("generating");

//     try {
//       const prompt = buildPrompt(summaryData, customPrompt);

//       const res = await fetch("/api/generate-poster", {
//         method: "POST",
//         body: JSON.stringify({ prompt }),
//       });

//       const blob = await res.blob();

//       const base64 = await blobToBase64(blob);

//       setImage(base64);
//       setPosterData(base64); // save in store
//     } catch (err) {
//       console.error("Poster generation failed", err);
//     }

//     setLoading(false);
//   };
//   return (
//     <div className="min-h-screen dark:bg-black">
//           {/* <ProgressMap currentStep={currentStep} /> */}
//     <div
//       className="pt-32 pb-20 px-8 min-h-screen"
//       style={{ backgroundColor: "var(--color-bg)" }}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//         className="max-w-6xl mx-auto"
//       >
//         <h1
//           style={{
//             fontFamily: "var(--font-serif)",
//             fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
//             color: "var(--color-dark)",
//             marginBottom: "1rem",
//             fontStyle: "italic",
//             textAlign: "center"
//           }}
//         >
//           Spark
//         </h1>

//         <p
//           style={{
//             fontFamily: "var(--font-body)",
//             fontSize: "1.125rem",
//             color: "var(--color-dark)",
//             opacity: 0.7,
//             textAlign: "center",
//             marginBottom: "3rem"
//           }}
//         >
//           Generate your event poster with AI
//         </p>

//         {/* Bento Grid */}
//         <div className="relative mb-12">
//           <div
//             className="grid grid-cols-4 grid-rows-3 gap-4 aspect-video"
//             style={{
//               backgroundColor: "var(--glass-fill)",
//               backdropFilter: "blur(var(--blur))",
//               border: "1px solid var(--glass-border)",
//               borderRadius: "2rem",
//               padding: "2rem"
//             }}
//           >
//             {Array.from({ length: 12 }).map((_, i) => (
//               <motion.div
//                 key={i}
//                 className="rounded-2xl relative overflow-hidden"
//                 style={{
//                   backgroundColor:
//                     status === "idle"
//                       ? "rgba(0,0,0,0.02)"
//                       : "transparent"
//                 }}
//               >
//                 <AnimatePresence>
//                   {status === "generating" && (
//                     <motion.div
//                       initial={{ scale: 0, opacity: 0 }}
//                       animate={{
//                         scale: [0, 1.5, 1],
//                         opacity: [0, 1, 0.8]
//                       }}
//                       transition={{
//                         delay: i * 0.1,
//                         duration: 0.8
//                       }}
//                       className="absolute inset-0"
//                       style={{
//                         background: `radial-gradient(circle,
//                           rgba(98,117,76,${0.3 + Math.random() * 0.3}),
//                           rgba(20,24,42,${0.2 + Math.random() * 0.2}))`,
//                         filter: "blur(8px)"
//                       }}
//                     >
//                       {Array.from({ length: 5 }).map((_, j) => (
//                         <motion.div
//                           key={j}
//                           className="absolute rounded-full"
//                           initial={{ x: "50%", y: "50%", scale: 0 }}
//                           animate={{
//                             x: `${Math.random() * 100}%`,
//                             y: `${Math.random() * 100}%`,
//                             scale: Math.random() * 2 + 0.5
//                           }}
//                           transition={{
//                             delay: j * 0.15,
//                             duration: 0.6
//                           }}
//                           style={{
//                             width: `${Math.random() * 30 + 10}px`,
//                             height: `${Math.random() * 30 + 10}px`,
//                             backgroundColor: "rgba(253,253,248,0.4)",
//                             boxShadow: "0 0 20px rgba(98,117,76,0.5)"
//                           }}
//                         />
//                       ))}
//                     </motion.div>
//                   )}

//                   {status === "complete" && (
//                     <motion.div
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ duration: 0.4 }}
//                       className="absolute inset-0 flex items-center justify-center"
//                       style={{
//                         background: `linear-gradient(135deg,
//                           rgba(98,117,76,${0.4 + (i % 3) * 0.1}),
//                           rgba(20,24,42,${0.3 + (i % 2) * 0.1}))`,
//                         color: "var(--color-bg)",
//                         fontSize: "0.75rem",
//                         fontWeight: 600
//                       }}
//                     >
//                       {i === 5 && <Sparkles size={32} />}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.div>
//             ))}
//           </div>

//           {/* Skip */}
//           {status === "idle" && (
//             <motion.button
//               onClick={handleSkip}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center"
//               style={{
//                 backgroundColor: "var(--color-dark)",
//                 color: "var(--color-bg)"
//               }}
//             >
//               <X size={20} />
//             </motion.button>
//           )}
//         </div>

//         {/* Buttons */}
//         {status === "idle" && (
//           <motion.button
//             onClick={handleGenerate}
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             className="w-full px-8 py-5 rounded-full flex items-center justify-center gap-3"
//             style={{
//               backgroundColor: "#62754c",
//               color: "white"
//             }}
//           >
//             <Sparkles size={20} />
//             Generate Poster
//           </motion.button>
//         )}

//         {status === "generating" && (
//           <div className="text-center">
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//               className="inline-block"
//             >
//               <Sparkles size={32} style={{ color: "#62754c" }} />
//             </motion.div>

//             <p className="mt-4 text-gray-500">
//               Creating your poster...
//             </p>
//           </div>
//         )}

//         <div className="p-6 max-w-3xl mx-auto">
//       {/* TEXTBOX */}
//       <textarea
//         value={customPrompt}
//         onChange={(e) => setCustomPrompt(e.target.value)}
//         placeholder="Refine poster (e.g., 'more gold accents, darker background')"
//         className="w-full p-4 rounded-xl border mb-4"
//       />

//       {/* BUTTON */}
//       <button
//         onClick={generatePoster}
//         className="px-6 py-3 bg-[#62754c] text-white rounded-xl"
//       >
//         Regenerate Poster
//       </button>

//       {/* LOADER */}
//       {loading && <p className="mt-4">Generating poster...</p>}

//       {/* IMAGE */}
//       {image && (
//         <div className="relative mt-6">
//           <img src={image} className="rounded-2xl w-full" />

//           {/* DOWNLOAD */}
//           <a
//             href={image}
//             download="event-poster.png"
//             className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
//           >
//             <Download size={20} />
//           </a>

//           {/* OPTIONAL TEXT OVERLAY */}
//           <div className="absolute bottom-6 left-6 text-white">
//             <h2 className="text-xl font-bold">
//               {summaryData.eventName}
//             </h2>
//             <p>{summaryData.date}</p>
//           </div>
//         </div>
//       )}
//     </div>

//         {status === "complete" && (
//         <motion.button
//           onClick={handleSubmit}
//           className="w-full px-8 py-5 rounded-full flex justify-center gap-3"
//           style={{
//             backgroundColor: "var(--color-dark)",
//             color: "var(--color-bg)",
//           }}
//         >
//           Continue <ArrowRight size={20} />
//         </motion.button>
//         )}
//       </motion.div>
//     </div>
//     </div>
//   );
// }



"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Sparkles, X, Download } from "lucide-react";
import { useEventStore } from "@/store/useEventStore";

import { getNextRoute } from "@/lib/eventFlow";
import { useRouter, usePathname } from "next/navigation";

export default function PosterGenerator() {
  const router = useRouter();
  const pathname = usePathname();

  const eventDetails = useEventStore((s) => s.eventDetails);

  // store
  const poster = useEventStore((s) => s.poster);
  const setPosterStatus = useEventStore((s) => s.setPosterStatus);
  const setPosterData = useEventStore((s) => s.setPosterData);
  const completeStep = useEventStore((s) => s.completeStep);
  const setStep = useEventStore((s) => s.setStep);
  const setActiveStep = useEventStore((s) => s.setActiveStep);
  const currentStep = useEventStore((s) => s.currentStep);
  const getSummaryData = useEventStore((s) => s.getSummaryData);

  const summaryData = getSummaryData();

  // local state
  const [status, setStatus] = useState(poster.status || "idle");
  const [image, setImage] = useState(poster.generatedData || null);
  const [customPrompt, setCustomPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  // utils
  const blobToBase64 = (blob) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });

  const buildPrompt = (data, custom) => `
    minimal luxury corporate event poster, ultra realistic, cinematic lighting, 4k

    ONLY include:

    EVENT NAME:
    ${data.eventName}

    VENUE:
    ${data.location}

    TIME:
    ${data.time || data.date || "TBD"}

    rules:
    no extra text, no paragraphs, no branding

    theme:
    ${data.theme || data.decor}

    graphics:
    subtle visuals based on ${data.eventType}

    ${custom || ""}

    negative prompt:
    extra text, watermark, blurry, bad typography
  `;

  const generatePoster = async () => {
    setStatus("generating");
    setPosterStatus("generating");
    setLoading(true);

    try {
      const prompt = buildPrompt(summaryData, customPrompt);

      const res = await fetch("/api/generate-poster", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });

      const blob = await res.blob();
      const base64 = await blobToBase64(blob);

      setImage(base64);
      setPosterData(base64);

      setStatus("complete");
      setPosterStatus("complete");
    } catch (err) {
      console.error("Poster generation failed", err);
    }

    setLoading(false);
  };

  const handleSkip = () => {
    setPosterStatus("skipped");
    setPosterData(null);
    handleSubmit();
  };

  const handleSubmit = () => {
    completeStep(currentStep);
    setStep("invites");
    setActiveStep("invites");

    const nextRoute = getNextRoute(eventDetails, pathname);
    router.push(nextRoute);
  };

  return (
    <div className="min-h-screen dark:bg-black">
      <div
        className="pt-32 pb-20 px-8 min-h-screen"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* HEADER */}
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
            Spark
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
            Generate your event poster with AI
          </p>

          {/* ---------------- IDLE ---------------- */}
          {status === "idle" && (
            <div className="relative mb-12">
              <img
                src="/poster-placeholder.png"
                className="rounded-3xl w-full"
              />

              {/* Generate button (on arrow area) */}
              <motion.button
                onClick={generatePoster}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-20 top-1/2 -translate-y-1/2 px-6 py-3 rounded-full bg-[#62754c] text-white shadow-lg"
              >
                Generate
              </motion.button>
            </div>
          )}

          {/* ---------------- GENERATING ---------------- */}
          {status === "generating" && (
            <div className="text-center py-24">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Sparkles size={42} />
              </motion.div>

              <p className="mt-4 text-gray-500">
                Generating your poster...
              </p>
            </div>
          )}

          {/* ---------------- COMPLETE ---------------- */}
          {status === "complete" && image && (
            <div className="relative max-w-3xl mx-auto">
              {/* Skip */}
              <button
                onClick={handleSkip}
                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow flex items-center gap-1"
              >
                <X size={18} /> Skip
              </button>

              {/* Download */}
              <a
                href={image}
                download="event-poster.png"
                className="absolute top-3 left-3 bg-white p-2 rounded-full shadow"
              >
                <Download size={18} />
              </a>

              {/* Poster */}
              <img src={image} className="rounded-2xl w-full" />

              {/* Controls */}
              <div className="mt-6 flex items-center gap-4">
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Refine poster..."
                  className="w-full p-4 rounded-xl border mb-4"
                />

                <button
                  onClick={generatePoster}
                  className="px-6 py-3 bg-[#62754c] text-white rounded-xl"
                >
                  Regenerate
                </button>
              </div>
            </div>
          )}

          {/* ---------------- FOOTER BUTTONS ---------------- */}

          {/* Skip (idle) */}
          {status === "idle" && (
            <motion.button
              onClick={handleSkip}
              className="w-full px-8 py-5 rounded-full flex justify-center gap-3"
              style={{
                backgroundColor: "var(--color-dark)",
                color: "var(--color-bg)",
              }}
            >
              Skip <ArrowRight size={20} />
            </motion.button>
          )}

          {/* Continue */}
          {status === "complete" && (
            <motion.button
              onClick={handleSubmit}
              className="w-full mt-10 px-8 py-5 rounded-full flex justify-center gap-3"
              style={{
                backgroundColor: "var(--color-dark)",
                color: "var(--color-bg)",
              }}
            >
              Continue <ArrowRight size={20} />
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
}