import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Playfair_Display } from "next/font/google";
import { DM_Sans, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "maplibre-gl/dist/maplibre-gl.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Lume Corp - Moments, Mastered",
  description: "Corporate event planning website",
  icons: {
    icon: "/logo.png",
  },
};

// export default function RootLayout({ children }) {
//   return (
//     <html
//       lang="en"
//       className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
//     >
//       <body className="min-h-full flex flex-col">{children}</body>
//     </html>
//   );
// }

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-serif" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });


export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${cormorant.variable} ${mono.variable}`}
    >
      <body>
        {children}
      </body>
    </html>
  );
}
