import { Document, Types } from 'mongoose';

// Interface for Package (Basic and Premium)
interface Package {
  type: 'basic' | 'premium'; // Type of the package
  price: number; // Price of the package
  duration: string; // Duration of the package (e.g., '1 week', '1 month')
  features: string[]; // List of features in the package
}

export interface IService extends Document {
  title: string;
  description: string;
  category: string;
  tags: string[];
  packages: Package[]; // Array of packages (basic, premium, etc.)
  averageRating: number;
  totalReviews: number;
  images: string[]; // Array to store image URLs for service
  sellerId: Types.ObjectId; // Reference to the Seller
  createdAt: Date;
  updatedAt: Date;
}
