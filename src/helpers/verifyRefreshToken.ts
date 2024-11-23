import { config } from "../config";
import jwt from "jsonwebtoken"
import { JWTPayload } from "./generateToken";
import { User } from "../modules/model/user.model";
import { AppError } from "../middleware/globalErrorHanlde";
export const verifyRefreshToken = async (token: string): Promise<JWTPayload> => {
    try {
        const decoded = jwt.verify(
            token,
            config.REFRESH_TOKEN_SECRET as string
        ) as JWTPayload;

        const user = await User.findById(decoded.userId);
        if (!user) {
            throw new AppError('User no longer exists.', 401);
        }

        return {
            userId: user._id,
            role: user.role,
            userName: user.name,
            email: user.email
        };
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new AppError('Refresh token has expired. Please log in again.', 401);
        }
        if (error instanceof jwt.JsonWebTokenError) {
            throw new AppError('Invalid refresh token. Please log in again.', 401);
        }
        throw error;
    }
};