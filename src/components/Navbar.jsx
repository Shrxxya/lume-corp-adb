"use client";

import Image from "next/image";
import { Figtree } from "next/font/google";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function Navbar({ visible }) {
  return (
    <div
      className={`
        fixed top-0 left-0 w-full z-[9999]
        flex items-center justify-between
        px-10 py-4 bg-[#58644B] h-17

        transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]

        ${
          visible
            ? "opacity-100 translate-y-0 bg-[#58644B]    backdrop-blur-md shadow-md"
            : "opacity-0 -translate-y-6 pointer-events-none"
        }
      `}
    // className={`
    //     fixed top-0 left-0 w-full z-[9999]
    //     flex items-center justify-between
    //     px-10 py-4

    //     transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]

    
    //   `}
    >
      <div className="flex items-center">
        <a href="#home" className="flex ">
        <Image
          src= "/WhiteLogo.png"
          alt="Logo"
          width={40}
          height={50}
        />
        <Image
          src="/logo_rect.svg"
          alt="Logo Rectangle"
          width={202}
          height={45}
        />
        </a>  
      </div>

      {/* <div className={`flex gap-8 text-sm text-white font-medium ${figtree.className}`}> */}
      <div className={`flex gap-10 text-[0.95rem] text-white font-medium tracking-wide ${figtree.className}`}>
        <a href="#home" className="hover:opacity-60 transition">Home</a>
        <a href="#showcase" className="hover:opacity-60 transition">Showcase</a>
        <a href="#work_gallery" className="hover:opacity-60 transition">Work Gallery</a>
      </div>
    </div>
  );
}