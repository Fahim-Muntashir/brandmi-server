import { ISellerProfile } from "./sellerProfile.interface";
import { SellerProfile } from "./sellerProfile.module";

 const createSellerProfile = async (data: ISellerProfile) => {
  const { seller } = data;
  // Check if the profile already exists
  const existingProfile = await SellerProfile.findOne({ seller });
  if (existingProfile) {
    throw new Error('Profile already exists for this seller');
  }
  // Create a new profile
  const sellerProfile = new SellerProfile(data);
  return await sellerProfile.save();
};


const getSellerProfile = async (sellerId: string) => {
    const sellerProfile = await SellerProfile.findOne({ seller: sellerId })
    // Task: When service and portfolio model are available then add this
    // .populate('services')
    // .populate('portfolio');

  if (!sellerProfile) {
    throw new Error('Seller profile not found');
  }
  return sellerProfile;
};


 const getAllSellerProfiles = async () => {
     return await SellerProfile.find();
     
    // Task: When service and portfolio model are available then add this
    // .populate('services')
    // .populate('portfolio');
};




 const updateSellerProfile = async (sellerId: string, updates: ISellerProfile) => {
  const updatedProfile = await SellerProfile.findOneAndUpdate(
    { seller: sellerId },
    { ...updates, updatedAt: Date.now() },
    { new: true }
  );

  if (!updatedProfile) {
    throw new Error('Seller profile not found');
  }

  return updatedProfile;
};




 const deleteSellerProfile = async (sellerId: string) => {
  const deletedProfile = await SellerProfile.findOneAndUpdate(
    { seller: sellerId },
    { status: 'inactive', updatedAt: Date.now() },
    { new: true }
  );

  if (!deletedProfile) {
    throw new Error('Seller profile not found');
  }

  return deletedProfile;
};



export const SellerProfileService = {
    createSellerProfile,
    getSellerProfile,
    getAllSellerProfiles,
    updateSellerProfile,
    deleteSellerProfile
}