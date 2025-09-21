import express from "express";
import { getCurrentUser } from "../controllers/user.controller";
import isAuth from "../middlewares/isAuth";

const userRouter = express.Router();

//Flow: Client sends request → JWT verified by isAuth → user info fetched by getCurrentUser → response sent back.
userRouter.get("/current", isAuth, getCurrentUser);

export default userRouter;
