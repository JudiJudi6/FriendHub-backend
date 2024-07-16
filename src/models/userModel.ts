import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

export interface UserDocument extends mongoose.Document {
  name: string;
  surname: string;
  email: string;
  photo?: string;
  password: string;
  passwordConfirm: string;

  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    reqired: [true, "Name is required"],
  },
  surname: {
    type: String,
    reqired: [true, "Surname is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Email is not valid"],
  },
  photo: { type: String },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlenght: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Confirm your password"],
    validate: {
      validator: function (el: string) {
        return el === (this as any).password;
      },
      message: "Passwords are not the same",
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = "";
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
