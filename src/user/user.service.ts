import { Injectable , NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDto } from "./user.dto";
import { User } from "./user.model";
var nodemailer = require('nodemailer');

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>
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
        let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    
    service: "gmail",
    auth: {
      user: "ismailakca399@gmail.com", // generated ethereal user
      pass: "30032016ME.ek", // generated ethereal password
    },
  });

  // send mail with defined transport object
  

 try {
    let info = await transporter.sendMail({
        from: 'ismailakca399@gmail.com', // sender address
        to: "ismail.akca@packupp.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });
      
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            
 } catch (error) {
    console.log("AAAA"+error);
 }
          return {
            status : true
          }
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
