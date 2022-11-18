import { Injectable , NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model , ObjectId} from "mongoose";
import { UserExpensesDto } from "./userExpenses.dto";
import { UserExpenses , ExpensesExcel } from "./userExpenses.model";
var fs = require('fs');
const XLSX = require('xlsx')

@Injectable()
export class UserExpensesService {
  constructor(
    @InjectModel('UserExpenses') private readonly userExpensesModel: Model<UserExpenses>,
    @InjectModel('UserExpenses') private readonly expensesExcel: Model<ExpensesExcel>
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

    async getExcel(){
    const expenses = await this.expensesExcel.find().exec();
    return expenses.map(
        expens=> ({
            id: expens._id,
            ExpensesType: expens.ExpensesType,
            amount: expens.amount,
            createdDate: expens.createdDate,
            userId: expens.userId
        })
    )
    }

    async getAllExpensExcel(){
        
        const data = await this.getExcel()
        
        const workSheet = XLSX.utils.json_to_sheet(data);
        const workBook = XLSX.utils.book_new();
    
        XLSX.utils.book_append_sheet(workBook, workSheet, "students")
        // Generate buffer
        XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" })
    
        // Binary string
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
    
        XLSX.writeFile(workBook, "expenses.xlsx")
        return{
            status : true,
            message : "Excel file generated",
            workBook : workBook
        }
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