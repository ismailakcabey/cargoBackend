import { Injectable , NotFoundException} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId, Types } from "mongoose";
import { OrderDto } from "./order.dto";
import { Order , OrderExcel } from './order.model'
var fs = require('fs');
const XLSX = require('xlsx')
@Injectable()
export class OrderService {

    constructor(
        @InjectModel('Order') private readonly  orderModel : Model<Order>,
        @InjectModel('Order') private readonly  orderModelExcel : Model<OrderExcel>,
    ){}

    async insertOrder(title:string , desc:string , price:number , userId:ObjectId , createDate:Date , vehicleId:ObjectId , orderType : number , packageSize:number) {
        const newOrder = new this.orderModel({
            title,
            desc,
            price,
            userId,
            vehicleId,
            orderType,
            packageSize,
            createDate : Date.now()
        });
        const result = await newOrder.save();
        return result.id as string;
    }

    async getOrders(){
        const orders = await this.orderModel.find().exec();
        return {
            status : true,
            count : orders.length,
            data : orders
        }
    }

    async getExcel(){
        const orders = await this.orderModelExcel.find().exec();
        return orders.map(
            order=> ({
                title: order.title,
                desc: order.desc,
                price: order.price,
                createdDate: order.createdDate,
                orderType: order.orderType
            })
        )
    }

    async getOrderSingle(OrderId: string){
        const order = await this.orderModel.findById(OrderId);
        return order
    }

    async updateOrder(orderId: string , body : OrderDto){
        const order = await this.orderModel.findByIdAndUpdate(orderId);
        if(body?.title)order.title = body?.title;
        if(body.price)order.price = body.price;
        if(body.desc)order.desc = body.desc;
        if(body.vehicleId)order.vehicleId = body.vehicleId;
        if(body.orderType)order.orderType = body.orderType;
        if(body.packageSize)order.packageSize = body.packageSize;
        console.log(order)
        order.save();
    }

    async deleteOrder(orderId:string){
        const result = await this.orderModel.deleteOne({_id:orderId});
        if (result === null) {
            throw new NotFoundException('Could not find product.');
          }
    }

    async getAllOrderExcel(){
        
        const data = await this.getExcel()
        
        const workSheet = XLSX.utils.json_to_sheet(data);
        const workBook = XLSX.utils.book_new();
    
        XLSX.utils.book_append_sheet(workBook, workSheet, "students")
        // Generate buffer
        XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" })
    
        // Binary string
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
    
        XLSX.writeFile(workBook, "orders.xlsx")
        return{
            status : true,
            message : "Excel file generated",
            workBook : workBook
        }
    }
}