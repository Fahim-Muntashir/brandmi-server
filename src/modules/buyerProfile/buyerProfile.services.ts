import { AppError } from "../../middleware/globalErrorHanlde"
import { IBuyerProfile } from "./buyerProfile.interface"
import BuyerProfileModel from "./buyerProfile.models"

const createBuyer = async (payload: IBuyerProfile) => {
    const { userId } = payload
    const isBuyerProfileExit = await BuyerProfileModel.findById(userId)
    if (isBuyerProfileExit) throw new AppError("Buyer profile already exit", 401)
    const result = new BuyerProfileModel(payload)
    return await result.save()


}
const getSingleBuyerProfile = async (id: string) => {
    const buyerProfile = await BuyerProfileModel.findOne({ _id: id, status: "active" });
    if (!buyerProfile) throw new AppError("Buyer profile not found", 404);
    return buyerProfile;
};

const getAllBuyerProfile = async () => {
    return await BuyerProfileModel.find({ status: "active" });
};

const updateBuyerProfile = async (id: string, updateData: Partial<IBuyerProfile>) => {
    const updatedProfile = await BuyerProfileModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedProfile) throw new AppError("Buyer profile not found", 404);
    return updatedProfile;
};

const deleteBuyerProfile = async (id: string) => {
    const deletedProfile = await BuyerProfileModel.findByIdAndUpdate(id, { status: "deleted" }, { new: true });
    if (!deletedProfile) throw new AppError("Buyer profile not found", 404);
    return deletedProfile;
};



export const BuyerProfileServices = {
    createBuyer, updateBuyerProfile, getSingleBuyerProfile, getAllBuyerProfile, deleteBuyerProfile
}