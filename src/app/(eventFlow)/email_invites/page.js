"use client"

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Upload, Send, FileSpreadsheet } from "lucide-react";
import { useEventStore } from "@/store/useEventStore";
import ProgressMap from "@/components/ProgressMap";

import { getNextRoute } from "@/lib/eventFlow";
import { useRouter, usePathname } from "next/navigation";


export default function InvitesEmail({ onNext }) {
  const router = useRouter();
  const pathname = usePathname();
const eventDetails = useEventStore((s) => s.eventDetails);

  // Get store functions
  const invites = useEventStore((state) => state.invites);
  const setInvitesFile = useEventStore((state) => state.setInvitesFile);
  const setEmailDraft = useEventStore((state) => state.setEmailDraft);
  const setInvitesSent = useEventStore((state) => state.setInvitesSent);
  const currentStep = useEventStore((state) => state.currentStep);
  const completeStep = useEventStore((state) => state.completeStep);
  const setStep = useEventStore((state) => state.setStep);
  const setActiveStep = useEventStore((state) => state.setActiveStep);

  // Pre-fill from store
  const [file, setFile] = useState(invites.file);
  const [isDragging, setIsDragging] = useState(false);
  const [emailDraft, setLocalEmailDraft] = useState(invites.emailDraft);
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(invites.isSent);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (
      droppedFile &&
      (droppedFile.name.endsWith('.xlsx') ||
        droppedFile.name.endsWith('.xls'))
    ) {
      setFile(droppedFile);
      setInvitesFile(droppedFile);

      setTimeout(() => {
        const draft = `Dear [Guest Name],

You're cordially invited to our corporate event on [Event Date].

Join us for an evening of networking, innovation, and celebration at [Venue]. The event begins at [Time] with a welcome reception, followed by keynote presentations and dinner.

We look forward to your presence.

Best regards,
[Your Company]`;
        setLocalEmailDraft(draft);
        setEmailDraft(draft);
      }, 1000);
    }
  };

  const handleEmailDraftChange = (draft) => {
    setLocalEmailDraft(draft);
    setEmailDraft(draft);
  };

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSent(true);
      setInvitesSent(true);
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    completeStep(currentStep);
    //setStep(currentStep + 1);
    setStep("summary"); // or nextStepName
setActiveStep("summary");
    const nextRoute = getNextRoute(eventDetails, pathname);
  router.push(nextRoute);
    //router.push("/summary");
  };

  return (
    <div className="min-h-screen dark:bg-black">
              {/* <ProgressMap currentStep={currentStep} /> */}
    <div
      className="pt-32 pb-20 px-8 min-h-screen"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
          Echo
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.125rem',
            color: 'var(--color-dark)',
            opacity: 0.7,
            textAlign: 'center',
            marginBottom: '3rem',
          }}
        >
          Send invitations to your guests
        </p>

        <div className="grid grid-cols-2 gap-8">
            <div>
            <h3
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--color-dark)',
                marginBottom: '1.5rem',
              }}
            >
              
            </h3>
            </div>

        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* File Drop Zone */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--color-dark)',
                marginBottom: '1.5rem',
                textAlign: 'center',
              }}
            >
              Upload Guest List
            </h3>

            <motion.div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className="relative p-12 rounded-3xl border-2 border-dashed transition-all cursor-pointer"
              style={{
                backgroundColor: isDragging
                  ? 'rgba(98,117,76,0.1)'
                  : 'var(--glass-fill)',
                borderColor: isDragging
                  ? 'var(--color-primary)'
                  : 'var(--glass-border)',
                backdropFilter: 'blur(var(--blur))',
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              whileHover={{ scale: 1.01 }}
            >
              {!file ? (
                <>
                  <motion.div
                    animate={{
                      y: isDragging ? -10 : [0, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: isDragging ? 0 : Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Upload
                      size={64}
                      style={{
                        color: 'var(--color-primary)',
                        opacity: 0.5,
                      }}
                    />
                  </motion.div>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1.125rem',
                      color: 'var(--color-dark)',
                      marginTop: '1.5rem',
                      textAlign: 'center',
                    }}
                  >
                    {isDragging
                      ? 'Drop your file here'
                      : 'Drag & drop your Excel file'}
                  </p>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      color: 'var(--color-dark)',
                      opacity: 0.5,
                      marginTop: '0.5rem',
                    }}
                  >
                    Supports .xlsx and .xls formats
                  </p>
                </>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-center"
                >
                  <motion.div className="relative inline-block mb-6">
                    <FileSpreadsheet
                      size={80}
                      style={{ color: 'var(--color-primary)' }}
                    />

                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute inset-0 rounded-full"
                        style={{
                          border: '2px solid var(--color-primary)',
                        }}
                        initial={{ scale: 1, opacity: 0.6 }}
                        animate={{
                          scale: [1, 2, 2.5],
                          opacity: [0.6, 0.3, 0],
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.4,
                          repeat: Infinity,
                          ease: 'easeOut',
                        }}
                      />
                    ))}
                  </motion.div>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      color: 'var(--color-dark)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {file.name}
                  </p>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      color: 'var(--color-primary)',
                      fontWeight: 500,
                    }}
                  >
                    File uploaded successfully
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* AI Email Draft */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--color-dark)',
                marginBottom: '1.5rem',
                textAlign: 'center',
              }}
            >
             Write your email content or <a className="text-[#62754c]" href="">generate with AI</a>
            </h3>

            <div
              className="p-6 rounded-3xl mb-6"
              style={{
                backgroundColor: 'var(--glass-fill)',
                backdropFilter: 'blur(var(--blur))',
                border: '1px solid var(--glass-border)',
                minHeight: '400px',
              }}
            >
              {emailDraft ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <textarea
                    value={emailDraft}
                    onChange={(e) => setEmailDraft(e.target.value)}
                    className="w-full h-[350px] p-4 rounded-xl border outline-none resize-none"
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.02)',
                      borderColor: 'var(--glass-border)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      color: 'var(--color-dark)',
                      lineHeight: 1.6,
                    }}
                  />
                </motion.div>
              ) : (
                <div className="h-full flex items-center justify-center opacity-50">
                  Upload a guest list to generate email
                </div>
              )}
            </div>

            {emailDraft && !sent && (
              <motion.button
                onClick={handleSend}
                disabled={isSending}
                className="w-full px-8 py-4 rounded-full flex items-center justify-center gap-3 disabled:opacity-50"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-bg)',
                }}
              >
                <Send size={20} />
                {isSending ? 'Sending...' : 'Send Invitations'}
              </motion.button>
            )}

            {sent && (
              <div className="text-center p-6 rounded-2xl">
                ✓ Invitations sent successfully!
              </div>
            )}
          </div>
        </div>

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