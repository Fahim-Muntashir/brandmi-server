import { AppError } from "../../middleware/globalErrorHanlde";
import { IUser, User } from "./user.model";











const createUser = async (payload: IUser) => {
    // Check if user already exists
    const existingUser = await User.findOne({ email: payload.email });
    if (existingUser) {
        throw new AppError("Email already registered", 400)
    }

    // Create new user
    const user = new User({
        ...payload
    });

    await user.save();


    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }

}




const myProfile = async (userId: string) => {
    const user = await User.findById(userId)

    if (!user) {
        throw new AppError("Sorry! There is no user", 401)
    }
    return user
}



export const UserServices = {
    createUser, myProfile
}