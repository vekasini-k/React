import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const DBcon=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("MONGO_DB is connected")
    } catch (error) {
        console.log("MONGO_DB is not connected ")
    }
}
export default DBcon;