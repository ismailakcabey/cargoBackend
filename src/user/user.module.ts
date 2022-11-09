import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserExpensesController } from "src/userExpenses/userExpenses.controller";
import { UserExpensesService } from "src/userExpenses/userExpenses.service";
import { UsersController } from "./user.controller";
import { UserSchema } from "./user.model";
import { UserService } from "./user.service";


@Module({
    imports: [
        MongooseModule.forFeature([{name:"User",schema:UserSchema}])
    ],
    controllers:[UsersController],
    providers:[UserService]
})

export class UserModule { }