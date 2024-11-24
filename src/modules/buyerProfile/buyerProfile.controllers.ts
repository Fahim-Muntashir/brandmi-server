import { Request, Response } from "express";
import { catchAsync } from "../../helpers/catchAsync";
import { sendResponse } from "../../helpers/sendResponse";
import { BuyerProfileServices } from "./buyerProfile.services";

const createBuyer = catchAsync(async (req: Request, res: Response) => {

    const result = await BuyerProfileServices.createBuyer(req.body)




    sendResponse(res, {
        success: true,
        status: 201,
        message: "Buyer profile created successfully",
        data: result
    })


}
)

const getSingleBuyerProfile = catchAsync(async (req: Request, res: Response) => {
    const { buyerId } = req.params;
    const result = await BuyerProfileServices.getSingleBuyerProfile(buyerId);

    sendResponse(res, {
        success: true,
        status: 200,
        message: "Buyer profile fetched successfully",
        data: result
    });
});

const getAllBuyerProfile = catchAsync(async (req: Request, res: Response) => {
    const result = await BuyerProfileServices.getAllBuyerProfile();

    sendResponse(res, {
        success: true,
        status: 200,
        message: "Buyer profiles fetched successfully",
        data: result
    });
});

const updateBuyerProfile = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BuyerProfileServices.updateBuyerProfile(id, req.body);

    sendResponse(res, {
        success: true,
        status: 200,
        message: "Buyer profile updated successfully",
        data: result
    });
});

const deleteBuyerProfile = catchAsync(async (req: Request, res: Response) => {
    const { buyerId } = req.params;
    const result = await BuyerProfileServices.deleteBuyerProfile(buyerId);

    sendResponse(res, {
        success: true,
        status: 200,
        message: "Buyer profile deleted successfully",
        data: result
    });
});

export const BuyerProfileControllers = { createBuyer, deleteBuyerProfile, getAllBuyerProfile, getSingleBuyerProfile, updateBuyerProfile }