"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, MapPin, Award, CheckCircle, Code, ShieldCheck } from "lucide-react";

interface CounterProps {
  value: number;
  duration?: number;
  suffix?: string;
}

function Counter({ value, duration = 1.5, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * value));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, value, duration]);

  return <span ref={ref} className="font-mono">{count.toLocaleString()}{suffix}</span>;
}

export default function About() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const stats = [
    { value: 15, suffix: "+", label: "Completed Projects" },
    { value: 20, suffix: "+", label: "Technologies Used" },
    { value: 5, suffix: "+", label: "Years Experience in Coding" },
    { value: 18, suffix: "+", label: "Club Events Executed" },
  ];

  return (
    <section id="about" className="py-24 relative select-none">
      <div className="absolute inset-0 bg-dot-cyber opacity-30 pointer-events-none" />
      
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-[1px] w-8 bg-cyber-purple" />
            <span className="font-mono text-[10px] uppercase text-cyber-purple tracking-[0.3em] font-bold">INFO.RECON()</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-wider uppercase text-white">
            Developer <span className="bg-gradient-to-r from-cyber-purple to-cyber-cyan bg-clip-text text-transparent">Profile</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Bio Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            <div className="glass-card p-6 sm:p-8 rounded-lg relative overflow-hidden flex-1 flex flex-col justify-between">
              {/* Corner cyan details */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-cyber-cyan/30 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-cyber-cyan/30 rounded-bl-lg" />
              
              <div>
                {/* Header details */}
                <div className="flex flex-wrap items-center gap-4 mb-6 text-xs text-purple-300/80 font-mono">
                  <div className="flex items-center gap-1 bg-purple-950/30 px-2.5 py-1 border border-purple-500/10 rounded">
                    <GraduationCap className="h-3.5 w-3.5 text-cyber-cyan" />
                    <span>VIT Bhopal B.Tech</span>
                  </div>
                  <div className="flex items-center gap-1 bg-purple-950/30 px-2.5 py-1 border border-purple-500/10 rounded">
                    <MapPin className="h-3.5 w-3.5 text-cyber-cyan" />
                    <span>Kochi, Kerala</span>
                  </div>
                  <div className="flex items-center gap-1 bg-purple-950/30 px-2.5 py-1 border border-purple-500/10 rounded">
                    <Award className="h-3.5 w-3.5 text-cyber-cyan" />
                    <span>CGPA: 8.39 / 10</span>
                  </div>
                </div>

                {/* Bio text */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 uppercase">
                  Pursuing CSE specializing in Artificial Intelligence & Machine Learning
                </h3>
                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6">
                  I am a passionate AI/ML developer and software engineer aiming for SDE and Cloud Engineering roles. With hands-on experience in building and deploying ML pipelines, configuring real-time vision frameworks, and managing cloud systems, I enjoy bridging core AI capabilities with robust engineering architectures.
                </p>
                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6">
                  My background involves designing intelligent edge devices, training deep neural networks, and creating classification pipelines from scratch using lightweight statistical methodologies. Outside of building code, I run operational strategy as a leader in student clubs, orchestrating logistics, public relations, and partner relations.
                </p>
              </div>

              {/* Targets list */}
              <div className="border-t border-purple-500/10 pt-6 mt-6">
                <h4 className="font-mono text-xs uppercase tracking-wider text-cyber-cyan mb-3">Target Sectors:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono text-zinc-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>Software Development</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>Cloud Engineering</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>Computer Vision R&D</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>ML Pipeline Ops</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            {stats?.map((stat, i) => (
              <div
                key={i}
                className="glass-card p-6 flex flex-col justify-center items-center text-center rounded-lg border-l-2 hover:border-l-cyber-cyan transition-all duration-300 group"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2 group-hover:scale-105 transition-transform duration-300">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[10px] font-mono tracking-widest text-purple-400 uppercase leading-snug">
                  {stat.label}
                </div>
                {/* Micro laser scope */}
                <div className="mt-4 w-6 h-[1px] bg-purple-500/20 group-hover:w-12 group-hover:bg-cyber-cyan transition-all duration-300" />
              </div>
            ))}

            {/* Extra Technical Matrix panel */}
            <div className="col-span-2 glass-card p-4 sm:p-5 rounded-lg flex items-center gap-4 bg-purple-950/10 border-cyber-purple/20">
              <ShieldCheck className="h-10 w-10 text-cyber-cyan shrink-0 animate-pulse" />
              <div className="font-mono text-[10px] uppercase text-zinc-400">
                <span className="text-cyber-cyan font-bold block mb-1">SYSTEM_INTEGRITY_CHECK</span>
                VIT Bhopal B.Tech CSE AI/ML Core. Secure credential certified.
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
