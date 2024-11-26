import { Request, Response } from 'express';
import { OrderService } from './order.service';
import { catchAsync } from '../../helpers/catchAsync';
import { sendResponse } from '../../helpers/sendResponse';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const orderData = req.body;
  const newOrder = await OrderService.createOrder(orderData);

  sendResponse(res, {
    status: 201,
    success: true,
    message: 'Order created successfully',
    data: newOrder,
  });
});

const getOrder = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const order = await OrderService.getOrderById(orderId);

  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Order retrieved successfully',
    data: order,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const orders = await OrderService.getAllOrders(query);

  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Orders retrieved successfully',
    data: orders,
  });
});

const updateOrder = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const updatedOrder = await OrderService.updateOrderStatus(orderId, req.body);

  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Order updated successfully',
    data: updatedOrder,
  });
});

export const OrderController = {
  createOrder,
  getOrder,
  getAllOrders,
  updateOrder,
};
