import express  from "express";
import http from "http"
import "dotenv/config"
import { connectToMongodb } from "./config/db";
import cors from "cors"
import { Server } from "socket.io";
import { handleSocketConnection } from "./sockets/io";

const PORT = process.env.POTR || 3000 

const app = express()
const server = http.createServer(app)
export const io = new Server(server, {
    cors: {
        origin: "*",
        methods: "*",
    }
})

io.on("connection", handleSocketConnection)

connectToMongodb()

app.use(express.json())
app.use(cors())

app.listen(PORT, () => {
    console.log(`Server started, Visit "http://localhost:${PORT}"`)
})