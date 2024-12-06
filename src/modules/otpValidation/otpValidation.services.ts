import { AppError } from "../../middleware/globalErrorHandler"
import { User } from "../user/user.model"
import { IOtpValidation } from "./otpValidation.interface"
import OtpValidationModel from "./otpValidation.model"

const verifyOtp = async (payload: IOtpValidation) => {
    const { otpCode } = payload

    const isVerify = await OtpValidationModel.findOne({ otpCode: otpCode })
    if (!isVerify) throw new AppError("validation failed", 401)
    //  change isValidation false to true;
    const getUser = await User.findById(isVerify.userId)
    if (!getUser) throw new AppError("Please create an account", 401)
    getUser.isvaryfied = true;
    await getUser.save()
    return



}


export const OtpValidationServices = {
    verifyOtp
}