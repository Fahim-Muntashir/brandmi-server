import mongoose, { Schema, Model } from 'mongoose';
import { IPayment } from './payment.interface';

const paymentSchema = new Schema<IPayment>(
  {
    serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    buyerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    sellerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: false },
    transactionId: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: false },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

export const Payment: Model<IPayment> = mongoose.model<IPayment>('Payment', paymentSchema);
