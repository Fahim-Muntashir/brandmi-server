import { Request, Response } from 'express';
import { catchAsync } from '../../helpers/catchAsync';
import { sendResponse } from '../../helpers/sendResponse';
import { PaymentService } from './payment.service';
import Stripe from 'stripe';
import { config } from '../../config';

export const stripeInstance=new Stripe(config.payment_secret_key as string)

const createPayment = catchAsync(async (req: Request, res: Response) => {
  const { amount, currency, paymentMethodId, serviceId, buyerId, sellerId } = req.body;

  if (!amount || !currency || !paymentMethodId || !serviceId || !buyerId || !sellerId) {
    throw new Error('Missing required fields');
  }

  const paymentIntent = await stripeInstance.paymentIntents.create({
    amount, // Amount in cents
    currency,
  });

  console.log(paymentIntent.client_secret);

  sendResponse(res, {
    status: 201,
    success: true,
    message: 'Payment processed successfully',
    data: paymentIntent.client_secret,
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
