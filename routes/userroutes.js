import express from "express";
import { register, login, getProfile } from "../controllers/usercontroller.js"
import { protect } from "../middlewares/auth.js";

const userRouter = express();

// Auth routes
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/profile", protect, getProfile);

export default userRouter;