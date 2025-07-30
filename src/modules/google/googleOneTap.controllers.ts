import { OAuth2Client } from "google-auth-library";
import { config } from "../../config";
import { catchAsync } from "../../helpers/catchAsync";
import { sendResponse } from "../../helpers/sendResponse";
import { AppError } from "../../middleware/globalErrorHandler";
import { generateTokens } from "../../helpers/generateToken";
import { PrismaClient } from "@prisma/client";
const client = new OAuth2Client(config.GOOGLE_CLIENT_ID,);

const prisma = new PrismaClient();
const googleOneTapLogin = catchAsync(async (req, res) => {

    const { idToken } = req.body
    console.log("idToken", req.body);

    if (!idToken) {
        throw new AppError("ID Token is required", 400)
    }
    // Verify the Google ID token
    const ticket = await client.verifyIdToken({
        idToken,
        audience: config.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload) throw new AppError("ID Token is required", 400)
    const { email } = payload;

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new AppError("USER_NOT_FOUND", 400);
    }

    const jwtPayload = {
        userId: user.id,
        userName: user.name,
        role: user.role,
        image: user?.image,
        email: user.email,
    };

    const accessToken = generateTokens({
        user: jwtPayload,
        secretToken: config.ACCESS_TOKEN_SECRET as string,
        expiredDate: config.ACCESS_TOKEN_EXPIRED as string,
    });

    const refreshToken = generateTokens({
        user: jwtPayload,
        secretToken: config.REFRESH_TOKEN_SECRET as string,
        expiredDate: config.REFRESH_TOKEN_EXPIRED as string,
    });

    // Set the tokens in cookies
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });


    sendResponse(res, {
        status: 201,
        success: true,
        message: 'login successfully',
        data: null,
    });
});


export const GoogleOneTap = {
    googleOneTapLogin
}