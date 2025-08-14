import { Request, Response } from "express";
import { gigService } from "./gig.service";
import { catchAsync } from "../../helpers/catchAsync";
import { sendResponse } from "../../helpers/sendResponse";

import { IGig } from "./gig.interface";

const createService = catchAsync(async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  if (!req.body) {
    throw new Error("No gig data provided");
  }

  // Parse the main gigData object
  let payload: any = req.body;
  // If pricing is still a stringified JSON, parse it
  if (typeof payload.pricing === "string") {
    const parsedPricing = JSON.parse(payload.pricing);
    payload.pricing = parsedPricing.pricing; // pick the nested "pricing" object
  }

  const newService = await gigService.createGig(payload, files);
  console.log(newService);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "Service created successfully",
    data: newService,
  });
});

// Get a specific Service
const getService = catchAsync(async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const service = await gigService.getService(serviceId);

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Service retrieved successfully",
    data: service,
  });
});

// Get all Services
const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const services = await gigService.getAllServices(query);

  sendResponse(res, {
    status: 200,
    success: true,
    message: "All services retrieved successfully!!",
    data: services.data,
    metaData: services.metaData,
  });
});

// Update a Service
const updateService = catchAsync(async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const updatedService = await gigService.updateService(serviceId, req.body);

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Service updated successfully",
    data: updatedService,
  });
});

// Delete (deactivate) a Service
const deleteService = catchAsync(async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const deletedService = await gigService.deleteService(serviceId);

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Service deactivated successfully",
    data: deletedService,
  });
});

// Get all Gigs by Seller ID
const getGigsBySeller = catchAsync(async (req: Request, res: Response) => {
  const { sellerId } = req.params;
  console.log(sellerId);
  const gigs = await gigService.getGigsBySeller(sellerId);

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Gigs retrieved successfully for the seller",
    data: gigs,
  });
});

export const gigController = {
  createService,
  getService,
  getAllServices,
  updateService,
  deleteService,
  getGigsBySeller, // ✅ add here
};
