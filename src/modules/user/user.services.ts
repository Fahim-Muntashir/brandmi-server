/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";
import emailTransporter from "../../config/emailTransport";
import otpEmail from "../../emails/otpEmail";
import { AppError } from "../../middleware/globalErrorHandler";
import OtpValidationModel from "../otpValidation/otpValidation.model";
import { IUser, User } from "./user.model";
const createUser = async (payload: IUser) => {
    // 1. User validation
    const existingUser = await User.findOne({ email: payload.email });
    if (existingUser) {
        throw new AppError("Email already registered", 400);
    }

    // 2. Generate a six-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000);

    // 3. Save user and OTP code using a transaction
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const user = new User({ ...payload });
        await user.save({ session });

        await new OtpValidationModel({
            userId: user._id,
            otpCode: otpCode
        }).save({ session });

        await session.commitTransaction();
        session.endSession();

        // 4. Send verification email
        try {
            await emailTransporter.sendMail(otpEmail(payload.email, otpCode));
            console.log("Email has been sent!");
        } catch (error) {
            console.error("Email sending failed", error);
            // Log the error, but don't abort if user creation was successful
        }

        // 5. Return the user object
        return {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw new AppError("User creation failed", 500);
    }
};





const myProfile = async (userId: string) => {
    const user = await User.findById(userId)

    if (!user) {
        throw new AppError("Sorry! There is no user", 401)
    }
    return user
}



export const UserServices = {
    createUser, myProfile
}