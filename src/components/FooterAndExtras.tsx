/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  ChevronLeft, ChevronRight, Apple, Play, Cpu, 
  Github, Twitter, Shield, Heart, HelpCircle 
} from "lucide-react";
import { TESTIMONIES_LIST } from "../data";

export default function FooterAndExtras() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextTestimony = () => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIES_LIST.length);
  };

  const prevTestimony = () => {
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIES_LIST.length) % TESTIMONIES_LIST.length);
  };

  const currentT = TESTIMONIES_LIST[activeTestimonial];

  return (
    <div className="bg-[#020206] relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />

      {/* Testimonials section */}
      <section id="testimonials" className="py-20 px-4 md:px-8 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <span className="text-xs uppercase font-mono tracking-widest text-[#a78bfa] font-bold bg-[#a78bfa]/10 px-3.5 py-1 rounded-full border border-purple-500/20">
            Consumer Endorsement
          </span>
          <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-white">
            Endorsed by Enterprise{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Architects
            </span>
          </h2>
        </div>

        {/* Testimonials Glass Carousel Card */}
        <div className="relative max-w-4xl mx-auto p-8 md:p-12 rounded-3xl border border-white/5 bg-[#04040e]/40 backdrop-blur-3xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col items-center text-center space-y-6">
          {/* Glowing backdrops */}
          <div 
            className="absolute -inset-0.5 rounded-3xl transition-colors duration-500 pointer-events-none opacity-20 blur-md"
            style={{ backgroundColor: currentT.glow }}
          />

          <p className="text-md md:text-lg text-gray-300 font-light leading-relaxed max-w-2xl italic">
            "{currentT.quote}"
          </p>

          <div className="flex flex-col items-center space-y-2">
            <img 
              src={currentT.avatar} 
              alt={currentT.author} 
              className="w-14 h-14 rounded-full border border-pink-500/30 object-cover shadow-[0_0_15px_rgba(236,72,153,0.15)]" 
              referrerPolicy="no-referrer"
            />
            <div>
              <h4 className="text-sm font-bold text-white leading-none">{currentT.author}</h4>
              <span className="text-[10px] text-gray-500 font-mono block pt-1 uppercase tracking-wider">
                {currentT.role} • {currentT.company}
              </span>
            </div>
          </div>

          {/* Carousel Arrows controls */}
          <div className="absolute top-1/2 -translate-y-1/2 inset-x-4 flex justify-between select-none pointer-events-none">
            <button
              onClick={prevTestimony}
              className="p-2 rounded-xl bg-black/40 border border-white/5 hover:border-white/10 text-gray-400 hover:text-white transition-all pointer-events-auto cursor-pointer shadow-lg"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextTestimony}
              className="p-2 rounded-xl bg-black/40 border border-white/5 hover:border-white/10 text-gray-400 hover:text-white transition-all pointer-events-auto cursor-pointer shadow-lg"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Mobile App Download preview with Phone Mockup */}
      <section id="mobile-app" className="py-20 px-4 md:px-8 border-t border-white/5 bg-[#03030c] relative overflow-hidden">
        <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full bg-cyan-600/5 blur-[120px] pointer-events-none animate-pulse" />
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left instructions - 6 columns */}
          <div className="lg:col-span-6 text-left space-y-6">
            <span className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-bold bg-cyan-400/10 px-3.5 py-1 rounded-full border border-cyan-400/20 w-max block">
              Omnipresent Computing
            </span>
            <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-white leading-tight">
              Bring Nexora to Your{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Active Devices
              </span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed">
              Carry quantum synthesis modules in your pocket, with optimized cellular caching schemas and live ad telemetry alerts. Run calculations, access the sandbox editor, and check marketplace downloads seamlessly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 select-none pt-2 font-mono">
              <button 
                onClick={() => alert("Simulated Apple App Store download initialized under sandbox registration ID.")}
                className="flex items-center justify-center gap-3 px-5 py-3 rounded-xl bg-white text-black hover:bg-gray-100 transition-colors font-bold text-xs uppercase cursor-pointer shadow-lg"
              >
                <Apple className="h-5 w-5 fill-current" /> Download Apple iOS
              </button>
              <button 
                onClick={() => alert("Simulated Google Play Store download initialized under sandbox registration ID.")}
                className="flex items-center justify-center gap-3 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors font-bold text-xs uppercase cursor-pointer"
              >
                <Play className="h-4.5 w-4.5 text-cyan-400" /> Download Google Play
              </button>
            </div>
          </div>

          {/* Right Smartphone mockup - 6 columns */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-[280px] h-[480px] rounded-[36px] border-[6px] border-neutral-800 bg-[#020202] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.15)] relative">
              
              {/* Phone ear-piece notch */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-[#08080a] rounded-full z-40 border border-white/5" />
              
              {/* App active screen preview */}
              <div className="absolute inset-0 z-15 flex flex-col justify-between p-5 pt-8 bg-[#04040e]">
                
                {/* Header mock */}
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <span className="text-[10px] font-mono text-cyan-400 font-bold tracking-widest uppercase">NEXORA PRO</span>
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                {/* Simulated Chart visual */}
                <div className="space-y-2 py-3 text-left">
                  <span className="text-[8px] text-gray-500 font-mono block">LIVE COGNITIVE NODE MONITOR</span>
                  <div className="h-20 bg-neutral-950/80 rounded-lg border border-white/5 p-2 flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] text-[#e11d48] font-mono">Thread 0xF4</span>
                      <span className="text-[9px] text-emerald-400 font-mono">SYNCED</span>
                    </div>
                    {/* Tiny visual SVG graph lines */}
                    <svg className="w-full h-8" viewBox="0 0 100 20">
                      <polyline fill="none" stroke="#06b6d4" strokeWidth="1" points="0,15 20,8 40,18 60,10 80,4 100,12" />
                    </svg>
                  </div>
                </div>

                {/* Cards mockup block */}
                <div className="space-y-2">
                  <div className="p-2.5 bg-neutral-950/50 border border-white/5 rounded-lg text-left flex justify-between items-center">
                    <div>
                      <span className="text-[8px] text-gray-500 block">TOTAL PAYOUTS</span>
                      <span className="text-xs text-white font-mono font-bold">$4,831.20</span>
                    </div>
                    <span className="text-[8px] bg-emerald-500/10 text-emerald-400 px-1.5 rounded font-mono font-bold leading-none py-0.5">OK</span>
                  </div>

                  <div className="p-2.5 bg-[#cb0c59]/10 border border-[#cb0c59]/20 rounded-lg text-left flex justify-between items-center">
                    <div>
                      <span className="text-[8px] text-pink-400 block font-semibold leading-none">LAUNCH CAMPAIGN</span>
                      <span className="text-[9px] text-gray-400 leading-none">Spawning Solaria ad.</span>
                    </div>
                  </div>
                </div>

                {/* Footer buttons of mock app */}
                <div className="flex justify-between items-center text-[8px] font-mono border-t border-white/5 pt-2 text-gray-500">
                  <span className="text-cyan-400">Workspace</span>
                  <span>Store</span>
                  <span>Dashboard</span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Primary Nexora Footer links/legal */}
      <footer className="bg-[#010103] border-t border-white/5 py-12 px-4 md:px-8 relative z-25 text-left font-sans">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Column 1 - Brand description */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-mono font-bold text-xs shadow-[0_0_10px_rgba(139,92,246,0.3)]">
                NX
              </div>
              <span className="text-md font-sans font-black tracking-wide text-white uppercase">
                Nexora
              </span>
            </div>
            <p className="text-xs text-gray-500 font-light leading-relaxed max-w-sm">
              Consolidate writing platforms, imagery engines, mobile-first feeds, ad bidding systems, and marketplace downloads into a unified, cybernetic premium dark space. Secure SSL pipelines guaranteed.
            </p>
            <div className="flex gap-4 select-none pt-2">
              <a href="#twitter" className="text-gray-500 hover:text-purple-400 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#github" className="text-gray-500 hover:text-pink-400 transition-colors">
                <Github className="h-4 w-4" />
              </a>
              <a href="#security" className="text-gray-500 hover:text-cyan-400 transition-colors">
                <Shield className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2 - Products */}
          <div className="space-y-3">
            <h5 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
              Core Systems
            </h5>
            <div className="space-y-2 text-xs">
              <a href="#ai-playground" className="text-gray-500 hover:text-white transition-colors block">AI Content Generator</a>
              <a href="#ai-playground" className="text-gray-500 hover:text-white transition-colors block">Neural Image Synth</a>
              <a href="#trending-hub" className="text-gray-500 hover:text-white transition-colors block">Content Ledger Hub</a>
              <a href="#creator-ecosystem" className="text-gray-500 hover:text-white transition-colors block">Creator Studios</a>
            </div>
          </div>

          {/* Column 3 - Resources */}
          <div className="space-y-3">
            <h5 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
              Resources
            </h5>
            <div className="space-y-2 text-xs">
              <a href="#digital-marketplace" className="text-gray-500 hover:text-white transition-colors block">Digital Templates</a>
              <a href="#digital-marketplace" className="text-gray-500 hover:text-white transition-colors block">Themes & Plugins</a>
              <a href="#business-promotions" className="text-gray-500 hover:text-white transition-colors block">Squeeze CTR metrics</a>
              <a href="#premium-pricing" className="text-gray-500 hover:text-white transition-colors block">Subscription Plans</a>
            </div>
          </div>

          {/* Column 4 - Legal */}
          <div className="space-y-3">
            <h5 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
              Platform Registry
            </h5>
            <div className="space-y-2 text-xs">
              <span className="text-gray-500 block cursor-default">Developer API Docs</span>
              <span className="text-gray-500 block cursor-default">Security whitepaper</span>
              <span className="text-gray-500 block cursor-default">Terms of Synapses</span>
              <span className="text-gray-500 block cursor-default">Privacy Protocol</span>
            </div>
          </div>

        </div>

        {/* Closing copyright row */}
        <div className="max-w-6xl mx-auto pt-8 mt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-gray-600 gap-4">
          <span>© 2026 Nexora DSP Startup. Synthesized securely.</span>
          <span className="flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-pink-500 animate-pulse fill-pink-500" /> for cyber designers. Version 12.4.9
          </span>
        </div>
      </footer>
    </div>
  );
}
