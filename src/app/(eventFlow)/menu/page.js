// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import { useState } from "react";
// import { ArrowRight, X } from "lucide-react";
// import { useEventStore } from "@/store/useEventStore";
// import ProgressMap from "@/components/ProgressMap";

// import { getNextRoute } from "@/lib/eventFlow";
// import { useRouter, usePathname } from "next/navigation";

// const cuisines = [
//   { id: "italian", name: "Italian", color: "/cuisines/italian.jpg" },
//   { id: "fusion", name: "Fusion", color: "/cuisines/fusion.jpg" },
//   { id: "vegan", name: "Vegan", color: "/cuisines/vegan.png" },
//   { id: "indian", name: "Indian", color: "/cuisines/indian.jpg" },
//   { id: "coastal", name: "Coastal", color: "/cuisines/coastal.png" },
//   { id: "live_counter", name: "Live Counter", color: "/cuisines/live_counter.jpg" },
// ];

// const dishesData = {
//   italian: [
//     { name: "Margherita Pizza", type: "Main", image: "margherita.jpg" },
//     { name: "Pasta Carbonara", type: "Main", image: "pasta.jpg" },
//     { name: "Caprese Salad", type: "Appetizer", image: "caprese.jpeg" },
//     { name: "Tiramisu", type: "Dessert", image: "tiramisu.png" },
//     { name: "Bruschetta", type: "Appetizer", image: "bruschetta.jpg" },
//     { name: "Risotto", type: "Main", image: "risotto.png" },
//   ],
//   fusion: [
//     { name: "Korean Tacos", type: "Appetizer", image: "koreanTaco.png" },
//     { name: "Sushi Burrito", type: "Main", image: "sushiBurrito.jpg" },
//     { name: "Thai Pizza", type: "Main", image: "thaiPizza.png" },
//     { name: "Matcha Cheesecake", type: "Dessert", image: "matcha.png" },
//     { name: "Kimchi Quesadilla", type: "Appetizer", image: "kimchiQuesadilla.jpg" },
//     { name: "Ramen Burger", type: "Main", image: "ramenBurger.jpg" },
//   ],
//   vegan: [
//     { name: "Quinoa Bowl", type: "Main", image: "quinoa.jpg" },
//     { name: "Jackfruit Tacos", type: "Main", image: "jfTacos.jpg" },
//     { name: "Buddha Bowl", type: "Main", image: "buddha.png" },
//     { name: "Avocado Toast", type: "Appetizer", image: "avocado.jpg" },
//     { name: "Chia Pudding", type: "Dessert", image: "chia.png" },
//     { name: "Hummus Platter", type: "Appetizer", image: "hummus.png" },
//   ],
//   indian: [
//     { name: "Paneer Tikka", type: "Appetizer", image: "paneer.png" },
//     { name: "Biryani", type: "Main", image: "biryani.jpg" },
//     { name: "Butter Chicken", type: "Main", image: "butterChicken.jpg" },
//     { name: "Gulab Jamun", type: "Dessert", image: "gulabJamun.jpg" },
//     { name: "Samosa", type: "Appetizer", image: "samosa.jpeg" },
//     { name: "Dal Makhani", type: "Main", image: "dalMakhani.jpg" },
//   ],
//   coastal: [
//     { name: "Grilled Fish", type: "Main", image: "fish.jpg" },
//     { name: "Shrimp Scampi", type: "Main", image: "shrimp.jpeg" },
//     { name: "Crab Cakes", type: "Appetizer", image: "crab.png" },
//     { name: "Clam Chowder", type: "Appetizer", image: "clam.jpg" },
//     { name: "Lobster Roll", type: "Main", image: "lobster.jpg" },
//     { name: "Key Lime Pie", type: "Dessert", image: "key.png" },
//   ],
//   live_counter: [
//     { name: "Pasta Live Counter", type: "Main", image: "livePasta.jpg" },
//     { name: "Tandoor Grill Station", type: "Main", image: "tandoor.png" },
//     { name: "Chaat Counter", type: "Appetizer", image: "chaat.jpg" },
//     { name: "Dosa Live Station", type: "Main", image: "dosa.png" },
//     { name: "Dim Sum Counter", type: "Appetizer", image: "dimsum.png" },
//     { name: "Wok Stir-Fry Station", type: "Appetizer", image: "wok.png" },
//   ],
// };

// export default function MenuBuilder({ onNext }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const eventDetails = useEventStore((s) => s.eventDetails);

//   const menu = useEventStore((state) => state.menu);
//   const setMenuCuisine = useEventStore((state) => state.setMenuCuisine);
//   const addDishToPlate = useEventStore((state) => state.addDishToPlate);
//   const removeDishFromPlate = useEventStore((state) => state.removeDishFromPlate);
//   const currentStep = useEventStore((state) => state.currentStep);
//   const completeStep = useEventStore((state) => state.completeStep);
//   const setStep = useEventStore((state) => state.setStep);
//   const setActiveStep = useEventStore((state) => state.setActiveStep);

//   const [selectedCuisine, setSelectedCuisine] = useState(menu.selectedCuisine);
//   const plate = useEventStore((s) => s.menu.plate);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleDishDrop = (dish, cuisineId) => {
//     const newDish = {
//       id: `${cuisineId}-${dish.name}-${Date.now()}`,
//       name: dish.name,
//       cuisine: cuisines.find((c) => c.id === cuisineId)?.name || "",
//     };
//     addDishToPlate({
//       name: dish.name,
//       cuisine: cuisines.find((c) => c.id === cuisineId)?.name || "",
//     });
//   };

//   const removeDish = (dishId) => {
//     removeDishFromPlate(dishId);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     completeStep(currentStep);

//     setStep("timeline");
//     setActiveStep("timeline");

//     const nextRoute = getNextRoute(eventDetails, pathname);
//     router.push(nextRoute);
//   };

//   const hasHydrated = useEventStore((s) => s.hasHydrated);

//   if (!hasHydrated) return null;

//   return (
//     <div className="min-h-screen dark:bg-black">
//       <div
//         className="pt-20 px-8 min-h-screen"
//         style={{ backgroundColor: "var(--color-bg)" }}
//       >
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//           className="max-w-7xl mx-auto"
//         >
//           {/* HEADINGS (centered, unchanged) */}
//           <h1
//             style={{
//               fontFamily: "var(--font-serif)",
//               fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
//               color: "var(--color-dark)",
//               marginBottom: "1rem",
//               fontStyle: "italic",
//               textAlign: "center",
//             }}
//           >
//             Taste
//           </h1>

//           <p
//             style={{
//               fontFamily: "var(--font-body)",
//               fontSize: "1.125rem",
//               color: "var(--color-dark)",
//               opacity: 0.7,
//               textAlign: "center",
//               marginBottom: "2rem",
//             }}
//           >
//             Build your menu
//           </p>

//           {/* GRID LAYOUT */}
//           <div className="grid grid-cols-12 gap-8 mt-10">
            
//             {/* LEFT SIDE */}
//             <div className="col-span-8">

//               {/* Cuisine Selection */}
//               {!selectedCuisine && (
//                 <div className="grid grid-cols-3 gap-6 mb-12">
//                   {cuisines.map((cuisine, idx) => (
//                     <motion.button
//                       key={cuisine.id}
//                       onClick={() => setSelectedCuisine(cuisine.id)}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: idx * 0.08 }}
//                       whileHover={{ y: -8, scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       className="p-6 rounded-3xl"
//                       style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         backgroundColor: "var(--glass-fill)",
//                         border: "1px solid var(--glass-border)",
//                       }}
//                     >
//                       <div className="w-22 h-22 rounded-full mb-4 overflow-hidden flex items-center 
//                       justify-center border border-white/10 shadow-md">
//                         <img
//                           src={cuisine.color}
//                           alt={cuisine.name}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                       {cuisine.name}
//                     </motion.button>
//                   ))}
//                 </div>
//               )}

//               {/* Dishes */}
//               <AnimatePresence>
//                 {selectedCuisine && (
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="mb-12"
//                   >
//                     <div className="flex justify-between mb-6">
//                       <h3 className="font-bold font-dm text-xl">
//                         {cuisines.find((c) => c.id === selectedCuisine)?.name} Dishes
//                       </h3>

//                       <button
//                         className="flex items-center gap-1"
//                         onClick={() => setSelectedCuisine(null)}
//                       >
//                         <X size={16} /> Back
//                       </button>
//                     </div>

//                     <div className="grid grid-cols-3 gap-4">
//                       {dishesData[selectedCuisine]?.map((dish) => (
//                         <motion.button
//                           key={dish.name}
//                           onClick={() => handleDishDrop(dish, selectedCuisine)}
//                           whileHover={{ y: -6, scale: 1.02 }}
//                           whileTap={{ scale: 0.98 }}
//                           className="p-6 rounded-3xl flex flex-col items-center text-center"
//                           style={{
//                             backgroundColor: "var(--glass-fill)",
//                             border: "1px solid var(--glass-border)",
//                           }}
//                         >
//                           {/* ROUND IMAGE */}
//                           <div
//                             className="w-24 h-24 rounded-full overflow-hidden mb-4 
//                             border border-white/10 shadow-md"
//                           >
//                             <img
//                               src={`/food/${dish.image}`}
//                               alt={dish.name}
//                               className="w-full h-full object-cover"
//                             />
//                           </div>

//                           {/* TEXT */}
//                           <h4
//                             className="font-semibold"
//                             style={{
//                               color: "var(--color-dark)",
//                             }}
//                           >
//                             {dish.name}
//                           </h4>

//                           <span
//                             className="text-sm mt-1"
//                             style={{
//                               color: "var(--color-dark)",
//                               opacity: 0.6,
//                             }}
//                           >
//                             {dish.type}
//                           </span>
//                         </motion.button>
//                       ))}
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* RIGHT SIDE (STICKY PLATE) */}
//             <div className="col-span-4">
//               <div className="sticky top-24">

//                 <motion.div
//                   layout
//                   className="p-7 rounded-3xl w-full"
//                   style={{
//                     backgroundColor: "var(--glass-fill)",
//                     backdropFilter: "blur(3px)",
//                     border: "1.5px solid var(--color-primary)",
//                     boxShadow: "0 8px 32px rgba(98,117,76,0.25)",
//                   }}
//                 >
//                   <div className="flex flex-col items-start gap-4">

//                     <span
//                       style={{
//                         fontFamily: "var(--font-body)",
//                         fontSize: "0.95rem",
//                         fontWeight: 600,
//                         color: "var(--color-dark)",
//                       }}
//                     >
//                       Your Plate{" "}
//                       <span style={{ opacity: 0.6 }}>({plate.length})</span>
//                     </span>

//                     <div className="flex flex-wrap gap-2 items-start content-start">
//                       {plate.slice(0, 5).map((dish) => (
//                         <motion.div
//                           key={dish.id}
//                           layout
//                           initial={{ scale: 0.8, opacity: 0 }}
//                           animate={{ scale: 1, opacity: 1 }}
//                           exit={{ scale: 0.8, opacity: 0 }}
//                           transition={{ type: "spring", stiffness: 300, damping: 20 }}
//                           className="px-3 py-1.5 rounded-full flex items-center gap-2"
//                           style={{
//                             backgroundColor: "var(--color-primary)",
//                             color: "var(--color-bg)",
//                             fontSize: "0.85rem",
//                           }}
//                         >
//                           {dish.name}
//                           <button onClick={() => removeDish(dish.id)}>
//                             <X size={14} />
//                           </button>
//                         </motion.div>
//                       ))}
//                       {plate.length > 5 && (
//                         <button
//                           onClick={() => setIsModalOpen(true)}
//                           style={{
//                             fontFamily: "var(--font-body)",
//                             fontSize: "0.85rem",
//                             color: "var(--color-dark)",
//                             opacity: 0.7,
//                             alignSelf: "center",
//                             marginLeft: "4px",
//                             cursor: "pointer",
//                             fontWeight: 600,
//                           }}
//                         >
//                           +{plate.length - 5} more
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </motion.div>

//                 {/* CONTINUE */}
//                 <motion.button
//                   onClick={handleSubmit}
//                   className="w-full mt-6 px-8 py-5 rounded-full flex justify-center items-center gap-3"
//                   style={{
//                     backgroundColor: "var(--color-dark)",
//                     color: "var(--color-bg)",
//                   }}
//                 >
//                   Continue <ArrowRight size={20} />
//                 </motion.button>

//               </div>
//             </div>

//           </div>
//         </motion.div>
//       </div>
//       <AnimatePresence>
//   {isModalOpen && (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.18 }}
//       className="fixed inset-0 z-50 flex items-center justify-center px-6"
//       style={{
//         background: "rgba(0,0,0,0.45)",
//         backdropFilter: "blur(6px)",
//       }}
//       onClick={() => setIsModalOpen(false)}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: 10 }}
//         transition={{ duration: 0.2 }}
//         onClick={(e) => e.stopPropagation()}
//         className="w-full max-w-2xl rounded-3xl p-7"
//         style={{
//           backgroundColor: "#E7E7DF",
//           backdropFilter: "blur(10px)",
//           border: "1.5px solid var(--color-primary)",
//           boxShadow: "0 8px 32px rgba(98,117,76,0.18)",
//         }}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h2
//               style={{
//                 fontFamily: "var(--font-serif)",
//                 fontSize: "2rem",
//                 fontStyle: "italic",
//                 color: "var(--color-dark)",
//               }}
//             >
//               Your Plate
//             </h2>

//             <p
//               style={{
//                 fontFamily: "var(--font-body)",
//                 fontSize: "0.9rem",
//                 opacity: 0.6,
//                 marginTop: "2px",
//               }}
//             >
//               {plate.length} selected dishes
//             </p>
//           </div>

//           <button
//             onClick={() => setIsModalOpen(false)}
//             className="w-9 h-9 rounded-full flex items-center justify-center"
//             style={{
//               backgroundColor: "rgba(98,117,76,0.12)",
//               color: "var(--color-dark)",
//             }}
//           >
//             <X size={18} />
//           </button>
//         </div>

//         {/* Pills */}
//         <div className="flex flex-wrap gap-3">
//           {plate.map((dish) => (
//             <div
//               key={dish.id}
//               className="px-4 py-2 rounded-full flex items-center gap-3"
//               style={{
//                 backgroundColor: "var(--color-primary)",
//                 color: "var(--color-bg)",
//               }}
//             >
//               <div className="flex flex-col leading-tight">
//                 <span
//                   style={{
//                     fontSize: "0.92rem",
//                     fontWeight: 600,
//                   }}
//                 >
//                   {dish.name}
//                 </span>

//                 <span
//                   style={{
//                     fontSize: "0.72rem",
//                     opacity: 0.7,
//                   }}
//                 >
//                   {dish.cuisine}
//                 </span>
//               </div>

//               <button
//                 onClick={() => removeDish(dish.id)}
//                 className="flex items-center justify-center"
//                 style={{
//                   opacity: 0.7,
//                 }}
//               >
//                 <X size={14} />
//               </button>
//             </div>
//           ))}
//         </div>
//       </motion.div>
//     </motion.div>
//   )}
// </AnimatePresence>
//     </div>
//   );
// }

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { ArrowRight, X, ChevronLeft } from "lucide-react";
import { useEventStore } from "@/store/useEventStore";
import { getNextRoute } from "@/lib/eventFlow";
import { useRouter, usePathname } from "next/navigation";

// ── Dish price estimates (per person, in ₹) ───────────────────────────────────
const DISH_PRICE = {
  // Italian
  "Margherita Pizza":   180, "Pasta Carbonara": 220, "Caprese Salad":   120,
  "Tiramisu":           160, "Bruschetta":       90,  "Risotto":         250,
  // Fusion
  "Korean Tacos":       200, "Sushi Burrito":   280, "Thai Pizza":      210,
  "Matcha Cheesecake":  180, "Kimchi Quesadilla":170, "Ramen Burger":   260,
  // Vegan
  "Quinoa Bowl":        150, "Jackfruit Tacos": 160, "Buddha Bowl":    170,
  "Avocado Toast":      130, "Chia Pudding":    110,  "Hummus Platter": 120,
  // Indian
  "Paneer Tikka":       180, "Biryani":         220, "Butter Chicken": 240,
  "Gulab Jamun":        80,  "Samosa":           60,  "Dal Makhani":   190,
  // Coastal
  "Grilled Fish":       300, "Shrimp Scampi":   340, "Crab Cakes":    280,
  "Clam Chowder":       200, "Lobster Roll":    420,  "Key Lime Pie":  140,
  // Live counter
  "Pasta Live Counter": 260, "Tandoor Grill Station": 300, "Chaat Counter": 100,
  "Dosa Live Station":  120, "Dim Sum Counter":  180,  "Wok Stir-Fry Station": 160,
};

const cuisines = [
  { id: "italian",      name: "Italian",      color: "/cuisines/italian.jpg" },
  { id: "fusion",       name: "Fusion",       color: "/cuisines/fusion.jpg" },
  { id: "vegan",        name: "Vegan",        color: "/cuisines/vegan.png" },
  { id: "indian",       name: "Indian",       color: "/cuisines/indian.jpg" },
  { id: "coastal",      name: "Coastal",      color: "/cuisines/coastal.png" },
  { id: "live_counter", name: "Live Counter", color: "/cuisines/live_counter.jpg" },
];

const dishesData = {
  italian:      [
    { name: "Margherita Pizza",  type: "Main",      image: "margherita.jpg" },
    { name: "Pasta Carbonara",   type: "Main",      image: "pasta.jpg" },
    { name: "Caprese Salad",     type: "Appetizer", image: "caprese.jpeg" },
    { name: "Tiramisu",          type: "Dessert",   image: "tiramisu.png" },
    { name: "Bruschetta",        type: "Appetizer", image: "bruschetta.jpg" },
    { name: "Risotto",           type: "Main",      image: "risotto.png" },
  ],
  fusion:       [
    { name: "Korean Tacos",      type: "Appetizer", image: "koreanTaco.png" },
    { name: "Sushi Burrito",     type: "Main",      image: "sushiBurrito.jpg" },
    { name: "Thai Pizza",        type: "Main",      image: "thaiPizza.png" },
    { name: "Matcha Cheesecake", type: "Dessert",   image: "matcha.png" },
    { name: "Kimchi Quesadilla", type: "Appetizer", image: "kimchiQuesadilla.jpg" },
    { name: "Ramen Burger",      type: "Main",      image: "ramenBurger.jpg" },
  ],
  vegan:        [
    { name: "Quinoa Bowl",       type: "Main",      image: "quinoa.jpg" },
    { name: "Jackfruit Tacos",   type: "Main",      image: "jfTacos.jpg" },
    { name: "Buddha Bowl",       type: "Main",      image: "buddha.png" },
    { name: "Avocado Toast",     type: "Appetizer", image: "avocado.jpg" },
    { name: "Chia Pudding",      type: "Dessert",   image: "chia.png" },
    { name: "Hummus Platter",    type: "Appetizer", image: "hummus.png" },
  ],
  indian:       [
    { name: "Paneer Tikka",      type: "Appetizer", image: "paneer.png" },
    { name: "Biryani",           type: "Main",      image: "biryani.jpg" },
    { name: "Butter Chicken",    type: "Main",      image: "butterChicken.jpg" },
    { name: "Gulab Jamun",       type: "Dessert",   image: "gulabJamun.jpg" },
    { name: "Samosa",            type: "Appetizer", image: "samosa.jpeg" },
    { name: "Dal Makhani",       type: "Main",      image: "dalMakhani.jpg" },
  ],
  coastal:      [
    { name: "Grilled Fish",      type: "Main",      image: "fish.jpg" },
    { name: "Shrimp Scampi",     type: "Main",      image: "shrimp.jpeg" },
    { name: "Crab Cakes",        type: "Appetizer", image: "crab.png" },
    { name: "Clam Chowder",      type: "Appetizer", image: "clam.jpg" },
    { name: "Lobster Roll",      type: "Main",      image: "lobster.jpg" },
    { name: "Key Lime Pie",      type: "Dessert",   image: "key.png" },
  ],
  live_counter: [
    { name: "Pasta Live Counter",       type: "Main",      image: "livePasta.jpg" },
    { name: "Tandoor Grill Station",    type: "Main",      image: "tandoor.png" },
    { name: "Chaat Counter",            type: "Appetizer", image: "chaat.jpg" },
    { name: "Dosa Live Station",        type: "Main",      image: "dosa.png" },
    { name: "Dim Sum Counter",          type: "Appetizer", image: "dimsum.png" },
    { name: "Wok Stir-Fry Station",     type: "Appetizer", image: "wok.png" },
  ],
};

// ── SVG ring ──────────────────────────────────────────────────────────────────
function BudgetRing({ spentL, budgetL, guests }) {
  //const ratio     = budgetL > 0 ? Math.min(spentL / budgetL, 1) : 0;
  const isOver    = budgetL > 0 && spentL > budgetL;
  const rawRatio = budgetL > 0 ? spentL / budgetL : 0;
const ratio = Math.min(rawRatio, 1);
const overage = rawRatio > 1;
  const pct = Math.round(rawRatio * 100);
  const R         = 52, stroke = 5;
  const circ      = 2 * Math.PI * R;
  const dash      = circ * ratio;

  const color = isOver
    ? "#C0392B"
    : ratio > 0.85
    ? "#C9A84C"
    : "var(--color-primary, #58644B)";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div style={{ position: "relative", width: 120, height: 120 }}>
        <svg width={120} height={120} style={{ transform: "rotate(-90deg)" }}>
          {/* track */}
          <circle cx={60} cy={60} r={R} fill="none"
            stroke="rgba(20,24,42,0.07)" strokeWidth={stroke} />
          {/* fill */}
          <motion.circle
  cx={60}
  cy={60}
  r={R}
  fill="none"
  stroke={color}
  strokeWidth={stroke}
  strokeLinecap="round"
  strokeDasharray={`${circ} ${circ}`}
  initial={{ strokeDashoffset: circ }}
  animate={{
    strokeDashoffset: circ - circ * ratio,
  }}
  transition={{
    duration: 0.6,
    ease: [0.16, 1, 0.3, 1],
  }}
/>
        </svg>

        {/* center */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 1,
        }}>
          <span style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: 17, fontWeight: 700,
            color, lineHeight: 1,
          }}>{pct}%</span>
          <span style={{
            fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
            fontSize: 8.5, fontWeight: 600,
            color: "rgba(20,24,42,0.35)",
            letterSpacing: "0.06em", textTransform: "uppercase",
          }}>
            {isOver ? "over" : "used"}
          </span>
        </div>
      </div>

      {/* labels below ring */}
      <div style={{ textAlign: "center" }}>
        <p style={{
          fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
          fontSize: 12, fontWeight: 700,
          color: "var(--color-dark, #14182A)",
          lineHeight: 1,
        }}>
          ₹{spentL.toFixed(1)}L
          <span style={{ fontWeight: 400, color: "rgba(20,24,42,0.35)" }}>
            {" "}/ ₹{budgetL.toFixed(1)}L
          </span>
        </p>
        <p style={{
          fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
          fontSize: 10, color: "rgba(20,24,42,0.35)", marginTop: 2,
        }}>
          est. for {guests} guests
        </p>
      </div>

      {/* status tag */}
      <div style={{
        padding: "0px 10px 3px 10px",
        borderRadius: 99,
        background: isOver
          ? "rgba(192,57,43,0.1)"
          : ratio > 0.85
          ? "rgba(201,168,76,0.12)"
          : "#E7E7DF",
        border: `1px solid ${isOver ? "rgba(192,57,43,0.2)" : ratio > 0.85 ? "rgba(201,168,76,0.25)" : "#E7E7DF"}`,
      }}>
        <span style={{
          fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
          fontSize: 10, fontWeight: 600,
          color: isOver ? "#C0392B" : ratio > 0.85 ? "#7A5E1A" : "var(--color-primary, #58644B)",
        }}>
          {isOver
            ? `₹${(spentL - budgetL).toFixed(1)}L over budget`
            : `₹${(budgetL - spentL).toFixed(1)}L remaining`}
        </span>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function MenuBuilder({ onNext }) {
  const router   = useRouter();
  const pathname = usePathname();

  const eventDetails        = useEventStore((s) => s.eventDetails);
  const menu                = useEventStore((s) => s.menu);
  const addDishToPlate      = useEventStore((s) => s.addDishToPlate);
  const removeDishFromPlate = useEventStore((s) => s.removeDishFromPlate);
  const currentStep         = useEventStore((s) => s.currentStep);
  const completeStep        = useEventStore((s) => s.completeStep);
  const setStep             = useEventStore((s) => s.setStep);
  const setActiveStep       = useEventStore((s) => s.setActiveStep);
  const hasHydrated         = useEventStore((s) => s.hasHydrated);

  // Budget data from store
  const budget       = useEventStore((s) => s.budget);
  const getSummaryData = useEventStore((s) => s.getSummaryData);
  const summaryData  = getSummaryData();

  const totalBudgetL = Number(summaryData?.budget || 0);           // e.g. 10 lakhs
  const foodPct      = budget?.allocations?.food || 30;             // e.g. 30%
  const foodBudgetL  = (foodPct / 100) * totalBudgetL;             // e.g. 3 lakhs
  const guestCount   = Number(eventDetails?.guestCount || summaryData?.guestCount || 100);

  const plate = useEventStore((s) => s.menu.plate);

  const [selectedCuisine, setSelectedCuisine] = useState(menu.selectedCuisine || null);
  const [isModalOpen, setIsModalOpen]         = useState(false);

  const removeDish = (dishId) => {
    removeDishFromPlate(dishId);
  };

  // ── Calculate spent amount from plate ─────────────────────────────────────
  const { spentRupees, spentL } = useMemo(() => {
    const total = plate.reduce((sum, dish) => {
      const pricePerHead = DISH_PRICE[dish.name] || 150;
      return sum + pricePerHead * guestCount;
    }, 0);
    return { spentRupees: total, spentL: total / 100000 };
  }, [plate, guestCount]);

  const isOverBudget = spentL > foodBudgetL;

  const isDishOnPlate = (dishName) => plate.some((d) => d.name === dishName);

  const handleDishToggle = (dish, cuisineId) => {
    if (isDishOnPlate(dish.name)) {
      const existing = plate.find((d) => d.name === dish.name);
      if (existing) removeDishFromPlate(existing.id);
    } else {
      addDishToPlate({
        name: dish.name,
        cuisine: cuisines.find((c) => c.id === cuisineId)?.name || "",
      });
    }
  };

  const handleSubmit = () => {
    completeStep(currentStep);
    setStep("timeline");
    setActiveStep("timeline");
    router.push(getNextRoute(eventDetails, pathname));
  };

  if (!hasHydrated) return null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-bg, #E7E7DF)" }}>
        

      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div style={{
          position: "absolute", top: "-10%", right: "-5%",
          width: 450, height: 450, borderRadius: "50%",
          background: "radial-gradient(circle, #E7E7DF, transparent 70%)",
          filter: "blur(60px)",
        }} />
      </div>

      <div className="relative flex pt-28 pb-1 px-6" style={{ zIndex: 1 }}>
        <div className="flex-[2] flex flex-col items-center" style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* ── Header ──────────────────────────────────────────────────── */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 style={{
              fontFamily: "var(--font-display, Georgia, serif)",
              fontSize: "clamp(3rem, 7vw, 3.5rem)",
              fontWeight: 500, fontStyle: "italic",
              color: "var(--color-dark, #14182A)",
              lineHeight: 0.95, letterSpacing: "-0.025em",
              marginBottom: "0.5rem",
              textAlign: "center",
            }}>Taste</h1>
            <p style={{
              fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
              fontSize: "0.9rem", color: "rgba(20,24,42,0.4)",
            }}>
              {selectedCuisine
                ? `${cuisines.find((c) => c.id === selectedCuisine)?.name} · Select dishes for your plate`
                : "Choose a cuisine to begin"}
            </p>
          </motion.div>

          {/* ── Main grid ───────────────────────────────────────────────── */}
          <div style={{ display: "grid", width: "90%" }}>

            {/* ── LEFT: cuisine / dish selection ──────────────────────── */}
            <div>
              <AnimatePresence mode="wait">

                {/* Cuisine grid */}
                {!selectedCuisine && (
                  <motion.div
                    key="cuisines"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}
                  >
                    {cuisines.map((cuisine, idx) => (
                      <motion.button
                        key={cuisine.id}
                        onClick={() => setSelectedCuisine(cuisine.id)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          display: "flex", flexDirection: "column",
                          alignItems: "center", justifyContent: "center",
                          padding: "28px 16px",
                          //background: "rgba(20,24,42,0.025)",
                          //border: "1px solid rgba(20,24,42,0.08)",
                          borderRadius: 20,
                          cursor: "pointer",
                          gap: 14,
                          //transition: "border-color 0.2s, box-shadow 0.2s",
                        }}
                        // onMouseEnter={(e) => {
                        //   e.currentTarget.style.borderColor = "rgba(98,117,76,0.3)";
                        //   e.currentTarget.style.boxShadow = "0 4px 20px rgba(98,117,76,0.08)";
                        // }}
                        // onMouseLeave={(e) => {
                        //   e.currentTarget.style.borderColor = "rgba(20,24,42,0.08)";
                        //   e.currentTarget.style.boxShadow = "none";
                        // }}
                      >
                        <div style={{
                          width: 92, height: 92, borderRadius: "50%",
                          overflow: "hidden",
                          border: "1px solid rgba(20,24,42,0.08)",
                          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                        }}>
                          <img src={cuisine.color} alt={cuisine.name}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <span style={{
                          fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
                          fontSize: 14, fontWeight: 600,
                          color: "var(--color-dark, #14182A)",
                        }}>{cuisine.name}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}

                {/* Dish grid */}
                {selectedCuisine && (
                  <motion.div
                    key="dishes"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Back */}
                    <button
                      onClick={() => setSelectedCuisine(null)}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        marginBottom: 20,
                        fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
                        fontSize: 13, fontWeight: 600,
                        color: "rgba(20,24,42,0.45)",
                        background: "none", border: "none", cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      <ChevronLeft size={15} /> All cuisines
                    </button>

                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: 14,
                    }}>
                      {dishesData[selectedCuisine]?.map((dish, idx) => {
                        const onPlate = isDishOnPlate(dish.name);
                        const pricePerHead = DISH_PRICE[dish.name] || 150;
                        const dishTotal = (pricePerHead * guestCount) / 100000;

                        return (
                          <motion.button
                            key={dish.name}
                            onClick={() => handleDishToggle(dish, selectedCuisine)}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                              display: "flex", flexDirection: "column",
                              alignItems: "center", padding: "20px 14px",
                              // background: onPlate
                              //   ? "rgba(98,117,76,0.08)"
                              //   : "rgba(20,24,42,0.025)",
                              // border: `1px solid ${onPlate ? "rgba(98,117,76,0.35)" : "rgba(20,24,42,0.08)"}`,
                              // borderRadius: 18, cursor: "pointer", gap: 10,
                              position: "relative",
                              transition: "all 0.2s ease",
                              // boxShadow: onPlate ? "0 4px 16px rgba(98,117,76,0.1)" : "none",
                            }}
                          >
                            {/* Selected tick */}
                            {onPlate && (
                              <div style={{
                                position: "absolute", top: 15, right: 50,
                                width: 18, height: 18, borderRadius: "50%",
                                background: "var(--color-primary, #58644B)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                              }}>
                                <svg width={10} height={10} viewBox="0 0 10 10">
                                  <path d="M2 5l2 2 4-4" stroke="white" strokeWidth={1.8}
                                    strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                </svg>
                              </div>
                            )}

                            {/* Image */}
                            <div style={{
                              width: 94, height: 94, borderRadius: "50%",
                              overflow: "hidden",
                              border: `1.5px solid ${onPlate ? "#E7E7DF" : "rgba(20,24,42,0.08)"}`,
                              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                            }}>
                              <img src={`/food/${dish.image}`} alt={dish.name}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </div>

                            {/* Text */}
                            <div style={{ textAlign: "center" }}>
                              <p style={{
                                fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
                                fontSize: 13, fontWeight: 600,
                                color: "var(--color-dark, #14182A)",
                                lineHeight: 1.3, marginBottom: 2,
                              }}>{dish.name}</p>
                              <p style={{
                                fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
                                fontSize: 10, fontWeight: 500,
                                color: "rgba(20,24,42,0.35)",
                                textTransform: "uppercase", letterSpacing: "0.06em",
                              }}>{dish.type}</p>
                            </div>

                            {/* Per-dish cost estimate */}
                            <div style={{
                              padding: "3px 8px", borderRadius: 99,
                              paddingTop:0,
                              background: "rgba(20,24,42,0.04)",
                              border: "1px solid rgba(20,24,42,0.07)",
                            }}>
                              <span style={{
                                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                                fontSize: 9.5, fontWeight: 600,
                                color: "rgba(20,24,42,0.4)",
                              }}>
                                ₹{pricePerHead}/head · ₹{dishTotal.toFixed(1)}L total
                              </span>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        {/* ── RIGHT: sticky panel ──────────────────────────────────── */}
            <div className="flex-[1]" style={{ position: "sticky", top: 88 }}>

              {/* Budget ring card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.55 }}
                style={{
                  padding: "24px 20px",
                  // background: "rgba(20,24,42,0.025)",
                  //border: "1px solid rgba(20,24,42,0.09)",
                  borderRadius: 20,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <BudgetRing
                  spentL={spentL}
                  budgetL={foodBudgetL}
                  guests={guestCount}
                />
              </motion.div>

              {/* RIGHT SIDE (STICKY PLATE) */}
             <div className="col-span-4">
               <div className="sticky top-24">

                 <motion.div
                  layout
                  className="p-7 rounded-3xl w-full"
                  style={{
                    backgroundColor: "var(--glass-fill)",
                    backdropFilter: "blur(3px)",
                    border: "1.5px solid var(--color-primary)",
                    boxShadow: "0 8px 32px #E7E7DF",
                  }}
                >
                  <div className="flex flex-col items-start gap-4">

                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        color: "var(--color-dark)",
                      }}
                    >
                      Your Plate{" "}
                      <span style={{ opacity: 0.6 }}>({plate.length})</span>
                    </span>

                    <div className="flex flex-wrap gap-2 items-start content-start">
                      {plate.slice(0, 5).map((dish) => (
                        <motion.div
                          key={dish.id}
                          layout
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="px-3 py-1.5 rounded-full flex items-center gap-2"
                          style={{
                            backgroundColor: "var(--color-primary)",
                            color: "var(--color-bg)",
                            fontSize: "0.85rem",
                          }}
                        >
                          {dish.name}
                          <button onClick={() => removeDish(dish.id)}>
                            <X size={14} />
                          </button>
                        </motion.div>
                      ))}
                      {plate.length > 5 && (
                        <button
                          onClick={() => setIsModalOpen(true)}
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "0.85rem",
                            color: "var(--color-dark)",
                            opacity: 0.7,
                            alignSelf: "center",
                            marginLeft: "4px",
                            cursor: "pointer",
                            fontWeight: 600,
                          }}
                        >
                          +{plate.length - 5} more
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* CONTINUE */}
                {/* <motion.button
                  onClick={handleSubmit}
                  className="w-[25vw] mx-auto mt-6 px-8 py-5 rounded-full flex justify-center items-center gap-3"
                  style={{
                    backgroundColor: "var(--color-dark)",
                    color: "var(--color-bg)",
                  }}
                >
                  Continue <ArrowRight size={20} />
                </motion.button> */}
                <motion.button
                  onClick={handleSubmit}
                  disabled={isOverBudget}
                  className="w-[25vw] mx-auto mt-6 px-8 py-5 rounded-full flex justify-center items-center gap-3"
                  style={{
                    backgroundColor: isOverBudget
                      ? "rgba(20,24,42,0.4)"
                      : "var(--color-dark)",
                    color: "var(--color-bg)",
                    cursor: isOverBudget ? "not-allowed" : "pointer",
                    opacity: isOverBudget ? 0.6 : 1,
                  }}
                >
                  Continue <ArrowRight size={20} />
                </motion.button>

              </div>
            </div>
            </div>
      </div>

      {/* ── Full plate modal ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-6"
            style={{ background: "rgba(20,24,42,0.5)", backdropFilter: "blur(8px)" }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%", maxWidth: 520,
                background: "var(--color-bg, #E7E7DF)",
                border: "1px solid rgba(20,24,42,0.1)",
                borderRadius: 24,
                boxShadow: "0 32px 80px rgba(0,0,0,0.2)",
                overflow: "hidden",
              }}
            >
              {/* accent top */}
              <div style={{ height: 3, background: "linear-gradient(90deg, var(--color-primary, #58644B), #8BA672)" }} />

              <div style={{ padding: "24px 28px 28px" }}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 style={{
                      fontFamily: "var(--font-display, Georgia, serif)",
                      fontSize: "1.6rem", fontWeight: 700, fontStyle: "italic",
                      color: "var(--color-dark, #14182A)",
                    }}>Your Plate</h2>
                    <p style={{
                      fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
                      fontSize: "0.85rem", color: "rgba(20,24,42,0.4)", marginTop: 2,
                    }}>{plate.length} dishes · ₹{spentL.toFixed(1)}L est.</p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    style={{
                      width: 32, height: 32, borderRadius: "50%",
                      background: "rgba(20,24,42,0.06)",
                      border: "1px solid rgba(20,24,42,0.1)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <X size={14} style={{ color: "rgba(20,24,42,0.5)" }} />
                  </button>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {plate.map((dish) => {
                    const p = DISH_PRICE[dish.name] || 150;
                    return (
                      <div
                        key={dish.id}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "8px 14px",
                          backgroundColor: "var(--color-primary)",
                          color: "var(--color-bg)",
                          borderRadius: 999,
                        }}
                      >
                        <div>
                          <p style={{
                            fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
                            fontSize: 13, fontWeight: 600,
                            color: "var(--color-bg)"
                          }}>{dish.name}</p>
                          <p style={{
                            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                            fontSize: 10, color: "rgba(253,253,248,0.75)",
                          }}>₹{p}/head</p>
                        </div>
                        <button
                          onClick={() => removeDishFromPlate(dish.id)}
                          style={{
                            width: 22, height: 22, borderRadius: "50%",
                            background: "rgba(255,255,255,0.12)",
                            border: "1px solid rgba(255,255,255,0.15)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "pointer",
                          }}
                        >
                          <X size={10} style={{ color: "var(--color-bg)" }} />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* total row */}
                <div style={{
                  marginTop: 20, paddingTop: 16,
                  borderTop: "1px solid rgba(20,24,42,0.08)",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <span style={{
                    fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
                    fontSize: 13, fontWeight: 600, color: "rgba(20,24,42,0.45)",
                  }}>Total estimate</span>
                  <span style={{
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: 16, fontWeight: 700,
                    color: spentL > foodBudgetL ? "#C0392B" : "var(--color-primary, #58644B)",
                  }}>₹{spentL.toFixed(1)}L</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import { useState, useMemo } from "react";
// import { ArrowRight, X } from "lucide-react";
// import { useEventStore } from "@/store/useEventStore";
// import ProgressMap from "@/components/ProgressMap";

// import { getNextRoute } from "@/lib/eventFlow";
// import { useRouter, usePathname } from "next/navigation";

// // ── Dish price estimates (per person, in ₹) ───────────────────────────────────
// const DISH_PRICE = {
//   "Margherita Pizza": 180, "Pasta Carbonara": 220, "Caprese Salad": 120,
//   "Tiramisu": 160, "Bruschetta": 90, "Risotto": 250,
//   "Korean Tacos": 200, "Sushi Burrito": 280, "Thai Pizza": 210,
//   "Matcha Cheesecake": 180, "Kimchi Quesadilla": 170, "Ramen Burger": 260,
//   "Quinoa Bowl": 150, "Jackfruit Tacos": 160, "Buddha Bowl": 170,
//   "Avocado Toast": 130, "Chia Pudding": 110, "Hummus Platter": 120,
//   "Paneer Tikka": 180, "Biryani": 220, "Butter Chicken": 240,
//   "Gulab Jamun": 80, "Samosa": 60, "Dal Makhani": 190,
//   "Grilled Fish": 300, "Shrimp Scampi": 340, "Crab Cakes": 280,
//   "Clam Chowder": 200, "Lobster Roll": 420, "Key Lime Pie": 140,
//   "Pasta Live Counter": 260, "Tandoor Grill Station": 300, "Chaat Counter": 100,
//   "Dosa Live Station": 120, "Dim Sum Counter": 180, "Wok Stir-Fry Station": 160,
// };

// const cuisines = [
//   { id: "italian", name: "Italian", color: "/cuisines/italian.jpg" },
//   { id: "fusion", name: "Fusion", color: "/cuisines/fusion.jpg" },
//   { id: "vegan", name: "Vegan", color: "/cuisines/vegan.png" },
//   { id: "indian", name: "Indian", color: "/cuisines/indian.jpg" },
//   { id: "coastal", name: "Coastal", color: "/cuisines/coastal.png" },
//   { id: "live_counter", name: "Live Counter", color: "/cuisines/live_counter.jpg" },
// ];

// const dishesData = {
//   italian: [
//     { name: "Margherita Pizza", type: "Main", image: "margherita.jpg" },
//     { name: "Pasta Carbonara", type: "Main", image: "pasta.jpg" },
//     { name: "Caprese Salad", type: "Appetizer", image: "caprese.jpeg" },
//     { name: "Tiramisu", type: "Dessert", image: "tiramisu.png" },
//     { name: "Bruschetta", type: "Appetizer", image: "bruschetta.jpg" },
//     { name: "Risotto", type: "Main", image: "risotto.png" },
//   ],
//   fusion: [
//     { name: "Korean Tacos", type: "Appetizer", image: "koreanTaco.png" },
//     { name: "Sushi Burrito", type: "Main", image: "sushiBurrito.jpg" },
//     { name: "Thai Pizza", type: "Main", image: "thaiPizza.png" },
//     { name: "Matcha Cheesecake", type: "Dessert", image: "matcha.png" },
//     { name: "Kimchi Quesadilla", type: "Appetizer", image: "kimchiQuesadilla.jpg" },
//     { name: "Ramen Burger", type: "Main", image: "ramenBurger.jpg" },
//   ],
//   vegan: [
//     { name: "Quinoa Bowl", type: "Main", image: "quinoa.jpg" },
//     { name: "Jackfruit Tacos", type: "Main", image: "jfTacos.jpg" },
//     { name: "Buddha Bowl", type: "Main", image: "buddha.png" },
//     { name: "Avocado Toast", type: "Appetizer", image: "avocado.jpg" },
//     { name: "Chia Pudding", type: "Dessert", image: "chia.png" },
//     { name: "Hummus Platter", type: "Appetizer", image: "hummus.png" },
//   ],
//   indian: [
//     { name: "Paneer Tikka", type: "Appetizer", image: "paneer.png" },
//     { name: "Biryani", type: "Main", image: "biryani.jpg" },
//     { name: "Butter Chicken", type: "Main", image: "butterChicken.jpg" },
//     { name: "Gulab Jamun", type: "Dessert", image: "gulabJamun.jpg" },
//     { name: "Samosa", type: "Appetizer", image: "samosa.jpeg" },
//     { name: "Dal Makhani", type: "Main", image: "dalMakhani.jpg" },
//   ],
//   coastal: [
//     { name: "Grilled Fish", type: "Main", image: "fish.jpg" },
//     { name: "Shrimp Scampi", type: "Main", image: "shrimp.jpeg" },
//     { name: "Crab Cakes", type: "Appetizer", image: "crab.png" },
//     { name: "Clam Chowder", type: "Appetizer", image: "clam.jpg" },
//     { name: "Lobster Roll", type: "Main", image: "lobster.jpg" },
//     { name: "Key Lime Pie", type: "Dessert", image: "key.png" },
//   ],
//   live_counter: [
//     { name: "Pasta Live Counter", type: "Main", image: "livePasta.jpg" },
//     { name: "Tandoor Grill Station", type: "Main", image: "tandoor.png" },
//     { name: "Chaat Counter", type: "Appetizer", image: "chaat.jpg" },
//     { name: "Dosa Live Station", type: "Main", image: "dosa.png" },
//     { name: "Dim Sum Counter", type: "Appetizer", image: "dimsum.png" },
//     { name: "Wok Stir-Fry Station", type: "Appetizer", image: "wok.png" },
//   ],
// };

// // ── Food Budget Card ──────────────────────────────────────────────────────────
// function FoodBudgetCard({ spentL, budgetL, guests }) {
//   const ratio  = budgetL > 0 ? Math.min(spentL / budgetL, 1) : 0;
//   const isOver = budgetL > 0 && spentL > budgetL;
//   const pct    = Math.round(ratio * 100);

//   const R     = 32, stroke = 4;
//   const circ  = 2 * Math.PI * R;
//   const dash  = circ * ratio;

//   const ringColor = isOver
//     ? "#C0392B"
//     : ratio > 0.85
//     ? "#C9A84C"
//     : "#58644B";

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 8 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//       className="p-4 rounded-2xl mb-4"
//       style={{
//         backgroundColor: "var(--glass-fill)",
//         border: "1px solid var(--glass-border)",
//       }}
//     >
//       {/* Header row */}
//       <div className="flex items-center justify-between mb-3">
//         <span
//           style={{
//             fontFamily: "var(--font-body)",
//             fontSize: "0.8rem",
//             fontWeight: 600,
//             color: "var(--color-dark)",
//             opacity: 0.6,
//           }}
//         >
//           Food Budget
//         </span>

//         {/* mini ring */}
//         <div style={{ position: "relative", width: 44, height: 44 }}>
//           <svg width={44} height={44} style={{ transform: "rotate(-90deg)" }}>
//             <circle cx={22} cy={22} r={R} fill="none"
//               stroke="rgba(20,24,42,0.08)" strokeWidth={stroke} />
//             <motion.circle
//               cx={22} cy={22} r={R} fill="none"
//               stroke={ringColor}
//               strokeWidth={stroke}
//               strokeLinecap="round"
//               strokeDasharray={circ}
//               animate={{ strokeDashoffset: circ - dash }}
//               transition={{ duration: 0.4, ease: "easeOut" }}
//               style={{ strokeDashoffset: circ - dash }}
//             />
//           </svg>
//           <div style={{
//             position: "absolute", inset: 0,
//             display: "flex", alignItems: "center", justifyContent: "center",
//           }}>
//             <span style={{
//               fontFamily: "var(--font-body)",
//               fontSize: 9, fontWeight: 700,
//               color: ringColor,
//             }}>{pct}%</span>
//           </div>
//         </div>
//       </div>

//       {/* Spent / Budget */}
//       <div className="flex items-end justify-between">
//         <div>
//           <p style={{
//             fontFamily: "var(--font-body)",
//             fontSize: "1.1rem",
//             fontWeight: 700,
//             color: isOver ? "#C0392B" : "var(--color-dark)",
//             lineHeight: 1,
//           }}>
//             ₹{spentL.toFixed(1)}L
//           </p>
//           <p style={{
//             fontFamily: "var(--font-body)",
//             fontSize: "0.72rem",
//             color: "var(--color-dark)",
//             opacity: 0.4,
//             marginTop: 2,
//           }}>
//             of ₹{budgetL.toFixed(1)}L · {guests} guests
//           </p>
//         </div>

//         {/* status pill */}
//         <span style={{
//           padding: "3px 8px",
//           borderRadius: 99,
//           fontSize: "0.68rem",
//           fontWeight: 600,
//           fontFamily: "var(--font-body)",
//           background: isOver
//             ? "rgba(192,57,43,0.1)"
//             : ratio > 0.85
//             ? "rgba(201,168,76,0.12)"
//             : "rgba(98,117,76,0.1)",
//           color: isOver ? "#C0392B" : ratio > 0.85 ? "#7A5E1A" : "#58644B",
//         }}>
//           {isOver
//             ? `+₹${(spentL - budgetL).toFixed(1)}L over`
//             : `₹${(budgetL - spentL).toFixed(1)}L left`}
//         </span>
//       </div>

//       {/* bar */}
//       <div className="mt-3 h-1.5 rounded-full overflow-hidden"
//         style={{ background: "rgba(20,24,42,0.07)" }}>
//         <motion.div
//           className="h-full rounded-full"
//           animate={{ width: `${pct}%`, backgroundColor: ringColor }}
//           transition={{ duration: 0.35 }}
//         />
//       </div>
//     </motion.div>
//   );
// }

// // ── Main ──────────────────────────────────────────────────────────────────────
// export default function MenuBuilder({ onNext }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const eventDetails = useEventStore((s) => s.eventDetails);

//   const menu = useEventStore((state) => state.menu);
//   const setMenuCuisine = useEventStore((state) => state.setMenuCuisine);
//   const addDishToPlate = useEventStore((state) => state.addDishToPlate);
//   const removeDishFromPlate = useEventStore((state) => state.removeDishFromPlate);
//   const currentStep = useEventStore((state) => state.currentStep);
//   const completeStep = useEventStore((state) => state.completeStep);
//   const setStep = useEventStore((state) => state.setStep);
//   const setActiveStep = useEventStore((state) => state.setActiveStep);

//   const [selectedCuisine, setSelectedCuisine] = useState(menu.selectedCuisine);
//   const plate = useEventStore((s) => s.menu.plate);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // ── Budget data ──────────────────────────────────────────────────────────
//   const budget         = useEventStore((s) => s.budget);
//   const getSummaryData = useEventStore((s) => s.getSummaryData);
//   const summaryData    = getSummaryData();
//   const totalBudgetL   = Number(summaryData?.budget || 0);
//   const foodPct        = budget?.allocations?.food || 30;
//   const foodBudgetL    = (foodPct / 100) * totalBudgetL;
//   const guestCount     = Number(eventDetails?.guestCount || summaryData?.guestCount || 100);

//   const spentL = useMemo(() => {
//     const total = plate.reduce((sum, dish) => {
//       return sum + (DISH_PRICE[dish.name] || 150) * guestCount;
//     }, 0);
//     return total / 100000;
//   }, [plate, guestCount]);

//   const handleDishDrop = (dish, cuisineId) => {
//     addDishToPlate({
//       name: dish.name,
//       cuisine: cuisines.find((c) => c.id === cuisineId)?.name || "",
//     });
//   };

//   const removeDish = (dishId) => {
//     removeDishFromPlate(dishId);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     completeStep(currentStep);
//     setStep("timeline");
//     setActiveStep("timeline");
//     const nextRoute = getNextRoute(eventDetails, pathname);
//     router.push(nextRoute);
//   };

//   const hasHydrated = useEventStore((s) => s.hasHydrated);
//   if (!hasHydrated) return null;

//   return (
//     <div className="min-h-screen dark:bg-black">
//       <div
//         className="pt-20 px-8 min-h-screen"
//         style={{ backgroundColor: "var(--color-bg)" }}
//       >
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//           className="max-w-7xl mx-auto"
//         >
//           {/* HEADINGS */}
//           <h1
//             style={{
//               fontFamily: "var(--font-serif)",
//               fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
//               color: "var(--color-dark)",
//               marginBottom: "1rem",
//               fontStyle: "italic",
//               textAlign: "center",
//             }}
//           >
//             Taste
//           </h1>

//           <p
//             style={{
//               fontFamily: "var(--font-body)",
//               fontSize: "1.125rem",
//               color: "var(--color-dark)",
//               opacity: 0.7,
//               textAlign: "center",
//               marginBottom: "2rem",
//             }}
//           >
//             Build your menu
//           </p>

//           {/* GRID LAYOUT */}
//           <div className="grid grid-cols-12 gap-8 mt-10">

//             {/* LEFT SIDE */}
//             <div className="col-span-8">

//               {/* Cuisine Selection */}
//               {!selectedCuisine && (
//                 <div className="grid grid-cols-3 gap-6 mb-12">
//                   {cuisines.map((cuisine, idx) => (
//                     <motion.button
//                       key={cuisine.id}
//                       onClick={() => setSelectedCuisine(cuisine.id)}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: idx * 0.08 }}
//                       whileHover={{ y: -8, scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       className="p-6 rounded-3xl"
//                       style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         backgroundColor: "var(--glass-fill)",
//                         border: "1px solid var(--glass-border)",
//                       }}
//                     >
//                       <div className="w-22 h-22 rounded-full mb-4 overflow-hidden flex items-center
//                       justify-center border border-white/10 shadow-md">
//                         <img
//                           src={cuisine.color}
//                           alt={cuisine.name}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                       {cuisine.name}
//                     </motion.button>
//                   ))}
//                 </div>
//               )}

//               {/* Dishes */}
//               <AnimatePresence>
//                 {selectedCuisine && (
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="mb-12"
//                   >
//                     <div className="flex justify-between mb-6">
//                       <h3 className="font-bold font-dm text-xl">
//                         {cuisines.find((c) => c.id === selectedCuisine)?.name} Dishes
//                       </h3>

//                       <button
//                         className="flex items-center gap-1"
//                         onClick={() => setSelectedCuisine(null)}
//                       >
//                         <X size={16} /> Back
//                       </button>
//                     </div>

//                     <div className="grid grid-cols-3 gap-4">
//                       {dishesData[selectedCuisine]?.map((dish) => (
//                         <motion.button
//                           key={dish.name}
//                           onClick={() => handleDishDrop(dish, selectedCuisine)}
//                           whileHover={{ y: -6, scale: 1.02 }}
//                           whileTap={{ scale: 0.98 }}
//                           className="p-6 rounded-3xl flex flex-col items-center text-center"
//                           style={{
//                             backgroundColor: "var(--glass-fill)",
//                             border: "1px solid var(--glass-border)",
//                           }}
//                         >
//                           <div
//                             className="w-24 h-24 rounded-full overflow-hidden mb-4
//                             border border-white/10 shadow-md"
//                           >
//                             <img
//                               src={`/food/${dish.image}`}
//                               alt={dish.name}
//                               className="w-full h-full object-cover"
//                             />
//                           </div>

//                           <h4
//                             className="font-semibold"
//                             style={{ color: "var(--color-dark)" }}
//                           >
//                             {dish.name}
//                           </h4>

//                           <span
//                             className="text-sm mt-1"
//                             style={{ color: "var(--color-dark)", opacity: 0.6 }}
//                           >
//                             {dish.type}
//                           </span>
//                         </motion.button>
//                       ))}
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* RIGHT SIDE (STICKY PLATE) */}
//             <div className="col-span-4">
//               <div className="sticky top-24">

//                 {/* ── FOOD BUDGET CARD (new) ── */}
//                 {totalBudgetL > 0 && (
//                   <FoodBudgetCard
//                     spentL={spentL}
//                     budgetL={foodBudgetL}
//                     guests={guestCount}
//                   />
//                 )}

//                 {/* PLATE CARD (unchanged) */}
//                 <motion.div
//                   layout
//                   className="p-7 rounded-3xl w-full"
//                   style={{
//                     backgroundColor: "var(--glass-fill)",
//                     backdropFilter: "blur(3px)",
//                     border: "1.5px solid var(--color-primary)",
//                     boxShadow: "0 8px 32px rgba(98,117,76,0.25)",
//                   }}
//                 >
//                   <div className="flex flex-col items-start gap-4">
//                     <span
//                       style={{
//                         fontFamily: "var(--font-body)",
//                         fontSize: "0.95rem",
//                         fontWeight: 600,
//                         color: "var(--color-dark)",
//                       }}
//                     >
//                       Your Plate{" "}
//                       <span style={{ opacity: 0.6 }}>({plate.length})</span>
//                     </span>

//                     <div className="flex flex-wrap gap-2 items-start content-start">
//                       {plate.slice(0, 5).map((dish) => (
//                         <motion.div
//                           key={dish.id}
//                           layout
//                           initial={{ scale: 0.8, opacity: 0 }}
//                           animate={{ scale: 1, opacity: 1 }}
//                           exit={{ scale: 0.8, opacity: 0 }}
//                           transition={{ type: "spring", stiffness: 300, damping: 20 }}
//                           className="px-3 py-1.5 rounded-full flex items-center gap-2"
//                           style={{
//                             backgroundColor: "var(--color-primary)",
//                             color: "var(--color-bg)",
//                             fontSize: "0.85rem",
//                           }}
//                         >
//                           {dish.name}
//                           <button onClick={() => removeDish(dish.id)}>
//                             <X size={14} />
//                           </button>
//                         </motion.div>
//                       ))}
//                       {plate.length > 5 && (
//                         <button
//                           onClick={() => setIsModalOpen(true)}
//                           style={{
//                             fontFamily: "var(--font-body)",
//                             fontSize: "0.85rem",
//                             color: "var(--color-dark)",
//                             opacity: 0.7,
//                             alignSelf: "center",
//                             marginLeft: "4px",
//                             cursor: "pointer",
//                             fontWeight: 600,
//                           }}
//                         >
//                           +{plate.length - 5} more
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </motion.div>

//                 {/* CONTINUE (unchanged) */}
//                 <motion.button
//                   onClick={handleSubmit}
//                   className="w-full mt-6 px-8 py-5 rounded-full flex justify-center items-center gap-3"
//                   style={{
//                     backgroundColor: "var(--color-dark)",
//                     color: "var(--color-bg)",
//                   }}
//                 >
//                   Continue <ArrowRight size={20} />
//                 </motion.button>

//               </div>
//             </div>

//           </div>
//         </motion.div>
//       </div>

//       {/* MODAL (unchanged) */}
//       <AnimatePresence>
//         {isModalOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.18 }}
//             className="fixed inset-0 z-50 flex items-center justify-center px-6"
//             style={{
//               background: "rgba(0,0,0,0.45)",
//               backdropFilter: "blur(6px)",
//             }}
//             onClick={() => setIsModalOpen(false)}
//           >
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 10 }}
//               transition={{ duration: 0.2 }}
//               onClick={(e) => e.stopPropagation()}
//               className="w-full max-w-2xl rounded-3xl p-7"
//               style={{
//                 backgroundColor: "#E7E7DF",
//                 backdropFilter: "blur(10px)",
//                 border: "1.5px solid var(--color-primary)",
//                 boxShadow: "0 8px 32px rgba(98,117,76,0.18)",
//               }}
//             >
//               <div className="flex items-center justify-between mb-6">
//                 <div>
//                   <h2
//                     style={{
//                       fontFamily: "var(--font-serif)",
//                       fontSize: "2rem",
//                       fontStyle: "italic",
//                       color: "var(--color-dark)",
//                     }}
//                   >
//                     Your Plate
//                   </h2>
//                   <p
//                     style={{
//                       fontFamily: "var(--font-body)",
//                       fontSize: "0.9rem",
//                       opacity: 0.6,
//                       marginTop: "2px",
//                     }}
//                   >
//                     {plate.length} selected dishes
//                   </p>
//                 </div>

//                 <button
//                   onClick={() => setIsModalOpen(false)}
//                   className="w-9 h-9 rounded-full flex items-center justify-center"
//                   style={{
//                     backgroundColor: "rgba(98,117,76,0.12)",
//                     color: "var(--color-dark)",
//                   }}
//                 >
//                   <X size={18} />
//                 </button>
//               </div>

//               <div className="flex flex-wrap gap-3">
//                 {plate.map((dish) => (
//                   <div
//                     key={dish.id}
//                     className="px-4 py-2 rounded-full flex items-center gap-3"
//                     style={{
//                       backgroundColor: "var(--color-primary)",
//                       color: "var(--color-bg)",
//                     }}
//                   >
//                     <div className="flex flex-col leading-tight">
//                       <span style={{ fontSize: "0.92rem", fontWeight: 600 }}>
//                         {dish.name}
//                       </span>
//                       <span style={{ fontSize: "0.72rem", opacity: 0.7 }}>
//                         {dish.cuisine}
//                       </span>
//                     </div>

//                     <button
//                       onClick={() => removeDish(dish.id)}
//                       className="flex items-center justify-center"
//                       style={{ opacity: 0.7 }}
//                     >
//                       <X size={14} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
