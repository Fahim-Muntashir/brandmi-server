import mongoose, { Document, Schema } from 'mongoose';


export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    role: 'user' | 'admin';
    googleId?: string;
    // comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    googleId: { type: String }
}, {
    timestamps: true
});





export const User = mongoose.model<IUser>('User', userSchema);
