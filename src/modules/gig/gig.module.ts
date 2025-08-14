import mongoose, { Schema, Model } from "mongoose";
import { IGig } from "./gig.interface";

const gigSchema = new Schema<IGig>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },

    tags: {
      type: [String],
      default: [],
    },
    pricing: {
      basicPackage: {
        name: { type: String, required: true },
        description: { type: String, required: true },
        deliveryTime: { type: Number, required: true },
        price: { type: Number, required: true },
        revisions: { type: Number, required: true },
      },
      standardPackage: {
        name: { type: String, required: true },
        description: { type: String, required: true },
        deliveryTime: { type: Number, required: true },
        price: { type: Number, required: true },
        revisions: { type: Number, required: true },
      },
      premiumPackage: {
        name: { type: String, required: true },
        description: { type: String, required: true },
        deliveryTime: { type: Number, required: true },
        price: { type: Number, required: true },
        revisions: { type: Number, required: true },
      },
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    images: {
      type: [String],
      default: [],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "SellerProfile",
      required: true,
    },
    status: {
      type: String,
      enum: ["deleted", "pending", "pause", "active"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const Gig: Model<IGig> = mongoose.model<IGig>("Gig", gigSchema);
