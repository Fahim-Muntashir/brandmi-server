import { Router } from "express";
import { OtpValidationControllers } from "./otpValidation.controllers";

const router = Router()

router.post("/otp-verification", OtpValidationControllers.verifyOtp)

export const OtpValidationRoutes = router