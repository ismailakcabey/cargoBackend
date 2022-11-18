import * as mongoose from "mongoose";
import { userType } from "./user.enum";

export const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    createdDate: {
        type:Date,
        required:true
    },
    userType: {
        type: Number,
        required:true,
        enum : userType
    }
})

export interface User extends mongoose.Document{
    id:string;
    name:string;
    email:string;
    password:string;
    createdDate:Date;
    userType:number;
}

export interface UserExcel extends mongoose.Document{
    name:string;
    email:string;
    password:string;
    createdDate:Date;
    userType:number;
}