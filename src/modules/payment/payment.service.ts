// payment.service.ts
import Stripe from 'stripe';
import { IPayment } from './payment.interface';
import { OrderService } from '../order/order.service';
import { config } from '../../config';

const stripe = new Stripe(config.payment_secret_key, {
  apiVersion: '2020-08-27',
});

const processStripePayment = async (paymentToken: string, orderId: string, amount: number) => {
  try {
    // Step 1: Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: 'usd', // Adjust based on your currency
      payment_method: paymentToken,
      confirm: true,
    });

    // Step 2: Save payment data to DB
    const paymentData: IPayment = {
      orderId: orderId,
      transactionId: paymentIntent.id,
      amount,
      paymentMethod: 'stripe',
      status: 'completed',
    };

    await OrderService.savePayment(paymentData);
    return paymentIntent;
  } catch (error) {
    console.error(error);
    throw new Error('Payment processing failed');
  }
};

export const PaymentService = {
  processStripePayment,
};
