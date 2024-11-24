import { Document, Types } from 'mongoose';

// Interface for Social Links
interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  facebook?: string;
}

// Interface for Seller Profile
export interface ISellerProfile extends Document {
  userId: Types.ObjectId; // Reference to the User model
  country: string;
  company: string;
  age: number | null;
  phone: string;
  title: string;
  nip: string;
  description: string;
  totalReviews: number;
  socialLinks: SocialLinks;
  skills: string[];
  services: Types.ObjectId[]; // References to the Service model
  portfolio: Types.ObjectId[]; // References to the Portfolio model
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}
