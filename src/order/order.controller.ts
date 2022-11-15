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
import { ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { OrderDto } from './order.dto';


import { OrderService } from './order.service';

@ApiTags('Order')
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
        @Body('orderType') orderType : number,
        @Body('packageSize') packageSize : number,
        createdDate : Date
    ){
        const generatedId = await this.orderService.insertOrder(
            orderDesc, orderTitle,orderPrice,userId,createdDate,vehicleId,orderType,packageSize
        );
        return {id:generatedId}
    }

    @Get()
    async getAllOrder(){
        const orders = await this.orderService.getOrders();
        return orders
    }

    @Get('/excel')
    async getOrderExcel(){
        const orders = await this.orderService.getAllOrderExcel();
    }

    @Get(':id')
    async getOrder(@Param('id') id : string){
        return  this.orderService.getOrderSingle(id);
    }

    @Patch(':id')
    async updateOrder(
        @Param('id') orderId?:string,
        @Body() body? : OrderDto
        ){
            await this.orderService.updateOrder(orderId, body);
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