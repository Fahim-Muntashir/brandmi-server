/* eslint-disable @typescript-eslint/no-explicit-any */
import cloudinary from "../../config/cloudinary";
import { UploadApiResponse } from "cloudinary";
import { AppError } from "../../middleware/globalErrorHandler";
import { AggregationQueryBuilder } from "../../queryBuilder/QueryBuilder";
import { IGig } from "./gig.interface";
import { Gig } from "./gig.module";
let uploadedImages: string[] = [];

const createGig = async (
  payload: Omit<IGig, "images">,
  files?: Express.Multer.File[]
) => {
  const uploadedImages: string[] = [];

  console.log(payload, files);

  // Upload images if provided
  if (files?.length) {
    for (const file of files.slice(0, 3)) {
      const uploadResult = await new Promise<UploadApiResponse>(
        (resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "gig_images" },
            (error: any, result?: UploadApiResponse) => {
              if (error)
                return reject(new AppError("Image upload failed", 500));
              if (!result)
                return reject(
                  new AppError("No result returned from Cloudinary", 500)
                );
              resolve(result);
            }
          );
          stream.end(file.buffer);
        }
      );

      uploadedImages.push(uploadResult.secure_url);
    }
  }

  try {
    console.log("Payload before save:", payload);
    console.log("Uploaded images:", uploadedImages);

    const newService = new Gig({
      ...payload,
      images: uploadedImages,
      status: payload.status ?? "pending", // ✅ Ensure status defaults to "pending"
    });

    const createdGig = await newService.save();
    console.log("Saved gig:", createdGig);

    return createdGig;
  } catch (err) {
    console.error("Error saving gig:", err);
    throw err;
  }
};

const getService = async (serviceId: string) => {
  const service = await Gig.findById(serviceId);
  if (!service) {
    throw new AppError("There is no service found", 401);
  }
  return service;
};

const getAllServices = async (query: Record<string, unknown>) => {
  const projection = {
    title: 1,
    category: 1,
    packages: 1,
  };

  const queryHandler = new AggregationQueryBuilder<IGig>(query, Gig);

  queryHandler
    .search(["title"])
    .filter(["title"])
    .sort()
    .pagination()
    .applyProject(projection);
  const services = await queryHandler.execute();
  const metaData = await queryHandler.metaData();

  return {
    data: services,
    metaData: metaData,
  };
};

const updateService = async (serviceId: string, updates: Partial<IGig>) => {
  const updatedService = await Gig.findByIdAndUpdate(
    serviceId,
    { ...updates, updatedAt: Date.now() },
    { new: true }
  );

  if (!updatedService) {
    throw new Error("Service not found");
  }

  return updatedService;
};

const deleteService = async (serviceId: string) => {
  const deletedService = await Gig.findByIdAndUpdate(
    serviceId,
    { status: "inactive", updatedAt: Date.now() },
    { new: true }
  );

  if (!deletedService) {
    throw new Error("Service not found");
  }

  return deletedService;
};

export const gigService = {
  createGig,
  getService,
  getAllServices,
  updateService,
  deleteService,
};
