/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Check, Sparkles, X, Lock, ShieldCheck, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface UpgradeModalProps {
  onSuccess: (payoutID: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function PricingMemberships() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [selectedUpgradePlan, setSelectedUpgradePlan] = useState<any | null>(null);
  const [buyerEmail, setBuyerEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [upgradedReceipt, setUpgradedReceipt] = useState<any | null>(null);

  const plans = [
    {
      name: "Free Sandbox",
      priceMonthly: 0,
      priceYearly: 0,
      description: "Understand the core matrix, build basic text publications, and search digital templates.",
      glowColor: "border-white/5 shadow-none text-gray-400 hover:border-white/15",
      features: [
        "10 monthly AI Content Synthesis calls",
        "Browse security marketplace templates",
        "Personal creator portfolio layout",
        "Standard latency co-processing",
        "Limited social community entries"
      ],
      btnText: "Active Free Sandbox"
    },
    {
      name: "Pro Core",
      priceMonthly: 19,
      priceYearly: 15,
      description: "For active builders, template designers, and serious high-frequency digital creators.",
      glowColor: "border-purple-500/20 shadow-[0_0_20px_rgba(139,92,246,0.1)] text-purple-400 hover:border-purple-500/40",
      features: [
        "Unlimited AI Text Content synthesis",
        "150 Neural Image renders per cycle",
        "Publish unlimited social feed entries",
        "Access exclusive Themes & Plugins",
        "1.5% ad campaign CTR multipliers",
        "Developer API node credentials"
      ],
      btnText: "Upgrade to Pro"
    },
    {
      name: "Business Orbit",
      priceMonthly: 49,
      priceYearly: 39,
      description: "Accelerate teams, optimize corporate ad budgets, and lock high revenue percentages.",
      glowColor: "border-pink-500/30 shadow-[0_0_20px_rgba(236,72,153,0.15)] text-pink-400 hover:border-pink-500/50 scale-105 relative",
      features: [
        "Everything in Pro matching systems",
        "Ad Campaign Manager integration",
        "Automated SEO optimization tools",
        "Pre-baked Docker deployment files",
        "5% royalty fee discount in Marketplace",
        "Holographic metrics visualization Suite"
      ],
      btnText: "Synthesize Business Orbit",
      badge: "MOST POPULAR Node"
    },
    {
      name: "Enterprise Matrix",
      priceMonthly: 129,
      priceYearly: 99,
      description: "Dedicated cluster computational power, offline co-processors, custom fine-tuning.",
      glowColor: "border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.1)] text-cyan-400 hover:border-cyan-500/40",
      features: [
        "Unlimited everything",
        "Dedicated isolated Express cluster",
        "Secure Gemini Fine-Tuning registry",
        "Ad-Sense ad placement prioritize",
        "0% marketplace transaction commission",
        "24/7 holographic support grid"
      ],
      btnText: "Engage Enterprise"
    }
  ];

  const handleOpenUpgrade = (plan: any) => {
    setSelectedUpgradePlan(plan);
    setBuyerEmail("");
    setUpgradedReceipt(null);
  };

  const handleUpgradeSim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUpgradePlan || !buyerEmail.trim()) return;

    setIsProcessing(true);
    try {
      const response = await fetch("/api/membership/upgrade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tier: selectedUpgradePlan.name,
          email: buyerEmail
        })
      });
      const data = await response.json();

      if (data.success) {
        setUpgradedReceipt({
          payoutID: data.payoutID,
          email: buyerEmail,
          tier: data.tier
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section id="premium-pricing" className="py-24 px-4 md:px-8 bg-[#050510] relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Cpu className="h-4.5 w-4.5 text-purple-400 animate-pulse" />
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-purple-400 font-bold bg-purple-500/10 px-4 py-1.5 rounded-full border border-purple-500/20">
              Secure Resource Allocation
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white">
            Premium Orbit<br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Memberships
            </span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base font-light">
            Unlock quantum scale computing registers, unlimited AI generation bandwidth, and ad sponsor priority slots. Upgrade instantly.
          </p>

          {/* Toggle Billing monthly yearly */}
          <div className="flex items-center justify-center gap-3 pt-6 select-none">
            <span className={`text-[10px] font-mono font-bold tracking-[0.2em] ${billingCycle === "monthly" ? "text-purple-300" : "text-slate-600"}`}>
              MONTHLY CYCLE
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
              className="w-12 h-6.5 rounded-full bg-white/5 border border-white/10 relative p-1 transition-colors cursor-pointer"
            >
              <div className={`w-4.5 h-4.5 rounded-full bg-purple-400 transition-all ${
                billingCycle === "yearly" ? "translate-x-5 bg-pink-400" : "translate-x-0"
              }`} />
            </button>
            <span className={`text-[10px] font-mono font-bold tracking-[0.2em] flex items-center gap-1.5 ${billingCycle === "yearly" ? "text-pink-300" : "text-slate-600"}`}>
              ANNUAL ORBIT <span className="bg-pink-500/15 text-pink-400 border border-pink-500/30 px-2 py-0.5 rounded text-[8px] uppercase font-bold tracking-[0.1em]">SAVE 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch pt-6">
          {plans.map((p) => {
            const isFree = p.priceMonthly === 0;
            const price = billingCycle === "monthly" ? p.priceMonthly : p.priceYearly;
            
            return (
              <div
                key={p.name}
                className={`flex flex-col justify-between p-6 bg-white/5 border border-white/10 backdrop-blur-md rounded-[32px] transition-all duration-300 relative shadow-20 ${
                  p.name === "Business Orbit" ? "ring-2 ring-pink-500/30" : ""
                }`}
              >
                {p.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-pink-500 text-white font-mono text-[9px] px-3.5 py-1.5 rounded-full uppercase tracking-widest font-black shadow-[0_0_15px_rgba(236,72,153,0.4)] z-10">
                    {p.badge}
                  </div>
                )}

                <div className="space-y-4 text-left">
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block font-bold">
                      {p.name}
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-mono text-white font-black">${price}</span>
                      <span className="text-[10px] text-gray-500 font-mono block">/{billingCycle === "monthly" ? "mo" : "mo, billed annually"}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 font-light leading-relaxed min-h-[50px]">
                    {p.description}
                  </p>

                  <div className="flex h-px bg-white/5 my-2" />

                  {/* Feature Checklist */}
                  <ul className="space-y-2.5 text-xs">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-2.5 items-start text-gray-300 font-light">
                        <Check className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2 leading-tight">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => {
                      if (!isFree) {
                        handleOpenUpgrade(p);
                      } else {
                        alert("You are currently using Nexora Free Sandbox. Upgrade to unlock computational bandwidth.");
                      }
                    }}
                    className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                      isFree 
                        ? "bg-transparent border-white/5 text-gray-500 cursor-not-allowed" 
                        : "bg-white/5 border-white/10 text-white hover:bg-white hover:text-black hover:border-transparent hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    }`}
                  >
                    {p.btnText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Dynamic Membership Purchase Handshake Modal */}
      {selectedUpgradePlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-[#04040e] border border-purple-500/35 rounded-2xl shadow-[0_0_50px_rgba(139,92,246,0.25)] overflow-hidden text-left flex flex-col justify-between">
            
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-white/2">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-purple-400 animate-spin" />
                <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                  Nexora Identity Synchronizer
                </span>
              </div>
              <button
                onClick={() => setSelectedUpgradePlan(null)}
                className="text-gray-500 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              
              {!upgradedReceipt ? (
                <form onSubmit={handleUpgradeSim} className="space-y-4">
                  <div className="flex gap-4 items-center p-3 rounded-xl border border-white/5 bg-[#020207]">
                    <div className="p-3 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-lg">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-xs font-mono text-purple-400 tracking-wider block uppercase">Membership Tier</span>
                      <span className="text-sm font-semibold text-white block leading-tight">{selectedUpgradePlan.name} Plan</span>
                      <span className="text-xs font-mono text-gray-400 block">
                        ${billingCycle === "monthly" ? selectedUpgradePlan.priceMonthly : selectedUpgradePlan.priceYearly} / month allocation
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-gray-500 block uppercase tracking-wider font-bold">
                      Enter Account Email Address
                    </label>
                    <input
                      required
                      type="email"
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      placeholder="e.g. member@nexora.network"
                      className="w-full bg-[#020207] text-xs text-white placeholder-gray-600 rounded-xl px-4 py-2.5 border border-white/5 focus:border-purple-500 outline-none font-mono"
                    />
                    <p className="text-[9px] text-gray-400 font-mono">
                      Your premium workspace configurations and nodes will attach instantly.
                    </p>
                  </div>

                  <div className="p-3 bg-purple-950/20 border border-purple-500/10 rounded-xl space-y-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider">
                      <ShieldCheck className="h-4 w-4" /> Secure Sandbox Identity Handshake
                    </div>
                    <span className="text-[10px] text-gray-400 block leading-relaxed font-light">
                      This subscription is a simulated sandboxed pipeline. Access keys are issued at zero computation charge.
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing || !buyerEmail.trim()}
                    className={`w-full py-3 rounded-xl font-mono text-xs font-bold uppercase text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all cursor-pointer ${
                      isProcessing 
                        ? "bg-purple-950/40 text-gray-500 border border-purple-500/20 cursor-not-allowed" 
                        : "bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]"
                    }`}
                  >
                    {isProcessing ? "INITIALIZING NODE CONFIGS..." : "APPROVE SANDBOX SUBSCRIPTION"}
                  </button>
                </form>
              ) : (
                <div className="space-y-4 animate-fadeIn text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    <Check className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-emerald-400 block uppercase tracking-widest font-bold">
                      UPGRADE CONFIRMED
                    </span>
                    <h4 className="text-sm font-semibold text-white">Quantum Shovel Activated</h4>
                  </div>

                  <div className="p-4 bg-neutral-950/80 rounded-xl border border-white/5 space-y-2 text-left font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Transaction ID:</span>
                      <span className="text-white font-mono">{upgradedReceipt.payoutID}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">User Email:</span>
                      <span className="text-white font-mono">{upgradedReceipt.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Assigned Tier:</span>
                      <span className="text-purple-400 font-mono font-bold uppercase">{upgradedReceipt.tier}</span>
                    </div>
                    <div className="flex justify-between border-t border-white/5 pt-2 mt-2">
                      <span className="text-gray-400 font-bold">Subscription Cost:</span>
                      <span className="text-emerald-400 font-bold">$0.00 (SANDBOX COMPLETE)</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      alert(`Successfully synchronized ${upgradedReceipt.tier} configurations onto client. Enjoy ultimate computational power!`);
                      setSelectedUpgradePlan(null);
                    }}
                    className="w-full py-2.5 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-mono text-xs font-bold uppercase transition-colors cursor-pointer"
                  >
                    Confirm Synchronization
                  </button>
                </div>
              )}

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
