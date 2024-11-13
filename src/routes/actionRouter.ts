import { Router } from "express";
import { getUserData } from "../controllers/actionController";
import verifyUser from "../middlewares/verifyUser";

const router = Router()

router.get("/",verifyUser, getUserData)

export default router