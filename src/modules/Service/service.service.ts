import { IService } from './service.interface';
import { Service } from './service.module';

const createService = async (data: IService) => {
    const newService = new Service(data);
    return await newService.save();
};

const getService = async (serviceId: string) => {
    const service = await Service.findById(serviceId);
    if (!service) {
        throw new Error('Service not found');
    }
    return service;
};

const getAllServices = async () => {
    return await Service.find();
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