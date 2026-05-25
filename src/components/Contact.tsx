"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, AlertTriangle, Terminal } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");
  const [activeLogs, setActiveLogs] = useState<string[]>([]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const transmitLogs = async () => {
    const logs = [
      "ESTABLISHING SECURE GATEWAY ROUTE...",
      "RESOLVING TARGET: adithya.j.dev@gmail.com",
      "COMPILING PACKET METADATA...",
      "ATTEMPTING ENCRYPTED TRANSMISSION...",
    ];

    for (let i = 0; i < logs.length; i++) {
      setActiveLogs((prev) => [...prev, logs[i]]);
      await new Promise((resolve) => setTimeout(resolve, 350));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setActiveLogs([]);

    // Run terminal simulation lines
    await transmitLogs();

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      subject: form.subject,
      message: form.message,
      to_email: "adithya.j.dev@gmail.com",
    };

    // If EmailJS credentials are not present, do a mock simulation for local demonstration
    if (!serviceId || !templateId || !publicKey) {
      setTimeout(() => {
        setLoading(false);
        setStatus("success");
        setStatusMsg("TRANS_OK: Message routed successfully via Local Mock Endpoint.");
        setActiveLogs((prev) => [...prev, "TRANSMISSION SUCCESSFUL // STATUS_CODE_200"]);
        setForm({ name: "", email: "", subject: "", message: "" });
        console.log("EmailJS Mock Dispatch Success! Content:", templateParams);
        console.log("Tip: Define NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in env variables for production.");
      }, 1000);
      return;
    }

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setLoading(false);
      setStatus("success");
      setStatusMsg("TRANS_OK: Query dispatched successfully to Adithya's terminal.");
      setActiveLogs((prev) => [...prev, "TRANSMISSION SUCCESSFUL // STATUS_CODE_200"]);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      setLoading(false);
      setStatus("error");
      setStatusMsg(`TRANS_ERR: Link breakdown. ${err?.text || "Unknown Socket Error"}`);
      setActiveLogs((prev) => [...prev, "TRANSMISSION TERMINATED // SOC_ERR_503"]);
    }
  };

  return (
    <section id="contact" className="py-24 relative select-none">
      <div className="absolute inset-0 bg-dot-cyber opacity-15 pointer-events-none" />

      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-[1px] w-8 bg-cyber-cyan" />
            <span className="font-mono text-[10px] uppercase text-cyber-cyan tracking-[0.3em] font-bold">TERMINAL.CONNECT()</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-wider uppercase text-white">
            Secure <span className="bg-gradient-to-r from-cyber-cyan to-cyber-purple bg-clip-text text-transparent">Channel</span>
          </h2>
        </div>

        {/* Outer Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left panel: Info Coordinates */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div className="glass-card p-6 sm:p-8 rounded-lg flex-1 flex flex-col justify-between">
              
              <div>
                <div className="flex items-center gap-2 mb-6 border-b border-purple-500/10 pb-4">
                  <Terminal className="h-4.5 w-4.5 text-cyber-cyan" />
                  <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                    TARGET_COORDINATES // OS
                  </span>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed mb-8">
                  Initiate a secure session node. Transmit inquiries, collaborations, or cloud configuration tasks directly to Adithya's personal system.
                </p>

                {/* Details list */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3.5 bg-purple-950/20 border border-purple-500/10 rounded-md text-cyber-cyan shrink-0 animate-pulse">
                      <Mail className="h-7 w-7" />
                    </div>
                    <div>
                      <h4 className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 mb-0.5">Secure Mail</h4>
                      <a href="mailto:adithya.j.dev@gmail.com" className="text-xs font-mono font-bold text-white hover:text-cyber-cyan transition-colors">
                        adithya.j.dev@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3.5 bg-purple-950/20 border border-purple-500/10 rounded-md text-cyber-cyan shrink-0">
                      <Phone className="h-7 w-7" />
                    </div>
                    <div>
                      <h4 className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 mb-0.5">Comms Line</h4>
                      <a href="tel:+919961920173" className="text-xs font-mono font-bold text-white hover:text-cyber-cyan transition-colors">
                        +91 9961920173
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3.5 bg-purple-950/20 border border-purple-500/10 rounded-md text-cyber-cyan shrink-0">
                      <MapPin className="h-7 w-7" />
                    </div>
                    <div>
                      <h4 className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 mb-0.5">Location Core</h4>
                      <span className="text-xs font-mono font-bold text-white">
                        Kochi, Kerala, India
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom PR Credentials */}
              <div className="border-t border-purple-500/10 pt-6 mt-8">
                <div className="font-mono text-[9px] uppercase text-zinc-500 leading-snug mb-4">
                  <span className="text-cyber-purple font-bold block mb-1">PGP_SIGNATURE</span>
                  MD5_HASH: F58D 9C24 07E4 B221 A599
                </div>

                 <div className="flex gap-4">
                  <a
                    href="https://github.com/Adithya-J05"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 font-mono text-xs bg-purple-950/20 border border-purple-500/10 text-purple-300 hover:text-white hover:border-cyber-cyan hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] px-4.5 py-2.5 rounded transition-all duration-300 hover:scale-105"
                  >
                    <FaGithub className="h-6 w-6" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/adithya-j25aug2005/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 font-mono text-xs bg-purple-950/20 border border-purple-500/10 text-purple-300 hover:text-white hover:border-cyber-purple hover:shadow-[0_0_20px_rgba(188,52,250,0.5)] px-4.5 py-2.5 rounded transition-all duration-300 hover:scale-105"
                  >
                    <FaLinkedin className="h-6 w-6" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right panel: Live Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className="glass-card p-6 sm:p-8 rounded-lg relative flex flex-col h-full justify-between">
              
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Form fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] uppercase text-zinc-400 font-bold tracking-wider">
                      Caller_Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleInput}
                      placeholder="e.g. John Doe"
                      className="bg-purple-950/10 border border-purple-500/15 focus:border-cyber-cyan focus:shadow-[0_0_10px_rgba(6,182,212,0.2)] rounded px-4 py-2.5 font-mono text-xs text-white outline-none transition-all placeholder-zinc-600"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] uppercase text-zinc-400 font-bold tracking-wider">
                      Comms_Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleInput}
                      placeholder="e.g. caller@domain.com"
                      className="bg-purple-950/10 border border-purple-500/15 focus:border-cyber-cyan focus:shadow-[0_0_10px_rgba(6,182,212,0.2)] rounded px-4 py-2.5 font-mono text-xs text-white outline-none transition-all placeholder-zinc-600"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] uppercase text-zinc-400 font-bold tracking-wider">
                    Query_Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleInput}
                    placeholder="e.g. Cloud System Orchestration Request"
                    className="bg-purple-950/10 border border-purple-500/15 focus:border-cyber-cyan focus:shadow-[0_0_10px_rgba(6,182,212,0.2)] rounded px-4 py-2.5 font-mono text-xs text-white outline-none transition-all placeholder-zinc-600"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] uppercase text-zinc-400 font-bold tracking-wider">
                    Payload_Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleInput}
                    placeholder="e.g. Details of technical collaboration..."
                    className="bg-purple-950/10 border border-purple-500/15 focus:border-cyber-cyan focus:shadow-[0_0_10px_rgba(6,182,212,0.2)] rounded px-4 py-2.5 font-mono text-xs text-white outline-none transition-all resize-none placeholder-zinc-600"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 font-mono text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-cyber-cyan to-cyber-purple hover:from-cyber-purple hover:to-cyber-cyan text-white rounded cursor-pointer transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:shadow-[0_0_20px_rgba(188,52,250,0.3)]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Transmitting_Packet...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Dispatch_Message()</span>
                    </>
                  )}
                </button>

              </form>

              {/* Transmission log visualizer */}
              {activeLogs && activeLogs.length > 0 && (
                <div className="mt-6 border border-purple-500/10 bg-purple-950/5 p-4 rounded-md font-mono text-[9px] space-y-1 select-none">
                  {activeLogs?.map((log, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-purple-300">
                      <span className="text-cyber-cyan font-bold">&gt;&gt;</span>
                      <span>{log}</span>
                    </div>
                  ))}
                  
                  {/* Status Banner */}
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-1.5 text-emerald-400 font-bold border-t border-emerald-500/10 pt-2 mt-2"
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      <span>{statusMsg}</span>
                    </motion.div>
                  )}

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-1.5 text-red-400 font-bold border-t border-red-500/10 pt-2 mt-2"
                    >
                      <AlertTriangle className="h-3 w-3" />
                      <span>{statusMsg}</span>
                    </motion.div>
                  )}
                </div>
              )}

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
