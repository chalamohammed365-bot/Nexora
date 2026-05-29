/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  TrendingUp, Users, CheckCircle2, MessageSquare, Heart, 
  Play, Pause, DollarSign, Award, ChevronRight, Share2 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Creator {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  followers: number;
  earnings: number;
  isVerified: boolean;
  activeVideo: {
    title: string;
    views: string;
    likes: string;
    comments: string;
    imageUrl: string;
  };
}

const CREATORS_BLUEPRINT: Creator[] = [
  {
    id: "c-1",
    name: "Elysia Mercer",
    handle: "@elysia_quantum",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
    followers: 124500,
    earnings: 45800,
    isVerified: true,
    activeVideo: {
      title: "Synthesizing full molecular chips inside Express backends 🧪 #quantum",
      views: "1.2M",
      likes: "142K",
      comments: "1.4K",
      imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400"
    }
  },
  {
    id: "c-2",
    name: "Zenith Core",
    handle: "@zenith_ui",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
    followers: 89400,
    earnings: 28900,
    isVerified: true,
    activeVideo: {
      title: "Why modern flat software styling is clinically dead. Neon manifesto 🎨 #ux",
      views: "840K",
      likes: "95K",
      comments: "620",
      imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400"
    }
  },
  {
    id: "c-3",
    name: "Astra Vance",
    handle: "@astra_v",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150",
    followers: 43100,
    earnings: 12400,
    isVerified: false,
    activeVideo: {
      title: "How we setup automated ad bidding for Solaria Cyber Armor 🔒 #growth",
      views: "420K",
      likes: "31K",
      comments: "280",
      imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400"
    }
  }
];

export default function CreatorEcosystem() {
  const [creators, setCreators] = useState<Creator[]>(CREATORS_BLUEPRINT);
  const [selectedCreatorId, setSelectedCreatorId] = useState("c-1");
  const [isPlaying, setIsPlaying] = useState(false);
  const [followedState, setFollowedState] = useState<{ [key: string]: boolean }>({});
  
  // Earnings Sandbox state
  const [viewsGoal, setViewsGoal] = useState(250000); // Slider input
  const [premiumConversion, setPremiumConversion] = useState(2.5); // Slider percentage

  const selectedCreator = creators.find(c => c.id === selectedCreatorId) || creators[0];

  const toggleFollow = (creatorId: string) => {
    setFollowedState(prev => {
      const isFollowing = !prev[creatorId];
      // Update follower counters locally for fidelity
      setCreators(prevCreators => prevCreators.map(c => {
        if (c.id === creatorId) {
          return {
            ...c,
            followers: isFollowing ? c.followers + 1 : c.followers - 1
          };
        }
        return c;
      }));
      return { ...prev, [creatorId]: isFollowing };
    });
  };

  // Simulated earnings calculation
  const calculatedEarnings = Math.round((viewsGoal * 0.005) + (viewsGoal * (premiumConversion / 100) * 12));

  return (
    <section id="creator-ecosystem" className="py-24 px-4 md:px-8 bg-[#050510] relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent" />
      
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Award className="h-4.5 w-4.5 text-pink-400 animate-pulse" />
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-pink-400 font-bold bg-pink-500/10 px-4 py-1.5 rounded-full border border-pink-500/20">
              Creator Synthesis Network
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white font-sans">
            Distributed<br />
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              Creator Ecosystem
            </span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base font-light">
            Empower developers, writers, and digital artists. Monetize viral content instantly, seed follower bases, and track real computational rewards.
          </p>
        </div>

        {/* Main Grid: Profiles, Player & Earnings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Profiles and stats - 4/12 Columns */}
          <div className="lg:col-span-4 space-y-6">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-500 block pl-1">
              Node Core Citizens
            </span>
            
            {/* List of creators */}
            <div className="space-y-3">
              {creators.map((c) => {
                const isSelected = selectedCreatorId === c.id;
                const isFollowing = followedState[c.id];
                return (
                  <div
                    key={c.id}
                    onClick={() => {
                      setSelectedCreatorId(c.id);
                      setIsPlaying(false);
                    }}
                    className={`p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-3 relative cursor-pointer ${
                      isSelected 
                        ? "bg-white/10 border-white/20 shadow-lg" 
                        : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img 
                          src={c.avatar} 
                          alt={c.name} 
                          className={`w-11 h-11 rounded-full object-cover border-2 ${
                            isSelected ? "border-pink-500" : "border-white/10"
                          }`} 
                          referrerPolicy="no-referrer"
                        />
                        {c.isVerified && (
                          <div className="absolute -bottom-1 -right-1 bg-pink-500 rounded-full p-0.5 border border-black">
                            <CheckCircle2 className="h-2.5 w-2.5 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="space-y-0.5 text-left">
                        <span className="text-xs font-semibold text-white block">
                          {c.name}
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono block">
                          {c.handle}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFollow(c.id);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold tracking-wider transition-colors cursor-pointer ${
                        isFollowing 
                          ? "bg-gray-800 text-gray-400 border border-white/5" 
                          : "bg-pink-500 text-white hover:bg-pink-600 shadow-[0_0_10px_rgba(236,72,153,0.3)]"
                      }`}
                    >
                      {isFollowing ? "FOLLOWING" : "FOLLOW"}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Selected Creator Details readout */}
            <div className="p-4 rounded-xl border border-white/5 bg-white/1 backdrop-blur-xl space-y-4">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">
                Selected Creator Ledger
              </span>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-neutral-950 p-3 rounded-lg border border-white/5 text-left">
                  <span className="text-[9px] text-gray-500 font-mono block uppercase">Verified Followers</span>
                  <span className="text-base font-semibold text-white font-mono">
                    {selectedCreator.followers.toLocaleString()}
                  </span>
                </div>
                <div className="bg-neutral-950 p-3 rounded-lg border border-white/5 text-left">
                  <span className="text-[9px] text-pink-400 font-mono block uppercase">Estimated Revenue</span>
                  <span className="text-base font-semibold text-white font-mono flex items-center">
                    <DollarSign className="h-3.5 w-3.5 text-pink-500" />
                    {selectedCreator.earnings.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs py-2 border-t border-white/5 text-gray-400">
                <span>Computational Rank:</span>
                <span className="text-pink-400 font-mono font-semibold">Tier-1 Node Synthesizer</span>
              </div>
            </div>

          </div>

          {/* TikTok-style Short Video Feed Mockup - 4/12 Columns */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="w-full max-w-[310px] h-[520px] rounded-[34px] border-8 border-gray-900 bg-[#020202] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(236,72,153,0.1)] relative flex flex-col justify-between">
              
              {/* Phone Speaker bar */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-gray-950 rounded-full z-40 flex items-center justify-center border border-white/5">
                <div className="w-10 h-1 bg-gray-700 rounded-full" />
              </div>

              {/* Video Active Frame image */}
              <div className="absolute inset-0 z-10 select-none">
                <img 
                  src={selectedCreator.activeVideo.imageUrl} 
                  alt="active video" 
                  className="w-full h-full object-cover filter brightness-[0.7] scale-105 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Neon particle glows inside screen */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/40" />
              </div>

              {/* Action Sidebar controls */}
              <div className="absolute right-3.5 bottom-24 z-30 flex flex-col gap-5 items-center">
                <div className="relative group cursor-pointer">
                  <img 
                    src={selectedCreator.avatar} 
                    alt="avatar" 
                    className="w-10 h-10 rounded-full border-2 border-pink-500 object-cover" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-1 left-1.5 bg-pink-500 rounded-full p-0.5 text-[8px] font-mono text-white font-bold leading-none aspect-square flex items-center justify-center">
                    +
                  </div>
                </div>

                <button className="flex flex-col items-center gap-1 group cursor-pointer">
                  <div className="p-2.5 rounded-full bg-black/45 backdrop-blur-xl border border-white/10 group-hover:bg-red-500/20 group-hover:border-red-500/40 transition-all text-white group-hover:text-red-400">
                    <Heart className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] text-white font-mono font-medium">{selectedCreator.activeVideo.likes}</span>
                </button>

                <button className="flex flex-col items-center gap-1 group cursor-pointer">
                  <div className="p-2.5 rounded-full bg-black/45 backdrop-blur-xl border border-white/10 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/40 transition-all text-white group-hover:text-cyan-400">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] text-white font-mono font-medium">{selectedCreator.activeVideo.comments}</span>
                </button>

                <button className="flex flex-col items-center gap-1 group cursor-pointer hover:scale-105 transition-transform">
                  <div className="p-2.5 rounded-full bg-black/45 backdrop-blur-xl border border-white/10 text-white">
                    <Share2 className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono font-medium">Share</span>
                </button>
              </div>

              {/* Short static Video overlay content */}
              <div className="relative z-30 p-4 pt-10 text-xs font-mono text-gray-400 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
                <span className="text-[9px] tracking-widest text-pink-400 font-bold uppercase">NEXORA SOCIAL</span>
                <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded font-bold tracking-wider">LIVE REEL</span>
              </div>

              {/* Play Pause Trigger overlay */}
              <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-auto">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-5 rounded-full bg-black/50 border border-white/15 backdrop-blur-md text-white hover:scale-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)] cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6 text-pink-400 animate-pulse" />
                  ) : (
                    <Play className="h-6 w-6 text-white" />
                  )}
                </button>
              </div>

              {/* Video metrics and descriptions bottom */}
              <div className="relative z-30 p-4 space-y-2 bg-gradient-to-t from-black via-black/80 to-transparent text-left max-w-[230px]">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-white">{selectedCreator.handle}</span>
                  {selectedCreator.isVerified && <CheckCircle2 className="h-3 w-3 text-pink-400" />}
                </div>
                <p className="text-[10px] text-gray-200 line-clamp-3">
                  {selectedCreator.activeVideo.title}
                </p>
                <div className="flex items-center gap-2 text-[9px] text-gray-500 pt-1 font-mono">
                  <span>{selectedCreator.activeVideo.views} views</span>
                  <span>•</span>
                  <span className="text-pink-400 animate-pulse">Synced stream</span>
                </div>
              </div>

            </div>
          </div>

          {/* Monetization Calculator Box - 4/12 Columns */}
          <div className="lg:col-span-4 space-y-6">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 block">
              Attention Monetization Simulator
            </span>

            <div className="p-6 rounded-2xl border border-white/10 bg-[#04040e] relative overflow-hidden space-y-6 text-left">
              <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-full blur-xl pointer-events-none" />
              
              <div className="space-y-1">
                <span className="text-xs font-mono text-pink-400 font-bold uppercase tracking-widest block">
                  Interactive Earn Simulator
                </span>
                <p className="text-[10px] text-gray-500">
                  Calculate computational payouts depending on campaign views & subscriber conversion bounds.
                </p>
              </div>

              {/* View target slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-gray-400">Computational traffic</span>
                  <span className="text-white font-bold">{(viewsGoal / 1000).toFixed(0)}K monthly views</span>
                </div>
                <input 
                  type="range" 
                  min="50000" 
                  max="1000000" 
                  step="5000"
                  value={viewsGoal} 
                  onChange={(e) => setViewsGoal(Number(e.target.value))}
                  className="w-full accent-pink-500 h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
                />
              </div>

              {/* Subscriber conversion rate slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-gray-400">Premium Subscriber Conv.</span>
                  <span className="text-white font-bold">{premiumConversion}% users</span>
                </div>
                <input 
                  type="range" 
                  min="0.5" 
                  max="10" 
                  step="0.1"
                  value={premiumConversion} 
                  onChange={(e) => setPremiumConversion(Number(e.target.value))}
                  className="w-full accent-pink-500 h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
                />
              </div>

              {/* Result Readout */}
              <div className="p-4 bg-white/2 rounded-xl border border-white/5 space-y-2 text-center relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-pink-400/30 to-transparent" />
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono block">Estimated Creator Payout</span>
                <span className="text-3xl font-mono text-white font-bold tracking-tight drop-shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                  ${calculatedEarnings.toLocaleString()}/mo
                </span>
                <span className="text-[9px] text-pink-400 font-mono uppercase block tracking-wider">
                  Computational nodes active * 12.4x Multiplier
                </span>
              </div>

              <div className="space-y-2 text-[10px] text-gray-500 font-mono list-disc pl-2">
                <div className="flex gap-1">
                  <span className="text-pink-500">•</span>
                  <span>Includes 5% ad-revenue conversion triggers.</span>
                </div>
                <div className="flex gap-1">
                  <span className="text-pink-500">•</span>
                  <span>Unlimited bandwidth tier guarantees 0 server hosting fees.</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
