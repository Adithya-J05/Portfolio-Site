"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, Users, Megaphone } from "lucide-react";

interface TimelineItem {
  year: string;
  type: "education" | "leadership";
  title: string;
  organization: string;
  details: string[];
  icon: React.ReactNode;
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position relative to timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const timelineData: TimelineItem[] = [
    {
      year: "2025",
      type: "leadership",
      title: "General Secretary",
      organization: "Feedbox College Club, VIT Bhopal",
      icon: <Users className="h-5 w-5 text-cyber-purple" />,
      details: [
        "Served as executive leader heading a team of 80+ club members.",
        "Orchestrated operational coordination, delegating logistics and scheduling across divisions.",
        "Planned, budgeted, and executed 3 major academic/cultural student events.",
      ],
    },
    {
      year: "2024 - 2025",
      type: "leadership",
      title: "Corporate & Outreach Team",
      organization: "E-Cell, VIT Bhopal",
      icon: <Briefcase className="h-5 w-5 text-cyber-cyan" />,
      details: [
        "Utilized data-driven outreach strategies to secure brand partnerships and creator PR collaborations.",
        "Acquired corporate franchising and financial sponsorship support for institutional summits.",
        "Contributed to the successful hosting and logistics of 6 large-scale entrepreneurial events.",
      ],
    },
    {
      year: "2023 - 2025",
      type: "leadership",
      title: "PR & Outreach Representative",
      organization: "Meraki Club, VIT Bhopal",
      icon: <Megaphone className="h-5 w-5 text-cyber-purple" />,
      details: [
        "Managed club public relations, crafting digital marketing campaigns and handling press releases.",
        "Secured critical event partnerships and brand sponsorships.",
        "Coordinated PR drives and onsite logistics for 9 major club gatherings.",
      ],
    },
    {
      year: "2023 - 2027",
      type: "education",
      title: "B.Tech in Computer Science Engineering (AI & ML)",
      organization: "Vellore Institute of Technology, Bhopal",
      icon: <GraduationCap className="h-5 w-5 text-cyber-cyan" />,
      details: [
        "Specializing in Artificial Intelligence and Machine Learning.",
        "Maintaining a cumulative CGPA of 8.39 / 10.0.",
        "Focused coursework: Deep Learning, Computer Vision pipelines, NLP, and cloud architectures.",
      ],
    },
    {
      year: "2022 - 2023",
      type: "education",
      title: "Higher Secondary Certificate (HSC)",
      organization: "Navy Children School, Kochi, Kerala",
      icon: <GraduationCap className="h-5 w-5 text-cyber-purple" />,
      details: [
        "Graduated with a score of 90.6% in senior secondary exams.",
        "Specialized in Physics, Chemistry, Mathematics, and Computer Science.",
      ],
    },
    {
      year: "2020 - 2021",
      type: "education",
      title: "Secondary School Certificate (SSC)",
      organization: "Kendriya Vidyalaya No.2, Port Blair",
      icon: <GraduationCap className="h-5 w-5 text-cyber-cyan" />,
      details: [
        "Completed matriculation exams with a score of 94.2%.",
        "Foundational STEM studies.",
      ],
    },
  ];

  return (
    <section id="experience" className="py-32 relative select-none">
      <div className="absolute inset-0 bg-dot-cyber opacity-15 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col mb-28">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-[1px] w-8 bg-cyber-cyan" />
            <span className="font-mono text-xs tracking-[0.3em] font-bold text-cyber-cyan">TIMELINE.LOAD()</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-wider uppercase text-white">
            Experience & <span className="bg-gradient-to-r from-cyber-cyan to-cyber-purple bg-clip-text text-transparent">Education</span>
          </h2>
        </div>

        {/* Timeline body wrapper */}
        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          
          {/* Background Static Track Line (Thicker: 4px) */}
          <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[4px] bg-purple-950/30" />
          
          {/* Animated Scroll Glowing Fill Line (Thicker: 6px) */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[6px] bg-gradient-to-b from-cyber-cyan via-cyber-purple to-cyber-pink shadow-[0_0_18px_rgba(188,52,250,0.5)]"
          />

          {/* Timeline Nodes (Spaced Out: space-y-32) */}
          <div className="space-y-32">
            {timelineData?.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className="relative flex flex-col md:flex-row items-start justify-between">
                  
                  {/* Central Node Indicator dot (Enlarged: h-11 w-11) */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-2.5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-[#030014] border-[3px] border-cyber-cyan shadow-[0_0_15px_rgba(6,182,212,0.35)] group hover:border-cyber-purple transition-all duration-300">
                    <div className="h-4.5 w-4.5 rounded-full bg-cyber-cyan group-hover:bg-cyber-purple transition-colors animate-pulse" />
                  </div>

                  {/* Left Side Spacer */}
                  <div className={`w-full md:w-[45%] pl-14 md:pl-0 ${isEven ? "md:text-right md:order-1" : "md:order-3"}`}>
                    {isEven && (
                      <TimelineContent item={item} isEven={isEven} />
                    )}
                  </div>

                  {/* Empty divider column */}
                  <div className="hidden md:block w-[10%]" />

                  {/* Right Side Spacer */}
                  <div className={`w-full md:w-[45%] pl-14 md:pl-0 ${isEven ? "md:order-3" : "md:text-left md:order-1"}`}>
                    {!isEven && (
                      <TimelineContent item={item} isEven={isEven} />
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

function TimelineContent({ item, isEven }: { item: TimelineItem; isEven: boolean }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card p-8 sm:p-11 rounded-xl border-l-4 border-cyber-purple/20 bg-purple-950/20 backdrop-blur-2xl hover:border-cyber-purple hover:shadow-[0_0_40px_rgba(188,52,250,0.25)] transition-all duration-500 relative group"
    >
      {/* Corner laser scope dot */}
      <span className="absolute top-3.5 right-3.5 text-purple-400/40 text-[10px] font-mono select-none">
        0x{item.year.replace(/[^0-9]/g, "").slice(0, 4)}
      </span>

      {/* Date and Type badges */}
      <div className={`flex items-center gap-2.5 font-mono text-xs sm:text-sm font-bold text-cyber-cyan uppercase mb-4.5 ${isEven ? "md:justify-end" : "justify-start"}`}>
        <Calendar className="h-4.5 w-4.5" />
        <span>{item.year}</span>
        <span className="text-zinc-600">//</span>
        <span className={item.type === "education" ? "text-emerald-400 font-black tracking-wider" : "text-cyber-purple font-black tracking-wider"}>
          {item.type}
        </span>
      </div>

      {/* Header and Organization (Enlarged) */}
      <div className={`flex items-start gap-3.5 mb-5 ${isEven ? "md:flex-row-reverse" : "flex-row"}`}>
        <div className="p-3 bg-purple-950/40 border border-purple-500/20 rounded-xl text-cyber-cyan group-hover:scale-110 transition-transform duration-300 shrink-0 [&>svg]:h-6 [&>svg]:w-6">
          {item.icon}
        </div>
        <div className={isEven ? "md:text-right" : "text-left"}>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-white uppercase tracking-wide leading-snug group-hover:text-cyber-cyan transition-colors">
            {item.title}
          </h3>
          <h4 className="text-xs sm:text-sm font-mono text-zinc-400 font-bold mt-1">
            {item.organization}
          </h4>
        </div>
      </div>

      {/* Bullet descriptions (Enlarged and spaced: text-sm, leading-relaxed) */}
      <ul className={`space-y-3.5 text-xs sm:text-sm text-zinc-300 leading-relaxed ${isEven ? "md:text-right" : "text-left"}`}>
        {item?.details?.map((detail, dIdx) => (
          <li key={dIdx} className="leading-relaxed relative pl-4 md:pl-0">
            {/* Custom cyber bullets for mobile left align */}
            <span className="absolute left-0 top-2 h-1 w-1 bg-cyber-purple rounded-full md:hidden" />
            {detail}
          </li>
        ))}
      </ul>
      
      {/* Small hover border glowing effect */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-cyber-cyan/45 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.div>
  );
}
