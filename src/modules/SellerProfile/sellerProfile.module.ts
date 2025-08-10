import mongoose, { Model, Schema } from "mongoose";
import { ISellerProfile } from "./sellerProfile.interface";

const sellerProfileSchema = new Schema<ISellerProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    skills: { type: [String], default: [] },
    languages: [
      {
        name: { type: String, required: true },
        level: {
          type: String,
          enum: ["basic", "conversational", "fluent", "native"],
          required: true,
        },
      },
    ],
    services: [{ type: Schema.Types.ObjectId, ref: "Service" }],
    portfolio: [{ type: Schema.Types.ObjectId, ref: "Portfolio" }],
    totalReviews: { type: Number, default: 0 },
    completedOrders: { type: Number, default: 0 },
    totalEarnings: { type: Number, default: 0 },
    badges: { type: [String], default: [] },
    isVerified: { type: Boolean, default: false },
    availability: {
      isAvailable: { type: Boolean, default: true },
      nextAvailableDate: { type: Date, default: null },
    },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

// Index for skills search
sellerProfileSchema.index({ skills: 1 });

export const SellerProfile: Model<ISellerProfile> = mongoose.model(
  "SellerProfile",
  sellerProfileSchema
);
