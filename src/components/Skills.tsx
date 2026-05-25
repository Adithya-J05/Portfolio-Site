"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, BrainCircuit, Library, Cloud, Check } from "lucide-react";

interface SkillItem {
  name: string;
  level: number; // percentage
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  colorClass: string;
  skills: SkillItem[];
}

export default function Skills() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const categories: SkillCategory[] = [
    {
      title: "Languages",
      icon: <Code2 className="h-5 w-5 text-cyber-cyan" />,
      colorClass: "from-cyber-cyan to-blue-500",
      skills: [
        { name: "Python", level: 95 },
        { name: "Java", level: 85 },
        { name: "C++", level: 80 },
        { name: "JavaScript", level: 75 },
      ],
    },
    {
      title: "AI & ML Concepts",
      icon: <BrainCircuit className="h-5 w-5 text-cyber-purple" />,
      colorClass: "from-cyber-purple to-cyber-pink",
      skills: [
        { name: "Machine Learning / DL", level: 90 },
        { name: "Computer Vision (YOLOv8)", level: 90 },
        { name: "Natural Language Processing", level: 85 },
        { name: "Reinforcement Learning", level: 75 },
      ],
    },
    {
      title: "Frameworks & Libraries",
      icon: <Library className="h-5 w-5 text-cyber-violet" />,
      colorClass: "from-cyber-violet to-purple-500",
      skills: [
        { name: "TensorFlow & PyTorch", level: 85 },
        { name: "OpenCV & MediaPipe", level: 90 },
        { name: "scikit-learn & Ultralytics", level: 85 },
        { name: "NumPy, Pillow & NumPy", level: 90 },
      ],
    },
    {
      title: "Cloud & Web Integration",
      icon: <Cloud className="h-5 w-5 text-emerald-400" />,
      colorClass: "from-emerald-400 to-teal-500",
      skills: [
        { name: "Microsoft Azure / AWS", level: 80 },
        { name: "Docker & REST APIs", level: 85 },
        { name: "ReactJS / HTML & CSS", level: 75 },
        { name: "MongoDB & MySQL", level: 80 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 relative select-none">
      <div className="absolute inset-0 bg-dot-cyber opacity-15 pointer-events-none" />
      
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-[1px] w-8 bg-cyber-cyan" />
            <span className="font-mono text-[10px] uppercase text-cyber-cyan tracking-[0.3em] font-bold">SKILLS.LOAD()</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-wider uppercase text-white">
            Technical <span className="bg-gradient-to-r from-cyber-cyan to-cyber-purple bg-clip-text text-transparent">Capabilities</span>
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories?.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.15, ease: "easeOut" }}
              className="glass-card p-6 sm:p-8 rounded-lg relative hover:border-white/10 transition-colors group flex flex-col justify-between"
            >
              {/* Corner accent line */}
              <div className="absolute -top-[1px] -left-[1px] w-12 h-[2px] bg-gradient-to-r from-transparent to-cyber-cyan/30 group-hover:to-cyber-cyan transition-all" />
              
              <div>
                {/* Header */}
                <div className="flex items-center gap-3 mb-8 border-b border-purple-500/10 pb-4">
                  <div className="p-2 bg-purple-950/20 border border-purple-500/10 rounded-md">
                    {cat.icon}
                  </div>
                  <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                    {cat.title}
                  </h3>
                </div>

                {/* Skills progress list */}
                <div className="space-y-6">
                  {cat?.skills?.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-2">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-zinc-300 font-medium flex items-center gap-1.5">
                          <Check className="h-3 w-3 text-cyber-cyan" />
                          {skill.name}
                        </span>
                        <span className="text-purple-400 font-bold">{skill.level}%</span>
                      </div>
                      
                      {/* Bar Track */}
                      <div className="h-2 w-full bg-purple-950/40 rounded border border-purple-500/5 p-[1px] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 1.2, delay: idx * 0.1 + sIdx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                          className={`h-full rounded-sm bg-gradient-to-r ${cat.colorClass}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual scanner stamp */}
              <div className="text-[8px] font-mono text-purple-400/20 uppercase tracking-[0.25em] text-right mt-8 select-none">
                SYS_VERIFIED // DATA_MAT_OK
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
