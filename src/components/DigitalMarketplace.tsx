/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  ShoppingBag, Star, Check, Lock, ShieldCheck, 
  Search, Sparkles, Download, Layers, X 
} from "lucide-react";
import { MARKETPLACE_ITEMS } from "../data";
import { MarketplaceItem } from "../types";

export default function DigitalMarketplace() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePurchaseItem, setActivePurchaseItem] = useState<MarketplaceItem | null>(null);
  const [buyerEmail, setBuyerEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderReceipt, setOrderReceipt] = useState<any | null>(null);

  // Filter lists based on chosen category and search string
  const filteredProducts = MARKETPLACE_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ["All", "Templates", "Themes", "Plugins", "Courses", "AI Assets"];

  const handleOpenPurchase = (item: MarketplaceItem) => {
    setActivePurchaseItem(item);
    setBuyerEmail("");
    setOrderReceipt(null);
  };

  const executePurchaseSim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePurchaseItem || !buyerEmail.trim()) return;

    setIsProcessing(true);
    try {
      const response = await fetch("/api/marketplace/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: activePurchaseItem.id,
          title: activePurchaseItem.title,
          price: activePurchaseItem.price,
          buyerEmail
        }),
      });
      const data = await response.json();

      if (data.success) {
        setOrderReceipt(data.order);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section id="digital-marketplace" className="py-24 px-4 md:px-8 bg-[#050510] relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ShoppingBag className="h-4.5 w-4.5 text-cyan-400" />
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-cyan-400 font-bold bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/20">
              Secure Digital Storefront
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white">
            Digital Assets<br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-400 bg-clip-text text-transparent">
              Marketplace
            </span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base font-light">
            Acquire developer shells, high-CTR theme reactors, optimized Express nodes, coding courses, and cinematic 3D visual assets instantly.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/10 backdrop-blur-xl">
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-cyan-500/10 border border-cyan-500/35 text-cyan-400"
                    : "bg-transparent border border-transparent text-slate-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search product nodes..."
              className="w-full bg-black/40 text-xs text-white placeholder-slate-500 rounded-xl pl-10 pr-4 py-3 border border-white/10 focus:border-cyan-500/50 outline-none"
            />
          </div>
        </div>

        {/* Product grid showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="group bg-white/5 border border-white/10 hover:border-cyan-500/30 rounded-[32px] overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-20 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] relative"
            >
              {/* Product Visual */}
              <div className="relative h-44 overflow-hidden select-none">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover filter brightness-[0.8] group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded font-mono text-[9px] text-cyan-400 border border-cyan-500/20 uppercase tracking-widest font-semibold">
                  {p.category}
                </div>
              </div>

              {/* Product specs & content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2 text-left">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase font-bold">
                      BY: {p.author.toUpperCase()}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-mono text-amber-400">
                      <Star className="h-3 w-3 fill-amber-400 text-transparent" />
                      {p.rating}
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {p.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed font-light">
                    {p.description}
                  </p>
                </div>

                {/* Pricing & buy CTA */}
                <div className="border-t border-white/5 pt-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-gray-500 font-mono">Verified Purchases: {p.sales}</span>
                    <span className="text-lg font-mono text-white font-bold">${p.price}</span>
                  </div>

                  <button
                    onClick={() => handleOpenPurchase(p)}
                    className="w-full py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider uppercase text-white bg-white/5 group-hover:bg-cyan-500 border border-white/10 group-hover:border-transparent transition-all duration-300 shadow-none group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Acquire Node License <Lock className="h-3.5 w-3.5 text-gray-400 group-hover:text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <div className="col-span-full py-16 text-center space-y-2">
              <Layers className="h-8 w-8 text-white/5 mx-auto animate-bounce" />
              <p className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest">
                No Artifacts Transcribed
              </p>
              <p className="text-xs text-gray-600 max-w-sm mx-auto">
                No products match the chosen filters. Reset search strings to review platform assets.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Interactive Cyber Purchase Slide Modal */}
      {activePurchaseItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-[#04040e] border border-cyan-500/35 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.25)] overflow-hidden text-left flex flex-col justify-between">
            
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-white/2">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-cyan-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                  Nexora Instant Merchant
                </span>
              </div>
              <button
                onClick={() => setActivePurchaseItem(null)}
                className="text-gray-500 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              
              {!orderReceipt ? (
                <form onSubmit={executePurchaseSim} className="space-y-4">
                  <div className="flex gap-4 items-center p-3 rounded-xl border border-white/5 bg-[#020207]">
                    <img
                      src={activePurchaseItem.image}
                      alt={activePurchaseItem.title}
                      className="w-16 h-14 object-cover rounded-lg border border-white/10"
                      referrerPolicy="no-referrer"
                    />
                    <div className="space-y-0.5">
                      <span className="text-xs font-mono text-cyan-400 tracking-wider block uppercase">Product Selection</span>
                      <span className="text-sm font-semibold text-white block leading-tight">{activePurchaseItem.title}</span>
                      <span className="text-xs font-mono text-gray-400 block">${activePurchaseItem.price} License Cost</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-gray-500 block uppercase tracking-wider font-bold">
                      Enter Secure Email credentials
                    </label>
                    <input
                      required
                      type="email"
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      placeholder="user@nexora.network"
                      className="w-full bg-[#020207] text-xs text-white placeholder-gray-600 rounded-xl px-4 py-2.5 border border-white/5 focus:border-cyan-500 outline-none font-mono"
                    />
                    <p className="text-[9px] text-gray-500 font-mono">
                      Your download links and access hashes will be sent instantly.
                    </p>
                  </div>

                  <div className="p-3 bg-cyan-950/20 border border-cyan-500/10 rounded-xl space-y-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                      <ShieldCheck className="h-4 w-4" /> Securing Sandbox SSL Layer
                    </div>
                    <span className="text-[10px] text-gray-400 block leading-relaxed font-light">
                      This purchase is simulated. Payment is 100% free under research credentials.
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing || !buyerEmail.trim()}
                    className={`w-full py-3 rounded-xl font-mono text-xs font-bold uppercase text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all cursor-pointer ${
                      isProcessing 
                        ? "bg-cyan-950/40 text-gray-500 border border-cyan-500/20 cursor-not-allowed" 
                        : "bg-cyan-500 hover:bg-cyan-600"
                    }`}
                  >
                    {isProcessing ? "TRANSMITTING DATA..." : `AUTHORIZE $${activePurchaseItem.price} PACKET`}
                  </button>
                </form>
              ) : (
                <div className="space-y-4 animate-fadeIn text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    <Check className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-emerald-400 block uppercase tracking-widest font-bold">
                      TRANSCRIPTION SUCCESSFUL
                    </span>
                    <h4 className="text-sm font-semibold text-white">License Handshake Generated</h4>
                  </div>

                  <div className="p-4 bg-neutral-950/80 rounded-xl border border-white/5 space-y-2 text-left font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Receipt ID:</span>
                      <span className="text-white font-mono">{orderReceipt.orderId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Destination:</span>
                      <span className="text-white font-mono">{orderReceipt.buyerEmail}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Asset Title:</span>
                      <span className="text-white font-mono line-clamp-1">{orderReceipt.title}</span>
                    </div>
                    <div className="flex justify-between border-t border-white/5 pt-2 mt-2">
                      <span className="text-gray-400 font-bold">Computational Cost:</span>
                      <span className="text-cyan-400 font-bold">$0.00 (CREDIT DEPLOYED)</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        alert(`License keys synced. Simulated download for ${activePurchaseItem.title} initialized successfully!`);
                        setActivePurchaseItem(null);
                      }}
                      className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-mono text-xs font-bold uppercase transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" /> Download Core Assets
                    </button>
                    <button
                      onClick={() => setActivePurchaseItem(null)}
                      className="px-4 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white transition-colors font-mono text-xs font-bold cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
