import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserExpensesController } from "./userExpenses.controller";
import { UserExpensesSchema } from "./userExpenses.model";
import { UserExpensesService } from "./userExpenses.service";

@Module({
  imports: [
    MongooseModule.forFeature([{name:"UserExpenses",schema:UserExpensesSchema}])
  ],
  controllers: [UserExpensesController],
  providers: [UserExpensesService],
  
})

export class UserExpensesModule { }