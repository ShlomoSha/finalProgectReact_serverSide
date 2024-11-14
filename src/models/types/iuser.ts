import { Document } from "mongoose"
import LOCATIONS from "./enums/locations"
import ORGANIZATION from "./enums/organizations"
import ROCKET_STATUS from "./enums/rocketStatus"

export interface Weapon {
    name: string
    amount: number
    intercepts?: string[]
    speed?: number
}

export interface Action {
    id: string
    rocket: string
    status: ROCKET_STATUS
}

interface IUser extends Document {
    username: string
    password: string
    organization: ORGANIZATION
    location?: LOCATIONS
    ammo?: Weapon[]
    action?: Action[]     
}

export default IUser 