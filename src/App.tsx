/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Cpu, Bell, ShieldAlert, BadgeCheck, Check, 
  Menu, X, Sparkles, ChevronRight, Zap, Target, BookOpen, ShoppingBag 
} from "lucide-react";

// Import modular components
import HeroSection from "./components/HeroSection";
import AIToolsPlayground from "./components/AIToolsPlayground";
import CreatorEcosystem from "./components/CreatorEcosystem";
import DigitalMarketplace from "./components/DigitalMarketplace";
import BusinessAdsDashboard from "./components/BusinessAdsDashboard";
import TrendingContentHub from "./components/TrendingContentHub";
import PricingMemberships from "./components/PricingMemberships";
import FooterAndExtras from "./components/FooterAndExtras";

export default function App() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const [activePlaygroundTool, setActivePlaygroundTool] = useState("text");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showBillingModal, setShowBillingModal] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: "n-1",
      title: "Solaria Cyber-Armor Campaign active",
      body: "Campaign approved cleanly. Tracking CTR increments in real-time.",
      time: "2 mins ago",
      read: false
    },
    {
      id: "n-2",
      title: "Z-UI Components reactor license sold",
      body: "Order #NXP-28491 generated. Payout sent instantly to @zenith_ui wallet.",
      time: "32 mins ago",
      read: false
    },
    {
      id: "n-3",
      title: "Cognitive compiler cache expanded",
      body: "Gemini 3.5 AI Content co-processor buffers synced successfully.",
      time: "1 hour ago",
      read: false
    }
  ]);

  // Handle CTA directions inside UI
  const navigateToPlaygroundTool = (toolId: string) => {
    setActivePlaygroundTool(toolId);
    const element = document.getElementById("ai-playground");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenUpgrade = () => {
    const element = document.getElementById("premium-pricing");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const clearNotifications = () => {
    setNotifications((prev) => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  return (
    <div className="min-h-screen bg-[#050510] text-gray-200 overflow-x-hidden selection:bg-purple-500/35 selection:text-white relative">
      
      {/* Top Banner alert */}
      <div className="w-full bg-gradient-to-r from-purple-950 via-purple-900 to-pink-950 px-4 py-2 text-center text-xs font-mono border-b border-purple-500/20 text-purple-200 select-none z-50 relative flex items-center justify-center gap-2">
        <Sparkles className="h-4.5 w-4.5 text-pink-400 animate-pulse" />
        <span>NEXORA PLATFORM DEPLOYED • UNDER EXPERIMENTAL CO-PROCESSOR CREDENTIALS</span>
        <button 
          onClick={handleOpenUpgrade}
          className="underline text-white font-bold hover:text-pink-300 transition-colors ml-1 cursor-pointer"
        >
          Activate unlimited workspace
        </button>
      </div>

      {/* Sticky High-Contrast Header Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#050510]/80 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Logo element */}
          <div className="flex items-center gap-3 select-none">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 flex items-center justify-center text-white font-mono font-bold text-sm shadow-[0_0_15px_rgba(139,92,246,0.3)] animate-pulse">
              NX
            </div>
            <span className="text-lg font-sans font-black tracking-widest text-white uppercase bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text">
              Nexora
            </span>
          </div>

          {/* Desktop Nav menu items */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold font-mono tracking-wider text-gray-400 uppercase">
            <a href="#ai-playground" className="hover:text-purple-400 transition-colors">AI tools</a>
            <a href="#creator-ecosystem" className="hover:text-pink-400 transition-colors">Creator space</a>
            <a href="#trending-hub" className="hover:text-purple-400 transition-colors">Trending Feed</a>
            <a href="#digital-marketplace" className="hover:text-cyan-400 transition-colors">Marketplace</a>
            <a href="#business-promotions" className="hover:text-amber-400 transition-colors">Business ads</a>
            <a href="#premium-pricing" className="hover:text-white transition-colors text-purple-300 flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-purple-400 fill-purple-500/20" /> Memberships</a>
          </nav>

          {/* Right profile, notification triggers */}
          <div className="flex items-center gap-4">
            
            {/* Notification bell trigger */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setUnreadCount(0);
                }}
                className="p-2 rounded-xl bg-white/2 border border-white/5 hover:border-white/10 text-gray-400 hover:text-white transition-all relative cursor-pointer"
              >
                <Bell className="h-4.5 w-4.5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[9px] font-mono font-black text-white shadow-[0_0_10px_rgba(236,72,153,0.5)]">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification active panel list */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 rounded-2xl border border-white/10 bg-[#050512] shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(139,92,246,0.1)] p-4 space-y-4 animate-fadeIn text-left z-50">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                    <span className="text-xs font-mono uppercase tracking-widest text-gray-400 font-bold">Workspace Ledger</span>
                    <button
                      onClick={clearNotifications}
                      className="text-[10px] font-mono text-pink-400 hover:text-pink-300 font-bold uppercase transition-colors mr-1 cursor-pointer"
                    >
                      Clear All
                    </button>
                  </div>

                  <div className="space-y-3 font-sans max-h-64 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-3 bg-white/2 rounded-xl border border-white/5 space-y-1">
                        <div className="flex justify-between items-start">
                          <h6 className="text-xs font-bold text-white leading-tight">{n.title}</h6>
                          <span className="text-[8px] font-mono text-gray-600 uppercase flex-shrink-0 ml-2">{n.time}</span>
                        </div>
                        <p className="text-[10px] text-gray-400 leading-tight font-light">{n.body}</p>
                      </div>
                    ))}
                  </div>

                  <div className="text-[9px] text-zinc-600 font-mono text-center">
                    Secured by Nexora Secure Hash Tunnel
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar trigger */}
            <div className="flex items-center gap-2 border-l border-white/5 pl-4">
              <div className="relative cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=80"
                  alt="user profile avatar"
                  className="w-8.5 h-8.5 rounded-xl border border-purple-500/35 object-cover" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-1 -right-1 bg-purple-500 rounded-full p-0.5 border border-black">
                  <Check className="h-2 w-2 text-white" />
                </div>
              </div>
              <span className="hidden lg:block text-xs font-mono font-bold text-gray-300">
                @developer
              </span>
            </div>

            {/* Mobile Nav toggle button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-1 px-2 pointer-block md:hidden text-gray-400 hover:text-white border border-white/5 bg-white/2 rounded-xl"
            >
              <Menu className="h-5 w-5" />
            </button>

          </div>

        </div>
      </header>

      {/* Mobile Menu Dropdown Panel drawer */}
      {showMobileMenu && (
        <div className="fixed inset-x-0 top-16 z-30 p-4 bg-[#050510]/95 backdrop-blur-3xl border-b border-white/10 flex flex-col gap-4 text-left font-mono text-sm tracking-wider uppercase font-semibold">
          <a href="#ai-playground" onClick={() => setShowMobileMenu(false)} className="py-2 hover:text-purple-400 transition-colors">AI tools</a>
          <a href="#creator-ecosystem" onClick={() => setShowMobileMenu(false)} className="py-2 hover:text-pink-400 transition-colors">Creator space</a>
          <a href="#trending-hub" onClick={() => setShowMobileMenu(false)} className="py-2 hover:text-purple-400 transition-colors">Trending Feed</a>
          <a href="#digital-marketplace" onClick={() => setShowMobileMenu(false)} className="py-2 hover:text-cyan-400 transition-colors">Marketplace</a>
          <a href="#business-promotions" onClick={() => setShowMobileMenu(false)} className="py-2 hover:text-amber-400 transition-colors">Business ads</a>
          <a href="#premium-pricing" onClick={() => setShowMobileMenu(false)} className="py-2 text-purple-300 flex items-center gap-1.5"><Zap className="h-4 w-4 text-purple-400" /> memberships</a>
        </div>
      )}

      {/* Hompage core blocks container */}
      <main className="relative">
        
        {/* Render sections sequentially for rich content structure */}
        <HeroSection 
          onNavigateToService={navigateToPlaygroundTool} 
          onOpenUpgradeModal={handleOpenUpgrade} 
        />
        
        {/* Interactive Playground Core Module */}
        <AIToolsPlayground 
          initialActiveServiceId={activePlaygroundTool} 
        />

        {/* Creator Studios Suite */}
        <CreatorEcosystem />

        {/* Dynamic Social Community blogging feeds */}
        <TrendingContentHub />

        {/* Digital Asset store licensing suite */}
        <DigitalMarketplace />

        {/* Sponsor/Ad bidding analytics preview */}
        <BusinessAdsDashboard />

        {/* Subscription pricing matrix plans */}
        <PricingMemberships />

        {/* Review slide nodes, App mocks downloads and Footer */}
        <FooterAndExtras />

      </main>

    </div>
  );
}
