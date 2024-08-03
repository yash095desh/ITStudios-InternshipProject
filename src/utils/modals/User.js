import mongoose, { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
    name : String,
    phoneNumber : {type:String,unique:true},
    email : {type:String,unique:true},
    hobbies : [String],
},{timestamps:true})


export const User = models?.User || model('User',UserSchema);