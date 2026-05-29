/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AIService, MarketplaceItem, Testimony, PlatformStat } from "./types";

export const AI_SERVICES_LIST: AIService[] = [
  {
    id: "text",
    name: "AI Content Synthesizer",
    tagline: "Natural Language Generator",
    description: "Generate world-class copy, technical essays, articles, or scripts using Gemini 3.5 Flash neural core integrations in microseconds.",
    category: "text",
    iconName: "FileText",
    glowColor: "shadow-[0_0_20px_rgba(139,92,246,0.5)] border-purple-500/30 text-purple-400"
  },
  {
    id: "image",
    name: "Neural Image Render",
    tagline: "Text-to-Image Supercomputer",
    description: "Generate beautiful high-resolution cosmic concept art, architectural mockups, cyborg portraits, and hyper-realistic branding assets.",
    category: "image",
    iconName: "Image",
    glowColor: "shadow-[0_0_20px_rgba(236,72,153,0.5)] border-pink-500/30 text-pink-400"
  },
  {
    id: "video",
    name: "Video Synthesis Matrix",
    tagline: "Volumetric Editor Hub",
    description: "Incorporate robotic visual clips, abstract motion graphic loops, and custom cinematic videos in 1080p from basic narrative outlines.",
    category: "video",
    iconName: "Play",
    glowColor: "shadow-[0_0_20px_rgba(59,130,246,0.5)] border-blue-500/30 text-blue-400"
  },
  {
    id: "seo",
    name: "SEO Hyper-Optimizer",
    tagline: "Keyword and Meta Diagnostician",
    description: "Accelerate site ranking through quantum crawling analysis. Get optimized meta tags, SEO title recommendations, and structured headers.",
    category: "seo",
    iconName: "Search",
    glowColor: "shadow-[0_0_20px_rgba(6,182,212,0.5)] border-cyan-500/30 text-cyan-400"
  },
  {
    id: "marketing",
    name: "Viral Copy Optimizer",
    tagline: "High-CTR Hook Generator",
    description: "Synthesize high-performing newsletter topics, social hooks, and promotional frameworks proven to attract massive attention cascades.",
    category: "marketing",
    iconName: "Sparkles",
    glowColor: "shadow-[0_0_20px_rgba(245,158,11,0.5)] border-amber-500/30 text-amber-400"
  },
  {
    id: "code",
    name: "Quantum Code matrix",
    tagline: "Syntactic Optimization Lab",
    description: "Synthesize highly optimized algorithms, clean server structures, and dynamic web handlers with explicit time complexity and memory reviews.",
    category: "code",
    iconName: "Code",
    glowColor: "shadow-[0_0_20px_rgba(16,185,129,0.5)] border-emerald-500/30 text-emerald-400"
  }
];

export const MARKETPLACE_ITEMS: MarketplaceItem[] = [
  {
    id: "m-1",
    title: "Aetherial Neon Web Shell",
    category: "Themes",
    description: "Multi-layered glassmorphism portfolio template designed for futuristic visual developers. Comes with dark glowing configurations and smooth scrolling physics.",
    price: 49,
    rating: 4.9,
    sales: 1420,
    author: "Zenith Core",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400",
    tags: ["React", "Glassmorphism", "Tailwind"],
    features: ["Fully responsive layouts", "Vite setup files", "High-contrast color profiles", "Smooth layout transitions"]
  },
  {
    id: "m-2",
    title: "Quantum UI Component Reactor",
    category: "Plugins",
    description: "35+ highly tactile animated glass inputs, progress nodes, custom interactive canvas charts, and cybernetic side bars styled with pure Tailwind and motion.",
    price: 29,
    rating: 4.8,
    sales: 3405,
    author: "Elysia Quantum",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400",
    tags: ["Vite", "Animation", "TypeScript"],
    features: ["Lightweight build file", "Figma design blueprints included", "Zero dependencies beyond motion", "100% accessible contrast ratio"]
  },
  {
    id: "m-3",
    title: "Full-Stack Neuro-Platform Blueprint",
    category: "Templates",
    description: "A complete pre-wired full-stack platform featuring in-memory sandboxes, secure token handling, payment triggers, and automated Gemini routes.",
    price: 129,
    rating: 5.0,
    sales: 641,
    author: "Nexora Devs",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400",
    tags: ["FullStack", "Express", "Vite"],
    features: ["Docker deployment configs", "API route controllers", "Pre-built user dashboard pages", "Comprehensive styling manuals"]
  },
  {
    id: "m-4",
    title: "Generative Prompt Mechanics",
    category: "Courses",
    description: "Master the latent space of modern models. Understand system conditioning, few-shot structures, hybrid tools, and functional code generation.",
    price: 79,
    rating: 4.7,
    sales: 2190,
    author: "Dr. Kaelen Stark",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400",
    tags: ["AI", "Prompting", "Instruction"],
    features: ["14 hours HD Video lectures", "Editable code notebook maps", "Direct community forum access", "Official completion certification"]
  },
  {
    id: "m-5",
    title: "Cybernetic Asset Bundle (3D Elements)",
    category: "AI Assets",
    description: "45 premium high-contrast transparent PNGs of glowing technological processors, holographic displays, biological transistors, and particles.",
    price: 19,
    rating: 4.9,
    sales: 4509,
    author: "PixelForge Labs",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=400",
    tags: ["3D Assets", "Figma", "Design"],
    features: ["Transparent alpha channels", "High-res 4096px files", "Cinema4D master files available", "Royalty-free deployment parameters"]
  }
];

export const TESTIMONIES_LIST: Testimony[] = [
  {
    id: "t-1",
    quote: "Switching our SaaS workspace to Nexora was a quantum leap. We replaced five different platforms—our AI text editor, blog publisher, ad network manager, and analytics dashboards—into one beautiful, cohesive cybernetic portal. Compute overhead dropped instantly.",
    author: "Lyra Valis",
    role: "VP of Product Integration",
    company: "Aetheria Systems",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    glow: "rgba(139, 92, 246, 0.3)"
  },
  {
    id: "t-2",
    quote: "The visual design is absolute perfection. I was tired of flat, boring white and grey SaaS tools. Nexora feels like sitting inside a premium high-speed hyper-editor. Everything transitions smoothly, the tools work beautifully, and our team is actually enjoying their screens.",
    author: "Cassian Rook",
    role: "Principal Brand Architect",
    company: "ZeroGravity Creative",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    glow: "rgba(236, 72, 153, 0.3)"
  },
  {
    id: "t-3",
    quote: "As a creator, monetizing my premium theme development was always a nightmare of messy integrations. Nexora's built-in digital marketplace, creator studio, and automated payment simulations allowed me to launch and sell themes globally in less than 15 minutes.",
    author: "Sora Takahashi",
    role: "Senior Theme Developer",
    company: "PixelShaper Networks",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    glow: "rgba(59, 130, 246, 0.3)"
  }
];

export const CORE_PLATFORM_STATS: PlatformStat[] = [
  {
    label: "Active Nodes",
    value: "2,481,902",
    change: "+12.4% MoM",
    isPositive: true,
    glowColor: "text-purple-400"
  },
  {
    label: "Social Publications",
    value: "84,912,401",
    change: "+34.1%",
    isPositive: true,
    glowColor: "text-pink-400"
  },
  {
    label: "Generations Per Minute",
    value: "142,831",
    change: "+18.9%",
    isPositive: true,
    glowColor: "text-cyan-400"
  },
  {
    label: "Total Creator Payouts",
    value: "$458,310",
    change: "+41.2% QTD",
    isPositive: true,
    glowColor: "text-emerald-400"
  }
];
