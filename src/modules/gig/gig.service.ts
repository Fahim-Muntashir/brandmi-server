/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppError } from "../../middleware/globalErrorHandler";
import { AggregationQueryBuilder } from "../../queryBuilder/QueryBuilder";
import { IGig } from "./gig.interface";
import { Gig } from "./gig.module";

const createService = async (data: IGig) => {
  const newService = new Gig(data);
  return await newService.save();
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
  createService,
  getService,
  getAllServices,
  updateService,
  deleteService,
};
