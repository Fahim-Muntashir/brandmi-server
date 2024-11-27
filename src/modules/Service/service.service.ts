/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppError } from '../../middleware/globalErrorHanlde';
import { AggregationQueryBuilder } from '../../queryBuilder/QueryBuilder';
import { IService } from './service.interface';
import { Service } from './service.module';

const createService = async (data: IService) => {
    const newService = new Service(data);
    return await newService.save();
};

const getService = async (serviceId: string) => {
    const service = await Service.findById(serviceId);
    if (!service) {
        throw new AppError('There is no service found', 401);
    }
    return service;
};

const getAllServices = async (query: Record<string, unknown>) => {
    const projection = {
        title: 1,
        category: 1,
        description: 1,
        packages: 1
    }


    const queryHandler = new AggregationQueryBuilder<IService>(query, Service);

    queryHandler
        .search(["title"])
        .filter(["title"])
        .sort()
        .pagination()
        .applyProject(projection)
    const services = await queryHandler.execute();
    const metaData = await queryHandler.metaData();

    return {
        data: services,
        metaData: metaData,
    };
};


const updateService = async (serviceId: string, updates: Partial<IService>) => {
    const updatedService = await Service.findByIdAndUpdate(
        serviceId,
        { ...updates, updatedAt: Date.now() },
        { new: true }
    );

    if (!updatedService) {
        throw new Error('Service not found');
    }

    return updatedService;
};

const deleteService = async (serviceId: string) => {
    const deletedService = await Service.findByIdAndUpdate(
        serviceId,
        { status: 'inactive', updatedAt: Date.now() },
        { new: true }
    );

    if (!deletedService) {
        throw new Error('Service not found');
    }

    return deletedService;
};

export const ServiceService = {
    createService,
    getService,
    getAllServices,
    updateService,
    deleteService,
};
