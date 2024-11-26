import { Document, Types } from 'mongoose';

export interface IOrder extends Document {
  sellerId: Types.ObjectId;
  buyerId: Types.ObjectId;
  serviceId: Types.ObjectId;
  serviceTitle: string;
  packageType: 'basic' | 'premium'; // The selected package type
  totalAmount: number;
  paymentStatus: 'pending' | 'completed' | 'failed';
  orderStatus: 'in-progress' | 'completed' | 'cancelled';
  completedDate?: Date;
  orderDate: Date;
  transactionId: string; // From payment gateway (e.g., Stripe)
  reviewGiven: boolean;
  feedbackStatus: boolean;
}
