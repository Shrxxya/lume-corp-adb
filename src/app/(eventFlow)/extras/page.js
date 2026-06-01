"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useMemo } from "react";
import { ArrowRight, Music, Mic, Lightbulb, X } from "lucide-react";
import { useEventStore } from "@/store/useEventStore";
import ProgressMap from "@/components/ProgressMap";
import { getNextRoute } from "@/lib/eventFlow";
import { useRouter, usePathname } from "next/navigation";

const performanceArtists = [
  { name: "Arijit Singh", specialty: "Bollywood Playback", city: "Mumbai", cost: "₹7-10L", agency: "SA Entertainment" },
  { name: "Shreya Ghoshal", specialty: "Classical Fusion", city: "Mumbai", cost: "₹8-11L", agency: "Ghoshal Productions" },
  { name: "Sunidhi Chauhan", specialty: "Contemporary Pop", city: "Delhi", cost: "₹8-10L", agency: "Chauhan Collective" },
  { name: "Neha Kakkar", specialty: "Dance Numbers", city: "Mumbai", cost: "₹3-5L", agency: "NK Events" },
  { name: "Sonu Nigam", specialty: "Versatile Performer", city: "Mumbai", cost: "₹5-8L", agency: "Nigam Enterprises" }
];

const hosts = [
  { name: "Karan Johar", specialty: "Corporate Events", city: "Mumbai", cost: "₹5-8L", agency: "Dharma Events" },
  { name: "Kapil Sharma", specialty: "Comedy Host", city: "Mumbai", cost: "₹3-5L", agency: "K9 Productions" },
  { name: "Cyrus Broacha", specialty: "Tech Events", city: "Mumbai", cost: "₹6-8L", agency: "Broacha & Co" },
  { name: "Mini Mathur", specialty: "Award Shows", city: "Mumbai", cost: "₹4-6L", agency: "MM Hosting" },
  { name: "Manish Paul", specialty: "Live Events", city: "Delhi", cost: "₹2-5L", agency: "Paul Productions" }
];

const lightShows = [
  { name: "Laserlume Studios", specialty: "3D Projection Mapping", city: "Bangalore", cost: "₹3-5L", agency: "Direct" },
  { name: "Spectrum Events", specialty: "LED Choreography", city: "Mumbai", cost: "₹4-5L", agency: "Direct" },
  { name: "Neon Dreams", specialty: "Interactive Lighting", city: "Gurgaon", cost: "₹4-6L", agency: "Direct" },
  { name: "Prism Productions", specialty: "Laser Shows", city: "Hyderabad", cost: "₹3-5L", agency: "Direct" },
  { name: "Aurora Lights", specialty: "Ambient Design", city: "Pune", cost: "₹3-6L", agency: "Direct" }
];

// ── SVG ring ──────────────────────────────────────────────────────────────────
function BudgetRing({ spentL, budgetL }) {
  //const ratio     = budgetL > 0 ? Math.min(spentL / budgetL, 1) : 0;
  const isOver    = budgetL > 0 && spentL > budgetL;
  const rawRatio = budgetL > 0 ? spentL / budgetL : 0;
const ratio = Math.min(rawRatio, 1);
  const pct = Math.round(rawRatio * 100);
  const R         = 52, stroke = 5;
  const circ      = 2 * Math.PI * R;

  const color = isOver
    ? "#C0392B"
    : ratio > 0.85 && ratio < 0.99 
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
      </div>

      {/* status tag */}
      <div style={{
        padding: "3px 10px",
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

export default function EntertainmentSelection() {
  const router = useRouter();
  const pathname = usePathname();
  const eventDetails = useEventStore((s) => s.eventDetails);

  const entertainment = useEventStore((state) => state.entertainment);
  const setEntertainment = useEventStore((state) => state.setEntertainment);
  const currentStep = useEventStore((state) => state.currentStep);
  const completeStep = useEventStore((state) => state.completeStep);
  const setStep = useEventStore((state) => state.setStep);
  const setActiveStep = useEventStore((state) => state.setActiveStep);

  const budget       = useEventStore((s) => s.budget);
  const getSummaryData      = useEventStore((s) => s.getSummaryData);
  const summaryData      = getSummaryData();
  const hasHydrated = useEventStore((s) => s.hasHydrated);
  const totalBudgetL = Number(summaryData?.budget || 0);   
  const extrasPct      = budget?.allocations?.performance || 15;           
  const extrasBudgetL  = (extrasPct / 100) * totalBudgetL;  

  const listRef = useRef(null);

  const [selectedCategory, setSelectedCategory] = useState(entertainment.selectedCategory);
  const [expandedCard, setExpandedCard] = useState(null);
  const [selections, setSelections] = useState({
    Performance: entertainment.selectedArtist || null,
    Host: entertainment.selectedHost || null,
    LightShow: entertainment.selectedLightShow || null,
  });

  const categories = [
    { id: "Performance", icon: Music, title: "Performance", subtitle: "Dance / Song", color: "#FF6B6B", image: "/performance.jpeg" },
    { id: "Host", icon: Mic, title: "Host / Emcee", subtitle: "Professional hosting", color: "#4ECDC4", image: "/host.jpeg" },
    { id: "LightShow", icon: Lightbulb, title: "Light Show", subtitle: "Visual spectacle", color: "#F38181", image: "/lights.jpeg" }
  ];

  const getCelebritiesForCategory = (category) => {
    if (category === "Performance") return performanceArtists;
    if (category === "Host") return hosts;
    if (category === "LightShow") return lightShows;
    return [];
  };

  const parseCost = (costString) => {
    // "₹25-35L" -> 30
    const cleaned = costString.replace("₹", "").replace("L", "");
    const [min, max] = cleaned.split("-").map(Number);

    if (max) return (min + max) / 2;
    return min || 0;
  };

  const spentL = useMemo(() => {
    return Object.values(selections).reduce((sum, item) => {
      if (!item) return sum;
      return sum + parseCost(item.cost);
    }, 0);
  }, [selections]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setEntertainment({ selectedCategory: categoryId });
  };

  const handleSelection = (category, item) => {
    const keyMap = {
      Performance: "selectedArtist",
      Host: "selectedHost",
      LightShow: "selectedLightShow",
    };

    setSelections((prev) => ({
      ...prev,
      [category]: item,
    }));

    setEntertainment({
      [keyMap[category]]: item,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    completeStep(currentStep);
    setStep("decor");
    setActiveStep("decor");

    const nextRoute = getNextRoute(eventDetails, pathname);
    router.push(nextRoute);
  };

  useEffect(() => {
    setSelectedCategory(null);
    setExpandedCard(null);
  }, []);

  useEffect(() => {
    setSelections({
      Performance: entertainment.selectedArtist || null,
      Host: entertainment.selectedHost || null,
      LightShow: entertainment.selectedLightShow || null,
    });
  }, [entertainment]);

  if (!hasHydrated) return;

  return (
    <div className="min-h-screen dark:bg-black">
      <div className="pt-20 pb-20 px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex">
            {/*------------ LEFT SIDE ------------*/}
            <div className="flex-[2]">
            {/* HEADINGS */}
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              color: 'var(--color-dark)',
              marginBottom: '1rem',
              fontStyle: 'italic',
              textAlign: 'center',
            }}
          >
            The Act
          </h1>

          <p
            className="text-center text-gray-500 mb-12"
            style={{ fontFamily: 'var(--font-body)', fontSize: '1.125rem' }}
          >
            Choose your entertainment
          </p>

          {/* GRID */}
          <div className="w-[95%] mt-10">

            {/* LEFT SIDE */}
            <div className="">

              {/* CATEGORY CARDS */}
              <div className="grid grid-cols-3 gap-6 mb-12">
                {categories.map((category, idx) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -8 }}
                    onClick={() => {
                      handleCategorySelect(category.id);
                      setTimeout(() => {
                        listRef.current?.scrollIntoView({
                          behavior: "smooth",
                          block: "start"
                        });
                      }, 100);
                    }}
                    className="p-8 rounded-3xl cursor-pointer bg-transparent flex flex-col items-center text-center"
                  >
                    <div
  className="w-30 h-30 rounded-full flex items-center justify-center mb-6 overflow-hidden"
  style={{ backgroundColor: category.color }}
>
  {category.image ? (
    <img
      src={category.image}
      alt={category.title}
      className="w-full h-full object-cover"
    />
  ) : (
    <category.icon size={36} color="white" />
  )}
</div>

                    <h3 className="text-xl font-bold">{category.title}</h3>
                    <p className="text-gray-500">{category.subtitle}</p>
                  </motion.div>
                ))}
              </div>

              {/* RESULTS */}
              {selectedCategory && (
                <motion.div
                  ref={listRef}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">
                      Top {selectedCategory} Options
                    </h3>

                    <button onClick={() => setSelectedCategory(null)}>
                      <X size={20} />
                    </button>
                  </div>

                  {getCelebritiesForCategory(selectedCategory).map((celeb, idx) => (
                    <CelebrityCard
                      key={`${celeb.name}-${idx}`}
                      celebrity={celeb}
                      isSelected={selections[selectedCategory]?.name === celeb.name}
                      onClick={() => handleSelection(selectedCategory, celeb)}
                      isExpanded={expandedCard === celeb.name}
                      onToggle={() =>
                        setExpandedCard(expandedCard === celeb.name ? null : celeb.name)
                      }
                    />
                  ))}
                </motion.div>
              )}
            </div>
            </div>
          </div>
          {/* RIGHT SIDE */}
            <div className="col-span-4 flex-[1]">
              <div className="sticky top-24">
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
                                  budgetL={extrasBudgetL}
                                />
                              </motion.div>

                {/* LINEUP */}
                {/* <div className="p-6 rounded-3xl bg-white shadow-sm mb-6"> */}
                <div
                  className="p-6 rounded-3xl mb-6"
                  style={{
                    backgroundColor: "var(--glass-fill)",
                    backdropFilter: "blur(6px)",
                    border: "1.5px solid var(--color-primary)",
                    boxShadow: "0 8px 32px #E7E7DF",
                  }}
                >
                  <h3 className="font-semibold mb-4">
                    Your Lineup{" "}
                    <span style={{ opacity: 0.6 }}>
                      ({Object.values(selections).filter(Boolean).length})
                    </span>
                  </h3>

                  <div className="flex flex-wrap gap-3 items-start content-start min-h-[48px]">
                    {Object.entries(selections).map(([category, item]) =>
                      item ? (
                        <motion.div
                          key={category}
                          //layout
                          className="px-4 py-2 rounded-full flex items-center gap-2 will-change-transform"
                          style={{
                            backgroundColor: "var(--color-primary)",
                            color: "var(--color-bg)",
                            fontSize: "0.85rem",
                            boxShadow: "0 4px 14px #E7E7DF",
                          }}
                        >
                          <span>{item.name}</span>
                          <button
                            onClick={() => {
                              const keyMap = {
                                Performance: "selectedArtist",
                                Host: "selectedHost",
                                LightShow: "selectedLightShow",
                              };

                              setSelections((prev) => ({
                                ...prev,
                                [category]: null,
                              }));

                              setEntertainment({
                                [keyMap[category]]: null,
                              });
                            }}
                          >
                            <X size={14} />
                          </button>
                        </motion.div>
                      ) : null
                    )}
                  </div>
                </div>

                {/* CONTINUE */}
                <motion.button
                  onClick={handleSubmit}
                  className="w-[25vw] mx-auto px-8 py-5 rounded-full flex justify-center items-center gap-3"
                  style={{
                    backgroundColor: "var(--color-dark)",
                    color: "var(--color-bg)",
                  }}
                >
                  Continue <ArrowRight size={20} />
                </motion.button>

              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* CARD */
function CelebrityCard({ celebrity, isSelected, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      className={`p-5 rounded-xl shadow-sm cursor-pointer ${
        isSelected ? "ring-2 ring-[#58644B]" : "bg-white"
      }`}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex justify-between">
        <div>
          <h4 className="font-semibold text-lg">{celebrity.name}</h4>
          <p className="text-sm text-gray-500">{celebrity.specialty}</p>
          <p className="text-sm text-gray-400">{celebrity.city}</p>
        </div>

        <p className="font-bold text-green-600">{celebrity.cost}</p>
      </div>
    </motion.div>
  );
}