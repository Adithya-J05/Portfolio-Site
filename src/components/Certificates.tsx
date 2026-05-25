"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, ChevronLeft, ChevronRight, ShieldCheck, Cpu, FileText } from "lucide-react";

export interface CertificateData {
  filename: string;
  title: string;
  type: "pdf" | "image";
  url: string;
}

interface CertificatesProps {
  certificates: CertificateData[];
}

export default function Certificates({ certificates }: CertificatesProps) {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragWidth, setDragWidth] = useState(0);
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (trackRef.current && carouselRef.current) {
      setDragWidth(trackRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, [certificates]);

  // Autoplay slow cycle
  useEffect(() => {
    if (flippedIndex !== null) return; // Pause autoplay when a card is flipped
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (certificates?.length === 0) return 0;
        return (prev + 1) % (certificates?.length || 1);
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [certificates, flippedIndex]);

  // Scroll to active index
  useEffect(() => {
    if (carouselRef.current && trackRef.current) {
      const cardWidth = 320 + 24; // width + gap
      carouselRef.current.scrollTo({
        left: currentIndex * cardWidth,
        behavior: "smooth"
      });
    }
  }, [currentIndex]);

  const handleNext = () => {
    setFlippedIndex(null);
    setCurrentIndex((prev) => (prev + 1) % (certificates?.length || 1));
  };

  const handlePrev = () => {
    setFlippedIndex(null);
    setCurrentIndex((prev) => (prev - 1 + (certificates?.length || 1)) % (certificates?.length || 1));
  };

  const getIssuer = (title: string): string => {
    const upper = title.toUpperCase();
    if (upper.includes("AWS")) return "Amazon Web Services";
    if (upper.includes("AZURE")) return "Microsoft";
    if (upper.includes("COURSERA")) return "Coursera";
    if (upper.includes("NPTEL")) return "NPTEL // IIT";
    if (upper.includes("SOLO")) return "SoloLearn";
    if (upper.includes("VITYARTHI")) return "VIT Bhopal";
    return "Verified Issuer";
  };

  const getSkills = (title: string): string[] => {
    const upper = title.toUpperCase();
    if (upper.includes("AWS")) return ["Cloud Infrastructure", "AWS Core", "IAM & S3", "EC2 & Serverless"];
    if (upper.includes("AZURE")) return ["Microsoft Azure", "Cloud Services", "Virtual Networks", "Azure Active Directory"];
    if (upper.includes("MACHINE LEARNING")) return ["Supervised Learning", "Scikit-Learn", "Model Training", "Python Analysis"];
    if (upper.includes("COMPUTER VISION")) return ["Image Processing", "OpenCV", "Keypoint Tracking", "MediaPipe"];
    if (upper.includes("CLOUD COMPUTING")) return ["Virtualization", "Cloud Service Models", "Kubernetes", "DevOps Pipelines"];
    if (upper.includes("VISUALIZE")) return ["Data Visualization", "Matplotlib", "Seaborn", "Analytics Curves"];
    return ["Artificial Intelligence", "Technical Development", "Software Engineering"];
  };

  const getYear = (title: string): string => {
    const upper = title.toUpperCase();
    if (upper.includes("AWS") || upper.includes("AZURE") || upper.includes("MACHINE LEARNING") || upper.includes("VISION")) {
      return "2024";
    }
    return "2023";
  };

  if (!certificates || certificates.length === 0) {
    return null;
  }

  return (
    <section id="certificates" className="py-24 relative select-none overflow-hidden">
      <div className="absolute inset-0 bg-dot-cyber opacity-15 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-[1px] w-8 bg-cyber-cyan" />
              <span className="font-mono text-[10px] uppercase text-cyber-cyan tracking-[0.3em] font-bold">CREDENTIALS.LOAD()</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-wider uppercase text-white">
              Professional <span className="bg-gradient-to-r from-cyber-cyan to-cyber-purple bg-clip-text text-transparent">Certifications</span>
            </h2>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="p-2 border border-purple-500/10 hover:border-cyber-cyan hover:bg-cyber-cyan/5 text-purple-300 hover:text-cyber-cyan rounded transition-all cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="font-mono text-xs text-zinc-500">
              {String(currentIndex + 1).padStart(2, "0")} / {String(certificates.length).padStart(2, "0")}
            </span>
            <button
              onClick={handleNext}
              className="p-2 border border-purple-500/10 hover:border-cyber-cyan hover:bg-cyber-cyan/5 text-purple-300 hover:text-cyber-cyan rounded transition-all cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Carousel Slider */}
        <div 
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-8 cursor-grab active:cursor-grabbing"
          style={{ scrollSnapType: "x mandatory" }}
        >
          <div ref={trackRef} className="flex gap-6">
            {certificates.map((cert, idx) => {
              const isFlipped = flippedIndex === idx;
              const isCenter = currentIndex === idx;
              
              return (
                <motion.div
                  key={idx}
                  className="snap-center shrink-0 w-[320px] h-[440px] perspective-1000"
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformStyle: "preserve-3d" }}
                    onClick={() => setFlippedIndex(isFlipped ? null : idx)}
                    className="relative w-full h-full cursor-pointer"
                  >
                    
                    {/* Front of Card */}
                    <div 
                      className={`absolute inset-0 w-full h-full rounded-lg glass-card p-6 flex flex-col justify-between border border-t-2 transition-all duration-500 backface-hidden ${
                        isCenter 
                          ? "border-cyber-cyan shadow-[0_0_25px_rgba(6,182,212,0.25)]" 
                          : "border-purple-500/20 hover:border-cyber-cyan/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]"
                      }`}
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <div>
                        {/* Certificate Header */}
                        <div className="flex justify-between items-center mb-4 border-b border-purple-500/10 pb-3">
                          <div className="flex items-center gap-1.5 font-mono text-[9px] bg-purple-950/30 text-cyber-cyan border border-cyber-cyan/20 px-2 py-0.5 rounded uppercase">
                            <Award className="h-3 w-3" />
                            <span>{cert.type === "pdf" ? "PDF Secure" : "Image Verified"}</span>
                          </div>
                          <span className="font-mono text-[9px] text-purple-400 font-bold">{getYear(cert.title)}</span>
                        </div>

                        {/* Certificate Title */}
                        <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-4 line-clamp-2 min-h-[40px] group-hover:text-cyber-cyan transition-colors">
                          {cert.title}
                        </h3>

                        {/* Holographic Document Preview Container */}
                        <div className="relative h-44 rounded overflow-hidden bg-purple-950/20 border border-purple-500/20 flex items-center justify-center p-1 group">
                          {cert.type === "pdf" ? (
                            <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0c0524] via-[#120736] to-[#1e0a4d] p-4 text-center overflow-hidden border border-cyber-cyan/15 rounded-md">
                              {/* Grid scanlines overlay */}
                              <div className="absolute inset-0 bg-grid-cyber opacity-25 pointer-events-none" />
                              {/* Hologram scanline */}
                              <div className="scanner-line h-[1.5px] opacity-25" />
                              {/* Glowing background aura */}
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-cyber-cyan/10 rounded-full blur-2xl pointer-events-none" />
                              
                              <div className="relative z-10 flex flex-col items-center gap-2.5">
                                <div className="p-3 bg-cyan-950/40 border border-cyber-cyan/35 rounded-full text-cyber-cyan shadow-[0_0_15px_rgba(6,182,212,0.25)] animate-pulse">
                                  <FileText className="h-7 w-7" />
                                </div>
                                <span className="font-mono text-[9px] text-cyber-cyan font-bold tracking-[0.25em] uppercase">
                                  PDF_DOCUMENT.SECURE()
                                </span>
                                
                                {/* Micro digital details */}
                                <div className="font-mono text-[8px] text-zinc-500 space-y-0.5 mt-1 border-t border-purple-500/10 pt-2 w-full max-w-[180px]">
                                  <div className="truncate text-center">NAME: {cert.title}</div>
                                  <div>STATUS: SECURE_EMBED</div>
                                  <div>SECTOR: CREDENTIALS_PORT</div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="relative w-full h-full">
                              <img
                                src={cert.url}
                                alt={cert.title}
                                className="w-full h-full object-cover opacity-45 group-hover:opacity-75 transition-opacity"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-purple-950/40 to-transparent pointer-events-none" />
                            </div>
                          )}

                          {/* Cyber scope HUD overlay */}
                          <div className="absolute inset-0 border border-cyber-cyan/10 pointer-events-none" />
                          <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-cyber-cyan/50" />
                          <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-cyber-cyan/50" />
                        </div>
                      </div>

                      {/* Card Bottom / Issuer details */}
                      <div className="border-t border-purple-500/10 pt-4 flex justify-between items-center">
                        <div>
                          <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-500 block">ISSUER</span>
                          <span className="text-xs font-bold text-zinc-300 font-mono">{getIssuer(cert.title)}</span>
                        </div>
                        <div className="text-[9px] font-mono text-cyber-cyan animate-pulse font-bold">
                          DETAILS_RECON &gt;&gt;
                        </div>
                      </div>

                    </div>

                    {/* Back of Card */}
                    <div 
                      className={`absolute inset-0 w-full h-full rounded-lg glass-card p-6 flex flex-col justify-between border border-t-2 backface-hidden ${
                        isCenter 
                          ? "border-cyber-purple shadow-[0_0_25px_rgba(188,52,250,0.25)]" 
                          : "border-purple-500/20 hover:border-cyber-purple/50 hover:shadow-[0_0_30px_rgba(188,52,250,0.2)]"
                      }`}
                      style={{ 
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)"
                      }}
                    >
                      <div>
                        {/* Header back */}
                        <div className="flex justify-between items-center mb-6 border-b border-purple-500/10 pb-3">
                          <span className="font-mono text-[9px] text-cyber-purple font-bold uppercase tracking-widest">
                            METADATA_ANALYSIS
                          </span>
                          <ShieldCheck className="h-4 w-4 text-emerald-400" />
                        </div>

                        {/* Title repeated back */}
                        <h4 className="text-xs font-mono font-bold text-white uppercase mb-4 tracking-wide line-clamp-2">
                          {cert.title}
                        </h4>

                        {/* Skills breakdown */}
                        <div className="space-y-4">
                          <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-500 block">Skills Compiled</span>
                          <div className="flex flex-wrap gap-2">
                            {getSkills(cert.title).map((skill, sIdx) => (
                              <span 
                                key={sIdx}
                                className="font-mono text-[10px] bg-purple-950/40 text-purple-300 border border-purple-500/10 px-2.5 py-1 rounded hover:border-cyber-purple/35 transition-colors"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Diagnostic detail */}
                        <div className="mt-6 font-mono text-[8px] text-zinc-500 space-y-1 bg-purple-950/20 p-3 border border-purple-500/5 rounded">
                          <div>SECURE_HASH: 0x{cert.title.substring(0,4).toUpperCase()}...</div>
                          <div>STATUS: VERIFIED // SECURE_PORT</div>
                        </div>
                      </div>

                      {/* Call to action button */}
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()} // Stop flip trigger when clicking link
                        className="flex items-center justify-center gap-2 py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest bg-gradient-to-r from-cyber-purple to-cyber-violet hover:from-cyber-cyan hover:to-cyber-purple text-white rounded transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_20px_rgba(6,182,212,0.35)]"
                      >
                        <span>Open_Certificate</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>

                    </div>

                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Global Drive Link for all certificates */}
        <div className="mt-8 flex justify-center">
          <a
            href="https://drive.google.com/drive/folders/1QoyCdWYC-M92dzCnYpThvQlXg9i1eef6?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest border border-cyber-cyan/30 text-cyber-cyan hover:text-white hover:bg-cyber-cyan/10 hover:border-cyber-cyan hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] rounded transition-all duration-500 cursor-pointer"
          >
            <span>View All Certificates in Google Drive</span>
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {certificates.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setFlippedIndex(null);
                setCurrentIndex(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx ? "w-6 bg-cyber-cyan shadow-[0_0_8px_#06b6d4]" : "w-1.5 bg-purple-500/20"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
