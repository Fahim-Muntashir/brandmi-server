/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import emailTransporter from "../../config/emailTransport";
import otpEmail from "../../emails/otpEmail";
import { AppError } from "../../middleware/globalErrorHandler";
import OtpValidationModel from "../otpValidation/otpValidation.model";
import { IUser, User } from "./user.model";
import cloudinary from "../../config/cloudinary";

export const updateUser = async (
  userId: string,
  payload: { name?: string },
  file?: Express.Multer.File
) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError("User not found", 404);

  // If file exists, upload to cloudinary
  if (file) {
    const uploadedImage = await cloudinary.uploader.upload_stream(
      { folder: "user_profiles" },
      (error, result) => {
        if (error) throw new AppError("Image upload failed", 500);
        return result;
      }
    );

    // Because upload_stream is async, we wrap in Promise
    const uploadResult = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "user_profiles" },
        (error, result) => {
          if (error) reject(new AppError("Image upload failed", 500));
          else resolve(result);
        }
      );
      stream.end(file.buffer);
    });

    user.image = uploadResult.secure_url;
  }

  // If name provided, update
  if (payload.name) user.name = payload.name;

  await user.save();

  return {
    name: user.name,
    email: user.email,
    image: user.image,
    role: user.role,
  };
};

export const createUser = async (payload: IUser) => {
  // 1. Check if email already exists
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw new AppError("Email already registered", 400);
  }

  // 2. Generate 6-digit OTP
  const otpCode = Math.floor(100000 + Math.random() * 900000);

  // 3. Save user and OTP using Mongoose transaction
  const session = await User.startSession();
  session.startTransaction();

  try {
    // Create user
    const newUser = await new User({
      name: payload.name,
      email: payload.email,
      password: payload.password,
      role: payload.role,
      image: payload.image,
      googleId: payload.googleId,
      isverified: false,
    }).save({ session });

    // Save OTP
    await new OtpValidationModel({
      userId: newUser._id,
      otpCode: otpCode.toString(),
    }).save({ session });

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    // 4. Send verification email
    try {
      await emailTransporter.sendMail(otpEmail(payload.email, otpCode));
      console.log("Email has been sent!");
    } catch (error) {
      console.error("Email sending failed", error);
    }

    return {
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError("User creation failed", 500);
  }
};

export const myProfile = async (userId: string) => {
  const user = await User.findById({
    userId,
  });

  if (!user) {
    throw new AppError("Sorry! There is no user", 401);
  }

  return user;
};
export const UserServices = {
  createUser,
  myProfile,
  updateUser,
};
