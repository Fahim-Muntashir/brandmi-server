import jwt from "jsonwebtoken";
import { config } from "../config";
import { AppError } from "../middleware/globalErrorHanlde";
import { JWTPayload } from "./generateToken";

const verifyAccessToken = (token: string): JWTPayload => {
    try {
        return jwt.verify(token, config.ACCESS_TOKEN_SECRET as string) as JWTPayload;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw error; // Let the caller handle expired tokens
        }
        throw new AppError('Invalid access token.', 401);
    }
};


export default verifyAccessToken