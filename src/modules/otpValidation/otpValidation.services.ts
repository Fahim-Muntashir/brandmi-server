/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppError } from "../../middleware/globalErrorHandler"
import { User } from "../user/user.model";
import OtpValidationModel from "./otpValidation.model";


export const verifyOtp = async (payload: any) => {
    const otpCode = (payload.otpCode);
    console.log("Received OTP:", otpCode);

    // 1. Find OTP entry
    const otpEntry = await OtpValidationModel.findOne({
        otpCode: payload.otpCode
    })
    console.log(otpEntry);

    if (!otpEntry) {
        throw new AppError("Validation failed", 401);
    }

    // 2. Get the user
    const user = await User.findOne({
        _id: otpEntry.userId,
    });

    if (!user) {
        throw new AppError("Please create an account", 401);
    }

    await User.findByIdAndUpdate(user._id, { isvaryfied: true });
    // 4. (Optional) Remove OTP after use
    await OtpValidationModel.deleteOne({ _id: otpEntry.id });


    return { message: "OTP verified successfully" };
};




export const OtpValidationServices = {
    verifyOtp
}