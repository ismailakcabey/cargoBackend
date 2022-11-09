import * as mongoose from "mongoose";
import { ExpensesType } from "./userExpenses.enum";



export const UserExpensesSchema = new mongoose.Schema({
    ExpensesType:{
        required : true,
        type : Number,
        enum : ExpensesType,
    },
    amount:{
        required : true,
        type : Number,
        min : 0,
    },
    createdDate:{
        required : true,
        type : Date,
    },
    userId: {
        type :mongoose.Types.ObjectId ,
        required:true
    },
})

export interface UserExpenses extends mongoose.Document{
    id:string,
    ExpensesType:number,
    amount:number,
    createdDate:Date,
    userId:mongoose.Schema.Types.ObjectId,
}