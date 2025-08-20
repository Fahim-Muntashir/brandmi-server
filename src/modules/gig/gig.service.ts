/* eslint-disable @typescript-eslint/no-explicit-any */
import cloudinary from "../../config/cloudinary";
import { UploadApiResponse } from "cloudinary";
import { AppError } from "../../middleware/globalErrorHandler";
import { AggregationQueryBuilder } from "../../queryBuilder/QueryBuilder";
import { IGig } from "./gig.interface";
import { Gig } from "./gig.module";
import { generateGigWithThumbnail } from "../../utils/aiGigGenerator";

const createGig = async (
  payload: Omit<IGig, "images">,
  files?: Express.Multer.File[]
) => {
  const uploadedImages: string[] = [];

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
    const newService = new Gig({
      ...payload,
      images: uploadedImages,
      status: payload.status ?? "active", // ✅ Ensure status defaults to "pending"
    });

    const createdGig = await newService.save();

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
    pricing: 1,
    images: 1,
  };

  const queryHandler = new AggregationQueryBuilder(query, Gig);

  queryHandler
    .search(["title"])
    .filter(["title", "category"])
    .sort()
    .pagination()
    .applyProject(projection);

  let services = await queryHandler.execute();
  let metaData = await queryHandler.metaData();

  // If no gig found, generate a new one
  if (services.length === 0) {
    console.log("No gig found. Generating a new one using AI...");

    const aiGig = await generateGigWithThumbnail(
      (query.searchTerm as string) || "Default Gig",
      (query.category as string) || "General"
    );

    const newGig = await Gig.create(aiGig);

    services = [newGig];
    metaData = {
      totalDocuments: 1,
      filterResult: 1,
      limitPage: 1,
      currentPage: 1,
      totalPage: 1,
      hasNextPage: false,
    };
  }

  return {
    data: services,
    metaData,
  };
};

export default getAllServices;

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

const getGigsBySeller = async (sellerId: string) => {
  const gigs = await Gig.find({
    userId: sellerId,
    status: { $ne: "deleted" },
  });
  return gigs;
};

const changeGigStatus = async (
  gigId: string,
  status: "deleted" | "pending" | "paused" | "active"
) => {
  const updatedGig = await Gig.findByIdAndUpdate(
    gigId,
    { status, updatedAt: Date.now() },
    { new: true }
  );

  if (!updatedGig) {
    throw new AppError("Gig not found", 404);
  }

  return updatedGig;
};

export const gigService = {
  createGig,
  getService,
  getAllServices,
  updateService,
  deleteService,
  getGigsBySeller,
  changeGigStatus, //
};
