import express from "express";
import { edit, editProfile, getUser, login, register } from "../controllers/auth.js";
import { verifyToken } from "../middleware/jwtAuth.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/getUser",verifyToken,getUser);
router.get("/edit",verifyToken,edit);
router.patch("/editProfile",verifyToken,editProfile);

export default router;