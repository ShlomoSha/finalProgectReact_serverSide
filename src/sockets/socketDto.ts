import LOCATIONS from "../models/types/enums/locations";
import ORGANIZATION from "../models/types/enums/organizations";
import ROCKET_STATUS from "../models/types/enums/rocketStatus";

export default interface SocketDto {
    id: string
    attactById: string
    rocket: string
    area: LOCATIONS
    organization: ORGANIZATION
    status: ROCKET_STATUS
    interceptBy?: string
}