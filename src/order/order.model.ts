import * as mongoose from "mongoose";
import { orderType , packageSize } from "./order.enum";

export const OrderSchema = new mongoose.Schema({
    title:{
        type:String, 
        required:true
    },
    desc: {
        type:String,
        required:true
    },
    price: {
        type:Number,
         required:true
        },
    userId: {
        type :mongoose.Types.ObjectId ,
        required:true
    },
    vehicleId: {
        type :mongoose.Types.ObjectId ,
        required:true
    },
    createDate:{
        type:Date,
        required:true
    },
    orderType: {
        type: Number,
        required:true,
        enum: orderType
    },
    packageSize: {
        type: Number,
        required:true,
        enum: packageSize
    }
})

export interface Order extends mongoose.Document{
    id:string;
    title:string;
    desc:string;
    price:number;
    userId:mongoose.Types.ObjectId,
    createdDate:Date,
    vehicleId:mongoose.Schema.Types.ObjectId,
    orderType:number;
    packageSize:number;
}

export interface OrderExcel extends mongoose.Document{
    
    title:string;
    desc:string;
    price:number;
    createdDate:Date,
    orderType:number;
}