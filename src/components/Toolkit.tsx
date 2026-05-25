"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Terminal, Zap, Compass, Cpu, Layers, Disc, Settings2, Shield } from "lucide-react";

interface ToolItem {
  name: string;
  category: string;
  icon: React.ReactNode;
  floatDuration: number;
  glowColor: string;
}

export default function Toolkit() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const tools: ToolItem[] = [
    {
      name: "VS Code",
      category: "IDE / Code Editor",
      icon: <Terminal className="h-6 w-6 text-sky-400" />,
      floatDuration: 5,
      glowColor: "shadow-sky-500/25 border-sky-500/20",
    },
    {
      name: "Jupyter Notebook",
      category: "Data Science / ML Workspace",
      icon: <Settings2 className="h-6 w-6 text-orange-400" />,
      floatDuration: 6,
      glowColor: "shadow-orange-500/25 border-orange-500/20",
    },
    {
      name: "Docker",
      category: "Containerization",
      icon: <Layers className="h-6 w-6 text-cyan-400" />,
      floatDuration: 5.5,
      glowColor: "shadow-cyan-500/25 border-cyan-500/20",
    },
    {
      name: "Git & GitHub",
      category: "Version Control Stack",
      icon: <Disc className="h-6 w-6 text-zinc-100" />,
      floatDuration: 4.8,
      glowColor: "shadow-zinc-300/25 border-zinc-500/20",
    },
    {
      name: "OpenAI Gym",
      category: "Reinforcement Learning Env",
      icon: <Cpu className="h-6 w-6 text-emerald-400" />,
      floatDuration: 6.2,
      glowColor: "shadow-emerald-500/25 border-emerald-500/20",
    },
    {
      name: "Azure & AWS portals",
      category: "Cloud Resource Management",
      icon: <Compass className="h-6 w-6 text-purple-400" />,
      floatDuration: 5.2,
      glowColor: "shadow-purple-500/25 border-purple-500/20",
    },
    {
      name: "Postman",
      category: "API Testing Suite",
      icon: <Zap className="h-6 w-6 text-amber-500" />,
      floatDuration: 5.8,
      glowColor: "shadow-amber-500/25 border-amber-500/20",
    },
    {
      name: "Linux (Ubuntu)",
      category: "Operating System Kernels",
      icon: <Shield className="h-6 w-6 text-yellow-500" />,
      floatDuration: 4.5,
      glowColor: "shadow-yellow-500/25 border-yellow-500/20",
    },
  ];

  return (
    <section id="toolkit" className="py-24 relative select-none">
      <div className="absolute inset-0 bg-grid-cyber opacity-10 pointer-events-none" />
      
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-[1px] w-8 bg-cyber-purple" />
            <span className="font-mono text-[10px] uppercase text-cyber-purple tracking-[0.3em] font-bold">TOOLKIT.LOAD()</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-wider uppercase text-white">
            Developer <span className="bg-gradient-to-r from-cyber-purple to-cyber-pink bg-clip-text text-transparent">Workspace</span>
          </h2>
        </div>

        {/* Tools Floating Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {tools?.map((tool, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { 
                opacity: 1, 
                scale: 1,
              } : {}}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
              className="relative"
            >
              {/* Nested floating container with individualized speed and range */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: tool.floatDuration,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className={`glass-card p-5 sm:p-6 rounded-lg text-left shadow-lg border border-purple-500/10 hover:shadow-xl transition-shadow group cursor-pointer ${tool.glowColor}`}
              >
                {/* Hologram Scanner beam */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-500/5 to-transparent w-full h-[30%] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:animate-pulse" />
                
                {/* Icon wrapper */}
                <div className="mb-4 bg-purple-950/20 border border-purple-500/10 p-3 w-fit rounded-lg group-hover:scale-110 transition-transform duration-350">
                  {tool.icon}
                </div>
                
                <h3 className="text-sm font-bold text-white group-hover:text-cyber-cyan transition-colors truncate">
                  {tool.name}
                </h3>
                
                <p className="text-[10px] font-mono text-zinc-400 mt-1 uppercase tracking-wide group-hover:text-zinc-300 transition-colors">
                  {tool.category}
                </p>
                
                {/* Mini cyber diagnostics */}
                <div className="mt-4 flex justify-between items-center text-[8px] text-purple-400/30 font-mono">
                  <span>STABLE // MOUNT</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
