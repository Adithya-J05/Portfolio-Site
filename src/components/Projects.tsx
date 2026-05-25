"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Bot, Eye, HelpCircle, Activity, Cloud, LayoutGrid, ChevronRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";

interface ProjectItem {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  github: string;
  demo: string;
  icon: React.ReactNode;
  svgBlueprint: React.ReactNode;
}

function ProjectCard({ project }: { project: ProjectItem }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    // Map mouse position to rotation coordinates (Max 12 degrees)
    const rX = -(mouseY / height) * 12;
    const rY = (mouseX / width) * 12;
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.1s ease-out",
        transformStyle: "preserve-3d",
      }}
      className="glass-card rounded-lg overflow-hidden flex flex-col justify-between border border-purple-500/10 hover:border-cyber-purple/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300 group select-none relative"
    >
      {/* Top blueprint graphical display */}
      <div className="relative h-44 bg-purple-950/15 border-b border-purple-500/10 overflow-hidden flex items-center justify-center p-4">
        {project.svgBlueprint}
        {/* Glowing badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 font-mono text-[9px] bg-purple-950/40 text-cyber-cyan border border-cyber-cyan/30 px-2 py-0.5 rounded uppercase">
          {project.icon}
          <span>{project.category}</span>
        </div>
      </div>

      {/* Info Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-white mb-2 uppercase group-hover:text-cyber-cyan transition-colors">
            {project.title}
          </h3>
          <p className="text-zinc-400 text-xs leading-relaxed mb-6">
            {project.description}
          </p>
        </div>

        <div>
          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project?.tags?.map((tag, idx) => (
              <span
                key={idx}
                className="font-mono text-[9px] bg-purple-950/30 text-purple-300 border border-purple-500/10 px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex justify-between items-center border-t border-purple-500/10 pt-4 mt-auto">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-mono text-[10px] text-zinc-400 hover:text-white uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[0_0_8px_rgba(255,255,255,0.2)]"
            >
              <FaGithub className="h-3.5 w-3.5" />
              <span>Source_Code</span>
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-mono text-[10px] text-cyber-cyan hover:text-white uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[0_0_12px_rgba(6,182,212,0.4)]"
            >
              <span>Live_Demo</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
 
      {/* Futuristic scanner line sweep on card hover */}
      <div className="scanner-line h-[1px] opacity-0 group-hover:opacity-20 pointer-events-none" />
    </motion.div>
  );
}
 
export default function Projects() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
 
  const projectList: ProjectItem[] = [
    {
      id: 1,
      title: "Smart Navigation for Visually Impaired",
      category: "Computer Vision",
      icon: <Eye className="h-3 w-3" />,
      description: "Real-time edge object detection pipeline using YOLOv8, PyTorch, and OpenCV. Integrates spatial positioning, distance estimation, and non-blocking multi-threaded TTS voice notifications.",
      tags: ["Python", "YOLOv8", "PyTorch", "OpenCV", "Threading", "TTS"],
      github: "https://github.com/Adithya-J05",
      demo: "https://drive.google.com/drive/folders/1HhwXE2Tlta1dwWmRp54LWV8uGecWrgT9?usp=sharing",
      svgBlueprint: (
        <svg viewBox="0 0 200 120" className="w-full h-full text-cyber-cyan opacity-40">
          <rect x="10" y="10" width="180" height="100" rx="4" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <line x1="100" y1="10" x2="100" y2="110" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
          {/* Target object detection box */}
          <rect x="40" y="30" width="70" height="50" stroke="#a855f7" strokeWidth="1.5" fill="rgba(168, 85, 247, 0.05)" />
          <text x="45" y="42" fill="#a855f7" fontSize="6" fontFamily="monospace">Obstacle: 1.8m</text>
          {/* HUD Crosshairs */}
          <circle cx="100" cy="60" r="15" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" />
          <circle cx="100" cy="60" r="2" fill="currentColor" />
          {/* Distance vectors */}
          <line x1="100" y1="60" x2="75" y2="55" stroke="currentColor" strokeWidth="0.5" />
          <text x="140" y="100" fill="currentColor" fontSize="5" fontFamily="monospace">FPS: 30 // EDGE</text>
        </svg>
      ),
    },
    {
      id: 2,
      title: "Real-Time Posture Tracking System",
      category: "Computer Vision",
      icon: <Activity className="h-3 w-3" />,
      description: "Inference pipeline tracking coordinates at 28 FPS with 90%+ pose accuracy. Extracts body angles using MediaPipe and provides instant vector overlays on video feeds with <200ms latency.",
      tags: ["Python", "OpenCV", "MediaPipe", "NumPy", "Git"],
      github: "https://github.com/Adithya-J05",
      demo: "https://drive.google.com/drive/folders/1HhwXE2Tlta1dwWmRp54LWV8uGecWrgT9?usp=sharing",
      svgBlueprint: (
        <svg viewBox="0 0 200 120" className="w-full h-full text-cyber-purple opacity-40">
          <circle cx="100" cy="35" r="8" stroke="currentColor" strokeWidth="1" fill="none" />
          {/* Skeleton bones representation */}
          <line x1="100" y1="43" x2="100" y2="75" stroke="currentColor" strokeWidth="1" />
          <line x1="100" y1="50" x2="80" y2="65" stroke="currentColor" strokeWidth="1" />
          <line x1="100" y1="50" x2="120" y2="65" stroke="currentColor" strokeWidth="1" />
          <line x1="100" y1="75" x2="85" y2="105" stroke="currentColor" strokeWidth="1" />
          <line x1="100" y1="75" x2="115" y2="105" stroke="currentColor" strokeWidth="1" />
          {/* Keypoints */}
          <circle cx="100" cy="43" r="1.5" fill="#06b6d4" />
          <circle cx="80" cy="65" r="1.5" fill="#06b6d4" />
          <circle cx="120" cy="65" r="1.5" fill="#06b6d4" />
          {/* Angle indicator arc */}
          <path d="M 90,50 A 10,10 0 0,1 100,60" stroke="#06b6d4" strokeWidth="1" fill="none" />
          <text x="110" y="55" fill="currentColor" fontSize="5" fontFamily="monospace">Angle: 168 deg</text>
        </svg>
      ),
    },
    {
      id: 3,
      title: "Hierarchical intent classifier",
      category: "Natural Language Processing",
      icon: <HelpCircle className="h-3 w-3" />,
      description: "Classifies 77 complex intent classes from Banking77 dataset using Bag-of-Words and hierarchical layers. Resolves semantic conflicts without GPU-heavy transformers.",
      tags: ["Python", "NLP", "Naive Bayes", "SLM", "Scikit-Learn"],
      github: "https://github.com/Adithya-J05",
      demo: "https://drive.google.com/drive/folders/1HhwXE2Tlta1dwWmRp54LWV8uGecWrgT9?usp=sharing",
      svgBlueprint: (
        <svg viewBox="0 0 200 120" className="w-full h-full text-zinc-400 opacity-40">
          {/* Hierarchical tree structure */}
          <rect x="85" y="10" width="30" height="12" rx="2" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <text x="90" y="18" fill="currentColor" fontSize="5" fontFamily="monospace">ROOT_QUERY</text>
          
          <line x1="100" y1="22" x2="50" y2="45" stroke="currentColor" strokeWidth="0.5" />
          <line x1="100" y1="22" x2="150" y2="45" stroke="currentColor" strokeWidth="0.5" />
 
          <rect x="30" y="45" width="40" height="12" rx="2" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <text x="35" y="53" fill="currentColor" fontSize="5" fontFamily="monospace">CAT: CARDS</text>
          
          <rect x="130" y="45" width="40" height="12" rx="2" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <text x="135" y="53" fill="currentColor" fontSize="5" fontFamily="monospace">CAT: PAYMENTS</text>
 
          <line x1="50" y1="57" x2="30" y2="80" stroke="currentColor" strokeWidth="0.5" />
          <line x1="50" y1="57" x2="70" y2="80" stroke="currentColor" strokeWidth="0.5" />
          
          <circle cx="30" cy="80" r="2" fill="#a855f7" />
          <text x="20" y="90" fill="currentColor" fontSize="4" fontFamily="monospace">Card_Lost</text>
          <circle cx="70" cy="80" r="2" fill="#a855f7" />
          <text x="60" y="90" fill="currentColor" fontSize="4" fontFamily="monospace">Card_Blocked</text>
        </svg>
      ),
    },
    {
      id: 4,
      title: "Cart-Pole Reinforcement Learning",
      category: "Reinforcement Learning",
      icon: <Bot className="h-3 w-3" />,
      description: "Trains an RL agent to stabilize a balancing pole inside OpenAI Gym environment using reward maximization, exploration decay, and learning analysis curves.",
      tags: ["Python", "OpenAI Gym", "Reinforcement Learning", "NumPy"],
      github: "https://github.com/Adithya-J05",
      demo: "https://drive.google.com/drive/folders/1HhwXE2Tlta1dwWmRp54LWV8uGecWrgT9?usp=sharing",
      svgBlueprint: (
        <svg viewBox="0 0 200 120" className="w-full h-full text-emerald-400 opacity-40">
          {/* Cart pole system */}
          <line x1="20" y1="90" x2="180" y2="90" stroke="currentColor" strokeWidth="1" />
          {/* Cart */}
          <rect x="80" y="75" width="40" height="15" rx="1" stroke="currentColor" strokeWidth="1" fill="none" />
          <circle cx="90" cy="95" r="5" stroke="currentColor" strokeWidth="1" fill="none" />
          <circle cx="110" cy="95" r="5" stroke="currentColor" strokeWidth="1" fill="none" />
          {/* Pole tilted */}
          <line x1="100" y1="75" x2="120" y2="25" stroke="#a855f7" strokeWidth="2.5" />
          <circle cx="120" cy="25" r="3" fill="#a855f7" />
          {/* Vector forces */}
          <path d="M 125,25 L 140,25" stroke="currentColor" strokeWidth="0.5" markerEnd="url(#arrow)" />
          <text x="60" y="112" fill="currentColor" fontSize="5" fontFamily="monospace">REWARD_STABLE: 500 [MAX]</text>
        </svg>
      ),
    },
    {
      id: 5,
      title: "Cloud-Native Model Deployment Stack",
      category: "Cloud Engineering",
      icon: <Cloud className="h-3 w-3" />,
      description: "Mock cloud orchestration showing multi-container FastAPI backend deployments inside Docker wrappers, connected with Azure metrics tracking and automated deploy pipelines.",
      tags: ["Docker", "Microsoft Azure", "FastAPI", "REST API", "CI/CD"],
      github: "https://github.com/Adithya-J05",
      demo: "https://drive.google.com/drive/folders/1HhwXE2Tlta1dwWmRp54LWV8uGecWrgT9?usp=sharing",
      svgBlueprint: (
        <svg viewBox="0 0 200 120" className="w-full h-full text-cyan-400 opacity-40">
          {/* Cluster nodes */}
          <rect x="25" y="20" width="45" height="30" rx="3" stroke="currentColor" strokeWidth="0.8" fill="none" strokeDasharray="3 2" />
          <text x="29" y="32" fill="currentColor" fontSize="5" fontFamily="monospace">API_GATEWAY</text>
          
          <rect x="130" y="20" width="45" height="30" rx="3" stroke="currentColor" strokeWidth="0.8" fill="none" />
          <text x="134" y="32" fill="currentColor" fontSize="5" fontFamily="monospace">INFERENCE_POD</text>
 
          <line x1="70" y1="35" x2="130" y2="35" stroke="#bc34fa" strokeWidth="1" />
          
          <rect x="75" y="70" width="50" height="30" rx="3" stroke="currentColor" strokeWidth="0.8" fill="none" />
          <text x="82" y="82" fill="currentColor" fontSize="5" fontFamily="monospace">METRICS_AGENT</text>
          
          <line x1="47" y1="50" x2="75" y2="75" stroke="currentColor" strokeWidth="0.5" />
          <line x1="152" y1="50" x2="125" y2="75" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      ),
    },
    {
      id: 6,
      title: "AI Developer Command Center HUD",
      category: "Full Stack",
      icon: <LayoutGrid className="h-3 w-3" />,
      description: "A premium dashboard displaying live telemetry statistics, model parameter loads, and neural system diagnostics built using React, Next.js, and Framer Motion.",
      tags: ["React", "Next.js", "Framer Motion", "TailwindCSS"],
      github: "https://github.com/Adithya-J05",
      demo: "https://drive.google.com/drive/folders/1HhwXE2Tlta1dwWmRp54LWV8uGecWrgT9?usp=sharing",
      svgBlueprint: (
        <svg viewBox="0 0 200 120" className="w-full h-full text-purple-400 opacity-40">
          {/* Grid Layout representing dashboard */}
          <rect x="10" y="10" width="80" height="40" rx="2" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <rect x="100" y="10" width="90" height="40" rx="2" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <rect x="10" y="60" width="180" height="50" rx="2" stroke="currentColor" strokeWidth="0.5" fill="none" />
          {/* Graph wave in bottom panel */}
          <path d="M 20,95 Q 50,65 80,95 T 140,95 T 180,80" stroke="#06b6d4" strokeWidth="1.5" fill="none" />
          <line x1="10" y1="85" x2="190" y2="85" stroke="currentColor" strokeWidth="0.3" strokeDasharray="1 4" />
          <text x="15" y="22" fill="currentColor" fontSize="5" fontFamily="monospace">Model weight: OK</text>
          <text x="105" y="22" fill="currentColor" fontSize="5" fontFamily="monospace">Core: Nominal</text>
        </svg>
      ),
    },
  ];

  return (
    <section id="projects" className="py-24 relative select-none">
      <div className="absolute inset-0 bg-dot-cyber opacity-15 pointer-events-none" />
      
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-[1px] w-8 bg-cyber-purple" />
            <span className="font-mono text-[10px] uppercase text-cyber-purple tracking-[0.3em] font-bold">PROJECTS.LOAD()</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-wider uppercase text-white">
            Technical <span className="bg-gradient-to-r from-cyber-purple to-cyber-cyan bg-clip-text text-transparent">Creations</span>
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectList?.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {/* Premium CTA: View Detailed Project Reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex justify-center"
        >
          <a
            href="https://drive.google.com/drive/folders/1HhwXE2Tlta1dwWmRp54LWV8uGecWrgT9?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center gap-2.5 px-8 py-4 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-cyber-purple/10 via-purple-950/20 to-cyber-cyan/10 border border-cyber-cyan/35 text-cyber-cyan hover:text-white hover:bg-cyber-cyan/10 hover:border-cyber-cyan hover:shadow-[0_0_20px_rgba(6,182,212,0.35)] rounded transition-all duration-500 cursor-pointer overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/5 to-cyber-purple/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span>View Detailed Project Reports</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronRight className="h-4 w-4" />
            </motion.span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
