import { Request, Response } from 'express';
import { SellerProfileService } from './sellerProfile.service';
import { catchAsync } from '../../helpers/catchAsync';
import { sendResponse } from '../../helpers/sendResponse';


 const createSellerProfile =catchAsync(async (req: Request, res: Response) => {
     const sellerProfile = await SellerProfileService.createSellerProfile(req.body);
     
     console.log(sellerProfile);
  sendResponse(res, {
        status: 201,
        success: true,
        message: "Seller Profile Data Create Successfully",
    })
     
});

 const getSellerProfile =catchAsync(async (req: Request, res: Response) => {
     const { sellerId } = req.params;
     console.log(sellerId);
      const sellerProfile = await SellerProfileService.getSellerProfile(sellerId);
    
     
    sendResponse(res, {
        status: 201,
        success: true,
        message: "Seller Profile Data Get Successfully",
        data: {
            sellerProfile
        },
    })
      
});


 const getAllSellerProfiles = async (_req: Request, res: Response) => {
  try {
    const sellerProfiles = await SellerProfileService.getAllSellerProfiles();
    res.status(200).json(sellerProfiles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching seller profiles', error });
  }
};



 const updateSellerProfile = async (req: Request, res: Response) => {
  try {
    const { sellerId } = req.params;
    const updatedProfile = await SellerProfileService.updateSellerProfile(sellerId, req.body);
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

 const deleteSellerProfile = async (req: Request, res: Response) => {
  try {
    const { sellerId } = req.params;
    const deletedProfile = await SellerProfileService.deleteSellerProfile(sellerId);
    res.status(200).json({ message: 'Seller profile deactivated successfully', deletedProfile });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const SellerProfileController = {
    createSellerProfile,
    getSellerProfile,
    getAllSellerProfiles,
    updateSellerProfile,
    deleteSellerProfile
}