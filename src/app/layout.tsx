import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Loader from "@/components/Loader";
import ParticlesBg from "@/components/ParticlesBg";
import CustomScrollbar from "@/components/CustomScrollbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adithya J | AI & ML Developer Portfolio",
  description: "B.Tech Computer Science Engineering student specializing in AI/ML at VIT Bhopal. SDE, Cloud & Core ML developer portfolio with Awwwards visual animations.",
  keywords: [
    "Adithya J", 
    "AI/ML Developer", 
    "SDE", 
    "Cloud Engineer", 
    "Vellore Institute of Technology", 
    "VIT Bhopal", 
    "YOLOv8", 
    "Computer Vision", 
    "Reinforcement Learning", 
    "Next.js Portfolio", 
    "Tailwind CSS Portfolio"
  ],
  authors: [{ name: "Adithya J", url: "mailto:adithya.j.dev@gmail.com" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth dark`}
    >
      <body className="min-h-full bg-cyber-bg text-zinc-100 antialiased overflow-x-hidden relative">
        <Loader />
        <ParticlesBg />
        <CustomScrollbar />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
