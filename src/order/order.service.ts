import { Injectable , NotFoundException} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Order } from './order.model'

@Injectable()
export class OrderService {

    constructor(
        @InjectModel('Order') private readonly  orderModel : Model<Order>,
    ){}

    async insertOrder(title:string , desc:string , price:number , userId:string , createDate:Date) {
        const newOrder = new this.orderModel({
            title,
            desc,
            price,
            userId,
            createDate : Date.now()
        });
        const result = await newOrder.save();
        return result.id as string;
    }

    async getOrders(){
        const orders = await this.orderModel.find().exec();
        return orders.map(
            order=> ({
                id: order.id,
                title: order.title,
                desc: order.desc,
                price: order.price,
                userId: order.userId,
                createdDate: order.createdDate
            })
        )
    }

    async getOrderSingle(OrderId: string){
        const order = await this.orderModel.findById(OrderId);
        return {
            id : order.id,
            title: order.title,
            desc : order.desc,
            price: order.price,
            userId: order.userId,
            createdDate : order.createdDate
        }
    }

    async updateOrder(title: string, desc: string,price: number,orderId:string){
        const order = await this.orderModel.findByIdAndUpdate(orderId);
        if(title)order.title = title;
        if(price)order.price = price;
        if(desc)order.desc = desc;
        order.save();
    }

    async deleteOrder(orderId:string){
        const result = await this.orderModel.deleteOne({_id:orderId});
        if (result === null) {
            throw new NotFoundException('Could not find product.');
          }
    }

}