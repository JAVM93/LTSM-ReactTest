/**
 * @fileoverview This file contains the routes for user-related operations.
 * @module routes/users
 */

import express from "express";
import {
  getUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  register,
} from "../controllers/users.js";
import { verifyAdmin, verifyUser} from "../middleware/auth.js";

const router = express.Router();

/**
 * Route to get all users based on job area.
 * @name GET /getUsers/jobArea
 * @function
 * @memberof module:routes/users
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with the list of users.
 */
router.get("/getUsers/jobArea", getUsers);

/**
 * Route to find a user by ID.
 * @name GET /find/:id
 * @function
 * @memberof module:routes/users
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with the user details.
 */
router.get("/find/:id", getUser);

/**
 * Route to get a user by ID.
 * @name GET /:id
 * @function
 * @memberof module:routes/users
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with the user details.
 */
router.get("/:id", getUserById);

/**
 * Route to register a new user.
 * @name POST /register
 * @function
 * @memberof module:routes/users
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with the registered user details.
 */
router.post("/register", register);

/**
 * Route to update a user by ID.
 * @name PATCH /update/:id
 * @function
 * @memberof module:routes/users
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with the updated user details.
 */
router.patch("/update/:id", updateUser);

/**
 * Route to delete a user by ID.
 * @name DELETE /delete/:id
 * @function
 * @memberof module:routes/users
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with a success message.
 */
router.delete("/delete/:id", deleteUser);

export default router;
