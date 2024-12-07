import { IPayment } from './payment.interface';
import { Payment } from './payment.schema';

const savePayment = async (paymentData: Partial<IPayment>) => {

  const payment = new Payment(paymentData);


  return await payment.save();
};

const getPaymentById = async (paymentId: string) => {
  const payment = await Payment.findById(paymentId);
  if (!payment) {
    throw new Error('Payment not found');
  }
  return payment;
};

export const PaymentService = {
  savePayment,
  getPaymentById,
};
