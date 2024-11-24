import mongoose, { Schema, Model } from 'mongoose';
import { IService } from './service.interface';

const serviceSchema = new Schema<IService>(
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
          enum: ['basic', 'premium'],
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
      ref: 'SellerProfile',
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

export const Service: Model<IService> = mongoose.model<IService>('Service', serviceSchema);
