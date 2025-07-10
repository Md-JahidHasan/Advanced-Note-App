import express, { Request, Response }  from "express"
import { User } from "../models/user.model";
import z from "zod";

import bcrypt from "bcryptjs";



export const usersRoute = express.Router()

const userAddressSchema = z.object({
    city: z.string(),
    street: z.string(),
    zip: z.number()
})

const createUserZodSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    age: z.number(),
    email: z.string(),
    password: z.string(),
    role: z.string().optional(),
    address: userAddressSchema
})

usersRoute.post("/create-user", async(req: Request, res: Response) => {
    try {
        const body = createUserZodSchema.parse(req.body);

        // console.log(body, "zod body");

        // const password = await bcrypt.hash(body.password, 10);
        

        // req.body= password
        
        
        

        // const password = await User.hashPassword(body.password);

        // console.log(password, "static");

        // body.password = password 

        const user = await User.create(body);


        res.status(201).json({
          success: true,
            message: "User creatd successfully",
          
          user: user,
        });
    } catch (error: any) {

        res.status(400).json({
          success: false,
            message: error.message,
          error
          
        });
        
    }


})


usersRoute.get("/", async (req: Request, res: Response) => {
    const users = await User.find();

    res.status(201).json({
        success: true,
        message: "Users find successfullly",
        users: users
      
    });
})


usersRoute.get("/:userId", async (req: Request,res:Response) => {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    res.status(201).json({
        success: true,
        message: "User found successfully",
        user: user
    })
})


usersRoute.patch("/:userId", async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const body = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, body, {
        new: true
    });

    res.status(201).json({
      success: true,
      message: "User found successfully",
      user: updatedUser,
    });
})


usersRoute.delete("/:userId", async (req: Request, res: Response) => {
    const userId = req.params.userId;

    const deletedUser = await User.findByIdAndDelete(userId);

    res.status(401).json({
        success: true,
        message: "User deleted succcessfully",
        user: deletedUser
    })
})