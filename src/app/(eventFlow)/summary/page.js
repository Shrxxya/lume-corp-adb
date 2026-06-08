// "use client";

// import { motion, useScroll } from "framer-motion";
// import { useRef, useState, useMemo, useEffect } from "react";
// import {
//   Calendar, MapPin, Users, IndianRupee, QrCode, CheckCircle2,
//   Download, Share2, Utensils, Clapperboard, Palette, Mail, PartyPopper
// } from "lucide-react";
// import ProgressMap from "@/components/ProgressMap";
// import { useRouter } from "next/navigation";
// import { useEventStore } from "@/store/useEventStore";
// import { calculateQuotation } from "@/lib/pricing";
// import QRCode from "qrcode";
// import Confetti from "react-confetti";

// export default function FinalSummary({ appData, onReset }) {
//   const router = useRouter();
//   const QRRef = useRef(null);
//   const [currentStep, setCurrentStep] = useState(12);
//   const completeStep = useEventStore((state) => state.completeStep);
//   const setStep = useEventStore((state) => state.setStep);

//   const handleStepClick = (stepId) => {
//     if (stepId <= currentStep) {
//       console.log(`Navigating to step ${stepId}`);
//     }
//   };

//   const loadCashfree = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");

//       script.src =
//         "https://sdk.cashfree.com/js/v3/cashfree.js";

//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);

//       document.body.appendChild(script);
//     });
//   };

//   const generateBookingId = () => {
//     return `BK-${Math.floor(
//       100000 + Math.random() * 900000
//     )}`;
//   };

//   const handlePayment = async () => {
//     try {
//       const loaded = await loadCashfree();

//       if (!loaded) {
//         alert("Cashfree SDK failed to load");
//         return;
//       }

//       // Example:
//       // 15% advance payment
//       const advanceAmount =
//         Math.round(quotation.total * 0.15 * 100000);

//       const res = await fetch("/api/cashfree/create-order", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           amount: advanceAmount,
//         }),
//       });

//       const data = await res.json();

//       const cashfree = window.Cashfree({
//         mode: "sandbox",
//       });

//       cashfree.checkout({
//         paymentSessionId: data.payment_session_id,
//         redirectTarget: "_modal",

//         onSuccess: () => {
//           setPaymentDetails({
//             bookingId: generateBookingId(),
//             amount: `₹${advanceAmount.toLocaleString("en-IN")}`,
//             date: new Date().toLocaleDateString("en-IN", {
//               day: "2-digit",
//               month: "short",
//               year: "numeric",
//             }),
//           });

//           setShowPaymentSuccess(true);
//         },

//         onFailure: (err) => {
//           console.error(err);
//           alert("Payment failed");
//         },
//       });

//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

//   const [paymentDetails, setPaymentDetails] = useState({
//     bookingId: "",
//     amount: "",
//     date: "",
//   });

//   const containerRef = useRef(null);
//   const { scrollYProgress } = useScroll({ container: containerRef });
//   const [showQR, setShowQR] = useState(false);

//   const hasHydrated = useEventStore((state) => state.hasHydrated);
//   const getSummaryData = useEventStore((state) => state.getSummaryData);

//   const scrollToQR = () => setShowQR(true);
//   const formatDate = (date) => {
//   if (!date) return "-";

//   return new Date(date).toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// };
//   const summaryData = useMemo(() => {
//   return hasHydrated ? getSummaryData()
//   : {
//       eventName: "",
//       date: "",
//       location: "",
//       guestCount: 0,
//       budget: 0,
//       budgetBreakdown: [],
//       vendors: [],
//       menu: [],
//       timeline: [],
//       entertainment: "",
//       decor: "",
//       poster: "",
//     };
//     }, [hasHydrated, getSummaryData]);

//   const summaryStats = [
//     {
//       icon: Calendar,
//       label: "Event Date",
//       value: formatDate(summaryData.date),
//       color: "var(--color-primary)"
//     },
//     {
//       icon: MapPin,
//       label: "Location",
//       value: summaryData.location,
//       color: "var(--color-green-mid)"
//     },
//     {
//       icon: Users,
//       label: "Guests Count",
//       value: `${summaryData.guestCount}`,
//       color: "var(--color-accent)"
//     },
//     {
//       icon: IndianRupee,
//       label: "Budget",
//       value: `₹${summaryData.budget}L`,
//       color: "var(--color-gold)"
//     }
//   ];

//   const screenSections = [
//     { id: 1, name: "Event Details", icon: Calendar, completed: true },
//     { id: 2, name: "Guests", icon: Users, completed: true },
//     { id: 3, name: "Timings", icon: Calendar, completed: true },
//     { id: 4, name: "Weather", icon: MapPin, completed: true },
//     { id: 5, name: "Budget", icon: IndianRupee, completed: true },
//     { id: 6, name: "Vendors", icon: Users, completed: true },
//     { id: 7, name: "Menu", icon: Utensils, completed: true },
//     { id: 8, name: "Timeline", icon: Calendar, completed: true },
//     { id: 9, name: "Entertainment", icon: Clapperboard, completed: true },
//     { id: 10, name: "Decor", icon: Palette, completed: true },
//     { id: 11, name: "Poster", icon: PartyPopper, completed: true },
//     { id: 12, name: "Invites", icon: Mail, completed: true }
//   ];

//   const budgetColors = {
//     food: "#62754C",
//     decor: "#8BA672",
//     tech: "#A8BC92",
//     Entertainment: "#C8D5B9",
//     extras: "#2A3050"
//   };

//   const hasEntertainment =
//     summaryData.entertainment.artist ||
//     summaryData.entertainment.host ||
//     summaryData.entertainment.lightShow;

//   const quotation = useMemo(() => {
//     return calculateQuotation(summaryData);
//   }, [summaryData]);

//   const [pdfUrl, setPdfUrl] = useState(null);
//   const [qrCode, setQrCode] = useState(null);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [isSending, setIsSending] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const generatedCanvasImage = useEventStore((s) => s.generatedCanvasImage || null);

//   const generatePdfIfNeeded = async () => {
//     if (isGenerating || isSending) return;
//     if (pdfUrl) return pdfUrl;

//     try {
//       setIsGenerating(true);

//       const res = await fetch("/api/generate-pdf", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ data: summaryData, quotation }),
//       });

//       const { url } = await res.json();

//       const fullUrl = url;

//       const qr = await QRCode.toDataURL(fullUrl);

//       setPdfUrl(fullUrl);
//       setQrCode(qr);

//       return fullUrl;
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleSubmitRequest = async () => {
//     if (isGenerating || isSending) return;
//     try {
//       setIsSending(true);

//       const url = await generatePdfIfNeeded();

//       await fetch("/api/send-email", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           pdfUrl: url,
//           summaryData,
//           quotation,
//         }),
//       });

//       setShowSuccess(true);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setIsSending(false);
//     }
//   };

//   useEffect(() => {
//     if (showQR && QRRef.current) {
//       QRRef.current.scrollIntoView({
//         behavior: "smooth",
//         block: "center",
//       });
//     }
//   }, [showQR]);

//   return (
//     <div className="min-h-screen" style={{ backgroundColor: "var(--color-bg)" }}>
//       {/* <ProgressMap currentStep={currentStep} onStepClick={handleStepClick} /> */}
//       {isGenerating && (
//   <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
//     <motion.div
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//       className="flex flex-col items-center text-center px-6"
//     >
//       {/* glowing orb */}
//       <motion.div
//         animate={{
//           scale: [1, 1.15, 1],
//           opacity: [0.6, 0.9, 0.6],
//         }}
//         transition={{
//           duration: 2.2,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//         className="w-20 h-20 rounded-full blur-xl"
//         style={{
//           background:
//             "radial-gradient(circle, var(--color-primary), transparent 70%)",
//         }}
//       />

//       {/* spinner */}
//       <motion.div
//         animate={{ rotate: 360 }}
//         transition={{
//           repeat: Infinity,
//           duration: 1.2,
//           ease: "linear",
//         }}
//         className="absolute w-16 h-16 border-2 border-[var(--color-primary)] border-t-transparent rounded-full"
//       />

//       {/* text */}
//       <div className="mt-10 space-y-2">
//         <h2
//           className="text-lg font-semibold"
//           style={{ color: "white" }}
//         >
//           Generating your proposal
//         </h2>

//         <p
//           className="text-sm opacity-70"
//           style={{ color: "white" }}
//         >
//           Preparing a polished proposal for your event...
//         </p>
//       </div>
//     </motion.div>
//   </div>
// )}

// {isSending && (
//   <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
//     <motion.div
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//       className="flex flex-col items-center text-center px-6"
//     >
//       {/* glowing orb */}
//       <motion.div
//         animate={{
//           scale: [1, 1.15, 1],
//           opacity: [0.6, 0.9, 0.6],
//         }}
//         transition={{
//           duration: 2.2,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//         className="w-20 h-20 rounded-full blur-xl"
//         style={{
//           background:
//             "radial-gradient(circle, var(--color-primary), transparent 70%)",
//         }}
//       />

//       {/* spinner */}
//       <motion.div
//         animate={{ rotate: 360 }}
//         transition={{
//           repeat: Infinity,
//           duration: 1.2,
//           ease: "linear",
//         }}
//         className="absolute w-16 h-16 border-2 border-[var(--color-primary)] border-t-transparent rounded-full"
//       />

//       {/* text */}
//       <div className="mt-10 space-y-2">
//         <h2
//           className="text-lg font-semibold"
//           style={{ color: "white" }}
//         >
//           Sending request
//         </h2>

//         <p
//           className="text-sm opacity-70"
//           style={{ color: "white" }}
//         >
//           Finalizing your request...
//         </p>
//       </div>
//     </motion.div>
//   </div>
// )}

//       {showSuccess && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
//           <div className="bg-white p-8 rounded-2xl text-center max-w-sm">
//             <h2 className="text-xl font-semibold mb-2">
//               Request Submitted!
//             </h2>
//             <p className="text-sm opacity-70 mb-4">
//               We will be contacting you within 24 hours.
//             </p>

//             <button
//               onClick={() => {
//                 setShowSuccess(false);
//                 router.push("/");
//               }}
//               className="px-4 py-2 rounded-lg bg-[#62754C] text-white"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
      
//       <div
//         ref={containerRef}
//         className="pt-32 pb-20 px-8 min-h-screen overflow-y-auto"
//         style={{ backgroundColor: "var(--color-bg)" }}
//       >
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//           className="max-w-6xl mx-auto"
//         >
//           {/* Header */}
//           <div className="text-center mb-16">
//             <motion.div
//               className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6"
//               style={{ backgroundColor: "var(--color-primary)" }}
//               animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
//               transition={{ duration: 2, repeat: Infinity }}
//             >
//               <CheckCircle2 size={48} style={{ color: "var(--color-bg)" }} />
//             </motion.div>

//             <h1
//               style={{
//                 fontFamily: "var(--font-display)",
//                 fontSize: "clamp(2.5rem, 5vw, 4rem)",
//                 color: "var(--color-dark)",
//                 marginBottom: "1rem",
//                 fontStyle: "italic",
//                 fontWeight: 700,
//                 lineHeight: 1.05
//               }}
//             >
//               {hasHydrated ? summaryData.eventName : ""}
//             </h1>

//             <p
//               style={{
//                 fontFamily: "var(--font-body)",
//                 fontSize: "1.25rem",
//                 color: "var(--color-dark-mid)",
//                 opacity: 0.7
//               }}
//             >
//               Your event vision is complete
//             </p>
//           </div>

//           {/* Summary Cards */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
//             {summaryStats.map((stat, idx) => (
//               <ScrollRevealCard key={stat.label} index={idx}>
//                 <div className="flex items-start gap-3">
//                   <div
//                     className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
//                     style={{ 
//                       backgroundColor: stat.color,
//                       boxShadow: "var(--shadow-1)"
//                     }}
//                   >
//                     <stat.icon size={24} style={{ color: "var(--color-bg)" }} />
//                   </div>

//                   <div className="min-w-0">
//                     <p 
//                       style={{ 
//                         fontFamily: "var(--font-body)",
//                         fontSize: "0.75rem",
//                         fontWeight: 600,
//                         color: "var(--color-accent)",
//                         letterSpacing: "0.08em",
//                         textTransform: "uppercase"
//                       }}
//                     >
//                       {stat.label}
//                     </p>
//                     <p 
//                       style={{ 
//                         fontFamily: "var(--font-body)",
//                         fontSize: "1.1rem",
//                         fontWeight: 600,
//                         color: "var(--color-dark)",
//                         whiteSpace: "nowrap",
//                         overflow: "hidden",
//                         textOverflow: "ellipsis"
//                       }}
//                     >
//                       {stat.value}
//                     </p>
//                   </div>
//                 </div>
//               </ScrollRevealCard>
//             ))}
//           </div>

//           {/* Budget Distribution */}
//           <ScrollRevealCard index={4}>
//             <h3 
//               style={{ 
//                 fontFamily: "var(--font-body)",
//                 fontSize: "1.2rem",
//                 fontWeight: 700,
//                 color: "var(--color-primary)",
//                 marginBottom: "var(--space-5)"
//               }}
//             >
//               Budget Distribution
//             </h3>

//             <div className="space-y-4">
//               {summaryData.budgetBreakdown.map((item, idx) => (
//                 <div key={item.category}>
//                   <div className="flex justify-between mb-2">
//                     <span 
//                       style={{ 
//                         fontFamily: "var(--font-body)",
//                         fontSize: "0.9rem",
//                         color: "var(--color-dark-mid)"
//                       }}
//                     >
//                       {item.category}
//                     </span>
//                     <span 
//                       style={{ 
//                         fontFamily: "var(--font-mono)",
//                         fontSize: "0.9rem",
//                         fontWeight: 500,
//                         color: "var(--color-gold)"
//                       }}
//                     >
//                       {item.amount}%
//                     </span>
//                   </div>

//                   <div 
//                     className="h-2 rounded-full overflow-hidden"
//                     style={{ backgroundColor: "rgba(42, 48, 80, 0.1)" }}
//                   >
//                     <motion.div
//                       className="h-full rounded-full"
//                       initial={{ width: 0 }}
//                       whileInView={{ width: `${item.amount}%` }}
//                       transition={{ duration: 0.8, delay: idx * 0.1 }}
//                       style={{
//                         backgroundColor: budgetColors[item.category] || "#999"
//                       }}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </ScrollRevealCard>

//           {/* Vendors */}
//           <ScrollRevealCard index={5}>
//             <h3 
//               style={{ 
//                 fontFamily: "var(--font-body)",
//                 fontSize: "1.2rem",
//                 fontWeight: 700,
//                 color: "var(--color-primary)",
//                 marginBottom: "var(--space-4)"
//               }}
//             >
//               Selected Vendors
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//               {summaryData.vendors.length > 0 ? (summaryData.vendors.map((vendor, idx) => (
//                 <div
//                   key={vendor.uid}
//                   className="p-4 rounded-2xl"
//                   style={{ 
//                     backgroundColor: "rgba(98, 117, 76, 0.1)",
//                     border: "1px solid rgba(98, 117, 76, 0.2)"
//                   }}
//                 >
//                   <p 
//                     style={{ 
//                       fontFamily: "var(--font-body)",
//                       fontSize: "1rem",
//                       fontWeight: 600,
//                       color: "var(--color-dark)"
//                     }}
//                   >
//                     {vendor.name || "Vendor"}
//                   </p>
//                   <p 
//                     style={{ 
//                       fontFamily: "var(--font-body)",
//                       fontSize: "0.8rem",
//                       color: "var(--color-accent)"
//                     }}
//                   >
//                     {vendor.category || "Service"}
//                   </p>
//                 </div>
//               ))
//               ) : (
//                 <p>No vendors selected</p>
//               )}
//             </div>
//           </ScrollRevealCard>

//           {/* Menu */}
//           <ScrollRevealCard index={6}>
//             <h3 
//               style={{ 
//                 fontFamily: "var(--font-body)",
//                 fontSize: "1.2rem",
//                 fontWeight: 700,
//                 color: "var(--color-primary)",
//                 marginBottom: "var(--space-4)"
//               }}
//             >
//               Menu Selection
//             </h3>
//             <div className="flex flex-wrap gap-2">
//               {summaryData.menu.length > 0 ? (summaryData.menu?.map((dish, idx) => (
//                 <span 
//                   key={idx} 
//                   className="px-4 py-2 rounded-full text-sm"
//                   style={{ 
//                     fontFamily: "var(--font-body)",
//                     fontSize: "0.875rem",
//                     fontWeight: 500,
//                     backgroundColor: "var(--glass-fill)",
//                     border: "1px solid var(--glass-border)",
//                     color: "var(--color-dark-mid)"
//                   }}
//                 >
//                   {dish.name}
//                   <span 
//                     style={{ 
//                       fontSize: "0.7rem", 
//                       color: "var(--color-accent)",
//                       marginLeft: "6px"
//                     }}
//                   >
//                     {dish.cuisine}
//                   </span>
//                 </span>
//               ))) : (<p> No menu selected</p>)}
//             </div>
//           </ScrollRevealCard>

//           {/* Timeline */}
//           <ScrollRevealCard index={7}>
//             <h3 
//               style={{ 
//                 fontFamily: "var(--font-body)",
//                 fontSize: "1.2rem",
//                 fontWeight: 700,
//                 color: "var(--color-primary)",
//                 marginBottom: "var(--space-4)"
//               }}
//             >
//               Event Timeline
//             </h3>
//             <div className="space-y-3">
//               {summaryData.timeline.map((event, idx) => (
//                 <div 
//                   key={idx}
//                   className="flex items-center gap-4 p-3 rounded-xl"
//                   style={{ 
//                     backgroundColor: "rgba(98, 117, 76, 0.08)"
//                   }}
//                 >
//                   <div 
//                     className="w-2 h-2 rounded-full"
//                     style={{ backgroundColor: "var(--color-primary)" }}
//                   />
//                   <span 
//                     style={{ 
//                       fontFamily: "var(--font-body)",
//                       fontSize: "0.9rem",
//                       fontWeight: 500,
//                       color: "var(--color-dark)",
//                       flex: 1
//                     }}
//                   >
//                     {event.title || "Event"}
//                   </span>
//                   <span 
//                     style={{ 
//                       fontFamily: "var(--font-mono)",
//                       fontSize: "0.85rem",
//                       color: "var(--color-accent)"
//                     }}
//                   >
//                     {event.time || "--"}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </ScrollRevealCard>

//           {/* Entertainment & Decor */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//             {hasEntertainment && (
//             <ScrollRevealCard index={8}>
//               <h3 
//                 style={{ 
//                   fontFamily: "var(--font-body)",
//                   fontSize: "1.2rem",
//                   fontWeight: 700,
//                   color: "var(--color-primary)",
//                   marginBottom: "var(--space-4)"
//                 }}
//               >
//                 Entertainment
//               </h3>
//               <div className="flex flex-col gap-3">
//                 {summaryData.entertainment.artist && (
//                   <div className="p-4 rounded-2xl bg-white shadow-sm">
//                     <p className="font-semibold">
//                       {summaryData.entertainment.artist.name}
//                     </p>
//                     <p className="text-sm text-gray-500">Performance Artist</p>
//                   </div>
//                 )}

//                 {summaryData.entertainment.host && (
//                   <div className="p-4 rounded-2xl bg-white shadow-sm">
//                     <p className="font-semibold">
//                       {summaryData.entertainment.host.name}
//                     </p>
//                     <p className="text-sm text-gray-500">Host</p>
//                   </div>
//                 )}

//                 {summaryData.entertainment.lightShow && (
//                   <div className="p-4 rounded-2xl bg-white shadow-sm">
//                     <p className="font-semibold">
//                       {summaryData.entertainment.lightShow.name}
//                     </p>
//                     <p className="text-sm text-gray-500">Light Show</p>
//                   </div>
//                 )}
//               </div>
//             </ScrollRevealCard>
//             )}

//             <ScrollRevealCard index={10.5}>
//               <h3 style={{
//                 fontFamily: "var(--font-body)",
//                 fontSize: "1.2rem",
//                 fontWeight: 700,
//                 color: "var(--color-primary)",
//                 marginBottom: "var(--space-4)"
//               }}>
//                 Decor Theme
//               </h3>

//               {summaryData.theme && (
//                 <div className="rounded-2xl overflow-hidden">
//                   <img
//                     src={summaryData.theme.image}
//                     className="w-full h-64 object-cover"
//                   />
//                   <p className="mt-3 font-medium">
//                     {summaryData.theme.label}
//                   </p>
//                 </div>
//               )}
//             </ScrollRevealCard>
//           </div>

//           {/* Poster + Canvas Side-by-Side */}
//           <div
//             className={`grid gap-6 items-stretch ${
//               generatedCanvasImage ? "md:grid-cols-2" : "grid-cols-1"
//             }`}
//           >

//             {/* Poster */}
//             <ScrollRevealCard index={10}>
//               <div className="flex flex-col items-center h-full">
//                 <h3
//                   style={{
//                     fontFamily: "var(--font-body)",
//                     fontSize: "1.2rem",
//                     fontWeight: 700,
//                     color: "var(--color-primary)",
//                     marginBottom: "var(--space-4)",
//                   }}
//                 >
//                   Event Poster
//                 </h3>

//                 {summaryData.poster ? (
//                   <img
//                     src={summaryData.poster}
//                     onClick={() => setIsModalOpen(true)}
//                     className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-2xl cursor-zoom-in transition-transform duration-500 ease-out hover:scale-105 shadow-lg"
//                   />
//                 ) : (
//                   <p className="opacity-60 text-sm">No poster generated</p>
//                 )}
//               </div>
//             </ScrollRevealCard>

//             {/* Canvas Image */}
//             <ScrollRevealCard index={10.2}>
//               <div className="flex flex-col items-center h-full">
//                 <h3
//                   style={{
//                     fontFamily: "var(--font-body)",
//                     fontSize: "1.2rem",
//                     fontWeight: 700,
//                     color: "var(--color-primary)",
//                     marginBottom: "var(--space-4)",
//                   }}
//                 >
//                   Event Setup
//                 </h3>

//                 {generatedCanvasImage ? (
//                   <img
//                     src={generatedCanvasImage}
//                     className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-2xl shadow-lg"
//                   />
//                 ) : (
//                   <div className="p-6 rounded-2xl border opacity-70 text-center">
//                     Indoor setup selected — no spatial canvas required
//                   </div>
//                 )}
//               </div>
//             </ScrollRevealCard>

//           </div>

//           {/* Progress Checklist */}
//           {/* <ScrollRevealCard index={11}>
//             <h3 
//               style={{ 
//                 fontFamily: "var(--font-body)",
//                 fontSize: "1.2rem",
//                 fontWeight: 700,
//                 color: "var(--color-primary)",
//                 marginBottom: "var(--space-4)"
//               }}
//             >
//               Planning Progress
//             </h3>
//             <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
//               {screenSections.map((screen) => (
//                 <div
//                   key={screen.id}
//                   className="flex flex-col items-center gap-2 p-3 rounded-xl"
//                   style={{ 
//                     backgroundColor: screen.completed 
//                       ? "rgba(98, 117, 76, 0.15)" 
//                       : "rgba(42, 48, 80, 0.08)",
//                     border: screen.completed 
//                       ? "1px solid rgba(98, 117, 76, 0.3)" 
//                       : "1px solid transparent"
//                   }}
//                 >
//                   <screen.icon 
//                     size={20} 
//                     style={{ 
//                       color: screen.completed 
//                         ? "var(--color-primary)" 
//                         : "var(--color-dark-mid)",
//                       opacity: screen.completed ? 1 : 0.4
//                     }} 
//                   />
//                   <span 
//                     style={{ 
//                       fontFamily: "var(--font-body)",
//                       fontSize: "0.7rem",
//                       fontWeight: 500,
//                       color: screen.completed 
//                         ? "var(--color-dark)" 
//                         : "var(--color-dark-mid)",
//                       opacity: screen.completed ? 1 : 0.4,
//                       textAlign: "center"
//                     }}
//                   >
//                     {screen.name}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </ScrollRevealCard> */}

//           {/* Quotation Section */}
//           <ScrollRevealCard index={12}>
//             <h3
//               style={{
//                 fontFamily: "var(--font-body)",
//                 fontSize: "1.2rem",
//                 fontWeight: 700,
//                 color: "var(--color-primary)",
//                 marginBottom: "var(--space-4)",
//               }}
//             >
//               Estimated Planning Fee
//             </h3>

//             <div className="space-y-3">
//               <div className="flex justify-between">
//                 <span>Base Fee ({(quotation.basePercent * 100).toFixed(0)}%)</span>
//                 <span>₹{quotation.serviceFee}L</span>
//               </div>

//               <div className="flex justify-between">
//                 <span>GST (18%)</span>
//                 <span>₹{quotation.gst}L</span>
//               </div>

//               <div className="border-t pt-3 flex justify-between font-bold">
//                 <span>Total</span>
//                 <span>₹{quotation.total}L</span>
//               </div>
//             </div>

//             <p className="mt-4 text-sm opacity-70">
//               Final pricing may vary based on vendor negotiations and custom requirements.
//             </p>
//           </ScrollRevealCard>

//           {/* Actions */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
//             <motion.button
//               onClick={async () => {
//                 if (isGenerating || isSending) return;
//                 const url = await generatePdfIfNeeded();

//                 if (!url) return;

//                 const a = document.createElement("a");
//                 a.href = url;
//                 a.download = "event-proposal.pdf";
//                 a.click();
//               }}
//               whileHover={{ scale: 1.02, boxShadow: "var(--shadow-2)" }}
//               whileTap={{ scale: 0.98 }}
//               className="py-4 rounded-2xl flex items-center justify-center gap-2 border shadow-sm"
//               style={{ 
//                 fontFamily: "var(--font-body)",
//                 fontWeight: 600,
//                 fontSize: "1rem",
//                 backgroundColor: "var(--glass-fill)",
//                 // borderColor: "var(--glass-border)",
//                 color: "var(--color-dark)",
//                 backdropFilter: "blur(16px)"
//               }}
//             >
//               <Download size={18} />
//               Export PDF
//             </motion.button>

//             <motion.button
//               onClick={async () => {
//                 if (isGenerating || isSending) return;
//                 await generatePdfIfNeeded();
//                 setShowQR(true);
//               }}
//               whileHover={{ scale: 1.02, boxShadow: "var(--glow-green)" }}
//               whileTap={{ scale: 0.98 }}
//               //onClick={scrollToQR}
//               className="py-4 rounded-2xl flex items-center justify-center gap-2"
//               style={{ 
//                 fontFamily: "var(--font-body)",
//                 fontWeight: 700,
//                 fontSize: "1rem",
//                 backgroundColor: "var(--color-dark)",
//                 color: "var(--color-bg)"
//               }}
//             >
//               <Share2 size={18} />
//               Share Vision
//             </motion.button>
//           </div>

//           {/* QR Code */}
//           {/* {showQR && (
//             <motion.div
//               ref={QRRef}
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.4 }}
//               className="p-10 text-center mt-8 rounded-3xl flex flex-col items-center"
//               style={{ 
//                 backgroundColor: "var(--glass-fill)",
//                 backdropFilter: "blur(16px)",
//                 border: "1px solid var(--glass-border)",
//                 boxShadow: "var(--shadow-2)"
//               }}
//             >
//               <QrCode size={120} style={{ color: "var(--color-dark)" }} />
//               <p 
//                 className="mt-4"
//                 style={{ 
//                   fontFamily: "var(--font-body)",
//                   fontSize: "0.9rem",
//                   color: "var(--color-dark-mid)",
//                   opacity: 0.7
//                 }}
//               >
//                 Scan to view event details
//               </p>
//             </motion.div>
//           )} */}
//           {showQR && pdfUrl && (
//             <motion.div ref={QRRef} 
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.4 }}
//               className="p-10 text-center mt-8 rounded-3xl flex flex-col items-center"
//               style={{ 
//                 backgroundColor: "var(--glass-fill)",
//                 backdropFilter: "blur(16px)",
//                 border: "1px solid var(--glass-border)",
//                 boxShadow: "var(--shadow-2)"
//               }}>
//               <img src={qrCode} className="w-40 h-40" />

//               <p className="mt-4 text-sm opacity-70">
//                 Scan to view full proposal
//               </p>

//               <a href={pdfUrl} target="_blank" className="text-sm underline">
//                 Open PDF
//               </a>

//               {/* SUBMIT BUTTON */}
//               <div className="flex gap-3 mt-6">
//                 <button
//                   onClick={handleSubmitRequest}
//                   className="px-6 py-3 rounded-xl border"
//                 >
//                   Submit Request
//                 </button>

//                 <button
//                   onClick={handlePayment}
//                   className="px-6 py-3 rounded-xl bg-[#62754C] text-white"
//                 >
//                   Pay Booking Advance
//                 </button>
//               </div>
//             </motion.div>
//           )}

//           {/* Reset
//           <motion.button
//             whileHover={{ scale: 1.01 }}
//             whileTap={{ scale: 0.99 }}
//             onClick={onReset}
//             className="w-full mt-10 py-4 rounded-2xl border"
//             style={{ 
//               fontFamily: "var(--font-body)",
//               fontWeight: 500,
//               fontSize: "0.95rem",
//               backgroundColor: "transparent",
//               borderColor: "var(--glass-border)",
//               color: "var(--color-dark-mid)",
//               opacity: 0.7
//             }}
//           >
//             Plan Another Event
//           </motion.button> */}
//         </motion.div>
//       </div>
//       {/* MODAL */}
//       {isModalOpen && summaryData.poster && (
//         <div
//           className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
//           onClick={() => setIsModalOpen(false)}
//         >
//           <img
//             src={summaryData.poster}
//             onClick={(e) => e.stopPropagation()}
//             className="max-h-[90vh] max-w-[90vw] rounded-xl"
//           />
//         </div>
//       )}

//       {showPaymentSuccess && (
//       <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-md">

//         <Confetti
//           recycle={false}
//           numberOfPieces={220}
//           gravity={0.15}
//         />

//         <motion.div
//           initial={{ opacity: 0, scale: 0.9, y: 30 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           transition={{
//             duration: 0.6,
//             ease: [0.16, 1, 0.3, 1],
//           }}
//           className="relative w-[92%] max-w-md rounded-[32px] p-8 overflow-hidden"
//           style={{
//             background: "rgba(255,255,255,0.75)",
//             backdropFilter: "blur(24px)",
//             WebkitBackdropFilter: "blur(24px)",
//             border: "1px solid rgba(255,255,255,0.35)",
//             boxShadow: "0 20px 80px rgba(0,0,0,0.15)",
//           }}
//         >
//           {/* glow */}
//           <div
//             className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl opacity-20"
//             style={{
//               background:
//                 "radial-gradient(circle, var(--color-primary), transparent 70%)",
//             }}
//           />

//           {/* success icon */}
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{
//               delay: 0.2,
//               type: "spring",
//               stiffness: 180,
//               damping: 12,
//             }}
//             className="w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-6"
//             style={{
//               background:
//                 "linear-gradient(135deg, var(--color-primary), #8BA672)",
//               boxShadow: "0 10px 40px rgba(98,117,76,0.35)",
//             }}
//           >
//             <CheckCircle2
//               size={48}
//               color="white"
//             />
//           </motion.div>

//           <div className="text-center">
//             <h2
//               className="text-3xl font-bold mb-2"
//               style={{
//                 fontFamily: "var(--font-display)",
//                 color: "var(--color-dark)",
//               }}
//             >
//               Payment Successful!
//             </h2>

//             <p
//               className="text-sm opacity-70 mb-8"
//               style={{
//                 color: "var(--color-dark-mid)",
//               }}
//             >
//               Your booking advance has been received.
//               We’ll contact you within 24 hours.
//             </p>
//           </div>

//           {/* details */}
//           <div
//             className="rounded-2xl p-5 space-y-4 mb-8"
//             style={{
//               background: "rgba(255,255,255,0.55)",
//               border: "1px solid rgba(255,255,255,0.35)",
//             }}
//           >
//             <div className="flex justify-between">
//               <span className="opacity-60">Booking ID</span>
//               <span className="font-semibold">
//                 {paymentDetails.bookingId}
//               </span>
//             </div>

//             <div className="flex justify-between">
//               <span className="opacity-60">Payment Date</span>
//               <span className="font-semibold">
//                 {paymentDetails.date}
//               </span>
//             </div>

//             <div className="flex justify-between">
//               <span className="opacity-60">Advance Paid</span>
//               <span
//                 className="font-bold"
//                 style={{
//                   color: "var(--color-primary)",
//                 }}
//               >
//                 {paymentDetails.amount}
//               </span>
//             </div>
//           </div>

//           {/* CTA */}
//           <div className="flex flex-col gap-3">
//             <button
//               onClick={async () => {
//                 const url = await generatePdfIfNeeded();

//                 if (!url) return;

//                 const a = document.createElement("a");
//                 a.href = url;
//                 a.download = `receipt-${paymentDetails.bookingId}.pdf`;
//                 a.click();
//               }}
//               className="w-full py-4 rounded-2xl text-white font-semibold flex items-center justify-center gap-2"
//               style={{
//                 background:
//                   "linear-gradient(135deg, var(--color-primary), #7E9564)",
//                 boxShadow:
//                   "0 10px 30px rgba(98,117,76,0.35)",
//               }}
//             >
//               <Download size={18} />
//               Download Receipt
//             </button>

//             <button
//               onClick={() => {
//                 setShowPaymentSuccess(false);
//                 router.push("/");
//               }}
//               className="w-full py-4 rounded-2xl font-semibold border"
//               style={{
//                 borderColor: "rgba(0,0,0,0.08)",
//                 background: "rgba(255,255,255,0.6)",
//                 color: "var(--color-dark)",
//               }}
//             >
//               Back to Home
//             </button>
//           </div>
//         </motion.div>
//       </div>
//     )}
//     </div>
//   );
// }

// /* Scroll Reveal Card */
// function ScrollRevealCard({ children, index }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 40 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.6, delay: index * 0.1 }}
//       className="p-6 rounded-3xl mb-6"
//       style={{
//         backgroundColor: "var(--glass-fill)",
//         backdropFilter: "blur(16px)",
//         WebkitBackdropFilter: "blur(16px)",
//         border: "1px solid var(--glass-border)",
//         boxShadow: "var(--shadow-1)"
//       }}
//     >
//       {children}
//     </motion.div>
//   );
// }


"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useMemo, useEffect } from "react";
import {
  Calendar, MapPin, Users, IndianRupee, QrCode, CheckCircle2,
  Download, Share2, Utensils, Clapperboard, Palette, Mail, PartyPopper,
  Sparkles, ArrowRight, Star
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEventStore } from "@/store/useEventStore";
import { calculateQuotation } from "@/lib/pricing";
import QRCode from "qrcode";
import Confetti from "react-confetti";

// ── Floating orb background ───────────────────────────────────────────────────
function AmbientOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 600, height: 600,
          top: "-15%", left: "-10%",
          background: "radial-gradient(circle, rgba(98,117,76,0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 500, height: 500,
          bottom: "5%", right: "-8%",
          background: "radial-gradient(circle, rgba(168,188,146,0.14) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 300, height: 300,
          top: "40%", left: "35%",
          background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
        animate={{ x: [0, 20, -20, 0], y: [0, -20, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

// ── Thin horizontal rule ──────────────────────────────────────────────────────
function Divider() {
  return (
    <div className="w-full h-px my-8" style={{ background: "linear-gradient(90deg, transparent, #FDFDF8, transparent)" }} />
  );
}

// ── Section label pill ────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <motion.span
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
      style={{
        background: "#FDFDF8",
        border: "1px solid #FDFDF8",
        fontFamily: "var(--font-body)",
        fontSize: "0.7rem",
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "var(--color-primary)",
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-primary)" }} />
      {children}
    </motion.span>
  );
}

// ── Reveal wrapper ─────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, y = 30 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ── Hero stat card ─────────────────────────────────────────────────────────────
function HeroStat({ icon: Icon, label, value, index, accent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: 0.4 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative overflow-hidden rounded-2xl p-5"
      style={{
        background: "rgba(253,253,248,0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid #FDFDF8",
        boxShadow: "0 8px 32px rgba(20,24,42,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
      }}
    >
      {/* accent line top */}
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: accent }} />

      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: `${accent}22`, border: `1px solid ${accent}44` }}
        >
          <Icon size={16} style={{ color: accent }} />
        </div>
        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-accent)" }}>
          {label}
        </span>
      </div>
      <p style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 700, color: "var(--color-dark)", lineHeight: 1.1 }}>
        {value}
      </p>
    </motion.div>
  );
}

// ── Big number counter ────────────────────────────────────────────────────────
function CountUp({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true); });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const num = parseFloat(String(target).replace(/[^\d.]/g, "")) || 0;
    let start = 0;
    const duration = 1200;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * num));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(num);
    };
    requestAnimationFrame(step);
  }, [started, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ── Budget bar ────────────────────────────────────────────────────────────────
const budgetColors = {
  food: "#62754C",
  decor: "#8BA672",
  tech: "#A8BC92",
  Entertainment: "#C9A84C",
  extras: "#2A3050",
};

function BudgetBar({ item, index }) {
  return (
    <Reveal delay={index * 0.08}>
      <div className="flex items-center gap-4 group">
        <div className="w-28 flex-shrink-0 text-right">
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 500, color: "var(--color-dark-mid)" }}>
            {item.category}
          </span>
        </div>
        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "rgba(20,24,42,0.08)" }}>
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: `${item.amount}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ background: budgetColors[item.category] || "#999" }}
          />
        </div>
        <div className="w-12 text-right">
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-gold)" }}>
            {item.amount}%
          </span>
        </div>
      </div>
    </Reveal>
  );
}

// ── Loading overlay ───────────────────────────────────────────────────────────
function LoadingOverlay({ label, sub }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-6"
      >
        <div className="relative flex items-center justify-center">
          <motion.div
            className="absolute w-24 h-24 rounded-full"
            style={{ background: "radial-gradient(circle, #FDFDF8, transparent 70%)" }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.2, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="w-14 h-14 rounded-full border-2 border-transparent"
            style={{ borderTopColor: "var(--color-primary)", borderRightColor: "#FDFDF8" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <div className="text-center">
          <p style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "white", fontWeight: 600 }}>{label}</p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", marginTop: 4 }}>{sub}</p>
        </div>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function FinalSummary({ appData, onReset }) {
  const router = useRouter();
  const QRRef = useRef(null);
  const heroRef = useRef(null);
  const [currentStep] = useState(12);
  const [receiptUrl, setReceiptUrl] = useState(null);

  const { scrollYProgress } = useScroll({ target: heroRef });
  const heroY = useTransform(scrollYProgress, [0, 1400], [0, -80]);

  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 700, 1200],
    [1, 1, 0]
  );

  const loadCashfree = () => new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });


  const generateBookingId = () => `BK-${Math.floor(100000 + Math.random() * 900000)}`;

  const handlePayment = async (leadData) => {
  try {
    const loaded = await loadCashfree();

    if (!loaded) {
      alert("Cashfree SDK failed to load");
      return;
    }

    const totalRupees = quotation.total * 100000;
    const advanceAmount = Math.round(totalRupees * 0.15);
    let url = pdfUrl;

    if (!url) {
      url = await generatePdfIfNeeded();
    }

    const res = await fetch("/api/cashfree/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
            pdfUrl: url,
            summaryData,
            quotation,
            leadData,
          }),
    });

    const data = await res.json();

    const cashfree = window.Cashfree({
      mode: "sandbox",
    });

    const checkoutOptions = {
      paymentSessionId: data.payment_session_id,
      redirectTarget: "_modal",
    };

    const result = await cashfree.checkout(checkoutOptions);

    console.log("Cashfree Result:", result);

    // Payment completed successfully
    // if (!result.error) {
    //   // setPaymentDetails({
    //   //   bookingId: generateBookingId(),
    //   //   amount: `₹${advanceAmount.toLocaleString("en-IN")}`,
    //   //   date: new Date().toLocaleDateString("en-IN", {
    //   //     day: "2-digit",
    //   //     month: "short",
    //   //     year: "numeric",
    //   //   }),
    //   // });

    //   setShowPaymentSuccess(true);
    // }

    if (!result.error) {
      const paymentInfo = {
        bookingId: generateBookingId(),
        amount: `₹${advanceAmount.toLocaleString("en-IN")}`,
        date: new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        transactionId: result?.transactionId || "N/A",
      };

      setPaymentDetails(paymentInfo);

      //const receipt = await generateReceiptPdf(leadData, paymentInfo);
      const receipt = await generateReceiptPdf(leadData, {
        ...paymentInfo,
        amount: `₹${advanceAmount.toLocaleString("en-IN")}`,
      });
      setReceiptUrl(receipt);

      setShowPaymentSuccess(true);
    }

    // User closed modal or payment pending
    if (result.redirect) {
      console.log("Payment requires redirect");
    }

    // Payment failed
    if (result.error) {
      console.error(result.error);
      alert(result.error.message || "Payment failed");
    }

  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
};



  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({ bookingId: "", amount: "", date: "" });
  const [showQR, setShowQR] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasHydrated = useEventStore((s) => s.hasHydrated);
  const getSummaryData = useEventStore((s) => s.getSummaryData);
  const generatedCanvasImage = useEventStore((s) => s.generatedCanvasImage || null);

  const [showLeadModal, setShowLeadModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    // simple Indian-friendly validation (10 digits, optional +91)
    return /^(?:\+91)?[6-9]\d{9}$/.test(phone);
  };
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });

  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const isFormValid =
  leadForm.name?.trim() &&
  validateEmail(leadForm.email) &&
  validatePhone(leadForm.phone);

  const formatDate = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  };

  const summaryData = useMemo(() => hasHydrated ? getSummaryData() : {
    eventName: "", date: "", location: "", guestCount: 0, budget: 0,
    budgetBreakdown: [], vendors: [], menu: [], timeline: [],
    entertainment: "", decor: "", poster: "",
  }, [hasHydrated, getSummaryData]);

  const quotation = useMemo(() => calculateQuotation(summaryData), [summaryData]);

  const hasEntertainment = summaryData.entertainment?.artist || summaryData.entertainment?.host || summaryData.entertainment?.lightShow;

  const smoothY = useSpring(heroY, {
    stiffness: 90,
    damping: 22,
  });

  const smoothOpacity = useSpring(heroOpacity, {
    stiffness: 90,
    damping: 22,
  });

  const generatePdfIfNeeded = async () => {
    if (isGenerating || isSending) return;
    if (pdfUrl) return pdfUrl;
    try {
      setIsGenerating(true);
      const res = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: summaryData, quotation }),
      });
      const { url } = await res.json();
      const qr = await QRCode.toDataURL(url);
      setPdfUrl(url);
      setQrCode(qr);
      return url;
    } catch (err) { console.error(err); }
    finally { setIsGenerating(false); }
  };

  const generateReceiptPdf = async (leadData, paymentInfo) => {
    const res = await fetch("/api/generate-receipt-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        summaryData,
        quotation,
        leadData,
        paymentInfo,
      }),
    });

    const data = await res.json();
    return data.url;
  };

  const handleSubmitRequest = async (leadData) => {
  if (isGenerating || isSending) return;

  try {
    setIsSending(true);

    let url = pdfUrl;

    if (!url) {
      url = await generatePdfIfNeeded();
    }

    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pdfUrl: url,
        summaryData,
        quotation,
        leadData,
      }),
    });

    const data = await res.json();

    setShowSuccess(true);

  } catch (err) {
    console.error(err);
    alert("Failed to send email");
  } finally {
    setIsSending(false);
  }
};

  useEffect(() => {
    if (showQR && QRRef.current) QRRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [showQR]);

  const stats = [
    { icon: Calendar, label: "Event Date", value: formatDate(summaryData.date), accent: "#62754C" },
    { icon: MapPin, label: "Location", value: summaryData.location || "—", accent: "#8BA672" },
    { icon: Users, label: "Guests", value: summaryData.guestCount || "—", accent: "#A8BC92" },
    { icon: IndianRupee, label: "Budget", value: `₹${summaryData.budget}L`, accent: "#C9A84C" },
  ];

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: "var(--color-bg)", fontFamily: "var(--font-body)" }}>
      <AmbientOrbs />

      {/* Overlays */}
      <AnimatePresence>
        {isGenerating && <LoadingOverlay label="Generating your proposal" sub="Crafting a polished event brief…" />}
        {isSending && <LoadingOverlay label="Sending request" sub="Finalizing everything for you…" />}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white rounded-3xl p-10 text-center max-w-sm mx-4" style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.15)" }}>
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: "var(--color-primary)" }}>
                <CheckCircle2 size={32} color="white" />
              </div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 700, color: "var(--color-dark)", marginBottom: 8 }}>Request Submitted!</h2>
              <p style={{ color: "var(--color-dark-mid)", opacity: 0.7, marginBottom: 24 }}>We'll be in touch within 24 hours.</p>
              <button onClick={() => { setShowSuccess(false); router.push("/"); }} className="px-8 py-3 rounded-2xl text-white font-semibold" style={{ background: "var(--color-primary)" }}>Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative" style={{ zIndex: 1 }}>

        {/* ══ HERO ═══════════════════════════════════════════════════════════ */}
        <motion.div
          ref={heroRef}
          style={{
            y: smoothY,
            opacity: smoothOpacity,
          }}
          className="relative mt-1 min-h-screen flex flex-col justify-center items-center text-center px-6 pt-24 pb-16"
        >
          {/* Large decorative event name behind */}
          <div
            className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none"
            aria-hidden
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.04 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(6rem, 18vw, 18rem)",
                fontWeight: 900,
                fontStyle: "italic",
                color: "var(--color-dark)",
                whiteSpace: "nowrap",
                lineHeight: 1,
                letterSpacing: "-0.04em",
              }}
            >
              {hasHydrated ? summaryData.eventName : ""}
            </motion.span>
          </div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: "#FFFFFF",
              border: "1px solid #FFFFFF",
            }}
          >
            <Sparkles size={14} style={{ color: "var(--color-primary)" }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-primary)" }}>
              Your Vision is Complete
            </span>
          </motion.div>

          {/* Event name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 8vw, 7rem)",
              fontWeight: 700,
              fontStyle: "italic",
              color: "var(--color-dark)",
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
              maxWidth: "14ch",
            }}
          >
            {hasHydrated ? summaryData.eventName : ""}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "var(--color-dark-mid)", marginBottom: "2rem" }}
          >
            Engineered. Mastered. Ready.
          </motion.p>

          {/* 4 stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-3xl">
            {stats.map((s, i) => <HeroStat key={s.label} {...s} index={i} />)}
          </div>

          {/* Scroll cue */}
          <motion.div
            className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-accent)", opacity: 0.7 }}>Scroll to explore</span>
            <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, var(--color-accent), transparent)" }} />
          </motion.div>
        </motion.div>

        {/* ══ CONTENT ════════════════════════════════════════════════════════ */}
        <div className="max-w-5xl mx-auto px-6 pb-15 space-y-22">

          {/* ── BUDGET ──────────────────────────────────────────────────────── */}
          <section>
            <Reveal>
              <SectionLabel>Financial Breakdown</SectionLabel>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left: bars */}
                <div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "var(--color-dark)", lineHeight: 1.1, marginBottom: "2rem" }}>
                    Budget<br /><em>Distribution</em>
                  </h2>
                  <div className="space-y-4">
                    {summaryData.budgetBreakdown.map((item, i) => <BudgetBar key={item.category} item={item} index={i} />)}
                  </div>
                </div>

                {/* Right: quotation card */}
                <Reveal delay={0.2}>
                  <div
                    className="rounded-3xl p-8 relative overflow-hidden"
                    style={{
                      background: "var(--color-dark)",
                      boxShadow: "0 24px 80px rgba(20,24,42,0.18)",
                    }}
                  >
                    {/* glow accent */}
                    <div className="absolute top-0 right-0 w-48 h-48 rounded-full" style={{ background: "radial-gradient(circle,  rgba(98,117,76,0.25), transparent 70%)", transform: "translate(30%, -30%)" }} />

                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: "2rem" }}>
                      Estimated Planning Fee
                    </p>

                    <div className="space-y-4 mb-6">
                      {[
                        { label: `Base Fee (${(quotation.basePercent * 100).toFixed(0)}%)`, value: `₹${quotation.serviceFee}L` },
                        { label: "GST (18%)", value: `₹${quotation.gst}L` },
                      ].map((row) => (
                        <div key={row.label} className="flex justify-between items-center">
                          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "rgba(253,253,248,0.55)" }}>{row.label}</span>
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "var(--color-green-pale)" }}>{row.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4" style={{ borderTop: "1px solid rgba(253,253,248,0.1)" }}>
                      <div className="flex justify-between items-end">
                        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 600, color: "rgba(253,253,248,0.6)" }}>Total</span>
                        <span style={{ fontFamily: "var(--font-display)", fontSize: "2.8rem", fontWeight: 700, color: "var(--color-bg)", lineHeight: 1 }}>
                          ₹<CountUp target={quotation.total} />L
                        </span>
                      </div>
                    </div>

                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(253,253,248,0.3)", marginTop: "1rem" }}>
                      Final pricing may vary based on vendor negotiations.
                    </p>
                  </div>
                </Reveal>
              </div>
            </Reveal>
          </section>

          {/* ── VENDORS ─────────────────────────────────────────────────────── */}
          {summaryData.vendors.length > 0 && (
            <section>
              <Reveal>
                <SectionLabel>Selected Vendors</SectionLabel>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "var(--color-dark)", lineHeight: 1.1, marginBottom: "2rem" }}>
                  Your <em>Dream Team</em>
                </h2>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {summaryData.vendors.map((v, i) => (
                  <Reveal key={v.uid} delay={i * 0.08}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="p-5 rounded-2xl relative overflow-hidden"
                      style={{
                        background: "rgba(253,253,248,0.8)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid #FDFDF8",
                        boxShadow: "0 4px 20px rgba(20,24,42,0.06)",
                      }}
                    >
                      <div className="absolute top-0 left-0 w-1 h-full" style={{ background: budgetColors[v.category?.toLowerCase()] || "var(--color-primary)" }} />
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 600, color: "var(--color-dark)", marginLeft: 12 }}>{v.name || "Vendor"}</p>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-accent)", marginLeft: 12, marginTop: 4 }}>{v.category || "Service"}</p>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          {/* ── MENU ────────────────────────────────────────────────────────── */}
          {summaryData.menu.length <= 0 && (
            <section>
              <Reveal>
                <SectionLabel>Curated Menu</SectionLabel>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "var(--color-dark)", lineHeight: 1.1, marginBottom: "2rem" }}>
                  The <em>Taste</em>
                </h2>
                <div
        style={{
          padding: "24px",
          borderRadius: 16,
          background: "rgba(20,24,42,0.03)",
          border: "1px dashed rgba(20,24,42,0.15)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 12,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.95rem",
            color: "rgba(20,24,42,0.6)",
          }}
        >
          Menu not selected yet
        </p>

        <button
          onClick={() => router.push("/menu")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 16px",
            borderRadius: 999,
            background: "var(--color-primary)",
            color: "var(--color-bg)",
            fontFamily: "var(--font-body)",
            fontSize: "0.85rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Add Menu →
        </button>
      </div>
              </Reveal>
            </section>
          )}
          {summaryData.menu.length > 0 && (
            <section>
              <Reveal>
                <SectionLabel>Curated Menu</SectionLabel>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "var(--color-dark)", lineHeight: 1.1, marginBottom: "2rem" }}>
                  The <em>Taste</em>
                </h2>
                <div className="flex flex-wrap gap-3">
                  {summaryData.menu.map((dish, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ scale: 1.04 }}
                      className="px-5 py-2.5 rounded-full"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        color: "var(--color-dark)",
                        background: "rgba(253,253,248,0.85)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid #FDFDF8",
                        boxShadow: "0 2px 8px rgba(20,24,42,0.06)",
                      }}
                    >
                      {dish.name}
                      <span style={{ fontSize: "0.7rem", color: "var(--color-accent)", marginLeft: 8 }}>{dish.cuisine}</span>
                    </motion.span>
                  ))}
                </div>
              </Reveal>
            </section>
          )}

          {/* ── TIMELINE ────────────────────────────────────────────────────── */}
          {summaryData.timeline.length > 0 && (
            <section>
              <Reveal>
                <SectionLabel>Event Timeline</SectionLabel>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "var(--color-dark)", lineHeight: 1.1, marginBottom: "2.5rem" }}>
                  The <em>Rhythm</em>
                </h2>
              </Reveal>
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-24 top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, transparent, var(--color-primary), transparent)" }} />

                <div className="space-y-3">
                  {summaryData.timeline.map((event, i) => (
                    <Reveal key={i} delay={i * 0.06}>
                      <div className="flex items-center gap-6">
                        <div className="w-20 text-right flex-shrink-0">
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-accent)" }}>{event.time || "--:--"}</span>
                        </div>
                        {/* dot */}
                        <div className="w-3 h-3 rounded-full flex-shrink-0 ring-4" style={{ background: "var(--color-primary)", ringColor: "#FDFDF8" }} />
                        <motion.div
                          whileHover={{ x: 4 }}
                          className="flex-1 py-3 px-5 rounded-2xl"
                          style={{
                            background: "rgba(253,253,248,0.7)",
                            backdropFilter: "blur(12px)",
                            border: "1px solid #FDFDF8",
                          }}
                        >
                          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", fontWeight: 500, color: "var(--color-dark)" }}>{event.title || "Event"}</span>
                        </motion.div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── ENTERTAINMENT + DECOR ───────────────────────────────────────── */}
          <section className="grid md:grid-cols-2 gap-8">
            {!hasEntertainment && (
            <section>
              <Reveal>
                <SectionLabel>Entertainment</SectionLabel>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "var(--color-dark)", lineHeight: 1.1, marginBottom: "1.5rem" }}>
                  The <em>Act</em>
                </h2>
                <div
        style={{
          padding: "24px",
          borderRadius: 16,
          background: "rgba(20,24,42,0.03)",
          border: "1px dashed rgba(20,24,42,0.15)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 12,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.95rem",
            color: "rgba(20,24,42,0.6)",
          }}
        >
          Entertainment not selected yet
        </p>

        <button
          onClick={() => router.push("/extras")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 16px",
            borderRadius: 999,
            background: "var(--color-primary)",
            color: "var(--color-bg)",
            fontFamily: "var(--font-body)",
            fontSize: "0.85rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Add Entertainment →
        </button>
      </div>
              </Reveal>
            </section>
          )}
            {hasEntertainment && (
              <Reveal>
                <SectionLabel>Entertainment</SectionLabel>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "var(--color-dark)", lineHeight: 1.1, marginBottom: "1.5rem" }}>
                  The <em>Act</em>
                </h2>
                <div className="space-y-3">
                  {[
                    summaryData.entertainment?.artist && { name: summaryData.entertainment.artist.name, role: "Performance Artist" },
                    summaryData.entertainment?.host && { name: summaryData.entertainment.host.name, role: "Host / Emcee" },
                    summaryData.entertainment?.lightShow && { name: summaryData.entertainment.lightShow.name, role: "Light Show" },
                  ].filter(Boolean).map((ent, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-4 p-4 rounded-2xl"
                      style={{ background: "rgba(20,24,42,0.04)", border: "1px solid #FDFDF8" }}
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--color-primary)" }}>
                        <Star size={16} color="white" />
                      </div>
                      <div>
                        <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.95rem", color: "var(--color-dark)" }}>{ent.name}</p>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-accent)" }}>{ent.role}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Reveal>
            )}

            {summaryData.theme && (
              <Reveal delay={0.1}>
                <SectionLabel>Decor Theme</SectionLabel>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "var(--color-dark)", lineHeight: 1.1, marginBottom: "1.5rem" }}>
                  The <em>Stage</em>
                </h2>
                <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 12px 40px rgba(20,24,42,0.12)" }}>
                  <img src={summaryData.theme.image} className="w-full h-48 object-cover" />
                  <div className="p-4" style={{ background: "rgba(253,253,248,0.9)", backdropFilter: "blur(12px)" }}>
                    <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: "var(--color-dark)" }}>{summaryData.theme.label}</p>
                  </div>
                </div>
              </Reveal>
            )}
          </section>

          {/* ── POSTER + CANVAS ─────────────────────────────────────────────── */}
          <section>
            <Reveal>
              <SectionLabel>Visual Identity</SectionLabel>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "var(--color-dark)", lineHeight: 1.1, marginBottom: "2rem" }}>
                Event <em>Artistry</em>
              </h2>
            </Reveal>
            <div className={`grid gap-6 ${generatedCanvasImage ? "md:grid-cols-2" : "grid-cols-1 max-w-sm mx-auto"}`}>
              {summaryData.poster && (
                <Reveal delay={0.05}>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: "1rem" }}>Event Poster</p>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="cursor-zoom-in rounded-2xl overflow-hidden"
                    style={{ boxShadow: "0 20px 60px rgba(20,24,42,0.15)" }}
                    onClick={() => {
                      setModalImage(summaryData.poster);
                      setIsModalOpen(true);
                    }}
                  >
                    <div className="aspect-[4/3] w-full">
                      <img
                        src={summaryData.poster}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                </Reveal>
              )}
              {generatedCanvasImage && (
                <Reveal delay={0.15}>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: "1rem" }}>Event Setup</p>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="cursor-zoom-in rounded-2xl overflow-hidden"
                      style={{ boxShadow: "0 20px 60px rgba(20,24,42,0.15)" }}
                      onClick={() => {
                        setModalImage(generatedCanvasImage);
                        setIsModalOpen(true);
                      }}
                    >
                    <div className="aspect-[4/3] w-full">
                      <img
                        src={generatedCanvasImage}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </motion.div>
                </Reveal>
              )}
            </div>
          </section>

          {/* ── CTA WALL ────────────────────────────────────────────────────── */}
          <section>
            <Reveal>
              <div
                className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
                style={{
                  background: "var(--color-dark)",
                  boxShadow: "0 40px 120px rgba(20,24,42,0.22)",
                }}
              >
                {/* Orbs inside card */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full" style={{ background: "radial-gradient(ellipse,  rgba(98,117,76,0.3), transparent 70%)", filter: "blur(40px)" }} />
                <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle, rgba(168,188,146,0.12), transparent 70%)", filter: "blur(30px)" }} />

                <div className="relative">
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: "1.5rem" }}>
                    Moments, Mastered
                  </p>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 700, fontStyle: "italic", color: "var(--color-bg)", lineHeight: 1.0, marginBottom: "1rem" }}>
                    Ready to<br />bring it to life?
                  </h2>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "rgba(253,253,248,0.5)", marginBottom: "3rem", maxWidth: "40ch", marginLeft: "auto", marginRight: "auto" }}>
                    Export your proposal, share the vision, or book your event with a 15% advance.
                  </p>

                  {/* Button row */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <motion.button
                      whileHover={{
                        scale: 1.03,
                        y: -2,
                        boxShadow: "0 14px 35px rgba(0,0,0,0.12)",
                      }}
                      whileTap={{ scale: 0.97 }}
                      onClick={async () => {
                        if (isGenerating || isSending) return;
                        const url = await generatePdfIfNeeded();
                        if (!url) return;
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = "event-proposal.pdf";
                        a.click();
                      }}
                      className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl"
                      style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.95rem", background: "var(--color-primary)", color: "var(--color-bg)" }}
                    >
                      <Download size={16} />
                      Export PDF
                    </motion.button>

                    <motion.button
                      whileHover={{
                        scale: 1.03,
                        y: -2,
                        boxShadow: "0 14px 35px rgba(0,0,0,0.12)",
                      }}
                      whileTap={{ scale: 0.97 }}
                      onClick={async () => {
                        if (isGenerating || isSending) return;
                        await generatePdfIfNeeded();
                        setShowQR(true);
                      }}
                      className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl"
                      style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.95rem", background: "rgba(253,253,248,0.1)", color: "var(--color-bg)", border: "1px solid rgba(253,253,248,0.2)", backdropFilter: "blur(12px)" }}
                    >
                      <Share2 size={16} />
                      Share Vision
                    </motion.button>

                    <motion.button
                      whileHover={{
                        scale: 1.03,
                        y: -2,
                        boxShadow: "0 14px 35px rgba(0,0,0,0.12)",
                      }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setPendingAction("payment");
                        setShowLeadModal(true);
                      }}
                      className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl"
                      style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", background: "var(--color-gold)", color: "var(--color-dark)" }}
                    >
                      <ArrowRight size={16} />
                      Pay 15% Advance
                    </motion.button>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          {/* ── QR ──────────────────────────────────────────────────────────── */}
          <AnimatePresence>
            {showQR && pdfUrl && (
              <motion.div
                ref={QRRef}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl p-10 text-center relative overflow-hidden"
                style={{
                  background: "rgba(253,253,248,0.85)",
                  backdropFilter: "blur(24px)",
                  border: "1px solid #FDFDF8",
                  boxShadow: "0 24px 80px rgba(20,24,42,0.1)",
                }}
              >
                <motion.div
                  animate={{ boxShadow: ["0 0 0px #FDFDF8", "0 0 40px #FDFDF8", "0 0 0px #FDFDF8"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="inline-block rounded-2xl overflow-hidden mb-6"
                >
                  <img src={qrCode} className="w-44 h-44" />
                </motion.div>
                <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: "var(--color-dark)", marginBottom: 8 }}>Scan to view your full proposal</p>
                <a href={pdfUrl} target="_blank" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-primary)", textDecoration: "underline" }}>Open PDF directly</a>

                <div className="flex justify-center gap-3 mt-8">
                  <button
                    onClick={() => {
                      setPendingAction("submit");
                      setShowLeadModal(true);
                    }}
                    className="px-6 py-3 rounded-xl font-semibold"
                    style={{ fontFamily: "var(--font-body)", border: "2px solid var(--color-primary)", color: "var(--color-primary)", background: "transparent" }}
                  >
                    Submit Request
                  </button>
                  <button
                    onClick={() => {
                      setPendingAction("payment");
                      setShowLeadModal(true);
                    }}
                    className="px-6 py-3 rounded-xl font-semibold text-white"
                    style={{ fontFamily: "var(--font-body)", background: "var(--color-primary)" }}
                  >
                    Pay Booking Advance
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      {/* ── POSTER MODAL ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && modalImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ ease: [0.16, 1, 0.3, 1] }}
              src={modalImage}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] max-w-[90vw] rounded-2xl"
              style={{ boxShadow: "0 40px 120px rgba(0,0,0,0.5)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PAYMENT SUCCESS ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {showPaymentSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md">
            {/* <Confetti recycle={false} numberOfPieces={150} gravity={0.12} colors={["#62754C", "#8BA672", "#C9A84C", "#FDFDF8", "#A8BC92"]} /> */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[92%] max-w-md rounded-[32px] p-8 overflow-hidden"
              style={{
                background: "rgba(253,253,248,0.92)",
                backdropFilter: "blur(32px)",
                border: "1px solid #FDFDF8",
                boxShadow: "0 40px 120px rgba(0,0,0,0.2)",
              }}
            >
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full" style={{ background: "radial-gradient(circle, #FDFDF8, transparent 70%)", filter: "blur(30px)" }} />

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.25, type: "spring", stiffness: 200, damping: 14 }}
                className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6 relative"
                style={{ background: "linear-gradient(135deg, var(--color-primary), #8BA672)", boxShadow: "0 12px 40px #FDFDF8" }}
              >
                <CheckCircle2 size={40} color="white" />
              </motion.div>

              <div className="text-center mb-8">
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 700, fontStyle: "italic", color: "var(--color-dark)", marginBottom: 8 }}>
                  Payment Successful!
                </h2>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--color-dark-mid)", opacity: 0.65 }}>
                  Your booking advance has been received. We'll contact you within 24 hours.
                </p>
              </div>

              <div className="rounded-2xl p-5 space-y-3 mb-8" style={{ background: "#FDFDF8", border: "1px solid #FDFDF8" }}>
                {[
                  { label: "Booking ID", value: paymentDetails.bookingId },
                  { label: "Payment Date", value: paymentDetails.date },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-center">
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-dark-mid)", opacity: 0.6 }}>{row.label}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", fontWeight: 600, color: "var(--color-dark)" }}>{row.value}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-2" style={{ borderTop: "1px solid #FDFDF8" }}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-dark-mid)", opacity: 0.6 }}>Advance Paid</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.2rem", fontWeight: 700, color: "var(--color-primary)" }}>{paymentDetails.amount}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  // onClick={async () => {
                  //   const url = await generatePdfIfNeeded();
                  //   if (!url) return;
                  //   const a = document.createElement("a");
                  //   a.href = url;
                  //   a.download = `receipt-${paymentDetails.bookingId}.pdf`;
                  //   a.click();
                  // }}
                  onClick={async () => {
                    let url = receiptUrl;

                    if (!url) {
                      url = await generateReceiptPdf(leadForm, paymentDetails);
                      setReceiptUrl(url);
                    }

                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `receipt-${paymentDetails.bookingId}.pdf`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                  }}
                  className="w-full py-4 rounded-2xl text-white font-semibold flex items-center justify-center gap-2"
                  style={{ fontFamily: "var(--font-body)", background: "linear-gradient(135deg, var(--color-primary), #7E9564)", boxShadow: "0 8px 32px #FDFDF8" }}
                >
                  <Download size={16} />
                  Download Receipt
                </button>
                <button
                  onClick={() => { setShowPaymentSuccess(false); router.push("/"); }}
                  className="w-full py-4 rounded-2xl font-semibold"
                  style={{ fontFamily: "var(--font-body)", background: "rgba(20,24,42,0.06)", color: "var(--color-dark)", border: "1px solid rgba(20,24,42,0.1)" }}
                >
                  Back to Home
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
  {showLeadModal && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] flex items-center justify-center px-6"
      style={{
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(10px)",
      }}
      onClick={() => setShowLeadModal(false)}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.96 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-[32px] p-8 relative overflow-hidden h-[83vh]"
        style={{
          background: "rgba(253,253,248,0.92)",
          backdropFilter: "blur(24px)",
          border: "1px solid #FDFDF8",
          boxShadow: "0 40px 120px rgba(0,0,0,0.2)",
        }}
      >
        {/* Glow */}
        <div
          className="absolute -top-32 right-0 w-72 h-72 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(98,117,76,0.18), transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Heading */}
        <div className="relative mb-8">
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              marginBottom: "1rem",
            }}
          >
            Final Step
          </p>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.5rem",
              fontWeight: 700,
              fontStyle: "italic",
              color: "var(--color-dark)",
              lineHeight: 1,
              marginBottom: "1rem",
            }}
          >
            Let’s bring this event to life
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              color: "var(--color-dark-mid)",
              opacity: 0.7,
              lineHeight: 1.6,
            }}
          >
            Share your details and we’ll send your proposal
            and connect with you within 24 hours.
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-6 relative">
          <LuxuryInput
            autoFocus
            label="Full Name"
            value={leadForm.name}
            onChange={(v) =>
              setLeadForm((p) => ({ ...p, name: v }))
            }
          />

          <LuxuryInput
            label="Work Email"
            value={leadForm.email}
            onChange={(v) => {
              setLeadForm((p) => ({ ...p, email: v }));

              setErrors((e) => ({
                ...e,
                email: v && !validateEmail(v) ? "Enter a valid email" : "",
              }));
            }}
            type="email"
            error={errors.email}
          />

          <LuxuryInput
            label="Phone Number"
            value={leadForm.phone}
            onChange={(v) => {
              setLeadForm((p) => ({ ...p, phone: v }));

              setErrors((e) => ({
                ...e,
                phone:
                  v && !validatePhone(v) ? "Enter valid 10-digit number" : "",
              }));
            }}
            type="tel"
            error={errors.phone}
          />
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!isFormValid}
          onClick={async () => {
            try {
              const isValid =
                validateEmail(leadForm.email) &&
                validatePhone(leadForm.phone);

              if (!isValid) {
                setErrors({
                  email: validateEmail(leadForm.email) ? "" : "Invalid email",
                  phone: validatePhone(leadForm.phone) ? "" : "Invalid phone number",
                });
                return;
              }
              // CLOSE MODAL FIRST
              setShowLeadModal(false);

              // small delay for smooth exit animation
              await new Promise((resolve) => setTimeout(resolve, 250));

              if (pendingAction === "submit") {
                await handleSubmitRequest(leadForm);
              }

              if (pendingAction === "payment") {
                await handlePayment(leadForm);
              }

            } catch (e) {
              console.error(e);
            }
          }}
          className="w-[50%] mx-auto mt-10 py-4 rounded-2xl flex items-center justify-center gap-3 disabled:opacity-40"
          style={{
            background: "var(--color-dark)",
            color: "var(--color-bg)",
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: "1rem",
          }}
        >
          {pendingAction === "payment"
            ? "Continue to Payment"
            : "Send Proposal"}

          <ArrowRight size={18} />
        </motion.button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
}


function LuxuryInput({ label, value, onChange, type = "text", autoFocus = false, error }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative pt-3">
      <motion.label
        animate={{
          y: focused || value ? -22 : 0,
          scale: focused || value ? 0.82 : 1,
          opacity: focused || value ? 0.65 : 0.45,
        }}
        transition={{ duration: 0.2 }}
        className="absolute left-0 pointer-events-none"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.8rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--color-dark)",
          transformOrigin: "left center",
        }}
      >
        {label}
      </motion.label>

      <motion.div
        animate={{
          scaleX: focused ? 1 : 0,
          opacity: focused ? 1 : 0.3,
        }}
        className="absolute left-0 bottom-0 h-px w-full"
        style={{
          background: "var(--color-primary)",
          transformOrigin: "left",
        }}
      />

      <input
        autoFocus={autoFocus}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent outline-none pt-2 pb-3"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "1.05rem",
          color: "var(--color-dark)",
        }}
      />
      {error && (
      <p style={{
        fontSize: "0.75rem",
        color: "#e11d48",
        marginTop: 6,
        fontFamily: "var(--font-body)"
      }}>
        {error}
      </p>
    )}
    </div>
  );
}
