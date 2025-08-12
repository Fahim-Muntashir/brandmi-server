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
    packages: [
      {
        type: {
          type: String,
          enum: ["basic", "Standard", "premium"],
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        duration: {
          type: String,
          required: true,
        },
        features: {
          type: [String],
          required: true,
        },
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    images: {
      type: [String], // Array of image URLs (service-related images)
      default: [],
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "SellerProfile",
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

export const Gig: Model<IGig> = mongoose.model<IGig>("Gig", gigSchema);
