import { Injectable , NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDto } from "./user.dto";
import { User , UserExcel } from "./user.model";
var fs = require('fs');
const XLSX = require('xlsx');

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('User') private readonly userModelExcel: Model<UserExcel>,
    ){}

    async insertUser(name: string , password: string , email: string , createdDate: Date , userType: number){
        const newUser = new this.userModel({
            name,
            email,
            password,
            userType,
            createdDate : Date.now()
        });
        const users = await  this.userModel.findOne({email: email})
        if(users == null){
            const result = await newUser.save();
            return result.id as string;
        }
        else{
            return{
                status : false,
                message : "Email already exists"
            }
        }
        
        
    }

    async getUser(){
        const users = await this.userModel.find().exec();
        return {
            status : true,
            count : users.length,
            data : users
        }
    }

    async getUserEmail( toEmail: string , id:string){
        const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

sgMail
  .send({
    to:{
        email: toEmail,
        name:"ismail"
    },
    from:{
        
        email: process.env.MY_SECRET_EMAIL,
        name: 'İSMAİL AKÇA'
    },
    subject: 'adasdadsadasd',
    text:"dasasdadas",
    html:`<p>Mail doğrulama servisi ismail akca</p><a href="http://localhost:3000/users/verify/${id}">doğrula</a>`,
    
    
  })
  .then(() => {
    console.log('Email sent' + "toEmail : " + toEmail  );
    return {
        status : true,
        message : 'Email sent'

    }
  })
  .catch((error) => {
    console.log(error.response.body)
    return{
        status:false,
        message : error
    }
  })
    }

    async loginByUser(userEmail: string , userPassword: string){
        
        try {
            const users = await  this.userModel.findOne({email: userEmail , password: userPassword})
        console.log(users)
        if(users == null) {
            return {
                status:false,
                data: "user not found"
            }  
        }
        return {
            status:true,
            data: users
        }
        } catch (error) {
            console.log(error)
        }
        
    }

    async getUserById(id: string){
        const user = await this.userModel.findById(id);
        return user
    }

    async getUserEmailVerify(id: string){
        const user = await this.userModel.findByIdAndUpdate(id);
        user.verify = true
        console.log(user)
        user.save()
        return user
    }

    async getExcel(){
        const users = await this.userModelExcel.find().exec();
        return users.map(
            user=> ({
                name: user.name,
                password: user.password,
                createdDate: user.createdDate,
                userType: user.userType,
                email:user.email,
            })
        )
    }

    async getUsersExcel(){
        const data = await this.getExcel()
        const workSheet = XLSX.utils.json_to_sheet(data);
        const workBook = XLSX.utils.book_new();
    
        XLSX.utils.book_append_sheet(workBook, workSheet, "students")
        // Generate buffer
        XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" })
    
        // Binary string
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
    
        XLSX.writeFile(workBook, "users.xlsx")
        return{
            status : true,
            message : "Excel file generated",
            workBook : workBook
        }
    }

    async patchUserById(id: string, body: UserDto){
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
