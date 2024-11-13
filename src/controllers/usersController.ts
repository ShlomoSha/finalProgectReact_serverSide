import { Request, Response } from "express"
import { userLogin } from "../services/userService";

export const login = async (req: Request, res: Response) => {
    try {
        const loggedUser = await userLogin(req.body);
        res.status(200).json(loggedUser);
      } catch (err) {
        res.status(400).json((err as Error).message);
      }
}

export const register = async (req: Request, res: Response) => {
 try {
    
 } catch (err) {
    
 }
}