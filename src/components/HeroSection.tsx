/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Sparkles, Cpu, Shield, ArrowUpRight, Radio, Activity } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeroSectionProps {
  onNavigateToService: (category: string) => void;
  onOpenUpgradeModal: () => void;
}

export default function HeroSection({ onNavigateToService, onOpenUpgradeModal }: HeroSectionProps) {
  const [metrics, setMetrics] = useState({ cpu: 32.4, memory: 48.1, bandwidth: 882 });
  const [activeTab, setActiveTab] = useState<"system" | "nodes">("system");
  const [logs, setLogs] = useState<string[]>([
    "NEXORA-OS [v12.4.9] loaded",
    "Initializing cognitive neural pipelines...",
    "Global cluster [94 nodes] connected cleanly",
    "Ready for instruction"
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time metric updates
      setMetrics((prev) => ({
        cpu: +(prev.cpu + (Math.random() * 4 - 2)).toFixed(1),
        memory: +(prev.memory + (Math.random() * 2 - 1)).toFixed(1),
        bandwidth: Math.floor(prev.bandwidth + (Math.random() * 20 - 10))
      }));

      // Add random logs occasionally
      if (Math.random() > 0.7) {
        const ops = [
          "Allocating cognitive thread 0xF81C",
          "Synchronized metadata schemas",
          "Synthesizing high CTR marketing hooks",
          "Flushing neural memory registers",
          "Completed Imagen model pre-bake",
          "Encrypted user wallet payload"
        ];
        const randomOp = ops[Math.floor(Math.random() * ops.length)];
        setLogs((prev) => [...prev.slice(-3), `[${new Date().toLocaleTimeString()}] ${randomOp}`]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center pt-24 pb-16 px-4 md:px-8 overflow-hidden bg-[#050510]">
      {/* Absolute background visual glows from Immersive UI */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#8B5CF6] opacity-20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#06B6D4] opacity-20 blur-[120px] rounded-full"></div>
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-[#EC4899] opacity-10 blur-[100px] rounded-full"></div>
      </div>

      {/* Futuristic Grid Background overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-60" />

      {/* Futuristic Floating Particles / Cyber Badge */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-10 flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-6 shadow-[0_0_15px_rgba(139,92,246,0.1)] pointer-events-auto"
      >
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
        </span>
        <span className="text-[10px] uppercase font-mono font-bold tracking-[0.2em] text-slate-300">
          NEXORA v2.5 Online • Live Cognitive Systems
        </span>
      </motion.div>

      {/* Main Headline Group */}
      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
        <motion.h4 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-cyan-400 text-xs font-black uppercase tracking-[0.3em]"
        >
          The Digital Super-App
        </motion.h4>
        
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl font-sans font-black tracking-tight text-white leading-[1.05] mb-6"
        >
          One platform.<br />
          <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(139,92,246,0.25)]">
            Unlimited digital power.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-slate-400 max-w-xl mx-auto text-base sm:text-lg leading-relaxed mb-8 font-light"
        >
          Nexora combines AI automation, high-frequency social reach, and secure business management into a single immersive interface.
        </motion.p>

        {/* CTA Button Group */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center p-2 z-20"
        >
          <button
            onClick={onOpenUpgradeModal}
            className="group relative px-8 py-4 w-full sm:w-auto rounded-2xl font-bold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer text-sm"
          >
            <div className="absolute inset-0 w-full h-full rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center justify-center gap-2">
              Launch Premium Orbit <Sparkles className="h-4.5 w-4.5" />
            </span>
          </button>

          <button
            onClick={() => onNavigateToService("text")}
            className="group px-8 py-4 w-full sm:w-auto rounded-2xl font-bold text-slate-300 hover:text-white border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            Launch Neural Core <ArrowUpRight className="h-4.5 w-4.5 text-gray-400 group-hover:text-purple-400 transition-colors" />
          </button>
        </motion.div>
      </div>

      {/* Interactive Cyber Dashboard Preview Card - Styled as Immersive UI Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5 }}
        className="w-full max-w-5xl mt-16 z-20 rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row h-auto md:h-[380px]"
      >
        {/* Left Interactive panel (Metrics & Logs) */}
        <div className="flex-1 p-8 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-cyan-400" />
                <span className="text-xs uppercase font-mono tracking-widest text-slate-400 font-bold">
                  Sandbox System Cores
                </span>
              </div>
              <div className="flex h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>

            {/* Metrics List */}
            <div className="grid grid-cols-3 gap-3 mb-6 bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">CPU Load</span>
                <span className="text-lg font-mono text-purple-400 font-bold">{metrics.cpu}%</span>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 transition-all duration-300" style={{ width: `${metrics.cpu}%` }} />
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Memory</span>
                <span className="text-lg font-mono text-pink-400 font-bold">{metrics.memory}%</span>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-pink-500 transition-all duration-300" style={{ width: `${metrics.memory}%` }} />
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Inbound</span>
                <span className="text-lg font-mono text-cyan-400 font-bold">{metrics.bandwidth} MB/s</span>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 transition-all duration-300" style={{ width: `${Math.min(100, metrics.bandwidth / 10)}%` }} />
                </div>
              </div>
            </div>

            {/* Simulated Live System Logs */}
            <div className="space-y-1.5 bg-black/40 rounded-2xl p-4 border border-white/5 min-h-[110px] flex flex-col justify-end font-mono text-[11px]">
              {logs.map((log, index) => (
                <div key={index} className={`flex items-start gap-1.5 ${index === logs.length - 1 ? 'text-purple-300 font-semibold' : 'text-slate-500'}`}>
                  <span className="text-purple-500 select-none">&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-slate-500 pt-3 border-t border-white/10">
            <span>Cluster Security: AES-256</span>
            <span className="text-emerald-400">● Core-Stack fully synced</span>
          </div>
        </div>

        {/* Right Panel (Simulated Platform Layout UI) */}
        <div className="w-full md:w-5/12 bg-black/25 p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500/80" />
              <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
              <span className="w-2 h-2 rounded-full bg-green-500/80" />
              <span className="text-[10px] font-mono text-slate-500 ml-2">preview://nexora.dashboard</span>
            </div>

            <div className="space-y-3 pt-2">
              <div className="h-9 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between px-3">
                <span className="text-xs text-purple-300 font-mono">Workspace Orbit Alpha</span>
                <span className="text-[10px] bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full font-mono">STABLE</span>
              </div>

              {/* Grid block mockups */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-1">
                  <span className="text-[10px] text-slate-400 block uppercase font-mono tracking-wider">Creator Earnings</span>
                  <span className="text-md font-semibold text-white font-mono">$14,230.12</span>
                  <span className="text-[9px] text-emerald-400 font-mono">+12% this cycle</span>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-1">
                  <span className="text-[10px] text-slate-400 block uppercase font-mono tracking-wider">AI Token Usage</span>
                  <span className="text-md font-semibold text-white font-mono">412,904,181</span>
                  <span className="text-[9px] text-purple-400 font-mono">Unlimited Tier</span>
                </div>
              </div>

              {/* Dynamic Progress Indicator / Graph preview */}
              <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-pink-400 uppercase font-mono tracking-widest block font-bold">Activating Node Core</span>
                  <span className="text-xs text-slate-400">Marketing campaign ready.</span>
                </div>
                <button 
                  onClick={() => onNavigateToService("marketing")}
                  className="px-4 py-1.5 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-[10px] font-mono font-bold transition-all cursor-pointer shadow-lg shadow-pink-500/20"
                >
                  RUN
                </button>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-slate-500 font-mono mt-4 text-center border-t border-white/10 pt-3 flex justify-between">
            <span>Powered by Gemini 3.5</span>
            <span>Secure SSL Tunnel</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
