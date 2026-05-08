"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  Upload,
  Send,
  FileSpreadsheet,
  Sparkles,
} from "lucide-react";

import { useEventStore } from "@/store/useEventStore";
import { getNextRoute } from "@/lib/eventFlow";
import { useRouter, usePathname } from "next/navigation";

export default function InvitesEmail() {
  const router = useRouter();
  const pathname = usePathname();

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

  // LOCAL STATE
  const [file, setFile] = useState(invites.file);
  const [isDragging, setIsDragging] = useState(false);
  const [emailDraft, setLocalEmailDraft] = useState(
    invites.emailDraft
  );

  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(invites.isSent);

  // GENERATE DRAFT
  const generateDraft = () => {
    const draft = `Dear [Guest Name],

We’re delighted to invite you to our upcoming corporate event on [Event Date] at [Venue].

Join us for an evening of networking, keynote sessions, and celebration.

We look forward to hosting you.

Warm regards,
[Your Company]`;

    setLocalEmailDraft(draft);
    setEmailDraft(draft);
  };

  // DROP HANDLER
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];

    if (
      droppedFile &&
      (droppedFile.name.endsWith(".xlsx") ||
        droppedFile.name.endsWith(".xls"))
    ) {
      setFile(droppedFile);
      setInvitesFile(droppedFile);

      setTimeout(() => {
        generateDraft();
      }, 600);
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
    }, 2000);
    handleSubmit();
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
      background: "#62754c",
      boxShadow: "0 0 10px rgba(98,117,76,0.35)",
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

    {/* rest of your LEFT content */}

              <div
  onDragOver={(e) => {
    e.preventDefault();
    setIsDragging(true);
  }}
  onDragLeave={() => setIsDragging(false)}
  onDrop={handleDrop}
  className="relative rounded-3xl border border-dashed p-8 overflow-hidden"
  style={{
    backgroundColor: isDragging
      ? "rgba(98,117,76,0.08)"
      : "var(--glass-fill)",

    borderColor: isDragging
      ? "var(--color-primary)"
      : "var(--glass-border)",

    backdropFilter: "blur(var(--blur))",
    minHeight: "320px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  {/* FIXED LAYOUT WRAPPER (IMPORTANT) */}
  <div className="relative w-full h-full flex items-center justify-center">
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
          style={{ color: "var(--color-primary)", opacity: 0.5 }}
        />
      </motion.div>

      <p className="mt-6 text-[1rem] text-[var(--color-dark)]">
        {isDragging ? "Drop your file here" : "Drag & drop your Excel file"}
      </p>

      <p className="mt-2 text-[0.85rem] text-[var(--color-dark)] opacity-50">
        Supports .xlsx and .xls formats
      </p>
    </motion.div>

    {/* FILE STATE (NO SCALE ANIMATION) */}
    <motion.div
      animate={{ opacity: file ? 1 : 0 }}
      transition={{ duration: 0.25 }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center"
      style={{ pointerEvents: file ? "auto" : "none" }}
    >
      <FileSpreadsheet
        size={72}
        style={{ color: "var(--color-primary)" }}
      />

      <p className="mt-4 text-[1rem] font-semibold text-[var(--color-dark)]">
        {file?.name}
      </p>

      <p className="mt-2 text-[0.85rem] text-[var(--color-primary)]">
        File uploaded successfully
      </p>
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
                  className="flex items-center gap-2 text-sm"
                  style={{
                    color: "var(--color-primary)",
                  }}
                >
                  <Sparkles size={16} />
                  Generate with AI
                </button>
              </div>

              <div
                className="p-5 rounded-3xl"
                style={{
                  backgroundColor: "var(--glass-fill)",
                  backdropFilter: "blur(var(--blur))",
                  border: "1px solid var(--glass-border)",
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
                    disabled={!emailDraft || isSending}
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
                        "rgba(98,117,76,0.1)",

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
    </div>
  );
}