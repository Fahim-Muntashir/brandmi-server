import { Request, Response } from 'express';
import { SellerProfileService } from './sellerProfile.service';


 const createSellerProfile = async (req: Request, res: Response) => {
  try {
    const sellerProfile = await SellerProfileService.createSellerProfile(req.body);
    res.status(201).json(sellerProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

 const getSellerProfile = async (req: Request, res: Response) => {
  try {
    const { sellerId } = req.params;
    const sellerProfile = await SellerProfileService.getSellerProfile(sellerId);
    res.status(200).json(sellerProfile);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

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