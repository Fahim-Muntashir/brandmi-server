import jwt from "jsonwebtoken"
import { config } from "../config";
import { JWTPayload } from "./generateToken";




interface RefreshTokenResult {
    success: boolean;
    message: string;
    tokenDetails?: JWTPayload;
}

const generateRefreshToken = async (token: string): Promise<RefreshTokenResult> => {
    try {
        // Check if refresh token exists
        if (!token) {
            return {
                success: false,
                message: "No refresh token provided"
            };
        }

        // Verify refresh token
        const decoded = jwt.verify(token, config.REFRESH_TOKEN_SECRET as string) as JWTPayload;

        // You might want to add additional checks here, such as:
        // - Check token expiration
        // - Validate user still exists

        return {
            success: true,
            message: "Token is valid",
            tokenDetails: decoded
        };
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return {
                success: false,
                message: "Refresh token has expired. Please login again."
            };
        }

        if (error instanceof jwt.JsonWebTokenError) {
            return {
                success: false,
                message: "Invalid refresh token"
            };
        }

        return {
            success: false,
            message: "Error validating refresh token"
        };
    }
}

export default generateRefreshToken;