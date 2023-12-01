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


router.get("/getUsers/jobArea", getUsers);
router.get("/find/:id", getUser)
router.get("/:id", getUserById);
//router.post("/save", saveUser); 
router.post("/register", register);
router.patch("/update/:id", updateUser); 
router.delete("/delete/:id", deleteUser);
// router.get("/getUserlist", getUserlist);



export default router;
