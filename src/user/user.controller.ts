import { Controller ,
        Post,
        Put,
        Get,
        Delete,
        Patch,
        Param,
        Body} from "@nestjs/common";
import { UserDto } from "./user.dto";
import { UserService } from "./user.service";

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
        createdDate:Date
    ){
        const generatedId = await this.userService.insertUser(email, password,name,createdDate,userType)
        return {id:generatedId}
    }

    @Get()
    async getAllUser(){
        const users = await this.userService.getUser()
        return users;
    }

    @Get('/email')
    async getUserEmail(){
        await this.userService.getUserEmail()
        return
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
        await this.userService.patchUserByEmail(id , body)
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

