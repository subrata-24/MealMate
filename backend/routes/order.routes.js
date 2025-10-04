import express from "express";
import { placeOrder } from "../controllers/order.controllers";
import isAuth from "../middlewares/isAuth";

const orderRouter = express.Router();

orderRouter.post("/create-order", isAuth, placeOrder);

export default orderRouter;
