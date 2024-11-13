import express  from "express";
import http from "http"
import "dotenv/config"
import { connectToMongodb } from "./config/db";
import cors from "cors"
import { Server } from "socket.io";
import { handleSocketConnection } from "./sockets/io";
import usersRouter from "./routes/usersRouter"
import actionRouter from "./routes/actionRouter"

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

app.use("/api/users", usersRouter)
app.use("/api/action", actionRouter)

app.listen(PORT, () => {
    console.log(`Server started, Visit "http://localhost:${PORT}"`)
})