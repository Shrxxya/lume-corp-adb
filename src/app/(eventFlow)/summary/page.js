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
import { calculateQuotation } from "@/lib/pricing";
import QRCode from "qrcode";

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
  const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
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
      value: formatDate(summaryData.date),
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
      label: "Guests Count",
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

  const hasEntertainment =
    summaryData.entertainment.artist ||
    summaryData.entertainment.host ||
    summaryData.entertainment.lightShow;

  const quotation = useMemo(() => {
    return calculateQuotation(summaryData);
  }, [summaryData]);

  const [pdfUrl, setPdfUrl] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const generatedCanvasImage = useEventStore((s) => s.generatedCanvasImage || null);

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

      const fullUrl = `${window.location.origin}${url}`;

      const qr = await QRCode.toDataURL(fullUrl);

      setPdfUrl(fullUrl);
      setQrCode(qr);

      return fullUrl;
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmitRequest = async () => {
    if (isGenerating || isSending) return;
    try {
      setIsSending(true);

      const url = await generatePdfIfNeeded();

      await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pdfUrl: url,
          summaryData,
          quotation,
        }),
      });

      setShowSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
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
      {/* <ProgressMap currentStep={currentStep} onStepClick={handleStepClick} /> */}
      {isGenerating && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center text-center px-6"
    >
      {/* glowing orb */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-20 h-20 rounded-full blur-xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-primary), transparent 70%)",
        }}
      />

      {/* spinner */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: "linear",
        }}
        className="absolute w-16 h-16 border-2 border-[var(--color-primary)] border-t-transparent rounded-full"
      />

      {/* text */}
      <div className="mt-10 space-y-2">
        <h2
          className="text-lg font-semibold"
          style={{ color: "white" }}
        >
          Generating your proposal
        </h2>

        <p
          className="text-sm opacity-70"
          style={{ color: "white" }}
        >
          Preparing a polished proposal for your event...
        </p>
      </div>
    </motion.div>
  </div>
)}

{isSending && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center text-center px-6"
    >
      {/* glowing orb */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-20 h-20 rounded-full blur-xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-primary), transparent 70%)",
        }}
      />

      {/* spinner */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: "linear",
        }}
        className="absolute w-16 h-16 border-2 border-[var(--color-primary)] border-t-transparent rounded-full"
      />

      {/* text */}
      <div className="mt-10 space-y-2">
        <h2
          className="text-lg font-semibold"
          style={{ color: "white" }}
        >
          Sending request
        </h2>

        <p
          className="text-sm opacity-70"
          style={{ color: "white" }}
        >
          Finalizing your request...
        </p>
      </div>
    </motion.div>
  </div>
)}

      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-8 rounded-2xl text-center max-w-sm">
            <h2 className="text-xl font-semibold mb-2">
              Request Submitted!
            </h2>
            <p className="text-sm opacity-70 mb-4">
              We will be contacting you within 24 hours.
            </p>

            <button
              onClick={() => {
                setShowSuccess(false);
                router.push("/");
              }}
              className="px-4 py-2 rounded-lg bg-[#62754c] text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
      
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
              {summaryData.vendors.length > 0 ? (summaryData.vendors.map((vendor, idx) => (
                <div
                  key={vendor.uid}
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
              ))
              ) : (
                <p>No vendors selected</p>
              )}
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
            {hasEntertainment && (
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
              <div className="flex flex-col gap-3">
                {summaryData.entertainment.artist && (
                  <div className="p-4 rounded-2xl bg-white shadow-sm">
                    <p className="font-semibold">
                      {summaryData.entertainment.artist.name}
                    </p>
                    <p className="text-sm text-gray-500">Performance Artist</p>
                  </div>
                )}

                {summaryData.entertainment.host && (
                  <div className="p-4 rounded-2xl bg-white shadow-sm">
                    <p className="font-semibold">
                      {summaryData.entertainment.host.name}
                    </p>
                    <p className="text-sm text-gray-500">Host</p>
                  </div>
                )}

                {summaryData.entertainment.lightShow && (
                  <div className="p-4 rounded-2xl bg-white shadow-sm">
                    <p className="font-semibold">
                      {summaryData.entertainment.lightShow.name}
                    </p>
                    <p className="text-sm text-gray-500">Light Show</p>
                  </div>
                )}
              </div>
            </ScrollRevealCard>
            )}

            <ScrollRevealCard index={10.5}>
              <h3 style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "var(--color-primary)",
                marginBottom: "var(--space-4)"
              }}>
                Decor Theme
              </h3>

              {summaryData.theme && (
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src={summaryData.theme.image}
                    className="w-full h-64 object-cover"
                  />
                  <p className="mt-3 font-medium">
                    {summaryData.theme.label}
                  </p>
                </div>
              )}
            </ScrollRevealCard>
          </div>

          {/* Poster + Canvas Side-by-Side */}
          <div
            className={`grid gap-6 items-stretch ${
              generatedCanvasImage ? "md:grid-cols-2" : "grid-cols-1"
            }`}
          >

            {/* Poster */}
            <ScrollRevealCard index={10}>
              <div className="flex flex-col items-center h-full">
                <h3
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "var(--color-primary)",
                    marginBottom: "var(--space-4)",
                  }}
                >
                  Event Poster
                </h3>

                {summaryData.poster ? (
                  <img
                    src={summaryData.poster}
                    onClick={() => setIsModalOpen(true)}
                    className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-2xl cursor-zoom-in transition-transform duration-500 ease-out hover:scale-105 shadow-lg"
                  />
                ) : (
                  <p className="opacity-60 text-sm">No poster generated</p>
                )}
              </div>
            </ScrollRevealCard>

            {/* Canvas Image */}
            <ScrollRevealCard index={10.2}>
              <div className="flex flex-col items-center h-full">
                <h3
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "var(--color-primary)",
                    marginBottom: "var(--space-4)",
                  }}
                >
                  Event Setup
                </h3>

                {generatedCanvasImage ? (
                  <img
                    src={generatedCanvasImage}
                    className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-2xl shadow-lg"
                  />
                ) : (
                  <div className="p-6 rounded-2xl border opacity-70 text-center">
                    Indoor setup selected — no spatial canvas required
                  </div>
                )}
              </div>
            </ScrollRevealCard>

          </div>

          {/* Progress Checklist */}
          {/* <ScrollRevealCard index={11}>
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
          </ScrollRevealCard> */}

          {/* Quotation Section */}
          <ScrollRevealCard index={12}>
            <h3
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "var(--color-primary)",
                marginBottom: "var(--space-4)",
              }}
            >
              Estimated Planning Fee
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Base Fee ({(quotation.basePercent * 100).toFixed(0)}%)</span>
                <span>₹{quotation.serviceFee}L</span>
              </div>

              <div className="flex justify-between">
                <span>GST (18%)</span>
                <span>₹{quotation.gst}L</span>
              </div>

              <div className="border-t pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span>₹{quotation.total}L</span>
              </div>
            </div>

            <p className="mt-4 text-sm opacity-70">
              Final pricing may vary based on vendor negotiations and custom requirements.
            </p>
          </ScrollRevealCard>

          {/* Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
            <motion.button
              onClick={async () => {
                if (isGenerating || isSending) return;
                const url = await generatePdfIfNeeded();

                if (!url) return;

                const a = document.createElement("a");
                a.href = url;
                a.download = "event-proposal.pdf";
                a.click();
              }}
              whileHover={{ scale: 1.02, boxShadow: "var(--shadow-2)" }}
              whileTap={{ scale: 0.98 }}
              className="py-4 rounded-2xl flex items-center justify-center gap-2 border shadow-sm"
              style={{ 
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "1rem",
                backgroundColor: "var(--glass-fill)",
                // borderColor: "var(--glass-border)",
                color: "var(--color-dark)",
                backdropFilter: "blur(16px)"
              }}
            >
              <Download size={18} />
              Export PDF
            </motion.button>

            <motion.button
              onClick={async () => {
                if (isGenerating || isSending) return;
                await generatePdfIfNeeded();
                setShowQR(true);
              }}
              whileHover={{ scale: 1.02, boxShadow: "var(--glow-green)" }}
              whileTap={{ scale: 0.98 }}
              //onClick={scrollToQR}
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
          {/* {showQR && (
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
          )} */}
          {showQR && pdfUrl && (
            <motion.div ref={QRRef} 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="p-10 text-center mt-8 rounded-3xl flex flex-col items-center"
              style={{ 
                backgroundColor: "var(--glass-fill)",
                backdropFilter: "blur(16px)",
                border: "1px solid var(--glass-border)",
                boxShadow: "var(--shadow-2)"
              }}>
              <img src={qrCode} className="w-40 h-40" />

              <p className="mt-4 text-sm opacity-70">
                Scan to view full proposal
              </p>

              <a href={pdfUrl} target="_blank" className="text-sm underline">
                Open PDF
              </a>

              {/* SUBMIT BUTTON */}
              <button
                onClick={handleSubmitRequest}
                className="mt-6 px-6 py-3 rounded-xl bg-[#62754c] text-white"
              >
                Submit Request
              </button>
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
      {/* MODAL */}
      {isModalOpen && summaryData.poster && (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      onClick={() => setIsModalOpen(false)}
    >
      <img
        src={summaryData.poster}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] max-w-[90vw] rounded-xl"
      />
    </div>
  )}
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