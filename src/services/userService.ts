import { compare } from "bcrypt";
import Users from "../models/schemas/userSchema";
import { LoginDto } from "../models/types/dto/userDto"
import jwt from "jsonwebtoken";

export const userLogin = async (user: LoginDto) => {
    try {
        const userFromDatabase = await Users.findOne({
            username: user.username,
          }).lean();
        if (!userFromDatabase) throw new Error("You missing something check if you'r username or password is correct");
        const matchPass = await compare(user.password, userFromDatabase.password);
        if (!matchPass) throw new Error("You missing something check if you'r username or password is correct");
        // gen token
        const token = await jwt.sign(
        {
            user_id: userFromDatabase._id,
            username: userFromDatabase.username,
            organization: userFromDatabase.organization,
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: "10m",
        }
        );
    return { ...userFromDatabase, token, password: "*******" };
  } catch (err) {
    throw err;
  }
}

export const createNewUser = async () => {
    try {
        
    } catch (err) {
        
    }
}