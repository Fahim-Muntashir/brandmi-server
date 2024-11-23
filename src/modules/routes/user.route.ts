import { Router } from "express";
import { UserControllers } from "../controllers/user.controller";
import { authMiddleware } from "../../middleware/authGuard";
import autoRefreshToken from "../../middleware/autoRefreshToken";

const router = Router()
router.post("/create-user", UserControllers.createUser)
router.post("/login", UserControllers.loginUser)

// private route
router.get("/me", autoRefreshToken, authMiddleware(), UserControllers.myProfile)
router.get("/logout", UserControllers.logout)

//  special  route
router.get("/refresh-token", UserControllers.refreshToken)

export const UserRoute = router