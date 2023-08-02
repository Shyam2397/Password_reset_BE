import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : String,
    email: String,
    password : String,
    dateofbirth : Date
})

const user = mongoose.model("user",userSchema);

export {user};
