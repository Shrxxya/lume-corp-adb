'use client';
import { useEffect, useState } from "react";
import {motion} from "framer-motion";
import Image from "next/image";

export default function SplashScreenOld({ onFinish }) {
  const [stage, setStage] = useState("logo");
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     onFinish?.();
  //   }, 2000);

  //   return () => clearTimeout(timer);
  useEffect(() => {
  const timeline = [
    { delay: 0, stage: "logo" },
    { delay: 800, stage: "orb" },
    // { delay: 1600, stage: "shatter" },
    { delay: 1600, stage: "particles" },
    { delay: 2500, action: onFinish },
  ];

  const timeouts = timeline.map(({ delay, stage: nextStage, action }) =>
    setTimeout(() => {
      if (nextStage) setStage(nextStage);
      if (action) action();
    }, delay)
  );

  return () => timeouts.forEach(clearTimeout);
  }, [onFinish]);

  return (
    <div className="splash">
      {/* <object
        type="image/svg+xml"
        data="/lightSplash.svg"
        className="splash-logo"
        //style={{ width: 800 }}
      /> */}
      {/* <Image
        src="/blue_logo.png"
        alt="Logo"
        width={400}
        height={50}
        priority
        className="splash-logo"
      /> */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        <Image
          src="/nobg_logo2.png"
          alt="Logo"
          width={360}
          height={360}
          priority
        />
      </motion.div>
      {/* Glowing Orb */}
      {stage === "orb" && (
        // <motion.div
        //   initial={{ scale: 0, opacity: 0 }}
        //   animate={{ scale: 3, opacity: 0.6 }}
        //   transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        //   className="absolute w-48 h-48 rounded-full"
        //   style={{
        //     // background:
        //     //   "radial-gradient(circle, var(--color-primary), transparent)",
        //     // filter: "blur(40px)",
        //     background: "radial-gradient(circle, #14182a, transparent)",
        //     filter: "blur(40px)",
        //     opacity: 1
        //   }}
        // />
        <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1.8, opacity: 0.25 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, #62754C 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      )}

      {/* Shatter Effect */}
      {/* {stage === "shatter" && (
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
                // background: "var(--glass-fill)",
                backdropFilter: `blur(${Math.random() * 20 + 10}px)`,
                // border: "1px solid var(--glass-border)",
                background: "black",
border: "1px solid black"
              }}
            />
          ))}
        </div>
      )} */}

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
                  // backgroundColor: "var(--color-primary)",
                  backgroundColor: "black",
opacity: 1
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

// export default function SplashScreen({ onFinish }) {
//   const [fadeOut, setFadeOut] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setFadeOut(true);
//       setTimeout(onFinish, 500); // match CSS fade
//     }, 2000); // match your SVG animation duration

//     return () => clearTimeout(timer);
//   }, [onFinish]);

//   return (
//     <div className={`splash ${fadeOut ? 'fade-out' : ''}`}>
//       <img src="/splash.svg" alt="Logo" />
//     </div>
//   );
// }