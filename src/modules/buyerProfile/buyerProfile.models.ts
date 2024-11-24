import { model, Schema } from "mongoose";
import { IBuyerProfile } from "./buyerProfile.interface";



// Define the schema for Buyer Profile
const BuyerProfileSchema = new Schema<IBuyerProfile>({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User ' }, // reference
    country: { type: String, required: true },
    companyName: { type: String, required: true },
    age: { type: Number, required: true, min: 18 },
    interests: { type: [String], required: true },
    phoneNumber: { type: Number, required: true },
    bio: { type: String, required: true },
    reviewTotal: { type: Number, default: 0 },
    socialLinks: {
        twitter: { type: String },
        linkedin: { type: String },
        facebook: { type: String }
    },
    status: { type: String, enum: ['deleted', 'inactive', 'active'], default: 'active' }
});

// Create the model based on the schema
const BuyerProfileModel = model<IBuyerProfile>('BuyerProfile', BuyerProfileSchema);

export default BuyerProfileModel;