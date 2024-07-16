import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import { AppError, catchAsync } from "../utils/helpers";
import jwt from "jsonwebtoken";

const generateJWTToken = (id: unknown) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const signUp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser = await User.create({
      email: req.body.email,
      name: req.body.name,
      surname: req.body.surname,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      photo: req.body.photo,
    });

    const token = generateJWTToken(newUser._id);

    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRES_IN!, 10)
      ),
      httpOnly: true,
    });
    newUser.password = "";
    res.status(201).json({ status: "success", token, data: { user: newUser } });
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Provide email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    const correct = await user?.correctPassword(password, user?.password);

    if (!user || !correct) {
      return next(new AppError("Incorrect email or password", 404));
    }

    const token = generateJWTToken(user._id);

    res.status(200).json({ status: "success", token });
  }
);
