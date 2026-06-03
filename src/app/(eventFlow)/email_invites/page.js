"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef } from "react";
import {
  ArrowRight,
  Upload,
  Send,
  FileSpreadsheet,
  Sparkles,
  CheckCircle2 
} from "lucide-react";

import { useEventStore } from "@/store/useEventStore";
import { getNextRoute } from "@/lib/eventFlow";
import { useRouter, usePathname } from "next/navigation";

export default function InvitesEmail() {
  const router = useRouter();
  const pathname = usePathname();

  const fileInputRef = useRef(null);

  const eventDetails = useEventStore((s) => s.eventDetails);

  // STORE
  const invites = useEventStore((state) => state.invites);
  const setInvitesFile = useEventStore((state) => state.setInvitesFile);
  const setEmailDraft = useEventStore((state) => state.setEmailDraft);
  const setInvitesSent = useEventStore((state) => state.setInvitesSent);

  const currentStep = useEventStore((state) => state.currentStep);
  const completeStep = useEventStore((state) => state.completeStep);
  const setStep = useEventStore((state) => state.setStep);
  const setActiveStep = useEventStore((state) => state.setActiveStep);
  const [showSuccess, setShowSuccess] = useState(false);

  // LOCAL STATE
  const [file, setFile] = useState(invites.file);
  const [isDragging, setIsDragging] = useState(false);
  const [emailDraft, setLocalEmailDraft] = useState(
    invites.emailDraft
  );

  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(invites.isSent);
  const [isGeneratingDraft, setIsGeneratingDraft] = useState(false);

  const getSummaryData = useEventStore((s) => s.getSummaryData);
  const summaryData = getSummaryData();

  // GENERATE DRAFT
  const generateDraft = async () => {
  try {
    setIsGeneratingDraft(true);

    const res = await fetch("/api/generate-invite-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        summaryData,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error);
    }

    setLocalEmailDraft(data.email);
    setEmailDraft(data.email);
  } catch (err) {
    console.error(err);
  } finally {
    setIsGeneratingDraft(false);
  }
};

const processFile = (selectedFile) => {
  if (
    selectedFile &&
    (selectedFile.name.endsWith(".xlsx") ||
      selectedFile.name.endsWith(".xls"))
  ) {
    setFile(selectedFile);
    setInvitesFile(selectedFile);

  }
};

  // DROP HANDLER
  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   setIsDragging(false);

  //   const droppedFile = e.dataTransfer.files[0];

  //   if (
  //     droppedFile &&
  //     (droppedFile.name.endsWith(".xlsx") ||
  //       droppedFile.name.endsWith(".xls"))
  //   ) {
  //     setFile(droppedFile);
  //     setInvitesFile(droppedFile);

  //     // setTimeout(() => {
  //     //   generateDraft();
  //     // }, 600);
  //   }
  // };
  const handleDrop = (e) => {
  e.preventDefault();
  setIsDragging(false);

  const droppedFile = e.dataTransfer.files?.[0];
  processFile(droppedFile);
};

const handleFileSelect = (e) => {
  const selectedFile = e.target.files?.[0];

  if (selectedFile) {
    processFile(selectedFile);
  }
};

  // TEXTAREA EDIT
  const handleEmailDraftChange = (value) => {
    setLocalEmailDraft(value);
    setEmailDraft(value);
  };

  // SEND
  const handleSend = () => {
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setSent(true);
      setInvitesSent(true);

      setShowSuccess(true);
    }, 2000);
  };

  // CONTINUE
  const handleSubmit = (e) => {
    //e.preventDefault();

    completeStep(currentStep);

    setStep("summary");
    setActiveStep("summary");

    const nextRoute = getNextRoute(eventDetails, pathname);

    router.push(nextRoute);
  };

  return (
    <div className="min-h-screen dark:bg-black">
      <div
        className="pt-20 px-6 md:px-8 min-h-screen"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="max-w-6xl mx-auto"
        >
          {/* HEADER */}
          <div className="text-center mb-10">
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                color: "var(--color-dark)",
                marginBottom: "1rem",
                fontStyle: "italic",
              }}
            >
              Echo
            </h1>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.05rem",
                color: "var(--color-dark)",
                opacity: 0.7,
              }}
            >
              Send invitations to your guests
            </p>
          </div>

          {/* MAIN GRID */}
          <div className="relative">
              {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"> */}
            <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-8">
            {/* LEFT */}
            <div className="relative md:pr-8">
  {/* glowing shortened border */}
  <div
    className="hidden md:block absolute right-0 top-0 h-[95%] w-[2px]"
    style={{
      background: "#58644B",
      boxShadow: "0 0 10px #E7E7DF",
      opacity: 0.8,
    }}
  />

  {/* actual content */}
  <div>
    <h3
      className="text-center mb-5"
      style={{
        fontFamily: "var(--font-body)",
        fontSize: "1.15rem",
        fontWeight: 600,
        color: "var(--color-dark)",
      }}
    >
      Upload Guest List
    </h3>
    </div>
      <input
  ref={fileInputRef}
  type="file"
  accept=".xlsx,.xls"
  className="hidden"
  onChange={handleFileSelect}
/>
    {/* rest of your LEFT content */}

              <div
  onClick={() => fileInputRef.current?.click()}
  onDragOver={(e) => {
    e.preventDefault();
    setIsDragging(true);
  }}
  onDragLeave={() => setIsDragging(false)}
  onDrop={handleDrop}
  className="relative rounded-3xl border border-dashed p-8 overflow-hidden cursor-pointer"
  style={{
    backgroundColor: "#E7E7DF",
    borderColor: "#e7e7df",
    backdropFilter: "blur(var(--blur))",
    minHeight: "320px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  <div className="relative w-full h-full flex items-center justify-center">
    
    {/* EMPTY STATE */}
    <motion.div
      animate={{ opacity: file ? 0 : 1 }}
      transition={{ duration: 0.25 }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center"
      style={{ pointerEvents: file ? "none" : "auto" }}
    >
      <motion.div
        animate={{ y: isDragging ? -6 : [0, -5, 0] }}
        transition={{
          duration: 2,
          repeat: isDragging ? 0 : Infinity,
          ease: "easeInOut",
        }}
      >
        <Upload
          size={56}
          style={{
            color: "var(--color-primary)",
            opacity: 0.5,
          }}
        />
      </motion.div>

      <p className="mt-6 text-[1rem] text-[var(--color-dark)]">
        {isDragging
          ? "Drop your file here"
          : "Drag & drop your Excel file"}
      </p>

      <p className="mt-2 text-[0.85rem] text-[var(--color-dark)] opacity-50">
        or browse from your device
      </p>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          fileInputRef.current?.click();
        }}
        className="mt-6 px-5 py-3 rounded-xl"
        style={{
          backgroundColor: "var(--color-primary)",
          color: "var(--color-bg)",
        }}
      >
        Browse Files
      </button>

      <p className="mt-3 text-[0.75rem] opacity-40">
        Supports .xlsx and .xls formats
      </p>
    </motion.div>

    {/* FILE UPLOADED STATE */}
    <motion.div
      animate={{ opacity: file ? 1 : 0 }}
      transition={{ duration: 0.25 }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center"
      style={{ pointerEvents: file ? "auto" : "none" }}
    >
      <FileSpreadsheet
        size={72}
        style={{
          color: "var(--color-primary)",
        }}
      />

      <p className="mt-4 text-[1rem] font-semibold text-[var(--color-dark)]">
        {file?.name}
      </p>

      <p className="mt-2 text-[0.85rem] text-[var(--color-primary)]">
        File uploaded successfully
      </p>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          fileInputRef.current?.click();
        }}
        className="mt-5 px-5 py-3 rounded-xl"
        style={{
          backgroundColor: "var(--color-primary)",
          color: "var(--color-bg)",
        }}
      >
        Replace File
      </button>
    </motion.div>
  </div>
</div>
            </div>

            {/* RIGHT */}
            <div>
              <div className="flex items-center justify-between">
                <h3
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "1.15rem",
                    fontWeight: 600,
                    color: "var(--color-dark)",
                  }}
                >
                  Invitation Message
                </h3>

                <button
                  onClick={generateDraft}
                  disabled={isGeneratingDraft}
                  className="flex items-center gap-2 text-sm disabled:opacity-50"
                  style={{
                    color: "var(--color-primary)",
                  }}
                >
                  <Sparkles
                    size={16}
                    className={isGeneratingDraft ? "animate-pulse" : ""}
                  />

                  {isGeneratingDraft
                    ? "Generating..."
                    : "Generate with AI"}
                </button>
              </div>

              <div
                className="p-5 rounded-3xl"
                style={{
                  backgroundColor: "#E7E7DF",
                  backdropFilter: "blur(var(--blur))",
                  border: "1px solid #e7e7df",
                  minHeight: "320px",
                }}
              >
                <textarea
                  value={emailDraft}
                  onChange={(e) =>
                    handleEmailDraftChange(e.target.value)
                  }
                  placeholder="Write your invitation message..."
                  className="w-full h-[260px] p-5 rounded-2xl outline-none resize-none hide-scrollbar"
                  style={{
                    backgroundColor:
                      "rgba(255,255,255,0.6)",

                    border:
                      "1px solid rgba(0,0,0,0.06)",

                    fontFamily: "var(--font-body)",
                    fontSize: "0.95rem",
                    color: "var(--color-dark)",
                    lineHeight: 1.7,
                  }}
                />

                {!sent ? (
                  <motion.button
                    onClick={handleSend}
                    disabled={!emailDraft?.trim() || !file || isSending}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-5 px-8 py-4 rounded-2xl flex items-center justify-center gap-3 disabled:opacity-50"
                    style={{
                      backgroundColor:
                        "var(--color-primary)",
                      color: "var(--color-bg)",
                    }}
                  >
                    <Send size={18} />

                    {isSending
                      ? "Sending..."
                      : "Send Invitations"}
                  </motion.button>
                ) : (
                  <div
                    className="text-center p-4 rounded-2xl mt-5"
                    style={{
                      backgroundColor:
                        "#E7E7DF",

                      color: "var(--color-primary)",
                    }}
                  >
                    Invitations sent successfully
                  </div>
                )}
              </div>
            </div>
          </div>
          </div>

          {/* CONTINUE */}
          {/* <motion.button
            onClick={handleSubmit}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full px-8 py-5 rounded-full flex justify-center items-center gap-3 mt-4"
            style={{
              backgroundColor: "var(--color-dark)",
              color: "var(--color-bg)",
            }}
          >
            Continue <ArrowRight size={20} />
          </motion.button> */}
        </motion.div>
      </div>
      <InviteSuccessModal
        open={showSuccess}
        onContinue={handleSubmit}
      />
    </div>
  );
}

function InviteSuccessModal({ open, onContinue }) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
          style={{
            background: "rgba(20,24,42,0.5)",
            backdropFilter: "blur(8px)",
          }}
        />

        {/* modal */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "relative",
            width: "90%",
            maxWidth: 420,
            background: "var(--color-bg, #E7E7DF)",
            border: "1px solid rgba(20,24,42,0.08)",
            borderRadius: 28,
            overflow: "hidden",
            boxShadow: "0 32px 80px rgba(0,0,0,0.18)",
          }}
        >
          {/* top accent */}
          <div
            style={{
              height: 3,
              background:
                "linear-gradient(90deg, #C9A84C, #58644B)",
            }}
          />

          <div
            style={{
              padding: "40px 32px",
              textAlign: "center",
            }}
          >
            {/* icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              style={{
                width: 72,
                height: 72,
                margin: "0 auto 22px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "#E7E7DF",
              }}
            >
              <CheckCircle2
                size={36}
                color="var(--color-primary)"
              />
            </motion.div>

            {/* title */}
            <h2
              style={{
                fontFamily:
                  "var(--font-display, Georgia, serif)",
                fontSize: "1.7rem",
                fontWeight: 700,
                fontStyle: "italic",
                color: "var(--color-dark, #14182A)",
                marginBottom: 12,
              }}
            >
              Invitations Sent
            </h2>

            {/* text */}
            <p
              style={{
                fontFamily:
                  "var(--font-body, 'DM Sans', sans-serif)",
                fontSize: 14,
                lineHeight: 1.7,
                color: "rgba(20,24,42,0.6)",
                marginBottom: 28,
              }}
            >
              Your guest invitations have been successfully sent.
            </p>

            {/* button */}
            <button
              onClick={onContinue}
              className="w-[25vw]"
              style={{
                padding: "12px 28px",
                fontFamily:
                  "var(--font-body, 'DM Sans', sans-serif)",
                fontSize: 13,
                fontWeight: 700,
                background: "var(--color-dark, #14182A)",
                color: "var(--color-bg, #E7E7DF)",
                border: "none",
                borderRadius: 14,
                cursor: "pointer",
              }}
            >
              Continue
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}