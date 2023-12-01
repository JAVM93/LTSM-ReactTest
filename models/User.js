import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    usercode: {
      type: String,
      required: true,
      max: 10,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    rol: {
      type: String,
      required: true,
      min: 3,
    },
    jobArea: {
      type: String,
      required: true,
      min: 3,
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
