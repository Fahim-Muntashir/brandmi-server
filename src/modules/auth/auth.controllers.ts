import { Request, Response } from "express";

import { catchAsync } from "../../helpers/catchAsync";
import { sendResponse } from "../../helpers/sendResponse";
import { AuthServices } from "./auth.services";


const loginUser = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body
    const result = await AuthServices.loginUser(payload, res)


    sendResponse(res, {
        status: 201,
        success: true,
        message: "user login successfully",
        data: {
            id: result._id,
            name: result.name,
            email: result.email,
            role: result.role
        },

    })





})


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


// const refreshToken = async (req: Request, res: Response) => {
//     try {
//         const refreshToken = req.cookies.refreshToken

//         const { success, tokenDetails, message } = await generateRefreshToken(refreshToken)
//         if (!success) {
//             return res.status(401).json({ message });
//         }

//         //  generate token 
//         const user = await User.findById(tokenDetails?.userId)
//         if (!user) return res.status(401).json({ message: 'there is no user exit' });
//         const jwtPayload = {
//             userId: user._id,
//             role: user.role,
//             userName: user.name,
//             email: user.email
//         }
//         const accessToken = generateTokens({ user: jwtPayload, secretToken: config.ACCESS_TOKEN_SECRET as string, expiredDate: config.ACCESS_TOKEN_EXPIRED as string })

//         res.cookie('accessToken', accessToken, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             maxAge: 7 * 24 * 60 * 60 * 1000
//         });

//         res.status(400).json({ message: 'generate refresh token', accessToken: accessToken });

//     } catch (error) {
//         console.log("refresh token generate error", error);

//         res.status(500).json({ message: 'got error during generate refresh token' });
//     }
// }


export const AuthControllers = {
    loginUser, logout
}