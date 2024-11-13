import { Socket } from "socket.io";

export const handleSocketConnection = (client: Socket) => {
    console.log(`[socket.io] New Connection ${client.id}`)
    client.on('disconncet', () => {
        console.log('user disconncet')
    })
}