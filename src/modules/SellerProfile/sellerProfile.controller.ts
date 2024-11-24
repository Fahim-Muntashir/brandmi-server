import { Request, Response } from 'express';
import { SellerProfileService } from './sellerProfile.service';
import { catchAsync } from '../../helpers/catchAsync';
import { sendResponse } from '../../helpers/sendResponse';


 const createSellerProfile =catchAsync(async (req: Request, res: Response) => {
     const sellerProfile = await SellerProfileService.createSellerProfile(req.body);
    
     sendResponse(res, {
        status: 201,
        success: true,
        message: "Seller Profile Data Create Successfully",
        data: sellerProfile
    })
});


 const getSellerProfile =catchAsync(async (req: Request, res: Response) => {
    const { sellerId } = req.params;
    const sellerProfile = await SellerProfileService.getSellerProfile(sellerId);
     
    sendResponse(res, {
        status: 201,
        success: true,
        message: "Single Seller Profile Data Get Successfully",
        data: {
            sellerProfile
        },
    })
});




 const getAllSellerProfiles = catchAsync(async (_req: Request, res: Response) => {
    const sellerProfiles = await SellerProfileService.getAllSellerProfiles();
  
     sendResponse(res, {
        status: 201,
        success: true,
        message: "All Seller Profile Data Get Successfully",
        data: {
            sellerProfiles
        },
    })
     
});


const updateSellerProfile = catchAsync(async (req: Request, res: Response) => {
    const { sellerId } = req.params;
    const updatedProfile = await SellerProfileService.updateSellerProfile(sellerId, req.body);
  
    sendResponse(res, {
      status: 200,
      success: true,
      message: "Seller profile updated successfully",
      data: {
        updatedProfile,
      },
    });
  });

  
  const deleteSellerProfile = catchAsync(async (req: Request, res: Response) => {
    const { sellerId } = req.params;
    const deletedProfile = await SellerProfileService.deleteSellerProfile(sellerId);
  
    sendResponse(res, {
      status: 200,
      success: true,
      message: "Seller profile deactivated successfully",
      data: {
        deletedProfile,
      },
    });
  });
  


export const SellerProfileController = {
    createSellerProfile,
    getSellerProfile,
    getAllSellerProfiles,
    updateSellerProfile,
    deleteSellerProfile
}