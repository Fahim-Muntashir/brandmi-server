/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import emailTransporter from "../../config/emailTransport";
import otpEmail from "../../emails/otpEmail";
import { AppError } from "../../middleware/globalErrorHandler";
import OtpValidationModel from "../otpValidation/otpValidation.model";
import { IUser, User } from "./user.model";


export const createUser = async (payload: IUser) => {
    // 1. Check if email already exists
    const existingUser = await User.findOne({ email: payload.email });
    if (existingUser) {
        throw new AppError("Email already registered", 400);
    }

    // 2. Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000);

    // 3. Save user and OTP using Mongoose transaction
    const session = await User.startSession();
    session.startTransaction();

    try {
        // Create user
        const newUser = await new User({
            name: payload.name,
            email: payload.email,
            password: payload.password,
            role: payload.role,
            image: payload.image,
            googleId: payload.googleId,
            isverified: false, // Make sure this field matches your schema
        }).save({ session });

        // Save OTP
        await new OtpValidationModel({
            userId: newUser._id,
            otpCode: otpCode.toString(),
        }).save({ session });

        // Commit transaction
        await session.commitTransaction();
        session.endSession();

        // 4. Send verification email
        try {
            await emailTransporter.sendMail(otpEmail(payload.email, otpCode));
            console.log("Email has been sent!");
        } catch (error) {
            console.error("Email sending failed", error);
        }

        // 5. Return public user data
        return {
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
        };

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw new AppError("User creation failed", 500);
    }
};

export const myProfile = async (userId: string) => {

    const user = await User.findById({
        userId
    })

    if (!user) {
        throw new AppError("Sorry! There is no user", 401);
    }

    return user;
};
export const UserServices = {
    createUser,
    myProfile
};
