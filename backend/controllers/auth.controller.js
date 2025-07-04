import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'




// Signup implementation
export const signUp = async (req,res)=>{
    try{
        const {name, email, password} = req.body;
        
        const existEmail = await User.findOne({email});

        if(existEmail){
            return res.status(400).json({message: "Email already exist!"});
        }

        if(password.length < 6){
            return res.status(400).json({message: "password must be contain atleast 6 characters!!"});
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            password: hashedPassword,
            email
        })

        const token = await genToken(user._id)

        res.cookie("token",token, {
            httpOnly: true,
            maxAge: 5*24*60*60*1000,
            sameSite:"strict",
            secure:false
        })
        
        return res.status(201).json({
            success: true,
            message: "Registration Successful",
            user
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({message:`Sign up error : ${error}`})
        
    }
}




// Login implementation
export const login = async (req,res)=>{
    try{
        const {email, password} = req.body;
        
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message: "Email doesn't exist!"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({message: "icorrect password!!"});
        }


        const token = await genToken(user._id)

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 5*24*60*60*1000,
            sameSite:"strict",
            secure:false
        })

        return res.status(201).json({
            success: true,
            message: "Login Successfully",
            user
        })
    }catch(error){
        return res.status(500).json({message:`Sign up error : ${error}`})
    }
}




// Logout implementation
export const logOut = async (req,res)=>{
    try{
        res.clearCookie("token")
        return res.status(200).json({
            success: true,
            message: "Logout successfully"
        })
    }catch(error){
        return res.status(500).json({message:`Logout error : ${error}`})
    }
}