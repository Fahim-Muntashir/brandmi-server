import { Request, Response } from "express";

import { catchAsync } from "../../helpers/catchAsync";
import { sendResponse } from "../../helpers/sendResponse";
import { UserServices } from "./user.services";
import { AppError } from "../../middleware/globalErrorHanlde";

const createUser = catchAsync(async (req: Request, res: Response) => {

    const result = await UserServices.createUser(req.body)




    sendResponse(res, {
        success: true,
        status: 201,
        message: "user created successfully",
        data: result
    })


}
)




const myProfile = catchAsync(async (req: Request, res: Response) => {
    const { userId } = req
    if (!userId) throw new AppError("Invalid request", 401)
    const result = await UserServices.myProfile(userId)

    sendResponse(res, {
        success: true,
        status: 201,
        message: "user created successfully",
        data: result
    })
})





export const UserControllers = {
    createUser, myProfile
}