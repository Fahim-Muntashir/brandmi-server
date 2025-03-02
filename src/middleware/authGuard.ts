/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppError } from "./globalErrorHandler";
import { catchAsync } from "../helpers/catchAsync";
import { User } from "../modules/user/user.model";
import verifyAccessToken from "../helpers/veryfyAccessToken";

export const authMiddleware = (allowedRoles: string[]) => {
    return catchAsync(async (req, res, next) => {
        // Get token from headers
        const token = req.headers.authorization;

        // Check if token exists
        if (!token) {
            throw new AppError("No authorization token provided", 401);
        }

        // Verify JWT token
        const decoded = verifyAccessToken(token);
        const { userId } = decoded;

        // Check if user exists in the database
        const user = await User.findById(userId);

        if (!user) {
            throw new AppError("User does not exist", 401);
        }

        // Check if the user's role is allowed
        if (!allowedRoles.includes(user.role)) {
            throw new AppError("You do not have permission to access this resource", 403);
        }

        // Attach user ID and role to the request object
        req.userId = userId;
        req.userRole = user.role;

        // Proceed to the next middleware or controller
        next();
    });
};