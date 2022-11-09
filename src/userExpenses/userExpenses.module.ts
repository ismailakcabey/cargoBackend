import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserExpensesSchema } from "./userExpenses.model";

@Module({
  imports: [
    MongooseModule.forFeature([{name:"UserExpenses",schema:UserExpensesSchema}])
  ],
  controllers: [],
  providers: [],
  
})

export class UserExpensesModule { }