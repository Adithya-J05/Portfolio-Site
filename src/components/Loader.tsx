"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LOGS = [
  "SYSTEM_INIT: INITIALIZING PORTFOLIO_OS V3.5.0",
  "DECRYPTING: SECURE_CORE_KEY_4096...",
  "STATUS: SYSTEM DECRYPTED [OK]",
  "INIT: SETTING UP COGNITIVE PIPELINES",
  "LOAD: YOLOv8 VISION_PIPELINE [LOADED]",
  "LOAD: MEDIAPIPE POSTURE_KEYPOINT_ENGINE [ACTIVE]",
  "LOAD: REINFORCEMENT_LEARNING GYM_ENV [ESTABLISHED]",
  "LOAD: BANKING_77 INTENT_CLASSIFICATION MODEL [LOADED]",
  "LOAD: CLOUD_STACK AWS_AZURE_DOCKER [MOUNTED]",
  "DIAGNOSTIC: ALL CORES OPERATIONAL // CGPA 8.39 NOMINAL",
  "DECRYPT: ACCESS GRANTED. SECURE PORT ESTABLISHED.",
];

export default function Loader() {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Disable scrolling during load
    document.body.style.overflow = "hidden";

    // Progress counter
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    // Logging system script line-by-line
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < BOOT_LOGS.length) {
        setLogs((prev) => [...prev, BOOT_LOGS[logIndex]]);
        logIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 180);

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
    };
  }, []);

  useEffect(() => {
    if (progress === 100 && logs.length === BOOT_LOGS.length) {
      const timeout = setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = "unset";
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [progress, logs]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#030014] p-6 sm:p-12 font-mono text-[11px] sm:text-xs select-none"
        >
          {/* Top Panel */}
          <div className="flex justify-between items-center border-b border-purple-500/20 pb-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyber-cyan animate-pulse" />
              <span className="text-cyber-cyan font-bold tracking-wider">PORTFOLIO // NEURAL SYSTEM</span>
            </div>
            <div className="text-purple-400/60 uppercase">
              SECURE SESSION // COCHIN_VALENCIA_STATION
            </div>
          </div>

          {/* Core HUD Terminal Content */}
          <div className="flex-1 my-8 flex flex-col justify-start overflow-y-auto no-scrollbar gap-1 border border-purple-500/10 bg-purple-950/5 p-4 rounded-lg">
            {logs?.map((log, index) => (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                key={index}
                className="flex items-start gap-2"
              >
                <span className="text-purple-500 font-bold select-none">&gt;&gt;</span>
                <span className={log?.includes("[OK]") || log?.includes("[ACTIVE]") || log?.includes("[ESTABLISHED]") || log?.includes("GRANTED") ? "text-emerald-400" : log?.includes("INITIALIZING") ? "text-cyber-cyan font-semibold" : "text-purple-300"}>
                  {log}
                </span>
              </motion.div>
            ))}
            <div className="scanner-line h-[2px] opacity-10" />
          </div>

          {/* Bottom Progress HUD */}
          <div className="flex flex-col gap-4 border-t border-purple-500/20 pt-6">
            <div className="flex justify-between items-center text-xs text-cyber-cyan">
              <span className="font-semibold tracking-widest animate-pulse">
                {progress < 100 ? "DECRYPTING COMPILING..." : "DECRYPTION COMPLETE // LOAD_OK"}
              </span>
              <span className="font-mono">{progress}%</span>
            </div>
            {/* Outer Progress track */}
            <div className="h-2 w-full bg-purple-950/30 rounded-full overflow-hidden border border-purple-500/20 p-[1px]">
              <motion.div
                className="h-full bg-gradient-to-r from-cyber-purple via-cyber-violet to-cyber-cyan rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] text-purple-400/40 font-mono">
              <span>MEM_ALLOC: 4.88GB / 8.00GB</span>
              <span>NODE_ADDR: 192.168.83.9</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
