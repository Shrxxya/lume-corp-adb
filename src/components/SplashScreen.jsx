"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen({ onComplete }) {
  const [stage, setStage] = useState("logo");

//   useEffect(() => {
//     const timeline = [
//       { delay: 0, stage: "logo" },
//       { delay: 400, stage: "orb" },
//       { delay: 1000, stage: "shatter" },
//       { delay: 1600, stage: "particles" },
//       { delay: 2500, action: onComplete },
//     ];

//     const timeouts = timeline.map(({ delay, stage, action }) =>
//       setTimeout(() => {
//         if (stage) setStage(stage);
//         if (action) action();
//       }, delay)
//     );

//     return () => timeouts.forEach(clearTimeout);
//   }, [onComplete]);

  useEffect(() => {
  const timeline = [
    { delay: 0, stage: "logo" },
    { delay: 800, stage: "orb" },
    { delay: 1600, stage: "shatter" },
    { delay: 2400, stage: "particles" },
    { delay: 3500, action: onComplete },
  ];

  const timeouts = timeline.map(({ delay, stage: nextStage, action }) =>
    setTimeout(() => {
      if (nextStage) setStage(nextStage);
      if (action) action();
    }, delay)
  );

  return () => timeouts.forEach(clearTimeout);
}, [onComplete]);
//console.log(window.innerWidth);
console.log("stage:", stage);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "black" }}
    >
      {/* Logo */}
      {stage=== "logo" && (
        <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: stage === "logo" ? 1 : 0,
          scale: stage === "logo" ? 1 : 1.2,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute"
      >
        {/* <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "4rem",
            color: "var(--color-dark)",
            letterSpacing: "0.05em",
          }}
        >
          LUME
        </div> */}
        <div className="splash">
      {/* <object
        type="image/svg+xml"
        data="/lightSplash.svg"
        className="splash-logo"
        //style={{ width: 800 }}
      /> */}
    </div>
    <Image
                  src="/blue_logo.png"
                  alt="Logo"
                  height={100}
                  width={50}
                  priority
                  className="splash-logo"
                />
      </motion.div>
      )}
      

      {/* Glowing Orb */}
      {stage === "orb" && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 3, opacity: 0.6 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute w-48 h-48 rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--color-primary), transparent)",
            filter: "blur(40px)",
          }}
        />
      )}

      {/* Shatter Effect */}
      {stage === "shatter" && (
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                scale: 0,
                opacity: 0.8,
              }}
              animate={{
                x:
                  (Math.random() - 0.5) *
                    window.innerWidth *
                    1.5 +
                  window.innerWidth / 2,
                y:
                  (Math.random() - 0.5) *
                    window.innerHeight *
                    1.5 +
                  window.innerHeight / 2,
                scale: Math.random() * 2 + 0.5,
                opacity: 0,
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute w-16 h-16 rounded-lg"
              style={{
                background: "var(--glass-fill)",
                backdropFilter: `blur(${Math.random() * 20 + 10}px)`,
                border: "1px solid var(--glass-border)",
              }}
            />
          ))}
        </div>
      )}

      {/* Particle Reorganization */}
      {stage === "particles" && (
        <div className="absolute inset-0">
          {Array.from({ length: 40 }).map((_, i) => {
            const angle = (i / 40) * Math.PI * 2;
            const radius = 300;
            const startX =
              Math.cos(angle) * radius + window.innerWidth / 2;
            const startY =
              Math.sin(angle) * radius + window.innerHeight / 2;

            return (
              <motion.div
                key={i}
                initial={{
                  x: startX,
                  y: startY,
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: 1,
                  opacity: 0.3,
                }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: "var(--color-primary)",
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}