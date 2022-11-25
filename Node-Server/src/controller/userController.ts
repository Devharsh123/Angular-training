import md5 from 'md5';
import * as Jwt from "jsonwebtoken";
import { Request, Response } from "express"
import { JwtAuthPayload, UserDetailDto } from "../dto/UserDto"
import {  UserModel } from "../model/User";


export class UserController {
    registration = async (req: Request, res: Response): Promise<Response> => {
        try{
        const body: UserDetailDto = {...req.body}
        const hashedPassword = md5(body.password)
        const userDetail = await UserModel.create({ name: body.name, email: body.email, password: hashedPassword, dob: body.dob, address: body.address, phone: body.phone })
        return res.json({
            message: "Customer registered succesfully",
            user: userDetail
        })
    }catch(error){
        console.log(error)
        return res.json({
            message:"customer registration failed",
            error:error
        })
    }
    }

    login = async (req: Request, res: Response): Promise<Response> => {
        const { email, password } = req.body

        const data = await UserModel.findOne({ email, password: md5(password) }).select({password:0,__v:0})
        if (!data) {
            return res.json({
                message: `no user found with this email id${email}`
            })
        }
        const payload:JwtAuthPayload = {
            _id: data._id.toString(),
            name: data.name,
            email: data.email,
            userType: data.user
        }
        const token = Jwt.sign({ payload }, 'sfglsfiglsifuafffisg765' as Jwt.Secret, { expiresIn: '1h' })

        return res.json({
            message: "user logged in succesfully",
            token: token,
            user: data
        })
    }

}
