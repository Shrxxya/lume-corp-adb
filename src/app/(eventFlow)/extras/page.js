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

  const entertainment = useEventStore((state) => state.entertainment);
  const setEntertainment = useEventStore((state) => state.setEntertainment);
  const currentStep = useEventStore((state) => state.currentStep);
  const completeStep = useEventStore((state) => state.completeStep);
  const setStep = useEventStore((state) => state.setStep);
  const setActiveStep = useEventStore((state) => state.setActiveStep);

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

  return (
    <div className="min-h-screen dark:bg-black">
      <div className="pt-20 pb-20 px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
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
          <div className="grid grid-cols-12 gap-10 mt-10">

            {/* LEFT SIDE */}
            <div className="col-span-8">

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

            {/* RIGHT SIDE */}
            <div className="col-span-4">
              <div className="sticky top-24">

                {/* LINEUP */}
                {/* <div className="p-6 rounded-3xl bg-white shadow-sm mb-6"> */}
                <div
                  className="p-6 rounded-3xl mb-6"
                  style={{
                    backgroundColor: "var(--glass-fill)",
                    backdropFilter: "blur(6px)",
                    border: "1.5px solid var(--color-primary)",
                    boxShadow: "0 8px 32px rgba(98,117,76,0.25)",
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
                            boxShadow: "0 4px 14px rgba(98,117,76,0.25)",
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
                  className="w-full px-8 py-5 rounded-full flex justify-center items-center gap-3"
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
        isSelected ? "ring-2 ring-[#62754c]" : "bg-white"
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