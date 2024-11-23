import { Response } from "express";
import { config } from "../../config";
import { generateTokens } from "../../helpers/generateToken";
import { AppError } from "../../middleware/globalErrorHanlde";
import { IAuth } from "./auth.mdel";
import { User } from "../user/user.model";

const loginUser = async (payload: IAuth, res: Response) => {
    const { email, password } = payload;

    //  validate user
    const user = await User.findOne({ email });
    if (!user || !user.password) {
        throw new AppError("Invalid credentials", 401)
    }

    const isValid = user.password === password;
    if (!isValid) {
        throw new AppError("Invalid credentials", 401)

    }

    //  access token
    const jwtPayload = {
        userId: user._id,
        userName: user.name,
        role: user.role,
        email: user.email
    }
    const accessToken = generateTokens({ user: jwtPayload, secretToken: config.ACCESS_TOKEN_SECRET as string, expiredDate: config.ACCESS_TOKEN_EXPIRED as string })
    const refreshToken = generateTokens({ user: jwtPayload, secretToken: config.REFRESH_TOKEN_SECRET as string, expiredDate: config.REFRESH_TOKEN_EXPIRED as string })

    // set refresh token in browser cookies
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
    });
    res.cookie('accessToken', accessToken, {
        // httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
    });


    return user
}



export const AuthServices = {
    loginUser,
}