import LOCATIONS from "./enums/locations"
import ORGANIZATION from "./enums/organizations"

export interface Weapon {
    name: string
    amount: number
}

interface IUser {
    _id?: string
    username: string
    password: string
    organization: ORGANIZATION
    location?: LOCATIONS
    ammo: Weapon[]
}

export default IUser