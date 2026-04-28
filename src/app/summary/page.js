"use client";

import { motion, useScroll } from "framer-motion";
import { useRef, useState, useMemo, useEffect } from "react";
import {
  Calendar, MapPin, Users, IndianRupee, QrCode, CheckCircle2,
  Download, Share2, Utensils, Clapperboard, Palette, Mail, PartyPopper
} from "lucide-react";
import ProgressMap from "@/components/ProgressMap";
import { useRouter } from "next/navigation";
import { useEventStore } from "@/store/useEventStore";

export default function FinalSummary({ appData, onReset }) {
  const router = useRouter();
  const QRRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(12);
  const completeStep = useEventStore((state) => state.completeStep);
  const setStep = useEventStore((state) => state.setStep);

  const handleStepClick = (stepId) => {
    if (stepId <= currentStep) {
      console.log(`Navigating to step ${stepId}`);
    }
  };

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const [showQR, setShowQR] = useState(false);

  const hasHydrated = useEventStore((state) => state.hasHydrated);
  const getSummaryData = useEventStore((state) => state.getSummaryData);

  const scrollToQR = () => setShowQR(true);
  const summaryData = useMemo(() => {
  return hasHydrated ? getSummaryData()
  : {
      eventName: "",
      date: "",
      location: "",
      guestCount: 0,
      budget: 0,
      budgetBreakdown: [],
      vendors: [],
      menu: [],
      timeline: [],
      entertainment: "",
      decor: "",
      poster: "",
    };
    }, [hasHydrated, getSummaryData]);

  const summaryStats = [
    {
      icon: Calendar,
      label: "Event Date",
      value: summaryData.date,
      color: "var(--color-primary)"
    },
    {
      icon: MapPin,
      label: "Location",
      value: summaryData.location,
      color: "var(--color-green-mid)"
    },
    {
      icon: Users,
      label: "Guests",
      value: `${summaryData.guestCount}`,
      color: "var(--color-accent)"
    },
    {
      icon: IndianRupee,
      label: "Budget",
      value: `₹${summaryData.budget}L`,
      color: "var(--color-gold)"
    }
  ];

  const screenSections = [
    { id: 1, name: "Event Details", icon: Calendar, completed: true },
    { id: 2, name: "Guests", icon: Users, completed: true },
    { id: 3, name: "Timings", icon: Calendar, completed: true },
    { id: 4, name: "Weather", icon: MapPin, completed: true },
    { id: 5, name: "Budget", icon: IndianRupee, completed: true },
    { id: 6, name: "Vendors", icon: Users, completed: true },
    { id: 7, name: "Menu", icon: Utensils, completed: true },
    { id: 8, name: "Timeline", icon: Calendar, completed: true },
    { id: 9, name: "Entertainment", icon: Clapperboard, completed: true },
    { id: 10, name: "Decor", icon: Palette, completed: true },
    { id: 11, name: "Poster", icon: PartyPopper, completed: true },
    { id: 12, name: "Invites", icon: Mail, completed: true }
  ];

  const budgetColors = {
    food: "#62754C",
    decor: "#8BA672",
    tech: "#A8BC92",
    Entertainment: "#C8D5B9",
    extras: "#2A3050"
  };

  useEffect(() => {
    if (showQR && QRRef.current) {
      QRRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [showQR]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-bg)" }}>
      <ProgressMap currentStep={currentStep} onStepClick={handleStepClick} />
      
      <div
        ref={containerRef}
        className="pt-32 pb-20 px-8 min-h-screen overflow-y-auto"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6"
              style={{ backgroundColor: "var(--color-primary)" }}
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <CheckCircle2 size={48} style={{ color: "var(--color-bg)" }} />
            </motion.div>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                color: "var(--color-dark)",
                marginBottom: "1rem",
                fontStyle: "italic",
                fontWeight: 700,
                lineHeight: 1.05
              }}
            >
              {hasHydrated ? summaryData.eventName : ""}
            </h1>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.25rem",
                color: "var(--color-dark-mid)",
                opacity: 0.7
              }}
            >
              Your event vision is complete
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {summaryStats.map((stat, idx) => (
              <ScrollRevealCard key={stat.label} index={idx}>
                <div className="flex items-start gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ 
                      backgroundColor: stat.color,
                      boxShadow: "var(--shadow-1)"
                    }}
                  >
                    <stat.icon size={24} style={{ color: "var(--color-bg)" }} />
                  </div>

                  <div className="min-w-0">
                    <p 
                      style={{ 
                        fontFamily: "var(--font-body)",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "var(--color-accent)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase"
                      }}
                    >
                      {stat.label}
                    </p>
                    <p 
                      style={{ 
                        fontFamily: "var(--font-body)",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        color: "var(--color-dark)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}
                    >
                      {stat.value}
                    </p>
                  </div>
                </div>
              </ScrollRevealCard>
            ))}
          </div>

          {/* Budget Distribution */}
          <ScrollRevealCard index={4}>
            <h3 
              style={{ 
                fontFamily: "var(--font-body)",
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "var(--color-primary)",
                marginBottom: "var(--space-5)"
              }}
            >
              Budget Distribution
            </h3>

            <div className="space-y-4">
              {summaryData.budgetBreakdown.map((item, idx) => (
                <div key={item.category}>
                  <div className="flex justify-between mb-2">
                    <span 
                      style={{ 
                        fontFamily: "var(--font-body)",
                        fontSize: "0.9rem",
                        color: "var(--color-dark-mid)"
                      }}
                    >
                      {item.category}
                    </span>
                    <span 
                      style={{ 
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        color: "var(--color-gold)"
                      }}
                    >
                      {item.amount}%
                    </span>
                  </div>

                  <div 
                    className="h-2 rounded-full overflow-hidden"
                    style={{ backgroundColor: "rgba(42, 48, 80, 0.1)" }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.amount}%` }}
                      transition={{ duration: 0.8, delay: idx * 0.1 }}
                      style={{
                        backgroundColor: budgetColors[item.category] || "#999"
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </ScrollRevealCard>

          {/* Vendors */}
          <ScrollRevealCard index={5}>
            <h3 
              style={{ 
                fontFamily: "var(--font-body)",
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "var(--color-primary)",
                marginBottom: "var(--space-4)"
              }}
            >
              Selected Vendors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {summaryData.vendors.map((vendor, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl"
                  style={{ 
                    backgroundColor: "rgba(98, 117, 76, 0.1)",
                    border: "1px solid rgba(98, 117, 76, 0.2)"
                  }}
                >
                  <p 
                    style={{ 
                      fontFamily: "var(--font-body)",
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "var(--color-dark)"
                    }}
                  >
                    {vendor.name || "Vendor"}
                  </p>
                  <p 
                    style={{ 
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8rem",
                      color: "var(--color-accent)"
                    }}
                  >
                    {vendor.category || "Service"}
                  </p>
                </div>
              ))}
            </div>
          </ScrollRevealCard>

          {/* Menu */}
          <ScrollRevealCard index={6}>
            <h3 
              style={{ 
                fontFamily: "var(--font-body)",
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "var(--color-primary)",
                marginBottom: "var(--space-4)"
              }}
            >
              Menu Selection
            </h3>
            <div className="flex flex-wrap gap-2">
              {summaryData.menu.length > 0 ? (summaryData.menu?.map((dish, idx) => (
                <span 
                  key={idx} 
                  className="px-4 py-2 rounded-full text-sm"
                  style={{ 
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    backgroundColor: "var(--glass-fill)",
                    border: "1px solid var(--glass-border)",
                    color: "var(--color-dark-mid)"
                  }}
                >
                  {dish.name}
                  <span 
                    style={{ 
                      fontSize: "0.7rem", 
                      color: "var(--color-accent)",
                      marginLeft: "6px"
                    }}
                  >
                    {dish.cuisine}
                  </span>
                </span>
              ))) : (<p> No menu selected</p>)}
            </div>
          </ScrollRevealCard>

          {/* Timeline */}
          <ScrollRevealCard index={7}>
            <h3 
              style={{ 
                fontFamily: "var(--font-body)",
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "var(--color-primary)",
                marginBottom: "var(--space-4)"
              }}
            >
              Event Timeline
            </h3>
            <div className="space-y-3">
              {summaryData.timeline.map((event, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-4 p-3 rounded-xl"
                  style={{ 
                    backgroundColor: "rgba(98, 117, 76, 0.08)"
                  }}
                >
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  />
                  <span 
                    style={{ 
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      color: "var(--color-dark)",
                      flex: 1
                    }}
                  >
                    {event.title || "Event"}
                  </span>
                  <span 
                    style={{ 
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.85rem",
                      color: "var(--color-accent)"
                    }}
                  >
                    {event.time || "--"}
                  </span>
                </div>
              ))}
            </div>
          </ScrollRevealCard>

          {/* Entertainment & Decor */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <ScrollRevealCard index={8}>
              <h3 
                style={{ 
                  fontFamily: "var(--font-body)",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "var(--color-primary)",
                  marginBottom: "var(--space-4)"
                }}
              >
                Entertainment
              </h3>
              <div 
                className="p-4 rounded-2xl"
                style={{ 
                  backgroundColor: "rgba(201, 168, 76, 0.15)",
                  border: "1px solid rgba(201, 168, 76, 0.3)"
                }}
              >
                <p 
                  style={{ 
                    fontFamily: "var(--font-body)",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: "var(--color-dark)"
                  }}
                >
                  {summaryData.entertainment}
                </p>
                <p 
                  style={{ 
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8rem",
                    color: "var(--color-gold)"
                  }}
                >
                  Performance Artist
                </p>
              </div>
            </ScrollRevealCard>

            <ScrollRevealCard index={9}>
              <h3 
                style={{ 
                  fontFamily: "var(--font-body)",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "var(--color-primary)",
                  marginBottom: "var(--space-4)"
                }}
              >
                Decor Theme
              </h3>
              <div 
                className="p-4 rounded-2xl"
                style={{ 
                  backgroundColor: "rgba(139, 166, 114, 0.15)",
                  border: "1px solid rgba(139, 166, 114, 0.3)"
                }}
              >
                <p 
                  style={{ 
                    fontFamily: "var(--font-body)",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: "var(--color-dark)"
                  }}
                >
                  {summaryData.decor}
                </p>
                <p 
                  style={{ 
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8rem",
                    color: "var(--color-green-mid)"
                  }}
                >
                  Visual Design
                </p>
              </div>
            </ScrollRevealCard>
          </div>

          {/* Poster */}
          <ScrollRevealCard index={10}>
            <h3 
              style={{ 
                fontFamily: "var(--font-body)",
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "var(--color-primary)",
                marginBottom: "var(--space-4)"
              }}
            >
              Event Poster
            </h3>
            <div 
              className="p-4 rounded-2xl flex items-center gap-4"
              style={{ 
                backgroundColor: "rgba(42, 48, 80, 0.08)"
              }}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "var(--color-dark)" }}
              >
                <PartyPopper size={24} style={{ color: "var(--color-bg)" }} />
              </div>
              <div>
                <p 
                  style={{ 
                    fontFamily: "var(--font-body)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "var(--color-dark)"
                  }}
                >
                  {summaryData.poster}
                </p>
                <p 
                  style={{ 
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8rem",
                    color: "var(--color-dark-mid)"
                  }}
                >
                  AI-generated poster ready
                </p>
              </div>
            </div>
          </ScrollRevealCard>

          {/* Progress Checklist */}
          <ScrollRevealCard index={11}>
            <h3 
              style={{ 
                fontFamily: "var(--font-body)",
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "var(--color-primary)",
                marginBottom: "var(--space-4)"
              }}
            >
              Planning Progress
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {screenSections.map((screen) => (
                <div
                  key={screen.id}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl"
                  style={{ 
                    backgroundColor: screen.completed 
                      ? "rgba(98, 117, 76, 0.15)" 
                      : "rgba(42, 48, 80, 0.08)",
                    border: screen.completed 
                      ? "1px solid rgba(98, 117, 76, 0.3)" 
                      : "1px solid transparent"
                  }}
                >
                  <screen.icon 
                    size={20} 
                    style={{ 
                      color: screen.completed 
                        ? "var(--color-primary)" 
                        : "var(--color-dark-mid)",
                      opacity: screen.completed ? 1 : 0.4
                    }} 
                  />
                  <span 
                    style={{ 
                      fontFamily: "var(--font-body)",
                      fontSize: "0.7rem",
                      fontWeight: 500,
                      color: screen.completed 
                        ? "var(--color-dark)" 
                        : "var(--color-dark-mid)",
                      opacity: screen.completed ? 1 : 0.4,
                      textAlign: "center"
                    }}
                  >
                    {screen.name}
                  </span>
                </div>
              ))}
            </div>
          </ScrollRevealCard>

          {/* Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "var(--shadow-2)" }}
              whileTap={{ scale: 0.98 }}
              className="py-4 rounded-2xl flex items-center justify-center gap-2 border"
              style={{ 
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "1rem",
                backgroundColor: "var(--glass-fill)",
                borderColor: "var(--glass-border)",
                color: "var(--color-dark)",
                backdropFilter: "blur(16px)"
              }}
            >
              <Download size={18} />
              Export PDF
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "var(--glow-green)" }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToQR}
              className="py-4 rounded-2xl flex items-center justify-center gap-2"
              style={{ 
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: "1rem",
                backgroundColor: "var(--color-dark)",
                color: "var(--color-bg)"
              }}
            >
              <Share2 size={18} />
              Share Vision
            </motion.button>
          </div>

          {/* QR Code */}
          {showQR && (
            <motion.div
              ref={QRRef}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="p-10 text-center mt-8 rounded-3xl flex flex-col items-center"
              style={{ 
                backgroundColor: "var(--glass-fill)",
                backdropFilter: "blur(16px)",
                border: "1px solid var(--glass-border)",
                boxShadow: "var(--shadow-2)"
              }}
            >
              <QrCode size={120} style={{ color: "var(--color-dark)" }} />
              <p 
                className="mt-4"
                style={{ 
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  color: "var(--color-dark-mid)",
                  opacity: 0.7
                }}
              >
                Scan to view event details
              </p>
            </motion.div>
          )}

          {/* Reset
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={onReset}
            className="w-full mt-10 py-4 rounded-2xl border"
            style={{ 
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              fontSize: "0.95rem",
              backgroundColor: "transparent",
              borderColor: "var(--glass-border)",
              color: "var(--color-dark-mid)",
              opacity: 0.7
            }}
          >
            Plan Another Event
          </motion.button> */}
        </motion.div>
      </div>
    </div>
  );
}

/* Scroll Reveal Card */
function ScrollRevealCard({ children, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="p-6 rounded-3xl mb-6"
      style={{
        backgroundColor: "var(--glass-fill)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid var(--glass-border)",
        boxShadow: "var(--shadow-1)"
      }}
    >
      {children}
    </motion.div>
  );
}