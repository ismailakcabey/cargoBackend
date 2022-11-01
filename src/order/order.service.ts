import { Injectable , NotFoundException} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Order } from './order.model'

@Injectable()
export class OrderService {

    constructor(
        @InjectModel('Order') private readonly  orderModel : Model<Order>,
    ){}

    async insertOrder(title:string , desc:string , price:number) {
        const newOrder = new this.orderModel({
            title,
            desc,
            price
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
                price: order.price
            })
        )
    }

    async getOrderSingle(OrderId: string){
        const order = await this.orderModel.findById(OrderId);
        return {
            id : order.id,
            title: order.title,
            desc : order.desc,
            price: order.price
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