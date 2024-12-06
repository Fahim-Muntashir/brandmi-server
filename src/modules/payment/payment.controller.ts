import { Request, Response } from 'express';
import { catchAsync } from '../../helpers/catchAsync';
import { sendResponse } from '../../helpers/sendResponse';
import { PaymentService } from './payment.service';
import { stripeInstance } from '../../app';

const createPayment = catchAsync(async (req: Request, res: Response) => {
  const { amount, currency, paymentMethodId, serviceId, buyerId, sellerId } = req.body;


  if (!amount || !currency || !paymentMethodId || !serviceId || !buyerId || !sellerId) {
    throw new Error('Missing required fields');
  }

  const paymentIntent = await stripeInstance.paymentIntents.create({
    amount, // Amount in cents
    currency,
    payment_method: paymentMethodId,
    confirm: true, // Automatically confirm the payment
  });


  const paymentData = {
    serviceId,
    buyerId,
    sellerId,
    amount: amount / 100, // Convert cents to dollars
    status: paymentIntent.status as 'pending' | 'completed' | 'failed',
    paymentMethod: paymentIntent.payment_method as string | null,
    transactionId: paymentIntent.id,
  };

  const savedPayment = await PaymentService.savePayment(paymentData);

  sendResponse(res, {
    status: 201,
    success: true,
    message: 'Payment processed successfully',
    data: savedPayment,
  });
});

const getPaymentDetails = catchAsync(async (req: Request, res: Response) => {
  const { paymentId } = req.params;

  if (!paymentId) {
    throw new Error('Payment ID is required');
  }

  const payment = await PaymentService.getPaymentById(paymentId);

  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Payment details retrieved successfully',
    data: payment,
  });
});

export const PaymentController = {
  createPayment,
  getPaymentDetails,
};
