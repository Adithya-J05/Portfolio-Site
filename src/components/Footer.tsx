"use client";

import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-purple-500/10 bg-[#030014]/80 py-12 relative overflow-hidden select-none">
      <div className="absolute inset-0 bg-grid-cyber opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-[10px] text-zinc-500">
        
        {/* Left Side: Version details */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-cyber-cyan font-bold bg-cyber-cyan/5 border border-cyber-cyan/20 px-2 py-0.5 rounded">
            <span>SYS_STATUS: RUNNING</span>
          </div>
          <span>BUILD: v3.5.0 // SUCCESS</span>
        </div>

        {/* Center: Brand logo */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-1">
            <Cpu className="h-4.5 w-4.5 text-cyber-purple" />
            <span className="font-bold text-white uppercase tracking-wider">
              ADITHYA J // NEURAL.OS
            </span>
          </div>
          <span className="text-[9px] uppercase tracking-widest text-zinc-600">
            Built with Next.js & TailwindCSS
          </span>
        </div>

        {/* Right Side: Copyright details */}
        <div className="flex items-center gap-6">
          <span>&copy; {currentYear} ALL RIGHT RESERVED</span>
          <div className="flex items-center gap-1">
            {/* Animated network ping waves */}
            <span className="h-2 w-2 rounded-full bg-emerald-500 relative flex">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            </span>
            <span className="text-[9px] text-emerald-400 uppercase tracking-widest font-bold">PING_OK</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
