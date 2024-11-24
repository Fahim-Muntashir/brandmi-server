import { Request, Response } from "express";
import { catchAsync } from "../../helpers/catchAsync";
import { sendResponse } from "../../helpers/sendResponse";

const createBuyer = catchAsync(async (req: Request, res: Response) => {





    sendResponse(res, {
        success: true,
        status: 201,
        message: "Buyer created successfully",
        data: null
    })


}
)



export const BuyerControllers = { createBuyer }