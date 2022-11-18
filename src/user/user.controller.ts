import { Controller ,
        Post,
        Put,
        Get,
        Delete,
        Patch,
        Param,
        Body} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserDto } from "./user.dto";
import { UserService } from "./user.service";

@ApiTags('User')
@Controller('users')
export class UsersController{
    
    constructor(
        private readonly userService: UserService
    ){}


    @Post()
    async addUser(
        @Body('email') email:string,
        @Body('password') password:string,
        @Body('name') name:string,
        @Body('userType') userType:number,
        createdDate:Date,
    ){
        const generatedId = await this.userService.insertUser(name, password,email,createdDate,userType)
        return {id:generatedId}
    }

    @Get()
    async getAllUser(){
        const users = await this.userService.getUser()
        return users;
    }

    @Get('/excel')
    async getAllUserExcel(){
        const users = await this.userService.getUsersExcel()
        return users;
    }

    @Post('/email')
    async sendEmail(
        @Body('toEmail') toEmail:string,
        @Body('fromEmail') fromEmail:string
    ){
        const email = await this.userService.getUserEmail(fromEmail , toEmail);
        return email;
    }

    @Get('/login')
    async getUserEmail(
        @Body('email') email: string,
        @Body('password') password: string
    ){ 
        return this.userService.loginByUser(email , password)
    }

    @Get(':id')
    async getUser(
        @Param('id') id:string
    ){
        const user = await this.userService.getUserById(id);
        return user
    }

    @Patch(':id')
    async updateUser(
        @Param('id') id?:string,
        @Body() body?:UserDto
    ){
        await this.userService.patchUserById(id , body)
        return {id:id}
    }

    @Delete(':id')
    async deleteUser(
        @Param('id')id:string
    ){
        await this.userService.deleteUser(id)
        return {id:id}
    }

}

