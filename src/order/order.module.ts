import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OrderService } from "./order.service";
import { OrderSchema } from "./order.model";
import { OrderController } from "./order.controller";

@Module({
    imports:[
        MongooseModule.forFeature([{name:"Order",schema:OrderSchema}])
    ],
    controllers:[OrderController],
    providers:[OrderService]
})

export class OrderModule { }