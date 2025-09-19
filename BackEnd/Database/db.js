import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config() //always on top


const url = process.env.MONGO_URI

const Connectdb = async () => {
    try {
        await mongoose.connect(url)
        console.log("Database Connected sucessfully")
    } catch (err) {
        console.log(err, "problem in database connection")
    }
}

export default Connectdb

