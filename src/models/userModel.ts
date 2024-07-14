import mongoose from "mongoose";
import validator from "validator";

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
  },
  passwordConfirm: {
    type: String,
    required: [true, "Confirm your password"],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
