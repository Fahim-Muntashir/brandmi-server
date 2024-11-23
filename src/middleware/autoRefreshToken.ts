/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { User } from "../modules/model/user.model";
import { generateTokens } from "../helpers/generateToken";
import { catchAsync } from "../helpers/catchAsync";
import { AppError } from "./globalErrorHanlde";
import verifyAccessToken from "../helpers/veryfyAccessToken";
import { verifyRefreshToken } from "../helpers/verifyRefreshToken";

const autoRefreshToken = catchAsync(async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    // No tokens present
    if (!accessToken || !refreshToken) {
        throw new AppError("No authentication tokens found. Please log in.", 401);
    }

    try {
        // Attempt to verify access token
        verifyAccessToken(accessToken);
        req.headers["authorization"] = accessToken;
        return next(); // Token is valid, proceed
    } catch (error) {
        // Access token is invalid or expired, attempt refresh
        if (error instanceof jwt.TokenExpiredError) {
            try {
                // Verify refresh token and get user
                const user = await verifyRefreshToken(refreshToken);

                // Generate new access token
                const newAccessToken = generateTokens({
                    user: user,
                    secretToken: config.ACCESS_TOKEN_SECRET as string,
                    expiredDate: config.ACCESS_TOKEN_EXPIRED as string,
                });

                // Set new access token in cookies
                res.cookie("accessToken", newAccessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                });

                req.headers["authorization"] = newAccessToken;

                return next();
            } catch (refreshError) {
                // Default handling if no custom handler
                res.clearCookie("accessToken");
                res.clearCookie("refreshToken");

                throw refreshError;
            }
        }
        throw error;
    }
});

export default autoRefreshToken;
