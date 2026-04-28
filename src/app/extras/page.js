"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { ArrowRight, Music, Mic, Lightbulb, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEventStore } from "@/store/useEventStore";
import ProgressMap from "@/components/ProgressMap";

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
  const listRef = useRef(null);

  // Get store functions
  const entertainment = useEventStore((state) => state.entertainment);
  const setEntertainment = useEventStore((state) => state.setEntertainment);
  const currentStep = useEventStore((state) => state.currentStep);
  const completeStep = useEventStore((state) => state.completeStep);
  const setStep = useEventStore((state) => state.setStep);

  // Pre-fill from store
  const [selectedCategory, setSelectedCategory] = useState(entertainment.selectedCategory);
  const [expandedCard, setExpandedCard] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(entertainment.selectedArtist);
  const [selectedHost, setSelectedHost] = useState(entertainment.selectedHost);
  const [selectedLightShow, setSelectedLightShow] = useState(entertainment.selectedLightShow);

  // Save to store when selection changes
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setEntertainment({ selectedCategory: categoryId });
  };

  const handleSelection = (type, item) => {
    if (type === 'artist') {
      setSelectedArtist(item);
      setEntertainment({ selectedArtist: item });
    } else if (type === 'host') {
      setSelectedHost(item);
      setEntertainment({ selectedHost: item });
    } else if (type === 'lightShow') {
      setSelectedLightShow(item);
      setEntertainment({ selectedLightShow: item });
    }
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
    setStep(currentStep + 1);
    router.push("/decor");
  };

  return (
    <div className="min-h-screen dark:bg-black">
      <ProgressMap currentStep={currentStep} />

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
          <p className="text-center text-gray-500 mb-12">
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
                  Top {selectedCategory}
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
                    key={celeb.name}
                    celebrity={celeb}
                    index={idx}
                    isExpanded={expandedCard === celeb.name}
                    onToggle={() =>
                      setExpandedCard(
                        expandedCard === celeb.name ? null : celeb.name
                      )
                    }
                  />
                )
              )}
            </motion.div>
          )}

          {/* Continue */}
        <motion.button
          onClick={handleSubmit}
          className="w-full px-8 py-5 rounded-full flex justify-center gap-3"
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

function CelebrityCard({ celebrity, index, isExpanded, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ scale: 1.02 }}
      onClick={onToggle}
      className="p-5 rounded-xl shadow-sm cursor-pointer bg-white"
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