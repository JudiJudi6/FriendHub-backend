import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import { catchAsync } from "../utils/helpers";

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

    res.status(201).json({ status: "success", data: { user: newUser } });
  }
);
