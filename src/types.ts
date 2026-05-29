/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  isCreator: boolean;
  followersCount: number;
  followingCount: number;
  totalEarnings: number;
  isVerified: boolean;
  tier: "Free" | "Pro" | "Business" | "Enterprise";
  joinedDate: string;
}

export interface AIService {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: "text" | "image" | "video" | "seo" | "marketing" | "code";
  iconName: string;
  glowColor: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    handle: string;
    isVerified: boolean;
  };
  views: number;
  likes: number;
  publishedAt: string;
  image: string;
  tags: string[];
}

export interface VideoPost {
  id: string;
  title: string;
  creator: {
    name: string;
    avatar: string;
    handle: string;
  };
  duration: string;
  views: string;
  likes: number;
  comments: number;
  tags: string[];
  thumbnail: string;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  category: "Templates" | "Themes" | "Plugins" | "Courses" | "AI Assets";
  price: number;
  rating: number;
  sales: number;
  author: string;
  image: string;
  tags: string[];
  features: string[];
}

export interface AdCampaign {
  id: string;
  name: string;
  budget: number;
  spent: number;
  status: "Active" | "Paused" | "Completed" | "Pending";
  clicks: number;
  impressions: number;
  ctr: number;
  placement: "Sidebar" | "Banner" | "Sponsored Feed" | "Video In-stream";
  ctrHistory: { date: string; value: number }[];
}

export interface PlatformStat {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  glowColor: string;
}

export interface NotificationItem {
  id: string;
  type: "info" | "success" | "warning" | "alert";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface Testimony {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  glow: string;
}
