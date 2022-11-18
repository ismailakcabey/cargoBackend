import { Controller ,
    Post,
    Put,
    Get,
    Delete,
    Patch,
    Param,
    Body} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ObjectId } from "mongoose";
import { UserExpensesDto } from "./userExpenses.dto";
import { UserExpensesService } from "./userExpenses.service";

@ApiTags('UserExpenses')
@Controller("userExpenses")
export class UserExpensesController {

    constructor(
        private readonly userExpensesService: UserExpensesService){}

        @Post()
        async addExpenses(
            @Body('ExpensesType') ExpensesType : number,
            @Body('amount') amount : number,
            @Body('userId') userId : ObjectId,
            createDate : Date,
        ){
            const generatedId = await this.userExpensesService.insertExpenses(ExpensesType , createDate , amount , userId);
            return {id:generatedId};
        }

        @Get()
        async getAllExpenses(){
        const expenses = await this.userExpensesService.getExpenses()
        return expenses;
        }

        @Get('/excel')
        async getAllExpensesExcel(){
        const expenses = await this.userExpensesService.getAllExpensExcel()
        return expenses;
        }

        @Get(':id')
        async getUser(
        @Param('id') id:string
        ){
        const expenses = await this.userExpensesService.getExpensesById(id);
        return expenses
        }

        @Patch(':id')
        async updateUser(
        @Param('id') id?:string,
        @Body() body?:UserExpensesDto
        ){
        await this.userExpensesService.patchExpenses(id , body)
        return {id:id}
        }

        @Delete(':id')
        async deleteUser(
            @Param('id')id:string
        ){
            await this.userExpensesService.deleteExpenses(id)
            return {id:id}
        }

}