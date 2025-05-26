import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true})

const User= mongoose.model('User',userSchema)
export default User;