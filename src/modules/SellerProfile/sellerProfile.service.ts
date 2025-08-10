import { ISellerProfile } from "./sellerProfile.interface";
import { SellerProfile } from "./sellerProfile.module";

const createSellerProfile = async (data: ISellerProfile) => {
  const { userId } = data;
  const existingProfile = await SellerProfile.findOne({ userId });
  if (existingProfile) {
    throw new Error("Profile already exists for this seller");
  }
  const sellerProfile = new SellerProfile(data);
  return await sellerProfile.save();
};

const getSellerProfile = async (sellerId: string) => {
  const sellerProfile = await SellerProfile.findOne({ _id: sellerId });
  // .populate('services')
  // .populate('portfolio');

  if (!sellerProfile) {
    throw new Error("Seller profile not found");
  }
  return sellerProfile;
};

const getAllSellerProfiles = async () => {
  return await SellerProfile.find();
  // .populate('services')
  // .populate('portfolio');
};

const updateSellerProfile = async (
  sellerId: string,
  updates: ISellerProfile
) => {
  const updatedProfile = await SellerProfile.findOneAndUpdate(
    { _id: sellerId },
    { ...updates, updatedAt: Date.now() },
    { new: true }
  );

  if (!updatedProfile) {
    throw new Error("Seller profile not found");
  }

  return updatedProfile;
};

const deleteSellerProfile = async (sellerId: string) => {
  const deletedProfile = await SellerProfile.findOneAndUpdate(
    { _id: sellerId },
    { status: "inactive", updatedAt: Date.now() },
    { new: true }
  );

  if (!deletedProfile) {
    throw new Error("Seller profile not found");
  }

  return deletedProfile;
};

export const SellerProfileService = {
  createSellerProfile,
  getSellerProfile,
  getAllSellerProfiles,
  updateSellerProfile,
  deleteSellerProfile,
};
