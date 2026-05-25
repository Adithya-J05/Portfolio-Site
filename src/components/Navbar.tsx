"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Cpu, FileText } from "lucide-react";
import { useActiveSection } from "@/hooks/useActiveSection";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certificates", label: "Certifications" },
  { id: "stats", label: "GitHub Stats" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const activeSection = useActiveSection(["hero", "about", "skills", "projects", "experience", "certificates", "stats", "contact"]);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-purple-500/10 bg-[#030014]/60 backdrop-blur-md select-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.button 
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-2 cursor-pointer group"
          whileHover={{ scale: 1.02 }}
        >
          <Cpu className="h-5 w-5 text-cyber-cyan group-hover:rotate-90 transition-transform duration-500" />
          <span className="font-mono text-sm tracking-[0.25em] font-black uppercase bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent group-hover:from-cyber-purple group-hover:to-cyber-cyan transition-colors">
            ADITHYA_J <span className="text-cyber-cyan group-hover:text-cyber-purple transition-colors">// OS</span>
          </span>
        </motion.button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS?.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="relative px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-purple-200/70 hover:text-white transition-colors cursor-pointer"
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-cyber-cyan to-cyber-purple shadow-[0_0_8px_#06b6d4]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
          
          <a
            href="/resume/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest border border-cyber-purple/40 text-purple-300 hover:bg-cyber-purple/10 hover:border-cyber-purple hover:text-white hover:shadow-[0_0_12px_rgba(188,52,250,0.4)] rounded transition-all duration-300 cursor-pointer flex items-center gap-1"
          >
            <FileText className="h-3 w-3" />
            <span>Resume</span>
          </a>

          <button
            onClick={() => scrollTo("contact")}
            className="ml-2 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest border border-cyber-cyan/40 text-cyber-cyan hover:bg-cyber-cyan/10 hover:border-cyber-cyan hover:text-white hover:shadow-[0_0_12px_rgba(6,182,212,0.4)] rounded transition-all duration-300 cursor-pointer"
          >
            Terminal.Connect()
          </button>
        </nav>

        {/* Mobile Nav Button */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-purple-300 hover:text-white transition-colors cursor-pointer"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-purple-500/10 bg-[#030014]/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-3 font-mono text-xs">
              {NAV_ITEMS?.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`flex items-center justify-between px-3 py-2 rounded font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      isActive 
                        ? "bg-purple-950/20 text-cyber-cyan border-l-2 border-cyber-cyan" 
                        : "text-purple-300/80 hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[9px] opacity-40">0{NAV_ITEMS.indexOf(item) + 1}</span>
                  </button>
                );
              })}
              
              <a
                href="/resume/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full py-3 text-center border border-cyber-purple/40 text-purple-300 hover:bg-cyber-purple/10 font-bold uppercase tracking-widest rounded transition-all flex items-center justify-center gap-1.5"
              >
                <FileText className="h-4 w-4" />
                <span>Open Resume.pdf</span>
              </a>

              <button
                onClick={() => scrollTo("contact")}
                className="w-full py-3 text-center border border-cyber-cyan/35 text-cyber-cyan hover:bg-cyber-cyan/10 font-bold uppercase tracking-widest rounded transition-all"
              >
                Terminal.Connect()
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
