import mongoose, { Document, Schema } from 'mongoose';
export type UserRole = "buyer" | "seller"

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    role: UserRole;
    googleId?: string;
    image?: string;
    isvaryfied: boolean;
    // comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    image: { type: String },
    role: { type: String, enum: ['buyer', 'seller'] },
    googleId: { type: String },
    isvaryfied: { type: Boolean, default: false }
}, {
    timestamps: true
});





export const User = mongoose.model<IUser>('User', userSchema);
