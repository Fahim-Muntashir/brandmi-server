/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppError } from "../../middleware/globalErrorHandler"

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const verifyOtp = async (payload: any) => {
    const otpCode = (payload.otpCode);
    console.log("Received OTP:", otpCode);

    // 1. Find OTP entry
    const otpEntry = await prisma.otpValidation.findFirst({
        where: { otpCode: String(otpCode) },
    });
    console.log(otpEntry);

    if (!otpEntry) {
        throw new AppError("Validation failed", 401);
    }

    // 2. Get the user
    const user = await prisma.user.findUnique({
        where: { id: otpEntry.userId },
    });

    if (!user) {
        throw new AppError("Please create an account", 401);
    }

    // 3. Update isvaryfied to true
    await prisma.user.update({
        where: { id: user.id },
        data: { isvaryfied: true },
    });

    // 4. (Optional) Remove OTP after use
    await prisma.otpValidation.delete({
        where: { id: otpEntry.id },
    });

    return { message: "OTP verified successfully" };
};




export const OtpValidationServices = {
    verifyOtp
}