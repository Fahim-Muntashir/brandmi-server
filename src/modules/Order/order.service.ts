import { IOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrder = async (data: IOrder) => {
  const newOrder = new Order(data);
  return await newOrder.save();
};

const getOrderById = async (orderId: string) => {
  const order = await Order.findById(orderId).populate('sellerId buyerId serviceId');
  if (!order) {
    throw new Error('Order not found');
  }
  return order;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAllOrders = async (query: any) => {
  const orders = await Order.find(query).populate('sellerId buyerId serviceId');
  return orders;
};

const updateOrderStatus = async (orderId: string, updates: Partial<IOrder>) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    { ...updates, updatedAt: Date.now() },
    { new: true }
  );
  if (!updatedOrder) {
    throw new Error('Order not found');
  }
  return updatedOrder;
};

export const OrderService = {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
};
