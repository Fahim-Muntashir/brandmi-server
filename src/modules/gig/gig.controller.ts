import { Request, Response } from "express";
import { gigService } from "./gig.service";
import { catchAsync } from "../../helpers/catchAsync";
import { sendResponse } from "../../helpers/sendResponse";

// Create a new Service
const createService = catchAsync(async (req: Request, res: Response) => {
  const serviceData = req.body;
  const newService = await gigService.createService(serviceData);

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

export const gigController = {
  createService,
  getService,
  getAllServices,
  updateService,
  deleteService,
};
