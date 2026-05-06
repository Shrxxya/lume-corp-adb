"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Plus, Check, Star } from "lucide-react";
import { useEventStore } from "@/store/useEventStore";
import ProgressMap from "@/components/ProgressMap";

import { getNextRoute } from "@/lib/eventFlow";
import { useRouter, usePathname } from "next/navigation";

const vendorsList = [
  { id: "1", name: "Elegant Blooms", category: "Floristry", rating: 4.9, projects: 150 },
  { id: "2", name: "Peak Productions", category: "AV & Tech", rating: 4.8, projects: 200 },
  { id: "3", name: "Gourmet Events", category: "Catering", rating: 4.9, projects: 300 },
  { id: "4", name: "Light Masters", category: "Lighting", rating: 4.7, projects: 180 },
  { id: "5", name: "Stage Craft", category: "Stage Design", rating: 4.8, projects: 120 },
  { id: "6", name: "Sound Perfect", category: "Audio", rating: 4.6, projects: 160 },
];

export default function VendorMarketplace() {
  const router = useRouter();
  const pathname = usePathname();
const eventDetails = useEventStore((s) => s.eventDetails);

  // Get store functions
  const vendors = useEventStore((state) => state.vendors);
  const shortlistVendor = useEventStore((state) => state.shortlistVendor);
  const removeVendor = useEventStore((state) => state.removeVendor);
  const currentStep = useEventStore((state) => state.currentStep);
  const completeStep = useEventStore((state) => state.completeStep);
  const setStep = useEventStore((state) => state.setStep);
  const setActiveStep = useEventStore((state) => state.setActiveStep);

  // Pre-fill shortlist from store
  //const [shortlist, setShortlist] = useState(vendors.map((v) => v.id));
  const shortlistedIds = vendors.map((v) => v.id);
  console.log("Shortlisted Vendor IDs:", shortlistedIds);
  const [hoveredVendor, setHoveredVendor] = useState(null);

  const toggleShortlist = (vendor) => {
    const isShortlisted = shortlistedIds.includes(vendor.id);

    if (isShortlisted) {
      removeVendor(vendor.id);
    } else {
      shortlistVendor(vendor);
    }
  };

  const handleStepClick = (stepId) => {
    if (stepId <= currentStep) {
      console.log(`Navigating to step ${stepId}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    completeStep(currentStep);
    //setStep(currentStep + 1);
    setStep("menu"); // or nextStepName
setActiveStep("menu");
    const nextRoute = getNextRoute(eventDetails, pathname);
  router.push(nextRoute);
    //router.push("/menu");
  };

  return (
    <div className="min-h-screen dark:bg-black">
        {/* <ProgressMap currentStep={currentStep} onStepClick={handleStepClick}/> */}
        <div
      className="pt-20 pb-20 px-8 min-h-screen"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto"
      >
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
          Curated
        </h1>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1.125rem",
            color: "var(--color-dark)",
            opacity: 0.7,
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          Select your preferred vendors
        </p>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.95rem",
            color: "var(--color-primary)",
            textAlign: "center",
            marginBottom: "3rem",
            fontWeight: 500,
          }}
        >
          {shortlistedIds.length} vendor{shortlistedIds.length !== 1 ? "s" : ""} shortlisted
        </p>

        {/* Vendor Carousel */}
        <div className="overflow-x-auto pb-8 mb-8 hide-scrollbar">
          <div className="flex gap-6 px-4" style={{ width: "max-content" }}>
            {vendorsList.map((vendor, idx) => {
              const isShortlisted = shortlistedIds.includes(vendor.id);
              
              const isHovered = hoveredVendor === vendor.id;

              return (
                <motion.div
                  key={vendor.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setHoveredVendor(vendor.id)}
                  onMouseLeave={() => setHoveredVendor(null)}
                  className="flex-shrink-0 rounded-3xl overflow-hidden relative group cursor-pointer mt-2"
                  style={{
                    width: "400px",
                    height: "500px",
                    backgroundColor: "var(--glass-fill)",
                    backdropFilter: "blur(var(--blur))",
                    border: `2px solid ${
                      isShortlisted ? "var(--color-primary)" : "var(--glass-border)"
                    }`,
                  }}
                  whileHover={{ y: -8 }}
                  onClick={() => toggleShortlist(vendor)}
                >
                  {/* Background */}
                  <div
                    className="absolute inset-0 transition-transform duration-500"
                    style={{
                      background: `linear-gradient(135deg,
                        rgba(98,117,76,${0.3 + (idx % 3) * 0.1}),
                        rgba(20,24,42,${0.2 + (idx % 2) * 0.1}))`,
                      transform: isHovered ? "scale(1.05)" : "scale(1)",
                    }}
                  >
                    {isHovered && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                          backgroundColor: "rgba(0,0,0,0.3)",
                          backdropFilter: "blur(2px)",
                        }}
                      >
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "0.875rem",
                            color: "var(--color-bg)",
                            opacity: 0.7,
                          }}
                        >
                          Playing Preview...
                        </motion.div>
                      </motion.div>
                    )}
                  </div>

                  {/* Content */}
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-6"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.7), transparent 60%)",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "1.5rem",
                        fontWeight: 600,
                        color: "var(--color-bg)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {vendor.name}
                    </h3>

                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "1rem",
                        color: "var(--color-bg)",
                        opacity: 0.8,
                        marginBottom: "1rem",
                      }}
                    >
                      {vendor.category}
                    </p>

                    <div className="flex items-center gap-4">
                      <span className="text-sm text-white/90">⭐ {vendor.rating}</span>
                      <span className="text-sm text-white/90">
                        {vendor.projects} projects
                      </span>
                    </div>
                  </div>

                  {/* Button */}
                  <motion.div
                    className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: isShortlisted
                        ? "#62754c"
                        : "rgba(253,253,248,0.9)",
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isShortlisted ? (
                      <Check size={24} style={{ color: "#ffffff" }} />
                    ) : (
                      <Plus size={24} style={{ color: "var(--color-dark)" }} />
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Continue */}
        <motion.button
          onClick={handleSubmit}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-8 py-5 rounded-full flex items-center justify-center gap-3"
          style={{
            backgroundColor: "var(--color-dark)",
            color: "var(--color-bg)",
            fontSize: "1.125rem",
            fontWeight: 600,
          }}
        >
          Continue
          <ArrowRight size={20} />
        </motion.button>
      </motion.div>
    </div>
    </div>
    
  );
}