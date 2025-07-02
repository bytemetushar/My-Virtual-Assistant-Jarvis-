import AppError from '../utils/error.utils.js'
import jwt from 'jsonwebtoken'

const isAuth = async (req, res, next)=>{
    try{
        const token = req.cookies.token;
        if(!token){
            return next(new AppError("Please login to access", 401))
        }

        const verifyToken = await jwt.verify(token, process.env.JWT_SECRET);
        req.userId = verifyToken.userId;

        next()

    }catch(error){
        return next(new AppError(error,500))
    }
}

export default isAuth;