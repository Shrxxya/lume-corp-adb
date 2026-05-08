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
    { name: "Margherita Pizza", type: "Main" },
    { name: "Pasta Carbonara", type: "Main" },
    { name: "Caprese Salad", type: "Appetizer" },
    { name: "Tiramisu", type: "Dessert" },
    { name: "Bruschetta", type: "Appetizer" },
    { name: "Risotto", type: "Main" },
  ],
  fusion: [
    { name: "Korean Tacos", type: "Appetizer" },
    { name: "Sushi Burrito", type: "Main" },
    { name: "Thai Pizza", type: "Main" },
    { name: "Matcha Cheesecake", type: "Dessert" },
    { name: "Kimchi Quesadilla", type: "Appetizer" },
    { name: "Ramen Burger", type: "Main" },
  ],
  vegan: [
    { name: "Quinoa Bowl", type: "Main" },
    { name: "Jackfruit Tacos", type: "Main" },
    { name: "Buddha Bowl", type: "Main" },
    { name: "Avocado Toast", type: "Appetizer" },
    { name: "Chia Pudding", type: "Dessert" },
    { name: "Hummus Platter", type: "Appetizer" },
  ],
  indian: [
    { name: "Paneer Tikka", type: "Appetizer" },
    { name: "Biryani", type: "Main" },
    { name: "Butter Chicken", type: "Main" },
    { name: "Gulab Jamun", type: "Dessert" },
    { name: "Samosa", type: "Appetizer" },
    { name: "Dal Makhani", type: "Main" },
  ],
  coastal: [
    { name: "Grilled Fish", type: "Main" },
    { name: "Shrimp Scampi", type: "Main" },
    { name: "Crab Cakes", type: "Appetizer" },
    { name: "Clam Chowder", type: "Appetizer" },
    { name: "Lobster Roll", type: "Main" },
    { name: "Key Lime Pie", type: "Dessert" },
  ],
  live_counter: [
    { name: "Pasta Live Counter", type: "Main" },
    { name: "Tandoor Grill Station", type: "Main" },
    { name: "Chaat Counter", type: "Appetizer" },
    { name: "Dosa Live Station", type: "Main" },
    { name: "Dim Sum Counter", type: "Appetizer" },
    { name: "Wok Stir-Fry Station", type: "Appetizer" },
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
  const [plate, setPlate] = useState(menu.plate || []);

  const handleDishDrop = (dish, cuisineId) => {
    const newDish = {
      id: `${cuisineId}-${dish.name}-${Date.now()}`,
      name: dish.name,
      cuisine: cuisines.find((c) => c.id === cuisineId)?.name || "",
    };
    setPlate((prev) => [...prev, newDish]);
    addDishToPlate(newDish);
  };

  const removeDish = (dishId) => {
    setPlate((prev) => prev.filter((d) => d.id !== dishId));
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
                        backgroundColor: "var(--glass-fill)",
                        border: "1px solid var(--glass-border)",
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
                        <button
                          key={dish.name}
                          onClick={() => handleDishDrop(dish, selectedCuisine)}
                          className="p-6 rounded-2xl"
                          style={{
                            backgroundColor: "var(--glass-fill)",
                          }}
                        >
                          <h4>{dish.name}</h4>
                          <span className="text-[#9f9f9f] text-sm">{dish.type}</span>
                        </button>
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
                  <div className="flex items-center justify-between gap-4 flex-wrap">

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

                    <div className="flex gap-2 flex-wrap justify-end">
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
                        <span
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "0.85rem",
                            color: "var(--color-dark)",
                            opacity: 0.6,
                            alignSelf: "center",
                            marginLeft: "4px",
                          }}
                        >
                          +{plate.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* CONTINUE */}
                <motion.button
                  onClick={handleSubmit}
                  className="w-full mt-6 px-6 py-4 rounded-full flex justify-center items-center gap-3"
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