import { Router } from "express";
import { UserControllers } from "./user.controllers";
import autoRefreshToken from "../../middleware/autoRefreshToken";
import { authMiddleware } from "../../middleware/authGuard";
import { upload } from "../../middleware/upload";

const router = Router();
// public route
router.post("/create-user", UserControllers.createUser);

// private route
router.get(
  "/me",
  autoRefreshToken,
  authMiddleware(["buyer", "seller"]),
  UserControllers.myProfile
);
// Update user

router.put(
  "/update-user",
  autoRefreshToken,
  authMiddleware(["buyer", "seller"]),
  upload.single("image"),
  UserControllers.updateUser
);

export const UserRoute = router;
