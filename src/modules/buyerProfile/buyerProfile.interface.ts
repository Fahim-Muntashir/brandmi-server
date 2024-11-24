import { Document, Types } from "mongoose";

export type TStatus = "deleted" | "inactive" | "active";
// Interface for Social Links
interface SocialLinks {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
}
export interface IBuyerProfile extends Document {
    userId: Types.ObjectId; // reference will come form user collection
    country: string;
    companyName: string;
    age: number;
    interests: string[];
    phoneNumber: number;
    bio: string;
    reviewTotal: number;
    socialLinks: SocialLinks
    status: TStatus
}
