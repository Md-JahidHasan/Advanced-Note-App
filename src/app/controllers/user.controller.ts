import express, { Request, Response }  from "express"
import { User } from "../models/user.model";

export const usersRoute = express.Router()

usersRoute.post("/create-user", async(req: Request, res: Response) => {
    const body = req.body;

    const user = await User.create(body);

    res.status(201).json({
        success: true,
        message: "User creatd successfully",
        user: user
    })


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