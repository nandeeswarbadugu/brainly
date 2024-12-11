import { UserModel } from "../db";
import { Router,json } from "express";
const userRouter = Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {JWT_USER} from '../config';

userRouter.use(json());

userRouter.post('/signup', async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log("hitting post request");

    try {
        const saltRounds = 5;
        const hashPassword = await bcrypt.hash(password,saltRounds);

        await UserModel.create({
            username:username,
            password:hashPassword
        })
        
        res.status(200).json({
            message: "username created succesfully"
        })
        
    } catch (error) {
        if (error instanceof Error)
            console.error("Error creating user:",error.message);

        res.status(500).json({
            message: "An error occurred while creating the user."
        })    
    }
});

userRouter.post('/signin', async (req,res) =>{
    const {username,password} = req.body;
    console.log(`checking sigin payload: ${username} ${password}`);

    try {
    const user = await UserModel.findOne({
        username:username
    });
    console.log(`Inside signin request ${password}`);

    if (!user)
    {
        res.status(403).json({
            message:"user doesnot exist"
        });
    }
    //@ts-ignore
    const verifyUser = await bcrypt.compare(password,user.get('password'));
    if (!verifyUser)
    {
        res.json({
            message:"Incorrect password"
        })
    }
    
    const token = jwt.sign({
        //@ts-ignore
        id:user.get("_id")
    },JWT_USER)

    res.json({
        token:token
    })
    } catch(error) {
        console.error('error while signing in',error);
    }
});


export default userRouter;


