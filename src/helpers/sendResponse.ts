import { Response } from "express";
import { IPaginationResult } from "../queryBuilder/QueryBuilder";

interface ResponseOptions<T> {
    status: number;
    message: string;
    success: boolean;
    data?: T;
    metaData?: IPaginationResult
}

/**
 * Sends a standardized response using an options object.
 * @param res - Express Response object
 * @param options - Response options containing status, message, success, and optional data.
 */
export const sendResponse = <T>(
    res: Response,
    options: ResponseOptions<T>
): Response => {
    const { status, message, success, data, metaData } = options;

    const response = {
        success,
        statusCode: status,
        message,
        data,
        metaData
    };
    return res.status(status).json(response);
};
