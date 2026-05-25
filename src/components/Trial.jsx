// "use client"

// import { useState, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion"; // ✅ fix import
// import { MousePointer } from "lucide-react";

// function ButtonGlobal() {
//   const [isHovered, setIsHovered] = useState(false);
//   const [isActive, setIsActive] = useState(false);

//   const cursors = useMemo(() => {
//     const cursors = [];
//     const circles = [140, 180, 220, 260];
//     const cursorsPerCircle = [8, 12, 16, 20];
    
//     circles.forEach((radius, circleIndex) => {
//       const count = cursorsPerCircle[circleIndex];
//       for (let i = 0; i < count; i++) {
//         const angle = (i / count) * 2 * Math.PI;
//         const x = Math.cos(angle) * radius;
//         const y = Math.sin(angle) * radius;

//         const rotationOutward = Math.atan2(y, x) * (180 / Math.PI);

//         cursors.push({
//           id: `cursor-${circleIndex}-${i}`,
//           finalX: x,
//           finalY: y,
//           delay: circleIndex * 0.01 + i * 0.002,
//           rotation: rotationOutward,
//           isTrail: false,
//           opacity: 1,
//           scale: 1
//         });

//         for (let t = 1; t <= 2; t++) {
//           cursors.push({
//             id: `cursor-${circleIndex}-${i}-trail-${t}`,
//             finalX: x,
//             finalY: y,
//             delay: circleIndex * 0.01 + i * 0.002 + t * 0.008,
//             rotation: rotationOutward,
//             isTrail: true,
//             opacity: 1 - (t * 0.3),
//             scale: 1 - (t * 0.2)
//           });
//         }
//       }
//     });

//     return cursors;
//   }, []);

//   return (
//     <div
//       className="absolute backdrop-blur-md bg-white/20 border border-white/30 shadow-xl shadow-black/20 flex items-center justify-center left-1/2 px-[22px] py-3 rounded-[38px] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:bg-white/30 hover:border-white/50 hover:shadow-2xl hover:shadow-black/30 hover:scale-105 active:scale-95 group overflow-visible z-20 cursor-pointer"
//       //style={{ top: "50%" }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       onClick={() => setIsActive(!isActive)}
//     >
//       {/* Gradient overlay */}
//       <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent rounded-[38px]" />

//       {/* Glow */}
//       <motion.div
//         className="absolute inset-0 rounded-[38px] opacity-0"
//         animate={(isHovered || isActive) ? {
//           opacity: [0, 0.6, 0],
//           scale: [1, 1.05, 1],
//         } : {}}
//         transition={{
//           duration: 2,
//           repeat: Infinity,
//           ease: "easeInOut"
//         }}
//       />

//       {/* Cursors */}
//       <AnimatePresence>
//         {(isHovered || isActive) && (
//           <motion.div
//             className="absolute pointer-events-none"
//             style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
//             animate={{ rotate: -360 }}
//             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//           >
//             {cursors.map((cursor) => (
//               <motion.div
//                 key={cursor.id}
//                 className="absolute"
//                 initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
//                 animate={{
//                   x: cursor.finalX,
//                   y: cursor.finalY,
//                   opacity: cursor.isTrail ? cursor.opacity : 1,
//                   scale: cursor.scale
//                 }}
//                 exit={{ opacity: 0, scale: 0 }}
//                 transition={{ duration: 0.1, delay: cursor.delay }}
//               >
//                 <MousePointer className="w-5 h-5 text-white" />
//               </motion.div>
//             ))}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Text */}
//       <span className="relative z-10 text-white text-lg">
//         Start Planning
//       </span>
//     </div>
//   );
// }

// export default function Trial() {
//   return (
//     <div>
//       <ButtonGlobal />
//     </div>
//   );
// }

// "use client";

// import { useState, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { MousePointer } from "lucide-react";

// function ButtonGlobal() {
//   const [isHovered, setIsHovered] = useState(false);
//   const [isActive, setIsActive] = useState(false);

//   const cursors = useMemo(() => {
//     const cursors = [];
//     const circles = [140, 180, 220, 260];
//     const cursorsPerCircle = [8, 12, 16, 20];

//     circles.forEach((radius, circleIndex) => {
//       const count = cursorsPerCircle[circleIndex];
//       for (let i = 0; i < count; i++) {
//         const angle = (i / count) * 2 * Math.PI;
//         const x = Math.cos(angle) * radius;
//         const y = Math.sin(angle) * radius;

//         const rotationTowardsCenter = Math.atan2(-y, -x) * (180 / Math.PI); // Calculate angle towards the center

//         cursors.push({
//           id: `cursor-${circleIndex}-${i}`,
//           finalX: x,
//           finalY: y,
//           delay: circleIndex * 0.01 + i * 0.002,
//           rotation: rotationTowardsCenter, // Use the calculated rotation
//           isTrail: false,
//           opacity: 1,
//           scale: 1,
//         });

//         for (let t = 1; t <= 2; t++) {
//           cursors.push({
//             id: `cursor-${circleIndex}-${i}-trail-${t}`,
//             finalX: x,
//             finalY: y,
//             delay: circleIndex * 0.01 + i * 0.002 + t * 0.008,
//             rotation: rotationTowardsCenter, // Use the same rotation for trails
//             isTrail: true,
//             opacity: 1 - t * 0.3,
//             scale: 1 - t * 0.2,
//           });
//         }
//       }
//     });

//     return cursors;
//   }, []);

//   return (
//     <div
//       className="absolute backdrop-blur-md bg-white/20 border border-white/30 shadow-xl shadow-black/20 flex items-center justify-center left-1/2 px-[22px] py-3 rounded-[38px] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:bg-white/30 hover:border-white/50 hover:shadow-2xl hover:shadow-black/30 hover:scale-105 active:scale-95 group overflow-visible z-20 cursor-pointer"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       onClick={() => setIsActive(!isActive)}
//     >
//       {/* Gradient overlay */}
//       <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent rounded-[38px]" />

//       {/* Glow */}
//       <motion.div
//         className="absolute inset-0 rounded-[38px] opacity-0"
//         animate={isHovered || isActive ? { opacity: [0, 0.6, 0], scale: [1, 1.05, 1] } : {}}
//         transition={{
//           duration: 2,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />

//       {/* Cursors */}
//       <AnimatePresence>
//         {(isHovered || isActive) && (
//           <motion.div
//             className="absolute pointer-events-none"
//             style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
//             animate={{ rotate: -360 }}
//             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//           >
//             {cursors.map((cursor) => (
//               <motion.div
//                 key={cursor.id}
//                 className="absolute"
//                 initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
//                 animate={{
//                   x: cursor.finalX,
//                   y: cursor.finalY,
//                   opacity: cursor.isTrail ? cursor.opacity : 1,
//                   scale: cursor.scale,
//                   rotate: cursor.rotation, // Rotate the arrow towards the center
//                 }}
//                 exit={{ opacity: 0, scale: 0 }}
//                 transition={{ duration: 0.1, delay: cursor.delay }}
//               >
//                 <MousePointer className="w-5 h-5 text-white" />
//               </motion.div>
//             ))}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Text */}
//       <span className="relative z-10 text-white text-lg">Start Planning</span>
//     </div>
//   );
// }

// export default function Trial() {
//   return (
//     <div>
//       <ButtonGlobal />
//     </div>
//   );
// }

"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MousePointer } from "lucide-react";

function ButtonGlobal({ onStartPlanning }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const cursors = useMemo(() => {
    const cursors = [];
    const circles = [140, 180, 220, 260];
    const cursorsPerCircle = [8, 12, 16, 20];

    circles.forEach((radius, circleIndex) => {
      const count = cursorsPerCircle[circleIndex];
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * 2 * Math.PI;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        const rotationTowardsCenter = Math.atan2(-y, -x) * (180 / Math.PI); // Calculate angle towards the center

        cursors.push({
          id: `cursor-${circleIndex}-${i}`,
          finalX: x,
          finalY: y,
          delay: circleIndex * 0.01 + i * 0.002,
          rotation: rotationTowardsCenter, // Use the calculated rotation
          isTrail: false,
          opacity: 1,
          scale: 1,
        });

        for (let t = 1; t <= 2; t++) {
          cursors.push({
            id: `cursor-${circleIndex}-${i}-trail-${t}`,
            finalX: x,
            finalY: y,
            delay: circleIndex * 0.01 + i * 0.002 + t * 0.008,
            rotation: rotationTowardsCenter, // Use the same rotation for trails
            isTrail: true,
            opacity: 1 - t * 0.3,
            scale: 1 - t * 0.2,
          });
        }
      }
    });

    return cursors;
  }, []);

  return (
    <div
      className="absolute backdrop-blur-md bg-[#58644B] border border-[#58644B]/20 shadow-xl shadow-black/20 flex items-center justify-center left-1/2 px-[22px] py-3 rounded-[38px] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:bg-white/30 hover:border-white/50 hover:shadow-2xl hover:shadow-black/30 hover:scale-105 active:scale-95 group overflow-visible z-20 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        setIsActive(!isActive);
        onStartPlanning?.();
        }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent rounded-[38px]" />

      {/* Glow */}
      <motion.div
        className="absolute inset-0 rounded-[38px] opacity-0"
        animate={isHovered || isActive ? { opacity: [0, 0.6, 0], scale: [1, 1.05, 1] } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Cursors */}
      <AnimatePresence>
        {(isHovered || isActive) && (
          <motion.div
            className="absolute pointer-events-none"
            style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {cursors.map((cursor) => (
              <motion.div
                key={cursor.id}
                className="absolute"
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={{
                  x: cursor.finalX,
                  y: cursor.finalY,
                  opacity: cursor.isTrail ? cursor.opacity : 1,
                  scale: cursor.scale,
                  rotate: cursor.rotation, // Rotate the arrow towards the center
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.1, delay: cursor.delay }}
              >
                <MousePointer className="w-5 h-5 text-[#58644B]" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Text */}
      <motion.span
      className="relative z-10 text-lg font-medium"
      animate={
        isHovered || isActive
          ? { color: "#58644B" }
          : { color: "#ffffff" }
      }
      transition={{ duration: 0.3 }}
    >
      Start Planning
    </motion.span>
    </div>
  );
}

// export default function Trial() {
//   return (
//     <div>
//       <ButtonGlobal />
//     </div>
//   );
// }

export default function Trial({ onStartPlanning }) {
  return (
    <div>
      <ButtonGlobal onStartPlanning={onStartPlanning} />
    </div>
  );
}