import { catchAsync } from "../../helpers/catchAsync"
import { sendResponse } from "../../helpers/sendResponse"
import { OtpValidationServices } from "./otpValidation.services"

const verifyOtp = catchAsync(async (req, res) => {
    console.log("hi");


    await OtpValidationServices.verifyOtp(req.body)



    sendResponse(res, {
        success: true,
        status: 201,
        message: "validation success!",
        data: null
    })


}
)


export const OtpValidationControllers = {
    verifyOtp
}