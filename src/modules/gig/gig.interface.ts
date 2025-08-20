import { Document, Types } from "mongoose";

// Interface for Package (Basic and Premium)
interface Package {
  type: "basic" | "standard" | "premium"; // Type of the package
  price: number; // Price of the package
  duration: string; // Duration of the package (e.g., '1 week', '1 month')
  features: string[]; // List of features in the package
}

export type GigStatus = "deleted" | "pending" | "paused" | "active";

export interface IGig extends Document {
  title: string;
  description: {
    description: string;
    faqs: string[];
    requirements: string[];
  };
  category: string;
  tags: string[];
  pricing: Package[]; // Array of packages (basic, premium, etc.)
  averageRating: number;
  totalReviews: number;
  images: string[]; // Array to store image URLs for service
  userId: Types.ObjectId; // Reference to the Seller
  status?: GigStatus; // optional when creating, defaults to pending
  createdAt: Date;
  updatedAt: Date;
}
