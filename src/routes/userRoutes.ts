import express from "express";
import { login, signUp } from "../controllers/authController";
import passport from "passport";

const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", login);

userRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
userRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

userRouter.get("/logout", (req, res, next) => {
  req.logout(next);
  res.redirect("/");
});

export default userRouter;
