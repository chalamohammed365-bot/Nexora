/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  FileText, Heart, Eye, ArrowUp, MessageSquare, Plus, 
  Sparkles, Globe, Share2, CornerDownRight 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BlogPost } from "../types";

export default function TrendingContentHub() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Custom social blog publish states
  const [isCompiling, setIsCompiling] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCat, setNewCat] = useState("AI News");
  const [authorHandle, setAuthorHandle] = useState("");

  // Likes tracking state
  const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/blogs");
      const data = await res.json();
      setBlogs(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleLike = (postId: string) => {
    const isLiked = likedPosts[postId];
    setLikedPosts(prev => ({ ...prev, [postId]: !isLiked }));
    setBlogs(prev => prev.map(b => {
      if (b.id === postId) {
        return {
          ...b,
          likes: isLiked ? b.likes - 1 : b.likes + 1
        };
      }
      return b;
    }));
  };

  const handlePublishPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    setIsCompiling(true);
    try {
      const response = await fetch("/api/blogs/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          content: newContent,
          category: newCat,
          authorHandle: authorHandle || "@cyber_builder"
        }),
      });
      const data = await response.json();

      if (data.success) {
        setBlogs((prev) => [data.post, ...prev]);
        setNewTitle("");
        setNewContent("");
        setAuthorHandle("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsCompiling(false);
    }
  };

  return (
    <section id="trending-hub" className="py-24 px-4 md:px-8 bg-[#050510] relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Globe className="h-4.5 w-4.5 text-purple-400" />
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-purple-400 font-bold bg-purple-500/10 px-4 py-1.5 rounded-full border border-purple-500/20">
              Distributed Information Ledger
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white">
            Trending Content<br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Hub
            </span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base font-light">
            Review synthetic news publications, creative design philosophies, and algorithmic updates. Share your ideas directly into our community nodes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Feed Column - 7/12 Columns */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-500 block text-left pl-1">
              Global Content Streams
            </span>

            {loading ? (
              <div className="text-center py-10 font-mono text-xs text-slate-500">Connecting feed registers...</div>
            ) : (
              <div className="space-y-6">
                {blogs.map((post) => {
                  const isLiked = likedPosts[post.id];
                  return (
                    <article
                      key={post.id}
                      className="p-6 bg-white/5 border border-white/10 [backdrop-filter:blur(12px)] rounded-[32px] space-y-4 text-left transition-all hover:border-purple-500/30 shadow-20"
                    >
                      {/* Post Header / Author info */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-10 h-10 rounded-full object-cover border border-white/10"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <div className="flex items-center gap-1">
                              <span className="text-xs font-semibold text-white">{post.author.name}</span>
                              {post.author.isVerified && (
                                <span className="h-2 w-2 rounded-full bg-cyan-400" title="Verified Creator" />
                              )}
                            </div>
                            <span className="text-[10px] text-gray-500 font-mono block">{post.author.handle}</span>
                          </div>
                        </div>

                        <span className="text-[9px] bg-white/2 border border-white/5 px-2.5 py-1 rounded font-mono text-purple-400 tracking-wider uppercase">
                          {post.category}
                        </span>
                      </div>

                      {/* Post Content */}
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-white hover:text-purple-300 transition-colors">
                          {post.title}
                        </h3>
                        
                        {post.image && (
                          <div className="w-full h-44 rounded-xl overflow-hidden border border-white/5 relative">
                            <img 
                              src={post.image} 
                              alt="visual concept" 
                              className="w-full h-full object-cover object-center brightness-75"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        )}

                        <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-light whitespace-pre-line">
                          {post.content}
                        </p>
                      </div>

                      {/* Post tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {post.tags.map(t => (
                          <span key={t} className="text-[9px] font-mono text-gray-500">
                            #{t}
                          </span>
                        ))}
                      </div>

                      {/* Controls footer */}
                      <div className="flex items-center gap-6 pt-3 border-t border-white/5 text-gray-500 font-mono text-xs">
                        <button
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                            isLiked ? "text-pink-400 font-bold" : "hover:text-pink-400"
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${isLiked ? 'fill-pink-500 text-pink-400' : ''}`} />
                          <span>{post.likes}</span>
                        </button>

                        <div className="flex items-center gap-1.5">
                          <Eye className="h-4 w-4" />
                          <span>{post.views.toLocaleString()}</span>
                        </div>

                        <span className="text-[10px] text-gray-600 font-mono ml-auto">
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>

          {/* Social publishing form - 5/12 Columns */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-500 block text-left pl-1">
              Publish Community Node
            </span>

            <form
              onSubmit={handlePublishPost}
              className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] relative text-left space-y-4 shadow-20"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl pointer-events-none" />

              <div className="space-y-1">
                <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-widest block">
                  Write Social Chronicle
                </span>
                <p className="text-[10px] text-slate-400">
                  Transmit news, abstract writeups, or layout proposals onto the Nexora informational matrix instantly.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] text-slate-400 font-mono tracking-wider block">HANDLE NAME</label>
                <input
                  required
                  type="text"
                  value={authorHandle}
                  onChange={(e) => setAuthorHandle(e.target.value)}
                  placeholder="e.g. @cyber_builder"
                  className="w-full bg-black/40 rounded-xl text-xs text-white px-3.5 py-3 border border-white/10 focus:border-purple-500 outline-none font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] text-slate-400 font-mono tracking-wider block">PUBLICATION HEADLINE</label>
                <input
                  required
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. The Quantum Compiler Renaissance"
                  className="w-full bg-black/40 rounded-xl text-xs text-white px-3.5 py-3 border border-white/10 focus:border-purple-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] text-slate-400 font-mono tracking-wider block">CATEGORY</label>
                  <select
                    value={newCat}
                    onChange={(e: any) => setNewCat(e.target.value)}
                    className="w-full bg-black/40 rounded-xl text-xs text-white px-3 py-3 border border-white/10 focus:border-purple-500 outline-none font-mono cursor-pointer"
                  >
                    <option value="AI News">AI News</option>
                    <option value="Quantum Tech">Quantum Tech</option>
                    <option value="Design Systems">Design Systems</option>
                    <option value="Creator Economics">Creator Economics</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={isCompiling || !newTitle.trim() || !newContent.trim()}
                    className={`w-full py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-black rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                      isCompiling || !newTitle.trim() || !newContent.trim()
                        ? "bg-white/5 text-slate-600 border border-white/5 cursor-not-allowed"
                        : "bg-purple-400 hover:bg-purple-500 hover:shadow-[0_0_15px_rgba(167,139,250,0.4)]"
                    }`}
                  >
                    {isCompiling ? "Compiling..." : "Transmit"}
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] text-slate-400 font-mono tracking-wider block">BODY TRANSCRIPT</label>
                <textarea
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Transcribe content topics, design manifestos, and core insights..."
                  className="w-full min-h-[140px] bg-black/40 rounded-xl text-xs text-white px-3.5 py-3 border border-white/10 focus:border-purple-500 outline-none resize-none leading-relaxed"
                />
              </div>

              <div className="p-3 bg-purple-950/20 border border-purple-500/10 rounded-xl">
                <span className="text-[10px] text-purple-300 font-light leading-relaxed block">
                  Your node is secured immediately. No moderation queue blocks high frequency publication.
                </span>
              </div>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
