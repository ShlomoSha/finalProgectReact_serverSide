import { model, Schema } from "mongoose";
import IUser from "../types/iuser";

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    },
    organization: {
        type: String,
        required: true
    },
    location: {
        type: String,
        default: null
    },
    ammo: [{
        type: Object,
        required: true
    }]
})

export default model<IUser>('Users', userSchema)
