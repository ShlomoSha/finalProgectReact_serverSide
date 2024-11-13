import { Router } from "express";
import { getUserData } from "../controllers/actionController";

const router = Router()

router.get("/", getUserData)

export default router