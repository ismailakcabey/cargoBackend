import { Injectable , NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDto } from "./user.dto";
import { User } from "./user.model";

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
    ){}

    async insertUser(name: string , password: string , email: string , createdDate: Date , userType: number){
        const newUser = new this.userModel({
            name,
            email,
            password,
            userType,
            createdDate : Date.now()
        });
        const result = await newUser.save() 
        return result.id as string;
    }

    async getUser(){
        const users = await this.userModel.find().exec();
        return {
            status : true,
            count : users.length,
            data : users
        }
    }

    async getUserEmail(){
        console.log("getUserEmai")
    }

    async loginByUser(userEmail: string , userPassword: string){
        const users =  this.userModel.findOne({email: userEmail , password: userPassword})
        console.log(users)
        return users
    }

    async getUserById(id: string){
        const user = await this.userModel.findById(id);
        return user
    }

    async patchUserByEmail(id: string, body: UserDto){
        const user = await this.userModel.findByIdAndUpdate(id);
        if(body?.name)user.name = body.name;
        if(body?.email)user.email = body.name;
        if(body?.password)user.password = body.password;
        if(body?.userType)user.userType = body.userType;
        console.log(user)
        user.save();
    }

    async deleteUser(id:string){
        const user = await this.userModel.findByIdAndDelete(id);
        if (user === null) {
            throw new NotFoundException('Could not find product.');
          }
    }



}
