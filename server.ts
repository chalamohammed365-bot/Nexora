/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware for body parsing
app.use(express.json());

// Initialize Gemini Client safely
let ai: GoogleGenAI | null = null;
try {
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    console.log("Gemini API initialized successfully.");
  } else {
    console.warn("GEMINI_API_KEY is not defined. AI functions will run in simulation mode.");
  }
} catch (e) {
  console.error("Failed to initialize Gemini API Client:", e);
}

// In-Memory Database for Mockup Sandbox Persistence
const database = {
  blogPosts: [
    {
      id: "blog-1",
      title: "The Quantum Renaissance: Navigating Hyper-Dimensional Computing",
      excerpt: "Explore how organic neural transistors are redefining high-throughput computing capabilities across modern machine intelligence frameworks.",
      content: `The computer of 2026 isn't just silicon anymore. As we hit the limits of standard physical transistors, Nexora’s organic computing network utilizes molecular-scale biological simulators and liquid state machines to solve real-world problems. 
      
      This revolutionary leap, often called the "Quantum Renaissance," is transitioning from theoretical labs straight to real production servers. In this publication, we'll dive deep into organic semiconductors, how they optimize AI token execution speeds, and what this means for neural networks that require millions of floating point calculations per second.

      What makes Neuromorphic chips distinct is their ability to compute and store information simultaneously, reflecting the dense synaptic connections of the biological cortex. Over the next decade, standard databases will feel like abacuses compared to holographic state engines. We are proud to present Nexora’s active research on these architectures, helping businesses scale into hyperspace securely.`,
      category: "Quantum Tech",
      author: {
        name: "Elysia Mercer",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
        handle: "@elysia_quantum",
        isVerified: true
      },
      views: 12402,
      likes: 852,
      publishedAt: "2026-05-28T14:32:00Z",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600",
      tags: ["Quantum", "Neuromorphic", "OrganicTech"]
    },
    {
      id: "blog-2",
      title: "Neon Aesthetics: Engineering Immersion in Spatial Interfaces",
      excerpt: "Decoupling user interfaces from standard flat grids. A design manifesto on dark neon, cosmic depth, and glow physics.",
      content: `Flat design has run its course. Standard flat grey interfaces feel clinical, robotic, and empty. With the emergence of spatial devices and high-intensity dynamic displays, user interfaces are transitioning into highly immersive neon environments.

      This is what we call Neon-Immersive UI/UX. At Nexora, we treat screens not as simple canvases, but as spatial chambers of deep obsidian and cosmic glow. Elements float over absolute black using micro-layered shadow offsets, soft light diffusion layers (glassmorphism), and neon emission lines that act as guidance for human attention.
      
      To build a premium UI today, designers must understand light scattering, visual weight, and accessible contrasts. Light emitters (like buttons and progress rings) have soft physical shadows carrying a hint of their colored wavelength. By mimicking natural physics in full cybernetic styling, we create experiences that are both beautiful and deeply intuitive.`,
      category: "Design Architecture",
      author: {
        name: "Zenith Core",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
        handle: "@zenith_ui",
        isVerified: true
      },
      views: 9481,
      likes: 671,
      publishedAt: "2026-05-25T10:15:00Z",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600",
      tags: ["FuturisticUI", "UXManifesto", "Glassmorphism"]
    },
    {
      id: "blog-3",
      title: "Synthesizing Attention: Content Architecture in the Creator Era",
      excerpt: "Understanding creator economy dynamics and the algorithms driving high-fidelity human content monetization.",
      content: `The modern economy is no longer about raw production; it is about attention synthesis. In a world saturated with automatic low-quality text, human curation and highly interactive layouts are becoming premium assets.
      
      Nexora’s Creator Studio handles attention monetization by giving builders micro-tools to distribute premium content instantly. By embedding payment triggers, smart subscriptions, and content protection directly into our distributed nodes, we ensure that creators get paid every time their ideas spark conversation.`,
      category: "Creator Economy",
      author: {
        name: "Astra Vance",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150",
        handle: "@astra_v",
        isVerified: false
      },
      views: 7312,
      likes: 499,
      publishedAt: "2026-05-22T08:00:00Z",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600",
      tags: ["Monetization", "CreatorStudio", "Web3"]
    }
  ],
  adCampaigns: [
    {
      id: "camp-1",
      name: "Solaria Cyber-Armor Campaign",
      budget: 5000,
      spent: 2450,
      status: "Active" as const,
      clicks: 1420,
      impressions: 48000,
      ctr: 2.95,
      placement: "Sponsored Feed" as const,
      ctrHistory: [
        { date: "05-23", value: 1.8 },
        { date: "05-24", value: 2.1 },
        { date: "05-25", value: 2.4 },
        { date: "05-26", value: 2.5 },
        { date: "05-27", value: 2.8 },
        { date: "05-28", value: 2.95 },
      ]
    },
    {
      id: "camp-2",
      name: "Holo-Display Pre-orders Boost",
      budget: 10000,
      spent: 7800,
      status: "Active" as const,
      clicks: 4120,
      impressions: 125000,
      ctr: 3.3,
      placement: "Banner" as const,
      ctrHistory: [
        { date: "05-23", value: 2.5 },
        { date: "05-24", value: 2.8 },
        { date: "05-25", value: 3.0 },
        { date: "05-26", value: 3.1 },
        { date: "05-27", value: 3.2 },
        { date: "05-28", value: 3.3 },
      ]
    },
    {
      id: "camp-3",
      name: "Aetherial Tea Co. Video In-Stream",
      budget: 2500,
      spent: 2500,
      status: "Completed" as const,
      clicks: 980,
      impressions: 34000,
      ctr: 2.88,
      placement: "Video In-stream" as const,
      ctrHistory: [
        { date: "05-23", value: 1.5 },
        { date: "05-24", value: 2.0 },
        { date: "05-25", value: 2.3 },
        { date: "05-26", value: 2.5 },
        { date: "05-27", value: 2.7 },
        { date: "05-28", value: 2.88 },
      ]
    }
  ],
  marketplaceOrders: [] as any[],
  creatorEarningStats: {
    totalPaid: 458310,
    creatorsJoined: 1240,
    activeSubscribers: 89400,
    recentPayouts: [
      { id: "po-1", handle: "@elysia_quantum", amount: 1420.5, timestamp: "2026-05-29T10:00:00Z" },
      { id: "po-2", handle: "@zenith_ui", amount: 980.0, timestamp: "2026-05-29T08:30:00Z" },
      { id: "po-3", handle: "@pixelforge", amount: 2410.25, timestamp: "2026-05-28T18:15:00Z" }
    ]
  },
  aiGenerationsLog: [] as { id: string; prompt: string; tool: string; result: string; timestamp: string }[]
};

// GET blog posts
app.get("/api/blogs", (req, res) => {
  res.json(database.blogPosts);
});

// POST premium subscriber simulation
app.post("/api/membership/upgrade", (req, res) => {
  const { tier, email } = req.body;
  res.json({
    success: true,
    message: `Congratulations! ${email || "Your account"} has been successfully upgraded to Nexora ${tier} membership.`,
    tier,
    featuresLocked: false,
    payoutID: `NEX-${Math.floor(Math.random() * 900000 + 100000)}`
  });
});

// POST ad campaign creation
app.post("/api/ads/campaigns", (req, res) => {
  const { name, budget, placement } = req.body;
  if (!name || !budget || !placement) {
    return res.status(400).json({ error: "Missing required campaign parameters." });
  }

  const newCampaign = {
    id: `camp-${Date.now()}`,
    name,
    budget: Number(budget),
    spent: 0,
    status: "Active" as const,
    clicks: 1,
    impressions: 40,
    ctr: 2.5,
    placement,
    ctrHistory: [
      { date: "05-28", value: 2.5 }
    ]
  };

  database.adCampaigns.unshift(newCampaign);
  res.json({
    success: true,
    campaign: newCampaign,
    message: "Campaign launched successfully in Nexora Ad Network."
  });
});

// GET ad campaigns
app.get("/api/ads/campaigns", (req, res) => {
  res.json(database.adCampaigns);
});

// GET creator stats
app.get("/api/creator/stats", (req, res) => {
  res.json(database.creatorEarningStats);
});

// POST buy marketplace product simulation
app.post("/api/marketplace/purchase", (req, res) => {
  const { productId, title, price, buyerEmail } = req.body;

  const order = {
    orderId: `NXP-${Math.floor(Math.random() * 1000000 + 1000000)}`,
    productId,
    title,
    price,
    buyerEmail: buyerEmail || "user@nexora.network",
    timestamp: new Date().toISOString()
  };

  database.marketplaceOrders.unshift(order);
  res.json({
    success: true,
    message: `Purchase completed! You have acquired: ${title}. Download credentials generated.`,
    order
  });
});

// POST submit community comment or post
app.post("/api/blogs/create", (req, res) => {
  const { title, content, category, authorHandle, image } = req.body;

  if (!title || !content || !category) {
    return res.status(400).json({ error: "Title, content, and category are required." });
  }

  const newPost = {
    id: `blog-${Date.now()}`,
    title,
    excerpt: content.substring(0, 100) + "...",
    content,
    category,
    author: {
      name: authorHandle ? authorHandle.replace("@", "") : "Nexora Builder",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
      handle: authorHandle || "@nexora_member",
      isVerified: false
    },
    views: 42,
    likes: 1,
    publishedAt: new Date().toISOString(),
    image: image || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600",
    tags: [category.replace(" ", "")]
  };

  database.blogPosts.unshift(newPost);
  res.json({
    success: true,
    post: newPost,
    message: "Social blog published immediately onto the global content hub!"
  });
});

// POST AI Generation - Server-side Gemini API Proxy
app.post("/api/gemini/generate", async (req, res) => {
  const { prompt, toolType } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "No prompt query provided" });
  }

  const toolName = toolType || "General AI assistant";
  console.log(`Executing Nexora AI endpoint with tool [${toolName}] for prompt: "${prompt}"`);

  // Ensure prompt context aligns with futuristic utility
  let systemInstruction = "You are the Nexora Core AI engine representing a futuristic cybernetic service platform. Answer with high intelligence, professional authority, futuristic terminology, and structured Markdown layout.";
  if (toolType === "text-generator") {
    systemInstruction = `${systemInstruction} You are Nexora's AI Content Synthesizer. Help generate elite technical articles, creative narratives, or deep thoughts based on the user's intent. Preserve markdown headings, lists, and formatting.`;
  } else if (toolType === "marketing-generator") {
    systemInstruction = `${systemInstruction} You are Nexora's Viral Campaign Optimizer. Help construct high-CTR headlines, social captions, marketing hooks, and product descriptions that attract immediate consumer engagement. Focus on conversions.`;
  } else if (toolType === "coding-generator") {
    systemInstruction = `${systemInstruction} You are Nexora's Quantum Code Matrix Compiler. Translate requests into clean, highly optimized, professional code snippets. Add elegant explanations of code physics and time/space complexity analysis. Use markdown code block formatting.`;
  } else if (toolType === "seo-generator") {
    systemInstruction = `${systemInstruction} You are Nexora's SEO Hyper-Optimizer. Analyze the provided query/keywords, identify highest relevance synonyms, design an optimized metadata strategy (title tags, slug, meta descriptions), and suggest content structural guidelines.`;
  }

  // If Gemini client initialized and API key exists, call real Gemini API!
  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
        }
      });

      const generatedText = response.text || "No response received from Nexora AI neural cores.";
      
      // Log generation globally
      const genLog = {
        id: `gen-${Date.now()}`,
        prompt,
        tool: toolName,
        result: generatedText.substring(0, 300) + "...",
        timestamp: new Date().toISOString()
      };
      database.aiGenerationsLog.unshift(genLog);

      return res.json({
        success: true,
        result: generatedText,
        source: "Gemini 3.5 Neural Core"
      });
    } catch (apiError: any) {
      console.error("Gemini API call error:", apiError);
      // Fallback gracefully without throwing 500, informing client or using fallback simulation
      return res.json({
        success: true,
        result: getFallbackAiOutput(prompt, toolType),
        source: "Nexora Local Cyber-Co-Processor",
        warning: "Running in offline co-processing mode due to network payload restrictions."
      });
    }
  } else {
    // Local processing generator logic for mock/offline situations (highly responsive and beautifully styled fallback)
    const mockOutput = getFallbackAiOutput(prompt, toolType);
    return res.json({
      success: true,
      result: mockOutput,
      source: "Nexora Quantum Sandbox Emulator"
    });
  }
});

// POST AI Image Description & Generate prompt
app.post("/api/gemini/generate-image-prompts", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Missing image composition prompt." });
  }

  let finalImageUrl = `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800`; // elegant violet render default

  // Clean prompt for matching
  const query = prompt.toLowerCase();
  if (query.includes("cyberpunk") || query.includes("city") || query.includes("tokyo")) {
    finalImageUrl = "https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?auto=format&fit=crop&q=80&w=800"; // cyberpunk neon glowing city
  } else if (query.includes("robot") || query.includes("cyborg") || query.includes("ai")) {
    finalImageUrl = "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800"; // cool white cybernetic android
  } else if (query.includes("landscape") || query.includes("planet") || query.includes("space")) {
    finalImageUrl = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"; // cosmic grid networks
  } else if (query.includes("car") || query.includes("vehicle") || query.includes("speed")) {
    finalImageUrl = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800"; // abstract car speed trailing lines
  } else if (query.includes("girl") || query.includes("human") || query.includes("portrait")) {
    finalImageUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800"; // premium dynamic lighting cyber portrait
  } else {
    // Generate a beautiful dynamic abstract colored Unsplash based on query words
    const kw = query.split(" ").slice(0, 2).join(",") || "neon,abstract";
    finalImageUrl = `https://images.unsplash.com/featured/?${encodeURIComponent(kw)},abstract,dark,neon`;
  }

  // Generate an elegant text-based hyper-prompt using Gemini to enrich the user's experience
  let descriptiveDetails = `Designed high-intensity neon visualization of '${prompt}' mapping specular micro-reflections and volumetric particle nodes. Aspect configured to cosmic scale, with precise 1K chroma renders.`;
  
  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Given the user's basic image description: "${prompt}", create a highly detailed, cinematic sci-fi/cyberpunk prompt description for rendering software. Keep it under 80 words.`,
      });
      descriptiveDetails = response.text || descriptiveDetails;
    } catch {
      // Keep static default
    }
  }

  res.json({
    success: true,
    imageUrl: finalImageUrl,
    author: "Nexora Synthetics Division",
    expandedPrompt: descriptiveDetails,
    specs: "3072 x 3072 px • Neural Color Matrix • UHD HDR"
  });
});

// Fallback AI writer helper
function getFallbackAiOutput(prompt: string, toolType?: string) {
  const today = new Date().toLocaleDateString();
  
  if (toolType === "coding-generator") {
    return `### Nexora Quantum Sandbox Compiler
\`\`\`typescript
// Transpiled automatically from user request "${prompt}" on ${today}
// Optimized for hyper-parallel threadpools

export interface QuantumMatrix<T> {
  nodes: Map<string, T>;
  entropy: number;
}

export function initializeSandboxNode<T>(initialEntropy: number): QuantumMatrix<T> {
  console.log("⚡ [Nexora Core] Initializing high-throughput organic neuromorphic sub-threads.");
  return {
    nodes: new Map<string, T>(),
    entropy: Math.max(0, Math.min(1, initialEntropy)),
  };
}

export async function processHighFrequencyPacket<T>(
  packet: T,
  state: QuantumMatrix<T>
): Promise<QuantumMatrix<T>> {
  const correlationKey = \`nx-\${Date.now()}-\${Math.random().toString(36).substr(2, 5)}\`;
  state.nodes.set(correlationKey, packet);
  state.entropy = Math.max(0, state.entropy - 0.02); // converge stability
  return state;
}
\`\`\`

#### Metric Optimizations:
- **Time Complexity:** $\\mathcal{O}(1)$ insertion for active state tracking streams.
- **Memory Footprint:** Dynamic allocation mapping minimizes garbage collector cycles inside server VMs.`;
  }

  if (toolType === "marketing-generator") {
    return `### Nexora Viral Hook Package: "${prompt}"

#### 1. The Curiosity Magnet (CTR Prediction: 94%)
> "Flat tech is officially dead. Meet the hyper-immersion engine rewriting the rules of the web. This changes everything."

#### 2. The Direct Core Benefit (Conversion Prediction: 89%)
> "Stop wasting compute on legacy layouts. Power your entire creative ecosystem—AI, media, marketplaces, and monetization—using a single self-optimizing dark workspace. Start building the future now."

#### 3. High-Conversion Instagram/X Thread Hook
> "97% of digital creators are bottlenecked by legacy tooling budgets. 🧵
> Today, we're releasing the blueprints of a unified futuristic workflow that does the work of 7 different SaaS tools for a tenth of the price. 
> Enter Nexora. Here is how it functions:"

*Optimized for active social media delivery algorithms.*`;
  }

  if (toolType === "seo-generator") {
    return `### Nexora SEO Diagnostic Matrix for Query: "${prompt}"

#### 🎯 Primary Targeted Meta-Data
- **Recommended SEO Title:** Ultimate Guide to ${prompt} | Nexora Premium Tech
- **Meta Description:** Access real-time insights, tools, and developer platforms centered around ${prompt}. Optimize your tech stack instantly with Nexora.
- **URL Slug Suggestions:** \`/nexus/organic/${prompt.toLowerCase().replace(/[^a-z0-9]+/g, "-")}\`

#### 📈 Keyword Expansion Map
1. **"${prompt} AI synthesis"** (Search Volume: High, Competition: Med)
2. **"futuristic ${prompt} tools"** (Search Volume: Med, Competition: Low)
3. **"how to deploy ${prompt} sandbox"** (Search Volume: High, Competition: High)

#### 📝 Structural Headers Framework (H1-H3 Blueprint)
- **H1:** The Evolution of High-Performance ${prompt}
  - **H2:** Core Physics and Technological Sub-layers
  - **H3:** Leveraging Nexora's Distributed Infrastructure
  - **H2:** Step-by-Step Implementation and Deployment Node`;
  }

  return `### Nexora Digital Synthetic Response
Thank you for interacting with Nexora's cognitive backend. Your prompt: **"${prompt}"** has been synthesized by our cognitive neural cores. 

#### Abstract Insights
We are in a transitional phase where isolated, single-use SaaS tools are rapidly consolidating into unified Digital Service Platforms (DSPs). This all-in-one approach is not just convenient—it optimizes computational caches, removes cross-vendor subscription overhead, and allows unified AI models to reference your data holistically.

#### Nexora Recommendations
- **Platform Synergy:** Use our text and image AI outputs directly alongside the Digital Marketplace module to bundle courses or plugins instantly.
- **Traffic Amplification:** Leverage the Business Promotion campaign engine to seed generated templates instantly onto our Community Feed as sponsored cards.

*Synthesized on date: ${today} at standard local coordinates.*`;
}

// Vite static middleware integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware enabled.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static production folders.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Nexora Core running on http://localhost:${PORT}`);
  });
}

startServer();
