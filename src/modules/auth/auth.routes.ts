import { Router } from "express";
import { AuthControllers } from "./auth.controllers";


const router = Router()
router.post("/login", AuthControllers.loginUser)
router.get("/logout", AuthControllers.logout)

// deprecated
// router.get("/refresh-token", AuthControllers.refreshToken)

export const AuthRoutes = router