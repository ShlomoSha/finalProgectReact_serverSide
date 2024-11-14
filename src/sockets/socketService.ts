import { Socket } from "socket.io"
import { io } from "../app"
import SocketDto from "./socketDto"
import Users from "../models/schemas/userSchema"
import ROCKET_STATUS from "../models/types/enums/rocketStatus"
import { v4 } from "uuid"
import rocketData from "../../data/missiles.json"

export const handleSocketConnection = (client: Socket) => {
    console.log(`[socket.io] New Connection ${client.id}`)
    client.on('disconncet', () => {
        console.log(`${client.id} disconncet`)
    })
}

const speedRocket = (rocket: string) => {
    for (let i = 0; i < rocketData.length; i++) {
        if (rocketData[i].name == rocket) {
            return rocketData[i].speed
        }        
    }
}

// this function reduced the armament of user if him attacted or intercepted
const reduceArmament = async (data: SocketDto): Promise<void> => {

    const userId = data.status == "intercepted" ? data.interceptBy : data.attactById 

    const userAttacted = await Users.findById(userId).lean()
    for (let i = 0; i < userAttacted!.ammo.length; i++) {
        if(userAttacted!.ammo[i].name == data.rocket) {
            userAttacted!.ammo[i].amount -= 1
            await userAttacted!.save()
            return
        }
    }
}

// this function push action data in user
const addDataIntoAction = async (data: SocketDto) => {
    const userId = data.status == "intercepted" ? data.interceptBy : data.attactById
    try {
        const userActionDAta = await Users.findById(userId).lean()

        if (!userActionDAta) throw new Error("can't find user")
    
        const {id, rocket, status} = data
        userActionDAta.action?.push({ id, rocket, status })
        await userActionDAta.save        
    } catch (err) {
        console.log(err)
    }
}

// this function update status action in user trrorist
const updateStatusAction = async (actionId: string, attactById: string) => {
    try {
        const user = await Users.findById(attactById).lean()

        if(!user) throw new Error("sory can't find user")
        
        for (let i = 0; i < user.action!.length; i++) {
           if (user.action![i].id == actionId) {
            user.action![i].status = 'intercepted' as ROCKET_STATUS
            await user.save()
            return
           }        
        }
        throw new Error("there is no action with this id")                
    } catch (err) {
        console.log(err)
    }
}

export const handleAttact = async (attact: Socket, data: SocketDto) => {
    data.id = v4()
    data.timeHit = speedRocket(data.rocket)
    io.emit('someoneAttact', data)
    await addDataIntoAction(data)
    await reduceArmament(data)
}

export const handIeintercept = async (intercept: Socket, data: SocketDto) => {
    data.status = 'intercepted' as ROCKET_STATUS
    io.emit('someoneIntercept', data)
    await addDataIntoAction(data)
    await reduceArmament(data)
    await updateStatusAction(data.id, data.attactById)
}
