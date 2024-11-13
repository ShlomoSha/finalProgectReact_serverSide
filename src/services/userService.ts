import { compare, hash } from "bcrypt";
import Users from "../models/schemas/userSchema";
import { LoginDto } from "../models/types/dto/userDto"
import jwt from "jsonwebtoken";
import IUser from "../models/types/iuser";
import organization from "../../data/organizations.json"
import ORGANIZATION from "../models/types/enums/organizations";
import LOCATIONS from "../models/types/enums/locations";


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

// check if ther is organization like that
const realOrganization = (user: IUser) => {
    if (user.organization == 'IDF') {
        if (Object.values(LOCATIONS).includes(user.location!)) {
            return true
        }
        return false
    }
    if (Object.values(ORGANIZATION).includes(user.organization)) {
        return true
    }
    return false
}

// find organization from json file and armament user
const initialArmament = (user: IUser) => {
    user.ammo = []
    for (let i = 0; i < organization.length; i++) {
        
        if (organization[i].name == `${user.organization} - ${user.location}`) {
            let resources = organization[i].resources

            for (let idx = 0; idx < resources.length; idx++) {            
                user.ammo!.push(resources[idx]) 
                console.log(user.ammo) 
            }
            return 
        }         
    } 
}

export const createNewUser = async (newUser: IUser) => {
    try {
        if (!realOrganization(newUser)) {
            throw new Error("Ther is no organization like that")
        }
        const encPass = await hash(newUser.password, 10);
        newUser.password = encPass;
        initialArmament(newUser)
        const createUser = new Users(newUser);
        return await createUser.save();
    } catch (err) { 
        console.log(err);
        throw new Error("Can't create new user");
    }
}