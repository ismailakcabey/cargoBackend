import {
    Controller,
    Post,
    Delete,
    Get,
    Put,
    Patch,
    Param,
    Body
} from '@nestjs/common';
import { ObjectId } from 'mongoose';

import { OrderService } from './order.service';

@Controller('orders')
export class OrderController{
    constructor(private orderService:OrderService){}

    @Post()
    async addOrder(
        @Body('title') orderTitle : string,
        @Body('desc') orderDesc : string,
        @Body('price') orderPrice : number,
        @Body('userId') userId : ObjectId,
        @Body('vehicleId') vehicleId : ObjectId,
        createdDate : Date
    ){
        const generatedId = await this.orderService.insertOrder(
            orderDesc, orderTitle,orderPrice,userId,createdDate,vehicleId
        );
        return {id:generatedId}
    }

    @Get()
    async getAllOrder(){
        const orders = await this.orderService.getOrders();
        return orders
    }

    @Get(':id')
    async getOrder(@Param('id') id : string){
        return  this.orderService.getOrderSingle(id);
    }

    @Patch(':id')
    async updateOrder(
        @Param('id') orderId?:string,
        @Body('title') orderTitle?:string,
        @Body('price') orderPrice?:number,
        @Body('desc') orderDesc?:string,
        @Body('vehicleId') ordervehicleId?: ObjectId,
        ){
            await this.orderService.updateOrder(orderId, orderTitle, orderPrice , orderDesc,ordervehicleId);
            return {id : orderId};
        }

    @Delete(':id')
    async deleteOrder(
        @Param('id') orderId
    ){
        await this.orderService.deleteOrder(orderId);
        return {id: orderId};
    }

}