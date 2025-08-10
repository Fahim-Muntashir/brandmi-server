import mongoose from "mongoose";

export interface ISellerProfile {
  userId: mongoose.Types.ObjectId;
  title?: string;
  description?: string;
  skills: string[];
  languages: {
    name: string;
    level: "basic" | "conversational" | "fluent" | "native";
  }[];
  services: mongoose.Types.ObjectId[];
  portfolio: mongoose.Types.ObjectId[];
  totalReviews: number;
  completedOrders: number;
  totalEarnings: number;
  badges: string[];
  isVerified: boolean;
  availability: {
    isAvailable: boolean;
    nextAvailableDate?: Date;
  };
  status: "active" | "inactive";
}
