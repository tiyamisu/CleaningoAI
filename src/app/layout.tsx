import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const headingFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const sansFont = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "CleaningoAI — Urban Environmental Intelligence Platform",
    template: "%s | CleaningoAI",
  },
  description:
    "Startup-grade urban environmental intelligence combining computer vision, geospatial analytics, and drainage-network connectivity. Bengaluru pilot study with 71 GPS-verified field observations across 14 zones.",
  keywords: [
    "CleaningoAI",
    "urban environmental intelligence",
    "waste detection",
    "computer vision",
    "geospatial analysis",
    "Bengaluru pilot",
    "BBMP",
    "drainage risk",
    "HydroRisk",
  ],
  authors: [{ name: "CleaningoAI Product & Research Team" }],
  openGraph: {
    title: "CleaningoAI — Urban Environmental Intelligence Platform",
    description: "See Waste. Understand Risk. Enable Action.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${headingFont.variable} ${sansFont.variable} ${monoFont.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className="font-sans antialiased bg-[#F7F7F0] text-[#17251F] selection:bg-[#B6D957]/30 selection:text-[#123B2E]">
        {children}
      </body>
    </html>
  );
}
