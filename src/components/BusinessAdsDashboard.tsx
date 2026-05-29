/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  TrendingUp, Plus, Sparkles, BarChart, Percent, Eye, 
  Target, DollarSign, Globe, RefreshCw, CheckCircle2 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AdCampaign } from "../types";

export default function BusinessAdsDashboard() {
  const [campaigns, setCampaigns] = useState<AdCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // New Campaign Form values
  const [campName, setCampName] = useState("");
  const [campBudget, setCampBudget] = useState("2500");
  const [campPlacement, setCampPlacement] = useState<"Sidebar" | "Banner" | "Sponsored Feed" | "Video In-stream">("Sponsored Feed");

  // Fetch campaigns from backend
  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/ads/campaigns");
      const data = await res.json();
      setCampaigns(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleSyncStats = async () => {
    setIsSyncing(true);
    // Simulate query sync
    setTimeout(() => {
      fetchCampaigns();
      setIsSyncing(false);
    }, 1000);
  };

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!campName.trim() || !campBudget) return;

    try {
      const response = await fetch("/api/ads/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: campName,
          budget: Number(campBudget),
          placement: campPlacement
        }),
      });

      const data = await response.json();
      if (data.success) {
        // Prepend new campaign layout
        setCampaigns((prev) => [data.campaign, ...prev]);
        setCampName("");
        setIsAdding(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Extract aggregated dashboard totals
  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);
  const totalImpressions = campaigns.reduce((sum, c) => sum + c.impressions, 0);
  const averageCtr = campaigns.length 
    ? +(campaigns.reduce((sum, c) => sum + c.ctr, 0) / campaigns.length).toFixed(2)
    : 0;

  // Render a responsive glowing SVG Line Graph based on active CTR histories
  const generateChartPoints = (historyArray: { date: string; value: number }[]) => {
    if (!historyArray || historyArray.length === 0) return "";
    const paddingX = 40;
    const paddingY = 25;
    const width = 500;
    const height = 110;

    const maxVal = Math.max(...historyArray.map(h => h.value), 4);
    const minVal = 0;
    const range = maxVal - minVal;

    const points = historyArray.map((pt, idx) => {
      const x = paddingX + (idx / (historyArray.length - 1)) * (width - paddingX * 2);
      const y = height - paddingY - ((pt.value - minVal) / range) * (height - paddingY * 2);
      return `${x},${y}`;
    });

    return points.join(" ");
  };

  return (
    <section id="business-promotions" className="py-24 px-4 md:px-8 bg-[#050510] relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Globe className="h-4.5 w-4.5 text-amber-400" />
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-amber-400 font-bold bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20">
              Enterprise Growth Suite
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white">
            Business Ad<br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
              Promotions Central
            </span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base font-light">
            Sponsor your blog posts, configure banner real estate, and launch contextual campaign schedules across Nexora's massive distributed feed.
          </p>
        </div>

        {/* Dashboard KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-left space-y-2 [backdrop-filter:blur(8px)]">
            <div className="flex items-center justify-between text-slate-400 font-mono text-[10px] uppercase tracking-wider">
              <span>Allocated Budget</span>
              <DollarSign className="h-3.5 w-3.5 text-amber-500" />
            </div>
            <div className="text-2xl font-mono text-white font-bold">${totalBudget.toLocaleString()}</div>
            <div className="text-[10px] font-mono text-slate-500">Spent: ${totalSpent.toLocaleString()}</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-left space-y-2 [backdrop-filter:blur(8px)]">
            <div className="flex items-center justify-between text-slate-400 font-mono text-[10px] uppercase tracking-wider">
              <span>Traffic Imp.</span>
              <Eye className="h-3.5 w-3.5 text-cyan-400" />
            </div>
            <div className="text-2xl font-mono text-white font-bold">{totalImpressions.toLocaleString()}</div>
            <div className="text-[10px] font-mono text-cyan-400 font-bold">Clicks: {totalClicks}</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-left space-y-2 [backdrop-filter:blur(8px)]">
            <div className="flex items-center justify-between text-[#eab308] font-mono text-[10px] uppercase tracking-wider">
              <span>Average CTR</span>
              <Percent className="h-3.5 w-3.5 text-amber-400" />
            </div>
            <div className="text-2xl font-mono text-white font-bold">{averageCtr}%</div>
            <span className="text-[10px] text-emerald-400 font-mono font-bold">Platform target 2.5%</span>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-left space-y-2 [backdrop-filter:blur(8px)]">
            <div className="flex items-center justify-between text-slate-400 font-mono text-[10px] uppercase tracking-wider">
              <span>Active Sockets</span>
              <Target className="h-3.5 w-3.5 text-purple-400" />
            </div>
            <div className="text-2xl font-mono text-white font-bold">
              {campaigns.filter(c => c.status === "Active").length} / {campaigns.length}
            </div>
            <div className="text-[10px] font-mono text-emerald-400">● Network fully optimized</div>
          </div>
        </div>

        {/* Chart + List Workspaces */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Campaign Chart Preview - 5/12 Columns */}
          <div className="lg:col-span-6 bg-white/5 border border-white/10 rounded-[32px] backdrop-blur-md p-6 text-left space-y-6 shadow-20">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-[0.15em] font-bold block">
                  Interactive Performance Graph
                </span>
                <span className="text-sm font-semibold text-white">Platform CTR Growth Over Time</span>
              </div>
              <button
                onClick={handleSyncStats}
                disabled={isSyncing}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer border border-white/5"
              >
                <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin text-amber-400' : ''}`} />
              </button>
            </div>

            {/* Glowing Custom SVG Line Graph */}
            <div className="relative h-40 bg-black/40 rounded-2xl border border-white/5 flex items-center justify-center p-2">
              {campaigns.length > 0 ? (
                <svg className="w-full h-full" viewBox="0 0 500 110" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Fill Area */}
                  {campaigns[0]?.ctrHistory && (
                    <polygon
                      points={`40,85 ${generateChartPoints(campaigns[0].ctrHistory)} 460,85`}
                      fill="url(#chartGlow)"
                    />
                  )}

                  {/* Line Draw */}
                  {campaigns[0]?.ctrHistory && (
                    <polyline
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2.5"
                      points={generateChartPoints(campaigns[0].ctrHistory)}
                      className="drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                    />
                  )}

                  {/* Horizontal grid guide lines */}
                  <line x1="40" y1="25" x2="460" y2="25" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1" strokeDasharray="4" />
                  <line x1="40" y1="55" x2="460" y2="55" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1" strokeDasharray="4" />
                  <line x1="40" y1="85" x2="460" y2="85" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1" strokeDasharray="4" />

                  {/* Date labels */}
                  {campaigns[0]?.ctrHistory && campaigns[0].ctrHistory.map((pt, idx) => {
                    const x = 40 + (idx / (campaigns[0].ctrHistory.length - 1)) * (500 - 40 * 2);
                    return (
                      <text
                        key={idx}
                        x={x}
                        y="104"
                        fill="#64748b"
                        fontSize="8"
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        {pt.date}
                      </text>
                    );
                  })}
                </svg>
              ) : (
                <div className="text-xs text-slate-500 font-mono">Graphing buffers active...</div>
              )}
            </div>

            <div className="flex gap-4 text-[10px] font-mono text-slate-400 pt-2 border-t border-white/10">
              <span className="flex items-center gap-1.5 text-amber-500"><span className="h-2 w-2 rounded-full bg-amber-500" /> Active Solaria Campaign</span>
              <span>CTR Peak: 3.3%</span>
            </div>
          </div>

          {/* Campaigns Manager Dashboard List - 7/12 Columns */}
          <div className="lg:col-span-6 space-y-4">
            
            <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10 [backdrop-filter:blur(8px)]">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-500 block">
                Manage Growth Sockets
              </span>

              <button
                onClick={() => setIsAdding(!isAdding)}
                className="px-4 py-2 rounded-xl border border-amber-500/30 text-amber-400 hover:text-white bg-amber-500/5 hover:bg-amber-500 transition-all font-mono text-[10px] tracking-wider uppercase font-bold flex items-center gap-1 cursor-pointer"
              >
                Launch Ad campaign <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Spawn Campaign form slide drawer */}
            <AnimatePresence>
              {isAdding && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleCreateCampaign}
                  className="bg-white/5 rounded-[32px] border border-amber-500/20 p-6 overflow-hidden text-left space-y-4 shadow-20 backdrop-blur-md"
                >
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-widest block">
                    Launch New Ad socket
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] text-slate-400 font-mono tracking-wider block font-bold">CAMPAIGN TITLE</label>
                      <input
                        required
                        type="text"
                        value={campName}
                        onChange={(e) => setCampName(e.target.value)}
                        placeholder="e.g. Cyber-Display pre-orders"
                        className="w-full bg-black/40 rounded-xl text-xs text-white px-3.5 py-3 border border-white/10 focus:border-amber-500 outline-none"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-[9px] text-slate-400 font-mono tracking-wider block font-bold">DAILY BUDGET ($)</label>
                      <input
                        required
                        type="number"
                        value={campBudget}
                        onChange={(e) => setCampBudget(e.target.value)}
                        placeholder="2500"
                        className="w-full bg-black/40 rounded-xl text-xs text-white px-3.5 py-3 border border-white/10 focus:border-amber-500 outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] text-slate-400 font-mono tracking-wider block font-bold">PLACEMENT SOCKET</label>
                      <select
                        value={campPlacement}
                        onChange={(e: any) => setCampPlacement(e.target.value)}
                        className="w-full bg-black/40 rounded-xl text-xs text-white px-3.5 py-3 border border-white/10 focus:border-amber-500 outline-none font-mono cursor-pointer"
                      >
                        <option value="Sponsored Feed">Sponsored Feed</option>
                        <option value="Banner">Banner</option>
                        <option value="Sidebar">Sidebar</option>
                        <option value="Video In-stream">Video In-stream</option>
                      </select>
                    </div>

                    <div className="flex items-end">
                      <button
                        type="submit"
                        className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-black rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Launch Sponsor Socket
                      </button>
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Campaign rows list */}
            {loading ? (
              <div className="text-center py-6 text-xs text-slate-500 font-mono">Querying live campaigns...</div>
            ) : (
              <div className="space-y-3">
                {campaigns.map((c) => (
                  <div
                    key={c.id}
                    className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-amber-500/20 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left [backdrop-filter:blur(8px)]"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-white">{c.name}</span>
                        <span className={`text-[9px] px-2 py-0.5 rounded font-mono font-bold ${
                          c.status === "Active" 
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30" 
                            : "bg-gray-800 text-slate-400 border border-white/10"
                        }`}>
                          {c.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-slate-400 font-mono">
                        <span>Placement: <span className="text-white">{c.placement}</span></span>
                        <span>•</span>
                        <span>Budget: <span className="text-amber-400">${c.budget.toLocaleString()}</span></span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 font-mono text-right w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-white/10 pt-2.5 md:pt-0">
                      <div>
                        <span className="text-[9px] text-slate-500 block uppercase font-bold tracking-wider">Impressions</span>
                        <span className="text-xs text-white">{c.impressions.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 block uppercase font-bold tracking-wider font-bold tracking-wider">Clicks</span>
                        <span className="text-xs text-white">{c.clicks.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-amber-400 block uppercase font-bold tracking-wider">CTR</span>
                        <span className="text-xs text-amber-400 font-semibold">{c.ctr}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
