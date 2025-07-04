import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";
import AppError from "../utils/error.utils.js";

export const getCurrentUser = async (req, res,next)=>{
    try{
        const userId = req.userId;
        const user = await User.findById(userId).select("-password");
        if(!user){
            return next(new AppError("user does not exist!!", 400));
        }

        return res.status(200).json({
            success : true,
            message: "User...",
            user
        })
    }catch(error){
        return next(new AppError("Get current User Error!!", 400));
    }
}



export const updateAssistant = async (req, res, next)=>{
    try {
        const {assistantName, imageUrl} = req.body;
        let assistantImage;

        if(req.file){
            assistantImage = await uploadOnCloudinary(req.file.path)
        }else{
            assistantImage = imageUrl;
        }

        const user = await User.findByIdAndUpdate(req.userId, {assistantName, assistantImage}, {new:true}).select("-password");
        return res.status(200).json({
            success: true,
            message : "Your Assistant is Ready",
            user
        })
    } catch (error) {
        return next(new AppError("Update user Assistant error!!", 400));
    }
}