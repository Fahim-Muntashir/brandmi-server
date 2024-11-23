import { Response } from "express";

interface ResponseOptions<T> {
    status: number;
    message: string;
    success: boolean;
    data?: T;
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
    const { status, message, success, data } = options;

    const response = {
        success,
        statusCode: status,
        message,
        data,
    };
    return res.status(status).json(response);
};
