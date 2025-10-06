import express from "express";
import {
  getCurrentUser,
  updateUserLocation,
} from "../controllers/user.controller.js";
import isAuth from "../middlewares/isAuth.js";

const userRouter = express.Router();

//Flow: Client sends request → JWT verified by isAuth → user info fetched by getCurrentUser → response sent back.
userRouter.get("/current", isAuth, getCurrentUser);
userRouter.get("/update-location", isAuth, updateUserLocation);

export default userRouter;
