// "use client";

// import Image from "next/image";
// import { useEffect, useRef, useState } from "react";
// import { motion, useScroll } from "framer-motion";
// import { Play } from "lucide-react";
// import Trial from "@/components/Trial";
// import GlassCard from "./GlassCardClickable";


// export default function MainPage({ setNavbarVisible }) {
//     const heroRef = useRef(null);
//     const galleryRef = useRef(null);
//     const [activeTab, setActiveTab] = useState("photos");

//     useEffect(() => {
//         const handleScroll = () => {
//             const scrollY = window.scrollY;
//             const heroHeight = window.innerHeight;
//             const pastHero = scrollY > heroHeight;
//             setNavbarVisible(pastHero);
//         };

//         window.addEventListener("scroll", handleScroll, { passive: true });
//         handleScroll();

//         return () => window.removeEventListener("scroll", handleScroll);
//     }, [setNavbarVisible]);

//     const scrollToGallery = () => {
//         galleryRef.current?.scrollIntoView({ behavior: "smooth" });
//     };

//     const showArrow = true;

//     return (
//         <>
//             <motion.div
//                 initial={{ filter: "blur(8px)" }}
//                 animate={{ filter: "blur(0px)" }}
//                 transition={{
//                     duration: 1.9,
//                     ease: [0.22, 1, 0.36, 1],
//                 }}
//             >
//                 <div className="flex flex-col items-center bg-zinc-50 dark:bg-black overflow-x-hidden">
//                     <main className="flex w-full flex-col items-center bg-white dark:bg-black">

//                         {/* HERO */}
//                         <section id="home"
//                             ref={heroRef}
//                             className="relative w-full h-screen overflow-hidden bg-[#dfe2da]"
//                         >
                            
//                             <div className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//                                 <h1 className="text-[6vw] pb-12 font-serif italic font-medium leading-tight">
//                                     Moments, Mastered.
//                                 </h1>
//                                 <p className="text-[1.25rem] mt-4 font-light">
//                   Corporate events, engineered to perfection
//                 </p>

//                                 <div className="mt-8">
//                                     <GravityButton onClick={scrollToGallery} />
//                                 </div>
//                                 {/* <GlassCard>
//                     <h1 className="text-[6vw] text-white font-serif italic font-light leading-tight">
//                   Moments, Mastered.
//                 </h1>
//                 <p className="text-[1.25rem] text-white mt-4 font-light">
//                   Corporate events, engineered to perfection
//                 </p>

//                 <div className="mt-8">
//                   <GravityButton onClick={scrollToGallery} />
//                 </div>
//                 </GlassCard> */}
//                             </div>

//                             {/* ARROW */}
//                             <motion.div
//                                 className="absolute bottom-10 left-1/2 -translate-x-1/2"
//                                 animate={{
//                                     opacity: showArrow ? 1 : 0,
//                                     y: showArrow ? 0 : 20,
//                                 }}
//                                 transition={{ duration: 0.4 }}
//                             >
//                                 <motion.div
//                                     animate={showArrow ? { y: [0, 10, 0] } : { y: 20 }}
//                                     transition={{
//                                         duration: 1.5,
//                                         repeat: Infinity,
//                                         ease: "easeInOut",
//                                     }}
//                                 >
//                                     <Image
//                                         src="/down-arrow.png"
//                                         width={70}
//                                         height={70}
//                                         alt="scroll"
//                                     />
//                                 </motion.div>
//                             </motion.div>
//                         </section>
//                     </main>
//                 </div>
//             </motion.div>

//             {/* TESTIMONIALS */}
//             {/* <section id="showcase" className="min-h-screen py-32 px-8 bg-white dark:bg-black">
//                 <h2 className="text-center italic text-[3vw] font-medium mb-16">
//                     What Our Clients Say
//                 </h2>
//                 <TestimonialScroll testimonials={testimonials} />
//             </section> */}
//             <section
//   id="showcase"
//   className="relative min-h-screen py-32 px-8 overflow-hidden"
// >
//   {/* Background Image */}
//   <div
//     className="absolute inset-0 bg-cover bg-center opacity-65"
//     style={{
//       backgroundImage:
//         "url('https://images.squarespace-cdn.com/content/v1/61956e0ecf51420b77c68474/e2c72fef-080c-4af3-aeaf-33a7804c5f8b/CC-Stripe-Pattern-Sq.jpg')",
//     }}
//   />

//   {/* Optional dark/light overlay for readability */}
//   {/* <div className="absolute inset-0 bg-white/80 dark:bg-black/70" /> */}

//   {/* CONTENT */}
//   <div className="relative z-10">
//     <h2 className="text-center italic text-[3vw] font-medium mb-16">
//       What Our Clients Say
//     </h2>

//     <TestimonialScroll testimonials={testimonials} />
//   </div>
// </section>

//             {/* GALLERY */}
//             <section id="work_gallery"
//                 ref={galleryRef}
//                 className="min-h-screen py-32 px-8 bg-white dark:bg-black"
//             >
//                 <h2 className="text-center italic text-[3vw] font-medium mb-12">Our Work</h2>

//                 <div className="flex justify-center gap-6 mb-12">
//                     <button
//                         onClick={() => setActiveTab("photos")}
//                         className={`px-6 py-2 text-sm font-light transition-all ${activeTab === "photos"
//                                 ? "text-[#62754c] border-b-2 border-[#62754c]"
//                                 : "text-gray-600 dark:text-gray-400"
//                             }`}
//                     >
//                         Photos
//                     </button>
//                     <button
//                         onClick={() => setActiveTab("videos")}
//                         className={`px-6 py-2 text-sm font-light transition-all ${activeTab === "videos"
//                                 ? "text-[#62754c] border-b-2 border-[#62754c]"
//                                 : "text-gray-600 dark:text-gray-400"
//                             }`}
//                     >
//                         Videos
//                     </button>
//                 </div>

//                 {activeTab === "photos" ? <PhotosGrid /> : <VideosGrid />}
//             </section>

//             {/* CTA SECTION */}
            
//             <section className="relative w-full h-screen overflow-hidden bg-[#2596be]">
//   <Image
//     src="/Hero.jpeg"
//     alt="Hero image"
//     fill
//     priority
//     className="object-cover"
//   />

//   {/* Centered Overlay */}
//   <div className="absolute inset-0 flex items-center justify-center z-10">
//     {/* <Trial /> */}
//     <Trial onStartPlanning={onStartPlanning} />
//   </div>
// </section>
//         </>
//     );
// }

// /* GRAVITY BUTTON */
// function GravityButton({ onClick }) {
//     const [position, setPosition] = useState({ x: 0, y: 0 });
//     const buttonRef = useRef(null);

//     const handleMouseMove = (e) => {
//         if (!buttonRef.current) return;

//         const rect = buttonRef.current.getBoundingClientRect();
//         const deltaX = e.clientX - (rect.left + rect.width / 2);
//         const deltaY = e.clientY - (rect.top + rect.height / 2);

//         const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
//         const strength = Math.max(0, 1 - distance / 150);

//         setPosition({
//             x: deltaX * strength * 0.15,
//             y: deltaY * strength * 0.15,
//         });
//     };

//     return (
//         <div onMouseMove={handleMouseMove} onMouseLeave={() => setPosition({ x: 0, y: 0 })}>
//             <motion.button
//                 ref={buttonRef}
//                 animate={{ x: position.x, y: position.y }}
//                 onClick={onClick}
//                 className="shadow-[0_0_25px_rgba(98,117,76,0.6)]
//     active:shadow-[0_0_15px_rgba(98,117,76,0.8)] px-8 py-3 rounded-full font-light text-white transition-all"
//                 style={{ backgroundColor: "#62754c" }}
//             >
//                 Explore Our Work
//             </motion.button>
//         </div>
//     );
// }



"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation"; // Import useRouter
import Trial from "@/components/Trial";
import { useEventStore } from "@/store/useEventStore";
import { Play } from "lucide-react";

export default function MainPage({ setNavbarVisible }) {
  const heroRef = useRef(null);
  const galleryRef = useRef(null);
  const [activeTab, setActiveTab] = useState("photos");
  const router = useRouter(); // Initialize useRouter
  const resetSteps = useEventStore((state) => state.resetSteps);

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

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onStartPlanning = () => {
    resetSteps();
    router.push("/blueprintform"); // Route to the BlueprintForm page
  };

  const showArrow = true;
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6; // 1 = normal, 0.5 = slow, 0.25 = very slow
    }
  }, []);

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
        {/* <div className="flex flex-col items-center bg-zinc-50 dark:bg-black overflow-x-hidden">
          <main className="flex w-full flex-col items-center bg-white dark:bg-black">
            <section
              id="home"
              ref={heroRef}
              className="relative w-full h-screen overflow-hidden bg-[#dfe2da]"
            >
              <motion.video
                className="absolute inset-0 w-full h-full object-cover opacity-10"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                onCanPlay={() => setVideoReady(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: videoReady ? 1 : 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                ref={videoRef}
              >
                <source src="/hero.webm" type="video/webm" />
                <source src="/hero.mp4" type="video/mp4" />
              </motion.video>

              <div className="absolute inset-0 bg-black/30" />

              <div className="relative z-10 text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <h1 className="text-[6vw] pb-12 font-serif italic font-medium leading-tight text-white">
                  Moments, Mastered.
                </h1>
                <p className="text-[1.25rem] mt-4 font-light text-white">
                  Corporate events, engineered to perfection
                </p>

                <div className="mt-8">
                  <GravityButton onClick={scrollToGallery} />
                </div>
              </div> */}

              <div className="flex flex-col items-center bg-zinc-50 dark:bg-black overflow-x-hidden"> 
              <main className="flex w-full flex-col items-center bg-white dark:bg-black"> 
                {/* HERO */} 
                <section id="home" ref={heroRef} className="relative w-full h-screen overflow-hidden bg-[#dfe2da]" > 
                  <div className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"> 
                  <h1 className="text-[6vw] pb-12 font-serif italic font-medium leading-tight"> 
                    Moments, Mastered. </h1> 
                  <p className="text-[1.25rem] mt-4 font-light"> 
                    Corporate events, engineered to perfection </p> 
                    <div className="mt-8"> <
                      GravityButton onClick={scrollToGallery} /> 
                    </div> 
                  </div>

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
          </main>
        </div>
      </motion.div>

          <section
  id="showcase"
  className="relative min-h-screen py-32 px-8 overflow-hidden"
>
   {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center opacity-65"
    style={{
      backgroundImage:
        "url('https://images.squarespace-cdn.com/content/v1/61956e0ecf51420b77c68474/e2c72fef-080c-4af3-aeaf-33a7804c5f8b/CC-Stripe-Pattern-Sq.jpg')",
    }}
  />
  <div className="relative z-10">
    <h2 className="text-center italic text-[3vw] font-serif font-medium mb-16">
      What Our Clients Say
    </h2>

    <TestimonialScroll testimonials={testimonials} />
  </div>
</section>

      {/* GALLERY */}
      <section
        id="work_gallery"
        ref={galleryRef}
        className="min-h-screen pt-14 pb-6 px-8 bg-white dark:bg-black"
      >
        <h2 className="text-center italic text-[3vw] font-serif font-medium mb-12">
          Our Work
        </h2>

        <div className="flex justify-center gap-6 mb-12">
          <button
            onClick={() => setActiveTab("photos")}
            className={`px-6 py-2 text-sm font-light transition-all ${
              activeTab === "photos"
                ? "text-[#62754c] border-b-2 border-[#62754c]"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            Photos
          </button>
          <button
            onClick={() => setActiveTab("videos")}
            className={`px-6 py-2 text-sm font-light transition-all ${
              activeTab === "videos"
                ? "text-[#62754c] border-b-2 border-[#62754c]"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            Videos
          </button>
        </div>

        {activeTab === "photos" ? <PhotosGrid /> : <VideosGrid />}
      </section>

      {/* CTA SECTION */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* <Image
          src="/Hero.jpeg"
          alt="Hero image"
          fill
          priority
          className="object-cover"
        /> */}


        <div
          className="absolute inset-0 bg-cover bg-center opacity-65"
          style={{
            backgroundImage:
              "url('https://images.squarespace-cdn.com/content/v1/61956e0ecf51420b77c68474/e2c72fef-080c-4af3-aeaf-33a7804c5f8b/CC-Stripe-Pattern-Sq.jpg')",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Trial onStartPlanning={onStartPlanning} />
        </div>
      </section>
      {/* <section
              id="home"
              ref={heroRef}
              className="relative w-full h-screen overflow-hidden bg-[#dfe2da]"
            >
              <motion.video
                className="absolute inset-0 w-full h-full object-cover opacity-10"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                onCanPlay={() => setVideoReady(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: videoReady ? 1 : 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                ref={videoRef}
              >
                <source src="/hero.webm" type="video/webm" />
                <source src="/hero.mp4" type="video/mp4" />
              </motion.video>

              <div className="absolute inset-0 flex items-center justify-center z-10">
          <Trial onStartPlanning={onStartPlanning} />
        </div>
              
        </section> */}
    </>
  );
}

/* GRAVITY BUTTON */
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
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
    >
      <motion.button
        ref={buttonRef}
        animate={{ x: position.x, y: position.y }}
        onClick={onClick}
        className="shadow-[0_0_25px_rgba(98,117,76,0.6)]
        active:shadow-[0_0_15px_rgba(98,117,76,0.8)]
        px-10 py-4 text-[1.05rem] tracking-wide rounded-full font-light text-white transition-all"
        style={{ backgroundColor: "#62754c" }}
      >
        Explore Our Work
      </motion.button>
    </div>
  );
}

/* TESTIMONIAL SCROLL */
function TestimonialScroll({ testimonials }) {
    const scrollRef = useRef(null);

    return (
        <div className="relative">
            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto pb-6 scroll-smooth"
                style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "#62754c transparent",
                    scrollbarbutton: "none",
                }}
            >
                {testimonials.map((t, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex-shrink-0 w-96 p-8 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
                    >
                        <p className="text-gray-700 dark:text-gray-300 mb-6 font-light italic">
                            "{t.quote}"
                        </p>
                        <h4 className="font-light text-lg">{t.name}</h4>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {t.eventType}
                        </span>
                    </motion.div>
                ))}
            </div>
            <style jsx>{`
        div::-webkit-scrollbar {
          height: 4px;
        }
        div::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 10px;
        }
          div::-webkit-scrollbar-button {
  display: none;
}
        div::-webkit-scrollbar-thumb {
          background: #62754c;
          border-radius: 10px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: #4a5a39;
        }
      `}</style>
        </div>
    );
}

/* PHOTOS GRID - WITH SCROLL ANIMATION */
function PhotosGrid() {
    return (
        <div className="grid grid-cols-3 gap-6 max-w-7xl mx-auto">
            {Array.from({ length: 9 }).map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: false }}
                    className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-xl flex items-center justify-center"
                >
                    Photo {i + 1}
                </motion.div>
            ))}
        </div>
    );
}

/* VIDEOS GRID - WITH SCROLL ANIMATION */
function VideosGrid() {
    return (
        <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto">
            {Array.from({ length: 4 }).map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: false }}
                    className="aspect-video bg-gray-300 dark:bg-gray-700 rounded-xl flex items-center justify-center relative"
                >
                    <Play className="absolute text-white" />
                    Video {i + 1}
                </motion.div>
            ))}
        </div>
    );
}

const testimonials = [
    {
        name: "Sarah Chen",
        quote: "Lume transformed our annual tech summit into an unforgettable experience. The attention to detail was impeccable.",
        eventType: "Tech Conference",
    },
    {
        name: "Rajesh Kumar",
        quote: "From concept to execution, every moment was mastered. Our product launch exceeded all expectations.",
        eventType: "Product Launch",
    },
    {
        name: "Emily Rodriguez",
        quote: "The team's creativity and precision made our corporate gala a night to remember. Simply outstanding.",
        eventType: "Corporate Gala",
    },
    {
        name: "David Park",
        quote: "Professional, innovative, and seamless. Lume brought our vision to life with remarkable expertise.",
        eventType: "Brand Activation",
    },
    {
        name: "Priya Sharma",
        quote: "Every detail was thoughtfully curated. The event was a perfect blend of elegance and innovation.",
        eventType: "Awards Ceremony",
    },
];