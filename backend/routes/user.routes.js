import express from 'express'
import { login, logOut, signUp } from '../controllers/auth.controller.js';

const userRouter = express.Router();


userRouter.post("/signup",signUp);
userRouter.post("/signin",login);
userRouter.get("/logout",logOut);




export default userRouter;