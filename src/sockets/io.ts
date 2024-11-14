import { io } from "../app";
import { handIeintercept, handleAttact } from "./socketService";

io.on("attact", handleAttact)

io.on("intercept", handIeintercept)