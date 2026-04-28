"use client";

import { motion } from "framer-motion";

export default function AnimatedText({ text }) {
  const words = text.split(" ");

  return (
    <motion.h1
      className="text-white text-5xl sm:text-7xl font-light tracking-wide flex flex-wrap justify-center"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="mr-3"
          variants={{
            hidden: {
              opacity: 0,
              y: 20,
              filter: "blur(8px)",
            },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: {
                duration: 0.8,
                ease: "easeOut",
              },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}