/**
 * @fileoverview This file contains the routes for authentication.
 * @module routes/auth
 */

import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router();

/**
 * Route for user login.
 * @name POST /login
 * @function
 * @memberof module:routes/auth
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object.
 */
router.post("/login", login);

export default router;
