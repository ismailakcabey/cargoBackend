import { Injectable , NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model , ObjectId} from "mongoose";
import { UserExpensesDto } from "./userExpenses.dto";
import { UserExpenses } from "./userExpenses.model";

@Injectable()
export class UserExpensesService {
  constructor(
    @InjectModel('UserExpenses') private readonly userExpensesModel: Model<UserExpenses>
  ){}

  async insertExpenses(ExpensesType: number , createdDate: Date , amount: number , userId:ObjectId){
    const Expenses = new this.userExpensesModel({
        ExpensesType,
        amount,
        userId,
        createdDate : Date.now()
    });
    const result = await Expenses.save() 
    return result.id as string;
}    

    async getExpenses(){
        const expenses = await this.userExpensesModel.find().exec();
            return {
            status : true,
            count : expenses.length,
            data : expenses
    }
    }

    async getExpensesById(id: string){
        const expenses = await this.userExpensesModel.findById(id);
        return expenses
    }

    async patchExpenses(id: string, body: UserExpensesDto){
        const expenses = await this.userExpensesModel.findByIdAndUpdate(id);
        if(body?.ExpensesType)expenses.ExpensesType = body.ExpensesType;
        if(body?.amount)expenses.amount = body.amount;
        console.log(expenses)
        expenses.save();
    }

    async deleteExpenses(id:string){
        const expenses = await this.userExpensesModel.findByIdAndDelete(id);
        if (expenses === null) {
            throw new NotFoundException('Could not find product.');
          }
    }

}