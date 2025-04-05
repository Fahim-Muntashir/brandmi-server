/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { PrismaClient } from "@prisma/client";
import emailTransporter from "../../config/emailTransport";
import otpEmail from "../../emails/otpEmail";
import { AppError } from "../../middleware/globalErrorHandler";

const prisma = new PrismaClient();

export const createUser = async (payload: any) => {
    // 1. Check if email already exists
    const existingUser = await prisma.user.findUnique({
        where: { email: payload.email },
    });

    if (existingUser) {
        throw new AppError("Email already registered", 400);
    }

    // 2. Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000);

    // 3. Save user and OTP in a transaction
    try {
        await prisma.$transaction(async (tx: any) => {

            const user = await tx.user.create({
                data: {
                    name: payload.name,
                    email: payload.email,
                    password: payload.password,
                    role: payload.role,
                    image: payload.image,
                    googleId: payload.googleId,
                    isvaryfied: false
                },
            });

            await tx.otpValidation.create({
                data: {
                    userId: user.id,
                    otpCode: otpCode.toString()
                },
            });
        });

        // 4. Send verification email
        try {
            await emailTransporter.sendMail(otpEmail(payload.email, otpCode));
            console.log("Email has been sent!");
        } catch (error) {
            console.error("Email sending failed", error);
        }

        // 5. Return public user data
        return {
            name: payload.name,
            email: payload.email,
            role: payload.role
        };

    } catch (error: any) {
        throw new AppError("User creation failed", 500);
    }
};

export const myProfile = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    if (!user) {
        throw new AppError("Sorry! There is no user", 401);
    }

    return user;
};
export const UserServices = {
    createUser,
    myProfile
};
