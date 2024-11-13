import Users from "../models/schemas/userSchema";
import { GetDataDto } from "../models/types/dto/userDto";

export const getDataById = async (user: GetDataDto) => {
    try {
        if (!user.id) throw new Error('id is required')
        const existUser = await Users.findById(user.id).lean()
        if (!existUser) throw new Error('invalid id, there is no user with this id')
        return existUser
    } catch (err) {
        throw err
    }
}