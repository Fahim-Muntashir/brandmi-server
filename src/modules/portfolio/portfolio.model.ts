import mongoose, { Schema, Model } from "mongoose";

export interface IPortfolio {
  sellerId: mongoose.Types.ObjectId;
  image: string;
  link?: string;
  title: string;
  description?: string;
}

const portfolioSchema = new Schema<IPortfolio>(
  {
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "SellerProfile",
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    description: {
      type: String,
      default: "",
      maxlength: 300,
    },
  },
  {
    timestamps: true,
  }
);

export const Portfolio: Model<IPortfolio> = mongoose.model<IPortfolio>(
  "Portfolio",
  portfolioSchema
);
