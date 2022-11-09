import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserExpensesController } from "src/userExpenses/userExpenses.controller";
import { UserExpensesService } from "src/userExpenses/userExpenses.service";
import { UserSchema } from "./user.model";


@Module({
    imports: [
        MongooseModule.forFeature([{name:"UserExpenses",schema:UserSchema}])
    ],
    controllers:[UserExpensesController],
    providers:[UserExpensesService]
})

export class UserModule { }