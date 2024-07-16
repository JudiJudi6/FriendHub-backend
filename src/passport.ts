import passport from "passport";
import User from "./models/userModel";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "1050351462202-6seob8iu1jgv5sr8nau99juc05ao6dpr.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/api/v1/user/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, next) => {
      return next(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

export default passport;
