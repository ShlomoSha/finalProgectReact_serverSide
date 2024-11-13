import { Request, Response } from "express";
import { GetDataDto } from "../models/types/dto/userDto";
import { getDataById } from "../services/actionService";

export const getUserData = async (req: Request<any, any, GetDataDto>, res: Response) => {
    try {
        const data = await getDataById(req.body)
        res.status(200).json(data)
    } catch (err) {
        res.status(400).json((err as Error).message)
    }
} 