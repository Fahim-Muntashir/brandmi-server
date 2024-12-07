import { Types, Document } from 'mongoose';

export interface IPayment extends Document {
  serviceId: Types.ObjectId;
  buyerId: Types.ObjectId;
  sellerId: Types.ObjectId;
  amount: number;
  status: 'pending' | 'completed' | 'failed'; // Matches your schema's status enum
  paymentMethod: string | null; // Simplify to string
  transactionId: string;
  orderId?: Types.ObjectId; // Optional if not always present
  createdAt?: Date; // Auto-managed by Mongoose
  updatedAt?: Date; // Auto-managed by Mongoose
}
