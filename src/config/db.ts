import { connect } from "mongoose"

export const connectToMongodb = async () => {
    try {
        await connect(process.env.DB_URI as string)
        console.log("mongodb connected")
    } catch (err) {
        console.log("failed connected to mongodb", err)
    }
}