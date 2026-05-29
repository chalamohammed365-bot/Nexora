/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  FileText, Image as ImageIcon, Play, Search, Sparkles, Code, 
  Cpu, RotateCw, Copy, Check, ExternalLink, Zap 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AI_SERVICES_LIST } from "../data";

interface AIToolsPlaygroundProps {
  initialActiveServiceId?: string;
}

export default function AIToolsPlayground({ initialActiveServiceId }: AIToolsPlaygroundProps) {
  const [activeTool, setActiveTool] = useState(initialActiveServiceId || "text");
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resultText, setResultText] = useState("");
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [resultDetails, setResultDetails] = useState<any>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [source, setSource] = useState("");

  useEffect(() => {
    if (initialActiveServiceId) {
      setActiveTool(initialActiveServiceId);
      // Prepopulate placeholder prompt based on selected tool
      prepopulatePrompt(initialActiveServiceId);
    }
  }, [initialActiveServiceId]);

  const prepopulatePrompt = (tool: string) => {
    switch (tool) {
      case "text":
        setPrompt("Write a 3-sentence summary about organic transistors in molecular processors.");
        break;
      case "image":
        setPrompt("Cyberpunk glowing alleyway in dense Tokyo, volumetric pink dust, photorealistic 8k");
        break;
      case "video":
        setPrompt("A neon liquid wave of glowing cyan gravity fluids folding over absolute black space");
        break;
      case "seo":
        setPrompt("Next-gen quantum browser extension for developer caching");
        break;
      case "marketing":
        setPrompt("Launch headline for Nexora - a futuristic premium all-in-one digital platform");
        break;
      case "code":
        setPrompt("Write a TypeScript interface and initializer function for secure user wallet caches");
        break;
      default:
        setPrompt("");
    }
    setResultText("");
    setResultImage(null);
    setResultDetails(null);
  };

  const handleToolChange = (toolId: string) => {
    setActiveTool(toolId);
    prepopulatePrompt(toolId);
  };

  const handleSynthesize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setResultText("");
    setResultImage(null);
    setResultDetails(null);
    setIsCopied(false);

    try {
      if (activeTool === "image") {
        // Call the image prompt expanded router
        const response = await fetch("/api/gemini/generate-image-prompts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });
        const data = await response.json();
        
        if (data.success) {
          setResultImage(data.imageUrl);
          setResultText(data.expandedPrompt);
          setResultDetails({
            specs: data.specs,
            author: data.author
          });
          setSource(data.source || "Nexora Imaging Grid");
        } else {
          setResultText("An error occurred while rendering the imagery.");
        }
      } else {
        // Standard text, seo, marketing, code synthesizer
        const response = await fetch("/api/gemini/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            prompt, 
            toolType: `${activeTool}-generator` 
          }),
        });
        const data = await response.json();

        if (data.success) {
          setResultText(data.result);
          setSource(data.source || "Gemini 3.5 Core Neural Cores");
        } else {
          setResultText("An error occurred during pipeline generation.");
        }
      }
    } catch (err) {
      console.error("Synthesis failed:", err);
      setResultText("Offline backup systems failed to transcribe. Ensure server VM port 3000 is running correctly.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!resultText) return;
    navigator.clipboard.writeText(resultText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const getIcon = (name: string) => {
    switch (name) {
      case "FileText": return <FileText className="h-5 w-5" />;
      case "Image": return <ImageIcon className="h-5 w-5" />;
      case "Play": return <Play className="h-5 w-5" />;
      case "Search": return <Search className="h-5 w-5" />;
      case "Sparkles": return <Sparkles className="h-5 w-5" />;
      case "Code": return <Code className="h-5 w-5" />;
      default: return <Cpu className="h-5 w-5" />;
    }
  };

  const activeService = AI_SERVICES_LIST.find(s => s.id === activeTool) || AI_SERVICES_LIST[0];

  return (
    <section id="ai-playground" className="py-24 px-4 md:px-8 bg-[#050510] relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Cpu className="h-4.5 w-4.5 text-cyan-400 animate-spin" />
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-cyan-400 font-bold bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/20">
              Interactive Neural Playground
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white">
            Unleash High-Throughput<br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Synthetics
            </span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base font-light">
            Connect directly with Nexora's Gemini Pro co-processors. Select an intelligent node tool below to design layouts, optimize tags, or compile code.
          </p>
        </div>

        {/* Services / Tools Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Tool selectors - 4/12 columns */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-500 block pl-1">
              Cognitive Node Services
            </span>
            <div className="space-y-3">
              {AI_SERVICES_LIST.map((service) => {
                const isActive = activeTool === service.id;
                return (
                  <button
                    key={service.id}
                    onClick={() => handleToolChange(service.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 relative group cursor-pointer ${
                      isActive 
                        ? `bg-white/10 border-white/20 shadow-lg ${service.glowColor || 'shadow-purple-500/10'}` 
                        : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
                    }`}
                  >
                    <div className={`p-3 rounded-xl border bg-black/40 ${
                      isActive ? "border-purple-500/30 text-purple-400" : "border-white/5 text-slate-450 group-hover:text-white"
                    }`}>
                      {getIcon(service.iconName)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                          {service.name}
                        </span>
                        {isActive && <Zap className="h-3 w-3 text-purple-400 animate-pulse" />}
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono uppercase block tracking-widest">
                        {service.tagline}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Prompt workspace and output pane - 8/12 columns */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Active Service summary banner */}
            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block">
                  Active Co-Processor Configured
                </span>
                <span className="text-md font-bold text-white block">
                  {activeService.name} — Gemini 3.5 Flash Model
                </span>
                <p className="text-xs text-slate-400 leading-relaxed font-light">{activeService.description}</p>
              </div>
            </div>

            {/* Input Workspace */}
            <form onSubmit={handleSynthesize} className="space-y-4">
              <div className="relative rounded-[24px] border border-white/10 bg-[#050512] p-5 shadow-20 flex flex-col focus-within:border-cyan-500/40 transition-colors">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full min-h-[90px] max-h-[160px] bg-transparent text-sm text-white placeholder-slate-600 focus:outline-none resize-none font-sans"
                  placeholder="Enter details, code specs, copy target, or structural topics..."
                />
                
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between pt-4 border-t border-white/10 mt-2">
                  <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    State: {isLoading ? "COMPILING CHANNELS..." : "SYNTHESIS READY"}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !prompt.trim()}
                    className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-bold text-xs font-mono uppercase text-white shadow-lg shadow-purple-500/10 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      isLoading || !prompt.trim()
                        ? "bg-white/5 text-slate-600 border border-white/5 cursor-not-allowed shadow-none"
                        : "bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:shadow-purple-500/30"
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <RotateCw className="h-3.5 w-3.5 animate-spin" />
                        Translating...
                      </>
                    ) : (
                      <>
                        Synthesize Now <Sparkles className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>

            {/* Response Console Card */}
            <div className="min-h-[220px] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden flex flex-col justify-between shadow-20">
              
              {/* Output pane Header */}
              <div className="bg-white/5 px-5 py-4 border-b border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-mono text-slate-400">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-405 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Console Out • {isLoading ? "RUNNING PIPELINE" : "TRANSCRIPT SYNCED"}
                </div>
                
                {resultText && (
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer font-mono text-[10px]"
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Copy Workspace
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Console Body Output */}
              <div className="p-6 flex-1 flex flex-col justify-center font-sans text-sm text-gray-300 leading-relaxed overflow-y-auto max-h-[350px]">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center space-y-4 py-8">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full border border-purple-500/20" />
                      <div className="absolute inset-0 w-12 h-12 rounded-full border-t-2 border-purple-500 border-r-2 border-transparent animate-spin" />
                    </div>
                    <div className="text-center space-y-1">
                      <p className="text-xs uppercase font-mono tracking-widest text-purple-400 font-semibold animate-pulse">
                        Querying Quantum Co-Processor
                      </p>
                      <p className="text-[10px] text-gray-500 font-mono">
                        Resolving relative dependencies via standard SSL layers...
                      </p>
                    </div>
                  </div>
                ) : resultText || resultImage ? (
                  <div className="space-y-4 animate-fadeIn">
                    
                    {/* Render Image UI if generating in imagery tool */}
                    {resultImage && (
                      <div className="flex flex-col md:flex-row gap-6 p-4 rounded-xl border border-pink-500/20 bg-pink-950/5 items-center">
                        <div className="relative rounded-lg overflow-hidden border border-pink-500/30 group shadow-[0_0_30px_rgba(236,72,153,0.15)] flex-shrink-0">
                          <img 
                            src={resultImage} 
                            alt="Generated content" 
                            className="w-full md:w-[240px] h-[190px] object-cover group-hover:scale-105 transition-transform duration-500" 
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-md p-1 px-2.5 rounded font-mono text-[9px] text-pink-400 tracking-wider">
                            ACTIVE GENERATED
                          </div>
                        </div>
                        <div className="space-y-3 flex-1 text-left">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-pink-400 block uppercase tracking-wider font-bold">
                              Expanded Prompt Engineering Description
                            </span>
                            <p className="text-xs text-gray-400 italic">"{resultText}"</p>
                          </div>
                          
                          {resultDetails && (
                            <div className="grid grid-cols-2 gap-3 text-[11px] font-mono border-t border-white/5 pt-3">
                              <div>
                                <span className="text-gray-500 block">Render System</span>
                                <span className="text-white font-semibold">{resultDetails.author}</span>
                              </div>
                              <div>
                                <span className="text-gray-500 block">Output Specifications</span>
                                <span className="text-white font-semibold">{resultDetails.specs}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Standard text results */}
                    {!resultImage && (
                      <div className="whitespace-pre-line font-light text-gray-300 md:text-sm text-xs selection:bg-purple-500/30">
                        {resultText}
                      </div>
                    )}

                  </div>
                ) : (
                  <div className="text-center py-10 space-y-2">
                    <Cpu className="h-8 w-8 text-white/10 mx-auto animate-pulse" />
                    <p className="text-xs font-mono font-bold text-gray-600 uppercase tracking-widest">
                      Systems Standby
                    </p>
                    <p className="text-xs text-gray-500 max-w-sm mx-auto">
                      Provide a prompt query inside the synthesizer console above and initialize a synthesis packet.
                    </p>
                  </div>
                )}
              </div>

              {/* Console Footer */}
              {(resultText || resultImage) && !isLoading && (
                <div className="bg-white/2 px-4 py-2 border-t border-white/5 flex flex-col sm:flex-row justify-between text-[11px] font-mono text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Neural Sync: {source}
                  </div>
                  <span className="text-right">Decoded securely • Latency ~240ms</span>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
