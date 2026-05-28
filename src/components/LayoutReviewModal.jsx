import { motion } from "framer-motion";

export function LayoutReviewModal({
  open,
  loading = false,
  issues = [],
  score,
  onClose,
  onFix,
  onContinue,
}) {
  if (!open) return null;

  const hasCritical = issues.some((i) => i.type === "critical");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0"
        style={{
          background: "rgba(20,24,42,0.5)",
          backdropFilter: "blur(8px)",
        }}
        onClick={onClose}
      />

      {/* modal */}
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "relative",
          width: "90%",
          maxWidth: 520,
          background: "var(--color-bg, #FDFDF8)",
          border: "1px solid rgba(20,24,42,0.1)",
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.2)",
        }}
      >
        {/* top accent */}
        <div
          style={{
            height: 3,
            background:  "linear-gradient(90deg, #C9A84C, #62754C)",
          }}
        />

        <div style={{ padding: "24px 28px 28px" }}>
  <h2
    style={{
      fontFamily: "var(--font-display, Georgia, serif)",
      fontSize: "1.5rem",
      fontWeight: 700,
      fontStyle: "italic",
      color: "var(--color-dark, #14182A)",
      marginBottom: 10,
    }}
  >
    Layout Review
  </h2>

  {loading ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        minHeight: 240,
        position: "relative",
      }}
    >
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
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,168,76,0.35), transparent 70%)",
          filter: "blur(10px)",
          position: "absolute",
        }}
      />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          border: "2px solid rgba(20,24,42,0.2)",
          borderTop: "2px solid rgba(201,168,76,1)",
          position: "relative",
        }}
      />

      <div style={{ marginTop: 24, textAlign: "center" }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: "rgba(20,24,42,0.8)" }}>
          Analyzing layout
        </h3>
        <p style={{ fontSize: 12, color: "rgba(20,24,42,0.55)", marginTop: 6 }}>
          Checking spacing, flow & event rules...
        </p>
      </div>
    </div>
  ) : (
    <>
      {/* score
      {typeof score === "number" && (
        <p style={{ fontSize: 13, color: "rgba(20,24,42,0.6)", marginBottom: 12 }}>
          Layout score: <b>{score}/100</b>
        </p>
      )} */}

      {/* summary */}
      <p style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 18 }}>
        {hasCritical
          ? "Critical layout issues detected. Fix them before finalizing for best event flow."
          : "Some layout suggestions detected. You can proceed or refine the setup."}
      </p>

      {/* issues */}
      <div style={{ maxHeight: 260, overflow: "auto", display: "flex", flexDirection: "column", gap: 8, marginBottom: 22 }}>
        {issues.map((issue, idx) => (
              <div
                key={idx}
                style={{
                  padding: "10px 12px",
                  borderRadius: 12,
                  fontSize: 12,
                  lineHeight: 1.4,
                  fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
                  border: "1px solid rgba(20,24,42,0.08)",
                  background:
                    issue.type === "critical"
                      ? "rgba(192,57,43,0.08)"
                      : issue.type === "warning"
                      ? "rgba(230,126,34,0.08)"
                      : "rgba(20,24,42,0.04)",
                  color:
                    issue.type === "critical"
                      ? "#C0392B"
                      : issue.type === "warning"
                      ? "#B9770E"
                      : "rgba(20,24,42,0.7)",
                }}
              >
                {issue.message}
              </div>
            ))}
      </div>

      {/* actions */}
      <div className="flex gap-3 justify-end">
        <button
              onClick={onClose}
              style={{
                padding: "10px 20px",
                fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
                fontSize: 13,
                fontWeight: 700,
                background: "rgba(20,24,42,0.08)",
                color: "rgba(20,24,42,0.9)",
                border: "1px solid rgba(20,24,42,0.15)",
                borderRadius: 12,
                cursor: "pointer",
              }}
            >
              Go Back
            </button>

        <button
                onClick={onContinue}
                style={{
                  padding: "10px 24px",
                  fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
                  fontSize: 13,
                  fontWeight: 700,
                  background: "var(--color-dark, #14182A)",
                  color: "var(--color-bg, #FDFDF8)",
                  border: "none",
                  borderRadius: 12,
                  cursor: "pointer",
                }}
              >
                Continue anyway
              </button>
      </div>
    </>
  )}
</div>
      </motion.div>
    </div>
  );
}