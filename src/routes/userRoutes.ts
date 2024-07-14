import express from "express";
import { signUp } from "../controllers/authController";

const userRouter = express.Router();

userRouter.post("/signup", signUp);

export default userRouter;
