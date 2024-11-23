import { Request, Response } from "express";
import { User } from "../model/user.model";
import { generateTokens } from "../../helpers/generateToken";
import { config } from "../../config";
import generateRefreshToken from "../../helpers/generateRefreshToken";
import { catchAsync } from "../../helpers/catchAsync";
import { AppError } from "../../middleware/globalErrorHanlde";
import { sendResponse } from "../../helpers/sendResponse";

const createUser = catchAsync(async (req: Request, res: Response) => {

    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new AppError("Email already registered", 400)
    }

    // Create new user
    const user = new User({
        name,
        email,
        password,
        role: 'user'
    });

    await user.save();

    //   const { accessToken, refreshToken } = generateTokens(user._id, user.role);

    // Set refresh token as HTTP-only cookie
    //   res.cookie('refreshToken', refreshToken, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === 'production',
    //     maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    //   });



    sendResponse(res, {
        success: true,
        status: 201,
        message: "user created successfully",
        data: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        },
    })


}
)

const loginUser = catchAsync(async (req: Request, res: Response) => {

    const { email, password } = req.body;
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


    sendResponse(res, {
        status: 201,
        success: true,
        message: "user login successfully",
        data: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        },

    })





})


const myProfile = async (req: Request, res: Response) => {
    try {


        const { userId } = req

        const user = await User.findById(userId)

        if (!user) {
            return res.status(401).json({ message: 'there is no user exit' });
        }
        res.status(201).json({ message: 'My use data is retrieved', data: user });

    } catch (error) {
        console.log("my data retrieved failed", error);

        res.status(500).json({ message: 'got error during my fetching my data' });
    }
}


const refreshToken = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies.refreshToken

        const { success, tokenDetails, message } = await generateRefreshToken(refreshToken)
        if (!success) {
            return res.status(401).json({ message });
        }

        //  generate token 
        const user = await User.findById(tokenDetails?.userId)
        if (!user) return res.status(401).json({ message: 'there is no user exit' });
        const jwtPayload = {
            userId: user._id,
            role: user.role,
            userName: user.name,
            email: user.email
        }
        const accessToken = generateTokens({ user: jwtPayload, secretToken: config.ACCESS_TOKEN_SECRET as string, expiredDate: config.ACCESS_TOKEN_EXPIRED as string })

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(400).json({ message: 'generate refresh token', accessToken: accessToken });

    } catch (error) {
        console.log("refresh token generate error", error);

        res.status(500).json({ message: 'got error during generate refresh token' });
    }
}

const logout = catchAsync(async (req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    sendResponse(res, {
        message: "logout",
        status: 201,
        success: true,
        data: null
    })
})

export const UserControllers = {
    createUser, loginUser, myProfile, refreshToken, logout
}