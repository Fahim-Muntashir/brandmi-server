import mongoose, { Schema, Model } from 'mongoose';
import { ISellerProfile } from './sellerProfile.interface';

const sellerProfileSchema = new Schema<ISellerProfile>(
  {
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    country: {
      type: String,
      default: '',
    },
    company: {
      type: String,
      default: '',
    },
    age: {
      type: Number,
      min: 18,
      max: 100,
      default: null,
    },
    phone: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    nip: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    socialLinks: {
      twitter: {
        type: String,
        default: '',
      },
      linkedin: {
        type: String,
        default: '',
      },
      facebook: {
        type: String,
        default: '',
      },
    },
    skills: {
      type: [String],
      default: [],
    },
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Service',
      },
    ],
    portfolio: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Portfolio',
      },
    ],
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

// Export the Mongoose Model
export const SellerProfile: Model<ISellerProfile> = mongoose.model<ISellerProfile>(
  'SellerProfile',
  sellerProfileSchema
);
