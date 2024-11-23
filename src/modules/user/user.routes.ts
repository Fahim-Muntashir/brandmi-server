import { Router } from "express"
import { UserControllers } from "./user.controllers"
import autoRefreshToken from "../../middleware/autoRefreshToken"
import { authMiddleware } from "../../middleware/authGuard"


const router = Router()
// public route
router.post("/create-user", UserControllers.createUser)

// private route
router.get("/me", autoRefreshToken, authMiddleware(), UserControllers.myProfile)


export const UserRoute = router