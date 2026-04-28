"use client";

import Image from "next/image";
import GlassCardClickable from "@/components/GlassCardClickable";
import PrimaryButton from "@/components/PrimaryButton";
import { GlassyButton } from "@/components/GlassButton";
import { Card } from "@/components/GlassCard";
import Trial from "@/components/Trial";
import Navbar from "@/components/Navbar";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { Play } from "lucide-react";

export default function MainPage({ setNavbarVisible }) {
  const heroRef = useRef(null);
   const [activeTab, setActiveTab] = useState("photos");

  const lastScrollY = useRef(0);

 useEffect(() => {
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const heroHeight = window.innerHeight;

    const pastHero = scrollY > heroHeight;

    setNavbarVisible(pastHero);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, [setNavbarVisible]);
  const showArrow = true;

  return (
    <>
    <motion.div
      initial={{ filter: "blur(8px)" }}
      animate={{ filter: "blur(0px)" }}
      transition={{
        duration: 1.9,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* NAVBAR */}
      

      <div className="flex flex-col items-center bg-zinc-50 dark:bg-black overflow-x-hidden">
        <main className="flex w-full flex-col items-center bg-white dark:bg-black">

          {/* HERO */}
          <section
            ref={heroRef}
            className="relative w-full h-screen overflow-hidden"
          >
            <Image
              src="/Hero.jpeg"
              alt="Hero image"
              fill
              priority
              className="object-cover"
            />
            <div className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="font-family: var(--font-serif);">Moments, Mastered.</h1>
          <p>Corporate events, engineered to perfection</p>

          <button onClick={() => scrollToSection("gallery")}>
            Explore Work
          </button>
        </div>

        {/* <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <ChevronRight size={32} className="rotate-90" />
        </motion.div> */}

            {/* ARROW */}
            <motion.div
              className="absolute bottom-10 left-1/2 -translate-x-1/2"
              animate={{
                opacity: showArrow ? 1 : 0,
                y: showArrow ? 0 : 20,
              }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                animate={showArrow ? { y: [0, 10, 0] } : { y: 20 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/down-arrow.png"
                  width={70}
                  height={70}
                  alt="scroll"
                />
              </motion.div>
            </motion.div>
          </section>

          {/* CONTENT */}
          {/* <section className="py-32 text-center">
            <h1 className="text-6xl font-light mb-6">
              Events, Engineered.
            </h1>

            <GlassCardClickable>
              <p className="mb-4">
                Plan premium corporate events with precision.
              </p>
              <PrimaryButton>Start Planning</PrimaryButton>
            </GlassCardClickable>
          </section> */}

          {/* <section id="showcase" className="py-32 text-center">
            <GlassyButton>Plan Now</GlassyButton>
            <Card>cfvghbjnkm</Card>
            <Trial />
          </section> */}

        </main>
      </div>
    </motion.div>
    <section id="showcase" className="min-h-screen py-32 px-8">
        <h2 style={{ textAlign: "center" }}>What Our Clients Say</h2>
        {testimonials.map((t, i) => (
  <div key={i}>
    <p>{t.quote}</p>
    <h4>{t.name}</h4>
    <span>{t.eventType}</span>
  </div>
))}
      </section>

      {/* GALLERY */}
      <section id="gallery" className="min-h-screen py-32 px-8">
        <h2 style={{ textAlign: "center" }}>Our Work</h2>

        <div className="flex justify-center mb-12">
          <button onClick={() => setActiveTab("photos")}>Photos</button>
          <button onClick={() => setActiveTab("videos")}>Videos</button>
        </div>

        {activeTab === "photos" ? <PhotosGrid /> : <VideosGrid />}

        <div className="flex justify-center mt-20">
          <button>Start Planning</button>
        </div>
      </section>
    </>
    
  );
}

/* ---------------- GRAVITY BUTTON ---------------- */

function GravityButton({ onClick }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const deltaX = e.clientX - (rect.left + rect.width / 2);
    const deltaY = e.clientY - (rect.top + rect.height / 2);

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const strength = Math.max(0, 1 - distance / 150);

    setPosition({
      x: deltaX * strength * 0.15,
      y: deltaY * strength * 0.15,
    });
  };

  return (
    <div onMouseMove={handleMouseMove} onMouseLeave={() => setPosition({ x: 0, y: 0 })}>
      <motion.button
        ref={buttonRef}
        animate={{ x: position.x, y: position.y }}
        onClick={onClick}
      >
        Explore Our Work
      </motion.button>
    </div>
  );
}

/* ---------------- PHOTOS ---------------- */

function PhotosGrid() {
  return (
    <div className="grid grid-cols-3 gap-6 max-w-7xl mx-auto">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="aspect-square bg-gray-200 rounded-xl flex items-center justify-center">
          Photo {i + 1}
        </div>
      ))}
    </div>
  );
}

/* ---------------- VIDEOS ---------------- */

function VideosGrid() {
  return (
    <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="aspect-video bg-gray-300 rounded-xl flex items-center justify-center relative">
          <Play className="absolute" />
          Video {i + 1}
        </div>
      ))}
    </div>
  );
}

const testimonials = [
  {
    name: "Sarah Chen",
    quote: "Lume transformed our annual tech summit into an unforgettable experience. The attention to detail was impeccable.",
    eventType: "Tech Conference"
  },
  {
    name: "Rajesh Kumar",
    quote: "From concept to execution, every moment was mastered. Our product launch exceeded all expectations.",
    eventType: "Product Launch"
  },
  {
    name: "Emily Rodriguez",
    quote: "The team's creativity and precision made our corporate gala a night to remember. Simply outstanding.",
    eventType: "Corporate Gala"
  },
  {
    name: "David Park",
    quote: "Professional, innovative, and seamless. Lume brought our vision to life with remarkable expertise.",
    eventType: "Brand Activation"
  },
  {
    name: "Priya Sharma",
    quote: "Every detail was thoughtfully curated. The event was a perfect blend of elegance and innovation.",
    eventType: "Awards Ceremony"
  }
];