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