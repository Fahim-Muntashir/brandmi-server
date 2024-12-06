/* eslint-disable @typescript-eslint/no-explicit-any */
import verifyAccessToken from "../helpers/veryfyAccessToken";
import { AppError } from "./globalErrorHandler";
import { catchAsync } from "../helpers/catchAsync";
import { User } from "../modules/user/user.model";



export const authMiddleware = () => {
    return catchAsync(async (req, res, next) => {

        // Get token from cookies
        const token = req.headers.authorization

        // Check if token exists
        if (!token) {
            throw new AppError("No authorization token provided", 401)
        }

        // Verify JWT token
        const decoded = verifyAccessToken(token)
        const { userId } = decoded
        // Check if user exists in database
        const user = await User.findById(userId);

        if (!user) {
            throw new AppError("User not exit", 401)
        }
        // role based permission
        // Attach user ID to request object
        req.userId = userId

        // Proceed to controllers
        next();


    }

    )
}

