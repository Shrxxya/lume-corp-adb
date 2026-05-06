"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ArrowRight, Music, Mic, Lightbulb, X } from "lucide-react";
import { useEventStore } from "@/store/useEventStore";
import ProgressMap from "@/components/ProgressMap";

import { getNextRoute } from "@/lib/eventFlow";
import { useRouter, usePathname } from "next/navigation";

const performanceArtists = [
  { name: "Arijit Singh", specialty: "Bollywood Playback", city: "Mumbai", cost: "₹25-35L", agency: "SA Entertainment" },
  { name: "Shreya Ghoshal", specialty: "Classical Fusion", city: "Mumbai", cost: "₹20-30L", agency: "Ghoshal Productions" },
  { name: "Sunidhi Chauhan", specialty: "Contemporary Pop", city: "Delhi", cost: "₹15-25L", agency: "Chauhan Collective" },
  { name: "Neha Kakkar", specialty: "Dance Numbers", city: "Mumbai", cost: "₹18-28L", agency: "NK Events" },
  { name: "Sonu Nigam", specialty: "Versatile Performer", city: "Mumbai", cost: "₹22-32L", agency: "Nigam Enterprises" }
];

const hosts = [
  { name: "Karan Johar", specialty: "Corporate Events", city: "Mumbai", cost: "₹12-18L", agency: "Dharma Events" },
  { name: "Kapil Sharma", specialty: "Comedy Host", city: "Mumbai", cost: "₹10-15L", agency: "K9 Productions" },
  { name: "Cyrus Broacha", specialty: "Tech Events", city: "Mumbai", cost: "₹6-10L", agency: "Broacha & Co" },
  { name: "Mini Mathur", specialty: "Award Shows", city: "Mumbai", cost: "₹8-12L", agency: "MM Hosting" },
  { name: "Manish Paul", specialty: "Live Events", city: "Delhi", cost: "₹7-11L", agency: "Paul Productions" }
];

const lightShows = [
  { name: "Laserlume Studios", specialty: "3D Projection Mapping", city: "Bangalore", cost: "₹15-25L", agency: "Direct" },
  { name: "Spectrum Events", specialty: "LED Choreography", city: "Mumbai", cost: "₹12-20L", agency: "Direct" },
  { name: "Neon Dreams", specialty: "Interactive Lighting", city: "Gurgaon", cost: "₹10-18L", agency: "Direct" },
  { name: "Prism Productions", specialty: "Laser Shows", city: "Hyderabad", cost: "₹8-14L", agency: "Direct" },
  { name: "Aurora Lights", specialty: "Ambient Design", city: "Pune", cost: "₹6-12L", agency: "Direct" }
];

export default function EntertainmentSelection() {
  const router = useRouter();
  const pathname = usePathname();
const eventDetails = useEventStore((s) => s.eventDetails);
  const listRef = useRef(null);

  // Get store functions
  const entertainment = useEventStore((state) => state.entertainment);
  const setEntertainment = useEventStore((state) => state.setEntertainment);
  const currentStep = useEventStore((state) => state.currentStep);
  const completeStep = useEventStore((state) => state.completeStep);
  const setStep = useEventStore((state) => state.setStep);
  const setActiveStep = useEventStore((state) => state.setActiveStep);

  // Pre-fill from store
  const [selectedCategory, setSelectedCategory] = useState(entertainment.selectedCategory);
  const [expandedCard, setExpandedCard] = useState(null);
  const [selections, setSelections] = useState({
    Performance: entertainment.selectedArtist || null,
    Host: entertainment.selectedHost || null,
    LightShow: entertainment.selectedLightShow || null,
  });
  // const [selectedArtist, setSelectedArtist] = useState(entertainment.selectedArtist);
  // const [selectedHost, setSelectedHost] = useState(entertainment.selectedHost);
  // const [selectedLightShow, setSelectedLightShow] = useState(entertainment.selectedLightShow);

  // Save to store when selection changes
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setEntertainment({ selectedCategory: categoryId });
  };

  // const handleSelection = (type, item) => {
  //   if (type === 'artist') {
  //     setSelectedArtist(item);
  //     setEntertainment({ selectedArtist: item });
  //   } else if (type === 'host') {
  //     setSelectedHost(item);
  //     setEntertainment({ selectedHost: item });
  //   } else if (type === 'lightShow') {
  //     setSelectedLightShow(item);
  //     setEntertainment({ selectedLightShow: item });
  //   }
  // };

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

  const getCelebritiesForCategory = (category) => {
    if (category === "Performance") return performanceArtists;
    if (category === "Host") return hosts;
    if (category === "LightShow") return lightShows;
    return [];
  };

  const categories = [
    { id: "Performance", icon: Music, title: "Performance", subtitle: "Dance / Song", color: "#FF6B6B" },
    { id: "Host", icon: Mic, title: "Host / Emcee", subtitle: "Professional hosting", color: "#4ECDC4" },
    { id: "LightShow", icon: Lightbulb, title: "Light Show", subtitle: "Visual spectacle", color: "#F38181" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    completeStep(currentStep);
    //setStep(currentStep + 1);
    setStep("decor"); // or nextStepName
    setActiveStep("decor");
    const nextRoute = getNextRoute(eventDetails, pathname);
    router.push(nextRoute);
      //router.push("/decor");
    };

  const keyMap = {
    Performance: "selectedArtist",
    Host: "selectedHost",
    LightShow: "selectedLightShow",
  };

  useEffect(() => {
    setSelections({
      Performance: entertainment.selectedArtist || null,
      Host: entertainment.selectedHost || null,
      LightShow: entertainment.selectedLightShow || null,
    });
  }, [entertainment]);

  return (
    <div className="min-h-screen dark:bg-black">
      {/* <ProgressMap currentStep={currentStep} /> */}

      <div className="pt-32 pb-20 px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
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
          <p className="text-center text-gray-500 mb-12"
          style={{
            fontFamily: 'var(--font-body)',
            }}>
            Choose your entertainment
          </p>

          {/* CATEGORY CARDS (always visible) */}
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
                className="p-8 rounded-3xl cursor-pointer bg-white shadow-sm flex flex-col items-center text-center"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: category.color }}
                >
                  <category.icon size={36} color="white" />
                </div>

                <h3 className="text-xl font-bold">{category.title}</h3>
                <p className="text-gray-500">{category.subtitle}</p>
              </motion.div>
            ))}
          </div>

          {/* RESULTS SECTION */}
          {selectedCategory && (
            <motion.div
              ref={listRef}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 space-y-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">
                  Top {selectedCategory} Options
                </h3>

                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setExpandedCard(null);
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              {getCelebritiesForCategory(selectedCategory).map(
                (celeb, idx) => (
                  <CelebrityCard
                    celebrity={celeb}
                    key={`${selectedCategory}-${celeb.name}-${idx}`}
                    index={idx}
                    isSelected={selections[selectedCategory]?.name === celeb.name}
                    onClick={() => handleSelection(selectedCategory, celeb)}
                    isExpanded={expandedCard === celeb.name}
                    onToggle={() =>
                      setExpandedCard(expandedCard === celeb.name ? null : celeb.name)
                    }
                  />
                )
              )}
            </motion.div>
          )}

          {Object.values(selections).some(Boolean) && (
            <div className="mt-12 p-6 rounded-3xl bg-white shadow-sm mb-10">
              <h3 className="font-semibold mb-4">Your Lineup</h3>

              <div className="flex flex-wrap gap-3">
                {Object.entries(selections).map(([category, item]) =>
                  item ? (
                    <motion.div
                      key={category}
                      layout
                      initial={{ scale: 0.8, opacity: 0, y: 10 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="px-4 py-2 rounded-full bg-[#14182a] text-white flex items-center gap-2"
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
          )}

          {/* Continue */}
        <motion.button
          onClick={handleSubmit}
          className="w-full mt-8 px-8 py-5 rounded-full flex justify-center items-center gap-3"
          style={{
            backgroundColor: "var(--color-dark)",
            color: "var(--color-bg)",
          }}
        >
          Continue <ArrowRight size={20} />
        </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

  function CelebrityCard({
      celebrity,
      index,
      isExpanded,
      onToggle,
      isSelected,
      onClick,
    }) {
  return (
    <motion.div
  onClick={onClick}
  className={`p-5 rounded-xl shadow-sm cursor-pointer transition ${
    isSelected ? "ring-2 ring-[#62754c] bg-[#62754c]-70" : "bg-white"
  }`}
>
      <div className="flex justify-between">
        <div>
          <h4 className="font-semibold text-lg">{celebrity.name}</h4>
          <p className="text-sm text-gray-500">{celebrity.specialty}</p>
          <p className="text-sm text-gray-400">{celebrity.city}</p>
        </div>

        <p className="font-bold text-green-600">{celebrity.cost}</p>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3"
          >
            <p className="text-sm">Agency: {celebrity.agency}</p>

            <button
              onClick={(e) => e.stopPropagation()}
              className="mt-2 px-4 py-1 bg-black text-white rounded"
            >
              Contact Agency
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}