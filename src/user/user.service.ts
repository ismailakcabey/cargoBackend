import { Injectable , NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.model";

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>
    ){}

    async insertUser(name: string , password: string , email: string , createdDate: Date){
        const newUser = new this.userModel({
            name,
            email,
            password,
            createdDate : Date.now()
        });
        const result = await newUser.save() 
        return result.id as string;
    }

    async getUser(){
        const users = await this.userModel.find().exec();
        return users.map(user =>({
            id: user.id,
            name: user.name,
            email : user.email,
            password: user.password,
            createdDate: user.createdDate
        }))
    }

    async getUserById(id: string){
        const user = await this.userModel.findById(id);
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            createdDate: user.createdDate
        }
    }

    async patchUserByEmail(id: string, email: string , password: string , name: string){
        const user = await this.userModel.findByIdAndUpdate(id);
        if(name)user.name = name;
        if(email)user.email = email;
        if(password)user.password = password;
        user.save();
    }

    async deleteUser(id:string){
        const user = await this.userModel.findByIdAndDelete(id);
        if (user === null) {
            throw new NotFoundException('Could not find product.');
          }
    }



}
