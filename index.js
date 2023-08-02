import express from "express";
import cors from "cors";
import { dbConnection } from "./db.js";
import dotenv from "dotenv";
import { userRouter } from "./Routes/user.js";

const app = express();

dotenv.config();

dbConnection();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Connected sucessfully")
})

//Routes
app.use("/user",userRouter)

app.listen(PORT,()=>console.log(`Server has been connected in localhost : ${PORT}`));