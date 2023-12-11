/**
 * @file User model schema and definition.
 * @module User
 */

import mongoose from "mongoose";

/**
 * User schema definition.
 * @typedef {Object} UserSchema
 * @property {string} firstName - The first name of the user.
 * @property {string} lastName - The last name of the user.
 * @property {string} usercode - The unique user code.
 * @property {string} password - The user's password.
 * @property {string} rol - The user's role.
 * @property {string} jobArea - The user's job area.
 * @property {Date} createdAt - The date and time when the user was created.
 * @property {Date} updatedAt - The date and time when the user was last updated.
 */

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

/**
 * User model.
 * @typedef {Object} User
 * @property {string} _id - The unique identifier of the user.
 * @property {string} firstName - The first name of the user.
 * @property {string} lastName - The last name of the user.
 * @property {string} usercode - The unique user code.
 * @property {string} password - The user's password.
 * @property {string} rol - The user's role.
 * @property {string} jobArea - The user's job area.
 * @property {Date} createdAt - The date and time when the user was created.
 * @property {Date} updatedAt - The date and time when the user was last updated.
 */

const User = mongoose.model("User", UserSchema);
export default User;
