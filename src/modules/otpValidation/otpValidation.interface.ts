import { Types } from "mongoose";

export interface IOtpValidation extends Document {
    userId: Types.ObjectId;
    otpCode: number;
    createdAt: Date;
}