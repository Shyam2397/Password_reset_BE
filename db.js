import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export function dbConnection(){
    const params = {
        useNewUrlParser : true,
        useUnifiedTopology : true,
    }
    try {
        mongoose.connect(process.env.DB_URL,params)
        console.log("Database connected sucessfully")
    } catch (error) {
        console.log("Error occured in Db ",error)
    }
}