import mongoose, { Schema, Model } from 'mongoose';
import { IOrder } from './order.interface';

const orderSchema = new Schema<IOrder>(
  {
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: 'SellerProfile',
      required: true,
    },
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: 'BuyerProfile',
      required: true,
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    serviceTitle: {
      type: String,
      required: true,
    },
    packageType: {
      type: String,
      enum: ['basic', 'premium'],
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    orderStatus: {
      type: String,
      enum: ['in-progress', 'completed', 'cancelled'],
      default: 'in-progress',
    },
    completedDate: Date,
    orderDate: {
      type: Date,
      default: Date.now,
    },
    transactionId: {
      type: String,
      required: true,
    },
    reviewGiven: {
      type: Boolean,
      default: false,
    },
    feedbackStatus: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

export const Order: Model<IOrder> = mongoose.model<IOrder>('Order', orderSchema);
