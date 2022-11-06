import * as mongoose from "mongoose";

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
        required:true
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
}

export interface OrderExcel extends mongoose.Document{
    
    title:string;
    desc:string;
    price:number;
    createdDate:Date,
    orderType:number;
}