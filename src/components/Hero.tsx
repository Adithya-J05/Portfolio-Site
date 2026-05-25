"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, FileText, ChevronRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Image from "next/image";

const ROLES = [
  "AI & ML Specialist",
  "Computer Vision Engineer",
  "Full Stack Developer",
  "Cloud Stack Enthusiast",
];

export default function Hero({ profileImageSrc = "/images/profile/profile.jpeg" }: { profileImageSrc?: string }) {
  const [typedGreeting, setTypedGreeting] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const targetGreeting = "SYSTEM.BOOT: SECURE_CHANNEL_CONNECT_SUCCESS...";

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < targetGreeting.length) {
        setTypedGreeting((prev) => prev + targetGreeting.charAt(index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 40);

    const roleInterval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2800);

    return () => {
      clearInterval(typingInterval);
      clearInterval(roleInterval);
    };
  }, []);

  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = aboutSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-12 select-none"
    >
      {/* Background Grids and Scopes */}
      <div className="absolute inset-0 bg-grid-cyber opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030014]/10 via-[#030014] to-[#030014] pointer-events-none" />
      
      {/* Large faint background title */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[14vw] font-black font-mono text-purple-950/5 select-none pointer-events-none uppercase tracking-[0.1em]">
        NEURAL.OS
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Terminal Details */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          
          {/* Decryption status bar */}
          <div className="flex items-center gap-2 mb-6 font-mono text-[10px] text-cyber-cyan font-bold tracking-widest border border-cyber-cyan/20 bg-cyber-cyan/5 w-fit px-3 py-1 rounded">
            <span className="h-1.5 w-1.5 bg-cyber-cyan rounded-full animate-ping" />
            <span>PORT: 8080 // SECURE CONNECTED</span>
          </div>

          {/* Typing log */}
          <div className="min-h-[1.5rem] mb-2">
            <span className="font-mono text-xs text-purple-400/80">
              {typedGreeting}
              <span className="animate-pulse">|</span>
            </span>
          </div>

          {/* Name Header */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none mb-4">
            <span className="text-white">I AM </span>
            <span className="bg-gradient-to-r from-cyber-purple via-cyber-violet to-cyber-cyan bg-clip-text text-transparent glow-text-purple">
              ADITHYA J
            </span>
          </h1>

          {/* Role rotators */}
          <div className="flex items-center gap-3 font-mono text-lg sm:text-2xl font-semibold mb-8 text-zinc-300 h-10">
            <span className="text-cyber-cyan">&gt;</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent"
              >
                {ROLES[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <p className="text-sm sm:text-base text-zinc-400/90 leading-relaxed mb-10 max-w-xl">
            B.Tech Computer Science Engineering student specializing in **Artificial Intelligence & Machine Learning** at Vellore Institute of Technology, Bhopal. Focused on training smart vision frameworks, building SLM classification pipelines, and deploying robust cloud services.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
            <button
              onClick={() => {
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="group flex items-center justify-center gap-2 px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-cyber-cyan to-cyber-purple hover:from-cyber-purple hover:to-cyber-cyan text-white rounded cursor-pointer transition-all duration-500 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(188,52,250,0.4)]"
            >
              <span>Initialize_Comms()</span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="/resume/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest border border-purple-500/40 text-purple-300 hover:text-white hover:border-cyber-purple hover:bg-cyber-purple/10 hover:shadow-[0_0_20px_rgba(188,52,250,0.3)] rounded cursor-pointer transition-all duration-300"
            >
              <FileText className="h-4 w-4" />
              <span>Get_Resume.pdf</span>
            </a>
          </div>

          {/* Social connections */}
          <div className="flex items-center gap-6">
            <span className="font-mono text-[10px] uppercase text-zinc-500 tracking-widest">Connect:</span>
            <div className="flex gap-4.5">
              <a
                href="https://github.com/Adithya-J05"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 border border-purple-500/10 bg-purple-950/5 hover:border-cyber-cyan hover:bg-cyber-cyan/10 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] text-purple-300 hover:text-white transition-all duration-300 rounded hover:scale-105"
              >
                <FaGithub className="h-7 w-7" />
              </a>
              <a
                href="https://www.linkedin.com/in/adithya-j25aug2005/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 border border-purple-500/10 bg-purple-950/5 hover:border-cyber-purple hover:bg-cyber-purple/10 hover:shadow-[0_0_15px_rgba(188,52,250,0.5)] text-purple-300 hover:text-white transition-all duration-300 rounded hover:scale-105"
              >
                <FaLinkedin className="h-7 w-7" />
              </a>
              <a
                href="mailto:adithya.j.dev@gmail.com"
                className="p-3.5 border border-purple-500/10 bg-purple-950/5 hover:border-cyber-cyan hover:bg-cyber-cyan/10 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] text-purple-300 hover:text-white transition-all duration-300 rounded hover:scale-105"
              >
                <Mail className="h-7 w-7" />
              </a>
            </div>
          </div>

        </div>

        {/* Right Animated Circular HUD Avatar Frame */}
        <div className="lg:col-span-5 flex justify-center items-center relative py-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[360px] h-[360px] sm:w-[450px] sm:h-[450px] flex items-center justify-center"
          >
            {/* Spinning Outer Ring 1 */}
            <div className="absolute inset-0 border border-dashed border-cyber-purple/30 rounded-full animate-spin-slow pointer-events-none" />

            {/* Spinning Outer Ring 2 */}
            <div className="absolute inset-4 border border-cyber-cyan/20 rounded-full animate-spin-reverse pointer-events-none" />

            {/* Outer Compass scope dots */}
            <div className="absolute inset-8 border border-purple-500/10 rounded-full pointer-events-none flex justify-between items-center px-2">
              <span className="w-1 h-1 bg-cyber-purple rounded-full" />
              <span className="w-1 h-1 bg-cyber-purple rounded-full" />
            </div>

            {/* Avatar shell with holographic preview border */}
            <div className="absolute inset-12 rounded-full overflow-hidden border-2 border-cyber-cyan/35 shadow-[0_0_25px_rgba(6,182,212,0.35)] flex items-center justify-center p-0.5 bg-[#030014] group z-20 pointer-events-auto">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <Image
                  src={profileImageSrc}
                  alt="Adithya J Profile Image"
                  width={400}
                  height={400}
                  priority
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-105 filter grayscale-[10%] group-hover:grayscale-0"
                />
                {/* Hologram Scanner beam line */}
                <div className="scanner-line h-[2px] opacity-35" />
                {/* Cyber HUD layer glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyber-purple/20 via-transparent to-cyber-cyan/15 opacity-40 group-hover:opacity-20 transition-opacity pointer-events-none" />
              </div>
            </div>
            
            {/* Decaying orbital nodes */}
            <div className="absolute top-2 right-12 w-2 h-2 rounded-full bg-cyber-cyan glow-shadow-cyan animate-pulse" />
            <div className="absolute bottom-6 left-12 w-2.5 h-2.5 rounded-full bg-cyber-purple glow-shadow-purple animate-pulse" />
          </motion.div>
        </div>
      </div>

      {/* Floating DNA double-helix scroll down indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <motion.button
          onClick={handleScrollToAbout}
          className="flex flex-col items-center gap-2 cursor-pointer group pointer-events-auto"
        >
          <span className="font-mono text-[8px] text-cyber-cyan/50 uppercase tracking-[0.25em] group-hover:text-cyber-cyan group-hover:glow-text-cyan transition-all">
            Initialize Scroll
          </span>
          
          {/* DNA Helix columns */}
          <div className="relative w-12 h-16 flex flex-col justify-between py-1 overflow-hidden">
            {[...Array(5)].map((_, i) => {
              const delay = i * 0.18;
              return (
                <div key={i} className="relative w-full h-2 flex items-center justify-center">
                  {/* Strand A (Cyan) */}
                  <motion.div
                    animate={{
                      x: [-12, 12, -12],
                      scale: [0.8, 1.2, 0.8],
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.0,
                      ease: "easeInOut",
                      delay: delay
                    }}
                    className="absolute h-1.5 w-1.5 rounded-full bg-cyber-cyan shadow-[0_0_8px_#06b6d4]"
                  />
                  
                  {/* Connector Line */}
                  <motion.div
                    animate={{
                      scaleX: [1, 0, 1],
                      opacity: [0.15, 0.03, 0.15]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.0,
                      ease: "easeInOut",
                      delay: delay
                    }}
                    className="w-6 h-[0.5px] bg-gradient-to-r from-cyber-cyan to-cyber-purple"
                  />
                  
                  {/* Strand B (Purple) */}
                  <motion.div
                    animate={{
                      x: [12, -12, 12],
                      scale: [1.2, 0.8, 1.2],
                      opacity: [1, 0.4, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.0,
                      ease: "easeInOut",
                      delay: delay
                    }}
                    className="absolute h-1.5 w-1.5 rounded-full bg-cyber-purple shadow-[0_0_8px_#bc34fa]"
                  />
                </div>
              );
            })}
          </div>
        </motion.button>
      </div>

    </section>
  );
}
