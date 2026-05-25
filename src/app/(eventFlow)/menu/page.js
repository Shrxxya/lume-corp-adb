"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { useEventStore } from "@/store/useEventStore";
import ProgressMap from "@/components/ProgressMap";

import { getNextRoute } from "@/lib/eventFlow";
import { useRouter, usePathname } from "next/navigation";

const cuisines = [
  { id: "italian", name: "Italian", color: "/cuisines/italian.jpg" },
  { id: "fusion", name: "Fusion", color: "/cuisines/fusion.jpg" },
  { id: "vegan", name: "Vegan", color: "/cuisines/vegan.png" },
  { id: "indian", name: "Indian", color: "/cuisines/indian.jpg" },
  { id: "coastal", name: "Coastal", color: "/cuisines/coastal.png" },
  { id: "live_counter", name: "Live Counter", color: "/cuisines/live_counter.jpg" },
];

const dishesData = {
  italian: [
    { name: "Margherita Pizza", type: "Main", image: "margherita.jpg" },
    { name: "Pasta Carbonara", type: "Main", image: "pasta.jpg" },
    { name: "Caprese Salad", type: "Appetizer", image: "caprese.jpeg" },
    { name: "Tiramisu", type: "Dessert", image: "tiramisu.png" },
    { name: "Bruschetta", type: "Appetizer", image: "bruschetta.jpg" },
    { name: "Risotto", type: "Main", image: "risotto.png" },
  ],
  fusion: [
    { name: "Korean Tacos", type: "Appetizer", image: "koreanTaco.png" },
    { name: "Sushi Burrito", type: "Main", image: "sushiBurrito.jpg" },
    { name: "Thai Pizza", type: "Main", image: "thaiPizza.png" },
    { name: "Matcha Cheesecake", type: "Dessert", image: "matcha.png" },
    { name: "Kimchi Quesadilla", type: "Appetizer", image: "kimchiQuesadilla.jpg" },
    { name: "Ramen Burger", type: "Main", image: "ramenBurger.jpg" },
  ],
  vegan: [
    { name: "Quinoa Bowl", type: "Main", image: "quinoa.jpg" },
    { name: "Jackfruit Tacos", type: "Main", image: "jfTacos.jpg" },
    { name: "Buddha Bowl", type: "Main", image: "buddha.png" },
    { name: "Avocado Toast", type: "Appetizer", image: "avocado.jpg" },
    { name: "Chia Pudding", type: "Dessert", image: "chia.png" },
    { name: "Hummus Platter", type: "Appetizer", image: "hummus.png" },
  ],
  indian: [
    { name: "Paneer Tikka", type: "Appetizer", image: "paneer.png" },
    { name: "Biryani", type: "Main", image: "biryani.jpg" },
    { name: "Butter Chicken", type: "Main", image: "butterChicken.jpg" },
    { name: "Gulab Jamun", type: "Dessert", image: "gulabJamun.jpg" },
    { name: "Samosa", type: "Appetizer", image: "samosa.jpeg" },
    { name: "Dal Makhani", type: "Main", image: "dalMakhani.jpg" },
  ],
  coastal: [
    { name: "Grilled Fish", type: "Main", image: "fish.jpg" },
    { name: "Shrimp Scampi", type: "Main", image: "shrimp.jpeg" },
    { name: "Crab Cakes", type: "Appetizer", image: "crab.png" },
    { name: "Clam Chowder", type: "Appetizer", image: "clam.jpg" },
    { name: "Lobster Roll", type: "Main", image: "lobster.jpg" },
    { name: "Key Lime Pie", type: "Dessert", image: "key.png" },
  ],
  live_counter: [
    { name: "Pasta Live Counter", type: "Main", image: "livePasta.jpg" },
    { name: "Tandoor Grill Station", type: "Main", image: "tandoor.png" },
    { name: "Chaat Counter", type: "Appetizer", image: "chaat.jpg" },
    { name: "Dosa Live Station", type: "Main", image: "dosa.png" },
    { name: "Dim Sum Counter", type: "Appetizer", image: "dimsum.png" },
    { name: "Wok Stir-Fry Station", type: "Appetizer", image: "wok.png" },
  ],
};

export default function MenuBuilder({ onNext }) {
  const router = useRouter();
  const pathname = usePathname();
  const eventDetails = useEventStore((s) => s.eventDetails);

  const menu = useEventStore((state) => state.menu);
  const setMenuCuisine = useEventStore((state) => state.setMenuCuisine);
  const addDishToPlate = useEventStore((state) => state.addDishToPlate);
  const removeDishFromPlate = useEventStore((state) => state.removeDishFromPlate);
  const currentStep = useEventStore((state) => state.currentStep);
  const completeStep = useEventStore((state) => state.completeStep);
  const setStep = useEventStore((state) => state.setStep);
  const setActiveStep = useEventStore((state) => state.setActiveStep);

  const [selectedCuisine, setSelectedCuisine] = useState(menu.selectedCuisine);
  const plate = useEventStore((s) => s.menu.plate);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDishDrop = (dish, cuisineId) => {
    const newDish = {
      id: `${cuisineId}-${dish.name}-${Date.now()}`,
      name: dish.name,
      cuisine: cuisines.find((c) => c.id === cuisineId)?.name || "",
    };
    addDishToPlate({
      name: dish.name,
      cuisine: cuisines.find((c) => c.id === cuisineId)?.name || "",
    });
  };

  const removeDish = (dishId) => {
    removeDishFromPlate(dishId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    completeStep(currentStep);

    setStep("timeline");
    setActiveStep("timeline");

    const nextRoute = getNextRoute(eventDetails, pathname);
    router.push(nextRoute);
  };

  const hasHydrated = useEventStore((s) => s.hasHydrated);

  if (!hasHydrated) return null;

  return (
    <div className="min-h-screen dark:bg-black">
      <div
        className="pt-20 px-8 min-h-screen"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto"
        >
          {/* HEADINGS (centered, unchanged) */}
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
            Taste
          </h1>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.125rem",
              color: "var(--color-dark)",
              opacity: 0.7,
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            Build your menu
          </p>

          {/* GRID LAYOUT */}
          <div className="grid grid-cols-12 gap-8 mt-10">
            
            {/* LEFT SIDE */}
            <div className="col-span-8">

              {/* Cuisine Selection */}
              {!selectedCuisine && (
                <div className="grid grid-cols-3 gap-6 mb-12">
                  {cuisines.map((cuisine, idx) => (
                    <motion.button
                      key={cuisine.id}
                      onClick={() => setSelectedCuisine(cuisine.id)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-6 rounded-3xl"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#e7e7df",
                        //border: "1px solid var(--glass-border)",
                      }}
                    >
                      <div className="w-22 h-22 rounded-full mb-4 overflow-hidden flex items-center 
                      justify-center border border-white/10 shadow-md">
                        <img
                          src={cuisine.color}
                          alt={cuisine.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {cuisine.name}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Dishes */}
              <AnimatePresence>
                {selectedCuisine && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mb-12"
                  >
                    <div className="flex justify-between mb-6">
                      <h3 className="font-bold font-dm text-xl">
                        {cuisines.find((c) => c.id === selectedCuisine)?.name} Dishes
                      </h3>

                      <button
                        className="flex items-center gap-1"
                        onClick={() => setSelectedCuisine(null)}
                      >
                        <X size={16} /> Back
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {dishesData[selectedCuisine]?.map((dish) => (
                        <motion.button
                          key={dish.name}
                          onClick={() => handleDishDrop(dish, selectedCuisine)}
                          whileHover={{ y: -6, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="p-6 rounded-3xl flex flex-col items-center text-center"
                          style={{
                            backgroundColor: "#e7e7df",
                            //border: "1px solid var(--glass-border)",
                          }}
                        >
                          {/* ROUND IMAGE */}
                          <div
                            className="w-24 h-24 rounded-full overflow-hidden mb-4 
                            border border-white/10 shadow-md"
                          >
                            <img
                              src={`/food/${dish.image}`}
                              alt={dish.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* TEXT */}
                          <h4
                            className="font-semibold"
                            style={{
                              color: "var(--color-dark)",
                            }}
                          >
                            {dish.name}
                          </h4>

                          <span
                            className="text-sm mt-1"
                            style={{
                              color: "var(--color-dark)",
                              opacity: 0.6,
                            }}
                          >
                            {dish.type}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
                    boxShadow: "0 8px 32px rgba(98,117,76,0.25)",
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
                <motion.button
                  onClick={handleSubmit}
                  className="w-full mt-6 px-8 py-5 rounded-full flex justify-center items-center gap-3"
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
      <AnimatePresence>
  {isModalOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(6px)",
      }}
      onClick={() => setIsModalOpen(false)}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-3xl p-7"
        style={{
          backgroundColor: "#e7e7df",
          backdropFilter: "blur(10px)",
          border: "1.5px solid var(--color-primary)",
          boxShadow: "0 8px 32px rgba(98,117,76,0.18)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "2rem",
                fontStyle: "italic",
                color: "var(--color-dark)",
              }}
            >
              Your Plate
            </h2>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                opacity: 0.6,
                marginTop: "2px",
              }}
            >
              {plate.length} selected dishes
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(false)}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: "rgba(98,117,76,0.12)",
              color: "var(--color-dark)",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Pills */}
        <div className="flex flex-wrap gap-3">
          {plate.map((dish) => (
            <div
              key={dish.id}
              className="px-4 py-2 rounded-full flex items-center gap-3"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "var(--color-bg)",
              }}
            >
              <div className="flex flex-col leading-tight">
                <span
                  style={{
                    fontSize: "0.92rem",
                    fontWeight: 600,
                  }}
                >
                  {dish.name}
                </span>

                <span
                  style={{
                    fontSize: "0.72rem",
                    opacity: 0.7,
                  }}
                >
                  {dish.cuisine}
                </span>
              </div>

              <button
                onClick={() => removeDish(dish.id)}
                className="flex items-center justify-center"
                style={{
                  opacity: 0.7,
                }}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
}