import { model, Schema } from "mongoose";
import IUser, { Action, Weapon } from "../types/iuser";

const weaponSchema = new Schema<Weapon>({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
})

const actionSchema = new Schema<Action>({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
})

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
        type: weaponSchema,
        required: true
    }],
    action: [{
        type: actionSchema,
        default: []
    }]
})

export default model<IUser>('Users', userSchema)
