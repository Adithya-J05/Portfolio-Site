"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Flame, FolderGit2, Star, GitCommit, Terminal } from "lucide-react";
import { FaGithub } from "react-icons/fa";

interface ContributionCell {
  level: 0 | 1 | 2 | 3 | 4;
  commits: number;
  date: string;
}

export default function GithubStats() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [gridData, setGridData] = useState<ContributionCell[]>([]);
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

  // Generate mock contribution calendar data (7 rows x 34 columns = 238 days)
  useEffect(() => {
    const data: ContributionCell[] = [];
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() - 238);

    const levelFrequencies = [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 4]; // weights towards 0/1/2

    for (let i = 0; i < 238; i++) {
      const level = levelFrequencies[Math.floor(Math.random() * levelFrequencies.length)] as 0 | 1 | 2 | 3 | 4;
      const commits = level === 0 ? 0 : Math.floor(Math.random() * 5) + (level - 1) * 3 + 1;
      
      const d = new Date(baseDate);
      d.setDate(d.getDate() + i);
      const dateStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      
      data.push({ level, commits, date: dateStr });
    }
    setGridData(data);
  }, []);

  const statPanels = [
    {
      title: "Current Streak",
      value: "185 Days",
      icon: <Flame className="h-5 w-5 text-amber-500 animate-pulse" />,
      desc: "Consecutive active coding days",
    },
    {
      title: "Public Repositories",
      value: "42 Nodes",
      icon: <FolderGit2 className="h-5 w-5 text-cyber-cyan" />,
      desc: "Configured codebase networks",
    },
    {
      title: "GitHub Contributions",
      value: "1500+",
      icon: <GitCommit className="h-5 w-5 text-cyber-purple" />,
      desc: "Total activity inputs across systems",
    },
    {
      title: "GitHub Stars",
      value: "120+ Stars",
      icon: <Star className="h-5 w-5 text-yellow-400" />,
      desc: "Global repository bookmark hits",
    },
  ];

  // Helper cell color classes
  const getCellColor = (level: 0 | 1 | 2 | 3 | 4) => {
    switch (level) {
      case 1:
        return "bg-purple-950/40 border border-purple-800/10";
      case 2:
        return "bg-purple-900/60 border border-purple-700/20";
      case 3:
        return "bg-cyber-violet/60 shadow-[0_0_5px_rgba(139,92,246,0.3)]";
      case 4:
        return "bg-cyber-purple shadow-[0_0_8px_rgba(188,52,250,0.6)]";
      case 0:
      default:
        return "bg-purple-950/10 border border-purple-950/20";
    }
  };

  const handleCellHover = (e: React.MouseEvent<HTMLDivElement>, cell: ContributionCell) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const commitsText = cell.commits === 0 ? "No commits" : `${cell.commits} commits`;
    setTooltip({
      text: `${commitsText} on ${cell.date}`,
      x: rect.left + window.scrollX + rect.width / 2,
      y: rect.top + window.scrollY - 35,
    });
  };

  return (
    <section id="stats" className="py-24 relative select-none">
      <div className="absolute inset-0 bg-dot-cyber opacity-10 pointer-events-none" />
      
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-[1px] w-8 bg-cyber-purple" />
            <span className="font-mono text-[10px] uppercase text-cyber-purple tracking-[0.3em] font-bold">TELEMETRY.RECON()</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-wider uppercase text-white flex flex-wrap items-baseline gap-2">
            GitHub <span className="bg-gradient-to-r from-cyber-purple to-cyber-cyan bg-clip-text text-transparent">Telemetry</span>
            <span className="font-mono text-[10px] sm:text-xs text-cyber-cyan/40 tracking-wider lowercase border border-cyber-cyan/15 bg-cyber-cyan/5 px-2 py-0.5 rounded select-none">
              (experimental)
            </span>
          </h2>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Stat panels */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {statPanels?.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="glass-card p-5 rounded-lg border border-purple-500/10 hover:border-purple-500/25 transition-colors relative group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] uppercase text-zinc-500 tracking-wider">
                    Panel_0{i + 1}
                  </span>
                  <div className="p-1.5 bg-purple-950/20 border border-purple-500/10 rounded">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white mb-1 uppercase font-mono tracking-tight">
                  {stat.value}
                </div>
                <h3 className="text-xs font-bold text-cyber-cyan mb-1.5 uppercase tracking-wide">
                  {stat.title}
                </h3>
                <p className="text-[10px] text-zinc-400 font-mono leading-relaxed">
                  {stat.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right: Contributions visualizer */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className="glass-card p-6 rounded-lg relative overflow-hidden flex flex-col justify-between">
              
              {/* Card headers */}
              <div className="flex items-center justify-between border-b border-purple-500/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <FaGithub className="h-4 w-4 text-cyber-cyan" />
                  <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                    Contributions_Grid // adithya-j
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[9px] bg-purple-950/45 border border-purple-500/10 text-emerald-400 px-2 py-0.5 rounded">
                  <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping" />
                  <span>ONLINE FEED</span>
                </div>
              </div>

              {/* Grid Scroll Wrapper */}
              <div className="overflow-x-auto no-scrollbar py-2">
                <div className="grid grid-rows-7 grid-flow-col gap-[3px] min-w-[580px]">
                  {gridData?.map((cell, idx) => (
                    <div
                      key={idx}
                      onMouseEnter={(e) => handleCellHover(e, cell)}
                      onMouseLeave={() => setTooltip(null)}
                      className={`h-[11px] w-[11px] rounded-[1px] transition-all duration-200 cursor-crosshair hover:scale-125 hover:z-10 ${getCellColor(
                        cell.level
                      )}`}
                    />
                  ))}
                </div>
              </div>

              {/* Grid Legends */}
              <div className="flex justify-between items-center mt-6 font-mono text-[10px] text-zinc-500 pt-4 border-t border-purple-500/10">
                <span>238 Days Ago</span>
                <div className="flex items-center gap-1">
                  <span>Less</span>
                  <div className="h-2.5 w-2.5 rounded-[1px] bg-purple-950/10 border border-purple-955/20" />
                  <div className="h-2.5 w-2.5 rounded-[1px] bg-purple-950/40 border border-purple-800/10" />
                  <div className="h-2.5 w-2.5 rounded-[1px] bg-purple-900/60 border border-purple-700/20" />
                  <div className="h-2.5 w-2.5 rounded-[1px] bg-cyber-violet/60" />
                  <div className="h-2.5 w-2.5 rounded-[1px] bg-cyber-purple shadow-[0_0_5px_rgba(188,52,250,0.6)]" />
                  <span>More</span>
                </div>
                <span>Today</span>
              </div>

            </div>
          </motion.div>

        </div>

      </div>

      {/* Floating global calendar grid cell tooltip */}
      {tooltip && (
        <div
          style={{ left: tooltip.x, top: tooltip.y }}
          className="absolute -translate-x-1/2 z-30 font-mono text-[9px] font-bold uppercase text-white bg-purple-950 border border-cyber-purple/50 px-2 py-1.5 shadow-[0_0_10px_rgba(188,52,250,0.3)] rounded pointer-events-none whitespace-nowrap"
        >
          {tooltip.text}
        </div>
      )}

    </section>
  );
}
