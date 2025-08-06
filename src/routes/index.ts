import { Router } from "express";
import { UserRoute } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { GoogleRoute } from "../modules/google/google.routes";
import { BuyerProfileRoutes } from "../modules/buyerProfile/buyerProfile.routes";
import { OrderRoutes } from "../modules/Order/order.routes";
import { PaymentRoutes } from "../modules/payment/payment.route";
import { SellerProfileRoutes } from "../modules/SellerProfile/sellerProfile.route";
import { ServiceRoutes } from "../modules/Service/service.route";
import { OtpValidationRoutes } from "../modules/otpValidation/otpValidation.routes";

// Define all routes in one config array for clarity and easy updates
const routes = [
  { path: "/user", handler: UserRoute },
  { path: "/auth", handler: AuthRoutes },
  { path: "/auth/google", handler: GoogleRoute },
  { path: "/buyer", handler: BuyerProfileRoutes },
  { path: "/order", handler: OrderRoutes },
  { path: "/payment", handler: PaymentRoutes },
  { path: "/sellerProfile", handler: SellerProfileRoutes },
  { path: "/services", handler: ServiceRoutes },
  { path: "/otp", handler: OtpValidationRoutes }, // updated path to avoid conflict
];

const router = Router();

// Loop through all routes and register them
routes.forEach((route) => {
  router.use(route.path, route.handler);
});

export const applicationRoutes = router;
